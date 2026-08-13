import HeroCarousel from "../components/home/HeroCarousel";
import StoreIntroBanner from "../components/home/StoreIntroBanner";
import QuoteProcessSection from "../components/home/QuoteProcessSection";
export default function Home() {
  return (
    <div>
      {/* Home page sections yahan aayenge - Hero, Featured Products, etc. */}
      <HeroCarousel />
      <StoreIntroBanner />
      <QuoteProcessSection/>
    </div>
  );
}
