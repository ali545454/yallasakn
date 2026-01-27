// components/BasicInfoFields.tsx

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Phone } from "lucide-react";
import { FormData } from "../hooks/useFormState";

interface BasicInfoFieldsProps {
  formData: FormData;
  handleInputChange: (field: keyof FormData, value: string) => void;
}

const BasicInfoFields = ({ formData, handleInputChange }: BasicInfoFieldsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="fullName">الاسم الكامل</Label>
        <div className="relative">
          <User className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            id="fullName"
            placeholder="أدخل اسمك الكامل"
            value={formData.fullName}
            onChange={(e) => handleInputChange("fullName", e.target.value)}
            className="pr-10 h-12 text-right"
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">رقم الهاتف (اختياري)</Label>
        <div className="relative">
          <Phone className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            id="phone"
            type="tel"
            placeholder="01xxxxxxxxx"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className="pr-10 h-12 text-right"
          />
        </div>
      </div>
    </div>
  );
};

export default BasicInfoFields;