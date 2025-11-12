import React from "react";
import { HomeIcon, ClockIcon, UsersIcon, ShieldCheckIcon } from "lucide-react";

const OwnerCTA = () => {
  return (
    <section className=" py-20 p-3" style={{backgroundColor: "#f0f2f3" }}>
      <div className="container mx-auto text-center px-4">
        <h2 className="text-4xl font-extrabold mb-4 text-gray-800">
          عندك شقة للإيجار؟ سجّلها الآن!
        </h2>
        <p className="text-lg mb-12 text-gray-600 max-w-2xl mx-auto">
          انضم لمجتمعنا وسجّل شقتك بسهولة. وصل مباشرة للطلاب الباحثين عن سكن، وتمتع بتجربة سلسة وآمنة لإدارة عقارك.
        </p>

        {/* مميزات */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <UsersIcon className="w-8 h-8 bg-blue-600 mb-4 mx-auto" />
            <h3 className="font-semibold text-lg mb-2">وصول مباشر للطلاب</h3>
            <p className="text-gray-500 text-sm">
              اربط شقتك مباشرة بمن يبحث عن سكن دون وسطاء.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <ClockIcon className="w-8 h-8 bg-blue-600 mb-4 mx-auto" />
            <h3 className="font-semibold text-lg mb-2">سجل بسرعة</h3>
            <p className="text-gray-500 text-sm">
              نموذج تسجيل سريع وسهل، أضف شقتك في دقائق.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <ShieldCheckIcon className="w-8 h-8 bg-blue-600 mb-4 mx-auto" />
            <h3 className="font-semibold text-lg mb-2">آمن وموثوق</h3>
            <p className="text-gray-500 text-sm">
              إدارة آمنة لعقارك ودعم كامل من فريقنا.
            </p>
          </div>
        </div>

        <a
          href="/owner/register"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:bg-blue-700 transition transform hover:-translate-y-1"
        >
          <HomeIcon className="w-5 h-5" />
          أضف شقتك الآن
        </a>
      </div>
    </section>
  );
};

export default OwnerCTA;
