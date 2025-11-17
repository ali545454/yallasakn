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
  CircleChevronUp,
  Building2,
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
import MapPicker from "../components/Map/MapPicker";
export const API_URL =
  import.meta.env.VITE_API_URL ||
  `https://web-production-33f69.up.railway.app/`;

const featureIconMap = {
  "واي فاي": Wifi,
  تكييف: Snowflake,
  بلكونة: Wind,
  مصعد: CircleChevronUp,
  مطبخ: Utensils,
  غسالة: WashingMachine,
  "غاز طبيعي": Flame,
  "قريب من المواصلات": Truck,
  "بوتجاز/فرن": CookingPot,
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
    const phone = apartment.whatsappNumber;
    if (!phone) {
      alert("رقم الواتساب غير متاح حاليًا.");
      return;
    }
    let phoneIntl = phone.replace(/\D/g, "");
    if (phoneIntl.startsWith("0")) {
      phoneIntl = "20" + phoneIntl.slice(1);
    }
    const message = `"، أنا مهتم بالإعلان الخاص بـ "${apartment.title}" على منصة YallaSakn.com`;
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
        {/* ...existing code... */}
        {/* --- Main Content Grid --- */}
        {/* ...existing code... */}
        {/* --- خريطة موقع الشقة --- */}
        <section className="mt-16 mb-8">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-primary" /> موقع الشقة على الخريطة
          </h3>
          {apartment.latitude && apartment.longitude ? (
            <div className="w-full h-96 rounded-xl overflow-hidden border">
              <MapPicker
                lat={Number(apartment.latitude)}
                lng={Number(apartment.longitude)}
                onChange={() => {}}
              />
            </div>
          ) : (
            <p className="text-gray-500">لا تتوفر إحداثيات لهذا السكن.</p>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ApartmentDetails;
