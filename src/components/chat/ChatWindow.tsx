import { useRef } from "react";
import MessageBubble from "@/components/chat/MessageBubble";

interface Message {
  id: number;
  sender: "me" | "other";
  text: string;
}

interface ChatWindowProps {
  messages: Message[];
  onStartNewConversation?: () => void;
  onSendMessage?: (text: string) => void;
  isExistingConversation?: boolean;
}

export default function ChatWindow({ messages, onStartNewConversation, onSendMessage, isExistingConversation }: ChatWindowProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputRef.current) return;
    const text = inputRef.current.value.trim();
    if (!text) return;
    onSendMessage?.(text);
    inputRef.current.value = "";
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.length === 0 && !isExistingConversation && (
          <div className="flex flex-col items-center justify-center py-10">
            <p className="mb-4 text-gray-500">لا توجد رسائل بعد</p>
            {onStartNewConversation && (
              <button
                onClick={onStartNewConversation}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                ابدأ محادثة جديدة
              </button>
            )}
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-2 rounded ${msg.sender === "me" ? "bg-blue-100 self-end" : "bg-gray-200 self-start"}`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="p-3 border-t bg-white">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            placeholder="اكتب رسالتك..."
            className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring"
          />
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            إرسال
          </button>
        </form>
      </div>
    </div>
  );
}
