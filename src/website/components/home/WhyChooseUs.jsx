import { Hammer, Truck, ShieldCheck, Sparkles } from "lucide-react";
import Container from "../common/Container";

const features = [
  {
    icon: Hammer,
    title: "Handcrafted Quality",
    description:
      "Every piece is made from genuine teak and solid wood by expert craftsmen.",
  },
  {
    icon: Truck,
    title: "Pan-India Delivery",
    description:
      "Free delivery and installation, wherever you are in the country.",
  },
  {
    icon: ShieldCheck,
    title: "Lifetime Warranty",
    description:
      "We stand behind our craftsmanship with an unmatched lifetime warranty.",
  },
  {
    icon: Sparkles,
    title: "Made to Order",
    description:
      "Get in touch for customisation — furniture made exactly as you envisioned.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="w-full bg-[#faf1e0] py-10 sm:py-12 md:py-16">
      <Container>
        <div className="mb-8 text-center sm:mb-10 md:mb-12">
          <h2 className="text-2xl font-bold tracking-wide text-amber-900 sm:text-3xl md:text-4xl">
            The Hassle-Free Way to Buy Furniture Online
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-neutral-600 sm:text-base">
            Exquisitely carved wooden furniture, picked from the comfort of your
            home
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="flex flex-col items-center text-center"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-amber-900 shadow-sm sm:h-16 sm:w-16">
                  <Icon className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.75} />
                </div>
                <h3 className="mt-4 text-base font-semibold text-neutral-900 sm:text-lg">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
