import React, { useEffect, useState } from "react";
import { Plus, Edit, Eye, Trash2, Star, MapPin, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import axiosInstance from "@/utils/axiosInstance";

interface Apartment {
  uuid: string;
  id: number;
  title: string;
  price: number;
  neighborhood?: string;
  status?: string;
  date?: string;
  featured?: boolean;
  views?: number;
  rating?: number;
  image?: string;
  main_image?: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMyApartments = async () => {
    try {
      const response = await axiosInstance.get(
        "/api/v1/apartments/my-apartments"
      );
      setProperties(response.data);
    } catch (err) {
      console.error("❌ Error fetching apartments:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyApartments();
  }, []);

  // 🗑️ دالة الحذف
  const handleDelete = async (uuid: string) => {
    if (!window.confirm("هل أنت متأكد أنك تريد حذف هذه الشقة؟")) return;

    try {
      await axiosInstance.delete(
        `/api/v1/apartments/apartments/${uuid}/delete`
      );

      // حدث الواجهة بعد الحذف
      setProperties((prev) => prev.filter((p) => p.uuid !== uuid));
    } catch (err) {
      console.error("❌ Error deleting apartment:", err);
      alert("حدث خطأ أثناء الحذف. حاول مرة أخرى.");
    }
  };

  if (loading) return <p className="p-4">جاري التحميل...</p>;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
      <div className="container py-2">
        <Breadcrumb
          items={[{ label: "الرئيسية", href: "/" }, { label: "لوحة التحكم" }]}
        />
      </div>

      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">لوحة تحكم المالك</h1>
          <Button
            onClick={() => navigate("/add-apartment")}
            className="mb-4 gap-2"
          >
            <Plus className="h-4 w-4" />
            إضافة شقة جديدة
          </Button>
        </div>

        {properties.length === 0 ? (
          <p>لا يوجد شقق مرتبطة بحسابك.</p>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {properties.map((property) => (
              <Card
                key={property.uuid}
                className="overflow-hidden shadow-md hover:shadow-lg transition-shadow rounded-2xl"
              >
                {/* الصورة */}
                {property.main_image ? (
<img
  src={property.main_image}
  alt={property.title}
  className="w-full h-48 object-cover"
  onError={(e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = "/placeholder.svg";
  }}
/>
                ) : (
                  <img
                    src="/placeholder.svg"
                    alt="لا توجد صورة"
                    className="w-full h-48 object-cover"
                  />
                )}

                <CardContent className="p-4">
                  {/* عنوان الشقة */}
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-semibold line-clamp-1 flex items-center gap-1">
                      {property.featured && (
                        <Star className="text-yellow-400 h-5 w-5" />
                      )}
                      {property.title}
                    </h2>
                    {property.rating && (
                      <div className="flex items-center gap-1 text-sm text-yellow-500">
                        <Star className="h-4 w-4" />
                        {property.rating.toFixed(1)}
                      </div>
                    )}
                  </div>
                  {/* عدد المشاهدات */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <Eye className="h-4 w-4" />
                    <span>عدد المشاهدات: {property.views || 0}</span>
                  </div>

                  {/* الموقع */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4" />
                    <span>{property.neighborhood || "بدون حي"}</span>
                  </div>

                  {/* الحالة */}
                  <Badge
                    variant={
                      property.status === "متاحة" ? "success" : "destructive"
                    }
                    className="mb-2"
                  >
                    {property.status || "غير محدد"}
                  </Badge>

                  {/* السعر */}
                  <p className="font-bold text-primary text-lg">
                    السعر: {property.price} جنيه
                  </p>

                  {/* التاريخ */}
                  {property.date && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <Calendar className="h-4 w-4" />
                      <span>{property.date}</span>
                    </div>
                  )}
                </CardContent>

                {/* أزرار التحكم */}
                <div className="flex justify-between gap-2 p-4 pt-0 border-t border-muted/20">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate(`/edit-apartment/${property.uuid}`)}
                    className="gap-1 flex-1"
                  >
                    <Edit className="h-4 w-4" />
                    تعديل
                  </Button>

                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => navigate(`/apartments/${property.uuid}`)}
                    className="gap-1 flex-1"
                  >
                    <Eye className="h-4 w-4" />
                    رؤية
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(property.uuid)} // 🗑️ استدعاء الحذف
                    className="gap-1 flex-1"
                  >
                    <Trash2 className="h-4 w-4" />
                    حذف
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
