// src/pages/NotFound.tsx

import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SearchX, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // تم الإبقاء على هذه الميزة لأنها مفيدة لتتبع الأخطاء
    console.error(
      "❌ 404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      {/* flex-grow يضمن أن المحتوى يملأ المساحة المتاحة ويدفع الـ Footer للأسفل */}
      <main className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center shadow-lg">
          <CardHeader>
            <SearchX className="mx-auto h-16 w-16 text-destructive mb-4" />
            <CardTitle className="text-3xl font-bold">
              عفوًا! الصفحة غير موجودة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              الصفحة التي تبحث عنها ربما تم حذفها، أو تغير اسمها، أو أنها غير متاحة مؤقتًا.
            </p>
            {/* استخدام <Button asChild> مع <Link> هو الطريقة الصحيحة
              لجعل رابط React Router يظهر كزر من shadcn/ui
            */}
            <Button asChild size="lg">
              <Link to="/">
                <Home className="ml-2 h-4 w-4" />
                العودة إلى الصفحة الرئيسية
              </Link>
            </Button>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;