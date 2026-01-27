// types/index.ts

export interface Apartment {
  uuid: string;
  title: string;
  description: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  neighborhood: string;
  images?: string[];
  isVerified?: boolean;
  rating?: number;
  reviewCount?: number;
  features?: string[];
  createdAt?: string;
}

export interface Neighborhood {
  id: number;
  name: string;
}

export interface FilterState {
  searchTerm: string;
  selectedNeighborhood: string;
  priceRange: [number, number];
  bedrooms: string;
  sortBy: string;
  showVerifiedOnly: boolean;
}