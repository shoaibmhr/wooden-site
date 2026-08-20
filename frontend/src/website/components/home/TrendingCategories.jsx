import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "../common/Container";
import { getCategories } from "../../../services/api";
import { products as fallbackProducts } from "../../data/products.data";

// Build a fallback list from local product data, just in case the API
// call fails or returns nothing (keeps the homepage from looking empty).
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

  return Array.from(seen.values());
}

export default function TrendingCategories() {
  const [categories, setCategories] = useState(() => buildFallbackCategories());
  const [isLoading, setIsLoading] = useState(true);

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
              key={category.slug || category.title}
              to="/products"
              state={{ presetCategory: category.title }}
              className="group flex flex-col items-center"
            >
              <div className="aspect-square w-full overflow-hidden  ring-1 ring-neutral-200 transition-all duration-300 group-hover:ring-2 group-hover:ring-amber-800">
                {category.image ? (
                  <img
                    src={category.image}
                    alt={category.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-stone-100 text-stone-300">
                    <span className="text-xs">No image</span>
                  </div>
                )}
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
