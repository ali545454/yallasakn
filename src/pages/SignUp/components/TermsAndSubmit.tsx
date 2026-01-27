// components/TermsAndSubmit.tsx

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface TermsAndSubmitProps {
  agreeToTerms: boolean;
  setAgreeToTerms: (agree: boolean) => void;
  isLoading: boolean;
  passwordStrong: boolean;
  error: string | null;
}

const TermsAndSubmit = ({
  agreeToTerms,
  setAgreeToTerms,
  isLoading,
  passwordStrong,
  error,
}: TermsAndSubmitProps) => {
  return (
    <>
      {error && (
        <p className="text-sm font-medium text-red-500 text-center">{error}</p>
      )}

      <div className="flex items-center space-x-2 space-x-reverse">
        <Checkbox
          id="terms"
          checked={agreeToTerms}
          onCheckedChange={(checked) => setAgreeToTerms(checked === true)}
          required
        />
        <Label htmlFor="terms" className="text-sm">
          أوافق على{" "}
          <Link
            to="/terms"
            className="text-primary hover:text-primary-hover underline"
          >
            الشروط والأحكام
          </Link>{" "}
          و{" "}
          <Link
            to="/privacy"
            className="text-primary hover:text-primary-hover underline"
          >
            سياسة الخصوصية
          </Link>
        </Label>
      </div>

      <Button
        type="submit"
        className="w-full h-12 text-base"
        disabled={isLoading || !agreeToTerms || !passwordStrong}
      >
        {isLoading ? "جاري الإنشاء..." : "إنشاء الحساب"}
      </Button>
    </>
  );
};

export default TermsAndSubmit;