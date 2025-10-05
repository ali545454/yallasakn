import React, { useEffect, useState } from "react";
import {
  Plus,
  Edit,
  Eye,
  Trash2,
  Star,
  MapPin,
  Calendar,
  Building2,
  BarChart3,
  CalendarDays,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import axiosInstance from "@/utils/axiosInstance";
import { motion } from "framer-motion";
import Loading from "@/components/Loading";
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

interface Stats {
  total_apartments: number;
  total_views: number;
  apartments_per_month: Record<string, number>;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Apartment[]>([]);
  const [stats, setStats] = useState<Stats>({
    total_apartments: 0,
    total_views: 0,
    apartments_per_month: {},
  });
  const [loading, setLoading] = useState(true);

  const fetchMyApartments = async () => {
    try {
      const response = await axiosInstance.get("/api/v1/apartments/my-apartments");
      setProperties(response.data.apartments || []);
      setStats(response.data.stats || {});
    } catch (err) {
      console.error("❌ Error fetching apartments:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyApartments();
  }, []);

  const handleDelete = async (uuid: string) => {
    if (!window.confirm("هل أنت متأكد أنك تريد حذف هذه الشقة؟")) return;

    try {
      await axiosInstance.delete(`/api/v1/apartments/apartments/${uuid}/delete`);
      setProperties((prev) => prev.filter((p) => p.uuid !== uuid));
    } catch (err) {
      console.error("❌ Error deleting apartment:", err);
      alert("حدث خطأ أثناء الحذف. حاول مرة أخرى.");
    }
  };

  if (loading) return <Loading / >;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
      <div className="container py-2">
        <Breadcrumb items={[{ label: "الرئيسية", href: "/" }, { label: "لوحة التحكم" }]} />
      </div>

      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">لوحة تحكم المالك</h1>
          <Button onClick={() => navigate("/add-apartment")} className="mb-4 gap-2">
            <Plus className="h-4 w-4" />
            إضافة شقة جديدة
          </Button>
        </div>

        {/* 📊 قسم الإحصائيات */}
        <motion.div
          className="grid md:grid-cols-3 gap-4 mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* إجمالي الشقق */}
          <Card className="p-6 text-center shadow-md border-t-4 border-primary rounded-2xl">
            <CardContent>
              <div className="flex justify-center mb-2 text-primary">
                <Building2 className="h-6 w-6" />
              </div>
              <h3 className="text-sm text-muted-foreground mb-1">إجمالي الشقق</h3>
              <p className="text-3xl font-bold">{stats.total_apartments}</p>
            </CardContent>
          </Card>

          {/* إجمالي المشاهدات */}
          <Card className="p-6 text-center shadow-md border-t-4 border-green-500 rounded-2xl">
            <CardContent>
              <div className="flex justify-center mb-2 text-green-500">
                <BarChart3 className="h-6 w-6" />
              </div>
              <h3 className="text-sm text-muted-foreground mb-1">إجمالي المشاهدات</h3>
              <p className="text-3xl font-bold">{stats.total_views}</p>
            </CardContent>
          </Card>

          {/* الشقق لكل شهر */}
          <Card className="p-6 text-center shadow-md border-t-4 border-blue-500 rounded-2xl">
            <CardContent>
              <div className="flex justify-center mb-2 text-blue-500">
                <CalendarDays className="h-6 w-6" />
              </div>
              <h3 className="text-sm text-muted-foreground mb-2">الشقق لكل شهر</h3>
              <div className="text-sm max-h-24 overflow-y-auto no-scrollbar">
                {Object.entries(stats.apartments_per_month || {}).length === 0 ? (
                  <p>لا يوجد بيانات</p>
                ) : (
                  Object.entries(stats.apartments_per_month).map(([month, count]) => (
                    <p key={month} className="flex justify-between">
                      <span>{month}</span>
                      <span className="font-semibold">{count}</span>
                    </p>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 🏠 قائمة الشقق */}
        {properties.length === 0 ? (
          <p>لا يوجد شقق مرتبطة بحسابك.</p>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {properties.map((property) => (
              <motion.div
                key={property.uuid}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow rounded-2xl">
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
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="text-lg font-semibold line-clamp-1 flex items-center gap-1">
                        {property.featured && <Star className="text-yellow-400 h-5 w-5" />}
                        {property.title}
                      </h2>
                      {property.rating && (
                        <div className="flex items-center gap-1 text-sm text-yellow-500">
                          <Star className="h-4 w-4" />
                          {property.rating.toFixed(1)}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <Eye className="h-4 w-4" />
                      <span>عدد المشاهدات: {property.views || 0}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <MapPin className="h-4 w-4" />
                      <span>{property.neighborhood || "بدون حي"}</span>
                    </div>

                    <Badge
                      variant={property.status === "متاحة" ? "success" : "destructive"}
                      className="mb-2"
                    >
                      {property.status || "غير محدد"}
                    </Badge>

                    <p className="font-bold text-primary text-lg">
                      السعر: {property.price} جنيه
                    </p>

                    {property.date && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <Calendar className="h-4 w-4" />
                        <span>{property.date}</span>
                      </div>
                    )}
                  </CardContent>

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
                      onClick={() => handleDelete(property.uuid)}
                      className="gap-1 flex-1"
                    >
                      <Trash2 className="h-4 w-4" />
                      حذف
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
