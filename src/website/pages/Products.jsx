import { useMemo, useState } from "react";
import Container from "../components/common/Container";
import FilterPanel from "../components/products/FilterPanel";
import ProductToolbar from "../components/products/ProductToolbar";
import ProductResultsGrid from "../components/products/ProductResultsGrid";
import MobileFilterDrawer from "../components/products/MobileFilterDrawer";
import { products } from "../data/products.data";

export default function Products() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortBy, setSortBy] = useState("featured");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const clearFilters = () => setSelectedCategories([]);

  const filteredProducts = useMemo(() => {
    let result =
      selectedCategories.length > 0
        ? products.filter((p) => selectedCategories.includes(p.category))
        : products;

    result = [...result];
    if (sortBy === "price-low") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") result.sort((a, b) => b.price - a.price);
    if (sortBy === "rating") result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [selectedCategories, sortBy]);

  return (
    <section className="w-full bg-white py-8 sm:py-10 md:py-12">
      <Container>
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl font-bold tracking-wide text-amber-900 sm:text-3xl">
            All Products
          </h1>
          <p className="mt-2 text-sm text-neutral-600 sm:text-base">
            {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"} found
          </p>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar — desktop only */}
          <aside className="hidden w-56 shrink-0 lg:block">
            <FilterPanel
              selectedCategories={selectedCategories}
              onToggleCategory={toggleCategory}
              onClear={clearFilters}
            />
          </aside>

          <div className="flex-1">
            <ProductToolbar
              selectedCount={selectedCategories.length}
              onOpenFilters={() => setIsFilterOpen(true)}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />

            <ProductResultsGrid
              products={filteredProducts}
              onClearFilters={clearFilters}
            />
          </div>
        </div>
      </Container>

      <MobileFilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        selectedCategories={selectedCategories}
        onToggleCategory={toggleCategory}
        onClear={clearFilters}
        resultCount={filteredProducts.length}
      />
    </section>
  );
}
