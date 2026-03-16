import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import axiosInstance from "@/utils/axiosInstance";
import { steps } from "./AddApartment/constants";
import Step1 from "./AddApartment/Steps/Step1";
import Step2 from "./AddApartment/Steps/Step2";
import Step3 from "./AddApartment/Steps/Step3";
import Step4 from "./AddApartment/Steps/Step4";
import ProgressSidebar from "./AddApartment/Components/ProgressSidebar";
import NavigationButtons from "./AddApartment/Components/NavigationButtons";
import { useFormState } from "./AddApartment/hooks/useFormState";
import {
  addApartmentSchema,
  AddApartmentFormValues,
  STEP_FIELDS,
} from "./AddApartment/schema";

const MAX_IMAGES = 20;

const AddApartment = () => {
  const navigate = useNavigate();
  const methods = useForm<AddApartmentFormValues>({
    mode: "onTouched",
    resolver: zodResolver(addApartmentSchema),
    defaultValues: {
      title: "",
      description: "",
      neighborhood_id: "",
      address: "",
      price: "",
      rooms: "",
      bathrooms: "",
      kitchens: "",
      total_beds: "",
      available_beds: "",
      area: "",
      floor_number: "",
      whatsapp_number: "",
      residence_type: "",
      preferred_tenant_type: "",
      owner_notes: "",
      has_wifi: false,
      has_ac: false,
      has_balcony: false,
      has_elevator: false,
      has_washing_machine: false,
      has_oven: false,
      has_gas: false,
      near_transport: false,
    },
  });

  const { trigger, handleSubmit } = methods;
  const [step, setStep] = useState(1);
  const [images, setImages] = useState<File[]>([]);
  const [imageError, setImageError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { neighborhoods, neighborhoodsLoading, neighborhoodsError } = useFormState();

  const stepFields = useMemo(() => STEP_FIELDS, []);

  const validateImages = () => {
    if (images.length === 0) {
      setImageError("يجب إضافة صورة واحدة على الأقل");
      return false;
    }

    if (images.length > MAX_IMAGES) {
      setImageError(`الحد الأقصى للصور هو ${MAX_IMAGES} صورة`);
      return false;
    }

    setImageError(null);
    return true;
  };

  const goNext = async () => {
    const currentStepFields = stepFields[step] ?? [];
    const stepValid = await trigger(currentStepFields as any);

    if (!stepValid) return;

    setStep((prev) => Math.min(prev + 1, steps.length));
  };

  const goPrev = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleImagesChange = (files: File[]) => {
    const next = [...images, ...files].slice(0, MAX_IMAGES);
    setImages(next);
    setImageError(null);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (values: AddApartmentFormValues) => {
    if (!validateImages()) {
      setStep(3);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (typeof value === "boolean") {
        formData.append(key, value ? "true" : "false");
      } else {
        formData.append(key, value ?? "");
      }
    });

    images.forEach((image) => formData.append("images", image));

    try {
      await axiosInstance.post("/api/v1/apartments/create", formData);
      navigate("/dashboard?status=success");
    } catch (err: any) {
      setSubmitError(err?.response?.data?.error || "فشل إنشاء الشقة");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step1
            neighborhoods={neighborhoods}
            neighborhoodsLoading={neighborhoodsLoading}
            neighborhoodsError={neighborhoodsError}
          />
        );
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      case 4:
        return (
          <Step4
            images={images}
            onImagesChange={handleImagesChange}
            onRemoveImage={removeImage}
            imageError={imageError}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-50">
        <div className="container py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <ProgressSidebar currentStep={step} />

            <main className="lg:col-span-3">
              <Card className="shadow-xl border border-slate-200 bg-white">
                <CardHeader className="bg-blue-600 text-white rounded-t-lg">
                  <CardTitle className="text-3xl font-bold flex items-center gap-3">
                    🏠 إضافة شقة جديدة
                  </CardTitle>
                  <CardDescription className="text-blue-100">
                    {steps[step - 1].title}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <FormProvider {...methods}>
                    <form noValidate onSubmit={handleSubmit(onSubmit)}>
                      {renderStep()}
                      <NavigationButtons
                        step={step}
                        totalSteps={steps.length}
                        isLoading={isSubmitting}
                        onPrev={goPrev}
                        onNext={goNext}
                        error={submitError}
                      />
                    </form>
                  </FormProvider>
                </CardContent>
              </Card>
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddApartment;
