import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Container from "../common/Container";
import { useDarkMode } from "../context/DarkModeContext";

// Same 8 main categories used in CategoryShowcase, kept in sync manually.
// If you'd rather have a single source of truth, move this array into a
// shared file (e.g. data/categories.data.js) and import it in both places.
const categories = [
  {
    title: "Kitchen",
    slug: "kitchen",
    image:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Living & Dining",
    slug: "living-dining",
    image:
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Bedroom",
    slug: "bedroom",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Study Room",
    slug: "study-room",
    image:
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Storage & Decor",
    slug: "storage-decor",
    image:
      "https://images.unsplash.com/photo-1616137466211-f939a420be84?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Office Interiors",
    slug: "office-interiors",
    image:
      "https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Restaurant & Cafe",
    slug: "restaurant-cafe",
    image:
      "https://images.unsplash.com/photo-1690221123138-8d891be52401?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Retail & Showroom",
    slug: "retail-showroom",
    image:
      "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&w=800&q=80",
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

export default function TrendingCategories() {
  const [sectionRef, isVisible] = useInView(0.1);
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
            What's Popular
          </span>
          <h2
            className={`mt-3 font-serif tracking-tight text-2xl sm:text-3xl md:text-4xl transition-all duration-[900ms] ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            } ${
              isDarkMode ? "text-[#e8ddd0]" : "text-[#17130F]"
            }`}
            style={{ transitionDelay: "180ms" }}
          >
            Trending Categories
          </h2>
          <p
            className={`mx-auto mt-4 max-w-xl text-sm sm:text-base leading-relaxed transition-all duration-700 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            } ${
              isDarkMode ? "text-[#a89888]" : "text-[#5C5142]"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            Explore our most-loved wooden furniture, handpicked by category.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4 lg:gap-6">
          {categories.map((category, idx) => (
            <Link
              key={category.slug || category.title}
              to="/products"
              state={{ presetCategory: category.title }}
              className={`group flex flex-col items-center transition-all ease-out ${
                isVisible
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-8 scale-95"
              }`}
              style={{
                transitionDuration: "700ms",
                transitionDelay: isVisible ? `${400 + idx * 80}ms` : "0ms",
              }}
            >
              <div className={`relative aspect-square w-full overflow-hidden border transition-colors duration-300 group-hover:border-[#A9793C] ${
                isDarkMode 
                  ? "border-[#2a1f18]" 
                  : "border-[#17130F]/10"
              }`}>
                {category.image ? (
                  <img
                    src={category.image}
                    alt={category.title}
                    className="h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-110"
                  />
                ) : (
                  <div className={`flex h-full w-full items-center justify-center ${
                    isDarkMode ? "bg-[#2a1f18] text-[#a89888]" : "bg-[#F3ECDD] text-[#A79A85]"
                  }`}>
                    <span className="text-xs">No image</span>
                  </div>
                )}
                {/* Soft tint that fades in on hover, lifts the border/label pairing */}
                <div className="absolute inset-0 bg-[#17130F]/0 transition-colors duration-300 ease-out group-hover:bg-[#17130F]/10" />
              </div>
              <span className={`relative mt-4 text-center text-xs font-semibold uppercase tracking-widest transition-colors duration-300 group-hover:text-[#A9793C] sm:text-sm ${
                isDarkMode ? "text-[#d4c5b5]" : "text-[#17130F]"
              }`}>
                {category.title}
                <span className="absolute -bottom-1 left-1/2 h-px w-0 -translate-x-1/2 bg-[#A9793C] transition-all duration-300 ease-out group-hover:w-full" />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}