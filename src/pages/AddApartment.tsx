import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import axiosInstance from "@/utils/axiosInstance";

import {
  Wifi,
  Wind,
  Upload,
  Trash2,
  ShieldCheck,
  Warehouse,
  ArrowRight,
  ArrowLeft,
  Check,
  VenetianMask,
  DollarSign,
  Home,
  Bed,
  Bath,
  Ruler,
  Phone,
  Users,
  Hash,
  MapPin,
  Loader2,
  CookingPot,
  Flame,
} from "lucide-react";


export const API_URL = `https://web-production-33f69.up.railway.app/
`;
const features = [
  { id: "has_wifi", label: "واي فاي", icon: <Wifi size={24} /> },
  { id: "has_ac", label: "تكييف", icon: <Wind size={24} /> },
  { id: "has_balcony", label: "بلكونة", icon: <VenetianMask size={24} /> },
  { id: "has_elevator", label: "مصعد", icon: <Warehouse size={24} /> },
  { id: "has_washing_machine", label: "غسالة", icon: <CookingPot size={24} /> },
  { id: "has_oven", label: "بوتجاز/فرن", icon: <CookingPot size={24} /> },
  { id: "has_gas", label: "غاز طبيعي", icon: <Flame size={24} /> },
  { id: "near_transport", label: "قريب من المواصلات", icon: <MapPin size={24} /> },
];

const AddApartment = () => {
  const checklistOptions = [
    "قريب من الجامعة",
    "مسموح التدخين",
    "غرف واسعة",
    "هدوء في المكان",
    "قريب من الخدمات",
  ];

  const [notes, setNotes] = useState<string[]>([]);

  const handleNoteChange = (note: string) => {
    if (notes.includes(note)) {
      setNotes(notes.filter((n) => n !== note));
    } else {
      setNotes([...notes, note]);
    }
  };

  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
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
  const [neighborhoods, setNeighborhoods] = useState<{ id: number; name: string }[]>([]);

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

  const escapeInput = (str: string) => {
    if (!str && str !== "") return "";
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  };

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

  const handleFeatureSelect = (featureId: keyof typeof formData) => {
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
      if (!formData.neighborhood_id) newErrors.neighborhood_id = "يجب اختيار المنطقة";
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
      else if (priceNum > 50000) newErrors.price = "السعر لا يمكن أن يتجاوز 50,000 ج.م";

      if (!formData.rooms) newErrors.rooms = "عدد الغرف مطلوب";
      else if (!isNonNegativeInteger(formData.rooms))
        newErrors.rooms = "عدد الغرف يجب أن يكون رقمًا صحيحًا وغير سالب";
      else if (roomsNum > 8) newErrors.rooms = "عدد الغرف لا يمكن أن يتجاوز 8";

            if (!formData.kitchens) newErrors.kitchens = "عدد المطابخ مطلوب مطلوب";
      else if (!isNonNegativeInteger(formData.kitchens))
        newErrors.kitchens = "عدد المطابخ يجب أن يكون رقمًا صحيحًا وغير سالب";
      else if (roomsNum > 8) newErrors.kitchens = "عدد المطابخ لا يمكن أن يتجاوز 8";

      if (!formData.area) newErrors.area = "المساحة مطلوبة";
      else if (Number(formData.area) <= 0) newErrors.area = "المساحة يجب أن تكون أكبر من 0";

      if (!formData.total_beds) newErrors.total_beds = "إجمالي السراير مطلوب";
      else if (!isNonNegativeInteger(formData.total_beds))
        newErrors.total_beds = "إجمالي السراير يجب أن يكون رقمًا صحيحًا وغير سالب";
      else if (totalBedsNum > 20) newErrors.total_beds = "إجمالي السراير لا يمكن أن يتجاوز 20";

      if (!formData.available_beds) newErrors.available_beds = "السراير المتاحة مطلوبة";
      else if (!isNonNegativeInteger(formData.available_beds))
        newErrors.available_beds = "السراير المتاحة يجب أن تكون رقمًا صحيحًا وغير سالب";
      else if (availableBedsNum > totalBedsNum)
        newErrors.available_beds = "السراير المتاحة لا يمكن أن تكون أكبر من إجمالي السراير";

      if (formData.floor_number && Number(formData.floor_number) < 0)
        newErrors.floor_number = "رقم الدور لا يمكن أن يكون سالبًا";
    }

    if (step === 3) {
      if (images.length === 0) newErrors.images = "يجب إضافة صورة واحدة على الأقل";
      if (images.length > 20) newErrors.images = "الحد الأقصى للصور هو 20 صورة";
    }

    if (formData.whatsapp_number) {
      const phone = formData.whatsapp_number.trim();
      const egyptPhoneRegex = /^(?:\+20|20|0)?1[0125]\d{8}$/;
      if (!egyptPhoneRegex.test(phone)) {
        newErrors.whatsapp_number = "تنسيق رقم الواتساب غير صحيح (مثال: 01012345678 أو +201012345678)";
      }
    }

    const numericFields = ["price", "rooms", "bathrooms", "kitchens", "total_beds", "available_beds", "area", "floor_number"];
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
    if (typeof value === "boolean") data.append(key, value ? "true" : "false");
    else data.append(key, String(value));
  });
  images.forEach((image) => data.append("images", image));
