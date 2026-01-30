import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/context/FavoritesContext";

interface FavoriteButtonProps {
  apartment: {
    uuid: string; 
    title?: string;
    price?: number;
    address?: string;
  };
}

const FavoriteButton = ({ apartment }: FavoriteButtonProps) => {
  const { favorites, toggleFavorite } = useFavorites();

  const isFavorite = favorites.includes(apartment.uuid);

  const handleToggle = () => {
    toggleFavorite(apartment.uuid);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
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
  );
};

export default FavoriteButton;
