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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Ruler, DollarSign, Phone } from "lucide-react";
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
      <Card className="border-0 shadow-md bg-gradient-to-r from-purple-50 to-pink-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-purple-800">
            <Home className="h-6 w-6" />
            الأبعاد والسعة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="rooms" className="text-sm font-semibold text-gray-700">
                عدد الغرف *
              </Label>
              <Input
                id="rooms"
                name="rooms"
                type="number"
                value={formData.rooms}
                onChange={handleInputChange}
                className="border-2 focus:border-purple-500 transition-colors duration-200"
              />
              <p className="text-red-500 text-sm">{errors.rooms}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bathrooms" className="text-sm font-semibold text-gray-700">
                عدد الحمامات
              </Label>
              <Input
                id="bathrooms"
                name="bathrooms"
                type="number"
                value={formData.bathrooms}
                onChange={handleInputChange}
                className="border-2 focus:border-purple-500 transition-colors duration-200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="kitchens" className="text-sm font-semibold text-gray-700">
                عدد المطابخ
              </Label>
              <Input
                id="kitchens"
                name="kitchens"
                type="number"
                value={formData.kitchens}
                onChange={handleInputChange}
                className="border-2 focus:border-purple-500 transition-colors duration-200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="area" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Ruler className="h-4 w-4" />
                المساحة (م²) *
              </Label>
              <Input
                id="area"
                name="area"
                type="number"
                value={formData.area}
                onChange={handleInputChange}
                className="border-2 focus:border-purple-500 transition-colors duration-200"
              />
              <p className="text-red-500 text-sm">{errors.area}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="total_beds" className="text-sm font-semibold text-gray-700">
                إجمالي السراير *
              </Label>
              <Input
                id="total_beds"
                name="total_beds"
                type="number"
                value={formData.total_beds}
                onChange={handleInputChange}
                className="border-2 focus:border-purple-500 transition-colors duration-200"
              />
              <p className="text-red-500 text-sm">{errors.total_beds}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="available_beds" className="text-sm font-semibold text-gray-700">
                السراير المتاحة *
              </Label>
              <Input
                id="available_beds"
                name="available_beds"
                type="number"
                value={formData.available_beds}
                onChange={handleInputChange}
                className="border-2 focus:border-purple-500 transition-colors duration-200"
              />
              <p className="text-red-500 text-sm">{errors.available_beds}</p>
            </div>
            <div className="space-y-2 md:col-span-3">
              <Label htmlFor="floor_number" className="text-sm font-semibold text-gray-700">
                رقم الدور
              </Label>
              <Input
                id="floor_number"
                name="floor_number"
                type="number"
                value={formData.floor_number}
                onChange={handleInputChange}
                className="border-2 focus:border-purple-500 transition-colors duration-200 md:w-1/3"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-md bg-gradient-to-r from-green-50 to-teal-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-green-800">
            <DollarSign className="h-6 w-6" />
            التسعير والتواصل
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="price" className="text-sm font-semibold text-gray-700">
                السعر الشهري (جنيه) *
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleInputChange}
                className="border-2 focus:border-green-500 transition-colors duration-200"
              />
              <p className="text-red-500 text-sm">{errors.price}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="residence_type" className="text-sm font-semibold text-gray-700">
                نوع السكن
              </Label>
              <Select
                name="residence_type"
                onValueChange={(value) => handleSelectChange("residence_type", value)}
                value={formData.residence_type}
              >
                <SelectTrigger className="border-2 focus:border-green-500 transition-colors duration-200">
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
              <Label htmlFor="whatsapp_number" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Phone className="h-4 w-4" />
                رقم واتساب للتواصل
              </Label>
              <Input
                id="whatsapp_number"
                name="whatsapp_number"
                type="tel"
                value={formData.whatsapp_number}
                onChange={handleInputChange}
                className="border-2 focus:border-green-500 transition-colors duration-200"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Step2;
