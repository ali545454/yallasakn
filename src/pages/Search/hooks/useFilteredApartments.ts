// hooks/useFilteredApartments.ts

import { useMemo } from "react";
import { Apartment, FilterState } from "../../../types";

export const useFilteredApartments = (
  apartments: Apartment[],
  filters: FilterState
) => {
  const filteredApartments = useMemo(() => {
    let filtered = apartments;

    if (filters.searchTerm) {
      filtered = filtered.filter(
        (apt) =>
          apt.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
          apt.description.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
          apt.neighborhood.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }
    if (filters.selectedNeighborhood && filters.selectedNeighborhood !== "all") {
      filtered = filtered.filter(
        (apt) => apt.neighborhood === filters.selectedNeighborhood
      );
    }
    if (filters.priceRange) {
      filtered = filtered.filter(
        (apt) => apt.price >= filters.priceRange.min && apt.price <= filters.priceRange.max
      );
    }
    if (filters.bedrooms && filters.bedrooms !== "any") {
      const bedCount = parseInt(filters.bedrooms);
      if (bedCount < 4) {
        filtered = filtered.filter((apt) => apt.bedrooms === bedCount);
      } else {
        filtered = filtered.filter((apt) => apt.bedrooms >= 4);
      }
    }
    if (filters.showVerifiedOnly) {
      filtered = filtered.filter((apt) => apt.isVerified);
    }
    switch (filters.sortBy) {
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
    return filtered;
  }, [apartments, filters]);

  return { filteredApartments };
};