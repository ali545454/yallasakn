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
import { Upload, Trash2, Camera } from "lucide-react";
import { FormDataType } from "../constants";

interface Step4Props {
  formData: FormDataType;
  errors: Record<string, string>;
  images: File[];
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  removeImage: (index: number) => void;
  handleSelectChange: (name: string, value: string) => void;
}

const Step4: React.FC<Step4Props> = ({
  formData,
  errors,
  images,
  handleFileChange,
  handleFileDrop,
  removeImage,
  handleSelectChange,
}) => {
  return (
    <div className="space-y-8 animate-in fade-in-50">
      <Card className="border border-slate-200 shadow-md bg-white">
        <div className="p-6">
          <h3 className="font-semibold text-lg mb-6 flex items-center gap-3 text-blue-800">
            <Camera className="h-6 w-6" />
            صور الشقة (على الأقل صورة واحدة)
          </h3>
          <div
            onDrop={handleFileDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => document.getElementById("images")?.click()}
            className="border-2 border-dashed border-blue-300 rounded-xl p-12 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 bg-white"
          >
            <Upload className="mx-auto h-16 w-16 text-blue-400 mb-4" />
            <p className="text-lg font-medium text-blue-700 mb-2">
              اسحب وأفلت الصور هنا، أو انقر للاختيار
            </p>
            <p className="text-sm text-slate-600">
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
              <h4 className="font-medium text-slate-700 mb-4">
                الصور المرفوعة ({images.length})
              </h4>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                {images.map((file, index) => (
                  <div
                    key={index}
                    className="relative group aspect-square rounded-lg overflow-hidden shadow-sm"
                  >
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

      <Card className="border border-slate-200 shadow-md bg-white">
        <div className="p-6">
          <Label
            htmlFor="preferred_tenant_type"
            className="text-sm font-semibold text-slate-700 mb-4 block"
          >
            نوع المستأجر المفضل
          </Label>
          <Select
            name="preferred_tenant_type"
            onValueChange={(value) => handleSelectChange("preferred_tenant_type", value)}
            value={formData.preferred_tenant_type}
          >
            <SelectTrigger className="border-2 focus:border-blue-500 transition-colors duration-200 bg-white">
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

export default Step4;
