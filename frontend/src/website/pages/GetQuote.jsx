import PageHero from "../components/common/PageHero";
import Container from "../components/common/Container";
import QuoteForm from "../components/GetQuote/QuoteForm";
import TrustSection from "../components/GetQuote/TrustSection";
import FaqSection from "../components/GetQuote/FaqSection";
import { useDarkMode } from "../components/context/DarkModeContext";

export default function GetQuote() {
  const { isDarkMode } = useDarkMode();

  return (
    <>
      <PageHero
        image="https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=1600&q=80"
        title="Get Your Custom Quote"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Get Quote", href: "/get-quote" },
        ]}
      />

      <section className={`w-full py-10 sm:py-12 md:py-16 transition-colors duration-300 ${
        isDarkMode ? "bg-[#1a1410]" : "bg-white"
      }`}>
        <Container>
          <QuoteForm />
        </Container>
      </section>

      <TrustSection />
      <FaqSection />
    </>
  );
}