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

    price: z
      .coerce.number()
      .int("السعر يجب أن يكون رقمًا صحيحًا وغير سالب")
      .min(0, "السعر يجب أن يكون رقمًا صحيحًا وغير سالب")
      .max(50000, "السعر لا يمكن أن يتجاوز 50,000 ج.م"),

    rooms: z
      .coerce.number()
      .int("عدد الغرف يجب أن يكون رقمًا صحيحًا وغير سالب")
      .min(0, "عدد الغرف يجب أن يكون رقمًا صحيحًا وغير سالب")
      .max(8, "عدد الغرف لا يمكن أن يتجاوز 8"),

    bathrooms: z
      .preprocess((val) => (val === undefined || val === "" ? 0 : val), z.coerce.number())
      .int("عدد الحمامات يجب أن يكون رقمًا صحيحًا وغير سالب")
      .min(0, "عدد الحمامات يجب أن يكون رقمًا صحيحًا وغير سالب"),

    kitchens: z
      .coerce.number()
      .int("عدد المطابخ يجب أن يكون رقمًا صحيحًا وغير سالب")
      .min(0, "عدد المطابخ يجب أن يكون رقمًا صحيحًا وغير سالب")
      .max(8, "عدد المطابخ لا يمكن أن يتجاوز 8"),

    total_beds: z
      .coerce.number()
      .int("إجمالي السراير يجب أن يكون رقمًا صحيحًا وغير سالب")
      .min(0, "إجمالي السراير يجب أن يكون رقمًا صحيحًا وغير سالب")
      .max(20, "إجمالي السراير لا يمكن أن يتجاوز 20"),

    available_beds: z
      .coerce.number()
      .int("السراير المتاحة يجب أن تكون رقمًا صحيحًا وغير سالب")
      .min(0, "السراير المتاحة يجب أن تكون رقمًا صحيحًا وغير سالب"),

    area: z
      .coerce.number()
      .gt(0, "المساحة يجب أن تكون أكبر من 0"),

    floor_number: z
      .preprocess((val) => (val === undefined || val === "" ? 0 : val), z.coerce.number())
      .int("رقم الدور لا يمكن أن يكون سالبًا")
      .min(0, "رقم الدور لا يمكن أن يكون سالبًا"),

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
  .superRefine((data, ctx) => {
    const totalBedsNum = Number(data.total_beds);
    const availableBedsNum = Number(data.available_beds);

    if (Number.isFinite(totalBedsNum) && Number.isFinite(availableBedsNum)) {
      if (availableBedsNum > totalBedsNum) {
        ctx.addIssue({
          path: ["available_beds"],
          message: "السراير المتاحة لا يمكن أن تكون أكبر من إجمالي السراير",
          code: z.ZodIssueCode.custom,
        });
      }
    }
  });

export type AddApartmentFormValues = z.infer<typeof addApartmentSchema>;

export const STEP_FIELDS: Record<number, (keyof AddApartmentFormValues)[]> = {
  1: ["title", "description", "neighborhood_id", "address"],
  2: [
    "price",
    "rooms",
    "bathrooms",
    "kitchens",
    "total_beds",
    "available_beds",
    "area",
    "floor_number",
    "whatsapp_number",
    "residence_type",
  ],
  3: [
    "has_wifi",
    "has_ac",
    "has_balcony",
    "has_elevator",
    "has_washing_machine",
    "has_oven",
    "has_gas",
    "near_transport",
  ],
  4: ["preferred_tenant_type", "owner_notes"],
};
