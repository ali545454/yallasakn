import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
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
  refetchFavorites: () => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const FAVORITES_STORAGE_KEY = "favorites";

const parseFavoritesFromStorage = (): string[] => {
  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === "string")
      : [];
  } catch {
    return [];
  }
};

const extractFavoriteUuids = (data: unknown): string[] => {
  if (
    typeof data === "object" &&
    data !== null &&
    "apartments" in data &&
    Array.isArray((data as { apartments?: unknown[] }).apartments)
  ) {
    return ((data as { apartments: FavoriteApartmentApi[] }).apartments || [])
      .map((apt) => apt.uuid)
      .filter(Boolean);
  }

  if (
    typeof data === "object" &&
    data !== null &&
    "favorites" in data &&
    Array.isArray((data as { favorites?: unknown[] }).favorites)
  ) {
    return ((data as { favorites: FavoriteApartmentApi[] }).favorites || [])
      .map((apt) => apt.uuid)
      .filter(Boolean);
  }

  return [];
};

const fetchFavoritesFromServer = async () => {
  const endpoints = [
    "/api/v1/favorites",
    "/api/v1/favorites/",
    "/api/v1/favorites/list",
    "/api/v1/favorites/my",
  ];

  for (const endpoint of endpoints) {
    try {
      const response = await axiosInstance.get(endpoint);
      return extractFavoriteUuids(response.data);
    } catch {
      // try next endpoint variant
    }
  }

  throw new Error("favorites_fetch_failed");
};

const addFavoriteOnServer = async (uuid: string) => {
  const attempts: Array<() => Promise<unknown>> = [
    () => axiosInstance.post("/api/v1/favorites", { apartment_uuid: uuid }),
    () => axiosInstance.post("/api/v1/favorites/", { apartment_uuid: uuid }),
    () => axiosInstance.post("/api/v1/favorites/add", { apartment_uuid: uuid }),
  ];

  for (const attempt of attempts) {
    try {
      await attempt();
      return;
    } catch {
      // continue
    }
  }

  throw new Error("favorites_add_failed");
};

const removeFavoriteOnServer = async (uuid: string) => {
  const attempts: Array<() => Promise<unknown>> = [
    () => axiosInstance.delete(`/api/v1/favorites/${uuid}`),
    () =>
      axiosInstance.delete("/api/v1/favorites", {
        data: { apartment_uuid: uuid },
      }),
    () => axiosInstance.post("/api/v1/favorites/remove", { apartment_uuid: uuid }),
  ];

  for (const attempt of attempts) {
    try {
      await attempt();
      return;
    } catch {
      // continue
    }
  }

  throw new Error("favorites_remove_failed");
};

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState<string[]>(() => parseFavoritesFromStorage());
  const [isLoadingFavorites, setIsLoadingFavorites] = useState(true);

  const refetchFavorites = useCallback(async () => {
    try {
      const favs = await fetchFavoritesFromServer();
      setFavorites(favs);
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favs));
    } catch {
      setFavorites(parseFavoritesFromStorage());
    }
  }, []);

  useEffect(() => {
    const run = async () => {
      await refetchFavorites();
      setIsLoadingFavorites(false);
    };
    run();
  }, [refetchFavorites]);

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

  const isFavorite = useCallback((uuid: string) => favorites.includes(uuid), [favorites]);

  const toggleFavorite = useCallback(
    async (uuid: string) => {
      const isCurrentlyFavorite = favorites.includes(uuid);

      setFavorites((prev) =>
        prev.includes(uuid) ? prev.filter((favId) => favId !== uuid) : [...prev, uuid]
      );

      try {
        if (isCurrentlyFavorite) {
          await removeFavoriteOnServer(uuid);
        } else {
          await addFavoriteOnServer(uuid);
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
      value={{
        favorites,
        isFavorite,
        toggleFavorite,
        setFavorites,
        isLoadingFavorites,
        refetchFavorites,
      }}
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
