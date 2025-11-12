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

export const API_URL =
  import.meta.env.VITE_API_URL || `https://web-production-33f69.up.railway.app`;

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
  const [userType, setUserType] = useState<"student" | "owner">("owner");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [passwordStrengthMsg, setPasswordStrengthMsg] = useState<string>("");
  const [passwordStrong, setPasswordStrong] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field === "password") {
      const { strong, message } = checkPasswordStrength(value);
      setPasswordStrengthMsg(message);
      setPasswordStrong(strong);
    }
  };

  // --- XSS protection (frontend) ---
  // stripTags removes any HTML tags, then escape special chars.
  const stripTags = (str: string) => {
    if (!str) return "";
    // remove tags
    const withoutTags = str.replace(/<\/?[^>]+(>|$)/g, "");
    // escape special chars to be safe when echoing back into DOM
    return withoutTags
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  // sanitize all string fields in payload
  const sanitizePayload = (payload: Record<string, any>) => {
    const out: Record<string, any> = {};
    Object.keys(payload).forEach((k) => {
      const v = payload[k];
      if (typeof v === "string") out[k] = stripTags(v.trim());
      else out[k] = v;
    });
    return out;
  };

  // --- password strength checker ---
  const checkPasswordStrength = (pw: string) => {
    const minLength = 8;
    const checks = [
      { re: /[a-z]/, label: "حرف صغير" },
      { re: /[A-Z]/, label: "حرف كبير" },
      { re: /[0-9]/, label: "رقم" },
      { re: /[^A-Za-z0-9]/, label: "رمز خاص" },
    ];
    const passed = checks.reduce((acc, c) => acc + (c.re.test(pw) ? 1 : 0), 0);
    if (pw.length < minLength) {
      return { strong: false, message: `ضعيفة — يجب ألا تقل عن ${minLength} حروف` };
    }
    if (passed < 3) {
      return { strong: false, message: "متوسطة — أضف أحرف كبيرة/أرقام/رموز" };
    }
    return { strong: true, message: "قوية ✅" };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // basic frontend checks
if (
  !formData.fullName ||
  !formData.email ||
  !formData.password ||
  !formData.confirmPassword ||
  !formData.birthDate ||
  (userType === "student" &&
    (!formData.faculty || !formData.academicYear || !formData.university))
) {
  setError("من فضلك املأ كل الحقول المطلوبة");
  return;
}

    if (!agreeToTerms) {
      setError("يجب الموافقة على الشروط والأحكام");
      return;
    }
    // check password strength again
    const { strong } = checkPasswordStrength(formData.password);
    if (!strong) {
      setError("كلمة المرور ضعيفة — الرجاء اختيار كلمة مرور أقوى.");
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

    // sanitize before sending
    const sanitized = sanitizePayload(apiPayload);


    const cleanPayload = Object.fromEntries(
  Object.entries(apiPayload).filter(
    ([, value]) => value !== "" && value !== null && value !== undefined
  )
);

    if (formData.password !== formData.confirmPassword) {
  setError("كلمتا المرور غير متطابقتين");
  return;
}

    try {
      const response = await fetch(`${API_URL}/api/v1/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanPayload),
        credentials: "include",
      });
      const data = await response.json();
      console.log("Response:", data);

      if (response.ok && data.user) {
        setUser(data.user); // خزّن بيانات المستخدم في الـ Context
        // إذا كان طالب جديد، وجهه لصفحة الخطة المجانية
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

  return (
    <>
      {/* CSS صغير لإخفاء مؤشر التقويم الافتراضي في المتصفحات WebKit/Chrome وتهيئة العنصر لعرض أيقونة مخصصة */}
      <style>{`
        /* إخفاء المؤشر الافتراضي لتاريخ (WebKit) */
        input[type="date"]::-webkit-calendar-picker-indicator {
          display: none;
          -webkit-appearance: none;
        }
        /* لإخفاء زر المسح في بعض المتصفحات */
        input[type="date"]::-webkit-clear-button { display: none; }
        /* Mozilla may still show indicator; we keep appearance-none */
      `}</style>

      <Header />
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl shadow-xl">
          <CardHeader className="text-center space-y-4">
            <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <User className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-3xl font-bold">إنشاء حساب جديد</CardTitle>
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
  <Calendar
    className="absolute right-3 top-3 h-5 w-5 text-muted-foreground cursor-pointer"
    onClick={() => document.getElementById("birthDate")?.showPicker?.()}
  />
  <input
    id="birthDate"
    type="date"
    value={formData.birthDate}
    onChange={(e) => handleInputChange("birthDate", e.target.value)}
    className="pr-10 h-12 text-right w-full border rounded-md focus:ring-2 focus:ring-primary/20 cursor-pointer"
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
                  {/* Password strength helper */}
                  <p
                    className={`text-sm mt-1 ${
                      passwordStrong ? "text-green-600" : "text-yellow-600"
                    }`}
                  >
                    {formData.password ? passwordStrengthMsg : "استخدم كلمة مرور قوية (8+ أحرف، أحرف كبيرة وصغيرة، أرقام، رموز)"}
                  </p>
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
                disabled={isLoading || !agreeToTerms || !passwordStrong}
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
