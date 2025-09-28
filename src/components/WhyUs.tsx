import { Card, CardContent } from "@/components/ui/card";
import { Home, Headphones, Users, ShieldCheck } from "lucide-react";

const reasons = [
  {
    icon: ShieldCheck,
    title: "شقق موثقة ومضمونة",
    description:
      "جميع الشقق يتم مراجعتها والتأكد من صحة بياناتها ومطابقتها للصور قبل عرضها على المنصة.",
  },
  {
    icon: Headphones,
    title: "دعم فني سريع ومتجاوب",
    description:
      "فريق دعم متخصص متواجد لمساعدتك في أي مشكلة أو استفسار قد تواجهه أثناء رحلة بحثك.",
  },
  {
    icon: Users,
    title: "تجارب ومراجعات حقيقية",
    description:
      "اعتمد على تقييمات ومراجعات من طلاب حقيقيين سكنوا في هذه الشقق لضمان الشفافية والمصداقية.",
  },
];

const WhyUs = () => (
  <section className="w-full bg-background py-20">
    <div className="container grid lg:grid-cols-2 gap-12 items-center">
      {/* --- العمود الأيسر: الصورة --- */}
      <div className="w-full h-80 lg:h-[500px] rounded-2xl overflow-hidden shadow-xl">
        <img
          src="https://cdn.pixabay.com/photo/2019/10/30/15/45/thumbs-up-4589867_1280.jpg "
          alt="شقة عصرية ومريحة"
          className="w-full h-full object-cover"
        />
      </div>

      {/* --- العمود الأيمن: المحتوى --- */}
      <div className="space-y-8 text-right">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            لماذا تثق في <span className="text-primary">يلا سكن</span>؟
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            نحن ندرك أهمية إيجاد المكان المناسب الذي تشعر فيه بالراحة والأمان
            خلال فترة دراستك. لهذا السبب، نضع بين يديك منصة تجمع كل ما تحتاجه.
          </p>
        </div>

        <div className="space-y-6">
          {reasons.map((reason, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex-shrink-0 bg-primary/10 text-primary rounded-full h-14 w-14 flex items-center justify-center">
                <reason.icon className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  {reason.title}
                </h3>
                <p className="mt-1 text-muted-foreground leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default WhyUs;
