import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Step1 from "@/pages/AddApartment/Steps/Step1";
import Step2 from "@/pages/AddApartment/Steps/Step2";
import Step3 from "@/pages/AddApartment/Steps/Step3";
import NavigationButtons from "@/pages/AddApartment/Components/NavigationButtons";
import { useFormState } from "@/pages/AddApartment/hooks/useFormState";
import { Home, Info, Image as ImageIcon } from "lucide-react";

const AddApartment = () => {
  const { step, formData, images, errors, nextStep, prevStep, handleSubmit } =
    useFormState();

  const steps = [
    {
      number: 1,
      title: "المعلومات الأساسية",
      icon: <Info className="w-5 h-5 mr-2" />,
    },
    {
      number: 2,
      title: "تفاصيل العقار",
      icon: <Home className="w-5 h-5 mr-2" />,
    },
    {
      number: 3,
      title: "المميزات والصور",
      icon: <ImageIcon className="w-5 h-5 mr-2" />,
    },
  ];

  return (
    <>
      <Header />
      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <aside className="lg:col-span-1">
            <nav className="sticky top-24">
              <ul className="space-y-4 bg-white shadow rounded-lg p-6 border">
                {steps.map((s) => (
                  <li
                    key={s.number}
                    className={
                      step === s.number
                        ? "font-bold text-primary"
                        : "text-gray-500"
                    }
                  >
                    {s.title}
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
          <main className="lg:col-span-3">
            <div className="bg-white shadow-lg rounded-xl p-8 border">
              <form onSubmit={handleSubmit}>
                {errors && Object.keys(errors).length > 0 && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded text-red-700">
                    <ul className="list-disc pl-5">
                      {Object.entries(errors).map(([field, error]) => (
                        <li key={field}>{String(error)}</li>
                      ))}
                    </ul>
                  </div>
                )}
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
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddApartment;
