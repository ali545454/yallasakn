import React from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Ruler, DollarSign, Phone } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AddApartmentFormValues } from "../schema";

const Step2: React.FC = () => {
  const { control } = useFormContext<AddApartmentFormValues>();

  return (
    <div className="space-y-8 animate-in fade-in-50">
      <Card className="border border-slate-200 shadow-md bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-blue-800">
            <Home className="h-6 w-6" />
            الأبعاد والسعة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <FormField
              control={control}
              name="rooms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>عدد الغرف *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      className="border-2 focus:border-blue-500 transition-colors duration-200"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="bathrooms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>عدد الحمامات</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      className="border-2 focus:border-blue-500 transition-colors duration-200"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="kitchens"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>عدد المطابخ</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      className="border-2 focus:border-blue-500 transition-colors duration-200"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="area"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Ruler className="h-4 w-4" />
                    المساحة (م²) *
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      className="border-2 focus:border-blue-500 transition-colors duration-200"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="total_beds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>إجمالي السراير *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      className="border-2 focus:border-blue-500 transition-colors duration-200"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="available_beds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>السراير المتاحة *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      className="border-2 focus:border-blue-500 transition-colors duration-200"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="floor_number"
              render={({ field }) => (
                <FormItem className="md:col-span-3">
                  <FormLabel>رقم الدور</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      className="border-2 focus:border-blue-500 transition-colors duration-200 md:w-1/3"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border border-slate-200 shadow-md bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-blue-800">
            <DollarSign className="h-6 w-6" />
            التسعير والتواصل
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <FormField
              control={control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>السعر الشهري (جنيه) *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      className="border-2 focus:border-blue-500 transition-colors duration-200"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="residence_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نوع السكن</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger className="border-2 focus:border-blue-500 transition-colors duration-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="شقة كاملة">شقة كاملة</SelectItem>
                        <SelectItem value="غرفة">غرفة</SelectItem>
                        <SelectItem value="إستوديو">إستوديو</SelectItem>
                        <SelectItem value="سكن مشترك">سكن مشترك</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="whatsapp_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    رقم واتساب للتواصل
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="tel"
                      className="border-2 focus:border-blue-500 transition-colors duration-200"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Step2;
