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
import Loading from "@/components/Loading";
import { Input } from "@/components/ui/input"; // For editing
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"; // For better UX
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

  const [userData, setUserData] = useState(user || null);
  const [isLoading, setIsLoading] = useState(!user);
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const apartmentsPerPage = 4; // Increased for better layout

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
      const res = await axios.get(`${API_URL}/api/v1/favorite/favorites`, {
        withCredentials: true,
      });
      setFavorites(res.data.apartments || []);
    } catch (err) {
      console.error("Error fetching favorites:", err);
    }
  }, []);

  useEffect(() => {
    if (userData) {
      // Fetch favorites only after user data is available
      fetchFavorites();
    }
  }, [userData, fetchFavorites]);

  const handleEdit = () => {
    setTempData({
      full_name: userData?.full_name || "",
      phone: userData?.phone || "",
      university: userData?.university || "",
      college: userData?.college || "",
      year: userData?.year || "",
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
  const handleRemoveFavorite = async (apartmentUuid) => {
    try {
      await axios.delete(`${API_URL}/api/v1/favorite/remove/${apartmentUuid}`, {
        withCredentials: true,
      });
      setFavorites((prev) => prev.filter((fav) => fav.uuid !== apartmentUuid));
    } catch (err) {
      console.error("Failed to remove favorite:", err);
    }
  };

  const handleCancel = () => setIsEditing(false);
  const handleInputChange = (field, value) =>
    setTempData((prev) => ({ ...prev, [field]: value }));

  // Derived state
  const favoriteCount = favorites.length;
  const apartmentsOwnedCount = userData?.apartments?.length || 0;
  const totalPages = Math.ceil(favoriteCount / apartmentsPerPage);
  const paginatedFavorites = favorites.slice(
    (currentPage - 1) * apartmentsPerPage,
    currentPage * apartmentsPerPage
  );

  if (isLoading) return <Loading />;
  if (!userData) return <div>لم يتم العثور على بيانات المستخدم.</div>;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-50" dir="rtl">
        <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
          {/* Profile Header Card */}
          <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-slate-50">
            <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6 text-center md:text-right">
              <Avatar className="h-28 w-28 border-4 border-white shadow-md">
                <AvatarImage
                  src={userData.avatar || ""}
                  alt={userData.full_name}
                />
                <AvatarFallback className="text-3xl bg-primary text-primary-foreground">
                  {userData.full_name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-center md:justify-between">
                  <h1 className="text-3xl font-bold text-slate-800">
                    {userData.full_name}
                  </h1>
                  <div className="hidden md:flex gap-2">
                    {!isEditing ? (
                      <Button onClick={handleEdit} className="gap-2">
                        <Edit3 className="h-4 w-4" /> تعديل الملف الشخصي
                      </Button>
                    ) : (
                      <>
                        <Button onClick={handleSave} className="gap-2">
                          <Save className="h-4 w-4" /> حفظ التغييرات
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={handleCancel}
                          className="gap-2"
                        >
                          <X className="h-4 w-4" /> إلغاء
                        </Button>
                      </>
                    )}
                  </div>
                </div>
                <p className="text-lg text-muted-foreground">
                  {userData.university}
                </p>
                <Badge variant="secondary" className="text-sm">
                  {roleMap[userData.role] || userData.role}
                </Badge>
              </div>

              <div className="flex gap-4 pt-4 md:pt-0 md:border-r md:pr-6 border-slate-200">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">
                    {favoriteCount}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    شقة في المفضلة
                  </p>
                </div>
                {userData.role !== "student" && (
                  <div className="text-center">
                    <p className="text-3xl font-bold text-secondary">
                      {apartmentsOwnedCount}
                    </p>
                    <p className="text-sm text-muted-foreground">شقة معروضة</p>
                  </div>
                )}
              </div>
              <div className="flex md:hidden gap-2 w-full justify-center mt-4">
                {!isEditing ? (
                  <Button onClick={handleEdit} className="gap-2 w-full">
                    <Edit3 className="h-4 w-4" /> تعديل
                  </Button>
                ) : (
                  <>
                    <Button onClick={handleSave} className="gap-2 flex-1">
                      <Save className="h-4 w-4" /> حفظ
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={handleCancel}
                      className="gap-2 flex-1"
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
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-3">
              <TabsTrigger value="info">المعلومات الشخصية</TabsTrigger>
              {userData.role !== "student" && (
                <TabsTrigger value="my-apartments">شقق قمت بعرضها</TabsTrigger>
              )}
              <TabsTrigger value="favorites">المفضلة</TabsTrigger>
            </TabsList>

            {/* Info Tab */}
            <TabsContent value="info">
              <Card>
                <CardHeader>
                  <CardTitle>تفاصيل الملف الشخصي</CardTitle>
                  <CardDescription>
                    {isEditing
                      ? "يمكنك تحديث معلوماتك هنا."
                      : "هذه هي المعلومات المسجلة في حسابك."}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {isEditing ? (
                    <>
                      <Input
                        label="الاسم الكامل"
                        value={tempData.full_name}
                        onChange={(e) =>
                          handleInputChange("full_name", e.target.value)
                        }
                      />
                      <Input
                        label="رقم الهاتف"
                        value={tempData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                      />
                      {userData.role === "student" && (
                        <>
                          <Input
                            label="الجامعة"
                            value={tempData.university}
                            onChange={(e) =>
                              handleInputChange("university", e.target.value)
                            }
                          />
                          <Input
                            label="الكلية"
                            value={tempData.college}
                            onChange={(e) =>
                              handleInputChange("college", e.target.value)
                            }
                          />
                          <Input
                            label="السنة الدراسية"
                            value={tempData.year}
                            onChange={(e) =>
                              handleInputChange("year", e.target.value)
                            }
                          />
                        </>
                      )}
                    </>
                  ) : (
                    <>
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
                            value={userData.academicYear}
                          />
                        </>
                      )}
                    </>
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

            {/* Favorites Tab */}
            {/* Favorites Tab */}
            <TabsContent value="favorites">
              <Card>
                <CardHeader>
                  <CardTitle>الشقق المفضلة ({favoriteCount})</CardTitle>
                  <CardDescription>
                    قائمة بالشقق التي قمت بحفظها للعودة إليها لاحقًا.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {paginatedFavorites.length > 0 ? (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {paginatedFavorites.map((apt) => (
                          <Card
                            key={apt.uuid} // <-- هنا
                            className="overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 group relative"
                          >
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="destructive"
                                    size="icon"
                                    onClick={() =>
                                      handleRemoveFavorite(apt.uuid)
                                    } // <-- هنا
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>إزالة من المفضلة</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>

                            <Link to={`/apartments/${apt.uuid}`}>
                              {" "}
                              {/* <-- هنا */}
                              <div className="relative">
<img
  src={apt.main_image || `https://placehold.co/600x400/ef4444/white?text=${encodeURIComponent(apt.title || "شقة")}`}
  alt={apt.title || "شقة"}
  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
/>

                                <div className="absolute top-2 right-2 bg-background/80 p-2 rounded-lg font-bold text-primary">
                                  {apt.price ?? 0} جنيه
                                </div>
                              </div>
                              <div className="p-4">
                                <h3 className="font-bold text-lg truncate">
                                  {apt.title || "غير محدد"}
                                </h3>
                                <p className="text-sm text-muted-foreground truncate">
                                  {apt.address || "غير محدد"}
                                </p>
                              </div>
                            </Link>
                          </Card>
                        ))}
                      </div>

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
                                  setCurrentPage((p) =>
                                    Math.min(totalPages, p + 1)
                                  );
                                }}
                              />
                            </PaginationItem>
                          </PaginationContent>
                        </Pagination>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-16">
                      <HeartOff className="mx-auto h-20 w-20 text-slate-300" />
                      <h3 className="mt-4 text-xl font-semibold">
                        قائمة المفضلة فارغة
                      </h3>
                      <p className="mt-2 text-muted-foreground">
                        لم تقم بإضافة أي شقق إلى قائمتك المفضلة بعد.
                      </p>
                      <Button
                        className="mt-6"
                        onClick={() => navigate("/apartments")}
                      >
                        تصفح الشقق الآن
                      </Button>
                    </div>
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
