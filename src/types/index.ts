// types/index.ts

export interface User {
  uuid: string;
  full_name: string;
  email: string;
  phone?: string;
  role: "student" | "owner" | "admin";
  university?: string;
  college?: string;
  academic_year?: string;
  avatar?: string;
  apartments?: Apartment[];
  created_at?: string;
  updated_at?: string;
}

export interface Apartment {
  uuid: string;
  title: string;
  description: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  neighborhood: string;
  address?: string;
  main_image?: string;
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
  priceRange: { min: number; max: number };
  bedrooms: string;
  sortBy: string;
  showVerifiedOnly: boolean;
}