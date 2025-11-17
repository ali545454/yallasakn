import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Step1 from "@/pages/AddApartment/Steps/Step1";
import Step2 from "@/pages/AddApartment/Steps/Step2";
import Step3 from "@/pages/AddApartment/Steps/Step3";
import NavigationButtons from "@/pages/AddApartment/Components/NavigationButtons";
import { useFormState } from "@/pages/AddApartment/hooks/useFormState";

const AddApartment = () => {
  const { step, formData, images, errors, nextStep, prevStep, handleSubmit } =
    useFormState();

  const steps = [
    { number: 1, title: "المعلومات الأساسية" },
    { number: 2, title: "تفاصيل العقار" },
    { number: 3, title: "المميزات والصور" },
  ];

  return (
    <>
      <Header />
      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <aside className="lg:col-span-1">
            {/* هنا ممكن تحط شريط التقدم أو نصائح */}
          </aside>
          <main className="lg:col-span-3">
            <form onSubmit={handleSubmit}>
              {step === 1 && <Step1 />}
              {step === 2 && <Step2 />}
              {step === 3 && <Step3 />}
              <NavigationButtons
                step={step}
                nextStep={nextStep}
                prevStep={prevStep}
                isLastStep={step === 3}
              />
            </form>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddApartment;
