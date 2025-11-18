import { useState } from "react";

export const useFormState = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({
    title: "",
    description: "",
    address: "",
    neighborhood_id: "",
    rooms: "",
    bathrooms: "",
    kitchens: "",
    area: "",
    total_beds: "",
    available_beds: "",
    price: "",
    residence_type: "",
    whatsapp_number: "",
    has_wifi: false,
    has_ac: false,
    has_balcony: false,
    has_elevator: false,
    has_washing_machine: false,
    has_oven: false,
    has_gas: false,
    near_transport: false,
    preferred_tenant_type: "",
  });
  const [images, setImages] = useState<File[]>([]);
  const [errors, setErrors] = useState<any>({});
  const [lat, setLat] = useState(27.18);
  const [lng, setLng] = useState(31.1833);
  const neighborhoods = [
    { id: 1, name: "حي أول" },
    { id: 2, name: "حي ثاني" },
  ];

  const handleInputChange = (e: any) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSelectChange = (name: string, value: string) =>
    setFormData({ ...formData, [name]: value });
  const handleFeatureSelect = (name: string) =>
    setFormData({ ...formData, [name]: !formData[name] });
  const handleFileChange = (e: any) => {
    if (e.target.files) setImages([...images, ...Array.from(e.target.files)]);
  };
  const removeImage = (i: number) =>
    setImages(images.filter((_, index) => index !== i));
  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("submit", formData, images);
  };

  return {
    step,
    formData,
    images,
    errors,
    neighborhoods,
    lat,
    lng,
    setLat,
    setLng,
    handleInputChange,
    handleSelectChange,
    handleFeatureSelect,
    handleFileChange,
    removeImage,
    nextStep,
    prevStep,
    handleSubmit,
  };
};
