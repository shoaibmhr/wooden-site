import HeroCarousel from "../components/home/HeroCarousel";
import StoreIntroBanner from "../components/home/StoreIntroBanner";
import StatsSection from "../components/home/StatsSection";
import QuoteProcessSection from "../components/home/QuoteProcessSection";
import CategoryShowcase from "../components/home/CategoryShowcase";
import PromoBannerCarousel from "../components/home/PromoBannerCarousel";
import StoryShowcase from "../components/home/StoryShowcase";
import TrendingCategories from "../components/home/TrendingCategories";
import WhyChooseUs from "../components/home/WhyChooseUs";
import HomeFaqSection from "../components/home/HomeFaqSection";
import WarrantyCraftSection from "../components/home/WarrantyCraftSection";
import RoomInspiration from "../components/home/RoomInspiration";
import FeaturedProducts from "../components/home/FeaturedProducts";

export default function Home() {
  return (
    <div className="bg-[#faf6ef] min-h-screen">
      <HeroCarousel />
      <StoreIntroBanner />
      <StatsSection />
      <FeaturedProducts />
      <PromoBannerCarousel />
      <QuoteProcessSection />
      <CategoryShowcase />
      <RoomInspiration />
      <StoryShowcase />
      <TrendingCategories />
      <WhyChooseUs />
      <HomeFaqSection />
      <WarrantyCraftSection />
    </div>
  );
}
