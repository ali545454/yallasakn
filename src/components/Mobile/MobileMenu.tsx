import { Link, useLocation } from "react-router-dom";
import { Home, Search, Heart, User, HelpCircle, MessageCircle } from "lucide-react";

const MobileMenu = () => {
  const location = useLocation();

  // زيادة حجم الأيقونات إلى 22
  const ICON_SIZE = 22;

  const menuItems = [
    { to: "/", icon: <Home size={ICON_SIZE} />, label: "الرئيسية" },
    { to: "/search", icon: <Search size={ICON_SIZE} />, label: "بحث" },
    { to: "/messages", icon: <MessageCircle size={ICON_SIZE} />, label: "الرسائل" },
    { to: "/profile#favorites", icon: <Heart size={ICON_SIZE} />, label: "مفضلة", hash: "#favorites" },
    { to: "/profile", icon: <User size={ICON_SIZE} />, label: "الملف" },
    { to: "/help", icon: <HelpCircle size={ICON_SIZE} />, label: "مساعدة" },
  ];

  const isActive = (item: { to: string; hash?: string }) => {
    const pathOnly = item.to.split("#")[0];
    if (item.hash) {
      return location.pathname === pathOnly && location.hash === item.hash;
    }
    return location.pathname === pathOnly && !location.hash;
  };

  return (
    // 1. حاوية أكثر عصرية: استخدام ظل أقوى، شفافية خفيفة، وتأثير ضبابي
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm shadow-2xl z-50 md:hidden border-t border-gray-100">
      
      {/* زيادة Padding العمودي (py-3) لتحسين المساحة البيضاء */}
      <div className="flex justify-around items-center py-3 px-2">
        {menuItems.map((item) => {
          const active = isActive(item);
          return (
            // جعل رابط Link بـ position: relative ليتموضع مؤشر النشاط (Indicator) داخله
            <Link
              key={item.to}
              to={item.to}
              className={`
                relative flex flex-col items-center transition-all duration-300
                text-gray-500 hover:text-blue-600 w-full max-w-[80px]
              `}
            >
              
              {/* 2. مؤشر النشاط العصري (Active Indicator) */}
              {active && (
                <div className="absolute top-[-10px] h-0.5 w-6 rounded-full bg-blue-600 transition-opacity duration-300"></div>
              )}

              {/* 3. حاوية الأيقونة والنص */}
              <div
                className={`flex flex-col items-center gap-0.5 pt-1 pb-0.5 transition-colors duration-300 ${
                  active ? "text-blue-600" : "text-gray-500"
                }`}
              >
                {item.icon}
                {/* 4. زيادة حجم ووزن الخط قليلاً */}
                <span className="text-[11px] font-semibold">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileMenu;