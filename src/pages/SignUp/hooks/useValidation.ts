// hooks/useValidation.ts

import { FormData } from "./useFormState";

export const useValidation = (
  formData: FormData,
  userType: "student" | "owner",
  agreeToTerms: boolean,
  passwordStrong: boolean
) => {
  const validateForm = () => {
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.birthDate ||
      (userType === "student" &&
        (!formData.faculty || !formData.academicYear || !formData.university))
    ) {
      return "من فضلك املأ كل الحقول المطلوبة";
    }

    if (!agreeToTerms) {
      return "يجب الموافقة على الشروط والأحكام";
    }

    if (!passwordStrong) {
      return "كلمة المرور ضعيفة — الرجاء اختيار كلمة مرور أقوى.";
    }

    if (formData.password !== formData.confirmPassword) {
      return "كلمتا المرور غير متطابقتين";
    }

    return null;
  };

  return { validateForm };
};