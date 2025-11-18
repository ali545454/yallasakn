import React from "react";
import { useFormState } from "../hooks/useFormState";
import FeatureCard from "../Components/FeatureCard";
import ImageUploader from "../Components/ImageUploader";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const features = [
  { id: "has_wifi", label: "واي فاي" },
  { id: "has_ac", label: "تكييف" },
  { id: "has_balcony", label: "بلكونة" },
  { id: "has_elevator", label: "مصعد" },
  { id: "has_washing_machine", label: "غسالة" },
  { id: "has_oven", label: "بوتجاز/فرن" },
  { id: "has_gas", label: "غاز طبيعي" },
  { id: "near_transport", label: "قريب من المواصلات" },
];

const Step3 = () => {
  const {
    formData,
    handleFeatureSelect,
    images,
    handleFileChange,
    removeImage,
  } = useFormState();

  return (
    <div className="space-y-6">
      <h3>اختر المميزات المتوفرة</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {features.map((f) => (
          <FeatureCard
            key={f.id}
            feature={f}
            selected={formData[f.id]}
            onClick={() => handleFeatureSelect(f.id)}
          />
        ))}
      </div>

      <h3>صور الشقة *</h3>
      <ImageUploader
        images={images}
        handleFileChange={handleFileChange}
        removeImage={removeImage}
      />

      <div>
        <Label htmlFor="preferred_tenant_type">نوع المستأجر المفضل</Label>
        <select
          value={formData.preferred_tenant_type}
          onChange={(e) => (formData.preferred_tenant_type = e.target.value)}
        >
          <option value="">اختر</option>
          <option value="شباب">شباب</option>
          <option value="بنات">بنات</option>
          <option value="عائلات">عائلات</option>
        </select>
      </div>
    </div>
  );
};

export default Step3;
