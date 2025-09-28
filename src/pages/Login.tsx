import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Loader2,
  GraduationCap,
  Building,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useUser } from "@/context/UserContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";


// تأكد من أن هذا المتغير معرف بشكل صحيح في ملف .env.local
export const API_URL = import.meta.env.VITE_API_URL || `https://web-production-33f69.up.railway.app`;

// أيقونات SVG لـ Google و Facebook
const GoogleIcon = () => (
  <svg
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);




const Login = () => {
  const { setUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<"student" | "owner">("student");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  setError(null);

  try {
    const response = await fetch(`${API_URL}/api/v1/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // مهم عشان الكوكي يترسل
      body: JSON.stringify({ email, password, role: userType }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "فشل تسجيل الدخول. تحقق من بياناتك.");
    }

    if (data.user && data.user.uuid) {
      setUser(data.user);

      // ✅ فورًا بعد تسجيل الدخول، اعمل check للكويكي
      const checkResponse = await fetch(`${API_URL}/api/v1/auth/check`, {
        method: "GET",
        credentials: "include",
      });

      if (!checkResponse.ok) {
        throw new Error("لم يتم التحقق من تسجيل الدخول بعد.");
      }

      // كل شيء تمام، روح للصفحة المناسبة
      navigate(data.user.role === "owner" ? "/dashboard" : "/profile");
    }
  } catch (err: any) {
    setError(err.message || "حدث خطأ ما، حاول مرة أخرى.");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <>
      <Header />

      <div className="w-full min-h-screen lg:grid lg:grid-cols-2">
        {/* --- العمود الأيمن (نموذج التسجيل) --- */}
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

            {/* --- الفورم --- */}
            <form onSubmit={handleSubmit} className="grid gap-4">
              {/* البريد */}
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

              {/* الباسورد */}
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
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute left-1 top-1 h-9 w-9"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              </div>

              {/* خطأ */}
              {error && (
                <div className="text-red-600 text-sm text-center">{error}</div>
              )}

              {/* زرار تسجيل الدخول */}
              <Button
                type="submit"
                className="w-full h-11"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  "تسجيل الدخول"
                )}
              </Button>

              {/* OR */}
              <div className="relative my-2">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    أو سجل الدخول عبر
                  </span>
                </div>
              </div>

              {/* Google */}
              <Button
                variant="outline"
                className="w-full h-11"
                type="button"
                disabled={isLoading}
              >
                <GoogleIcon />
                <span className="mr-2">Google</span>
              </Button>
            </form>

            {/* رابط إنشاء حساب */}
            <div className="mt-4 text-center text-sm">
              ليس لديك حساب؟{" "}
              <Link to="/signup" className="underline font-semibold">
                إنشاء حساب
              </Link>
            </div>
          </div>
        </div>

        {/* --- العمود الأيسر (الصورة) --- */}
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
