import ServiceHero from "../components/services/ServiceHero";
import ProcessSteps from "../components/services/ProcessSteps";
import ServicePathCards from "../components/services/ServicePathCards";
import ServiceCTA from "../components/services/ServiceCTA";

export default function Services() {
  return (
    <div>
      <ServiceHero />
      <ProcessSteps />
      <ServicePathCards />
      <ServiceCTA />
    </div>
  );
}
