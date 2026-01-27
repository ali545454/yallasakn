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
    <div className="mt-10 pt-6 border-t flex justify-between items-center">
      <Button
        type="button"
        variant="ghost"
        onClick={onPrev}
        disabled={step === 1}
        className="flex flex-row-reverse gap-2"
      >
        السابق <ArrowRight size={18} />
      </Button>

      {step < totalSteps && (
        <Button
          type="button"
          onClick={onNext}
          className="flex gap-2"
        >
          <ArrowLeft size={18} /> التالي
        </Button>
      )}

      {step === totalSteps && (
        <Button
          type="submit"
          disabled={isLoading}
          onClick={onSubmit}
          className="flex gap-2"
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

      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
    </div>
  );
};

export default NavigationButtons;
