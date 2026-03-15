import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@/context/UserContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  extractApiErrorMessage,
  fetchAuthProfile,
  loginWithGoogle,
} from "@/utils/auth";
import { API_URL } from "./AdminLogin";


const Login = () => {
  const { setUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<"student" | "owner">("student");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
const API_URL = import.meta.env.VITE_API_URL || "https://web-production-33f69.up.railway.app";

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  setError(null);

  try {
    const response = await fetch(`${API_URL}/api/v1/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password, role: userType }),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.error || "فشل تسجيل الدخول.");

    if (data.user?.uuid) {
      if (data.access_token) localStorage.setItem("token", data.access_token);
      localStorage.setItem("uuid", data.user.uuid);
      setUser(data.user);

      const profile = await fetchAuthProfile();
      setUser(profile ?? data.user ?? null);

      const role = (profile?.role || data.user?.role) as "student" | "owner" | undefined;
      navigate(role === "owner" ? "/dashboard" : "/profile");
    }
  } catch (err) {
    setError(extractApiErrorMessage(err, "حدث خطأ ما، حاول مرة أخرى."));
  } finally {
    setIsLoading(false);
  }
};
  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) {
      setError("تعذر الحصول على رمز Google. حاول مرة أخرى.");
      return;
    }

    setError(null);
    setIsGoogleLoading(true);

    try {
      await loginWithGoogle({ credential: credentialResponse.credential });
      const profile = await fetchAuthProfile();
      setUser(profile);
      navigate("/profile");
    } catch (err) {
      setError(
        extractApiErrorMessage(err, "فشل تسجيل الدخول عبر Google. تحقق من المحاولة مرة أخرى.")
      );
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError("فشل تسجيل الدخول عبر Google. حاول مرة أخرى.");
  };

  return (
    <>
      <Header />

      <div className="w-full min-h-screen lg:grid lg:grid-cols-2">
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid w-[400px] gap-6">
            <div className="grid gap-2 text-center">
              <Link to="/" className="mb-4">
                <img
                  src="/yallasakn.png"
                  alt="YallaSakn Logo"
                  className="h-12 mx-auto object-contain"
                />
              </Link>
              <h1 className="text-3xl font-bold">مرحباً بعودتك</h1>
              <p className="text-balance text-muted-foreground">
                أدخل بياناتك للوصول إلى حسابك
              </p>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <div className="relative">
                  <Mail className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pr-10 h-11 text-right"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">كلمة المرور</Label>
                  <Link
                    to="/forgot-password"
                    className="mr-auto inline-block text-sm underline"
                  >
                    نسيت كلمة المرور؟
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pr-10 pl-10 h-11 text-right"
                  />
                  <button
                    type="button"
                    className="absolute left-3 top-3 text-muted-foreground"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  variant={userType === "student" ? "default" : "outline"}
                  onClick={() => setUserType("student")}
                >
                  طالب
                </Button>
                <Button
                  type="button"
                  variant={userType === "owner" ? "default" : "outline"}
                  onClick={() => setUserType("owner")}
                >
                  مالك
                </Button>
              </div>

              {error && (
                <p className="text-sm text-red-500 text-center" role="alert">
                  {error}
                </p>
              )}

              <Button type="submit" className="w-full h-11" disabled={isLoading || isGoogleLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                    جاري الدخول...
                  </>
                ) : (
                  "تسجيل الدخول"
                )}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    أو
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2 rounded-md border border-dashed p-3">
                <p className="text-sm font-medium text-muted-foreground">
                  المتابعة باستخدام Google
                </p>
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  useOneTap={false}
                  shape="pill"
                  text="continue_with"
                />
              </div>
            </form>

            <div className="mt-4 text-center text-sm">
              ليس لديك حساب؟{" "}
              <Link to="/signup" className="underline font-semibold">
                إنشاء حساب
              </Link>
            </div>
          </div>
        </div>

        <div className="hidden lg:block bg-muted">
          <img
            src="https://diarna.net/wp-content/uploads/2021/03/asayla-new-assiut-3.jpg"
            alt="صورة شقة عصرية"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Login;
