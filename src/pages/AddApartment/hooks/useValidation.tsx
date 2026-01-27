import { FormDataType } from "../constants";

export const useValidation = (
  formData: FormDataType,
  step: number,
  images: File[],
  setErrors: (errors: Record<string, string>) => void
) => {
  const validateStep = () => {
    let newErrors: Record<string, string> = {};
    const isNonNegativeInteger = (v: any) => {
      const n = Number(v);
      return Number.isInteger(n) && n >= 0;
    };

    const priceNum = Number(formData.price || 0);
    const roomsNum = Number(formData.rooms || 0);
    const totalBedsNum = Number(formData.total_beds || 0);
    const availableBedsNum = Number(formData.available_beds || 0);
    const areaNum = Number(formData.area || 0);
    const floorNum = Number(formData.floor_number || 0);

    if (step === 1) {
      if (!formData.title) newErrors.title = "العنوان مطلوب";
      if (!formData.description) newErrors.description = "الوصف مطلوب";
      if (!formData.neighborhood_id)
        newErrors.neighborhood_id = "يجب اختيار المنطقة";
      if (!formData.address) newErrors.address = "العنوان التفصيلي مطلوب";

      if (formData.title && formData.title.length > 150)
        newErrors.title = "العنوان طويل جدًا (أقصى 150 حرفًا)";
      if (formData.description && formData.description.length > 2000)
        newErrors.description = "الوصف طويل جدًا (أقصى 2000 حرف)";
    }

    if (step === 2) {
      if (!formData.price) newErrors.price = "السعر مطلوب";
      else if (!isNonNegativeInteger(formData.price))
        newErrors.price = "السعر يجب أن يكون رقمًا صحيحًا وغير سالب";
      else if (priceNum > 50000)
        newErrors.price = "السعر لا يمكن أن يتجاوز 50,000 ج.م";

      if (!formData.rooms) newErrors.rooms = "عدد الغرف مطلوب";
      else if (!isNonNegativeInteger(formData.rooms))
        newErrors.rooms = "عدد الغرف يجب أن يكون رقمًا صحيحًا وغير سالب";
      else if (roomsNum > 8) newErrors.rooms = "عدد الغرف لا يمكن أن يتجاوز 8";

      if (!formData.kitchens) newErrors.kitchens = "عدد المطابخ مطلوب مطلوب";
      else if (!isNonNegativeInteger(formData.kitchens))
        newErrors.kitchens = "عدد المطابخ يجب أن يكون رقمًا صحيحًا وغير سالب";
      else if (roomsNum > 8)
        newErrors.kitchens = "عدد المطابخ لا يمكن أن يتجاوز 8";

      if (!formData.area) newErrors.area = "المساحة مطلوبة";
      else if (Number(formData.area) <= 0)
        newErrors.area = "المساحة يجب أن تكون أكبر من 0";

      if (!formData.total_beds) newErrors.total_beds = "إجمالي السراير مطلوب";
      else if (!isNonNegativeInteger(formData.total_beds))
        newErrors.total_beds =
          "إجمالي السراير يجب أن يكون رقمًا صحيحًا وغير سالب";
      else if (totalBedsNum > 20)
        newErrors.total_beds = "إجمالي السراير لا يمكن أن يتجاوز 20";

      if (!formData.available_beds)
        newErrors.available_beds = "السراير المتاحة مطلوبة";
      else if (!isNonNegativeInteger(formData.available_beds))
        newErrors.available_beds =
          "السراير المتاحة يجب أن تكون رقمًا صحيحًا وغير سالب";
      else if (availableBedsNum > totalBedsNum)
        newErrors.available_beds =
          "السراير المتاحة لا يمكن أن تكون أكبر من إجمالي السراير";

      if (formData.floor_number && Number(formData.floor_number) < 0)
        newErrors.floor_number = "رقم الدور لا يمكن أن يكون سالبًا";
    }

    if (step === 3) {
      if (images.length === 0)
        newErrors.images = "يجب إضافة صورة واحدة على الأقل";
      if (images.length > 20) newErrors.images = "الحد الأقصى للصور هو 20 صورة";
    }

    if (formData.whatsapp_number) {
      const phone = formData.whatsapp_number.trim();
      const egyptPhoneRegex = /^(?:\+20|20|0)?1[0125]\d{8}$/;
      if (!egyptPhoneRegex.test(phone)) {
        newErrors.whatsapp_number =
          "تنسيق رقم الواتساب غير صحيح (مثال: 01012345678 أو +201012345678)";
      }
    }

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
    numericFields.forEach((k) => {
      const v = (formData as any)[k];
      if (v !== "" && v !== null && v !== undefined) {
        const n = Number(v);
        if (isNaN(n)) newErrors[k] = "هذا الحقل يجب أن يحتوي على رقم صالح";
        else if (n < 0) newErrors[k] = "لا يمكن أن يكون رقمًا سالبًا";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { validateStep };
};