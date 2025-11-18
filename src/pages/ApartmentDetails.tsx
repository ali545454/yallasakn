import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import ApartmentHeader from "./ApartmentDetails/components/ApartmentHeader";
import ApartmentImageGallery from "./ApartmentDetails/components/ApartmentImageGallery";
import ApartmentSpecs from "./ApartmentDetails/components/ApartmentSpecs";
import ApartmentFeatures from "./ApartmentDetails/components/ApartmentFeatures";
import ApartmentExtraDetails from "./ApartmentDetails/components/ApartmentExtraDetails";
import ApartmentContactCard from "./ApartmentDetails/components/ApartmentContactCard";
import ApartmentMapSection from "./ApartmentDetails/components/ApartmentMapSection";
export const API_URL =
  import.meta.env.VITE_API_URL ||
  `https://web-production-33f69.up.railway.app/`;

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

  return (
    <div className="bg-gray-50/50">
      <Header />
      <main className="container mx-auto px-4 md:px-8 py-10">
        <ApartmentHeader apartment={apartment} handleShare={handleShare} />
        <ApartmentImageGallery apartment={apartment} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-16 mt-12">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-2">
              سكن كامل في {apartment.neighborhood}
            </h2>
            <p className="text-gray-500 mb-4">
              مقدم بواسطة {apartment.owner?.fullName || "مالك معتمد"}
            </p>
            <ApartmentSpecs apartment={apartment} />
            <section className="py-8 border-b">
              <p className="text-gray-800 leading-loose">
                {apartment.description}
              </p>
            </section>
            <ApartmentFeatures apartment={apartment} />
            <ApartmentExtraDetails apartment={apartment} />
          </div>
          <div className="lg:col-span-1 mt-8 lg:mt-0">
            <div className="top-24">
              <ApartmentContactCard
                apartment={apartment}
                getOwnerInitials={getOwnerInitials}
                handleWhatsAppContact={handleWhatsAppContact}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <ApartmentMapSection apartment={apartment} />
    </div>
  );
};

export default ApartmentDetails;
