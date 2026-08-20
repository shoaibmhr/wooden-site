import { useMemo, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Container from "../components/common/Container";
import PageHero from "../components/common/PageHero";
import Breadcrumbs from "../components/common/Breadcrumbs";
import FilterPanel from "../components/products/FilterPanel";
import MobileFilterDrawer from "../components/products/MobileFilterDrawer";
import ProductToolbar from "../components/products/ProductToolbar";
import ProductResultsGrid from "../components/products/ProductResultsGrid";
import FilterChips from "../components/products/FilterChips";
import SearchBar from "../components/products/SearchBar";
import Pagination from "../components/products/Pagination";
import { getProducts } from "../../services/api";
import { products as fallbackProducts } from "../data/products.data";

const ITEMS_PER_PAGE = 6;

export default function Products() {
  const location = useLocation();
  const [productList, setProductList] = useState(() => fallbackProducts);
 const [selectedCategories, setSelectedCategories] = useState(() =>
   location.state?.presetCategory ? [location.state.presetCategory] : [],
 );
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [searchQuery, setSearchQuery] = useState(
    location.state?.searchQuery || "",
  );
  const [sortBy, setSortBy] = useState("featured");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;
    getProducts().then((data) => {
      if (isMounted && data && data.length > 0) {
        setProductList(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setPriceRange({ min: "", max: "" });
    setSearchQuery("");
  };

  const filteredProducts = useMemo(() => {
    let result = productList;

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
        p.name.toLowerCase().includes(searchQuery.trim().toLowerCase()),
      );
    }

    result = [...result];
    if (sortBy === "price-low") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") result.sort((a, b) => b.price - a.price);
    if (sortBy === "rating") result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [productList, selectedCategories, priceRange, searchQuery, sortBy]);

  // Reset to page 1 whenever filters/sort/search change
  const filtersKey = JSON.stringify({
    selectedCategories,
    priceRange,
    searchQuery,
    sortBy,
  });
  const [prevFiltersKey, setPrevFiltersKey] = useState(filtersKey);
  const [currentPage, setCurrentPage] = useState(1);

  if (filtersKey !== prevFiltersKey) {
    setPrevFiltersKey(filtersKey);
    setCurrentPage(1);
  }

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / ITEMS_PER_PAGE),
  );
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <div>
      <PageHero
        image="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80"
        title="Our Products"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/product" },
        ]}
      />

      <section className="w-full bg-white py-8 sm:py-10 md:py-12">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
            ]}
          />

          <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-wide text-amber-900 sm:text-3xl">
                All Products
              </h1>
              <p className="mt-2 text-sm text-neutral-600 sm:text-base">
                {filteredProducts.length}{" "}
                {filteredProducts.length === 1 ? "product" : "products"} found
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
                  selectedCategories.length +
                  (priceRange.min || priceRange.max ? 1 : 0)
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

              <ProductResultsGrid
                products={paginatedProducts}
                onClearFilters={clearAllFilters}
              />

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </Container>
      </section>

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
    </div>
  );
}
