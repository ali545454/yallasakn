import React from "react";
import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Trash2, Camera } from "lucide-react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AddApartmentFormValues } from "../schema";

interface Step4Props {
  images: File[];
  onImagesChange: (files: File[]) => void;
  onRemoveImage: (index: number) => void;
  imageError?: string | null;
}

const MAX_IMAGES = 20;

const Step4: React.FC<Step4Props> = ({
  images,
  onImagesChange,
  onRemoveImage,
  onDropFiles,
  imageError,
}) => {
  const { control } = useFormContext<AddApartmentFormValues>();

  const handleFileInput = (files: FileList | null) => {
    if (!files) return;
    const added = Array.from(files).slice(0, MAX_IMAGES - images.length);
    onImagesChange([...images, ...added]);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!event.dataTransfer.files) return;
    handleFileInput(event.dataTransfer.files);
  };

  const openFileDialog = () => {
    const input = document.getElementById("images-input") as HTMLInputElement | null;
    input?.click();
  };

  return (
    <div className="space-y-8 animate-in fade-in-50">
      <Card className="border border-slate-200 shadow-md bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-blue-800">
            <Camera className="h-6 w-6" />
            صور الشقة (على الأقل صورة واحدة)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={openFileDialog}
            className="border-2 border-dashed border-blue-300 rounded-xl p-12 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 bg-white"
          >
            <Upload className="mx-auto h-16 w-16 text-blue-400 mb-4" />
            <p className="text-lg font-medium text-blue-700 mb-2">
              اسحب وأفلت الصور هنا، أو انقر للاختيار
            </p>
            <p className="text-sm text-slate-600">
              يمكنك رفع حتى {MAX_IMAGES} صورة لإظهار جمال شقتك
            </p>
            <input
              id="images-input"
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleFileInput(e.target.files)}
              className="hidden"
            />
          </div>
          {imageError && <p className="text-red-500 text-sm mt-4">{imageError}</p>}

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
                      onClick={() => onRemoveImage(index)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border border-slate-200 shadow-md bg-white">
        <CardHeader>
          <CardTitle className="text-blue-800">تفاصيل إضافية</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={control}
              name="preferred_tenant_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نوع المستأجر المفضل</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger className="border-2 focus:border-blue-500 transition-colors duration-200 bg-white">
                        <SelectValue placeholder="اختر نوع المستأجر المفضل" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="شباب">شباب</SelectItem>
                        <SelectItem value="بنات">بنات</SelectItem>
                        <SelectItem value="عائلات">عائلات</SelectItem>
                        <SelectItem value="لا يهم">لا يهم</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="owner_notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ملاحظات إضافية (اختياري)</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={4}
                      placeholder="أضف أي تعليمات أو ملاحظات للمستأجرين"
                      className="border-2 focus:border-blue-500 transition-colors duration-200 resize-none"
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

export default Step4;
