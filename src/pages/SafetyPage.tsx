// src/pages/SafetyPage.tsx

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, User, Home } from "lucide-react";
import Loading from "@/components/Loading";

const SafetyPage = () => {
  if (Loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="container py-4">
        <Breadcrumb
          items={[
            { label: "الرئيسية", href: "/" },
            { label: "إرشادات الأمان" },
          ]}
        />
      </div>

      <main className="flex-grow container py-8">
        <div className="text-center mb-12">
          <ShieldCheck className="mx-auto h-16 w-16 text-primary mb-4" />
          <h1 className="text-4xl font-bold tracking-tight">إرشادات الأمان</h1>
          <p className="text-muted-foreground mt-2 text-lg">
            سلامتك هي أولويتنا. إليك بعض النصائح لضمان تجربة آمنة.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Card for Students */}
          <Card className="border-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <User className="h-6 w-6 text-primary" />
                <span className="text-xl">نصائح للطلاب</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-right">
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>تحقق من الهوية:</strong> تعامل فقط مع أصحاب السكن
                  الذين تبدو ملفاتهم الشخصية مكتملة وموثوقة.
                </li>
                <li>
                  <strong>لا تدفع مقدمًا:</strong> تجنب دفع أي مبالغ مالية (مثل
                  الإيجار أو التأمين) قبل معاينة الشقة وتوقيع عقد إيجار رسمي.
                </li>
                <li>
                  <strong>اذهب نهارًا:</strong> عند الذهاب لمعاينة شقة، اختر
                  وقتًا خلال النهار وأخبر صديقًا أو فردًا من عائلتك بمكانك.
                </li>
                <li>
                  <strong>اقرأ العقد جيدًا:</strong> تأكد من فهم جميع بنود عقد
                  الإيجار قبل التوقيع. لا تتردد في طرح الأسئلة.
                </li>
                <li>
                  <strong>احذر من العروض الوهمية:</strong> إذا كان عرض الإيجار
                  يبدو جيدًا لدرجة لا تصدق (سعر منخفض جدًا، صور مثالية)، فكن
                  حذرًا.
                </li>
                <li>
                  <strong>حافظ على خصوصيتك:</strong> استخدم نظام الرسائل الخاص
                  بالمنصة للتواصل في البداية وتجنب مشاركة معلومات شخصية غير
                  ضرورية.
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Card for Property Owners */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Home className="h-6 w-6 text-primary" />
                <span className="text-xl">نصائح لأصحاب السكن</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-right">
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>اطلب إثبات هوية:</strong> قبل توقيع العقد، من حقك طلب
                  إثبات هوية رسمي (مثل البطاقة الشخصية أو جواز السفر) من
                  المستأجر.
                </li>
                <li>
                  <strong>استخدم عقدًا رسميًا:</strong> استخدم دائمًا عقد إيجار
                  مكتوب يوضح جميع الشروط، الحقوق، والالتزامات لكلا الطرفين.
                </li>
                <li>
                  <strong>تأمين الممتلكات:</strong> تأكد من أن جميع الأبواب
                  والنوافذ بها أقفال آمنة وأن العقار مطابق لمعايير السلامة
                  الأساسية.
                </li>
                <li>
                  <strong>كن واضحًا بشأن القواعد:</strong> اشرح للمستأجر أي
                  قواعد خاصة بالمبنى أو الشقة بوضوح لتجنب أي سوء فهم مستقبلاً.
                </li>
                <li>
                  <strong>لا تسلم المفاتيح مبكرًا:</strong> لا تسلم مفاتيح الشقة
                  إلا بعد توقيع العقد واستلام الدفعة الأولى المتفق عليها
                  (التأمين والشهر الأول).
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center p-6 bg-secondary rounded-lg">
          <p className="text-lg font-semibold">تذكر دائمًا: ثق بحدسك.</p>
          <p className="text-muted-foreground">
            إذا شعرت بأن هناك شيئًا غير صحيح، فمن الأفضل توخي الحذر والانسحاب.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SafetyPage;
