import React from "react";
import { Star, MapPin, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import FavoriteButton from "@/components/FavoriteButton";

const ApartmentHeader = ({ apartment, handleShare }) => (
  <section className="mb-4">
    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
      {apartment.title}
    </h1>
    <div className="flex flex-wrap items-center justify-between mt-2 text-sm text-gray-600">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1 font-medium">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          {apartment.averageRating || "جديد"} ({apartment.reviewCount || 0}{" "}
          تقييمات)
        </span>
        <span className="text-gray-400">·</span>
        <a
          href="#location"
          className="flex items-center gap-1 font-medium hover:underline"
        >
          <MapPin className="w-4 h-4" />
          {apartment.neighborhood}, {apartment.address}
        </a>
      </div>
      <div className="flex items-center gap-2 mt-2 sm:mt-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleShare}
          className="flex items-center gap-2"
        >
          <Share2 className="w-5 h-5" />
          <span className="font-medium">مشاركة</span>
        </Button>
        <FavoriteButton apartment={apartment} />
      </div>
    </div>
  </section>
);

export default ApartmentHeader;
