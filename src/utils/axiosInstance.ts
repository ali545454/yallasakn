// src/utils/axiosInstance.ts
import axios from "axios";
import { getToken } from "./auth";

const baseURL = import.meta.env.VITE_API_URL || "https://web-production-33f69.up.railway.app";

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

// Add Authorization header automatically if we have a token in localStorage
axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});

export default axiosInstance;