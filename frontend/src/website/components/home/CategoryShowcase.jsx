import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Container from "../common/Container";

// Each entry is a MAIN category shown on this page.
// `subcategories` travels with the category so the category detail page
// (e.g. /category/:slug) can render the breakdown without re-fetching it.
const categories = [
  {
    title: "Kitchen",
    href: "/category/kitchen",
    image:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
    alt: "Wooden kitchen cabinets",
    subcategories: [
      "Cupboards",
      "Dining Table & Chairs",
      "Kitchen Island",
      "Wooden Cutlery",
      "Crockery Unit",
    ],
  },
  {
    title: "Living & Dining",
    href: "/category/living-dining",
    image:
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80",
    alt: "Wooden dining table and chairs set",
    subcategories: ["TV Console", "Coffee & Side Tables", "Display/Showcase Unit"],
  },
  {
    title: "Bedroom",
    href: "/category/bedroom",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    alt: "Carved wooden four-poster bed",
    subcategories: ["Beds", "Wardrobes", "Night Stands", "Dressing Table"],
  },
  {
    title: "Study Room",
    href: "/category/study-room",
    image:
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=80",
    alt: "Wooden study table with chair",
    subcategories: ["Study Tables", "Bookshelves"],
  },
  {
    title: "Storage & Decor",
    href: "/category/storage-decor",
    image:
      "https://images.unsplash.com/photo-1616137466211-f939a420be84?auto=format&fit=crop&w=1200&q=80",
    alt: "Floating wooden wall shelves",
    subcategories: [
      "Shelves",
      "Consoles",
      "Shoe Racks",
      "Wall Decor",
      "Mirror Frames",
    ],
  },
  {
    title: "Office Interiors",
    href: "/category/office-interiors",
    image:
      "https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&w=1200&q=80",
    alt: "Modern office interior with glass divider and desks",
    subcategories: [
      "Executive Desks",
      "Office Chairs",
      "Cabin Panelling",
      "Reception Counters",
      "Conference Tables",
    ],
  },
  {
    title: "Restaurant & Cafe",
    href: "/category/restaurant-cafe",
    image:
      "https://images.unsplash.com/photo-1690221123138-8d891be52401?auto=format&fit=crop&w=1200&q=80",
    alt: "Restaurant interior with wooden tables and chairs",
    subcategories: [
      "Dining Furniture",
      "Bar Counters",
      "Booth Seating",
      "Wall Panelling",
    ],
  },
  {
    title: "Retail & Showroom",
    href: "/category/retail-showroom",
    image:
      "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&w=1200&q=80",
    alt: "Wooden chest of drawers",
    subcategories: [
      "Display Units",
      "Counters",
      "Shelving",
      "Storefront Fit-out",
    ],
  },
  {
    title: "Wall & Ceiling Solutions",
    href: "/category/wall-ceiling-solutions",
    image:
      "https://images.unsplash.com/photo-1618221469555-7f3ad97540d6?auto=format&fit=crop&w=1200&q=80",
    alt: "Decorative wooden wall paneling",
    subcategories: [
      "Wood Panelling",
      "False Ceiling",
      "Partitions",
      "Wooden Cladding",
    ],
  },
  {
    title: "Doors & Windows",
    href: "/category/doors-windows",
    image:
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1200&q=80",
    alt: "Carved wooden room divider screen",
    subcategories: ["Wooden Doors", "Window Frames", "Mouldings"],
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
      { threshold },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible];
}

export default function CategoryShowcase() {
  const [sectionRef, isVisible] = useInView(0.1);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#FAF6EF] py-14 sm:py-16 md:py-20"
    >
      <Container>
        <div className="mb-10 text-center sm:mb-12 md:mb-14">
          <span
            className={`block text-[11px] font-medium uppercase tracking-[0.3em] text-[#A9793C] transition-all duration-700 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "80ms" }}
          >
            Browse By Category
          </span>
          <h2
            className={`mt-3 font-serif text-[#17130F] tracking-tight text-2xl sm:text-3xl md:text-4xl transition-all duration-[900ms] ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "180ms" }}
          >
            Our Signature Collections
          </h2>
          <p
            className={`mx-auto mt-4 max-w-xl text-sm sm:text-base text-[#5C5142] leading-relaxed transition-all duration-700 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            Handcrafted wooden furniture and interiors, thoughtfully designed
            for every corner of your home and business.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5">
          {categories.map((category, idx) => (
            <Link
              key={category.title}
              to={category.href}
              // Pass the subcategory list along via router state so the
              // destination page can render them immediately without a
              // second request. It still works fine as a plain link if the
              // destination route ignores `state`.
              state={{ subcategories: category.subcategories }}
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
              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 px-4 py-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.1em] text-[#F3ECDD] transition-transform duration-300 ease-out group-hover:-translate-y-0.5">
                    {category.title}
                  </span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[#C9A468]/0 transition-all duration-300 ease-out group-hover:border-[#C9A468]/60 group-hover:bg-[#17130F]/40">
                    <ArrowUpRight className="h-3.5 w-3.5 text-[#C9A468] transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
                {/* Optional: quick preview of the first couple of subcategories */}
                <span className="line-clamp-1 text-[10px] text-[#C9A468]/80 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100">
                  {category.subcategories.slice(0, 3).join(" · ")}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}