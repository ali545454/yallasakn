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
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import axiosInstance from "@/utils/axiosInstance";
import MapPicker from "../components/Map/MapPicker";

// Icons
import {
  Wifi,
  Wind,
  Upload,
  Trash2,
  Warehouse,
  ArrowRight,
  ArrowLeft,
  VenetianMask,
  Flame,
  MapPin,
  Loader2,
  CookingPot,
} from "lucide-react";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export const API_URL = `https://web-production-33f69.up.railway.app`;

// --- Apartment features list (used in step 3) ---
const features = [
  { id: "has_wifi", label: "واي فاي", icon: <Wifi size={24} /> },
  { id: "has_ac", label: "تكييف", icon: <Wind size={24} /> },
  { id: "has_balcony", label: "بلكونة", icon: <VenetianMask size={24} /> },
  { id: "has_elevator", label: "مصعد", icon: <Warehouse size={24} /> },
  { id: "has_washing_machine", label: "غسالة", icon: <CookingPot size={24} /> },
  { id: "has_oven", label: "بوتجاز/فرن", icon: <CookingPot size={24} /> },
  { id: "has_gas", label: "غاز طبيعي", icon: <Flame size={24} /> },
  {
    id: "near_transport",
    label: "قريب من المواصلات",
    icon: <MapPin size={24} />,
  },
];

