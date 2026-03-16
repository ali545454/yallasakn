import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
      <Card className="border border-slate-200 shadow-md bg-white">
        <div className="p-6">
          <h3 className="font-semibold text-lg mb-6 flex items-center gap-3 text-blue-800">
            <Star className="h-6 w-6" />
            اختر المميزات المتوفرة
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((feature) => {
              const isSelected = formData[feature.id as keyof typeof formData];
              return (
                <button
                  key={feature.id}
                  type="button"
                  onClick={() => handleFeatureSelect(feature.id)}
                  className={`p-4 flex flex-col items-center justify-center gap-2 rounded-lg transition-all duration-300 border ${
                    isSelected
                      ? "border-blue-600 bg-blue-50 shadow-md ring-2 ring-blue-200"
                      : "border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50 hover:ring-2 hover:ring-blue-100"
                  }`}
                >
                  <div
                    className={`transition-colors duration-300 ${
                      isSelected ? "text-blue-600" : "text-slate-600"
                    }`}
                  >
                    {feature.icon}
                  </div>
                  <span className="text-center text-sm font-medium text-slate-700">
                    {feature.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Step3;
