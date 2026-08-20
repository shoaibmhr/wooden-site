import { useMemo, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Container from "../components/common/Container";
import PageHero from "../components/common/PageHero";
import Breadcrumbs from "../components/common/Breadcrumbs";
import FilterPanel from "../components/products/FilterPanel";
import MobileFilterDrawer from "../components/products/MobileFilterDrawer";
import ProductToolbar from "../components/products/ProductToolbar";
import ProductResultsGrid from "../components/products/ProductResultsGrid";
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
    setSearchQuery("");
  };

  const filteredProducts = useMemo(() => {
    let result = productList;

    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }
    if (searchQuery.trim() !== "") {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.trim().toLowerCase()),
      );
    }

    result = [...result];
    if (sortBy === "rating") result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [productList, selectedCategories, searchQuery, sortBy]);

  const filtersKey = JSON.stringify({
    selectedCategories,
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
        title="Craftsmanship Showcase Catalog"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Showcase", href: "/products" },
        ]}
      />

      <section className="w-full bg-[#faf6ef] py-10 sm:py-12 md:py-16">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Showcase", href: "/products" },
            ]}
          />

          <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b8863f]">
                Handcrafted Portfolio
              </span>
              <h1 className="font-serif text-2xl font-bold tracking-wide text-[#2b1710] sm:text-3xl">
                Woodwork & Furniture Designs
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-neutral-600">
                Displaying {filteredProducts.length}{" "}
                {filteredProducts.length === 1 ? "design" : "custom designs"}
              </p>
            </div>

            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>

          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Sidebar — desktop */}
            <aside className="hidden w-60 shrink-0 lg:block">
              <FilterPanel
                selectedCategories={selectedCategories}
                onToggleCategory={toggleCategory}
                onClear={clearAllFilters}
              />
            </aside>

            <div className="flex-1">
              <ProductToolbar
                onOpenFilters={() => setIsFilterOpen(true)}
                activeFilterCount={selectedCategories.length}
                sortBy={sortBy}
                onSortChange={setSortBy}
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
        onClear={clearAllFilters}
        resultCount={filteredProducts.length}
      />
    </div>
  );
}
