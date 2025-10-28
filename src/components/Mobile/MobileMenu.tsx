import { Link, useLocation } from "react-router-dom";
import { Home, Search, Heart, User, HelpCircle, MessageCircle } from "lucide-react";

const MobileMenu = () => {
  const location = useLocation();

  // 1. استخدام اللون الأساسي (الأخضر من الصورة)
  const PRIMARY_COLOR_CLASSES = "text-green-600";
  const PRIMARY_BG_CLASSES = "bg-green-600";
  
  // زيادة حجم الأيقونات إلى 22
  const ICON_SIZE = 22;
  const ACTIVE_ICON_SIZE = 24; // زيادة حجم الأيقونة النشطة قليلاً

  const menuItems = [
    { to: "/", icon: <Home size={ICON_SIZE} />, label: "الرئيسية" },
    { to: "/search", icon: <Search size={ICON_SIZE} />, label: "بحث" },
    { to: "/messages", icon: <MessageCircle size={ICON_SIZE} />, label: "الرسائل" },
    { to: "/profile#favorites", icon: <Heart size={ICON_SIZE} />, label: "مفضلة", hash: "#favorites" },
    { to: "/profile", icon: <User size={ICON_SIZE} />, label: "الملف" },
    // **ملاحظة:** تم تقليل عدد العناصر إلى 5 ليتناسب مع النمط الدائري البارز بشكل أفضل
    // { to: "/help", icon: <HelpCircle size={ICON_SIZE} />, label: "مساعدة" },
  ];

  const isActive = (item: { to: string; hash?: string }) => {
    const pathOnly = item.to.split("#")[0];
    if (item.hash) {
      return location.pathname === pathOnly && location.hash === item.hash;
    }
    return location.pathname === pathOnly && !location.hash;
  };

  return (
    // 2. استخدام ظل خفيف ومظهر "مُعلَّق"
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-xl z-50 md:hidden border-t border-gray-200">
      
      {/* 3. زيادة الـ Padding لتحقيق مساحة "الشريحة السفلية" */}
      <div className="flex justify-around items-center py-2 px-2 h-16"> 
        {menuItems.map((item) => {
          const active = isActive(item);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`
                relative flex flex-col items-center justify-start h-full
                transition-all duration-300 w-full max-w-[80px]
              `}
            >
              
              {/* 4. حاوية الأيقونة - التعديل الرئيسي هنا */}
              <div
                className={`
                  flex flex-col items-center gap-0.5 pt-1 pb-0.5 transition-colors duration-300
                  ${active ? "transform -translate-y-5 transition-transform duration-300" : "pt-1"}
                `}
              >
                {active ? (
                  // العنصر النشط: دائرة بارزة
                  <div className={`
                    w-12 h-12 ${PRIMARY_BG_CLASSES} rounded-full 
                    flex items-center justify-center shadow-lg transform scale-110 
                    border-4 border-white
                  `}>
                    {/* أيقونة بيضاء داخل الدائرة */}
                    {/* ملاحظة: نستخدم أيقونة Lucide أكبر قليلاً داخل الدائرة */}
                    {React.cloneElement(item.icon, { size: ACTIVE_ICON_SIZE, color: "white" })}
                  </div>
                ) : (
                  // العناصر غير النشطة: أيقونة ونص
                  <>
                    <div className={`
                        transition-colors duration-300 
                        ${isActive ? PRIMARY_COLOR_CLASSES : "text-gray-500 hover:text-gray-700"}
                      `}>
                      {item.icon}
                    </div>
                    {/* 5. إظهار النص فقط للعناصر غير النشطة */}
                    <span className="text-[10px] font-medium text-gray-500 mt-0.5">
                      {item.label}
                    </span>
                  </>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileMenu;