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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, FileText, Tag } from "lucide-react";
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
    <div className="space-y-8 animate-in fade-in-50">
      <Card className="border-0 shadow-md bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-blue-800">
            <Tag className="h-6 w-6" />
            المعلومات الأساسية
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-semibold text-gray-700">
              عنوان الإعلان *
            </Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="مثال: شقة مفروشة بالكامل قرب الجامعة"
              className="border-2 focus:border-blue-500 transition-colors duration-200"
            />
            <p className="text-red-500 text-sm">{errors.title}</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              وصف الشقة *
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="اكتب وصفاً تفصيلياً عن الشقة ومميزاتها..."
              rows={5}
              className="border-2 focus:border-blue-500 transition-colors duration-200 resize-none"
            />
            <p className="text-red-500 text-sm">{errors.description}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-md bg-gradient-to-r from-green-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-green-800">
            <MapPin className="h-6 w-6" />
            الموقع والعنوان
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="neighborhood_id" className="text-sm font-semibold text-gray-700">
                المنطقة *
              </Label>
              <Select
                name="neighborhood_id"
                onValueChange={(value) => handleSelectChange("neighborhood_id", value)}
                value={formData.neighborhood_id}
              >
                <SelectTrigger className="border-2 focus:border-green-500 transition-colors duration-200">
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
              <Label htmlFor="address" className="text-sm font-semibold text-gray-700">
                العنوان التفصيلي *
              </Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="مثال: شارع الجمهورية، بجوار صيدلية..."
                className="border-2 focus:border-green-500 transition-colors duration-200"
              />
              <p className="text-red-500 text-sm">{errors.address}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Step1;
