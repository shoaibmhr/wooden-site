import { Link } from "react-router-dom";
import Container from "../common/Container";

const categories = [
  {
    title: "View Bed",
    href: "/category/bed",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    alt: "Carved wooden four-poster bed",
  },
  {
    title: "View Dining Set",
    href: "/category/dining-set",
    image:
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80",
    alt: "Wooden dining table and chairs set",
  },
  {
    title: "View Swing",
    href: "/category/swing",
    image:
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80",
    alt: "Wooden swing furniture",
  },
  {
    title: "View Sofa",
    href: "/category/sofa",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
    alt: "Wooden frame sectional sofa",
  },
  {
    title: "View Stool",
    href: "/category/stool",
    image:
      "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1200&q=80",
    alt: "Wooden stool",
  },
  {
    title: "View Temple",
    href: "/category/temple",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    alt: "Wooden carved temple / mandir",
  },
];

export default function CategoryShowcase() {
  return (
    <section className="w-full bg-[#faf1e0] py-10 sm:py-12 md:py-16">
      <Container>
        <div className="mb-8 text-center sm:mb-10 md:mb-12">
          <h2 className="text-xl font-bold tracking-wide text-amber-900 sm:text-2xl md:text-3xl">
            Our Signature Collections
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-neutral-600 sm:text-base">
            Handcrafted wooden furniture, thoughtfully designed for every corner
            of your home
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-2 lg:gap-8">
          {categories.map((category) => (
            <div key={category.title} className="flex flex-col">
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src={category.image}
                  alt={category.alt}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <Link
                to={category.href}
                className="
                  mt-4
                  flex
                  w-full
                  items-center
                  justify-center
                  bg-[#5c1f1f]
                  px-6
                  py-3
                  text-center
                  text-xs
                  font-semibold
                  uppercase
                  tracking-widest
                  text-white
                  transition-all
                  duration-300
                  hover:bg-[#732929]
                  sm:py-3.5
                  sm:text-sm
                  lg:w-fit
                "
              >
                {category.title}
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
