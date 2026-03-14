import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Edit3, Save, X, Heart, Home, Mail, User, Phone, University, BookOpen, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useUser } from "@/context/UserContext";
import { useFavorites } from "@/context/FavoritesContext";
import Loading from "@/components/Loading";
import InfoTab from "./Profile/components/InfoTab";
import MyApartmentsTab from "./Profile/components/MyApartmentsTab";
import FavoritesTab from "./Profile/components/FavoritesTab";
import { User as UserType } from "@/types";
export const API_URL = import.meta.env.VITE_API_URL || `https://web-production-33f69.up.railway.app/`;

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

  // Derived state (memoized for performance)
  const favoriteCount = useMemo(() => favoriteApartments.length, [favoriteApartments]);
  const apartmentsOwnedCount = useMemo(
    () => userData?.apartments?.length || 0,
    [userData]
  );
  const paginatedFavorites = useMemo(
    () =>
      favoriteApartments.slice(
        (currentPage - 1) * apartmentsPerPage,
        currentPage * apartmentsPerPage
      ),
    [favoriteApartments, currentPage]
  );
  const totalPages = useMemo(
    () => Math.ceil(favoriteCount / apartmentsPerPage),
    [favoriteCount]
  );

  if (isLoading) return <Loading />;
  if (!userData) return <div>لم يتم العثور على بيانات المستخدم.</div>;

  return (
    <>
      <Header />
      <div
        className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5"
        dir="rtl"
      >
        <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
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

            <TabsContent value="info" className="space-y-6">
              <InfoTab
                userData={userData}
                isEditing={isEditing}
                tempData={tempData}
                onEdit={handleEdit}
                onSave={handleSave}
                onCancel={handleCancel}
                onInputChange={handleInputChange}
              />
            </TabsContent>

            {userData.role !== "student" && (
              <TabsContent value="my-apartments">
                <MyApartmentsTab
                  userData={userData}
                  apartmentsOwnedCount={apartmentsOwnedCount}
                  navigate={navigate}
                />
              </TabsContent>
            )}

            <TabsContent value="favorites">
              <FavoritesTab
                favoriteCount={favoriteCount}
                paginatedFavorites={paginatedFavorites}
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                toggleFavorite={toggleFavorite}
                navigate={navigate}
              />
            </TabsContent>
          </Tabs>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
