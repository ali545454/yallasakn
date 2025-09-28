import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const allFeatures = [
  "حجز سكن أكثر من مرة",
  "أولوية في الحجز",
  "إشعارات فورية للشقق المتاحة",
  "شقق موثوقة تم التحقق منها",
  "الوصول لتقييمات الشقق السابقة",
  "حجز مره واحده ",
  "التواصل مع المالك من خلال الموقع",
  "ميزة التأمين عند الدفع بحفظ المال لمدة 24 ساعه في الموقع إلي أن يتم تأكيد الاستلام",
];

const subscriptionOffers = [
  {
    title: "السنة الأولى مجاناً",
    type: "free",
    popular: true,
    price: "0",
    period: "عام كامل",
  },
  {
    title: "اشتراك نصف سنوي",
    type: "half",
    popular: false,
    price: "85",
    period: "6 أشهر",
  },
  {
    title: "اشتراك سنوي",
    type: "year",
    popular: false,
    price: "150",
    period: "سنوياً",
  },
];

// هنا نحدد أي ميزة متاحة لكل خطة
const getFeaturesForOffer = (type: string) => {
  if (type === "free") return [true, true, true, true, true, false, true, true];
  if (type === "half")
    return [false, false, false, true, true, true, true, true];
  if (type === "year") return [true, true, true, true, true, false, true, true];
  return [false, false, false, false, false];
};

const SubscriptionOffers = () => (
  <section className="bg-muted/40 w-full">
    <div className="container py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
          اختر الباقة التي تناسبك
        </h2>
        <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
          ابدأ عامك الأول مجاناً بالكامل! باقات مرنة مصممة لتلبية احتياجاتك سواء
          كنت تبحث عن سكن لفترة قصيرة أو للعام الدراسي بأكمله.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
        {subscriptionOffers.map((offer, idx) => {
          const offerFeatures = getFeaturesForOffer(offer.type);

          return (
            <Card
              key={idx}
              className={`w-full h-full flex flex-col rounded-2xl shadow-lg transition-all duration-300 hover:-translate-y-2 ${
                offer.popular
                  ? "bg-gray-900 text-white shadow-primary/20 scale-105"
                  : "bg-card"
              }`}
            >
              <CardHeader className="p-6">
                {offer.popular && (
                  <Badge className="w-fit mb-4" variant="secondary">
                    عرض خاص
                  </Badge>
                )}
                <CardTitle className="text-2xl font-bold">
                  {offer.title}
                </CardTitle>
                <CardDescription
                  className={offer.popular ? "text-gray-300" : ""}
                >
                  {offer.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="px-6 flex-1">
                <div className="flex items-baseline gap-2 mb-6">
                  <span
                    className={`text-5xl font-extrabold ${
                      offer.popular ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {offer.price}
                  </span>
                  <span className="text-muted-foreground">
                    ج.م / {offer.period}
                  </span>
                </div>

                <ul className="space-y-4 text-right">
                  {allFeatures.map((feature, i) => (
                    <li
                      key={i}
                      className={`flex items-center gap-3 ${
                        offerFeatures[i]
                          ? offer.popular
                            ? "text-gray-200"
                            : "text-gray-800"
                          : offer.popular
                          ? "text-gray-500 line-through"
                          : "text-gray-400 line-through"
                      }`}
                    >
                      {offerFeatures[i] ? (
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      ) : (
                        <X className="w-5 h-5 text-red-400 flex-shrink-0" />
                      )}
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="p-6 mt-6">
                <Button
                  size="lg"
                  className={`w-full text-base font-bold ${
                    offer.popular
                      ? "bg-white text-gray-900 hover:bg-gray-200"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  {offer.price === "0" ? "ابدأ الآن مجاناً" : "اشترك الآن"}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  </section>
);

export default SubscriptionOffers;
