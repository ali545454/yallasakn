import React from "react";
// Update the import path to the correct location of Label and Input components
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import MapPicker from "@/components/Map/MapPicker";
import { useFormState } from "../hooks/useFormState";

const Step1 = () => {
  const {
    formData,
    handleInputChange,
    handleSelectChange,
    neighborhoods,
    lat,
    lng,
    setLat,
    setLng,
  } = useFormState();

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="title">عنوان الإعلان *</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="مثال: شقة مفروشة بالكامل قرب الجامعة"
        />
      </div>

      <div>
        <Label htmlFor="description">وصف الشقة *</Label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="اكتب وصفاً تفصيلياً عن الشقة..."
          className="w-full border rounded p-2"
          rows={5}
        />
      </div>

      <div>
        <Label htmlFor="neighborhood_id">المنطقة *</Label>
        <Select
          name="neighborhood_id"
          onValueChange={(value) =>
            handleSelectChange("neighborhood_id", value)
          }
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
      </div>

      <div>
        <Label htmlFor="address">العنوان التفصيلي *</Label>
        <Input
          id="address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          placeholder="مثال: شارع الجمهورية، بجوار صيدلية..."
        />
      </div>

      <div>
        <Label>حدد موقع الشقة على الخريطة *</Label>
        <MapPicker
          lat={lat}
          lng={lng}
          onChange={(newLat, newLng) => {
            setLat(newLat);
            setLng(newLng);
          }}
        />
      </div>
    </div>
  );
};

export default Step1;
