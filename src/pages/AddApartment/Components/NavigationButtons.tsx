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
    <div className="mt-10 pt-6 border-t border-gray-200 flex justify-between items-center bg-gray-50/50 rounded-lg p-4">
      <Button
        type="button"
        variant="ghost"
        onClick={onPrev}
        disabled={step === 1}
        className="flex flex-row-reverse gap-2 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
      >
        السابق <ArrowRight size={18} />
      </Button>

      {step < totalSteps && (
        <Button
          type="button"
          onClick={onNext}
          className="flex gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <ArrowLeft size={18} /> التالي
        </Button>
      )}

      {step === totalSteps && (
        <Button
          type="submit"
          disabled={isLoading}
          onClick={onSubmit}
          className="flex gap-2 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50"
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
