// hooks/useApartments.ts

import { useState, useEffect } from "react";
import { convertObjectKeysToCamelCase } from "../utils/convertKeys";
import { Apartment } from "../../../types";

export const API_URL = import.meta.env.VITE_API_URL || `https://web-production-33f69.up.railway.app/`;

export const useApartments = () => {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const response = await fetch(`${API_URL}/api/v1/apartments/all_apartments`);
        if (!response.ok) throw new Error("فشل جلب البيانات من الخادم");
        const data = await response.json();
        const formattedData = convertObjectKeysToCamelCase(data);
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