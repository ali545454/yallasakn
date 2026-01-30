import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import {
  Edit3,
  Save,
  X,
  Heart,
  Home,
  MapPin,
  CreditCard,
  Settings,
  Eye,
  Mail,
  User,
  Phone,
  University,
  BookOpen,
  Calendar,
  Trash2,
  HeartOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useUser } from "@/context/UserContext";
import { useFavorites } from "@/context/FavoritesContext";
import Loading from "@/components/Loading";
import { Input } from "@/components/ui/input"; // For editing
import { Label } from "@/components/ui/label"; // For labels
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"; // For better UX
import { User as UserType } from "@/types";
export const API_URL = import.meta.env.VITE_API_URL || `https://web-production-33f69.up.railway.app/`;

// A small component for displaying info fields, making the main component cleaner
const InfoField = ({ icon, label, value }) => (
  <div className="flex items-center gap-4 text-right">
    <div className="flex-grow bg-slate-100 p-3 rounded-md text-slate-800">
      {value || <span className="text-slate-400">غير محدد</span>}
    </div>
    <div className="flex items-center gap-2 justify-end min-w-[120px]">
      <span className="font-medium text-slate-600">{label}</span>
      {icon}
    </div>
  </div>
);

const Profile = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const roleMap = {
    student: "طالب",
    owner: "صاحب سكن",
    admin: "مشرف",
  };

  const [userData, setUserData] = useState<UserType | null>(user || null);
  const [isLoading, setIsLoading] = useState(!user);
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState<Partial<UserType>>({});
  const [favoriteApartments, setFavoriteApartments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const apartmentsPerPage = 4; // Increased for better layout

  const { favorites: favoriteUuids, toggleFavorite } = useFavorites();

  const hash = location.hash.replace("#", "");
  const [selectedTab, setSelectedTab] = useState(hash || "info");

  useEffect(() => {
    if (
      hash &&
      (hash === "info" ||
        hash === "favorites" ||
        (hash === "my-apartments" && userData?.role !== "student"))
    ) {
      setSelectedTab(hash);
    } else {
      setSelectedTab("info");
    }
  }, [hash, userData]);

  // Fetch profile data
  useEffect(() => {
    if (user) {
      setUserData(user);
      setIsLoading(false);
      return;
    }

    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/v1/auth/profile`, {
          withCredentials: true,
        });
        setUserData(response.data);
        setUser(response.data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfileData();
  }, [navigate, user, setUser]);

  // Fetch favorites data
  const fetchFavorites = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/api/v1/favorites`, {
        withCredentials: true,
      });
      setFavoriteApartments(res.data.apartments || []);
    } catch (err) {
      console.error("Error fetching favorites:", err);
    }
  }, []);

  useEffect(() => {
    if (userData && favoriteUuids.length > 0) {
      // Fetch favorites only after user data is available and there are favorites
      fetchFavorites();
    } else if (userData) {
      setFavoriteApartments([]);
    }
  }, [userData, favoriteUuids, fetchFavorites]);

  const handleEdit = () => {
    setTempData({
      full_name: userData?.full_name || "",
      phone: userData?.phone || "",
      university: userData?.university || "",
      college: userData?.college || "",
      academic_year: userData?.academic_year || "",
    });
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await axios.patch(
        `${API_URL}/api/v1/auth/profile/update`,
        tempData,
        { withCredentials: true }
      );
      setUserData(response.data);
      setUser(response.data);
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to save profile:", err);
      // Replace alert with a proper notification/toast component in a real app
    }
  };
  const handleCancel = () => setIsEditing(false);
  const handleInputChange = (field, value) =>
    setTempData((prev) => ({ ...prev, [field]: value }));

  // Derived state
  const favoriteCount = favoriteApartments.length;
  const apartmentsOwnedCount = userData?.apartments?.length || 0;
  const totalPages = Math.ceil(favoriteCount / apartmentsPerPage);
  const paginatedFavorites = favoriteApartments.slice(
    (currentPage - 1) * apartmentsPerPage,
    currentPage * apartmentsPerPage
  );

  if (isLoading) return <Loading />;
  if (!userData) return <div>لم يتم العثور على بيانات المستخدم.</div>;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-50" dir="rtl">
        <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 bg-gradient-to-br from-slate-50 to-white min-h-screen">
          {/* Profile Header Card */}
          <Card className="shadow-xl border-0 bg-gradient-to-r from-white via-slate-50 to-blue-50 rounded-2xl overflow-hidden">
            <CardContent className="p-8 flex flex-col md:flex-row items-center gap-8 text-center md:text-right relative">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary rounded-full translate-y-12 -translate-x-12"></div>
              </div>

              <div className="relative z-10">
                <Avatar className="h-32 w-32 border-4 border-white shadow-2xl ring-4 ring-primary/10">
                  <AvatarImage
                    src={userData.role === "student" ? "https://cdn.pixabay.com/photo/2020/05/26/17/56/student-5224089_1280.jpg" : userData.avatar || ""}
                    alt={userData.full_name}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-4xl bg-gradient-to-br from-primary to-secondary text-white font-bold">
                    {userData.full_name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="mt-2">
                  <Badge variant="outline" className="bg-white/80 backdrop-blur-sm border-primary/20 text-primary font-medium">
                    {roleMap[userData.role] || userData.role}
                  </Badge>
                </div>
              </div>

              <div className="flex-1 space-y-4 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="text-center md:text-right">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                      {userData.full_name}
                    </h1>
                    <p className="text-xl text-slate-600 mt-1">
                      {userData.university || "جامعة غير محددة"}
                    </p>
                  </div>
                  <div className="hidden md:flex gap-3">
                    {!isEditing ? (
                      <Button onClick={handleEdit} className="gap-2 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-primary to-primary/80">
                        <Edit3 className="h-4 w-4" /> تعديل الملف
                      </Button>
                    ) : (
                      <>
                        <Button onClick={handleSave} className="gap-2 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-green-500 to-green-600">
                          <Save className="h-4 w-4" /> حفظ
                        </Button>
                        <Button
                          variant="outline"
                          onClick={handleCancel}
                          className="gap-2 border-2 hover:bg-slate-50 transition-all duration-300"
                        >
                          <X className="h-4 w-4" /> إلغاء
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-6 pt-6 md:pt-0 md:border-r md:pr-8 border-slate-200/50 relative z-10">
                <div className="text-center bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-white/20">
                  <p className="text-3xl font-bold text-red-500">
                    {favoriteCount}
                  </p>
                  <p className="text-sm text-slate-600 font-medium">
                    مفضلة
                  </p>
                </div>
                {userData.role !== "student" && (
                  <div className="text-center bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-white/20">
                    <p className="text-3xl font-bold text-blue-500">
                      {apartmentsOwnedCount}
                    </p>
                    <p className="text-sm text-slate-600 font-medium">معروضة</p>
                  </div>
                )}
              </div>

              <div className="flex md:hidden gap-3 w-full justify-center mt-6 relative z-10">
                {!isEditing ? (
                  <Button onClick={handleEdit} className="gap-2 w-full shadow-lg bg-gradient-to-r from-primary to-primary/80">
                    <Edit3 className="h-4 w-4" /> تعديل
                  </Button>
                ) : (
                  <>
                    <Button onClick={handleSave} className="gap-2 flex-1 shadow-lg bg-gradient-to-r from-green-500 to-green-600">
                      <Save className="h-4 w-4" /> حفظ
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleCancel}
                      className="gap-2 flex-1 border-2 hover:bg-slate-50"
                    >
                      <X className="h-4 w-4" /> إلغاء
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Tabs Navigation */}
          <Tabs
            value={selectedTab}
            onValueChange={setSelectedTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-3 gap-2 bg-slate-100/50 p-1 rounded-xl backdrop-blur-sm border border-white/20 shadow-sm">
              <TabsTrigger
                value="info"
                className="flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-300 data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-primary"
              >
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">المعلومات</span>
              </TabsTrigger>
              <TabsTrigger
                value="favorites"
                className="flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-300 data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-red-500"
              >
                <Heart className="h-4 w-4" />
                <span className="hidden sm:inline">المفضلة</span>
              </TabsTrigger>
              {userData.role !== "student" && (
                <TabsTrigger
                  value="my-apartments"
                  className="flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-300 data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-blue-500"
                >
                  <Home className="h-4 w-4" />
                  <span className="hidden sm:inline">شققي</span>
                </TabsTrigger>
              )}
            </TabsList>



            {/* Info Tab */}
            <TabsContent value="info" className="space-y-6">
              <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-blue-50/30 rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 pb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-100 rounded-xl">
                      <User className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl text-slate-800">تفاصيل الملف الشخصي</CardTitle>
                      <CardDescription className="text-slate-600">
                        {isEditing
                          ? "قم بتحديث معلوماتك الشخصية"
                          : "معلوماتك الشخصية المسجلة"}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  {isEditing ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-slate-700">الاسم الكامل</Label>
                        <Input
                          value={tempData.full_name}
                          onChange={(e) =>
                            handleInputChange("full_name", e.target.value)
                          }
                          className="h-12 border-2 border-slate-200 focus:border-primary transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-slate-700">رقم الهاتف</Label>
                        <Input
                          value={tempData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          className="h-12 border-2 border-slate-200 focus:border-primary transition-colors"
                        />
                      </div>
                      {userData.role === "student" && (
                        <>
                          <div className="space-y-2">
                            <Label className="text-sm font-semibold text-slate-700">الجامعة</Label>
                            <Input
                              value={tempData.university}
                              onChange={(e) =>
                                handleInputChange("university", e.target.value)
                              }
                              className="h-12 border-2 border-slate-200 focus:border-primary transition-colors"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm font-semibold text-slate-700">الكلية</Label>
                            <Input
                              value={tempData.college}
                              onChange={(e) =>
                                handleInputChange("college", e.target.value)
                              }
                              className="h-12 border-2 border-slate-200 focus:border-primary transition-colors"
                            />
                          </div>
                          <div className="space-y-2 md:col-span-2">
                            <Label className="text-sm font-semibold text-slate-700">السنة الدراسية</Label>
                            <Input
                              value={tempData.academic_year}
                              onChange={(e) =>
                                handleInputChange("academic_year", e.target.value)
                              }
                              className="h-12 border-2 border-slate-200 focus:border-primary transition-colors"
                            />
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InfoField
                        icon={<User className="text-slate-400" />}
                        label="الاسم الكامل"
                        value={userData.full_name}
                      />
                      <InfoField
                        icon={<Phone className="text-slate-400" />}
                        label="رقم الهاتف"
                        value={userData.phone}
                      />
                      {userData.role === "student" && (
                        <>
                          <InfoField
                            icon={<University className="text-slate-400" />}
                            label="الجامعة"
                            value={userData.university}
                          />
                          <InfoField
                            icon={<BookOpen className="text-slate-400" />}
                            label="الكلية"
                            value={userData.college}
                          />
                          <InfoField
                            icon={<Calendar className="text-slate-400" />}
                            label="السنة"
                            value={userData.academic_year}
                          />
                        </>
                      )}
                    </div>
                  )}

                  <div className="border-t pt-6 mt-6 space-y-6">
                    <InfoField
                      icon={<Mail className="text-slate-400" />}
                      label="البريد الإلكتروني"
                      value={userData.email}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* My Apartments Tab */}
            {userData.role !== "student" && (
              <TabsContent value="my-apartments">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      شقق قمت بعرضها ({apartmentsOwnedCount})
                    </CardTitle>
                    <CardDescription>
                      هذه هي قائمة الشقق التي قمت بإضافتها للمنصة.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {apartmentsOwnedCount > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {userData.apartments.map((apt) => (
                          <Card
                            key={apt.uuid}
                            className="overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 group"
                          >
                            <Link
                              to={`/apartments/${apt.uuid}`}
                              className="block"
                            >
<img
  src={apt.main_image || `https://placehold.co/600x400/3b82f6/white?text=${encodeURIComponent(apt.title)}`}
  alt={apt.title}
  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
/>

                            </Link>
                            <div className="p-4 space-y-3">
                              <h3 className="font-bold text-lg truncate">
                                {apt.title}
                              </h3>
                              <p className="text-sm text-muted-foreground flex items-center gap-2">
                                <MapPin size={16} /> {apt.address}
                              </p>
                              <p className="text-lg font-semibold text-primary">
                                {apt.price} جنيه/شهرياً
                              </p>
                              <div className="flex gap-2 pt-2">
                                <Button
                                  onClick={() => navigate(`/dashboard`)}
                                  size="sm"
                                  className="flex-1 gap-2"
                                >
                                  <Settings size={16} /> لوحة التحكم
                                </Button>
                                <Button
                                  onClick={() =>
                                    navigate(`/apartments/${apt.uuid}`)
                                  }
                                  size="sm"
                                  variant="outline"
                                  className="flex-1 gap-2"
                                >
                                  <Eye size={16} /> مشاهدة
                                </Button>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-16">
                        <Home className="mx-auto h-20 w-20 text-slate-300" />
                        <h3 className="mt-4 text-xl font-semibold">
                          لم تقم بإضافة أي شقق بعد
                        </h3>
                        <p className="mt-2 text-muted-foreground">
                          ابدأ بعرض شقتك الأولى للطلاب الآن.
                        </p>
                        <Button
                          className="mt-6"
                          onClick={() => navigate("/add-apartment")}
                        >
                          أضف شقة الآن
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            )}

<TabsContent value="favorites" className="space-y-6">
  <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-red-50/30 rounded-2xl overflow-hidden">
    <CardHeader className="bg-gradient-to-r from-red-500/10 to-pink-500/10 pb-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-red-100 rounded-xl">
          <Heart className="h-6 w-6 text-red-500" />
        </div>
        <div>
          <CardTitle className="text-2xl text-slate-800">الشقق المفضلة</CardTitle>
          <CardDescription className="text-slate-600">
            {favoriteCount} شقة محفوظة في قائمتك المفضلة
          </CardDescription>
        </div>
      </div>
    </CardHeader>
    <CardContent className="p-6">
      {paginatedFavorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {paginatedFavorites.map((apt) => (
            <Card
              key={apt.uuid}
              className="overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group relative bg-white border-0 hover:-translate-y-1"
            >
              {/* زر إزالة من المفضلة */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-3 right-3 z-20 shadow-lg hover:scale-110 transition-transform duration-200 bg-white/90 hover:bg-red-500 border-2 border-white"
                      onClick={() => toggleFavorite(apt.uuid)}
                    >
                      <HeartOff className="h-4 w-4 text-red-500" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-red-500 text-white">
                    <p>إزالة من المفضلة</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {/* الصورة */}
              <Link to={`/apartments/${apt.uuid}`} className="block">
                <div className="relative overflow-hidden">
                  <img
                    src={
                      apt.main_image ||
                      `https://placehold.co/600x400/ef4444/white?text=${encodeURIComponent(
                        apt.title || "شقة"
                      )}`
                    }
                    alt={apt.title || "شقة"}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-primary to-primary/80 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-lg backdrop-blur-sm">
                    {apt.price ?? 0} جنيه
                  </div>
                  {apt.isVerified && (
                    <div className="absolute bottom-3 right-3 bg-green-500 text-white px-3 py-1 rounded-lg text-xs font-medium shadow-lg">
                      موثق ✓
                    </div>
                  )}
                </div>

                {/* المحتوى */}
                <div className="p-5 space-y-3">
                  <h3 className="font-bold text-lg text-slate-800 line-clamp-1 group-hover:text-primary transition-colors">
                    {apt.title || "شقة"}
                  </h3>
                  <p className="text-slate-600 text-sm line-clamp-2">
                    {apt.description || "وصف غير متوفر"}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{apt.neighborhood || "غير محدد"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Home className="h-4 w-4" />
                      <span>{apt.bedrooms} غرفة</span>
                    </div>
                  </div>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gradient-to-br from-slate-50 to-white rounded-2xl border-2 border-dashed border-slate-200">
          <div className="p-6 bg-white rounded-full w-24 h-24 mx-auto shadow-lg border border-slate-100">
            <HeartOff className="h-12 w-12 text-slate-300 mx-auto mt-6" />
          </div>
          <h3 className="mt-6 text-2xl font-bold text-slate-700">قائمة المفضلة فارغة</h3>
          <p className="mt-3 text-slate-500 max-w-md mx-auto">
            لم تقم بإضافة أي شقق إلى قائمتك المفضلة بعد. ابدأ في استكشاف الشقق المتاحة!
          </p>
          <Button
            className="mt-8 px-8 py-3 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => navigate("/search")}
          >
            <Home className="h-5 w-5 mr-2" />
            تصفح الشقق الآن
          </Button>
        </div>
      )}
      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage((p) => Math.max(1, p - 1));
                }}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === i + 1}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(i + 1);
                  }}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage((p) => Math.min(totalPages, p + 1));
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </CardContent>
  </Card>
</TabsContent>
          </Tabs>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
