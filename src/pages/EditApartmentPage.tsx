// src/pages/EditApartmentPage.tsx

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Trash2, Wifi, Wind, VenetianMask, Warehouse, CookingPot, Flame, MapPin, ArrowLeft, ArrowRight, Loader2, Home, Bed, Bath, Ruler, DollarSign, Users, Hash, ShieldCheck } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// بيانات وهمية (mockup)
const mockApartment = {
  uuid: "1234-5678",
  title: "شقة مفروشة بالكامل قرب الجامعة",
  description: "شقة رائعة مع جميع المرافق وقريبة من جميع الخدمات.",
  address: "شارع الجمهورية، بجوار صيدلية...",
  price: 2500,
  rooms: 3,
  bathrooms: 2,
  kitchens: 1,
  total_beds: 4,
  available_beds: 2,
  area: 120,
  floor_number: 2,
  residence_type: "شقة كاملة",
  whatsapp_number: "01012345678",
  neighborhood_id: "1",
  has_elevator: true,
  has_wifi: true,
  has_ac: false,
  has_balcony: true,
  has_washing_machine: true,
  has_oven: true,
  has_gas: false,
  near_transport: true,
  owner_notes: "يفضل الطلاب",
  preferred_tenant_type: "شباب",
  images: [
    "/public/placeholder.svg",
    "/public/placeholder.svg",
  ],
};

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

const neighborhoods = [
  { id: 1, name: "حي الجامعة" },
  { id: 2, name: "حي الزهور" },
  { id: 3, name: "حي السلام" },
];

export default function EditApartmentPage() {
  const navigate = useNavigate();
  const { apartmentUuid } = useParams();
  const [formData, setFormData] = React.useState({ ...mockApartment });
  const [images, setImages] = React.useState<string[]>(mockApartment.images);
  const [isLoading, setIsLoading] = React.useState(false);

  // تحديث الحقول
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleFeatureSelect = (featureId: string) => {
    setFormData((prev) => ({ ...prev, [featureId]: !prev[featureId] }));
  };
  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("تم حفظ التعديلات (وهمية)");
      navigate(`/apartment/${formData.uuid}`);
    }, 1200);
  };

  return (
    <>
      <Header />
      <div className="container py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* روابط سريعة */}
          <aside className="md:w-1/4 space-y-4">
            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle>روابط سريعة</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <Link to={`/apartment/${formData.uuid}`} className="flex items-center gap-2 text-primary hover:underline">
                  <Home size={18} /> تفاصيل الشقة
                </Link>
                <Link to="/dashboard" className="flex items-center gap-2 text-primary hover:underline">
                  <ShieldCheck size={18} /> لوحة التحكم
                </Link>
              </CardContent>
            </Card>
          </aside>
          {/* نموذج التعديل */}
          <main className="flex-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold">تعديل الشقة</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">عنوان الإعلان</Label>
                      <Input id="title" name="title" value={formData.title} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="price">السعر الشهري (جنيه)</Label>
                      <Input id="price" name="price" type="number" value={formData.price} onChange={handleInputChange} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">وصف الشقة</Label>
                    <Textarea id="description" name="description" value={formData.description} onChange={handleInputChange} rows={4} />
                  </div>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="rooms">عدد الغرف</Label>
                      <Input id="rooms" name="rooms" type="number" value={formData.rooms} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bathrooms">عدد الحمامات</Label>
                      <Input id="bathrooms" name="bathrooms" type="number" value={formData.bathrooms} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="kitchens">عدد المطابخ</Label>
                      <Input id="kitchens" name="kitchens" type="number" value={formData.kitchens} onChange={handleInputChange} />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="area">المساحة (م²)</Label>
                      <Input id="area" name="area" type="number" value={formData.area} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="total_beds">إجمالي السراير</Label>
                      <Input id="total_beds" name="total_beds" type="number" value={formData.total_beds} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="available_beds">السراير المتاحة</Label>
                      <Input id="available_beds" name="available_beds" type="number" value={formData.available_beds} onChange={handleInputChange} />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="floor_number">رقم الدور</Label>
                      <Input id="floor_number" name="floor_number" type="number" value={formData.floor_number} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="residence_type">نوع السكن</Label>
                      <Select name="residence_type" value={formData.residence_type} onValueChange={(value) => handleSelectChange("residence_type", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر نوع السكن" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="شقة كاملة">شقة كاملة</SelectItem>
                          <SelectItem value="غرفة">غرفة</SelectItem>
                          <SelectItem value="إستوديو">إستوديو</SelectItem>
                          <SelectItem value="سكن مشترك">سكن مشترك</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="neighborhood_id">المنطقة</Label>
                      <Select name="neighborhood_id" value={formData.neighborhood_id} onValueChange={(value) => handleSelectChange("neighborhood_id", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر المنطقة" />
                        </SelectTrigger>
                        <SelectContent>
                          {neighborhoods.map((n) => (
                            <SelectItem key={n.id} value={String(n.id)}>{n.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="whatsapp_number">رقم واتساب للتواصل</Label>
                      <Input id="whatsapp_number" name="whatsapp_number" value={formData.whatsapp_number} onChange={handleInputChange} />
                    </div>
                  </div>
                  {/* المميزات */}
                  <div>
                    <Label>المميزات المتوفرة</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                      {features.map((feature) => (
                        <Card
                          key={feature.id}
                          onClick={() => handleFeatureSelect(feature.id)}
                          className={`p-3 flex flex-col items-center gap-1 cursor-pointer transition-all border-2 ${formData[feature.id] ? "border-primary ring-2 ring-primary" : "border-border"}`}
                        >
                          {feature.icon}
                          <span className="text-xs mt-1">{feature.label}</span>
                        </Card>
                      ))}
                    </div>
                  </div>
                  {/* الصور */}
                  <div>
                    <Label>صور الشقة</Label>
                    <div className="mt-2 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                      {images.map((img, idx) => (
                        <div key={idx} className="relative group aspect-square">
                          <img src={img} alt={`apartment-img-${idx}`} className="w-full h-full object-cover rounded-md" />
                          <Button type="button" variant="destructive" size="icon" className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100" onClick={() => removeImage(idx)}>
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* نوع المستأجر المفضل */}
                  <div className="mt-4">
                    <Label htmlFor="preferred_tenant_type">نوع المستأجر المفضل</Label>
                    <Select name="preferred_tenant_type" value={formData.preferred_tenant_type} onValueChange={(value) => handleSelectChange("preferred_tenant_type", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر النوع" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="شباب">شباب</SelectItem>
                        <SelectItem value="بنات">بنات</SelectItem>
                        <SelectItem value="عائلات">عائلات</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {/* ملاحظات المالك */}
                  <div className="mt-4">
                    <Label htmlFor="owner_notes">ملاحظات المالك</Label>
                    <Textarea id="owner_notes" name="owner_notes" value={formData.owner_notes} onChange={handleInputChange} rows={2} />
                  </div>
                  <div className="flex justify-end mt-8">
                    <Button type="submit" disabled={isLoading} className="flex gap-2">
                      {isLoading ? (<><Loader2 className="h-4 w-4 animate-spin" /> جاري الحفظ...</>) : (<> <Upload size={18} /> حفظ التعديلات </>)}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}
