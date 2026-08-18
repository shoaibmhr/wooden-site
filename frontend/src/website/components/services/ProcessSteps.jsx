import { MessageCircle, FileText, Hammer, Truck } from "lucide-react";
import Container from "../common/Container";

const steps = [
  {
    icon: MessageCircle,
    title: "Share Your Measurements",
    description:
      "Message us on WhatsApp with your room size, design preference, and wood finish.",
  },
  {
    icon: FileText,
    title: "Get a Quote",
    description:
      "We confirm the price, materials, and delivery timeline — no surprises.",
  },
  {
    icon: Hammer,
    title: "We Craft It",
    description:
      "Our craftsmen hand-build your piece from solid wood, made to your exact size.",
  },
  {
    icon: Truck,
    title: "Delivered to You",
    description:
      "Your furniture is delivered and installed, ready to use in your space.",
  },
];

export default function ProcessSteps() {
  return (
    <section className="w-full bg-[#faf1e0] py-10 sm:py-12 md:py-16">
      <Container>
        <div className="mb-8 text-center sm:mb-10 md:mb-12">
          <h2 className="text-2xl font-bold tracking-wide text-amber-900 sm:text-3xl md:text-4xl">
            How Custom Ordering Works
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-neutral-600 sm:text-base">
            From your first message to your furniture at your door
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="relative flex flex-col items-center text-center"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-amber-900 shadow-sm sm:h-16 sm:w-16">
                  <Icon className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.75} />
                </div>
                <span className="mt-3 text-xs font-bold uppercase tracking-widest text-amber-800">
                  Step {index + 1}
                </span>
                <h3 className="mt-2 text-base font-semibold text-neutral-900 sm:text-lg">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
