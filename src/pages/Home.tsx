import React, { useEffect, useState } from "react";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import WhyUs from "@/components/WhyUs";
import ScamStories from "@/components/ScamStories";
import FeaturedApartments from "@/components/FeaturedApartments";
import OwnerCTA from "@/components/OwnerCTA";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LoadingOverlay from "@/components/LoadingOverlay";
import { useLoading } from "@/context/LoadingContext";
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { showLoading, hideLoading } = useLoading();
  const [loaded, setLoaded] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    showLoading(t('home.loading'));

    const timer = setTimeout(() => {
      hideLoading();
      setLoaded(true); // ✅ بعد انتهاء التحميل الصفحة تظهر
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!loaded) return <LoadingOverlay />; // ✅ عرض اللودينج قبل أي محتوى

  return (
    <div className="bg-background min-h-screen">
      <Header />
      <HeroSection />
      <HowItWorks />
      <WhyUs />
      <ScamStories />
      <OwnerCTA />
      <FeaturedApartments />
      <Footer />
    </div>
  );
};

export default Home;
