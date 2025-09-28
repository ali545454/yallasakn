import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ConversationsList from "@/components/chat/ConversationsList";
import Header from "@/components/Header";
import ChatWindow from "@/components/chat/ChatWindow";
import { ArrowLeft } from "lucide-react";
import { API_URL } from "./ApartmentDetails";

interface Conversation {
  conversationId: number;
  ownerId: number;
  ownerName: string;
  lastMessage: string | null;
  lastMessageTime: string | null;
}

export default function MessagesPage() {
  const { ownerId } = useParams<{ ownerId: string }>();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);

  // جلب جميع المحادثات الخاصة بالطالب
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const token = localStorage.getItem("token");
const res = await fetch(`${API_URL}/api/v1/chat/conversations`, {
  headers: { Authorization: `Bearer ${token}` }
});

        if (!res.ok) throw new Error("فشل في جلب المحادثات");
        const data = await res.json();

        // تحويل المفاتيح
        const mapped = data.conversations.map((c: any) => ({
          conversationId: c.conversation_id,
          ownerId: c.owner_id,
          ownerName: c.owner_name,
          lastMessage: c.last_message,
          lastMessageTime: c.last_message_at,
        }));

        setConversations(mapped);

        // لو داخل من رابط فيه ownerId
        if (ownerId) {
          const found = mapped.find((c: Conversation) => c.ownerId === Number(ownerId));
          if (found) {
            setSelectedId(found.conversationId);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchConversations();
  }, [ownerId]);

  // المحادثة الحالية
  const currentConversation = conversations.find(c => c.conversationId === selectedId);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />
      <main className="flex flex-1 overflow-hidden">
        <div className="flex w-full h-full">
          {/* قائمة المحادثات */}
          <div className="border-r border-gray-200 bg-white w-full md:w-1/3 lg:w-[244px]">
            <ConversationsList
              conversations={conversations.map((c) => ({
                id: c.conversationId,
                name: c.ownerName || "مالك الشقة",
                lastMessage: c.lastMessage || "لا توجد رسائل بعد",
                time: c.lastMessageTime || "",
              }))}
              selectedId={selectedId}
              onSelect={(id) => setSelectedId(id)}
            />
          </div>

          {/* نافذة الدردشة */}
          <div className={`flex-1 flex flex-col ${!selectedId ? "hidden md:flex" : ""}`}>
            <div className="flex items-center gap-3 p-3 border-b shadow-sm bg-white">
              <button className="block md:hidden" onClick={() => setSelectedId(null)}>
                <ArrowLeft className="w-6 h-6 text-gray-700" />
              </button>
              <span className="font-medium text-gray-800">
                {currentConversation ? currentConversation.ownerName : "اختر محادثة"}
              </span>
            </div>

            {selectedId ? (
              <ChatWindow conversationId={selectedId} />
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-400">
                اختر محادثة من القائمة
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
