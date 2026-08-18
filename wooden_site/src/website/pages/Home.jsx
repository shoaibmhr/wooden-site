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
import FeaturedProducts from "../components/home/FeaturedProducts";
export default function Home() {
  return (
    <div>
      <HeroCarousel />
      <StoreIntroBanner />
      <FeaturedProducts />
      <QuoteProcessSection />
      <CategoryShowcase />
      <RoomInspiration />
      <StoryShowcase />
      <TrendingCategories />
      <PromoBannerCarousel />
      <BlogPosts />
      <WhyChooseUs />
      <WarrantyCraftSection />
    </div>
  );
}
