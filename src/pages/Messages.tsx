
import { useState } from "react";
import { Send, Search, Phone, Video, MoreVertical, ArrowRight, Check, CheckCheck } from "lucide-react";

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);

  const mockChats = [
    {
      id: 1,
      name: "أحمد المالك",
      lastMessage: "تمام، متى ممكن أعاين الشقة؟",
      time: "14:22",
      unread: 2,
      avatar: "https://i.pravatar.cc/150?u=ahmed",
      online: true,
      read: false,
    },
    {
      id: 2,
      name: "منى صاحبة العقار",
      lastMessage: "العنوان في الحي الرابع بجوار الجامعة.",
      time: "13:10",
      unread: 0,
      avatar: "https://i.pravatar.cc/150?u=mona",
      online: false,
      read: true,
    },
    {
      id: 3,
      name: "محمد الوسيط",
      lastMessage: "عندي عروض جديدة ليك",
      time: "أمس",
      unread: 0,
      avatar: "https://i.pravatar.cc/150?u=mohamed",
      online: true,
      read: true,
    },
  ];

  const mockMessages = [
    { id: 1, sender: "me", text: "هل الشقة متاحة؟", time: "14:15", read: true },
    { id: 2, sender: "them", text: "أيوه متاحة يا فندم", time: "14:17" },
    { id: 3, sender: "me", text: "تمام، ممكن أعاينها بكرة؟", time: "14:20", read: true },
    { id: 4, sender: "them", text: "طبعاً، الساعة كام تناسبك؟", time: "14:21" },
    { id: 5, sender: "me", text: "الساعة 3 العصر لو متاح", time: "14:22", read: false },
  ];

  const currentChat = mockChats.find((c) => c.id === selectedChat);

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* القائمة الجانبية للمحادثات */}
      <div className={`${showSidebar ? 'w-full md:w-80' : 'w-0 md:w-80'} ${selectedChat && 'hidden md:flex'} md:flex flex-col bg-white border-l border-gray-200 shadow-lg transition-all duration-300`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-100">
          <h1 className="text-xl font-bold text-gray-800 mb-3">الرسائل</h1>
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="ابحث عن محادثة..."
              className="w-full pr-10 pl-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* قائمة المحادثات */}
        <div className="flex-1 overflow-y-auto">
          {mockChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => {
                setSelectedChat(chat.id);
                setShowSidebar(false);
              }}
              className={`p-4 cursor-pointer transition-all hover:bg-gray-50 border-b border-gray-100 ${
                selectedChat === chat.id ? "bg-blue-50 border-r-4 border-r-blue-500" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={chat.avatar}
                    alt={chat.name}
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-white shadow-md"
                  />
                  {chat.online && (
                    <span className="absolute bottom-0 left-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-800 text-sm truncate">
                      {chat.name}
                    </h3>
                    <span className="text-xs text-gray-500">{chat.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className={`text-sm truncate ${chat.unread > 0 ? 'font-medium text-gray-800' : 'text-gray-500'}`}>
                      {chat.lastMessage}
                    </p>
                    {chat.unread > 0 && (
                      <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* منطقة الرسائل */}
      <div className="flex-1 flex flex-col">
        {selectedChat && currentChat ? (
          <>
            {/* Header المحادثة */}
            <div className="bg-white border-b border-gray-200 shadow-sm">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => {
                      setSelectedChat(null);
                      setShowSidebar(true);
                    }}
                    className="md:hidden text-gray-600 hover:text-gray-800"
                  >
                    <ArrowRight size={20} />
                  </button>
                  <div className="relative">
                    <img
                      src={currentChat.avatar}
                      alt={currentChat.name}
                      className="w-11 h-11 rounded-full object-cover ring-2 ring-blue-100"
                    />
                    {currentChat.online && (
                      <span className="absolute bottom-0 left-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                    )}
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-800">{currentChat.name}</h2>
                    <p className="text-xs text-gray-500">
                      {currentChat.online ? "متصل الآن" : "غير متصل"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <Phone size={20} className="text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <Video size={20} className="text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <MoreVertical size={20} className="text-gray-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* منطقة الرسائل */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
              {mockMessages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.sender === "me" ? "justify-start" : "justify-end"} animate-fade-in`}
                >
                  <div
                    className={`max-w-xs md:max-w-md px-4 py-3 rounded-2xl shadow-sm ${
                      m.sender === "me"
                        ? "bg-white text-gray-800 rounded-tr-sm"
                        : "bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-tl-sm"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{m.text}</p>
                    <div className={`flex items-center gap-1 justify-end mt-1 ${
                      m.sender === "me" ? "text-gray-400" : "text-blue-100"
                    }`}>
                      <span className="text-xs">{m.time}</span>
                      {m.sender === "them" && (
                        m.read ? <CheckCheck size={14} /> : <Check size={14} />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* منطقة الإدخال */}
            <div className="bg-white border-t border-gray-200 p-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="flex-1 flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2 border border-gray-200 focus-within:border-blue-500 focus-within:bg-white transition-all">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="اكتب رسالتك هنا..."
                    className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && message.trim()) {
                        setMessage("");
                      }
                    }}
                  />
                </div>
                <button 
                  className={`p-3 rounded-full transition-all ${
                    message.trim() 
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg shadow-blue-500/30' 
                      : 'bg-gray-200'
                  }`}
                  disabled={!message.trim()}
                >
                  <Send size={18} className={message.trim() ? 'text-white' : 'text-gray-400'} />
                </button>
              </div>
            </div>
          </>
                ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <MessageCircle size={50} className="mb-3 text-gray-400" />
            <h2 className="text-lg font-medium">ابدأ المراسلة الآن</h2>
            <p className="text-sm mt-1 text-gray-400">اختر محادثة من القائمة على اليمين أو ابدأ محادثة جديدة</p>
          </div>
        )}
      </div>
    </div>
  );
}
