// hooks/useFilteredApartments.ts

import { useState, useEffect } from "react";

export const useFilteredApartments = (
  apartments: any[],
  searchTerm: string,
  selectedNeighborhood: string,
  priceRange: [number, number],
  bedrooms: string,
  sortBy: string,
  showVerifiedOnly: boolean
) => {
  const [filteredApartments, setFilteredApartments] = useState<any[]>([]);

  useEffect(() => {
    let filtered = apartments;

    if (searchTerm) {
      filtered = filtered.filter(
        (apt) =>
          apt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          apt.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          apt.neighborhood.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedNeighborhood && selectedNeighborhood !== "all") {
      filtered = filtered.filter(
        (apt) => apt.neighborhood === selectedNeighborhood
      );
    }
    filtered = filtered.filter(
      (apt) => apt.price >= priceRange[0] && apt.price <= priceRange[1]
    );
    if (bedrooms && bedrooms !== "any") {
      const bedCount = parseInt(bedrooms);
      if (bedCount < 4) {
        filtered = filtered.filter((apt) => apt.bedrooms === bedCount);
      } else {
        filtered = filtered.filter((apt) => apt.bedrooms >= 4);
      }
    }
    if (showVerifiedOnly) {
      filtered = filtered.filter((apt) => apt.isVerified);
    }
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt || 0).getTime() -
            new Date(a.createdAt || 0).getTime()
        );
        break;
    }
    setFilteredApartments(filtered);
  }, [
    searchTerm,
    selectedNeighborhood,
    priceRange,
    bedrooms,
    sortBy,
    showVerifiedOnly,
    apartments,
  ]);

  return { filteredApartments };
};