// components/StudentFields.tsx

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building, GraduationCap } from "lucide-react";
import { FormData } from "../hooks/useFormState";

interface StudentFieldsProps {
  formData: FormData;
  handleInputChange: (field: keyof FormData, value: string) => void;
}

const StudentFields = ({ formData, handleInputChange }: StudentFieldsProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="faculty">الكلية</Label>
          <div className="relative">
            <Building className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              id="faculty"
              placeholder="مثال: كلية الهندسة"
              value={formData.faculty}
              onChange={(e) => handleInputChange("faculty", e.target.value)}
              className="pr-10 h-12 text-right"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="academicYear">السنة الدراسية</Label>
          <div className="relative">
            <GraduationCap className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              id="academicYear"
              placeholder="مثال: السنة الثالثة"
              value={formData.academicYear}
              onChange={(e) => handleInputChange("academicYear", e.target.value)}
              className="pr-10 h-12 text-right"
              required
            />
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="university">الجامعة</Label>
        <div className="relative">
          <Building className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            id="university"
            placeholder="مثال: جامعة القاهرة"
            value={formData.university}
            onChange={(e) => handleInputChange("university", e.target.value)}
            className="pr-10 h-12 text-right"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default StudentFields;