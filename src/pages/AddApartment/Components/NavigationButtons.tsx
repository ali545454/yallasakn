import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Upload, Loader2 } from "lucide-react";

interface NavigationButtonsProps {
  step: number;
  totalSteps: number;
  isLoading: boolean;
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
  error?: string | null;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  step,
  totalSteps,
  isLoading,
  onPrev,
  onNext,
  onSubmit,
  error,
}) => {
  return (
    <div className="mt-10 pt-6 border-t border-slate-200 flex justify-between items-center bg-white rounded-lg p-4">
      <Button
        type="button"
        variant="outline"
        onClick={onPrev}
        disabled={step === 1}
        className="flex flex-row-reverse gap-2 text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
      >
        السابق <ArrowRight size={18} />
      </Button>

      {step < totalSteps && (
        <Button
          type="button"
          onClick={onNext}
          className="flex gap-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 shadow-sm hover:shadow-md"
        >
          <ArrowLeft size={18} /> التالي
        </Button>
      )}

      {step === totalSteps && (
        <Button
          type="submit"
          disabled={isLoading}
          onClick={onSubmit}
          className="flex gap-2 bg-green-600 text-white hover:bg-green-700 transition-colors duration-200 shadow-sm hover:shadow-md disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> جاري الحفظ...
            </>
          ) : (
            <>
              <Upload size={18} /> حفظ ونشر الشقة
            </>
          )}
        </Button>
      )}

      {error && (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg shadow-md">
          {error}
        </div>
      )}
    </div>
  );
};

export default NavigationButtons;
