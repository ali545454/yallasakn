import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // لاحقاً هيتضاف هنا كود الاتصال بالباك اند
    setSubmitted(true);
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-[80vh] bg-muted/20 px-4">
        <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-lg border">
          {!submitted ? (
            <>
              <div className="flex flex-col items-center mb-6">
                <div className="bg-primary/10 p-3 rounded-full mb-3">
                  <Lock className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold text-center mb-2">
                  نسيت كلمة المرور؟
                </h2>
                <p className="text-sm text-gray-500 text-center">
                  أدخل بريدك الإلكتروني وسنرسل لك رابط إعادة التعيين.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute right-3 top-3 text-gray-400" size={18} />
                  <Input
                    type="email"
                    placeholder="البريد الإلكتروني"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pr-10"
                  />
                </div>
                <Button type="submit" className="w-full">
                  إرسال الرابط
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="bg-green-100 inline-block p-3 rounded-full mb-3">
                <Mail className="w-6 h-6 text-green-600" />
              </div>
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
      <Footer />
    </>
  );
};

export default ForgotPassword;