const AddApartment = () => {
  const navigate = useNavigate();

  // --- Multi-step form state ---
  const [step, setStep] = useState(1);

  // --- Form loading and error states ---
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // --- Map coordinates state ---
  const [lat, setLat] = useState(27.18);
  const [lng, setLng] = useState(31.1833);

  // --- Form data state ---
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

  // --- Uploaded images state ---
  const [images, setImages] = useState<File[]>([]);

  // --- Neighborhoods dropdown data ---
  const [neighborhoods, setNeighborhoods] = useState<
    { id: number; name: string }[]
  >([]);

  // --- Fetch neighborhoods from API on mount ---
  useEffect(() => {
    const fetchNeighborhoods = async () => {
      try {
        const res = await fetch(`${API_URL}/api/v1/neighborhoods`);
        const data = await res.json();
        setNeighborhoods(data);
      } catch (err) {
        console.error("Error fetching neighborhoods:", err);
      }
    };
    fetchNeighborhoods();
  }, []);

  // --- Handle form input change ---
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // --- Handle select dropdown changes ---
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // --- Toggle boolean features ---
  const handleFeatureSelect = (featureId: keyof typeof formData) => {
    setFormData((prev) => ({
      ...prev,
      [featureId]: !prev[featureId],
    }));
  };

  // --- Handle file upload changes ---
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages((prev) => [...prev, ...Array.from(e.target.files)]);
    }
  };

  // --- Handle drag & drop for images ---
  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      setImages((prev) => [...prev, ...Array.from(e.dataTransfer.files)]);
    }
  };

  // Hundle Search in Map
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = async () => {
    if (!searchQuery) return;

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          searchQuery
        )}&format=json`
      );
      const data = await res.json();
      if (data.length > 0) {
        // تحديث خط العرض والطول بالخريطة
        setLat(Number(data[0].lat));
        setLng(Number(data[0].lon));
      } else {
        alert("لم يتم العثور على المكان");
      }
    } catch (err) {
      console.error("Geocoding error:", err);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  // --- Validate form step before proceeding ---
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

    // --- Step 1 validation ---
    if (step === 1) {
      if (!formData.title) newErrors.title = "Title is required";
      if (!formData.description)
        newErrors.description = "Description is required";
      if (!formData.neighborhood_id)
        newErrors.neighborhood_id = "Please select a neighborhood";
      if (!formData.address) newErrors.address = "Address is required";

      if (formData.title && formData.title.length > 150)
        newErrors.title = "Title is too long (max 150 characters)";
      if (formData.description && formData.description.length > 2000)
        newErrors.description = "Description is too long (max 2000 characters)";
    }

    // --- Step 2 validation ---
    if (step === 2) {
      if (!formData.price) newErrors.price = "Price is required";
      else if (!isNonNegativeInteger(formData.price))
        newErrors.price = "Price must be a non-negative integer";
      else if (priceNum > 50000)
        newErrors.price = "Price cannot exceed 50,000 EGP";

      if (!formData.rooms) newErrors.rooms = "Number of rooms is required";
      else if (!isNonNegativeInteger(formData.rooms))
        newErrors.rooms = "Rooms must be non-negative integer";
      else if (roomsNum > 8) newErrors.rooms = "Rooms cannot exceed 8";

      if (!formData.total_beds) newErrors.total_beds = "Total beds required";
      else if (!isNonNegativeInteger(formData.total_beds))
        newErrors.total_beds = "Total beds must be non-negative integer";
      else if (totalBedsNum > 20)
        newErrors.total_beds = "Total beds cannot exceed 20";

      if (!formData.available_beds)
        newErrors.available_beds = "Available beds required";
      else if (!isNonNegativeInteger(formData.available_beds))
        newErrors.available_beds =
          "Available beds must be non-negative integer";
      else if (availableBedsNum > totalBedsNum)
        newErrors.available_beds = "Available beds cannot exceed total beds";
    }

    // --- Step 3 validation ---
    if (step === 3) {
      if (images.length === 0)
        newErrors.images = "Please upload at least one image";
      if (images.length > 20) newErrors.images = "Maximum 20 images allowed";
    }

    // --- WhatsApp number validation ---
    if (formData.whatsapp_number) {
      const phone = formData.whatsapp_number.trim();
      const egyptPhoneRegex = /^(?:\+20|20|0)?1[0125]\d{8}$/;
      if (!egyptPhoneRegex.test(phone)) {
        newErrors.whatsapp_number = "Invalid WhatsApp number format";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- Step navigation ---
  const nextStep = () => {
    if (validateStep()) setStep((prev) => Math.min(prev + 1, 3));
  };
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  // --- Submit form handler ---
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
    data.append("latitude", String(lat));
    data.append("longitude", String(lng));
    images.forEach((image) => data.append("images", image));

    try {
      await axiosInstance.post("/api/v1/apartments/create", data);
      navigate("/dashboard?status=success");
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to create apartment");
    } finally {
      setIsLoading(false);
    }
  };

  // --- Steps info ---
  const steps = [
    {
      number: 1,
      title: "Basic Info",
      tip: "Add an attractive title and detailed description.",
    },
    {
      number: 2,
      title: "Apartment Details",
      tip: "Fill accurate details like rooms, area, and price.",
    },
    {
      number: 3,
      title: "Features & Images",
      tip: "High-quality photos increase chances of renting faster.",
    },
  ];

  // --- JSX Render ---
  return (
    <>
      <Header />
      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* --- Left sidebar: Steps & Tips --- */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {steps.map((s) => (
                <div key={s.number} className="flex items-start">
                  <div className="flex flex-col items-center mr-4"></div>
                  <div className="pt-1 ml-3">
                    <h3
                      className={`font-semibold ${
                        step === s.number ? "text-primary" : ""
                      }`}
                    >
                      {s.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Step {s.number} of {steps.length}
                    </p>
                  </div>
                </div>
              ))}
              <Card className="bg-muted/50 hidden lg:block">
                <CardHeader>
                  <CardTitle>Tip</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {steps[step - 1].tip}
                  </p>
                </CardContent>
              </Card>
            </div>
          </aside>

          {/* --- Right side: Form --- */}
          <main className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl font-bold">
                  Add New Apartment
                </CardTitle>
                <CardDescription>{steps[step - 1].title}</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  {/* ================= Step 1: Basic Info ================= */}
                  {step === 1 && (
                    <div className="space-y-6 animate-in fade-in-50">
                      {/* Title */}
                      <div className="space-y-2">
                        <Label htmlFor="title">Title *</Label>
                        <Input
                          id="title"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          placeholder="Example: Fully furnished apartment near university"
                        />
                        <p className="text-red-500 text-sm">{errors.title}</p>
                      </div>

                      {/* Description */}
                      <div className="space-y-2">
                        <Label htmlFor="description">Description *</Label>
                        <Textarea
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          placeholder="Write detailed description of the apartment..."
                          rows={5}
                        />
                        <p className="text-red-500 text-sm">
                          {errors.description}
                        </p>
                      </div>

                      {/* Neighborhood & Address */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="neighborhood_id">
                            Neighborhood *
                          </Label>
                          <Select
                            name="neighborhood_id"
                            onValueChange={(value) =>
                              handleSelectChange("neighborhood_id", value)
                            }
                            value={formData.neighborhood_id}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select neighborhood" />
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
                          <Label htmlFor="address">Detailed Address *</Label>
                          <Input
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder="Example: El-Gomhoria St, near pharmacy..."
                          />
                          <p className="text-red-500 text-sm">
                            {errors.address}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="search">ابحث عن الموقع</Label>
                          <Input
                            id="search"
                            placeholder="اكتب اسم المدينة أو العنوان"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") handleSearch(); // اضغط Enter لتحديث الخريطة
                            }}
                          />
                        </div>

                        {/* Map picker */}
                        <div className="space-y-2 mt-4">
                          <Label>Pick location on map *</Label>
                          <MapPicker
                            lat={lat}
                            lng={lng}
                            onChange={(newLat, newLng) => {
                              setLat(newLat);
                              setLng(newLng);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ================= Step 2: Apartment Details ================= */}
                  {step === 2 && (
                    <div className="space-y-8 animate-in fade-in-50">
                      {/* Room, Area, Beds */}
                      {/* ... (kept for brevity, same as your code) */}
                    </div>
                  )}

                  {/* ================= Step 3: Features & Images ================= */}
                  {step === 3 && (
                    <div className="space-y-8 animate-in fade-in-50">
                      {/* Features & Upload Images */}
                      {/* ... (kept for brevity, same as your code) */}
                    </div>
                  )}

                  {/* --- Step Navigation Buttons --- */}
                  <div className="mt-10 pt-6 border-t flex justify-between items-center">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={prevStep}
                      disabled={step === 1}
                      className="flex flex-row-reverse gap-2"
                    >
                      Previous <ArrowRight size={18} />
                    </Button>

                    {step < 3 && (
                      <Button
                        type="button"
                        onClick={nextStep}
                        className="flex gap-2"
                      >
                        <ArrowLeft size={18} /> Next
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
                            <Loader2 className="h-4 w-4 animate-spin" />{" "}
                            Saving...
                          </>
                        ) : (
                          <>
                            <Upload size={18} /> Save & Publish
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
