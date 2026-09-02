import ProductCard from "../common/ProductCard";
import { useDarkMode } from "../context/DarkModeContext";

export default function ProductResultsGrid({ products, onClearFilters }) {
  const { isDarkMode } = useDarkMode();

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className={isDarkMode ? "text-[#a89888]" : "text-neutral-600"}>
          No products match the selected filters.
        </p>
        <button
          type="button"
          onClick={onClearFilters}
          className={`mt-4 text-sm font-semibold underline transition-colors ${
            isDarkMode 
              ? "text-[#c9974a] hover:text-[#b8863f]" 
              : "text-[#5c1f1f] hover:text-[#7a2a2a]"
          }`}
        >
          Clear filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}