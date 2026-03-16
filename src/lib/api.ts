import axios from "axios";

// Backend root URL (without trailing slash)
const DEFAULT_API_URL = "https://web-production-33f69.up.railway.app";

const ensureHttps = (url: string) => url.replace(/^http:\/\//i, "https://");

// In dev, we prefer using the same origin (e.g. via proxy) unless an explicit env var is set.
const getDefaultApiUrl = () => {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return DEFAULT_API_URL;
};

// Reads from env, falls back to current origin (if available), and forces HTTPS to avoid mixed-content issues.
export const API_URL = ensureHttps(
  (import.meta.env.VITE_API_URL || getDefaultApiUrl()).trim()
).replace(/\/+$/, "");
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

const forceHttps = (value?: string) =>
  value ? value.replace(/^http:\/\//i, "https://") : value;

api.interceptors.request.use((config) => {
  config.baseURL = forceHttps(config.baseURL);
  config.url = forceHttps(config.url);

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
  config.baseURL = forceHttps(config.baseURL);
  config.url = forceHttps(config.url);

  const token = getToken();
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});
