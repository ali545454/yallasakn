// hooks/useNeighborhoods.ts

import { useState, useEffect } from "react";
import { api } from "@/lib/api";

export const useNeighborhoods = () => {
  const [neighborhoods, setNeighborhoods] = useState<any[]>([]);

  useEffect(() => {
    api
      .get("/neighborhoods")
      .then((res) => setNeighborhoods(res.data))
      .catch((err) => console.error("Error fetching neighborhoods:", err));
  }, []);

  return { neighborhoods };
};