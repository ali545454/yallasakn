import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { useFormState } from "./AddApartment/hooks/useFormState";
import { useValidation } from "./AddApartment/hooks/useValidation";
import { steps } from "./AddApartment/constants";
import Step1 from "./AddApartment/Steps/Step1";
import Step2 from "./AddApartment/Steps/Step2";
import Step3 from "./AddApartment/Steps/Step3";
import ProgressSidebar from "./AddApartment/Components/ProgressSidebar";
import NavigationButtons from "./AddApartment/Components/NavigationButtons";

const AddApartment = () => {
  const navigate = useNavigate();
  const {
    step,
    setStep,
    isLoading,
    setIsLoading,
    error,
    setError,
    errors,
    setErrors,
    formData,
    images,
    neighborhoods,
    handleInputChange,
    handleSelectChange,
    handleFeatureSelect,
    handleFileChange,
    handleFileDrop,
    removeImage,
  } = useFormState();

  const { validateStep } = useValidation(formData, step, images, setErrors);

  const nextStep = () => {
    if (validateStep()) setStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;

    setIsLoading(true);
    setError(null);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (typeof value === "boolean")
        data.append(key, value ? "true" : "false");
      else data.append(key, String(value));
    });
    images.forEach((image) => data.append("images", image));
    try {
      const response = await axiosInstance.post(
        "/api/v1/apartments/create",
        data
      );
      navigate("/dashboard?status=success");
    } catch (err: any) {
      setError(err.response?.data?.error || "فشل إنشاء الشقة");
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step1
            formData={formData}
            errors={errors}
            neighborhoods={neighborhoods}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
          />
        );
      case 2:
        return (
          <Step2
            formData={formData}
            errors={errors}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
          />
        );
      case 3:
        return (
          <Step3
            formData={formData}
            errors={errors}
            images={images}
            handleFeatureSelect={handleFeatureSelect}
            handleFileChange={handleFileChange}
            handleFileDrop={handleFileDrop}
            removeImage={removeImage}
            handleSelectChange={handleSelectChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <ProgressSidebar currentStep={step} />

          <main className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl font-bold">
                  إضافة شقة جديدة
                </CardTitle>
                <CardDescription>{steps[step - 1].title}</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  {renderStep()}
                  <NavigationButtons
                    step={step}
                    totalSteps={3}
                    isLoading={isLoading}
                    onPrev={prevStep}
                    onNext={nextStep}
                    onSubmit={handleSubmit}
                    error={error}
                  />
                </form>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddApartment;
