import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import axiosInstance from "@/utils/axiosInstance";

type FavoriteApartmentApi = {
  uuid: string;
};

interface FavoritesContextType {
  favorites: string[];
  isFavorite: (uuid: string) => boolean;
  toggleFavorite: (uuid: string) => Promise<void>;
  setFavorites: (favs: string[]) => void;
  isLoadingFavorites: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const FAVORITES_STORAGE_KEY = "favorites";

const parseFavoritesFromStorage = (): string[] => {
  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
};

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState<string[]>(() => parseFavoritesFromStorage());
  const [isLoadingFavorites, setIsLoadingFavorites] = useState(true);

  const syncFavoritesFromServer = useCallback(async () => {
    try {
      const res = await axiosInstance.get("/api/v1/favorites");
      const apartments: FavoriteApartmentApi[] = Array.isArray(res.data?.apartments)
        ? res.data.apartments
        : [];
      const favs = apartments.map((a) => a.uuid).filter(Boolean);
      setFavorites(favs);
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favs));
    } catch {
      setFavorites(parseFavoritesFromStorage());
    } finally {
      setIsLoadingFavorites(false);
    }
  }, []);

  useEffect(() => {
    syncFavoritesFromServer();
  }, [syncFavoritesFromServer]);

  useEffect(() => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === FAVORITES_STORAGE_KEY) {
        setFavorites(parseFavoritesFromStorage());
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const isFavorite = useCallback(
    (uuid: string) => favorites.includes(uuid),
    [favorites]
  );

  const toggleFavorite = useCallback(
    async (uuid: string) => {
      const isCurrentlyFavorite = favorites.includes(uuid);

      setFavorites((prev) =>
        prev.includes(uuid) ? prev.filter((favId) => favId !== uuid) : [...prev, uuid]
      );

      try {
        if (isCurrentlyFavorite) {
          await axiosInstance.delete(`/api/v1/favorites/${uuid}`);
        } else {
          await axiosInstance.post(`/api/v1/favorites`, { apartment_uuid: uuid });
        }
      } catch {
        setFavorites((prev) =>
          prev.includes(uuid) ? prev.filter((favId) => favId !== uuid) : [...prev, uuid]
        );
      }
    },
    [favorites]
  );

  return (
    <FavoritesContext.Provider
      value={{ favorites, isFavorite, toggleFavorite, setFavorites, isLoadingFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
