import { useState } from "react";
import { Home, Search, Heart, User, HelpCircle, MessageCircle, ChevronUp } from "lucide-react";

export default function MobileMenu() {
  const [activeRoute, setActiveRoute] = useState("/");
  const [unreadMessages, setUnreadMessages] = useState(3);
  const [favoritesCount, setFavoritesCount] = useState(5);

  const leftItems = [
    { to: "/search", icon: <Search size={22} />, label: "بحث" },
    { to: "/help", icon: <HelpCircle size={22} />, label: "مساعدة" },
  ];

  const rightItems = [
    { to: "/messages", icon: <MessageCircle size={22} />, label: "الرسائل", badge: unreadMessages },
    { to: "/profile#favorites", icon: <Heart size={22} />, label: "مفضلة", badge: favoritesCount },
    { to: "/profile", icon: <User size={22} />, label: "الملف" },
  ];

  const handleNavigation = (path) => {
    setActiveRoute(path);
  };

  const isActive = (path) => {
    const pathOnly = path.split("#")[0];
    return activeRoute.split("#")[0] === pathOnly;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      {/* خلفية التأثير */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-blue-50/50 to-transparent pointer-events-none"></div>

      {/* القائمة الرئيسية */}
      <div className="relative bg-white/95 backdrop-blur-xl rounded-t-3xl border-t border-gray-100 shadow-2xl">
        <div className="px-4 py-3">
          {/* خط الفاصل العلوي */}
          <div className="flex justify-center mb-3">
            <div className="w-12 h-1 bg-gray-200 rounded-full"></div>
          </div>

          {/* العناصر */}
          <div className="flex w-full justify-between items-end">
            {/* العناصر على اليسار */}
            <div className="flex items-end gap-6">
              {leftItems.map((item) => (
                <button
                  key={item.to}
                  onClick={() => handleNavigation(item.to)}
                  className={`flex flex-col items-center gap-1 transition-all duration-300 group relative ${
                    isActive(item.to) ? "scale-110" : "scale-100 hover:scale-105"
                  }`}
                >
                  <div
                    className={`p-2.5 rounded-2xl transition-all duration-300 ${
                      isActive(item.to)
                        ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg"
                        : "text-gray-600 group-hover:bg-gray-100"
                    }`}
                  >
                    {item.icon}
                  </div>
                  <span
                    className={`text-xs font-semibold transition-all duration-300 ${
                      isActive(item.to) ? "text-blue-600" : "text-gray-600"
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              ))}
            </div>

            {/* زر الرئيسية في المنتصف */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-8 group">
              <button
                onClick={() => handleNavigation("/")}
                className={`relative bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-full p-4 shadow-2xl ring-4 ring-white transition-all duration-300 hover:scale-110 active:scale-95 ${
                  isActive("/") ? "scale-110 shadow-2xl" : "scale-100"
                }`}
              >
                <Home size={28} className="relative z-10" />
                
                {/* تأثير الإضاءة */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              </button>
            </div>

            {/* العناصر على اليمين */}
            <div className="flex items-end gap-6">
              {rightItems.map((item) => (
                <button
                  key={item.to}
                  onClick={() => handleNavigation(item.to)}
                  className={`flex flex-col items-center gap-1 transition-all duration-300 group relative ${
                    isActive(item.to) ? "scale-110" : "scale-100 hover:scale-105"
                  }`}
                >
                  <div
                    className={`p-2.5 rounded-2xl transition-all duration-300 relative ${
                      isActive(item.to)
                        ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg"
                        : "text-gray-600 group-hover:bg-gray-100"
                    }`}
                  >
                    {item.icon}
                    
                    {/* Badge للإشعارات */}
                    {item.badge > 0 && (
                      <div className="absolute -top-2 -right-2 bg-gradient-to-br from-red-500 to-red-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-lg ring-2 ring-white animate-pulse">
                        {item.badge > 9 ? "9+" : item.badge}
                      </div>
                    )}
                  </div>
                  <span
                    className={`text-xs font-semibold transition-all duration-300 ${
                      isActive(item.to) ? "text-blue-600" : "text-gray-600"
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* مساحة آمنة للـ Safe Area */}
      <div className="bg-white h-6"></div>
    </div>
  );
}