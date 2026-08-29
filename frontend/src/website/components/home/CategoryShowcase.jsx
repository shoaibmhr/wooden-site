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
    title: "Sofa",
    href: "/category/sofa",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
    alt: "Wooden frame sectional sofa",
  },
  {
    title: "Swing",
    href: "/category/swing",
    image:
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80",
    alt: "Wooden swing furniture",
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
  {
    title: "Wardrobe",
    href: "/category/wardrobe",
    image:
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80",
    alt: "Wooden wardrobe with carved doors",
  },
  {
    title: "Bookshelf",
    href: "/category/bookshelf",
    image:
      "https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=1200&q=80",
    alt: "Wooden bookshelf filled with books",
  },
  {
    title: "TV Unit",
    href: "/category/tv-unit",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
    alt: "Wooden TV entertainment unit",
  },
  {
    title: "Coffee Table",
    href: "/category/coffee-table",
    image:
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=80",
    alt: "Wooden coffee table in a living room",
  },
  {
    title: "Study Table",
    href: "/category/study-table",
    image:
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=80",
    alt: "Wooden study table with chair",
  },
  {
    title: "Rocking Chair",
    href: "/category/rocking-chair",
    image:
      "https://images.unsplash.com/photo-1591880908180-ad33791457e8?auto=format&fit=crop&w=1200&q=80",
    alt: "Wooden rocking chair",
  },
  {
    title: "Console Table",
    href: "/category/console-table",
    image:
      "https://images.unsplash.com/photo-1616627561950-9f746e330187?auto=format&fit=crop&w=1200&q=80",
    alt: "Wooden console table against a wall",
  },
  {
    title: "Bench",
    href: "/category/bench",
    image:
      "https://images.unsplash.com/photo-1519947486511-46149fa0a254?auto=format&fit=crop&w=1200&q=80",
    alt: "Wooden bench seating",
  },
  {
    title: "Chest of Drawers",
    href: "/category/chest-of-drawers",
    image:
      "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&w=1200&q=80",
    alt: "Wooden chest of drawers",
  },
  {
    title: "Dressing Table",
    href: "/category/dressing-table",
    image:
      "https://images.unsplash.com/photo-1595871151608-bc7abd1caca3?auto=format&fit=crop&w=1200&q=80",
    alt: "Wooden dressing table with mirror",
  },
  {
    title: "Shoe Rack",
    href: "/category/shoe-rack",
    image:
      "https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&w=1200&q=80",
    alt: "Wooden shoe rack cabinet",
  },
  {
    title: "Side Table",
    href: "/category/side-table",
    image:
      "https://images.unsplash.com/photo-1550254478-ead40cc54513?auto=format&fit=crop&w=1200&q=80",
    alt: "Small wooden side table",
  },
  {
    title: "Room Divider",
    href: "/category/room-divider",
    image:
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1200&q=80",
    alt: "Carved wooden room divider screen",
  },
  {
    title: "Wall Shelf",
    href: "/category/wall-shelf",
    image:
      "https://images.unsplash.com/photo-1616137466211-f939a420be84?auto=format&fit=crop&w=1200&q=80",
    alt: "Floating wooden wall shelves",
  },
  {
    title: "Bar Stool",
    href: "/category/bar-stool",
    image:
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=1200&q=80",
    alt: "Wooden bar stool",
  },
  {
    title: "Bunk Bed",
    href: "/category/bunk-bed",
    image:
      "https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=1200&q=80",
    alt: "Wooden bunk bed for kids room",
  },
  {
    title: "Ottoman",
    href: "/category/ottoman",
    image:
      "https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?auto=format&fit=crop&w=1200&q=80",
    alt: "Wooden-framed ottoman",
  },
  {
    title: "Kitchen Cabinet",
    href: "/category/kitchen-cabinet",
    image:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
    alt: "Wooden kitchen cabinets",
  },
  {
    title: "Wine Rack",
    href: "/category/wine-rack",
    image:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80",
    alt: "Wooden wine rack storage",
  },
  {
    title: "Garden Furniture",
    href: "/category/garden-furniture",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
    alt: "Wooden outdoor garden furniture set",
  },
  {
    title: "Pergola",
    href: "/category/pergola",
    image:
      "https://images.unsplash.com/photo-1696846912973-3233cc80bf86?auto=format&fit=crop&w=1200&q=80",
    alt: "Wooden pergola structure",
  },
  {
    title: "Wall Paneling",
    href: "/category/wall-paneling",
    image:
      "https://images.unsplash.com/photo-1618221469555-7f3ad97540d6?auto=format&fit=crop&w=1200&q=80",
    alt: "Decorative wooden wall paneling",
  },
  {
    title: "Nightstand",
    href: "/category/nightstand",
    image:
      "https://images.unsplash.com/photo-1593194632872-3d19dab6e278?auto=format&fit=crop&w=1200&q=80",
    alt: "Brown wooden two-drawer nightstand",
  },
  {
    title: "Sideboard",
    href: "/category/sideboard",
    image:
      "https://images.unsplash.com/photo-1767963758785-b9def36c13e3?auto=format&fit=crop&w=1200&q=80",
    alt: "Modern wooden sideboard with decorative items",
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
