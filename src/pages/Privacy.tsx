// src/pages/PrivacyPolicy.tsx

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { Shield } from 'lucide-react';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <div className="container py-4">
        <Breadcrumb
          items={[
            { label: 'الرئيسية', href: '/' },
            { label: 'سياسة الخصوصية' }
          ]}
        />
      </div>

      <main className="flex-grow container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Shield className="mx-auto h-16 w-16 text-primary mb-4" />
            <h1 className="text-4xl font-bold tracking-tight">سياسة الخصوصية</h1>
            <p className="text-muted-foreground mt-2 text-lg">
              آخر تحديث: 19 سبتمبر 2025
            </p>
          </div>

          <Card>
            {/* تم استخدام تنسيقات prose لتحسين قراءة النصوص الطويلة */}
            <CardContent className="prose prose-lg max-w-none pt-8 text-right leading-relaxed">
              <p>
                نحن في "يلا سكن" (المشار إليه فيما بعد بـ "نحن" أو "المنصة") نلتزم بحماية خصوصية مستخدمينا. توضح هذه السياسة كيفية جمعنا واستخدامنا وحمايتنا لمعلوماتك الشخصية.
              </p>

              <h3>1. المعلومات التي نجمعها</h3>
              <p>نقوم بجمع أنواع مختلفة من المعلومات لتقديم وتحسين خدماتنا لك، بما في ذلك:</p>
              <ul>
                <li><strong>المعلومات الشخصية:</strong> مثل الاسم الكامل، البريد الإلكتروني، رقم الهاتف، تاريخ الميلاد، والبيانات الأكاديمية (الجامعة، الكلية، السنة الدراسية) التي تقدمها عند إنشاء حساب.</li>
                <li><strong>معلومات السكن:</strong> بالنسبة لأصحاب العقارات، نقوم بجمع تفاصيل العقار مثل العنوان، الصور، السعر، والمميزات.</li>
                <li><strong>بيانات الاستخدام:</strong> معلومات حول كيفية تفاعلك مع المنصة، مثل عمليات البحث التي تقوم بها، والصفحات التي تزورها.</li>
              </ul>

              <h3>2. كيف نستخدم معلوماتك</h3>
              <p>نستخدم المعلومات التي نجمعها للأغراض التالية:</p>
              <ul>
                <li>لإنشاء وإدارة حسابك على المنصة.</li>
                <li>لتسهيل التواصل بين الطلاب وأصحاب العقارات.</li>
                <li>لتخصيص تجربتك وعرض المحتوى والإعلانات ذات الصلة.</li>
                <li>لتحسين خدماتنا وتطوير ميزات جديدة.</li>
                <li>للتواصل معك بشأن التحديثات أو العروض أو للاستجابة لاستفسارات الدعم الفني.</li>
              </ul>

              <h3>3. مشاركة المعلومات</h3>
              <p>
                نحن لا نبيع أو نؤجر معلوماتك الشخصية لأطراف ثالثة. قد نشارك معلوماتك في الحالات التالية فقط:
              </p>
              <ul>
                <li><strong>مع مستخدمين آخرين:</strong> قد تتم مشاركة معلومات الاتصال الأساسية بين الطالب وصاحب العقار لتسهيل عملية الإيجار.</li>
                <li><strong>لأسباب قانونية:</strong> إذا طُلب منا ذلك بموجب القانون أو لحماية حقوقنا وسلامة مستخدمينا.</li>
              </ul>

              <h3>4. أمن البيانات</h3>
              <p>
                نتخذ تدابير أمنية معقولة لحماية معلوماتك من الوصول غير المصرح به أو التغيير أو الكشف. ومع ذلك، لا توجد طريقة نقل عبر الإنترنت أو تخزين إلكتروني آمنة بنسبة 100%.
              </p>

              <h3>5. حقوقك</h3>
              <p>
                لديك الحق في الوصول إلى معلوماتك الشخصية وتحديثها أو طلب حذفها. يمكنك القيام بذلك من خلال إعدادات ملفك الشخصي أو عن طريق التواصل معنا مباشرة.
              </p>
              
              <h3>6. التغييرات على هذه السياسة</h3>
              <p>
                قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سنقوم بإعلامك بأي تغييرات عن طريق نشر السياسة الجديدة على هذه الصفحة.
              </p>

              <h3>7. تواصل معنا</h3>
              <p>
                إذا كانت لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى التواصل معنا عبر البريد الإلكتروني: <a href="mailto:privacy@yallasakan.com">privacy@yallasakan.com</a>.
              </p>
            </CardContent>
          </Card>
          
          <div className="mt-6 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 rounded-md">
            <p className="font-bold">ملاحظة هامة:</p>
            <p>
              النص أعلاه هو قالب عام. يوصى بشدة بمراجعته وتخصيصه بمساعدة متخصص قانوني لضمان توافقه مع القوانين المحلية واحتياجات عملك المحددة.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;