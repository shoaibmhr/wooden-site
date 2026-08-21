import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Container from "../common/Container";
import { getCategories } from "../../../services/api";
import { products as fallbackProducts } from "../../data/products.data";

// Extra categories to round out the grid if the product data alone leaves
// an odd count (e.g. 9 items orphaning a single card in the last row).
// Swap these images for real product photos once you have them.
const SUPPLEMENTAL_CATEGORIES = [
  {
    title: "Wardrobe",
    slug: "wardrobe",
    image:
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Office Furniture",
    slug: "office-furniture",
    image:
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Outdoor Furniture",
    slug: "outdoor-furniture",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  },
];

// Build a fallback list from local product data, just in case the API
// call fails or returns nothing (keeps the homepage from looking empty).
// Supplemental categories are appended (skipping any already present)
// so the grid doesn't end on a single orphaned card.
function buildFallbackCategories() {
  const seen = new Map();

  fallbackProducts.forEach((product) => {
    if (product.category && !seen.has(product.category)) {
      seen.set(product.category, {
        title: product.category,
        slug: product.categorySlug || "",
        image: product.image,
      });
    }
  });

  SUPPLEMENTAL_CATEGORIES.forEach((category) => {
    if (!seen.has(category.title)) {
      seen.set(category.title, category);
    }
  });

  return Array.from(seen.values());
}

// Shared scroll-visibility hook — move this to src/hooks/useInView.js
// and reuse across the other homepage sections.
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
  const [categories, setCategories] = useState(() => buildFallbackCategories());
  const [isLoading, setIsLoading] = useState(true);
  const [sectionRef, isVisible] = useInView(0.1);

  useEffect(() => {
    let isMounted = true;

    getCategories()
      .then((data) => {
        if (!isMounted || !data || data.length === 0) return;

        const mapped = data.map((cat) => ({
          title: cat.name,
          slug: cat.slug,
          image: cat.image_url,
        }));

        setCategories(mapped);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (!isLoading && categories.length === 0) return null;

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
            What's Popular
          </span>
          <h2
            className={`mt-3 font-serif text-[#17130F] tracking-tight text-2xl sm:text-3xl md:text-4xl transition-all duration-[900ms] ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "180ms" }}
          >
            Trending Categories
          </h2>
          <p
            className={`mx-auto mt-4 max-w-xl text-sm sm:text-base text-[#5C5142] leading-relaxed transition-all duration-700 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
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
              <div className="relative aspect-square w-full overflow-hidden border border-[#17130F]/10 transition-colors duration-300 group-hover:border-[#A9793C]">
                {category.image ? (
                  <img
                    src={category.image}
                    alt={category.title}
                    className="h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-110"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[#F3ECDD] text-[#A79A85]">
                    <span className="text-xs">No image</span>
                  </div>
                )}
                {/* Soft tint that fades in on hover, lifts the border/label pairing */}
                <div className="absolute inset-0 bg-[#17130F]/0 transition-colors duration-300 ease-out group-hover:bg-[#17130F]/10" />
              </div>
              <span className="relative mt-4 text-center text-xs font-semibold uppercase tracking-widest text-[#17130F] transition-colors duration-300 group-hover:text-[#A9793C] sm:text-sm">
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