try {
  const response = await axiosInstance.post("/api/v1/apartments/create", data);
  navigate("/dashboard?status=success");
} catch (err: any) {
  setError(err.response?.data?.error || "فشل إنشاء الشقة");
} finally {
  setIsLoading(false);
}

}
  const steps = [
    {
      number: 1,
      title: "المعلومات الأساسية",
      tip: "استخدم عنوانًا جذابًا ووصفًا دقيقًا لجذب المستأجرين.",
    },
    {
      number: 2,
      title: "تفاصيل العقار",
      tip: "التفاصيل الدقيقة مثل عدد الغرف والمساحة تساعد الطلاب في اتخاذ قرارهم بشكل أسرع.",
    },
    {
      number: 3,
      title: "المميزات والصور",
      tip: "الصور عالية الجودة تزيد من فرص تأجير شقتك بنسبة كبيرة. أضف 5 صور على الأقل.",
    },
  ];

  return (
    <>
      <Header />
      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* --- العمود الأيسر: شريط التقدم والنصائح --- */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              <div>
                {steps.map((s, index) => (
                  <div className="flex items-start">
                    <div className="flex flex-col items-center mr-4">
                      {/* الدائرة بتاعة الخطوة */}
                    </div>
                    <div className="pt-1 ml-3">
                      {" "}
                      {/* ← هنا أضفت مسافة */}
                      <h3
                        className={`font-semibold ${
                          step === s.number ? "text-primary" : ""
                        }`}
                      >
                        {s.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        الخطوة {s.number} من {steps.length}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Card className="bg-muted/50 hidden lg:block">
                <CardHeader>
                  <CardTitle>نصيحة</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {steps[step - 1].tip}
                  </p>
                </CardContent>
              </Card>
            </div>
          </aside>

          {/* --- العمود الأيمن: النموذج --- */}
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
                  {step === 1 && (
                    <div className="space-y-6 animate-in fade-in-50">
                      <div className="space-y-2">
                        <Label htmlFor="title">عنوان الإعلان *</Label>
                        <Input
                          id="title"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          placeholder="مثال: شقة مفروشة بالكامل قرب الجامعة"
                        />
                        <p className="text-red-500 text-sm">{errors.title}</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">وصف الشقة *</Label>
                        <Textarea
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          placeholder="اكتب وصفاً تفصيلياً عن الشقة ومميزاتها..."
                          rows={5}
                        />
                        <p className="text-red-500 text-sm">
                          {errors.description}
                        </p>
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="neighborhood_id">المنطقة *</Label>
                          <Select
                            name="neighborhood_id"
                            onValueChange={(value) =>
                              handleSelectChange("neighborhood_id", value)
                            }
                            value={formData.neighborhood_id}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="اختر منطقة" />
                            </SelectTrigger>
                            <SelectContent>
                              {neighborhoods.map((n) => (
                                <SelectItem key={n.id} value={String(n.id)}>
                                  {n.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <p className="text-red-500 text-sm">
                            {errors.neighborhood_id}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address">العنوان التفصيلي *</Label>
                          <Input
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder="مثال: شارع الجمهورية، بجوار صيدلية..."
                          />
                          <p className="text-red-500 text-sm">
                            {errors.address}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  {step === 2 && (
                    <div className="space-y-8 animate-in fade-in-50">
                      <div>
                        <h3 className="font-semibold text-lg mb-4">
                          الأبعاد والسعة
                        </h3>
                        <div className="grid md:grid-cols-3 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="rooms">عدد الغرف *</Label>
                            <Input
                              id="rooms"
                              name="rooms"
                              type="number"
                              value={formData.rooms}
                              onChange={handleInputChange}
                            />
                            <p className="text-red-500 text-sm">
                              {errors.rooms}
                            </p>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="bathrooms">عدد الحمامات</Label>
                            <Input
                              id="bathrooms"
                              name="bathrooms"
                              type="number"
                              value={formData.bathrooms}
                              onChange={handleInputChange}
                            />
                          </div>
                            <div className="space-y-2">
                            <Label htmlFor="kitchens">عدد المطابخ</Label>
                            <Input
                              id="kitchens"
                              name="kitchens"
                              type="number"
                              value={formData.kitchens}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="area">المساحة (م²) *</Label>
                            <Input
                              id="area"
                              name="area"
                              type="number"
                              value={formData.area}
                              onChange={handleInputChange}
                            />
                            <p className="text-red-500 text-sm">
                              {errors.area}
                            </p>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="total_beds">إجمالي السراير *</Label>
                            <Input
                              id="total_beds"
                              name="total_beds"
                              type="number"
                              value={formData.total_beds}
                              onChange={handleInputChange}
                            />
                            <p className="text-red-500 text-sm">
                              {errors.total_beds}
                            </p>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="available_beds">
                              السراير المتاحة *
                            </Label>
                            <Input
                              id="available_beds"
                              name="available_beds"
                              type="number"
                              value={formData.available_beds}
                              onChange={handleInputChange}
                            />
                            <p className="text-red-500 text-sm">
                              {errors.available_beds}
                            </p>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="floor_number">رقم الدور</Label>
                            <Input
                              id="floor_number"
                              name="floor_number"
                              type="number"
                              value={formData.floor_number}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-lg mb-4">
                          التسعير والتواصل
                        </h3>
                        <div className="grid md:grid-cols-3 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="price">السعر الشهري (جنيه) *</Label>
                            <Input
                              id="price"
                              name="price"
                              type="number"
                              value={formData.price}
                              onChange={handleInputChange}
                            />
                            <p className="text-red-500 text-sm">
                              {errors.price}
                            </p>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="residence_type">نوع السكن</Label>
                            <Select
                              name="residence_type"
                              onValueChange={(value) =>
                                handleSelectChange("residence_type", value)
                              }
                              value={formData.residence_type}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="شقة كاملة">شقة كاملة</SelectItem>
                                <SelectItem value="غرفة">غرفة</SelectItem>
                                <SelectItem value="إستوديو">إستوديو</SelectItem>
                                <SelectItem value="سكن مشترك">سكن مشترك</SelectItem>

                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="whatsapp_number">
                              رقم واتساب للتواصل
                            </Label>
                            <Input
                              id="whatsapp_number"
                              name="whatsapp_number"
                              type="tel"
                              value={formData.whatsapp_number}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {step === 3 && (
                    <div className="space-y-8 animate-in fade-in-50">
                      <div>
                        <h3 className="font-semibold text-lg mb-4">
                          اختر المميزات المتوفرة
                        </h3>

                          {/* --- المميزات الأساسية --- */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
  {features.map((feature) => (
    <Card
      key={feature.id}
      onClick={() => handleFeatureSelect(feature.id)}
      className={`p-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${
        formData[feature.id as keyof typeof formData]
          ? "border-primary ring-2 ring-primary"
          : "border-border"
      }`}
    >
      {feature.icon}
      <Label htmlFor={feature.id}>{feature.label}</Label>
    </Card>
  ))}
</div>


             

                        <h3 className="font-semibold text-lg mb-4">
                          صور الشقة *
                        </h3>
                        <div
                          onDrop={handleFileDrop}
                          onDragOver={(e) => e.preventDefault()}
                          onClick={() =>
                            document.getElementById("images")?.click()
                          } // لما تضغط يفتح اختيار الصور
                          className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary"
                        >
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <p className="mt-4 text-sm text-muted-foreground">
                            اسحب وأفلت الصور هنا، أو انقر للاختيار
                          </p>
                          <Input
                            id="images"
                            type="file"
                            multiple
                            onChange={handleFileChange}
                            className="hidden"
                          />
                        </div>

                        <p className="text-red-500 text-sm mt-2">
                          {errors.images}
                        </p>
                        {images.length > 0 && (
                          <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                            {images.map((file, index) => (
                              <div
                                key={index}
                                className="relative group aspect-square"
                              >
                                <img
                                  src={URL.createObjectURL(file)}
                                  alt={`preview ${index}`}
                                  className="w-full h-full object-cover rounded-md"
                                />
                                <Button
                                  variant="destructive"
                                  size="icon"
                                  className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100"
                                  onClick={() => removeImage(index)}
                                >
                                  <Trash2 size={14} />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      {/* --- مميزات إضافية --- */}

                      {/* --- ملاحظات المالك --- */}

                      {/* --- نوع المستأجر المفضل --- */}
                      <div className="mt-6">
                        <Label htmlFor="preferred_tenant_type">
                          نوع المستأجر المفضل
                        </Label>
                        <Select
                          name="preferred_tenant_type"
                          onValueChange={(value) =>
                            handleSelectChange("preferred_tenant_type", value)
                          }
                          value={formData.preferred_tenant_type}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="شباب">شباب</SelectItem>
                            <SelectItem value="بنات">بنات</SelectItem>
                            <SelectItem value="عائلات">عائلات</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                  {/* --- زر السابق والتالي --- */}
                  <div className="mt-10 pt-6 border-t flex justify-between items-center">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={prevStep}
                      disabled={step === 1}
                      className="flex flex-row-reverse gap-2" // يخلي الأيقونة يمين مع مسافة
                    >
                      السابق <ArrowRight size={18} />
                    </Button>

                    {step < 3 && (
                      <Button
                        type="button"
                        onClick={nextStep}
                        className="flex gap-2" // يخلي الأيقونة شمال مع مسافة
                      >
                        <ArrowLeft size={18} /> التالي
                      </Button>
                    )}

                    {step === 3 && (
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="flex gap-2"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" /> جاري
                            الحفظ...
                          </>
                        ) : (
                          <>
                            <Upload size={18} /> حفظ ونشر الشقة
                          </>
                        )}
                      </Button>
                    )}
                  </div>

                  {error && (
                    <p className="text-red-500 mt-4 text-center">{error}</p>
                  )}
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
