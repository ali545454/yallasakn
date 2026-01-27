import { Card, CardContent } from "@/components/ui/card";
import { Search, ShieldCheck, CheckCircle } from "lucide-react";
import React from "react";
import { useTranslation } from 'react-i18next';

// مكون السهم المتقطع (للشاشات الكبيرة)
const DottedArrow = () => (
  <svg
    className="absolute top-1/2 -translate-y-1/2 w-[20%] h-auto text-gray-300"
    fill="none"
    viewBox="0 0 158 28"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 13.3999C29.6 2.3999 70.3333 2.73324 86 13.3999C101.667 24.0666 128.4 29.5999 157 13.3999"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeDasharray="5 5"
    />
    <path
      d="M152 18.3999L157 13.3999L152 8.3999"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const HowItWorks = () => {
  const { t } = useTranslation();

  const steps = [
    {
      icon: Search,
      title: t('howItWorks.step1Title'),
      description: t('howItWorks.step1Description'),
    },
    {
      icon: ShieldCheck,
      title: t('howItWorks.step2Title'),
      description: t('howItWorks.step2Description'),
    },
    {
      icon: CheckCircle,
      title: t('howItWorks.step3Title'),
      description: t('howItWorks.step3Description'),
    },
  ];

  return (
    <section className="container py-20 bg-muted/30">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
          {t('howItWorks.title')}
        </h2>
        <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
          {t('howItWorks.description')}
        </p>
      </div>

      <div className="relative grid md:grid-cols-3 gap-y-16 md:gap-x-8 lg:gap-x-12">
        {/* الأسهم المتقطعة التي تظهر بين البطاقات على الشاشات الكبيرة */}
        <div className="hidden md:block absolute w-full h-full top-0 left-0">
          <DottedArrow />
          <div
            className="absolute left-1/2"
            style={{ transform: "translateX(-50%)" }}
          >
            <DottedArrow />
          </div>
        </div>

        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <Card className="relative border-none shadow-lg rounded-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl text-center z-10 bg-background">
              <div className="absolute -top-4 -right-4 text-8xl font-extrabold text-gray-100/80 -z-10">
                0{index + 1}
              </div>

              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-primary/10 border-4 border-background rounded-full p-4 shadow-md">
                <step.icon className="w-9 h-9 text-primary" />
              </div>

              <CardContent className="pt-16 pb-8 px-6">
                <h3 className="font-bold text-xl mb-3 text-gray-800">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </CardContent>
            </Card>

            {index < steps.length - 1 && (
              <div className="md:hidden h-16 w-px bg-gray-200 border-l border-dashed mx-auto"></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
