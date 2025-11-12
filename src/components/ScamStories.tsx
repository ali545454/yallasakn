import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Post {
  name: string;
  faculty: string;
  text: string;
}

const posts: Post[] = [
  {
    name: "محمد علي",
    faculty: "كلية الهندسة",
    text: "دفعت عربون كبير واتضح بعدين إن السمسار نصاب، وكنت محتاج وقت طويل لاسترجاع فلوسي.",
  },
  {
    name: "سارة محمود",
    faculty: "كلية الآداب",
    text: "الأسعار كانت أعلى بكتير من اللي مكتوب، والنظام مش منظم خالص، ضاعت عليّ فرص شقق كويسة.",
  },
  {
    name: "أحمد سامي",
    faculty: "كلية التجارة",
    text: "واجهت صعوبة في معرفة الشقق المتاحة وتنظيم المواعيد، كل حاجة كانت متأخرة ومربكة.",
  },
  {
    name: "منة الله حمدي",
    faculty: "كلية العلوم",
    text: "بسبب السماسرة، اتلغى حجز الشقة بعد دفع العربون، تجربة مرعبة فعلاً.",
  },
  {
    name: "ياسر حسن",
    faculty: "كلية الطب",
    text: "الأسعار كانت مضاعفة عن الطبيعي، ومفيش أي تنظيم من الملاك أو الوسطاء.",
  },
];

const ScamStories = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((prev) => (prev === 0 ? posts.length - 1 : prev - 1));
  const next = () => setCurrent((prev) => (prev === posts.length - 1 ? 0 : prev + 1));
  const goTo = (index: number) => setCurrent(index);

  return (
    <section className="container py-16">
      <h2 className="text-3xl font-bold text-center mb-8 text-primary flex items-center justify-center gap-2">
        قصص نصب وتجارب حقيقية
      </h2>

      <div className="relative max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
        {/* محتوى البوست الحالي */}
        <div className="space-y-4 text-center">
          <p className="text-lg">{posts[current].text}</p>
          <p className="font-semibold">{posts[current].name}</p>
          <p className="text-sm text-gray-500">{posts[current].faculty}</p>
        </div>

        {/* الأسهم */}
        <button
          onClick={prev}
          className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full hover:bg-gray-300"
        >
          <ArrowLeft size={20} />
        </button>
        <button
          onClick={next}
          className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full hover:bg-gray-300"
        >
          <ArrowRight size={20} />
        </button>

        {/* الـ bullets */}
        <div className="flex justify-center gap-2 mt-4">
          {posts.map((_, index) => (
            <span
              key={index}
              onClick={() => goTo(index)}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                current === index ? "bg-blue-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScamStories;
