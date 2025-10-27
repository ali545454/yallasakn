import { Link, useLocation } from "react-router-dom";
import { Home, Search, Heart, User, HelpCircle, MessageSquare } from "lucide-react"; // ✅ أضف MessageSquare

const MobileMenu = () => {
  const location = useLocation();

  const menuItems = [
    { to: "/search", icon: <Search size={22} />, label: "بحث" },
    { to: "/messages", icon: <MessageSquare size={22} />, label: "رسائل" }, // ✅ أضف هذا
    { to: "/help", icon: <HelpCircle size={22} />, label: "مساعدة" },
    { to: "/profile#favorites", icon: <Heart size={22} />, label: "مفضلة", hash: "#favorites" },
    { to: "/profile", icon: <User size={22} />, label: "الملف الشخصي" },
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
      <div className="relative bg-white rounded-t-2xl border-t border-gray-200 py-3 px-2">
        <div className="flex w-full justify-around items-end">
          {/* عناصر القائمة على اليسار */}
          <div className="flex flex-1 justify-around">
            {menuItems.slice(0, 2).map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`flex flex-col items-center gap-1 transition-colors duration-200 ${
                  isActive(item) ? "text-blue-600" : "text-gray-500 hover:text-blue-600"
                }`}
              >
                {item.icon}
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            ))}
          </div>

          {/* الرئيسية */}
          <div className="relative mx-4 -mt-10 flex justify-center">
            <Link
              to="/"
              className="bg-blue-600 text-white rounded-full p-4 shadow-xl ring-4 ring-white transition-transform duration-300 hover:scale-105"
            >
              <Home size={30} />
            </Link>
          </div>

          {/* عناصر القائمة على اليمين */}
          <div className="flex flex-1 justify-around">
            {menuItems.slice(2).map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`flex flex-col items-center gap-1 transition-colors duration-200 ${
                  isActive(item) ? "text-blue-600" : "text-gray-500 hover:text-blue-600"
                }`}
              >
                {item.icon}
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
