import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, Trash2 } from "lucide-react";
import { FormDataType, features } from "../constants";

interface Step3Props {
  formData: FormDataType;
  errors: Record<string, string>;
  images: File[];
  handleFeatureSelect: (featureId: keyof FormDataType) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  removeImage: (index: number) => void;
  handleSelectChange: (name: string, value: string) => void;
}

const Step3: React.FC<Step3Props> = ({
  formData,
  errors,
  images,
  handleFeatureSelect,
  handleFileChange,
  handleFileDrop,
  removeImage,
  handleSelectChange,
}) => {
  return (
    <div className="space-y-8 animate-in fade-in-50">
      <div>
        <h3 className="font-semibold text-lg mb-4">اختر المميزات المتوفرة</h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((feature) => (
            <Card
              key={feature.id}
              onClick={() => handleFeatureSelect(feature.id)}
              className={`p-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${
                formData[feature.id as keyof typeof formData]
                  ? "border-primary ring-2 ring-primary"
                  : "border-border"
              }`}
            >
              {feature.icon}
              <Label htmlFor={feature.id}>{feature.label}</Label>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-lg mb-4">صور الشقة *</h3>
        <div
          onDrop={handleFileDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => document.getElementById("images")?.click()}
          className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary"
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-4 text-sm text-muted-foreground">
            اسحب وأفلت الصور هنا، أو انقر للاختيار
          </p>
          <Input
            id="images"
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        <p className="text-red-500 text-sm mt-2">{errors.images}</p>
        {images.length > 0 && (
          <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
            {images.map((file, index) => (
              <div key={index} className="relative group aspect-square">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`preview ${index}`}
                  className="w-full h-full object-cover rounded-md"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100"
                  onClick={() => removeImage(index)}
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6">
        <Label htmlFor="preferred_tenant_type">نوع المستأجر المفضل</Label>
        <Select
          name="preferred_tenant_type"
          onValueChange={(value) => handleSelectChange("preferred_tenant_type", value)}
          value={formData.preferred_tenant_type}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="شباب">شباب</SelectItem>
            <SelectItem value="بنات">بنات</SelectItem>
            <SelectItem value="عائلات">عائلات</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Step3;
