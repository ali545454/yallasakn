import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Search, Heart, User, MessageCircle } from "lucide-react";

const MobileMenu = () => {
  const location = useLocation();

  const PRIMARY_BG = "#1877F2"; // الأزرق
  const ICON_ACTIVE_COLOR = "#FFFFFF"; // أبيض
  const ICON_SIZE = 22;
  const HOME_ICON_SIZE = 28; // أيقونة Home أكبر

  const menuItems = [
    { to: "/search", icon: <Search size={ICON_SIZE} />, label: "بحث" },
    { to: "/messages", icon: <MessageCircle size={ICON_SIZE} />, label: "الرسائل" },
    { to: "/", icon: <Home size={HOME_ICON_SIZE} />, label: "الرئيسية" }, // Home في المنتصف
    { to: "/profile#favorites", icon: <Heart size={ICON_SIZE} />, label: "مفضلة", hash: "#favorites" },
    { to: "/profile", icon: <User size={ICON_SIZE} />, label: "الملف" },
  ];

  const isActive = (item: { to: string; hash?: string }) => {
    const pathOnly = item.to.split("#")[0];
    if (item.hash) {
      return location.pathname === pathOnly && location.hash === item.hash;
    }
    return location.pathname === pathOnly && !location.hash;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-xl z-50 md:hidden border-t border-gray-200">
      
      {/* 💡 التعديل: استخدام 'justify-around' و 'px-2' لتوزيع متساوٍ ومسافة حافة أقل */}
      {/* وتقليل الـ height إلى h-14 لتقريب الأيقونات السفلية */}
      <div className="flex justify-around items-center py-2 px-2 h-14 relative"> 
        
        {/* 💡 دمج جميع الأيقونات باستثناء Home في حلقة واحدة هنا */}
        {menuItems.map((item, index) => {
          const active = isActive(item);
          
          // تخطي أيقونة Home لأنها ستُعرض بشكل منفصل وبارز
          if (index === 2) return null; 
          
          return (
            <Link
              key={item.to}
              to={item.to}
              // 💡 إضافة مسافة وهمية للعنصر الوسطي لجعل التوزيع متساوياً
              // بالنسبة للعناصر الجانبية (الأول، الثاني، الرابع، الخامس)
              className={`
                flex flex-col items-center justify-center transition-all duration-300
                ${index === 1 ? "ml-12" : index === 3 ? "mr-12" : ""}
              `}
            >
              <div className={`transition-colors duration-300 ${active ? "text-[#1877F2]" : "text-gray-500 hover:text-gray-700"}`}>
                {item.icon}
              </div>
              <span className={`text-[10px] font-medium mt-0.5 ${active ? "text-[#1877F2]" : "text-gray-500"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}

        {/* Home في الوسط (يبقى كما هو) */}
        <Link
          to={menuItems[2].to}
          className="absolute left-1/2 transform -translate-x-1/2 -top-4 w-16 h-16 rounded-full flex items-center justify-center shadow-lg border-4 border-white transition-all duration-300"
          style={{ backgroundColor: PRIMARY_BG }}
        >
          {React.cloneElement(menuItems[2].icon, { color: ICON_ACTIVE_COLOR })}
        </Link>

      </div>
    </div>
  );
};

export default MobileMenu;