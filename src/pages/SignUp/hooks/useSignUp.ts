// hooks/useSignUp.ts

import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { FormData } from "./useFormState";
import { sanitizePayload } from "../utils/sanitize";

export const API_URL =
  import.meta.env.VITE_API_URL || `https://web-production-33f69.up.railway.app`;

export const useSignUp = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleSubmit = async (
    e: React.FormEvent,
    formData: FormData,
    userType: "student" | "owner",
    setError: (error: string | null) => void,
    setIsLoading: (loading: boolean) => void
  ) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const apiPayload = {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      birthDate: formData.birthDate,
      gender: formData.gender,
      userType: userType,
      academicYear: userType === "student" ? formData.academicYear : undefined,
      faculty: userType === "student" ? formData.faculty : undefined,
      university: userType === "student" ? formData.university : undefined,
    };

    const cleanPayload = Object.fromEntries(
      Object.entries(apiPayload).filter(
        ([, value]) => value !== "" && value !== null && value !== undefined
      )
    );

    const sanitized = sanitizePayload(cleanPayload);

    try {
      const response = await fetch(`${API_URL}/api/v1/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sanitized),
        credentials: "include",
      });
      const data = await response.json();
      console.log("Response:", data);

      if (response.ok && data.user) {
        setUser(data.user);
        if (data.user.role === "student") {
          navigate("/free-plan");
        } else {
          navigate("/profile");
        }
      } else {
        setError(data.message || "فشل التسجيل. برجاء المحاولة مرة أخرى.");
      }
    } catch (err) {
      console.error("Error while registering:", err);
      setError("حدث خطأ أثناء الاتصال بالخادم.");
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSubmit };
};