import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Search, Heart, User, MessageCircle } from "lucide-react";
import { useFavorites } from "@/context/FavoritesContext";

const PRIMARY_BG = "#1877F2";
const ICON_ACTIVE_COLOR = "#FFFFFF";
const ICON_SIZE = 22;
const HOME_ICON_SIZE = 28;

type MenuItem = {
  to: string;
  icon: React.ReactElement;
  label: string;
  hash?: string;
};

const menuItems: MenuItem[] = [
  { to: "/search", icon: <Search size={ICON_SIZE} />, label: "بحث" },
  { to: "/messages", icon: <MessageCircle size={ICON_SIZE} />, label: "الرسائل" },
  { to: "/", icon: <Home size={HOME_ICON_SIZE} />, label: "الرئيسية" },
  { to: "/profile#favorites", icon: <Heart size={ICON_SIZE} />, label: "مفضلة", hash: "#favorites" },
  { to: "/profile", icon: <User size={ICON_SIZE} />, label: "الملف" },
];

const MobileMenu = () => {
  const location = useLocation();
  const { favorites } = useFavorites();

  const isActive = (item: MenuItem) => {
    const pathOnly = item.to.split("#")[0];
    if (item.hash) {
      return location.pathname === pathOnly && location.hash === item.hash;
    }
    return location.pathname === pathOnly && !location.hash;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white/95 shadow-xl backdrop-blur-sm md:hidden">
      <div className="relative flex h-14 items-center justify-around px-2 py-2">
        {menuItems.map((item, index) => {
          if (index === 2) return null;
          const active = isActive(item);
          const isFavoritesItem = item.to.includes("#favorites");

          return (
            <Link
              key={item.to}
              to={item.to}
              className={`relative flex flex-col items-center justify-center transition-all duration-300 ${
                index === 1 ? "ml-12" : index === 3 ? "mr-12" : ""
              }`}
            >
              <div className={`transition-colors duration-300 ${active ? "text-[#1877F2]" : "text-gray-500 hover:text-gray-700"}`}>
                {item.icon}
              </div>
              {isFavoritesItem && favorites.length > 0 && (
                <span className="absolute -right-2 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white">
                  {favorites.length}
                </span>
              )}
              <span className={`mt-0.5 text-[10px] font-medium ${active ? "text-[#1877F2]" : "text-gray-500"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}

        <Link
          to={menuItems[2].to}
          className="absolute left-1/2 -top-4 flex h-16 w-16 -translate-x-1/2 transform items-center justify-center rounded-full border-4 border-white shadow-lg transition-all duration-300"
          style={{ backgroundColor: PRIMARY_BG }}
        >
          {React.cloneElement(menuItems[2].icon, { color: ICON_ACTIVE_COLOR })}
        </Link>
      </div>
    </div>
  );
};

export default MobileMenu;
