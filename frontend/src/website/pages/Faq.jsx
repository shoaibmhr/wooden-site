import PageHero from "../components/common/PageHero";
import FaqAccordion from "../components/faq/FaqAccordion";
import FaqCTA from "../components/faq/FaqCTA";

export default function Faq() {
  return (
    <div>
      <PageHero
        image="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80"
        title="Frequently Asked Questions"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "FAQs", href: "/faqs" },
        ]}
      />
      <FaqAccordion />
      <FaqCTA />
    </div>
  );
}
