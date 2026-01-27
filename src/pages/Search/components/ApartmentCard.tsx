// components/ApartmentCard.tsx

import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, Bed, Bath, Ruler, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Apartment } from "../../../types";

interface ApartmentCardProps {
  apartment: Apartment;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

const ApartmentCard = React.memo(({ apartment, isFavorite, onToggleFavorite }: ApartmentCardProps) => {
  const navigate = useNavigate();

  return (
    <Card
      key={apartment.uuid}
      className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
    >
      <div className="relative">
        <img
          src={apartment.images?.[0] || "/placeholder.jpg"}
          alt={apartment.title}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 hover:bg-white"
          onClick={() => onToggleFavorite(apartment.uuid)}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
        </Button>
        {apartment.isVerified && (
          <Badge className="absolute top-2 left-2 bg-green-500">
            موثق
          </Badge>
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-lg mb-2">{apartment.title}</h3>
        <p className="text-muted-foreground text-sm mb-2 line-clamp-2">
          {apartment.description}
        </p>
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <MapPin className="h-4 w-4 ml-1" />
          {apartment.neighborhood}
        </div>
        <div className="flex items-center justify-between text-sm mb-4">
          <div className="flex items-center">
            <Bed className="h-4 w-4 ml-1" />
            {apartment.bedrooms}
          </div>
          <div className="flex items-center">
            <Bath className="h-4 w-4 ml-1" />
            {apartment.bathrooms}
          </div>
          <div className="flex items-center">
            <Ruler className="h-4 w-4 ml-1" />
            {apartment.area} م²
          </div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-primary">
            {apartment.price} جنيه
          </span>
          {apartment.rating && (
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 ml-1" />
              {apartment.rating}
            </div>
          )}
        </div>
        <Button
          className="w-full mt-auto"
          onClick={() => navigate(`/apartment/${apartment.uuid}`)}
        >
          عرض التفاصيل
        </Button>
      </div>
    </Card>
  );
});

ApartmentCard.displayName = "ApartmentCard";

export default ApartmentCard;