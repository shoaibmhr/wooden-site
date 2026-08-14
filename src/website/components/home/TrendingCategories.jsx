import { Link } from "react-router-dom";
import Container from "../common/Container";

// Some images are generic placeholders where an exact product photo wasn't
// available — swap these `image` URLs with your real product photography.
const categories = [
  {
    title: "Study Table",
    href: "/products/study-table",
    image:
      "https://images.unsplash.com/photo-1551909402-f3411b5c4248?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Wooden Bench",
    href: "/products/wooden-bench",
    image:
      "https://images.unsplash.com/photo-1757419095875-d50e9d48b574?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Desk Organiser",
    href: "/products/desk-organiser",
    image:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Bedside Table",
    href: "/products/bedside-table",
    image:
      "https://images.unsplash.com/photo-1580479929210-07eae66cf997?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Wooden Bed",
    href: "/products/wooden-bed",
    image:
      "https://images.unsplash.com/photo-1591434132137-37d04c53197e?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Coffee Table",
    href: "/products/coffee-table",
    image:
      "https://images.unsplash.com/photo-1764076327046-fe35f955cba1?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "TV Unit",
    href: "/products/tv-unit",
    image:
      "https://images.unsplash.com/photo-1700221505678-6787ba6dd996?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Wall Decor",
    href: "/products/wall-decor",
    image:
      "https://images.unsplash.com/photo-1497219055242-93359eeed651?auto=format&fit=crop&w=800&q=80",
  },
];

export default function TrendingCategories() {
  return (
    <section className="w-full bg-[#f9f6f2] py-10 sm:py-12 md:py-16">
      <Container>
        <div className="mb-8 text-center sm:mb-10 md:mb-12">
          <h2 className="text-xl font-bold tracking-wide text-amber-900 sm:text-2xl md:text-3xl">
            Trending Categories
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-neutral-600 sm:text-base">
            Explore our most-loved wooden furniture, handpicked by category
          </p>
        </div>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4 lg:gap-8">
          {categories.map((category) => (
            <Link
              key={category.title}
              to={category.href}
              className="group flex flex-col items-center"
            >
              <div className="aspect-square w-full overflow-hidden  ring-1 ring-neutral-200 transition-all duration-300 group-hover:ring-2 group-hover:ring-amber-800">
                <img
                  src={category.image}
                  alt={category.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <span className="relative mt-4 text-center text-xs font-semibold uppercase tracking-widest text-neutral-800 transition-colors duration-300 group-hover:text-amber-900 sm:text-sm">
                {category.title}
                <span className="absolute -bottom-1 left-1/2 h-px w-0 -translate-x-1/2 bg-amber-800 transition-all duration-300 group-hover:w-full" />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
