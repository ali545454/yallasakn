import React from "react";

const OwnerCTA = () => {
  return (
    <section className="bg-yellow-100 py-16">
      <div className="container mx-auto text-center px-4">
        <h2 className="text-3xl font-bold mb-4">هل عندك شقة للإيجار؟</h2>
        <p className="text-lg mb-8">
          انضم لمجتمعنا وسجّل شقتك بسهولة وسرعة لتصل مباشرة للطلاب الباحثين عن سكن.
        </p>
        <a
          href="/owner/register"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          أضف شقتك الآن
        </a>
      </div>
    </section>
  );
};

export default OwnerCTA;
