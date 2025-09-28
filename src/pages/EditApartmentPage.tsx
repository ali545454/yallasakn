// src/pages/EditApartmentPage.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// ✅ اسكيمة الفاليديشن
const schema = z.object({
  title: z.string().min(3, "العنوان مطلوب"),
  description: z.string().optional(),
  price: z.number().min(1, "السعر لازم يكون أكبر من 0"),
  rooms: z.number().min(1, "لازم تحدد عدد الغرف"),
  bathrooms: z.number().min(0),
  kitchens: z.number().min(0),
  has_wifi: z.boolean().optional(),
  has_ac: z.boolean().optional(),
  has_elevator: z.boolean().optional(),
  has_balcony: z.boolean().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function EditApartmentPage() {
  const { apartmentUuid } = useParams<{ apartmentUuid: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      rooms: 1,
      bathrooms: 0,
      kitchens: 0,
      has_wifi: false,
      has_ac: false,
      has_elevator: false,
      has_balcony: false,
    },
  });

  // ✅ جلب بيانات الشقة
  useEffect(() => {
    if (!apartmentUuid) return;

    const fetchApartment = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/v1/apartments/apartment/${apartmentUuid}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const data = await res.json();
        if (res.ok) {
          reset({
            title: data.title,
            description: data.description,
            price: data.price,
            rooms: data.bedrooms,
            bathrooms: data.bathrooms,
            kitchens: data.kitchens,
            has_wifi: data.features?.includes("واي فاي"),
            has_ac: data.features?.includes("تكييف"),
            has_elevator: data.features?.includes("مصعد"),
            has_balcony: data.features?.includes("بلكونة"),
          });
        } else {
          alert("فشل في جلب بيانات الشقة");
          console.error(data);
        }
      } catch (err) {
        console.error("Error fetching apartment", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApartment();
  }, [apartmentUuid, reset]);

  // ✅ تحديث الشقة
  const onSubmit = async (values: FormValues) => {
    if (!apartmentUuid) return;

    try {
      const res = await fetch(`http://localhost:5000/api/v1/apartments/apartment/${apartmentUuid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (res.ok) {
        alert("تم تعديل الشقة بنجاح ✅");
        navigate("/my-apartments");
      } else {
        alert("فشل في تعديل الشقة");
        console.error(data);
      }
    } catch (err) {
      console.error("Error updating apartment", err);
    }
  };

  if (loading) return <p className="p-4">جاري تحميل بيانات الشقة...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">تعديل الشقة</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* العنوان */}
        <div>
          <label>العنوان</label>
          <Input {...register("title")} />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        </div>

        {/* الوصف */}
        <div>
          <label>الوصف</label>
          <Textarea {...register("description")} />
        </div>

        {/* السعر */}
        <div>
          <label>السعر</label>
          <Input type="number" {...register("price", { valueAsNumber: true })} />
          {errors.price && <p className="text-red-500">{errors.price.message}</p>}
        </div>

        {/* عدد الغرف */}
        <div>
          <label>عدد الغرف</label>
          <Input type="number" {...register("rooms", { valueAsNumber: true })} />
        </div>

        {/* عدد الحمامات */}
        <div>
          <label>عدد الحمامات</label>
          <Input type="number" {...register("bathrooms", { valueAsNumber: true })} />
        </div>

        {/* عدد المطابخ */}
        <div>
          <label>عدد المطابخ</label>
          <Input type="number" {...register("kitchens", { valueAsNumber: true })} />
        </div>

        {/* الخصائص */}
        <div className="flex gap-4">
          <label>
            <input type="checkbox" {...register("has_wifi")} /> واي فاي
          </label>
          <label>
            <input type="checkbox" {...register("has_ac")} /> تكييف
          </label>
          <label>
            <input type="checkbox" {...register("has_elevator")} /> مصعد
          </label>
          <label>
            <input type="checkbox" {...register("has_balcony")} /> بلكونة
          </label>
        </div>

        <Button type="submit">حفظ التعديلات</Button>
      </form>
    </div>
  );
}
