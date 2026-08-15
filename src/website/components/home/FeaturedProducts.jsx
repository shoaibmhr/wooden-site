import { Link } from "react-router-dom";
import Container from "../common/Container";
import ProductCard from "../common/ProductCard";
import { products } from "../../data/products.data";

export default function FeaturedProducts() {
  const featured = products.slice(0, 6);

  return (
    <section className="w-full bg-[#faf1e0]  py-10 sm:py-12 md:py-16">
      <Container>
        <div className="mb-8 text-center sm:mb-10 md:mb-12">
          <h2 className="text-2xl font-bold tracking-wide text-amber-900 sm:text-3xl md:text-4xl">
            Best Selling Furniture
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-neutral-600 sm:text-base">
            Handpicked pieces our customers love the most
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-10 flex justify-center sm:mt-12">
          <Link
            to="/products"
            className="inline-flex items-center border border-[#5c1f1f] px-8 py-3 text-xs font-semibold uppercase tracking-widest text-[#5c1f1f] transition-all duration-300 hover:bg-[#5c1f1f] hover:text-white sm:px-10 sm:py-3.5 sm:text-sm"
          >
            View All Products
          </Link>
        </div>
      </Container>
    </section>
  );
}
