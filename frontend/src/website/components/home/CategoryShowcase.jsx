import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Container from "../common/Container";

const categories = [
  {
    title: "Bed",
    href: "/category/bed",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    alt: "Carved wooden four-poster bed",
  },
  {
    title: "Dining Set",
    href: "/category/dining-set",
    image:
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80",
    alt: "Wooden dining table and chairs set",
  },
  {
    title: "Swing",
    href: "/category/swing",
    image:
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80",
    alt: "Wooden swing furniture",
  },
  {
    title: "Sofa",
    href: "/category/sofa",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
    alt: "Wooden frame sectional sofa",
  },
  {
    title: "Stool",
    href: "/category/stool",
    image:
      "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1200&q=80",
    alt: "Wooden stool",
  },
  {
    title: "Temple",
    href: "/category/temple",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    alt: "Wooden carved temple / mandir",
  },
];

// Shared scroll-visibility hook — move this to src/hooks/useInView.js
// and reuse across HeroCarousel, StoreIntroBanner, StatsSection,
// FeaturedProducts, and QuoteProcessSection.
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

export default function CategoryShowcase() {
  const [sectionRef, isVisible] = useInView(0.1);

  return (
    <section ref={sectionRef} className="w-full bg-[#FAF6EF] py-14 sm:py-16 md:py-20">
      <Container>
        <div className="mb-10 text-center sm:mb-12 md:mb-14">
          <span
            className={`block text-[11px] font-medium uppercase tracking-[0.3em] text-[#A9793C] transition-all duration-700 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "80ms" }}
          >
            Browse By Category
          </span>
          <h2
            className={`mt-3 font-serif text-[#17130F] tracking-tight text-2xl sm:text-3xl md:text-4xl transition-all duration-[900ms] ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "180ms" }}
          >
            Our Signature Collections
          </h2>
          <p
            className={`mx-auto mt-4 max-w-xl text-sm sm:text-base text-[#5C5142] leading-relaxed transition-all duration-700 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            Handcrafted wooden furniture, thoughtfully designed for every corner
            of your home.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-6">
          {categories.map((category, idx) => (
            <Link
              key={category.title}
              to={category.href}
              className={`group relative block aspect-square w-full overflow-hidden transition-all ease-out ${
                isVisible
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-8 scale-95"
              }`}
              style={{
                transitionDuration: "700ms",
                transitionDelay: isVisible ? `${420 + idx * 90}ms` : "0ms",
              }}
            >
              {/* Image — scales and slightly desaturates-in on hover */}
              <img
                src={category.image}
                alt={category.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[650ms] ease-out group-hover:scale-110"
              />

              {/* Overlay — deepens on hover for stronger text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#17130F]/85 via-[#17130F]/10 to-transparent transition-opacity duration-500 ease-out group-hover:from-[#17130F]/95" />

              {/* Thin gold border that draws in on hover */}
              <div className="pointer-events-none absolute inset-0 border border-[#C9A468]/0 transition-colors duration-500 ease-out group-hover:border-[#C9A468]/60" />

              {/* Label row */}
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-4 py-3.5">
                <span className="text-xs font-semibold uppercase tracking-[0.1em] text-[#F3ECDD] transition-transform duration-300 ease-out group-hover:-translate-y-0.5">
                  {category.title}
                </span>
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[#C9A468]/0 transition-all duration-300 ease-out group-hover:border-[#C9A468]/60 group-hover:bg-[#17130F]/40">
                  <ArrowUpRight className="h-3.5 w-3.5 text-[#C9A468] transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}