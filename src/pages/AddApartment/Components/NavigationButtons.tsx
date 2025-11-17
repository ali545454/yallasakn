import React from "react";

const NavigationButtons = ({
  step,
  nextStep,
  prevStep,
  isLastStep,
  isLoading,
}: any) => (
  <div className="mt-6 flex justify-between">
    <button type="button" onClick={prevStep} disabled={step === 1}>
      السابق
    </button>
    {isLastStep ? (
      <button type="submit" disabled={isLoading}>
        حفظ ونشر
      </button>
    ) : (
      <button type="button" onClick={nextStep}>
        التالي
      </button>
    )}
  </div>
);

export default NavigationButtons;
