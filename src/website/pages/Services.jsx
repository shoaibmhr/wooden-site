import PageHero from "../components/common/PageHero";
import ProcessSteps from "../components/services/ProcessSteps";
import ServicePathCards from "../components/services/ServicePathCards";
import ServiceCTA from "../components/services/ServiceCTA";

export default function Services() {
  return (
    <div>
      <PageHero
        image="https://images.unsplash.com/photo-1764076327046-fe35f955cba1?auto=format&fit=crop&w=1600&q=80"
        title="Our Services"
        subtitle="Furniture made your way — custom-built or ready to order"
      />
      <ProcessSteps />
      <ServicePathCards />
      <ServiceCTA />
    </div>
  );
}
