// components/PasswordFields.tsx

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Lock, Eye, EyeOff } from "lucide-react";
import { FormData } from "../hooks/useFormState";

interface PasswordFieldsProps {
  formData: FormData;
  handleInputChange: (field: keyof FormData, value: string) => void;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  showConfirmPassword: boolean;
  setShowConfirmPassword: (show: boolean) => void;
  passwordStrengthMsg: string;
  passwordStrong: boolean;
}

const PasswordFields = ({
  formData,
  handleInputChange,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  passwordStrengthMsg,
  passwordStrong,
}: PasswordFieldsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="password">كلمة المرور</Label>
        <div className="relative">
          <Lock className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="أدخل كلمة المرور"
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            className="pr-10 pl-10 h-12 text-right"
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute left-2 top-2 h-8 w-8"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
        <p
          className={`text-sm mt-1 ${
            passwordStrong ? "text-green-600" : "text-yellow-600"
          }`}
        >
          {formData.password
            ? passwordStrengthMsg
            : "استخدم كلمة مرور قوية (8+ أحرف، أحرف كبيرة وصغيرة، أرقام، رموز)"}
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
        <div className="relative">
          <Lock className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="أعد إدخال كلمة المرور"
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
            className="pr-10 pl-10 h-12 text-right"
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute left-2 top-2 h-8 w-8"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PasswordFields;