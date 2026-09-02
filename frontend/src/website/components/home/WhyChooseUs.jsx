import { useEffect, useRef, useState } from "react";
import { Hammer, Truck, ShieldCheck, Sparkles } from "lucide-react";
import Container from "../common/Container";
import { useDarkMode } from "../context/DarkModeContext";

const features = [
  {
    icon: Hammer,
    title: "Handcrafted Quality",
    description:
      "Every piece is made from genuine teak and solid wood by expert craftsmen.",
  },
  {
    icon: Truck,
    title: "Nationwide Delivery",
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

export default function WhyChooseUs() {
  const [sectionRef, isVisible] = useInView(0.15);
  const { isDarkMode } = useDarkMode();

  return (
    <section 
      ref={sectionRef} 
      className={`w-full py-14 sm:py-16 md:py-20 transition-colors duration-300 ${
        isDarkMode ? "bg-[#1a1410]" : "bg-[#FAF6EF]"
      }`}
    >
      <Container>
        <div className="mb-10 text-center sm:mb-12 md:mb-14">
          <span
            className={`block text-[11px] font-medium uppercase tracking-[0.3em] transition-all duration-700 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            } ${
              isDarkMode ? "text-[#c9974a]" : "text-[#A9793C]"
            }`}
            style={{ transitionDelay: "80ms" }}
          >
            Why Choose Us
          </span>
          <h2
            className={`mt-3 font-serif tracking-tight text-2xl sm:text-3xl md:text-4xl transition-all duration-[900ms] ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            } ${
              isDarkMode ? "text-[#e8ddd0]" : "text-[#17130F]"
            }`}
            style={{ transitionDelay: "180ms" }}
          >
            The Hassle-Free Way to Buy Furniture Online
          </h2>
          <p
            className={`mx-auto mt-4 max-w-xl text-sm sm:text-base leading-relaxed transition-all duration-700 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            } ${
              isDarkMode ? "text-[#a89888]" : "text-[#5C5142]"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            Exquisitely carved wooden furniture, picked from the comfort of
            your home.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={`group flex flex-col items-center text-center transition-all ease-out ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDuration: "700ms",
                  transitionDelay: isVisible ? `${420 + idx * 140}ms` : "0ms",
                }}
              >
                {/* Icon Container */}
                <div className="relative flex h-14 w-14 items-center justify-center sm:h-16 sm:w-16">
                  <div className={`absolute inset-0 border transition-all duration-500 ease-out group-hover:rotate-45 group-hover:border-[#A9793C] ${
                    isDarkMode 
                      ? "border-[#c9974a]/40" 
                      : "border-[#A9793C]/40"
                  }`} />
                  <div className={`absolute inset-0 scale-0 transition-transform duration-500 ease-out group-hover:scale-100 ${
                    isDarkMode ? "bg-[#c9974a]" : "bg-[#A9793C]"
                  }`} />
                  <Icon
                    className={`relative h-6 w-6 transition-all duration-500 ease-out group-hover:scale-110 group-hover:text-[#17130F] sm:h-7 sm:w-7 ${
                      isDarkMode 
                        ? "text-[#c9974a]" 
                        : "text-[#A9793C]"
                    }`}
                    strokeWidth={1.5}
                  />
                </div>

                <h3 className={`mt-5 text-sm font-semibold uppercase tracking-[0.08em] transition-colors duration-300 group-hover:text-[#A9793C] sm:text-base ${
                  isDarkMode ? "text-[#e8ddd0]" : "text-[#17130F]"
                }`}>
                  {feature.title}
                </h3>
                <p className={`mt-2.5 text-sm leading-relaxed ${
                  isDarkMode ? "text-[#a89888]" : "text-[#5C5142]"
                }`}>
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