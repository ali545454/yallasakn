import { z } from "zod";

const egyptPhoneRegex = /^(?:\+20|20|0)?1[0125]\d{8}$/;

export const addApartmentSchema = z
  .object({
    title: z
      .string()
      .min(1, "العنوان مطلوب")
      .max(150, "العنوان طويل جدًا (أقصى 150 حرفًا)"),

    description: z
      .string()
      .min(1, "الوصف مطلوب")
      .max(2000, "الوصف طويل جدًا (أقصى 2000 حرف)"),

    neighborhood_id: z.string().min(1, "يجب اختيار المنطقة"),

    address: z.string().min(1, "العنوان التفصيلي مطلوب"),

    price: z.coerce
      .number()
      .int("السعر يجب أن يكون رقم صحيح")
      .min(0, "السعر لا يمكن أن يكون سالب")
      .max(50000, "السعر لا يمكن أن يتجاوز 50,000 ج.م"),

    rooms: z.coerce
      .number()
      .int("عدد الغرف يجب أن يكون رقم صحيح")
      .min(0)
      .max(8),

    bathrooms: z.coerce
      .number()
      .int("عدد الحمامات يجب أن يكون رقم صحيح")
      .min(0)
      .default(0),

    kitchens: z.coerce
      .number()
      .int("عدد المطابخ يجب أن يكون رقم صحيح")
      .min(0)
      .max(8),

    total_beds: z.coerce
      .number()
      .int("إجمالي السراير يجب أن يكون رقم صحيح")
      .min(0)
      .max(20),

    available_beds: z.coerce
      .number()
      .int("السراير المتاحة يجب أن تكون رقم صحيح")
      .min(0),

    area: z.coerce
      .number()
      .min(1, "المساحة يجب أن تكون أكبر من 0"),

    floor_number: z.coerce
      .number()
      .int("رقم الدور يجب أن يكون رقم صحيح")
      .min(0)
      .default(0),

    whatsapp_number: z
      .string()
      .optional()
      .refine((val) => !val || egyptPhoneRegex.test(val), {
        message:
          "تنسيق رقم الواتساب غير صحيح (مثال: 01012345678 أو +201012345678)",
      }),

    residence_type: z.string().optional(),
    preferred_tenant_type: z.string().optional(),
    owner_notes: z.string().optional(),

    has_wifi: z.boolean().optional(),
    has_ac: z.boolean().optional(),
    has_balcony: z.boolean().optional(),
    has_elevator: z.boolean().optional(),
    has_washing_machine: z.boolean().optional(),
    has_oven: z.boolean().optional(),
    has_gas: z.boolean().optional(),
    near_transport: z.boolean().optional(),
  })
  .refine((data) => data.available_beds <= data.total_beds, {
    path: ["available_beds"],
    message: "السراير المتاحة لا يمكن أن تكون أكبر من إجمالي السراير",
  });

export type AddApartmentFormValues = z.infer<typeof addApartmentSchema>;