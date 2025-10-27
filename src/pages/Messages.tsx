
import { useState } from "react";
import { Send, Search, MoreVertical, Phone, Video, X } from "lucide-react";

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState(1);
  const [messages, setMessages] = useState([
    { id: 1, sender: "me", text: "هل الشقة متاحة؟", time: "14:15", read: true },
    { id: 2, sender: "them", text: "أيوه متاحة يا فندم", time: "14:17", read: true },
    { id: 3, sender: "me", text: "تمام، ممكن أعاينها بكرة؟", time: "14:20", read: true },
    { id: 4, sender: "them", text: "تمام، متى ممكن أعاين الشقة؟", time: "14:22", read: true },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

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
    {
      id: 3,
      name: "Fatma Agent",
      lastMessage: "شقة جديدة وسط البلد 120 متر",
      time: "11:45",
      unread: 0,
      avatar: "https://i.pravatar.cc/50?u=fatma",
      online: true,
    },
  ];

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: "me",
        text: inputValue,
        time: new Date().toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" }),
        read: false,
      };
      setMessages([...messages, newMessage]);
      setInputValue("");
    }
  };

  const currentChat = mockChats.find((c) => c.id === selectedChat);

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Sidebar */}
      <div className="w-80 bg-white shadow-xl flex flex-col border-l border-gray-100">
        {/* Header */}
        <div className="p-5 border-b border-gray-100 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">الرسائل</h1>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-full transition">
                <Search size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="relative">
            <Search size={18} className="absolute right-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="ابحث عن محادثة..."
              className="w-full bg-gray-100 border border-gray-200 rounded-full py-2.5 pr-10 pl-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition"
            />
          </div>
        </div>

        {/* Chats List */}
        <div className="flex-1 overflow-y-auto">
          {mockChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat.id)}
              className={`p-4 cursor-pointer transition-all border-b border-gray-50 ${
                selectedChat === chat.id
                  ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500"
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="flex gap-3">
                <div className="relative flex-shrink-0">
                  <img
                    src={chat.avatar}
                    alt={chat.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {chat.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900">{chat.name}</h3>
                    <span className="text-xs text-gray-500">{chat.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                </div>
                {chat.unread > 0 && (
                  <div className="flex-shrink-0 w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {chat.unread}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {currentChat ? (
          <>
            {/* Chat Header */}
            <div className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={currentChat.avatar}
                    alt={currentChat.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {currentChat.online && (
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full ring-2 ring-white"></div>
                  )}
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900">{currentChat.name}</h2>
                  <p className="text-xs text-gray-500">
                    {currentChat.online ? "متصل الآن" : "غير متصل"}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="p-2.5 hover:bg-gray-100 rounded-full transition text-gray-600">
                  <Phone size={20} />
                </button>
                <button className="p-2.5 hover:bg-gray-100 rounded-full transition text-gray-600">
                  <Video size={20} />
                </button>
                <button className="p-2.5 hover:bg-gray-100 rounded-full transition text-gray-600">
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-blue-50/30 to-transparent">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.sender === "me" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-md animate-fade-in ${
                      m.sender === "me"
                        ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-br-none"
                        : "bg-white text-gray-800 border border-gray-100 rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{m.text}</p>
                    <div
                      className={`text-xs mt-2 flex items-center justify-end gap-1 ${
                        m.sender === "me" ? "text-blue-100" : "text-gray-400"
                      }`}
                    >
                      {m.time}
                      {m.sender === "me" && m.read && (
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-6 bg-white border-t border-gray-200">
              <div className="flex items-end gap-3">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="اكتب رسالة..."
                  className="flex-1 border border-gray-200 rounded-full px-5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition resize-none"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-2.5 rounded-full hover:shadow-lg transition-all duration-200 active:scale-95"
                >
                  <Send size={20} />
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

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}