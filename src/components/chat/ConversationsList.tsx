import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Card } from "@/components/ui/card";

interface Conversation {
  conversation_id: number;
  owner_id: number;
  owner_name: string;
  last_message: string;
  last_message_at: string | null;
}

export default function ConversationsList() {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await api.get("/chat/conversations");
        setConversations(res.data.conversations || []);
      } catch (err) {
        console.error("Error fetching conversations:", err);
      }
    };

    fetchConversations();
  }, []);

  return (
    <div className="space-y-3">
      {conversations.length === 0 ? (
        <p className="text-gray-500">لا توجد محادثات بعد</p>
      ) : (
        conversations.map((conv) => (
          <Card
            key={conv.conversation_id}
            className="p-3 cursor-pointer hover:bg-gray-100"
          >
            <h2 className="font-bold">{conv.owner_name || "مالك مجهول"}</h2>
            <p className="text-sm text-gray-600">
              {conv.last_message || "لا توجد رسائل بعد"}
            </p>
            <span className="text-xs text-gray-400">
              {conv.last_message_at
                ? new Date(conv.last_message_at).toLocaleString("ar-EG")
                : ""}
            </span>
          </Card>
        ))
      )}
    </div>
  );
}
