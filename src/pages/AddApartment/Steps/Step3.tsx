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
import { Upload, Trash2, Star, Camera } from "lucide-react";
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
      <Card className="border-0 shadow-md bg-gradient-to-r from-yellow-50 to-orange-50">
        <div className="p-6">
          <h3 className="font-semibold text-lg mb-6 flex items-center gap-3 text-orange-800">
            <Star className="h-6 w-6" />
            اختر المميزات المتوفرة
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((feature) => (
              <Card
                key={feature.id}
                onClick={() => handleFeatureSelect(feature.id)}
                className={`p-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-300 hover:shadow-md ${
                  formData[feature.id as keyof typeof formData]
                    ? "border-2 border-orange-500 bg-orange-100 shadow-lg scale-105"
                    : "border-2 border-gray-200 hover:border-orange-300 bg-white"
                }`}
              >
                <div className={`transition-colors duration-300 ${
                  formData[feature.id as keyof typeof formData] ? "text-orange-600" : "text-gray-600"
                }`}>
                  {feature.icon}
                </div>
                <Label htmlFor={feature.id} className="text-center text-sm font-medium cursor-pointer">
                  {feature.label}
                </Label>
              </Card>
            ))}
          </div>
        </div>
      </Card>

      <Card className="border-0 shadow-md bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="p-6">
          <h3 className="font-semibold text-lg mb-6 flex items-center gap-3 text-blue-800">
            <Camera className="h-6 w-6" />
            صور الشقة *
          </h3>
          <div
            onDrop={handleFileDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => document.getElementById("images")?.click()}
            className="border-2 border-dashed border-blue-300 rounded-xl p-12 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 bg-white/50"
          >
            <Upload className="mx-auto h-16 w-16 text-blue-400 mb-4" />
            <p className="text-lg font-medium text-blue-700 mb-2">
              اسحب وأفلت الصور هنا، أو انقر للاختيار
            </p>
            <p className="text-sm text-blue-600">
              يمكنك رفع عدة صور لإظهار جمال شقتك
            </p>
            <Input
              id="images"
              type="file"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          <p className="text-red-500 text-sm mt-4">{errors.images}</p>
          {images.length > 0 && (
            <div className="mt-6">
              <h4 className="font-medium text-gray-700 mb-4">الصور المرفوعة ({images.length})</h4>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                {images.map((file, index) => (
                  <div key={index} className="relative group aspect-square rounded-lg overflow-hidden shadow-md">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`preview ${index}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg"
                      onClick={() => removeImage(index)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>

      <Card className="border-0 shadow-md bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="p-6">
          <Label htmlFor="preferred_tenant_type" className="text-sm font-semibold text-gray-700 mb-4 block">
            نوع المستأجر المفضل
          </Label>
          <Select
            name="preferred_tenant_type"
            onValueChange={(value) => handleSelectChange("preferred_tenant_type", value)}
            value={formData.preferred_tenant_type}
          >
            <SelectTrigger className="border-2 focus:border-purple-500 transition-colors duration-200 bg-white">
              <SelectValue placeholder="اختر نوع المستأجر المفضل" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="شباب">شباب</SelectItem>
              <SelectItem value="بنات">بنات</SelectItem>
              <SelectItem value="عائلات">عائلات</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>
    </div>
  );
};

export default Step3;
