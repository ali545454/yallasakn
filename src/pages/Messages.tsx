// src/pages/Messages.tsx
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
    },
    {
      id: 2,
      name: "Mona Landlord",
      lastMessage: "العنوان في الحي الرابع بجوار الجامعة.",
      time: "13:10",
      unread: 0,
    },
  ];

  const mockMessages = [
    { id: 1, sender: "me", text: "هل الشقة متاحة؟", time: "14:15" },
    { id: 2, sender: "them", text: "أيوه متاحة يا فندم", time: "14:17" },
    { id: 3, sender: "me", text: "تمام، ممكن أعاينها بكرة؟", time: "14:20" },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* ✅ Sidebar */}
      <div className="w-1/3 border-r border-gray-200 bg-white">
        <div className="p-4 font-semibold text-xl border-b">الرسائل</div>

        {mockChats.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            لا توجد محادثات بعد
          </div>
        ) : (
          <ul>
            {mockChats.map((chat) => (
              <li
                key={chat.id}
                onClick={() => setSelectedChat(chat.id)}
                className={`p-4 border-b cursor-pointer hover:bg-gray-100 ${
                  selectedChat === chat.id ? "bg-gray-100" : ""
                }`}
              >
                <div className="flex justify-between">
                  <h3 className="font-semibold">{chat.name}</h3>
                  <span className="text-xs text-gray-500">{chat.time}</span>
                </div>
                <p className="text-sm text-gray-600 truncate">
                  {chat.lastMessage}
                </p>
                {chat.unread > 0 && (
                  <span className="text-xs bg-blue-500 text-white rounded-full px-2 py-0.5 mt-1 inline-block">
                    {chat.unread}
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ✅ Chat Box */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            {/* Header */}
            <div className="p-4 border-b bg-white flex justify-between items-center">
              <h2 className="font-semibold">
                {mockChats.find((c) => c.id === selectedChat)?.name}
              </h2>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-2 bg-gray-100">
              {mockMessages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${
                    m.sender === "me" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-2xl shadow-sm ${
                      m.sender === "me"
                        ? "bg-blue-500 text-white rounded-br-none"
                        : "bg-white text-gray-800 rounded-bl-none"
                    }`}
                  >
                    {m.text}
                    <div className="text-[10px] text-gray-200 text-right mt-1">
                      {m.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t flex items-center gap-2">
              <input
                type="text"
                placeholder="اكتب رسالة..."
                className="flex-1 border rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button className="bg-blue-500 text-white p-2 rounded-full">
                <Send size={18} />
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            اختر محادثة لبدء الدردشة
          </div>
        )}
      </div>
    </div>
  );
}
