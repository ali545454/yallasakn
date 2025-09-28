// src/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

useEffect(() => {
  const checkAuth = async () => {
 try {
        await axiosInstance.get("/api/v1/auth/check", {
          withCredentials: true, // مهم جدًا عشان الكوكي يترسل
        });
        setIsAuth(true);
      } catch (err) {
        setIsAuth(false);
      }
    };

  checkAuth();
}, []);


  if (isAuth === null) {
    return <p className="p-4">جاري التحقق من تسجيل الدخول...</p>;
  }

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
