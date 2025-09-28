import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  Calendar,
  Users,
  Building,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useUser } from "@/context/UserContext";

export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const SignUp = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    birthDate: "",
    gender: "",
    university: "",
    faculty: "",
    academicYear: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userType, setUserType] = useState<"student" | "owner">("student");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("كلمتا المرور غير متطابقتين");
      return;
    }
    if (!agreeToTerms) {
      setError("يجب الموافقة على الشروط والأحكام");
      return;
    }

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

try {
  const response = await fetch(`${API_URL}/api/v1/auth/register`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(apiPayload),
  credentials: "include",
});
  const data = await response.json();
  console.log("Response:", data);

  if (response.ok && data.user) {
    setUser(data.user);       // 👈 خزّن بيانات المستخدم في الـ Context
    navigate("/profile");     // 👈 روح على صفحة البروفايل
  } else {
    setError(data.message || "فشل التسجيل. برجاء المحاولة مرة أخرى.");
  }
} catch (err) {
  console.error("Error while registering:", err);
  setError("حدث خطأ أثناء الاتصال بالخادم.");
} finally {
  setIsLoading(false);
}

  }
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl shadow-xl">
          <CardHeader className="text-center space-y-4">
            <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <User className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-3xl font-bold">
              إنشاء حساب جديد
            </CardTitle>
            <CardDescription>
              انضم إلينا واكتشف أفضل خيارات السكن الطلابي
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label className="text-base font-medium">نوع الحساب</Label>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant={userType === "student" ? "default" : "outline"}
                  onClick={() => setUserType("student")}
                  className="h-12"
                >
                  طالب
                </Button>
                <Button
                  type="button"
                  variant={userType === "owner" ? "default" : "outline"}
                  onClick={() => setUserType("owner")}
                  className="h-12"
                >
                  صاحب سكن
                </Button>
              </div>
            </div>
            <Separator />
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">الاسم الكامل</Label>
                  <div className="relative">
                    <User className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="fullName"
                      placeholder="أدخل اسمك الكامل"
                      value={formData.fullName}
                      onChange={(e) =>
                        handleInputChange("fullName", e.target.value)
                      }
                      className="pr-10 h-12 text-right"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">رقم الهاتف (اختياري)</Label>
                  <div className="relative">
                    <Phone className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="01xxxxxxxxx"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className="pr-10 h-12 text-right"
                    />
                  </div>
                </div>
              </div>
              {/* Personal Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="birthDate">تاريخ الميلاد</Label>
                  <div className="relative">
                    <Calendar className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="birthDate"
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) =>
                        handleInputChange("birthDate", e.target.value)
                      }
                      className="pr-10 h-12 text-right"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">الجنس (اختياري)</Label>
                  <div className="relative">
                    <Users className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
                    <select
                      id="gender"
                      value={formData.gender}
                      onChange={(e) =>
                        handleInputChange("gender", e.target.value)
                      }
                      className="w-full h-12 pr-10 pl-4 border border-input rounded-md bg-background text-right appearance-none focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="">اختر الجنس</option>
                      <option value="ذكر">ذكر</option>
                      <option value="أنثى">أنثى</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <div className="relative">
                  <Mail className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="pr-10 h-12 text-right"
                    required
                  />
                </div>
              </div>
              {userType === "student" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="faculty">الكلية</Label>
                      <div className="relative">
                        <Building className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="faculty"
                          placeholder="مثال: كلية الهندسة"
                          value={formData.faculty}
                          onChange={(e) =>
                            handleInputChange("faculty", e.target.value)
                          }
                          className="pr-10 h-12 text-right"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="academicYear">السنة الدراسية</Label>
                      <div className="relative">
                        <GraduationCap className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="academicYear"
                          placeholder="مثال: السنة الثالثة"
                          value={formData.academicYear}
                          onChange={(e) =>
                            handleInputChange("academicYear", e.target.value)
                          }
                          className="pr-10 h-12 text-right"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="university">الجامعة</Label>
                    <div className="relative">
                      <Building className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="university"
                        placeholder="مثال: جامعة القاهرة"
                        value={formData.university}
                        onChange={(e) =>
                          handleInputChange("university", e.target.value)
                        }
                        className="pr-10 h-12 text-right"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}
              {/* Password Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">كلمة المرور</Label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="أدخل كلمة المرور"
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      className="pr-10 pl-10 h-12 text-right"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute left-2 top-2 h-8 w-8"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="أعد إدخال كلمة المرور"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleInputChange("confirmPassword", e.target.value)
                      }
                      className="pr-10 pl-10 h-12 text-right"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute left-2 top-2 h-8 w-8"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
              {error && (
                <p className="text-sm font-medium text-red-500 text-center">
                  {error}
                </p>
              )}
              <div className="flex items-center space-x-2 space-x-reverse">
                <Checkbox
                  id="terms"
                  checked={agreeToTerms}
                  onCheckedChange={(checked) =>
                    setAgreeToTerms(checked === true)
                  }
                  required
                />
                <Label htmlFor="terms" className="text-sm">
                  أوافق على{" "}
                  <Link
                    to="/terms"
                    className="text-primary hover:text-primary-hover underline"
                  >
                    الشروط والأحكام
                  </Link>{" "}
                  و{" "}
                  <Link
                    to="/privacy"
                    className="text-primary hover:text-primary-hover underline"
                  >
                    سياسة الخصوصية
                  </Link>
                </Label>
              </div>
              <Button
                type="submit"
                className="w-full h-12 text-base"
                disabled={isLoading || !agreeToTerms}
              >
                {isLoading ? "جاري الإنشاء..." : "إنشاء الحساب"}
              </Button>
            </form>
            <Separator />
            <div className="text-center">
              <p className="text-muted-foreground">
                لديك حساب بالفعل؟{" "}
                <Link
                  to="/login"
                  className="text-primary hover:text-primary-hover font-medium transition-colors"
                >
                  تسجيل الدخول
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
};

export default SignUp;
