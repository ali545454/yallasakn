import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FormDataType } from "../constants";

interface Step1Props {
  formData: FormDataType;
  errors: Record<string, string>;
  neighborhoods: { id: number; name: string }[];
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
}

const Step1: React.FC<Step1Props> = ({
  formData,
  errors,
  neighborhoods,
  handleInputChange,
  handleSelectChange,
}) => {
  return (
    <div className="space-y-6 animate-in fade-in-50">
      <div className="space-y-2">
        <Label htmlFor="title">عنوان الإعلان *</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="مثال: شقة مفروشة بالكامل قرب الجامعة"
        />
        <p className="text-red-500 text-sm">{errors.title}</p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">وصف الشقة *</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="اكتب وصفاً تفصيلياً عن الشقة ومميزاتها..."
          rows={5}
        />
        <p className="text-red-500 text-sm">{errors.description}</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="neighborhood_id">المنطقة *</Label>
          <Select
            name="neighborhood_id"
            onValueChange={(value) => handleSelectChange("neighborhood_id", value)}
            value={formData.neighborhood_id}
          >
            <SelectTrigger>
              <SelectValue placeholder="اختر منطقة" />
            </SelectTrigger>
            <SelectContent>
              {neighborhoods.map((n) => (
                <SelectItem key={n.id} value={String(n.id)}>
                  {n.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-red-500 text-sm">{errors.neighborhood_id}</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">العنوان التفصيلي *</Label>
          <Input
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="مثال: شارع الجمهورية، بجوار صيدلية..."
          />
          <p className="text-red-500 text-sm">{errors.address}</p>
        </div>
      </div>
    </div>
  );
};

export default Step1;
