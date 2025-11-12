import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Post {
  name: string;
  faculty: string;
  text: string;
  avatar?: string;
}

const posts: Post[] = [
  {
    name: "محمد علي",
    faculty: "كلية الهندسة",
    text: "دفعت عربون كبير واتضح بعدين إن السمسار نصاب، وكنت محتاج وقت طويل لاسترجاع فلوسي.",
    avatar: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "سارة محمود",
    faculty: "كلية الآداب",
    text: "الأسعار كانت أعلى بكتير من اللي مكتوب، والنظام مش منظم خالص، ضاعت عليّ فرص شقق كويسة.",
    avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "أحمد سامي",
    faculty: "كلية التجارة",
    text: "واجهت صعوبة في معرفة الشقق المتاحة وتنظيم المواعيد، كل حاجة كانت متأخرة ومربكة.",
    avatar: "https://plus.unsplash.com/premium_photo-1702596363777-46a5ff28f644?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  },
  {
    name: "منة الله حمدي",
    faculty: "كلية العلوم",
    text: "بسبب السماسرة، اتلغى حجز الشقة بعد دفع العربون، تجربة مرعبة فعلاً.",
    avatar: "https://plus.unsplash.com/premium_photo-1661369580170-ed5d3baaab11?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  },
  {
    name: "ياسر حسن",
    faculty: "كلية الطب",
    text: "الأسعار كانت مضاعفة عن الطبيعي، ومفيش أي تنظيم من الملاك أو الوسطاء.",
    avatar: "https://images.unsplash.com/photo-1626038135427-bd4eb8193ba5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
  },
];

const ScamStories = () => {
  const [current, setCurrent] = useState(0);

  // تغيير البوست كل 3 ثواني
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === posts.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const prev = () => setCurrent((prev) => (prev === 0 ? posts.length - 1 : prev - 1));
  const next = () => setCurrent((prev) => (prev === posts.length - 1 ? 0 : prev + 1));
  const goTo = (index: number) => setCurrent(index);

  return (
    <section className="container py-16">
      <h2 className="text-3xl font-bold text-center mb-8 text-primary flex items-center justify-center gap-2">
        قصص نصب وتجارب حقيقية
      </h2>

      <div className="relative max-w-2xl mx-auto bg-gray-50 shadow-xl rounded-xl p-8 transition-all duration-700 min-h-[400px]">
        {/* محتوى البوست الحالي */}
        <div className="space-y-4 text-center flex flex-col items-center justify-center h-full">
          {posts[current].avatar && (
            <img
              src={posts[current].avatar}
              alt={posts[current].name}
              className="w-20 h-20 rounded-full object-cover shadow-md"
            />
          )}
          <p className="text-lg text-gray-700">{posts[current].text}</p>
          <p className="font-semibold text-gray-900">{posts[current].name}</p>
          <p className="text-sm text-gray-500">{posts[current].faculty}</p>
        </div>

        {/* الأسهم */}
        <button
          onClick={prev}
          className="absolute top-1/2 -left-6 transform -translate-y-1/2 bg-blue-100 text-blue-700 p-3 rounded-full hover:bg-blue-200 transition"
        >
          <ArrowLeft size={24} />
        </button>
        <button
          onClick={next}
          className="absolute top-1/2 -right-6 transform -translate-y-1/2 bg-blue-100 text-blue-700 p-3 rounded-full hover:bg-blue-200 transition"
        >
          <ArrowRight size={24} />
        </button>

        {/* الـ bullets */}
        <div className="flex justify-center gap-3 mt-6">
          {posts.map((_, index) => (
            <span
              key={index}
              onClick={() => goTo(index)}
              className={`w-4 h-4 rounded-full cursor-pointer transition ${
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
