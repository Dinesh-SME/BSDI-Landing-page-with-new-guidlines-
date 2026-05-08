import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import VisionSection from "@/components/VisionSection";
import AboutSection from "@/components/AboutSection";
import StatisticsSection from "@/components/StatisticsSection";
import ServicesSection from "@/components/ServicesSection";
import WhoCanUseSection from "@/components/WhoCanUseSection";
import DataServicesSection from "@/components/DataServicesSection";
import LayersSection from "@/components/LayersSection";
import NewsSection from "@/components/NewsSection";
import MapViewSection from "@/components/MapViewSection";
import TechnologiesSection from "@/components/TechnologiesSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative custom">
      <Navbar />
      <HeroSection />

      <div className="relative z-10">
        <NewsSection />
        <AboutSection />
        <StatisticsSection />
        <MapViewSection />
        <LayersSection />
        <ServicesSection />
        <VisionSection />
        <WhoCanUseSection />
        <TechnologiesSection />
        <DataServicesSection />
      </div>

      <Footer />
    </div>
  );
};

export default Index;
