import axios from "axios";

// Backend root URL (without trailing slash)
const DEFAULT_API_URL = "https://web-production-33f69.up.railway.app";

const ensureHttps = (url: string) => url.replace(/^http:\/\//i, "https://");

// Reads from env, falls back to default, and forces HTTPS to avoid mixed-content issues.
export const API_URL = ensureHttps((import.meta.env.VITE_API_URL || DEFAULT_API_URL).trim()).replace(/\/+$/, "");
export const API_V1_URL = `${API_URL}/api/v1`;

// Axios instance for v1 API endpoints.
export const api = axios.create({
  baseURL: API_V1_URL,
  withCredentials: true,
});

// Axios instance for root API (e.g., /api/admin)
export const apiRoot = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Add Authorization header automatically if we have a token in localStorage.
// Note: this is used by all API requests in the app.
import { getToken } from "@/utils/auth";

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});

apiRoot.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});
