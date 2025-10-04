import React, { useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ تم إرسال رابط إعادة تعيين كلمة السر إلى بريدك الإلكتروني.");
      } else {
        setMessage(`❌ ${data.message || "حدث خطأ أثناء الإرسال."}`);
      }
    } catch (err) {
      setMessage("❌ فشل الاتصال بالسيرفر.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/30">
      <Card className="w-full max-w-md shadow-xl border rounded-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">نسيت كلمة السر؟</CardTitle>
          <p className="text-muted-foreground text-sm mt-1">
            أدخل البريد الإلكتروني المسجل وسنرسل لك رابط لإعادة التعيين.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-muted-foreground" size={18} />
              <Input
                type="email"
                placeholder="البريد الإلكتروني"
                className="pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "جارٍ الإرسال..." : "إرسال الرابط"}
            </Button>
          </form>
          {message && (
            <p className="text-center text-sm mt-4">
              {message}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
