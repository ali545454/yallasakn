import { Link, useLocation } from "react-router-dom";
import { Home, Search, Heart, User, HelpCircle, MessageCircle } from "lucide-react";

const MobileMenu = () => {
  const location = useLocation();

  const menuItems = [
    { to: "/", icon: <Home size={20} />, label: "الرئيسية" },
    { to: "/search", icon: <Search size={20} />, label: "بحث" },
    { to: "/messages", icon: <MessageCircle size={20} />, label: "الرسائل" },
    { to: "/profile#favorites", icon: <Heart size={20} />, label: "مفضلة", hash: "#favorites" },
    { to: "/profile", icon: <User size={20} />, label: "الملف" },
    { to: "/help", icon: <HelpCircle size={20} />, label: "مساعدة" },
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
      <div className="flex justify-around items-center border-t border-gray-200 py-2 px-2">
        {menuItems.map((item) => {
          const active = isActive(item);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center gap-0.5 px-2 transition-all duration-200 rounded-lg ${
                active
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-500 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              {item.icon}
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileMenu;
