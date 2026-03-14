import { useEffect, useMemo, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { Search, ArrowRight, MessageCircle } from "lucide-react";

type Conversation = {
  id: string;
  ownerName: string;
  lastMessage: string;
  lastMessageAt: string | null;
  unreadCount: number;
  online?: boolean;
};

type ChatMessage = {
  id: string;
  sender: "me" | "them";
  text: string;
  createdAt: string;
  read?: boolean;
};

type OwnerBootParams = {
  ownerId: string | null;
  ownerName: string;
  apartmentId: string | null;
};

const buildOwnerConversationId = (ownerId: string) => `owner-${ownerId}`;

const parseTime = (value?: string | null) => {
  if (!value) return "";
  try {
    return new Date(value).toLocaleTimeString("ar-EG", {
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
};

const safeJson = async (res: Response) => {
  try {
    return await res.json();
  } catch {
    return null;
  }
};

const requestJson = async (input: string, init?: RequestInit) => {
  const response = await fetch(input, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    ...init,
  });

  const data = await safeJson(response);

  if (!response.ok) {
    throw new Error(
      (data && (data.error || data.message)) || `request_failed_${response.status}`
    );
  }

  return data;
};

const tryRequests = async <T,>(factories: Array<() => Promise<T>>): Promise<T> => {
  let lastError: unknown;
  for (const factory of factories) {
    try {
      return await factory();
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError;
};

const normalizeConversation = (raw: any): Conversation => ({
  id: String(raw.conversation_id || raw.id || raw.uuid || ""),
  ownerName:
    raw.owner_name || raw.ownerName || raw.user_name || raw.name || "صاحب السكن",
  lastMessage: raw.last_message || raw.lastMessage || raw.preview || "",
  lastMessageAt:
    raw.last_message_at || raw.lastMessageAt || raw.updated_at || raw.created_at || null,
  unreadCount: Number(raw.unread_count || raw.unreadCount || raw.unread || 0),
  online: Boolean(raw.online),
});

const normalizeMessage = (raw: any): ChatMessage => {
  const senderValue = String(raw.sender || raw.sender_type || raw.role || "").toLowerCase();
  const isMe =
    senderValue === "me" ||
    senderValue === "self" ||
    senderValue === "student" ||
    senderValue === "owner" ||
    Boolean(raw.is_mine);

  return {
    id: String(raw.id || raw.message_id || crypto.randomUUID()),
    sender: isMe ? "me" : "them",
    text: raw.text || raw.message || raw.content || "",
    createdAt: raw.created_at || raw.sent_at || raw.timestamp || new Date().toISOString(),
    read: Boolean(raw.read || raw.is_read),
  };
};

async function fetchConversations(): Promise<Conversation[]> {
  const data = await tryRequests<any>([
    () => requestJson("/api/v1/chat/conversations"),
    () => requestJson("/chat/conversations"),
    () => requestJson("/api/v1/messages/conversations"),
  ]);

  const rows = data?.conversations || data?.data || data || [];
  if (!Array.isArray(rows)) return [];

  return rows
    .map(normalizeConversation)
    .filter((row) => row.id)
    .sort((a, b) =>
      new Date(b.lastMessageAt || 0).getTime() - new Date(a.lastMessageAt || 0).getTime()
    );
}

async function fetchConversationMessages(conversationId: string): Promise<ChatMessage[]> {
  const data = await tryRequests<any>([
    () => requestJson(`/api/v1/chat/conversations/${conversationId}/messages`),
    () => requestJson(`/chat/conversations/${conversationId}/messages`),
    () => requestJson(`/api/v1/messages/${conversationId}`),
  ]);

  const rows = data?.messages || data?.data || data || [];
  if (!Array.isArray(rows)) return [];

  return rows
    .map(normalizeMessage)
    .filter((msg) => msg.text)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
}

async function startConversationWithOwner(params: OwnerBootParams): Promise<string | null> {
  if (!params.ownerId) return null;

  const payload = {
    owner_id: Number(params.ownerId),
    apartment_id: params.apartmentId,
  };

  const data = await tryRequests<any>([
    () => requestJson("/api/v1/chat/conversations", { method: "POST", body: JSON.stringify(payload) }),
    () => requestJson("/chat/conversations", { method: "POST", body: JSON.stringify(payload) }),
    () => requestJson("/api/v1/messages/start", { method: "POST", body: JSON.stringify(payload) }),
  ]);

  const id = data?.conversation_id || data?.id || data?.conversation?.id;
  return id ? String(id) : null;
}

async function sendMessageApi(conversationId: string, text: string) {
  const payload = {
    message: text,
    text,
    content: text,
    conversation_id: conversationId,
  };

  await tryRequests([
    () =>
      requestJson(`/api/v1/chat/conversations/${conversationId}/messages`, {
        method: "POST",
        body: JSON.stringify({ message: text }),
      }),
    () => requestJson("/api/v1/chat/send", { method: "POST", body: JSON.stringify(payload) }),
    () => requestJson("/api/v1/messages", { method: "POST", body: JSON.stringify(payload) }),
  ]);
}

export default function MessagesPage() {
  const location = useLocation();
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

  const ownerParams: OwnerBootParams = {
    ownerId: searchParams.get("ownerId"),
    ownerName: searchParams.get("ownerName") || "صاحب السكن",
    apartmentId: searchParams.get("apartmentId"),
  };

  const ownerId = ownerParams.ownerId;
  const ownerName = ownerParams.ownerName;
  const apartmentId = ownerParams.apartmentId;

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadConversations = useCallback(async () => {
    const data = await fetchConversations();
    setConversations(data);
    return data;
  }, []);

  const loadMessages = useCallback(async (conversationId: string) => {
    const rows = await fetchConversationMessages(conversationId);
    setMessages(rows);
  }, []);

  useEffect(() => {
    let mounted = true;

    const bootstrap = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const rows = await loadConversations();

        let nextSelected = rows[0]?.id || null;

        if (ownerId) {
          const ownerConversationId = buildOwnerConversationId(ownerId);
          const existing = rows.find(
            (conv) => conv.id === ownerConversationId || conv.id === ownerId
          );

          if (existing) {
            nextSelected = existing.id;
          } else {
            const createdId = await startConversationWithOwner({ ownerId, ownerName, apartmentId });
            if (createdId) {
              nextSelected = createdId;
              setConversations((prev) => [
                {
                  id: createdId,
                  ownerName: ownerName,
                  lastMessage: "",
                  lastMessageAt: null,
                  unreadCount: 0,
                  online: true,
                },
                ...prev,
              ]);
            } else if (ownerId) {
              const localId = buildOwnerConversationId(ownerId);
              nextSelected = localId;
              setConversations((prev) => [
                {
                  id: localId,
                  ownerName: ownerName,
                  lastMessage: "",
                  lastMessageAt: null,
                  unreadCount: 0,
                  online: true,
                },
                ...prev,
              ]);
            }
          }
        }

        if (!mounted) return;

        setSelectedConversationId(nextSelected);

        if (nextSelected && !nextSelected.startsWith("owner-")) {
          await loadMessages(nextSelected);
        } else {
          setMessages([]);
        }
      } catch {
        if (mounted) {
          setError("تعذر تحميل المحادثات حالياً. حاول مرة أخرى.");
          setConversations([]);
          setMessages([]);
        }
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    bootstrap();

    return () => {
      mounted = false;
    };
  }, [ownerId, ownerName, apartmentId, loadConversations, loadMessages]);

  useEffect(() => {
    if (!selectedConversationId || selectedConversationId.startsWith("owner-")) return;

    const interval = setInterval(async () => {
      try {
        await loadMessages(selectedConversationId);
        await loadConversations();
      } catch {
        // ignore polling errors
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [selectedConversationId, loadMessages, loadConversations]);

  const currentChat = conversations.find((c) => c.id === selectedConversationId);

  const handleSelectConversation = async (id: string) => {
    setSelectedConversationId(id);
    setError(null);

    if (id.startsWith("owner-")) {
      setMessages([]);
      return;
    }

    try {
      await loadMessages(id);
    } catch {
      setError("تعذر تحميل رسائل المحادثة.");
      setMessages([]);
    }
  };

  const handleSendMessage = async () => {
    const text = inputValue.trim();
    if (!text || !selectedConversationId || isSending) return;

    setIsSending(true);
    setError(null);

    let conversationId = selectedConversationId;

    const optimisticMessage: ChatMessage = {
      id: crypto.randomUUID(),
      sender: "me",
      text,
      createdAt: new Date().toISOString(),
      read: false,
    };

    setMessages((prev) => [...prev, optimisticMessage]);
    setInputValue("");

    try {
      if (conversationId.startsWith("owner-") && ownerId) {
        const createdId = await startConversationWithOwner({ ownerId, ownerName, apartmentId });
        if (!createdId) throw new Error("create_conversation_failed");
        conversationId = createdId;
        setSelectedConversationId(createdId);
      }

      await sendMessageApi(conversationId, text);
      await loadMessages(conversationId);
      await loadConversations();
    } catch {
      setError("فشل إرسال الرسالة. حاول مرة أخرى.");
      setMessages((prev) => prev.filter((m) => m.id !== optimisticMessage.id));
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-60px)] bg-white md:bg-gradient-to-br md:from-blue-50 md:to-indigo-50">
      <div
        className={`w-full md:w-80 border-l border-gray-100 flex flex-col md:shadow-xl transition-all duration-300 ${
          selectedConversationId ? "hidden md:flex" : "flex"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <h1 className="text-lg md:text-2xl font-semibold text-gray-800">الرسائل</h1>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Search size={20} className="text-gray-600" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <p className="p-4 text-sm text-gray-500">جاري تحميل المحادثات...</p>
          ) : conversations.length === 0 ? (
            <p className="p-4 text-sm text-gray-500">لا توجد محادثات بعد</p>
          ) : (
            conversations.map((chat) => (
              <div
                key={chat.id}
                onClick={() => handleSelectConversation(chat.id)}
                className={`flex items-center gap-3 p-3 md:p-4 cursor-pointer transition ${
                  selectedConversationId === chat.id
                    ? "bg-blue-50 border-r-4 border-blue-500"
                    : "hover:bg-gray-50"
                }`}
              >
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold">
                    {chat.ownerName.slice(0, 1)}
                  </div>
                  {chat.online && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full ring-2 ring-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-gray-800 text-sm md:text-base truncate">
                      {chat.ownerName}
                    </h3>
                    <span className="text-xs text-gray-400">{parseTime(chat.lastMessageAt)}</span>
                  </div>
                  <p className="text-xs md:text-sm text-gray-600 truncate">
                    {chat.lastMessage || "ابدأ المحادثة"}
                  </p>
                </div>
                {chat.unreadCount > 0 && (
                  <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[22px] text-center">
                    {chat.unreadCount}
                  </span>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <div
        className={`flex-1 flex flex-col bg-white md:rounded-l-2xl md:shadow-lg ${
          selectedConversationId ? "flex" : "hidden md:flex"
        }`}
      >
        {selectedConversationId ? (
          <>
            <div className="flex items-center justify-between px-4 py-3 border-b bg-white sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedConversationId(null)}
                  className="md:hidden p-2 rounded-full hover:bg-gray-100"
                >
                  <ArrowRight size={18} />
                </button>
                <div>
                  <h2 className="font-semibold text-gray-800">{currentChat?.ownerName || "محادثة"}</h2>
                  <p className="text-xs text-gray-500">محادثة مباشرة</p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
              {error && (
                <div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{error}</div>
              )}

              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-500">
                  <MessageCircle className="w-10 h-10 mb-2" />
                  <p>لا توجد رسائل بعد. ابدأ المحادثة الآن.</p>
                </div>
              ) : (
                messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex ${m.sender === "me" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[78%] px-4 py-2 rounded-2xl text-sm shadow-sm ${
                        m.sender === "me"
                          ? "bg-blue-500 text-white rounded-br-sm"
                          : "bg-white text-gray-800 border rounded-bl-sm"
                      }`}
                    >
                      <p>{m.text}</p>
                      <p
                        className={`text-[10px] mt-1 text-left ${
                          m.sender === "me" ? "text-blue-100" : "text-gray-400"
                        }`}
                      >
                        {parseTime(m.createdAt)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-3 border-t bg-white flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="اكتب رسالتك..."
                className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <button
                onClick={handleSendMessage}
                disabled={isSending || !inputValue.trim()}
                className="px-4 py-2 rounded-full bg-blue-500 text-white text-sm disabled:opacity-50"
              >
                {isSending ? "..." : "إرسال"}
              </button>
            </div>
          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-400">
            <MessageCircle className="w-12 h-12 mb-2" />
            <p>اختر محادثة من القائمة</p>
          </div>
        )}
      </div>
    </div>
  );
}
