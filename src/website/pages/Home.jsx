import HeroCarousel from "../components/home/HeroCarousel";
import StoreIntroBanner from "../components/home/StoreIntroBanner";
import QuoteProcessSection from "../components/home/QuoteProcessSection";
import CategoryShowcase from "../components/home/CategoryShowcase";
import StoryShowcase from "../components/home/StoryShowcase";
import TrendingCategories from "../components/home/TrendingCategories";
import PromoBannerCarousel from "../components/home/PromoBannerCarousel";
import BlogPosts from "../components/home/BlogPosts";
import WhyChooseUs from "../components/home/WhyChooseUs";
import WarrantyCraftSection from "../components/home/WarrantyCraftSection";
import RoomInspiration from "../components/home/RoomInspiration";
export default function Home() {
  return (
    <div>
      {/* Home page sections yahan aayenge - Hero, Featured Products, etc. */}
      <HeroCarousel />
      <StoreIntroBanner />
      <QuoteProcessSection />
      <CategoryShowcase />
      <RoomInspiration/>
      <StoryShowcase />
      <TrendingCategories />
      <PromoBannerCarousel />
      <BlogPosts />
      <WhyChooseUs />
      <WarrantyCraftSection/>
    </div>
  );
}
