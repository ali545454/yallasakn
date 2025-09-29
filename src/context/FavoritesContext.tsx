import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "@/utils/axiosInstance";

interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (uuid: string) => void;
  setFavorites: (favs: string[]) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const FavoritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  // ✅ تحميل المفضلة من السيرفر أول ما يفتح التطبيق
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axiosInstance.get("/api/v1/favorite"); // endpoint بيجيب المفضلة
        if (res.status === 200) {
          // 🟢 ناخد uuid بدل id
          const favs = res.data.apartments.map((a: any) => a.uuid);
          setFavorites(favs);
          localStorage.setItem("favorites", JSON.stringify(favs));
        }
      } catch (err) {
        console.warn(
          "⚠️ فشل جلب المفضلة من السيرفر. هنستخدم localStorage فقط",
          err
        );
        const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
        setFavorites(favs);
      }
    };

    fetchFavorites();
  }, []);

  // ✅ حفظ أي تغيير في localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (uuid: string) => {
    setFavorites((prev) =>
      prev.includes(uuid)
        ? prev.filter((favId) => favId !== uuid)
        : [...prev, uuid]
    );
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, setFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context)
    throw new Error("useFavorites must be used within a FavoritesProvider");
  return context;
};
