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
    avatar: "https://unsplash.com/photos/a-young-man-wearing-glasses-standing-in-front-of-a-mountain-MSepzbKFz10",
  },
  {
    name: "سارة محمود",
    faculty: "كلية الآداب",
    text: "الأسعار كانت أعلى بكتير من اللي مكتوب، والنظام مش منظم خالص، ضاعت عليّ فرص شقق كويسة.",
    avatar: "https://unsplash.com/photos/woman-in-black-and-white-plaid-blazer-Av4gNsllkyU",
  },
  {
    name: "أحمد سامي",
    faculty: "كلية التجارة",
    text: "واجهت صعوبة في معرفة الشقق المتاحة وتنظيم المواعيد، كل حاجة كانت متأخرة ومربكة.",
    avatar: "https://unsplash.com/photos/man-in-black-dress-shirt-wearing-black-framed-eyeglasses-7tbQ9i0iBeQ",
  },
  {
    name: "منة الله حمدي",
    faculty: "كلية العلوم",
    text: "بسبب السماسرة، اتلغى حجز الشقة بعد دفع العربون، تجربة مرعبة فعلاً.",
    avatar: "https://unsplash.com/photos/a-woman-with-long-hair-qAbZLUTnYxY",
  },
  {
    name: "ياسر حسن",
    faculty: "كلية الطب",
    text: "الأسعار كانت مضاعفة عن الطبيعي، ومفيش أي تنظيم من الملاك أو الوسطاء.",
    avatar: "https://unsplash.com/photos/a-man-is-smiling-while-holding-a-paintbrush-vcItdy3Vqbs",
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

      <div className="relative max-w-2xl mx-auto bg-gray-50 shadow-xl rounded-xl p-8 transition-all duration-700">
        {/* محتوى البوست الحالي */}
        <div className="space-y-4 text-center">
          {posts[current].avatar && (
            <img
              src={posts[current].avatar}
              alt={posts[current].name}
              className="mx-auto w-20 h-20 rounded-full object-cover shadow-md"
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
