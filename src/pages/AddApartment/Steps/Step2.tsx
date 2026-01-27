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
import { FormDataType } from "../constants";

interface Step2Props {
  formData: FormDataType;
  errors: Record<string, string>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
}

const Step2: React.FC<Step2Props> = ({
  formData,
  errors,
  handleInputChange,
  handleSelectChange,
}) => {
  return (
    <div className="space-y-8 animate-in fade-in-50">
      <div>
        <h3 className="font-semibold text-lg mb-4">الأبعاد والسعة</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="rooms">عدد الغرف *</Label>
            <Input
              id="rooms"
              name="rooms"
              type="number"
              value={formData.rooms}
              onChange={handleInputChange}
            />
            <p className="text-red-500 text-sm">{errors.rooms}</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="bathrooms">عدد الحمامات</Label>
            <Input
              id="bathrooms"
              name="bathrooms"
              type="number"
              value={formData.bathrooms}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="kitchens">عدد المطابخ</Label>
            <Input
              id="kitchens"
              name="kitchens"
              type="number"
              value={formData.kitchens}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="area">المساحة (م²) *</Label>
            <Input
              id="area"
              name="area"
              type="number"
              value={formData.area}
              onChange={handleInputChange}
            />
            <p className="text-red-500 text-sm">{errors.area}</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="total_beds">إجمالي السراير *</Label>
            <Input
              id="total_beds"
              name="total_beds"
              type="number"
              value={formData.total_beds}
              onChange={handleInputChange}
            />
            <p className="text-red-500 text-sm">{errors.total_beds}</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="available_beds">السراير المتاحة *</Label>
            <Input
              id="available_beds"
              name="available_beds"
              type="number"
              value={formData.available_beds}
              onChange={handleInputChange}
            />
            <p className="text-red-500 text-sm">{errors.available_beds}</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="floor_number">رقم الدور</Label>
            <Input
              id="floor_number"
              name="floor_number"
              type="number"
              value={formData.floor_number}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-lg mb-4">التسعير والتواصل</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="price">السعر الشهري (جنيه) *</Label>
            <Input
              id="price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleInputChange}
            />
            <p className="text-red-500 text-sm">{errors.price}</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="residence_type">نوع السكن</Label>
            <Select
              name="residence_type"
              onValueChange={(value) => handleSelectChange("residence_type", value)}
              value={formData.residence_type}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="شقة كاملة">شقة كاملة</SelectItem>
                <SelectItem value="غرفة">غرفة</SelectItem>
                <SelectItem value="إستوديو">إستوديو</SelectItem>
                <SelectItem value="سكن مشترك">سكن مشترك</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="whatsapp_number">رقم واتساب للتواصل</Label>
            <Input
              id="whatsapp_number"
              name="whatsapp_number"
              type="tel"
              value={formData.whatsapp_number}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2;
