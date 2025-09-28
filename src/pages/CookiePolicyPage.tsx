// src/pages/CookiePolicyPage.tsx

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { Cookie } from 'lucide-react';

const CookiePolicyPage = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <div className="container py-4">
        <Breadcrumb
          items={[
            { label: 'الرئيسية', href: '/' },
            { label: 'سياسة ملفات تعريف الارتباط' }
          ]}
        />
      </div>

      <main className="flex-grow container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Cookie className="mx-auto h-16 w-16 text-primary mb-4" />
            <h1 className="text-4xl font-bold tracking-tight">سياسة ملفات تعريف الارتباط (Cookies)</h1>
            <p className="text-muted-foreground mt-2 text-lg">
              آخر تحديث: 19 سبتمبر 2025
            </p>
          </div>

          <Card>
            <CardContent className="prose prose-lg max-w-none pt-8 text-right leading-relaxed">
              <h3>1. ما هي ملفات تعريف الارتباط؟</h3>
              <p>
                ملفات تعريف الارتباط هي ملفات نصية صغيرة يتم وضعها على جهازك (الكمبيوتر، الهاتف المحمول) بواسطة مواقع الويب التي تزورها. تُستخدم هذه الملفات على نطاق واسع لجعل مواقع الويب تعمل بشكل أكثر كفاءة، وكذلك لتوفير معلومات لأصحاب الموقع.
              </p>

              <h3>2. كيف نستخدم ملفات تعريف الارتباط؟</h3>
              <p>نستخدم ملفات تعريف الارتباط في منصة "يلا سكن" لعدة أغراض:</p>
              <ul>
                <li>
                  <strong>ملفات تعريف الارتباط الضرورية:</strong>
                  هذه الملفات أساسية لتمكينك من التنقل في الموقع واستخدام ميزاته، مثل الوصول إلى المناطق الآمنة (تسجيل الدخول إلى حسابك). بدون هذه الملفات، لا يمكن تقديم الخدمات التي طلبتها.
                </li>
                <li>
                  <strong>ملفات تعريف الارتباط الخاصة بالأداء والتحليل:</strong>
                  تجمع هذه الملفات معلومات حول كيفية استخدام الزوار لموقعنا، على سبيل المثال، الصفحات الأكثر زيارة. تساعدنا هذه البيانات على تحسين طريقة عمل موقعنا. نحن نستخدم خدمات مثل Google Analytics لهذا الغرض.
                </li>
                <li>
                  <strong>ملفات تعريف الارتباط الوظيفية:</strong>
                  تُستخدم هذه الملفات لتذكر الخيارات التي تقوم بها (مثل اسم المستخدم، أو المنطقة التي تتواجد فيها) وتوفير ميزات محسّنة وأكثر شخصية. على سبيل المثال، قد نستخدمها لتذكر تفضيلات البحث الخاصة بك.
                </li>
              </ul>

              <h3>3. ملفات تعريف الارتباط الخاصة بالجهات الخارجية</h3>
              <p>
                قد نستخدم أيضًا خدمات من جهات خارجية، مثل خرائط جوجل أو تحليلات جوجل، والتي قد تقوم بتعيين ملفات تعريف الارتباط الخاصة بها على جهازك. نحن لا نتحكم في هذه الملفات، ونوصي بمراجعة سياسات الخصوصية الخاصة بهذه الجهات.
              </p>
              
              <h3>4. كيفية التحكم في ملفات تعريف الارتباط</h3>
              <p>
                لديك القدرة على قبول أو رفض ملفات تعريف الارتباط. تسمح معظم متصفحات الويب تلقائيًا بملفات تعريف الارتباط، ولكن يمكنك عادةً تعديل إعدادات المتصفح لرفضها إذا كنت تفضل ذلك. قد يمنعك هذا من الاستفادة الكاملة من الموقع.
              </p>
              <p>
                لمزيد من المعلومات حول كيفية إدارة ملفات تعريف الارتباط، يمكنك زيارة الروابط التالية للمتصفحات الشائعة:
              </p>
              <ul>
                  <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
                  <li><a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
                  <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer">Apple Safari</a></li>
                  <li><a href="https://support.microsoft.com/en-us/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CookiePolicyPage;