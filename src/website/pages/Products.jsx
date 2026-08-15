import { useEffect, useMemo, useState } from "react";
import Container from "../components/common/Container";
import Breadcrumbs from "../components/common/Breadcrumbs";
import FilterPanel from "../components/products/FilterPanel";
import MobileFilterDrawer from "../components/products/MobileFilterDrawer";
import ProductToolbar from "../components/products/ProductToolbar";
import ProductResultsGrid from "../components/products/ProductResultsGrid";
import FilterChips from "../components/products/FilterChips";
import SearchBar from "../components/products/SearchBar";
import Pagination from "../components/products/Pagination";
import { products } from "../data/products.data";

const ITEMS_PER_PAGE = 6;

export default function Products() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setPriceRange({ min: "", max: "" });
    setSearchQuery("");
  };

  const filteredProducts = useMemo(() => {
    let result = products;

    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }
    if (priceRange.min !== "") {
      result = result.filter((p) => p.price >= Number(priceRange.min));
    }
    if (priceRange.max !== "") {
      result = result.filter((p) => p.price <= Number(priceRange.max));
    }
    if (searchQuery.trim() !== "") {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
      );
    }

    result = [...result];
    if (sortBy === "price-low") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") result.sort((a, b) => b.price - a.price);
    if (sortBy === "rating") result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [selectedCategories, priceRange, searchQuery, sortBy]);

  // Reset to page 1 whenever filters/sort/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategories, priceRange, searchQuery, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <section className="w-full bg-white py-8 sm:py-10 md:py-12">
      <Container>
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Products", href: "/products" }]} />

        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-wide text-amber-900 sm:text-3xl">
              All Products
            </h1>
            <p className="mt-2 text-sm text-neutral-600 sm:text-base">
              {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"} found
            </p>
          </div>

          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar — desktop only */}
          <aside className="hidden w-56 shrink-0 lg:block">
            <FilterPanel
              selectedCategories={selectedCategories}
              onToggleCategory={toggleCategory}
              priceRange={priceRange}
              onPriceChange={setPriceRange}
              onClear={clearAllFilters}
            />
          </aside>

          <div className="flex-1">
            <ProductToolbar
              onOpenFilters={() => setIsFilterOpen(true)}
              activeFilterCount={
                selectedCategories.length + (priceRange.min || priceRange.max ? 1 : 0)
              }
              sortBy={sortBy}
              onSortChange={setSortBy}
            />

            <FilterChips
              selectedCategories={selectedCategories}
              onRemoveCategory={toggleCategory}
              priceRange={priceRange}
              onClearPrice={() => setPriceRange({ min: "", max: "" })}
              searchQuery={searchQuery}
              onClearSearch={() => setSearchQuery("")}
            />

            <ProductResultsGrid products={paginatedProducts} onClearFilters={clearAllFilters} />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </Container>

      <MobileFilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        selectedCategories={selectedCategories}
        onToggleCategory={toggleCategory}
        priceRange={priceRange}
        onPriceChange={setPriceRange}
        onClear={clearAllFilters}
        resultCount={filteredProducts.length}
      />
    </section>
  );
}
