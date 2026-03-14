import axiosInstance from "@/utils/axiosInstance";
import type { User } from "@/context/UserContext";

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
