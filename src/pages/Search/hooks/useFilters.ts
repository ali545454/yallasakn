// hooks/useFilters.ts

import { useState, useEffect } from "react";

export const useFilters = (searchParams: URLSearchParams) => {
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(
    searchParams.get("neighborhood") || ""
  );
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 10000 });
  const [bedrooms, setBedrooms] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);

  useEffect(() => {
    setSearchTerm(searchParams.get("q") || "");
    setSelectedNeighborhood(searchParams.get("neighborhood") || "");
  }, [searchParams]);

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