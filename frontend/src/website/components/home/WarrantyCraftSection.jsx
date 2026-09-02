import { useEffect, useRef, useState } from "react";
import Container from "../common/Container";
import { useDarkMode } from "../context/DarkModeContext";

const mover1 = "https://images.unsplash.com/photo-1769972557854-7eae6f95585b?w=800&q=80&auto=format&fit=crop";
const mover2 = "https://images.unsplash.com/photo-1758523671071-4e3c43d055e6?w=800&q=80&auto=format&fit=crop";
const mover3 = "https://images.unsplash.com/photo-1758523670991-ee93bc48d81d?w=800&q=80&auto=format&fit=crop";
const mover4 = "https://images.unsplash.com/photo-1758523670969-dd1b1254062d?w=800&q=80&auto=format&fit=crop";

const craft1 = "https://images.unsplash.com/photo-1646119955125-7ef8819c813a?w=1200&q=80&auto=format&fit=crop";
const craft2 = "https://images.unsplash.com/photo-1520372561567-bac27b0e5fa1?w=1200&q=80&auto=format&fit=crop";
const craft3 = "https://images.unsplash.com/photo-1779031242515-205111711b23?w=1200&q=80&auto=format&fit=crop";

const movers = [
  { src: mover1, alt: "Team member carrying a mattress carefully" },
  { src: mover2, alt: "Team members carrying a box and plant" },
  { src: mover3, alt: "Team members carrying boxes into a home" },
  { src: mover4, alt: "Team members carrying boxes with care" },
];

const process = [
  {
    step: "01",
    src: craft1,
    alt: "Precision measuring tools used in our workshop",
    caption: "Tell Us Your Specifics",
  },
  {
    step: "02",
    src: craft2,
    alt: "Hand-finishing a piece with a hammer",
    caption: "We Customise It For You",
  },
  {
    step: "03",
    src: craft3,
    alt: "Craftsman in a workshop apron",
    caption: "Crafted In Our Own Workshop",
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

function SectionHeading({ isVisible, eyebrow, title, description, isDarkMode }) {
  return (
    <div className="mb-10 text-center sm:mb-12 md:mb-14">
      <span
        className={`block text-[11px] font-medium uppercase tracking-[0.3em] transition-all duration-700 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        } ${
          isDarkMode ? "text-[#c9974a]" : "text-[#A9793C]"
        }`}
        style={{ transitionDelay: "80ms" }}
      >
        {eyebrow}
      </span>
      <h2
        className={`mt-3 font-serif tracking-tight text-2xl sm:text-3xl md:text-4xl transition-all duration-[900ms] ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        } ${
          isDarkMode ? "text-[#e8ddd0]" : "text-[#17130F]"
        }`}
        style={{ transitionDelay: "180ms" }}
      >
        {title}
      </h2>
      <p
        className={`mx-auto mt-4 max-w-xl text-sm sm:text-base leading-relaxed transition-all duration-700 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        } ${
          isDarkMode ? "text-[#a89888]" : "text-[#5C5142]"
        }`}
        style={{ transitionDelay: "300ms" }}
      >
        {description}
      </p>
    </div>
  );
}

export default function WarrantyCraftSection() {
  const [careRef, careVisible] = useInView(0.1);
  const [processRef, processVisible] = useInView(0.1);
  const { isDarkMode } = useDarkMode();

  return (
    <>
      {/* Delivered With Care Section */}
      <section 
        ref={careRef} 
        className={`w-full py-14 sm:py-16 md:py-20 transition-colors duration-300 ${
          isDarkMode ? "bg-[#1a1410]" : "bg-white"
        }`}
      >
        <Container>
          <SectionHeading
            isVisible={careVisible}
            eyebrow="Delivered With Care"
            title="Warranty Against Manufacturing Defects & Transit Damage"
            description="Every piece is handled with care, from our workshop to your doorstep."
            isDarkMode={isDarkMode}
          />

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
            {movers.map((mover, idx) => (
              <div
                key={mover.alt}
                className={`group aspect-square w-full overflow-hidden border transition-all ease-out hover:border-[#A9793C] ${
                  careVisible
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-8 scale-95"
                } ${
                  isDarkMode 
                    ? "border-[#2a1f18]" 
                    : "border-[#17130F]/10"
                }`}
                style={{
                  transitionDuration: "700ms",
                  transitionDelay: careVisible ? `${420 + idx * 110}ms` : "0ms",
                }}
              >
                <img
                  src={mover.src}
                  alt={mover.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Our Process Section */}
      <section 
        ref={processRef} 
        className={`w-full py-14 sm:py-16 md:py-20 transition-colors duration-300 ${
          isDarkMode ? "bg-[#1a1410]" : "bg-[#FAF6EF]"
        }`}
      >
        <Container>
          <SectionHeading
            isVisible={processVisible}
            eyebrow="Our Process"
            title="How We Craft Your Furniture"
            description="From your specifications to a finished piece, made in-house."
            isDarkMode={isDarkMode}
          />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6">
            {process.map((item, idx) => (
              <div
                key={item.caption}
                className={`group relative h-64 w-full overflow-hidden sm:h-72 transition-all ease-out ${
                  processVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{
                  transitionDuration: "800ms",
                  transitionDelay: processVisible ? `${420 + idx * 180}ms` : "0ms",
                }}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[700ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#17130F]/90 via-[#17130F]/25 to-transparent transition-opacity duration-500 ease-out group-hover:from-[#17130F]/95" />

                {/* Step Number */}
                <span
                  className={`absolute left-4 top-4 font-serif text-2xl leading-none transition-all ease-out group-hover:-translate-y-1 group-hover:text-[#F3ECDD] ${
                    processVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"
                  } ${
                    isDarkMode ? "text-[#c9974a]" : "text-[#C9A468]"
                  }`}
                  style={{
                    transitionDuration: "600ms, 300ms, 300ms",
                    transitionProperty: "opacity, transform, color",
                    transitionDelay: processVisible ? `${620 + idx * 180}ms` : "0ms",
                  }}
                >
                  {item.step}
                </span>

                {/* Caption */}
                <div className="absolute inset-x-0 bottom-0 overflow-hidden p-5 sm:p-6">
                  <span className="mb-2 block h-px w-0 bg-[#A9793C] transition-all duration-500 ease-out group-hover:w-10" />
                  <p className="text-sm font-semibold uppercase tracking-[0.06em] text-[#F3ECDD] transition-transform duration-300 ease-out group-hover:-translate-y-0.5 sm:text-base">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}