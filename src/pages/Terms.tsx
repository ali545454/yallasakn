import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link to="/">
              <Button variant="ghost" className="gap-2 mb-4">
                <ArrowRight className="h-4 w-4" />
                العودة للرئيسية
              </Button>
            </Link>
            <h1 className="text-4xl font-bold mb-4">الشروط والأحكام</h1>
            <p className="text-muted-foreground">
              آخر تحديث: 1 يناير 2024
            </p>
          </div>

          <Card>
            <CardContent className="prose prose-lg max-w-none p-8">
              <div className="space-y-6 text-right">
                <section>
                  <h2 className="text-2xl font-bold mb-4">1. مقدمة</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    مرحباً بك في منصة سكن الطلاب. هذه الشروط والأحكام تحكم استخدامك لموقعنا الإلكتروني وخدماتنا. 
                    باستخدام موقعنا، فإنك توافق على هذه الشروط والأحكام بالكامل.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">2. تعريفات</h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• "المنصة" تعني موقع سكن الطلاب الإلكتروني</li>
                    <li>• "المستخدم" يشمل الطلاب وأصحاب العقارات</li>
                    <li>• "العقار" يعني أي وحدة سكنية معروضة على المنصة</li>
                    <li>• "الحجز" يعني عملية تأمين العقار من قبل الطالب</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">3. شروط الاستخدام</h2>
                  <div className="space-y-3 text-muted-foreground">
                    <p>يجب على المستخدمين:</p>
                    <ul className="space-y-2">
                      <li>• تقديم معلومات صحيحة ودقيقة</li>
                      <li>• عدم انتهاك حقوق الآخرين</li>
                      <li>• احترام قوانين وقواعد المجتمع</li>
                      <li>• عدم استخدام المنصة لأغراض غير قانونية</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">4. التزامات أصحاب العقارات</h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• تقديم معلومات دقيقة عن العقار</li>
                    <li>• رفع صور حقيقية وحديثة</li>
                    <li>• الالتزام بالأسعار المعلنة</li>
                    <li>• توفير بيئة آمنة ونظيفة</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">5. التزامات الطلاب</h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• احترام العقار والمحافظة عليه</li>
                    <li>• دفع الإيجار في المواعيد المحددة</li>
                    <li>• اتباع قوانين السكن المحددة</li>
                    <li>• إبلاغ المالك عن أي أضرار فورياً</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">6. الدفع والاسترداد</h2>
                  <div className="space-y-3 text-muted-foreground">
                    <p>• جميع المدفوعات تتم من خلال المنصة</p>
                    <p>• يحتفظ الموقع بالتأمين لمدة 24 ساعة</p>
                    <p>• يمكن استرداد التأمين في حالات محددة</p>
                    <p>• لا يمكن استرداد الإيجار بعد تأكيد الحجز</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">7. إخلاء المسؤولية</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    المنصة تعمل كوسيط بين الطلاب وأصحاب العقارات. نحن غير مسؤولين عن أي نزاعات أو مشاكل 
                    قد تنشأ بين الأطراف. ننصح بقراءة جميع التفاصيل بعناية قبل إتمام أي حجز.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">8. تعديل الشروط</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    نحتفظ بالحق في تعديل هذه الشروط والأحكام في أي وقت. سيتم إشعار المستخدمين بأي تغييرات 
                    جوهرية عبر البريد الإلكتروني أو من خلال إشعارات على المنصة.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">9. التواصل</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    إذا كان لديك أي أسئلة حول هذه الشروط والأحكام، يرجى التواصل معنا عبر:
                  </p>
                  <div className="mt-4 space-y-2 text-muted-foreground">
                    <p>• البريد الإلكتروني: support@studentshousing.com</p>
                    <p>• الهاتف: 01234567890</p>
                    <p>• العنوان: أسيوط، مصر</p>
                  </div>
                </section>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Terms;