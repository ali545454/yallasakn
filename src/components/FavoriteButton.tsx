import type { MouseEvent } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/context/FavoritesContext";

type FavoriteButtonProps = {
  apartmentUuid: string;
  className?: string;
  iconClassName?: string;
  activeClassName?: string;
  inactiveClassName?: string;
};

const FavoriteButton = ({
  apartmentUuid,
  className = "",
  iconClassName = "h-5 w-5",
  activeClassName = "bg-red-100 text-red-600 hover:bg-red-200",
  inactiveClassName = "bg-white/90 text-gray-600 hover:bg-white",
}: FavoriteButtonProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(apartmentUuid);

  const handleToggle = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    await toggleFavorite(apartmentUuid);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      aria-label={favorite ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
      className={`rounded-full p-2 transition-colors ${favorite ? activeClassName : inactiveClassName} ${className}`}
    >
      <Heart className={`${iconClassName} ${favorite ? "fill-current" : ""}`} />
    </Button>
  );
};

export default FavoriteButton;
