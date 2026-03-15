// hooks/useApartments.ts

import { useState, useEffect } from "react";
import { convertObjectKeysToCamelCase } from "../utils/convertKeys";
import { Apartment } from "../../../types";
import { api } from "@/lib/api";

export const useApartments = () => {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const response = await api.get("/apartments/all_apartments");
        const formattedData = convertObjectKeysToCamelCase(response.data);
        setApartments(formattedData);
      } catch (err: any) {
        setError(err.message);
        console.error("Error fetching apartments:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApartments();
  }, []);

  return { apartments, isLoading, error };
};