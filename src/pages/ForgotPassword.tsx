import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // هنا لاحقاً هتضيف كود الاتصال بالباك اند
    setSubmitted(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/20">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md">
        {!submitted ? (
          <>
            <h2 className="text-2xl font-semibold mb-4 text-center">
              نسيت كلمة المرور؟
            </h2>
            <p className="text-sm text-gray-500 text-center mb-6">
              أدخل بريدك الإلكتروني وسنرسل لك رابط إعادة التعيين.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder="البريد الإلكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" className="w-full">
                إرسال الرابط
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">
              تحقق من بريدك الإلكتروني
            </h2>
            <p className="text-gray-500">
              لقد أرسلنا لك رابطًا لإعادة تعيين كلمة المرور.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
