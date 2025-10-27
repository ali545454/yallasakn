import { useState } from "react";
import { Send } from "lucide-react";

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);

  const mockChats = [
    {
      id: 1,
      name: "Ahmed Owner",
      lastMessage: "تمام، متى ممكن أعاين الشقة؟",
      time: "14:22",
      unread: 2,
      avatar: "https://i.pravatar.cc/50?u=ahmed",
    },
    {
      id: 2,
      name: "Mona Landlord",
      lastMessage: "العنوان في الحي الرابع بجوار الجامعة.",
      time: "13:10",
      unread: 0,
      avatar: "https://i.pravatar.cc/50?u=mona",
    },
  ];

  const mockMessages = [
    { id: 1, sender: "me", text: "هل الشقة متاحة؟", time: "14:15" },
    { id: 2, sender: "them", text: "أيوه متاحة يا فندم", time: "14:17" },
    { id: 3, sender: "me", text: "تمام، ممكن أعاينها بكرة؟", time: "14:20" },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* ✅ الشريط الجانبي الصغير - صور الأشخاص فقط */}
      <div className="w-[70px] border-r border-gray-200 bg-white flex flex-col items-center py-4 gap-4">
        {mockChats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => setSelectedChat(chat.id)}
            className={`relative cursor-pointer transition-transform hover:scale-105 ${
              selectedChat === chat.id ? "ring-2 ring-blue-500 rounded-full" : ""
            }`}
          >
            <img
              src={chat.avatar}
              alt={chat.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            {chat.unread > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[10px] rounded-full px-1.5">
                {chat.unread}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* ✅ الجزء الرئيسي للرسائل */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            {/* Header */}
            <div className="p-3 border-b bg-white flex items-center gap-2">
              <img
                src={mockChats.find((c) => c.id === selectedChat)?.avatar}
                alt="avatar"
                className="w-8 h-8 rounded-full"
              />
              <h2 className="font-medium text-sm">
                {mockChats.find((c) => c.id === selectedChat)?.name}
              </h2>
            </div>

            {/* Messages */}
            <div className="flex-1 p-3 overflow-y-auto space-y-2 bg-gray-100">
              {mockMessages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${
                    m.sender === "me" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-2xl shadow-sm text-sm ${
                      m.sender === "me"
                        ? "bg-blue-500 text-white rounded-br-none"
                        : "bg-white text-gray-800 rounded-bl-none"
                    }`}
                  >
                    {m.text}
                    <div
                      className={`text-[9px] mt-1 ${
                        m.sender === "me" ? "text-gray-200" : "text-gray-400"
                      }`}
                    >
                      {m.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 bg-white border-t flex items-center gap-2">
              <input
                type="text"
                placeholder="اكتب رسالة..."
                className="flex-1 border rounded-full px-4 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button className="bg-blue-500 text-white p-2 rounded-full">
                <Send size={16} />
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            اختر محادثة لبدء الدردشة
          </div>
        )}
      </div>
    </div>
  );
}
