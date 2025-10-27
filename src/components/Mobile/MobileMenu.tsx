import { Link, useLocation } from "react-router-dom";
import { Home, Search, Heart, User, HelpCircle, MessageCircle } from "lucide-react";

const MobileMenu = () => {
  const location = useLocation();

  const leftItems = [
    { to: "/search", icon: <Search size={20} />, label: "بحث" },
    { to: "/help", icon: <HelpCircle size={20} />, label: "مساعدة" },
  ];

  const rightItems = [
    { to: "/messages", icon: <MessageCircle size={20} />, label: "الرسائل" },
    { to: "/profile#favorites", icon: <Heart size={20} />, label: "مفضلة", hash: "#favorites" },
    { to: "/profile", icon: <User size={20} />, label: "الملف" },
  ];

  const isActive = (item: { to: string; hash?: string }) => {
    const pathOnly = item.to.split("#")[0];
    if (item.hash) {
      return location.pathname === pathOnly && location.hash === item.hash;
    }
    return location.pathname === pathOnly && !location.hash;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50 md:hidden">
      <div className="relative bg-white rounded-t-2xl border-t border-gray-200 py-2 px-3">
        <div className="flex w-full justify-between items-center">
          {/* ✅ العناصر على اليسار */}
          <div className="flex items-center gap-5">
            {leftItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`flex flex-col items-center gap-0.5 transition-colors duration-200 ${
                  isActive(item)
                    ? "text-blue-600"
                    : "text-gray-500 hover:text-blue-600"
                }`}
              >
                {item.icon}
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            ))}
          </div>

          {/* ✅ زر الرئيسية في المنتصف */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-7">
            <Link
              to="/"
              className="bg-blue-600 text-white rounded-full p-3 shadow-xl ring-4 ring-white transition-transform duration-300 hover:scale-105"
            >
              <Home size={26} />
            </Link>
          </div>

          {/* ✅ العناصر على اليمين */}
          <div className="flex items-center gap-5">
            {rightItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`flex flex-col items-center gap-0.5 transition-colors duration-200 ${
                  isActive(item)
                    ? "text-blue-600"
                    : "text-gray-500 hover:text-blue-600"
                }`}
              >
                {item.icon}
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
