import React from "react";
import { Label, Input } from "@/components/ui";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useFormState } from "@/hooks/useFormState";

const Step2 = () => {
  const { formData, handleInputChange, handleSelectChange } = useFormState();

  return (
    <div className="space-y-6">
      <h3>تفاصيل العقار</h3>
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="rooms">عدد الغرف *</Label>
          <Input
            id="rooms"
            name="rooms"
            type="number"
            value={formData.rooms}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="bathrooms">عدد الحمامات</Label>
          <Input
            id="bathrooms"
            name="bathrooms"
            type="number"
            value={formData.bathrooms}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="kitchens">عدد المطابخ</Label>
          <Input
            id="kitchens"
            name="kitchens"
            type="number"
            value={formData.kitchens}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="area">المساحة (م²) *</Label>
          <Input
            id="area"
            name="area"
            type="number"
            value={formData.area}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="total_beds">إجمالي السراير *</Label>
          <Input
            id="total_beds"
            name="total_beds"
            type="number"
            value={formData.total_beds}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="available_beds">السراير المتاحة *</Label>
          <Input
            id="available_beds"
            name="available_beds"
            type="number"
            value={formData.available_beds}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <h3>التسعير والتواصل</h3>
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="price">السعر الشهري (جنيه) *</Label>
          <Input
            id="price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="residence_type">نوع السكن</Label>
          <Select
            name="residence_type"
            onValueChange={(v) => handleSelectChange("residence_type", v)}
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
        <div>
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
  );
};

export default Step2;
