import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Gift, CheckCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FreePlanWelcome() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white py-12 px-4">
      <Card className="w-full max-w-lg shadow-xl border-2 border-blue-200">
        <CardHeader className="flex flex-col items-center gap-2">
          <Gift size={48} className="text-blue-500" />
          <CardTitle className="text-2xl font-bold text-blue-700">مبروك! لديك خطة مجانية</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 my-6">
            <li className="flex items-center gap-2 text-lg text-gray-700">
              <CheckCircle className="text-green-500" size={20} />
              إرسال عدد محدود من الرسائل مجاناً
            </li>
            <li className="flex items-center gap-2 text-lg text-gray-700">
              <CheckCircle className="text-green-500" size={20} />
              تصفح الشقق بدون أي رسوم
            </li>
            <li className="flex items-center gap-2 text-lg text-gray-700">
              <CheckCircle className="text-green-500" size={20} />
              دعم فني سريع للطلاب الجدد
            </li>
          </ul>
          <div className="flex flex-col items-center gap-4 mt-8">
            <Button size="lg" className="w-full flex gap-2 justify-center" onClick={() => navigate("/")}>ابدأ الآن <ArrowRight size={18} /></Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
