import { useState, useEffect } from "react";
import { FormDataType, API_URL } from "./constants";

export const useFormState = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<FormDataType>({
    title: "",
    description: "",
    address: "",
    price: "",
    rooms: "",
    bathrooms: "",
    kitchens: "",
    total_beds: "",
    available_beds: "",
    residence_type: "",
    whatsapp_number: "",
    neighborhood_id: "",
    area: "",
    floor_number: "",
    has_elevator: false,
    has_wifi: false,
    has_ac: false,
    has_balcony: false,
    has_washing_machine: false,
    has_oven: false,
    has_gas: false,
    near_transport: false,
    owner_notes: "",
    preferred_tenant_type: "",
  });

  const [images, setImages] = useState<File[]>([]);
  const [neighborhoods, setNeighborhoods] = useState<
    { id: number; name: string }[]
  >([]);

  useEffect(() => {
    const fetchNeighborhoods = async () => {
      try {
        const res = await fetch(`${API_URL}/api/v1/neighborhoods`);
        const data = await res.json();
        setNeighborhoods(data);
      } catch (err) {
        console.error("خطأ في جلب الأحياء:", err);
      }
    };
    fetchNeighborhoods();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleFeatureSelect = (featureId: keyof FormDataType) => {
    setFormData((prev) => ({
      ...prev,
      [featureId]: !prev[featureId],
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages((prev) => [...prev, ...Array.from(e.target.files)]);
    }
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      setImages((prev) => [...prev, ...Array.from(e.dataTransfer.files)]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return {
    step,
    setStep,
    isLoading,
    setIsLoading,
    error,
    setError,
    errors,
    setErrors,
    formData,
    setFormData,
    images,
    setImages,
    neighborhoods,
    handleInputChange,
    handleSelectChange,
    handleCheckboxChange,
    handleFeatureSelect,
    handleFileChange,
    handleFileDrop,
    removeImage,
  };
};