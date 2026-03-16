import React from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, FileText, Tag } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AddApartmentFormValues } from "../schema";

interface Step1Props {
  neighborhoods: { id: number; name: string }[];
  neighborhoodsLoading: boolean;
  neighborhoodsError: string | null;
}

const Step1: React.FC<Step1Props> = ({
  neighborhoods,
  neighborhoodsLoading,
  neighborhoodsError,
}) => {
  const { control } = useFormContext<AddApartmentFormValues>();

  return (
    <div className="space-y-8 animate-in fade-in-50">
      <Card className="border border-slate-200 shadow-md bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-blue-800">
            <Tag className="h-6 w-6" />
            المعلومات الأساسية
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>عنوان الإعلان *</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="مثال: شقة مفروشة بالكامل قرب الجامعة"
                    className="border-2 focus:border-blue-500 transition-colors duration-200"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  وصف الشقة *
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    rows={5}
                    placeholder="اكتب وصفاً تفصيلياً عن الشقة ومميزاتها..."
                    className="border-2 focus:border-blue-500 transition-colors duration-200 resize-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      <Card className="border border-slate-200 shadow-md bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-blue-800">
            <MapPin className="h-6 w-6" />
            الموقع والعنوان
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={control}
              name="neighborhood_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>المنطقة *</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={(value) => field.onChange(value)}
                      disabled={neighborhoodsLoading}
                    >
                      <SelectTrigger className="border-2 focus:border-green-500 transition-colors duration-200">
                        <SelectValue
                          placeholder={
                            neighborhoodsLoading ? "تحميل الأحياء..." : "اختر منطقة"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {neighborhoodsLoading ? (
                          <SelectItem value="" disabled>
                            جارٍ التحميل...
                          </SelectItem>
                        ) : neighborhoods.length ? (
                          neighborhoods.map((n) => (
                            <SelectItem key={n.id} value={String(n.id)}>
                              {n.name}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="" disabled>
                            لا توجد أحياء متاحة
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                  {neighborhoodsError && (
                    <p className="text-sm text-yellow-700 mt-1">
                      {neighborhoodsError}
                    </p>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>العنوان التفصيلي *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="مثال: شارع الجمهورية، بجوار صيدلية..."
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

export default Step1;
