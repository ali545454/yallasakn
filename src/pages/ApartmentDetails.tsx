import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Star,
  Share2,
  MapPin,
  Bed,
  Bath,
  Ruler,
  Wifi,
  ChevronUp,
  Check,
  Utensils,
  MessageCircle,
  ImageIcon,
  WashingMachine,
  Snowflake,
  Flame,
  Wind,
  Layers,
  Hash,
  Home,
  Users,
  Truck,
  CookingPot,
  ShieldCheck,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FavoriteButton from "@/components/FavoriteButton";
import Loading from "@/components/Loading";
export const API_URL = import.meta.env.VITE_API_URL || `https://web-production-33f69.up.railway.app/`;

const featureIconMap = {
  "واي فاي": Wifi,
  تكييف: Snowflake,
  بلكونة: Wind,
  مصعد: ChevronUp,
  مطبخ: Utensils,
  غسالة: WashingMachine,
  "غاز طبيعي": Flame,
  "قريب من المواصلات": Truck,
  "بوتجاز/فرن" : CookingPot,
};

const ApartmentDetails = () => {
  const { apartmentUuid } = useParams();
  const [apartment, setApartment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
  const fetchApartmentDetails = async () => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    try {
      // ✅ جلب بيانات الشقة مع الكوكي
      const response = await fetch(
        `${API_URL}/api/v1/apartments/apartment/${apartmentUuid}`,
        { credentials: "include" } // مهم عشان يرسل الكوكي
      );
      if (!response.ok) throw new Error("فشل في جلب بيانات الشقة");
      const data = await response.json();
      setApartment(data);

      // ✅ Track view بعد ما نجيب بيانات الشقة
      await fetch(`${API_URL}/api/views/track/${apartmentUuid}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // مهم برضه
        body: JSON.stringify({ user_id: data.user?.id || null }),
      });

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (apartmentUuid) fetchApartmentDetails();
}, [apartmentUuid]);


  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: apartment.title,
        text: "اكتشف هذا السكن الرائع على YallaSakn!",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("تم نسخ رابط الشقة ✅");
    }
  };

  const handleWhatsAppContact = () => {
    const phone = apartment.whatsapp_number || apartment.owner?.phone;
    if (!phone) {
      alert("رقم الواتساب غير متاح حاليًا.");
      return;
    }
    let phoneIntl = phone.replace(/\D/g, "");
    if (phoneIntl.startsWith("0")) {
      phoneIntl = "20" + phoneIntl.slice(1);
    }
    const message = `مرحباً، أنا مهتم بالإعلان الخاص بـ "${apartment.title}" على منصة YallaSakn.`;
    const waLink = `https://wa.me/${phoneIntl}?text=${encodeURIComponent(
      message
    )}`;
    window.open(waLink, "_blank");
  };

  const getOwnerInitials = (fullName?: string) => {
    if (!fullName) return "م";
    return fullName
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        <Loading />
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-xl text-red-500">
        حدث خطأ: {error}
      </div>
    );
  if (!apartment)
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        لم يتم العثور على الشقة.
      </div>
    );
  function getFloorName(floorNumber?: number | string) {
    if (!floorNumber) return "غير محدد";
    const floorMap: Record<number, string> = {
      1: "الأول",
      2: "الثاني",
      3: "الثالث",
      4: "الرابع",
      5: "الخامس",
      6: "السادس",
      7: "السابع",
      8: "الثامن",
      9: "التاسع",
      10: "العاشر",
    };
    return floorMap[Number(floorNumber)] || `${floorNumber}`;
  }
  const createdAt = apartment.createdAt ? new Date(apartment.createdAt) : null;

  const isValidDate = createdAt && !isNaN(createdAt.getTime());

  // Component for rendering key specs with icons
  const KeySpec = ({ icon: Icon, label, value }) => (
    <div className="flex items-center gap-3 text-gray-700">
      <Icon className="w-6 h-6 text-primary" />
      <div>
        <p className="font-semibold">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50/50">
      <Header />
      <main className="container mx-auto px-4 md:px-8 py-10">
        {/* --- Header Section --- */}
        <section className="mb-4">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
            {apartment.title}
          </h1>
          <div className="flex flex-wrap items-center justify-between mt-2 text-sm text-gray-600">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 font-medium">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                {apartment.averageRating || "جديد"} (
                {apartment.reviewCount || 0} تقييمات)
              </span>
              <span className="text-gray-400">·</span>
              <a
                href="#location"
                className="flex items-center gap-1 font-medium hover:underline"
              >
                <MapPin className="w-4 h-4" />
                {apartment.neighborhood}, {apartment.address}
              </a>
            </div>
            <div className="flex items-center gap-2 mt-2 sm:mt-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="flex items-center gap-2"
              >
                <Share2 className="w-5 h-5" />
                <span className="font-medium">مشاركة</span>
              </Button>
              <FavoriteButton apartment={apartment} />
            </div>
          </div>
        </section>

        {/* --- Image Grid Section --- */}
        <Dialog>
          <div className="relative">
            <section className="h-[300px] md:h-[500px] grid grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-2xl">
              {apartment.images?.slice(0, 5).map((img, index) => (
                <DialogTrigger asChild key={index}>
                  <div
                    className={`
                      ${
                        index === 0
                          ? "col-span-4 sm:col-span-2 row-span-2"
                          : "hidden sm:block"
                      }
                      overflow-hidden cursor-pointer group
                    `}
                  >
                    <img
                      src={img}
                      alt={`View ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </DialogTrigger>
              ))}
            </section>

            <DialogTrigger asChild>
              <Button
                variant="secondary"
                className="absolute bottom-4 right-4 shadow-lg"
              >
                <ImageIcon className="w-4 h-4 ml-2" />
                عرض كل الصور
              </Button>
            </DialogTrigger>
          </div>

          <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
            <DialogHeader>
              <DialogTitle>معرض صور: {apartment.title}</DialogTitle>
            </DialogHeader>
            <div className="overflow-y-auto rounded-lg pr-3">
              <div className="space-y-4">
                {apartment.images?.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Full view ${index + 1}`}
                    className="w-full h-auto object-contain rounded-md"
                  />
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* --- Main Content Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-16 mt-12">
          {/* Left Column: Details */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between pb-6">
              <div>
                <h2 className="text-2xl font-semibold">
                  سكن كامل في {apartment.neighborhood}
                </h2>
                <p className="text-gray-500 mt-1">
                  مقدم بواسطة {apartment.owner?.fullName || "مالك معتمد"}
                </p>
              </div>
            </div>

            {/* Key Specs Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y">
              <KeySpec
                icon={Bed}
                label="غرف "
                value={apartment.bedrooms || "-"}
              />
              <KeySpec
                icon={Users}
                label="سرير متاح"
                value={apartment.availableBeds || "-"}
              />
              <KeySpec
                icon={Bath}
                label="حمامات"
                value={apartment.bathrooms || "-"}
              />
              <KeySpec
                icon={Ruler}
                label="مساحة"
                value={apartment.area ? `${apartment.area} م²` : "-"}
              />
              <KeySpec
                icon={CookingPot}
                label="مطابخ"
                value={apartment.kitchens || "-"}
              />
            </div>

            {/* Description */}
            <section className="py-8 border-b">
              <p className="text-gray-800 leading-loose">
                {apartment.description}
              </p>
            </section>

            {/* Features */}
            <section className="py-8 border-b">
              <h3 className="text-xl font-semibold mb-6">ما يقدمه هذا السكن</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5">
                {apartment.features?.map((feature) => {
                  const Icon = featureIconMap[feature] || Check;
                  return (
                    <div key={feature} className="flex items-center gap-3">
                      <Icon className="w-6 h-6 text-primary" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Other Details */}
            <section className="py-8">
              <h3 className="text-xl font-semibold mb-6">تفاصيل إضافية</h3>
              <div className="space-y-4">
                {/* الحي */}
                <div className="flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-gray-700 flex-shrink-0" />
                  <span>
                    <span className="font-medium">الحي: </span>
                    {apartment.neighborhood || "غير محدد"}
                  </span>
                </div>

                {/* الطابق */}
                <div className="flex items-center gap-3">
                  <Layers className="w-6 h-6 text-gray-700 flex-shrink-0" />
                  <span>
                    <span className="font-medium">الطابق: </span>
                    {getFloorName(apartment.floorNumber)}
                  </span>
                </div>

                {/* متاح لـ */}
                <div className="flex items-center gap-3">
                  <Hash className="w-6 h-6 text-gray-700 flex-shrink-0" />
                  <span>
                    <span className="font-medium"> نوع السكن: </span>
                    {apartment.residenceType || "الجميع"}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Hash className="w-6 h-6 text-gray-700 flex-shrink-0" />
                  <span>
                    <span className="font-medium">متاح لـ: </span>
                    {apartment.preferred_tenant_type || "الجميع"}
                  </span>
                </div>
                {/* حالة التحقق */}
                <div className="flex items-center gap-3">
                  <ShieldCheck
                    className={`w-6 h-6 flex-shrink-0 ${
                      apartment.is_verified ? "text-green-600" : "text-gray-400"
                    }`}
                  />
                  <span>
                    {apartment.isVerified
                      ? "تم التحقق من هذا السكن بواسطة فريقنا"
                      : "لم يتم التحقق من هذا السكن"}
                  </span>
                </div>

                {/* تاريخ الإضافة */}
                <div className="flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-gray-700 flex-shrink-0" />
                  <span>
                    <span className="font-medium">أضيف في: </span>
                    {isValidDate
                      ? createdAt.toLocaleDateString("ar-EG", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "غير متوفر"}
                  </span>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Sticky Contact Card */}
          <div className="lg:col-span-1 mt-8 lg:mt-0">
            <div className=" top-24">
              <Card className="rounded-2xl shadow-lg border">
                <CardHeader>
                  <CardTitle className="text-2xl">
                    <span className="font-bold">{apartment.price} جنيه</span>
                    <span className="font-normal text-base text-gray-600">
                      {" "}
                      / الشهر
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center my-4 py-4 border-t">
                    <p className="text-sm text-gray-500 mb-3">
                      تواصل مع المالك
                    </p>
                    <div className="flex items-center justify-center gap-3">
                      <Avatar className="h-14 w-14">
                        <AvatarImage
                          src={apartment.owner?.avatar}
                          alt={apartment.owner?.fullName}
                        />
                        <AvatarFallback className="text-lg bg-primary text-white font-bold">
                          {getOwnerInitials(apartment.owner?.fullName)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-lg text-gray-800">
                          {apartment.owner?.fullName || "مالك معتمد"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mt-4">
                    <Button
                      onClick={handleWhatsAppContact}
                      size="lg"
                      className="w-full h-12 bg-green-500 hover:bg-green-600 text-lg"
                    >
                      <svg
                        className="h-6 w-6 ml-2"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12.04 2.87c-5.46 0-9.91 4.45-9.91 9.91 0 1.77.47 3.42 1.3 4.88l-1.39 5.09 5.2-1.37a9.92 9.92 0 0 0 4.8-1.25c5.46 0 9.91-4.45 9.91-9.91s-4.45-9.91-9.91-9.91zm4.8 14.88c-.24.36-.59.54-.99.54-.15 0-.3-.02-.45-.06a4.57 4.57 0 0 1-1.63-.5c-1.1-.64-2.61-1.57-3.92-2.91-1.31-1.34-2.2-2.84-2.85-3.93a4.34 4.34 0 0 1-.5-1.63c-.04-.15-.06-.3-.06-.45 0-.41.17-.76.53-1.01l.93-1.09c.35-.41.97-.47 1.4-.14l.87.52c.38.23.63.63.7 1.05l.13.62c.07.39.04.79-.11 1.15-.15.35-.45.64-.79.88l-.78.58c.28.52.57 1.06 1.02 1.54 1.34 1.36 2.76 2.37 3.99 3.01l.71-.85c.23-.28.52-.46.85-.56.33-.1.68-.11 1.02-.02l.62.13c.42.08.82.33 1.05.7l.52.87c.33.43.28 1.05-.14 1.4z" />
                      </svg>
                      تواصل عبر واتساب
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full h-12 text-lg"
                      disabled
                    >
                      <MessageCircle className="h-5 w-5 ml-2" /> ابدأ مراسلة
                    </Button>
                  </div>
                  <p className="text-xs text-center text-gray-500 mt-4">
                    لا تقم بأي تحويلات مالية قبل معاينة الشقة.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ApartmentDetails;
