import { useState } from "react";
import { Send, Search, MoreVertical, Phone, Video, MessageCircle } from "lucide-react";

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState(1);
  const [messages, setMessages] = useState([
    { id: 1, sender: "me", text: "هل الشقة متاحة؟", time: "14:15", read: true },
    { id: 2, sender: "them", text: "أيوه متاحة يا فندم", time: "14:17", read: true },
    { id: 3, sender: "me", text: "تمام، ممكن أعاينها بكرة؟", time: "14:20", read: true },
    { id: 4, sender: "them", text: "تمام، متى ممكن أعاين الشقة؟", time: "14:22", read: true },
  ]);
  const [inputValue, setInputValue] = useState("");

  const mockChats = [
    {
      id: 1,
      name: "Ahmed Owner",
      lastMessage: "تمام، متى ممكن أعاين الشقة؟",
      time: "14:22",
      unread: 0,
      avatar: "https://i.pravatar.cc/50?u=ahmed",
      online: true,
    },
    {
      id: 2,
      name: "Mona Landlord",
      lastMessage: "العنوان في الحي الرابع بجوار الجامعة.",
      time: "13:10",
      unread: 3,
      avatar: "https://i.pravatar.cc/50?u=mona",
      online: false,
    },
  ];

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    const newMessage = {
      id: messages.length + 1,
      sender: "me",
      text: inputValue,
      time: new Date().toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" }),
      read: false,
    };
    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");
  };

  const currentChat = mockChats.find((c) => c.id === selectedChat);

  return (
    <div className="flex h-screen bg-white md:bg-gradient-to-br md:from-blue-50 md:to-indigo-50">
      {/* Sidebar (قائمة المحادثات) */}
      <div className="w-full md:w-80 border-l border-gray-100 flex flex-col md:shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <h1 className="text-lg md:text-2xl font-semibold text-gray-800">الرسائل</h1>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Search size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Chats List */}
        <div className="flex-1 overflow-y-auto">
          {mockChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat.id)}
              className={`flex items-center gap-3 p-3 md:p-4 cursor-pointer transition ${
                selectedChat === chat.id
                  ? "bg-blue-50 border-r-4 border-blue-500"
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="relative flex-shrink-0">
                <img
                  src={chat.avatar}
                  alt={chat.name}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
                />
                {chat.online && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full ring-2 ring-white"></span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-gray-800 text-sm md:text-base">{chat.name}</h3>
                  <span className="text-xs text-gray-400">{chat.time}</span>
                </div>
                <p className="text-xs md:text-sm text-gray-600 truncate">
                  {chat.lastMessage}
                </p>
              </div>
              {chat.unread > 0 && (
                <span className="bg-blue-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {chat.unread}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="hidden md:flex flex-1 flex-col bg-white">
        {currentChat ? (
          <>
            {/* Header */}
            <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={currentChat.avatar}
                    alt={currentChat.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {currentChat.online && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full ring-2 ring-white"></span>
                  )}
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900">{currentChat.name}</h2>
                  <p className="text-xs text-gray-500">
                    {currentChat.online ? "متصل الآن" : "غير متصل"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <Phone size={18} />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <Video size={18} />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <MoreVertical size={18} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-3 md:space-y-4 bg-gradient-to-b from-blue-50/40 to-transparent">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.sender === "me" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] px-3 py-2 md:px-4 md:py-3 rounded-2xl shadow-sm ${
                      m.sender === "me"
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-gray-100 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm">{m.text}</p>
                    <div className="text-[10px] mt-1 flex justify-end opacity-70">
                      {m.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 md:p-5 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="اكتب رسالة..."
                  className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            <div className="text-center">
              <MessageCircle size={48} className="mx-auto mb-3 opacity-50" />
              <p>اختر محادثة لبدء الدردشة</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
