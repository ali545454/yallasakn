// src/utils/auth.ts
import axiosInstance from "@/utils/axiosInstance";
import type { User } from "@/context/UserContext";

export const TOKEN_KEY = "token";
export const UUID_KEY = "uuid";

// ---------------------- LocalStorage helpers ----------------------
export const getToken = (): string | null => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
};

export const setToken = (token: string) => {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch {
    // ignore
  }
};

export const clearToken = () => {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch {
    // ignore
  }
};

export const setUUID = (uuid: string) => {
  try {
    localStorage.setItem(UUID_KEY, uuid);
  } catch {
    // ignore
  }
};

export const clearUUID = () => {
  try {
    localStorage.removeItem(UUID_KEY);
  } catch {
    // ignore
  }
};

// ---------------------- Authorization header ----------------------
export const getAuthHeader = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// ---------------------- API functions ----------------------
type GoogleLoginPayload = {
  credential?: string;
  id_token?: string;
};

type ApiErrorResponse = {
  message?: string;
  error?: string;
};

export const loginWithGoogle = async (payload: GoogleLoginPayload) => {
  const response = await axiosInstance.post("/api/v1/auth/google-login", payload, {
    withCredentials: true,
  });
  return response.data;
};

export const fetchAuthProfile = async (): Promise<User> => {
  const response = await axiosInstance.get<User>("/api/v1/auth/profile", {
    withCredentials: true,
  });
  return response.data;
};

export const extractApiErrorMessage = (error: unknown, fallback: string) => {
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof (error as { response?: { data?: ApiErrorResponse } }).response === "object"
  ) {
    const data = (error as { response?: { data?: ApiErrorResponse } }).response?.data;
    return data?.message || data?.error || fallback;
  }
  if (error instanceof Error) return error.message;
  return fallback;
};