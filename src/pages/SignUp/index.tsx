// index.tsx

import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { User } from "lucide-react";
import { useFormState } from "./hooks/useFormState";
import { usePasswordStrength } from "./hooks/usePasswordStrength";
import { useValidation } from "./hooks/useValidation";
import { useSignUp } from "./hooks/useSignUp";
import UserTypeSelector from "./components/UserTypeSelector";
import BasicInfoFields from "./components/BasicInfoFields";
import PersonalInfoFields from "./components/PersonalInfoFields";
import StudentFields from "./components/StudentFields";
import PasswordFields from "./components/PasswordFields";
import TermsAndSubmit from "./components/TermsAndSubmit";

const SignUp = () => {
  const {
    formData,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    userType,
    setUserType,
    agreeToTerms,
    setAgreeToTerms,
    isLoading,
    setIsLoading,
    error,
    setError,
    handleInputChange,
  } = useFormState();

  const { passwordStrengthMsg, passwordStrong } = usePasswordStrength(formData.password);

  const { validateForm } = useValidation(formData, userType, agreeToTerms, passwordStrong);

  const { handleSubmit: submitSignUp } = useSignUp();

  const handleSubmit = async (e: React.FormEvent) => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    await submitSignUp(e, formData, userType, setError, setIsLoading);
  };

  return (
    <>
      <style>{`
        input[type="date"]::-webkit-calendar-picker-indicator {
          display: none;
          -webkit-appearance: none;
        }
        input[type="date"]::-webkit-clear-button { display: none; }
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
            <UserTypeSelector userType={userType} setUserType={setUserType} />
            <Separator />
            <form onSubmit={handleSubmit} className="space-y-4">
              <BasicInfoFields formData={formData} handleInputChange={handleInputChange} />
              <PersonalInfoFields formData={formData} handleInputChange={handleInputChange} />
              {userType === "student" && (
                <StudentFields formData={formData} handleInputChange={handleInputChange} />
              )}
              <PasswordFields
                formData={formData}
                handleInputChange={handleInputChange}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                showConfirmPassword={showConfirmPassword}
                setShowConfirmPassword={setShowConfirmPassword}
                passwordStrengthMsg={passwordStrengthMsg}
                passwordStrong={passwordStrong}
              />
              <TermsAndSubmit
                agreeToTerms={agreeToTerms}
                setAgreeToTerms={setAgreeToTerms}
                isLoading={isLoading}
                passwordStrong={passwordStrong}
                error={error}
              />
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