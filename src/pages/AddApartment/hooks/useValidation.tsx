import { FormDataType } from "../constants";

const egyptPhoneRegex = /^(?:\+20|20|0)?1[0125]\d{8}$/;

export const useValidation = (
  formData: FormDataType,
  step: number,
  images: File[],
  setErrors: (errors: Record<string, string>) => void
) => {
  const toNumber = (v: any) => Number(v || 0);

  const validateStep = () => {
    const errors: Record<string, string> = {};

    const price = toNumber(formData.price);
    const rooms = toNumber(formData.rooms);
    const kitchens = toNumber(formData.kitchens);
    const totalBeds = toNumber(formData.total_beds);
    const availableBeds = toNumber(formData.available_beds);
    const area = toNumber(formData.area);
    const floor = toNumber(formData.floor_number);

    const isNonNegativeInteger = (v: any) =>
      Number.isInteger(Number(v)) && Number(v) >= 0;

    /* ---------------- Step 1 ---------------- */

    if (step === 1) {
      if (!formData.title) errors.title = "العنوان مطلوب";
      if (!formData.description) errors.description = "الوصف مطلوب";
      if (!formData.neighborhood_id)
        errors.neighborhood_id = "يجب اختيار المنطقة";
      if (!formData.address) errors.address = "العنوان التفصيلي مطلوب";

      if (formData.title?.length > 150)
        errors.title = "العنوان طويل جدًا (أقصى 150 حرفًا)";
      if (formData.description?.length > 2000)
        errors.description = "الوصف طويل جدًا (أقصى 2000 حرف)";
    }

    /* ---------------- Step 2 ---------------- */

    if (step === 2) {
      if (!formData.price) errors.price = "السعر مطلوب";
      else if (!isNonNegativeInteger(formData.price))
        errors.price = "السعر يجب أن يكون رقمًا صحيحًا وغير سالب";
      else if (price > 50000)
        errors.price = "السعر لا يمكن أن يتجاوز 50,000 ج.م";

      if (!formData.rooms) errors.rooms = "عدد الغرف مطلوب";
      else if (!isNonNegativeInteger(formData.rooms))
        errors.rooms = "عدد الغرف يجب أن يكون رقمًا صحيحًا وغير سالب";
      else if (rooms > 8)
        errors.rooms = "عدد الغرف لا يمكن أن يتجاوز 8";

      if (!formData.kitchens) errors.kitchens = "عدد المطابخ مطلوب";
      else if (!isNonNegativeInteger(formData.kitchens))
        errors.kitchens = "عدد المطابخ يجب أن يكون رقمًا صحيحًا وغير سالب";
      else if (kitchens > 8)
        errors.kitchens = "عدد المطابخ لا يمكن أن يتجاوز 8";

      if (!formData.area) errors.area = "المساحة مطلوبة";
      else if (area <= 0)
        errors.area = "المساحة يجب أن تكون أكبر من 0";

      if (!formData.total_beds) errors.total_beds = "إجمالي السراير مطلوب";
      else if (!isNonNegativeInteger(formData.total_beds))
        errors.total_beds =
          "إجمالي السراير يجب أن يكون رقمًا صحيحًا وغير سالب";
      else if (totalBeds > 20)
        errors.total_beds = "إجمالي السراير لا يمكن أن يتجاوز 20";

      if (!formData.available_beds)
        errors.available_beds = "السراير المتاحة مطلوبة";
      else if (!isNonNegativeInteger(formData.available_beds))
        errors.available_beds =
          "السراير المتاحة يجب أن تكون رقمًا صحيحًا وغير سالب";
      else if (availableBeds > totalBeds)
        errors.available_beds =
          "السراير المتاحة لا يمكن أن تكون أكبر من إجمالي السراير";

      if (floor < 0)
        errors.floor_number = "رقم الدور لا يمكن أن يكون سالبًا";
    }

    /* ---------------- Step 4 ---------------- */

    if (step === 4) {
      if (images.length === 0)
        errors.images = "يجب إضافة صورة واحدة على الأقل";
      if (images.length > 20)
        errors.images = "الحد الأقصى للصور هو 20 صورة";
    }

    /* ---------------- Phone validation ---------------- */

    if (formData.whatsapp_number) {
      const phone = formData.whatsapp_number.trim();
      if (!egyptPhoneRegex.test(phone)) {
        errors.whatsapp_number =
          "تنسيق رقم الواتساب غير صحيح (مثال: 01012345678 أو +201012345678)";
      }
    }

    /* ---------------- Numeric validation ---------------- */

    const numericFields = [
      "price",
      "rooms",
      "bathrooms",
      "kitchens",
      "total_beds",
      "available_beds",
      "area",
      "floor_number",
    ];

    numericFields.forEach((key) => {
      const value = (formData as any)?.[key];
      if (value !== "" && value !== null && value !== undefined) {
        const n = Number(value);
        if (isNaN(n)) errors[key] = "هذا الحقل يجب أن يحتوي على رقم صالح";
        else if (n < 0) errors[key] = "لا يمكن أن يكون رقمًا سالبًا";
      }
    });

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return { validateStep };
};