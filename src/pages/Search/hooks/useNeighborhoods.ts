// hooks/useNeighborhoods.ts

import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "./useApartments";

export const useNeighborhoods = () => {
  const [neighborhoods, setNeighborhoods] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/v1/neighborhoods`)
      .then((res) => setNeighborhoods(res.data))
      .catch((err) => console.error("Error fetching neighborhoods:", err));
  }, []);

  return { neighborhoods };
};