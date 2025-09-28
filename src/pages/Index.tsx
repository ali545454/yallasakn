import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import HowItWorks from '@/components/HowItWorks';
import WhyUs from '@/components/WhyUs';
import ScamStories from '@/components/ScamStories';
import SubscriptionOffers from '@/components/SubscriptionOffers';
import FeaturedApartments from '@/components/FeaturedApartments';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 via-background to-background">
      <Header />
      <HeroSection />
      <section className="bg-white/80 rounded-xl shadow-md mx-auto my-8 max-w-6xl">
        <HowItWorks />
      </section>
      <section className="bg-white/80 rounded-xl shadow-md mx-auto my-8 max-w-6xl">
        <WhyUs />
      </section>
      <section className="bg-white/80 rounded-xl shadow-md mx-auto my-8 max-w-6xl">
        <ScamStories />
      </section>
      <section className="bg-white/80 rounded-xl shadow-md mx-auto my-8 max-w-6xl">
        <SubscriptionOffers />
      </section>
      <section className="bg-white/80 rounded-xl shadow-md mx-auto my-8 max-w-6xl">
        <FeaturedApartments />
      </section>
      <Footer />
    </div>
  );
};

export default Index;
