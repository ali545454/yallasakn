// src/pages/HelpPage.tsx

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle, Mail } from 'lucide-react';

// يمكنك إضافة أو تعديل هذه الأسئلة لتناسب تطبيقك
const faqs = [
  {
    question: "كيف يمكنني البحث عن شقة؟",
    answer: "يمكنك استخدام شريط البحث في الصفحة الرئيسية وتطبيق الفلاتر مثل الحي، السعر، ونوع السكن (طلاب أو طالبات) للعثور على الشقة المناسبة لك."
  },
  {
    question: "كيف أقوم بإضافة شقتي للإيجار؟",
    answer: "إذا كان لديك حساب 'صاحب سكن'، يمكنك الذهاب إلى لوحة التحكم والضغط على زر 'إضافة شقة جديدة'. ستحتاج إلى ملء جميع التفاصيل المطلوبة مثل العنوان، السعر، الصور، والمميزات."
  },
  {
    question: "كيف يمكنني التواصل مع صاحب الشقة؟",
    answer: "في صفحة تفاصيل كل شقة، ستجد معلومات الاتصال بصاحب السكن، مثل رقم الهاتف أو زر للتواصل عبر واتساب."
  },
  {
    question: "هل البيانات التي أقدمها آمنة؟",
    answer: "نعم، نحن نأخذ خصوصيتك على محمل الجد. جميع بياناتك الشخصية محمية ولا نشاركها مع أي طرف ثالث بدون موافقتك."
  },
  {
    question: "ماذا أفعل إذا نسيت كلمة المرور؟",
    answer: "يمكنك الذهاب إلى صفحة تسجيل الدخول والضغط على رابط 'نسيت كلمة المرور'. سيتم إرسال تعليمات إعادة تعيين كلمة المرور إلى بريدك الإلكتروني المسجل."
  }
];

const Help = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <div className="container py-4">
        <Breadcrumb
          items={[
            { label: 'الرئيسية', href: '/' },
            { label: 'مركز المساعدة' }
          ]}
        />
      </div>

      <main className="flex-grow container py-8">
        <div className="text-center mb-12">
          <HelpCircle className="mx-auto h-16 w-16 text-primary mb-4" />
          <h1 className="text-4xl font-bold tracking-tight">مركز المساعدة</h1>
          <p className="text-muted-foreground mt-2 text-lg">
            تجد هنا إجابات للأسئلة الأكثر شيوعًا.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>الأسئلة الشائعة</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger className="text-right">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-right">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>هل تحتاج إلى المزيد من المساعدة؟</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                إذا لم تجد إجابة لسؤالك، لا تتردد في التواصل معنا مباشرة.
              </p>
              <a 
                href="mailto:support@yallasakan.com" 
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4 w-full"
              >
                <Mail className="mr-2 h-4 w-4" />
                تواصل مع فريق الدعم
              </a>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Help;