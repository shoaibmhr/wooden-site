import PageHero from "../components/common/PageHero";
import ServicesGrid from "../components/services/ServicesGrid";
import ProcessSteps from "../components/services/ProcessSteps";
import ServiceCTA from "../components/services/ServiceCTA";

export default function Services() {
  return (
    <div>
      <PageHero
        image="https://images.unsplash.com/photo-1764076327046-fe35f955cba1?auto=format&fit=crop&w=1600&q=80"
        title="Services"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
        ]}
      />
      <ServicesGrid />
      <ProcessSteps />
      <ServiceCTA />
    </div>
  );
}
