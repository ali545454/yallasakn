// hooks/useFilters.ts

import { useState } from "react";

export const useFilters = (searchParams: URLSearchParams) => {
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(
    searchParams.get("neighborhood") || ""
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [bedrooms, setBedrooms] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);

  return {
    searchTerm,
    setSearchTerm,
    selectedNeighborhood,
    setSelectedNeighborhood,
    priceRange,
    setPriceRange,
    bedrooms,
    setBedrooms,
    sortBy,
    setSortBy,
    showVerifiedOnly,
    setShowVerifiedOnly,
  };
};