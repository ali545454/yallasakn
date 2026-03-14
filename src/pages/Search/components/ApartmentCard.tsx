import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Bed, Bath, Ruler, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Apartment } from "../../../types";
import FavoriteButton from "@/components/FavoriteButton";

interface ApartmentCardProps {
  apartment: Apartment;
}

const ApartmentCard = React.memo(({ apartment }: ApartmentCardProps) => {
  const navigate = useNavigate();

  return (
    <Card
      key={apartment.uuid}
      className="flex flex-col overflow-hidden transition-shadow hover:shadow-lg"
    >
      <div className="relative">
        <img
          src={apartment.images?.[0] || "/placeholder.jpg"}
          alt={apartment.title}
          className="h-48 w-full object-cover"
          loading="lazy"
        />
        <FavoriteButton
          apartmentUuid={apartment.uuid}
          className="absolute right-2 top-2"
          iconClassName="h-4 w-4"
        />
        {apartment.isVerified && (
          <Badge className="absolute left-2 top-2 bg-green-500">موثق</Badge>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-2 text-lg font-semibold">{apartment.title}</h3>
        <p className="mb-2 line-clamp-2 text-sm text-muted-foreground">
          {apartment.description}
        </p>
        <div className="mb-2 flex items-center text-sm text-muted-foreground">
          <MapPin className="ml-1 h-4 w-4" />
          {apartment.neighborhood}
        </div>
        <div className="mb-4 flex items-center justify-between text-sm">
          <div className="flex items-center">
            <Bed className="ml-1 h-4 w-4" />
            {apartment.bedrooms}
          </div>
          <div className="flex items-center">
            <Bath className="ml-1 h-4 w-4" />
            {apartment.bathrooms}
          </div>
          <div className="flex items-center">
            <Ruler className="ml-1 h-4 w-4" />
            {apartment.area} م²
          </div>
        </div>
        <div className="mb-4 flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">{apartment.price} جنيه</span>
          {apartment.rating && (
            <div className="flex items-center">
              <Star className="ml-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
              {apartment.rating}
            </div>
          )}
        </div>
        <Button className="mt-auto w-full" onClick={() => navigate(`/apartment/${apartment.uuid}`)}>
          عرض التفاصيل
        </Button>
      </div>
    </Card>
  );
});

ApartmentCard.displayName = "ApartmentCard";

export default ApartmentCard;
