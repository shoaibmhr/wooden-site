import HeroCarousel from "../components/home/HeroCarousel";
import StoreIntroBanner from "../components/home/StoreIntroBanner";
import QuoteProcessSection from "../components/home/QuoteProcessSection";
import CategoryShowcase from "../components/home/CategoryShowcase";
import StoryShowcase from "../components/home/StoryShowcase";
import TrendingCategories from "../components/home/TrendingCategories";
import PromoBannerCarousel from "../components/home/PromoBannerCarousel";
export default function Home() {
  return (
    <div>
      {/* Home page sections yahan aayenge - Hero, Featured Products, etc. */}
      <HeroCarousel />
      <StoreIntroBanner />
      <QuoteProcessSection />
      <CategoryShowcase />
      <StoryShowcase />
      <TrendingCategories />
      <PromoBannerCarousel />
    </div>
  );
}
