import PageHero from "../components/common/PageHero";
import Container from "../components/common/Container";
import QuoteForm from "../components/GetQuote/QuoteForm";
import TrustSection from "../components/GetQuote/TrustSection";
import FaqSection from "../components/GetQuote/FaqSection";

export default function GetQuote() {
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

      <section className="w-full bg-white py-10 sm:py-12 md:py-16">
        <Container>
          <QuoteForm />
        </Container>
      </section>

      <TrustSection />
      <FaqSection />
    </>
  );
}
