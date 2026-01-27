// components/PersonalInfoFields.tsx

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Calendar, Users } from "lucide-react";
import { FormData } from "../hooks/useFormState";

interface PersonalInfoFieldsProps {
  formData: FormData;
  handleInputChange: (field: keyof FormData, value: string) => void;
}

const PersonalInfoFields = ({ formData, handleInputChange }: PersonalInfoFieldsProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="birthDate">تاريخ الميلاد</Label>
          <div className="relative">
            <Calendar
              className="absolute right-3 top-3 h-5 w-5 text-muted-foreground cursor-pointer"
              onClick={() => document.getElementById("birthDate")?.showPicker?.()}
            />
            <input
              id="birthDate"
              type="date"
              value={formData.birthDate}
              onChange={(e) => handleInputChange("birthDate", e.target.value)}
              className="pr-10 h-12 text-right w-full border rounded-md focus:ring-2 focus:ring-primary/20 cursor-pointer"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="gender">الجنس (اختياري)</Label>
          <div className="relative">
            <Users className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
            <select
              id="gender"
              value={formData.gender}
              onChange={(e) => handleInputChange("gender", e.target.value)}
              className="w-full h-12 pr-10 pl-4 border border-input rounded-md bg-background text-right appearance-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">اختر الجنس</option>
              <option value="ذكر">ذكر</option>
              <option value="أنثى">أنثى</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">البريد الإلكتروني</Label>
        <div className="relative">
          <Mail className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="example@email.com"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="pr-10 h-12 text-right"
            required
          />
        </div>
      </div>
    </>
  );
};

export default PersonalInfoFields;