import { useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/utils/axiosInstance";
import { useFavorites } from "@/context/FavoritesContext";

interface FavoriteButtonProps {
  apartment: {
    uuid: string; // UUID
    title?: string;
    price?: number;
    address?: string;
  };
}

const FavoriteButton = ({ apartment }: FavoriteButtonProps) => {
  const { favorites, toggleFavorite, setFavorites } = useFavorites();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isFavorite = favorites.includes(apartment.uuid);

  const handleToggle = async () => {
    setLoading(true);
    setError(null);

    try {
      if (isFavorite) {
        // 🗑️ حذف من السيرفر
        await axiosInstance.delete(`/api/v1/favorite/remove/${apartment.uuid}`);
        toggleFavorite(apartment.uuid);
      } else {
        // ➕ إضافة للسيرفر
        const res = await axiosInstance.post(`/api/v1/favorite/add`, {
          apartment_id: apartment.uuid,
        });
        if (res.status === 201 || res.status === 409) {
          toggleFavorite(apartment.uuid);
        }
      }
    } catch (err) {
      console.error("Error toggling favorite:", err);
      setError("حدث خطأ في الاتصال. حاول مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Button
        variant="ghost"
        size="icon"
        onClick={handleToggle}
        disabled={loading}
        className={`transition-colors p-2 rounded-full ${
          isFavorite
            ? "bg-red-100 hover:bg-red-200"
            : "bg-primary text-white hover:bg-primary/80"
        }`}
      >
        <Heart
          className="w-5 h-5"
          stroke={isFavorite ? "red" : "white"}
          fill={isFavorite ? "red" : "none"}
        />
      </Button>

      {error && (
        <p className="mt-1 text-xs text-red-600 text-center">{error}</p>
      )}
    </div>
  );
};

export default FavoriteButton;
