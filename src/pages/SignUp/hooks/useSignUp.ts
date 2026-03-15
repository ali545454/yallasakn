// hooks/useSignUp.ts

import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { FormData } from "./useFormState";
import { sanitizePayload } from "../utils/sanitize";

import { API_URL } from "@/lib/api";

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

      const token = data.access_token || data.token;
      if (token) {
        localStorage.setItem("token", token);
      }
      if (data.user?.uuid) {
        localStorage.setItem("uuid", data.user.uuid);
      }

      if (response.ok && data.user) {
        setUser(data.user);
        if (data.user.role === "student") {
          navigate("/free-plan");
        } else {
          navigate("/profile");
        }
      } else {
        const serverMessage = data?.message || data?.error || "";

        const isDuplicateEmail =
          response.status === 409 ||
          /email.*(exists|used|already)/i.test(serverMessage) ||
          /البريد/.test(serverMessage);
        const isDuplicatePhone =
          response.status === 409 ||
          /phone.*(exists|used|already)/i.test(serverMessage) ||
          /الرقم/.test(serverMessage);

        if (isDuplicateEmail && isDuplicatePhone) {
          setError(
            "البريد الإلكتروني ورقم الهاتف مستخدمان بالفعل. حاول تسجيل الدخول أو استخدم بيانات أخرى."
          );
        } else if (isDuplicateEmail) {
          setError("البريد مسجل بالفعل");
        } else if (isDuplicatePhone) {
          setError(
            "رقم الهاتف هذا مستخدم بالفعل. يرجى استخدام رقم آخر أو تسجيل الدخول."
          );
        } else {
          setError(serverMessage || "فشل التسجيل. برجاء المحاولة مرة أخرى.");
        }
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