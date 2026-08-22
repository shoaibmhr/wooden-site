import { useEffect, useRef, useState } from "react";
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


function useInView(threshold = 0.15) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible];
}

export default function ProcessSteps() {
  const [headerRef, headerVisible] = useInView(0.3);
  const [stepsRef, stepsVisible] = useInView(0.15);

  return (
    <section className="w-full bg-[#faf1e0] py-14 sm:py-16 md:py-20 overflow-hidden">
      <Container>
        {/* Section header — same reveal cadence used on ServicesGrid/About */}
        <div ref={headerRef} className="mb-12 text-center sm:mb-14 md:mb-16">
          <span
            className={`block text-[11px] font-semibold uppercase tracking-[0.3em] text-[#b8863f] transition-all duration-700 ease-out ${
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "80ms" }}
          >
            Simple &amp; Transparent
          </span>
          <h2
            className={`mt-3 font-serif text-2xl font-normal tracking-tight text-[#2b1710] transition-all duration-[900ms] ease-out sm:text-3xl md:text-4xl ${
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "180ms" }}
          >
            How Custom Ordering Works
          </h2>
          <div
            className={`mx-auto mt-5 h-px bg-[#d4af6a] transition-all duration-[900ms] ease-out ${
              headerVisible ? "w-14 opacity-100" : "w-0 opacity-0"
            }`}
            style={{ transitionDelay: "340ms" }}
          />
          <p
            className={`mx-auto mt-5 max-w-xl text-sm leading-relaxed text-[#5c4a3b] transition-all duration-700 ease-out sm:text-base ${
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "420ms" }}
          >
            From your first message to your furniture at your door.
          </p>
        </div>

        <div ref={stepsRef} className="relative">
         
          <div
            className={`pointer-events-none absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-[#d4af6a]/60 to-transparent transition-all duration-[1200ms] ease-out lg:block ${
              stepsVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          />

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4 lg:gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className={`group relative flex flex-col items-center text-center transition-all ease-out ${
                    stepsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{
                    transitionDuration: "700ms",
                    transitionDelay: stepsVisible ? `${180 + index * 150}ms` : "0ms",
                  }}
                >
                
                  <div className="relative flex h-14 w-14 items-center justify-center sm:h-16 sm:w-16">
                    <div className="absolute inset-0 rounded-full bg-white shadow-sm transition-shadow duration-500 ease-out group-hover:shadow-lg" />
                    <div className="absolute inset-0 scale-0 rounded-full bg-[#2b1710] transition-transform duration-500 ease-out group-hover:scale-100" />
                    <Icon
                      className="relative h-6 w-6 text-amber-900 transition-colors duration-500 ease-out group-hover:text-[#f0d9a8] sm:h-7 sm:w-7"
                      strokeWidth={1.75}
                    />
                  </div>

                  <span className="mt-4 text-xs font-bold uppercase tracking-widest text-amber-800">
                    Step {index + 1}
                  </span>
                  <h3 className="mt-2 text-base font-semibold text-[#2b1710] sm:text-lg">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-[220px] text-sm leading-relaxed text-[#5c4a3b]">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}