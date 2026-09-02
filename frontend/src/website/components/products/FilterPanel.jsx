import { useState } from "react";
import { products as fallbackProducts } from "../../data/products.data";
import { useDarkMode } from "../context/DarkModeContext";

function buildCategoryList() {
  const seen = new Map();
  fallbackProducts.forEach((product) => {
    if (product.category && !seen.has(product.category)) {
      seen.set(product.category, {
        id: product.categorySlug || product.category,
        name: product.category,
      });
    }
  });
  return Array.from(seen.values());
}

export default function FilterPanel({
  selectedCategories,
  onToggleCategory,
  onClear,
}) {
  const [categories] = useState(() => buildCategoryList());
  const { isDarkMode } = useDarkMode();

  const hasActiveFilters = selectedCategories.length > 0;

  return (
    <div className={`rounded-xl border p-5 shadow-sm transition-colors duration-300 ${
      isDarkMode 
        ? "border-[#2a1f18] bg-[#1a1410]" 
        : "border-[#ecdfc4] bg-[#faf6ef]"
    }`}>
      <div className={`flex items-center justify-between border-b pb-3 transition-colors duration-300 ${
        isDarkMode ? "border-[#2a1f18]" : "border-[#ecdfc4]"
      }`}>
        <h3 className={`text-xs font-bold uppercase tracking-widest ${
          isDarkMode ? "text-[#e8ddd0]" : "text-[#2b1710]"
        }`}>
          Craft Categories
        </h3>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClear}
            className={`text-xs font-semibold underline transition-colors ${
              isDarkMode 
                ? "text-[#c9974a] hover:text-[#e8ddd0]" 
                : "text-[#b8863f] hover:text-[#2b1710]"
            }`}
          >
            Clear all
          </button>
        )}
      </div>

      <div className="mt-4">
        <ul className="space-y-3">
          {categories.map((category) => (
            <li key={category.id}>
              <label className={`flex cursor-pointer items-center gap-2.5 text-xs sm:text-sm font-medium transition-colors ${
                isDarkMode 
                  ? "text-[#a89888] hover:text-[#e8ddd0]" 
                  : "text-[#5c4a3b] hover:text-[#2b1710]"
              }`}>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.name)}
                  onChange={() => onToggleCategory(category.name)}
                  className={`h-4 w-4 rounded transition-colors ${
                    isDarkMode 
                      ? "border-[#2a1f18] bg-[#1a1410] text-[#c9974a] focus:ring-[#c9974a] focus:ring-offset-[#1a1410]" 
                      : "border-[#ecdfc4] text-[#2b1710] focus:ring-[#b8863f]"
                  }`}
                />
                {category.name}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Bespoke Customization Box */}
      <div className={`mt-8 rounded-lg border p-4 transition-colors duration-300 ${
        isDarkMode 
          ? "border-[#c9974a]/30 bg-[#1a1410] text-[#e8ddd0]" 
          : "border-[#d4af6a]/30 bg-[#170e0a] text-[#f0d9a8]"
      }`}>
        <p className={`text-[11px] font-bold uppercase tracking-wider ${
          isDarkMode ? "text-[#c9974a]" : "text-[#d4af6a]"
        }`}>
          Bespoke Customization
        </p>
        <p className={`mt-1 text-[11px] leading-relaxed ${
          isDarkMode ? "text-[#a89888]" : "text-[#ecdfc4]/80"
        }`}>
          All designs can be adapted to your room measurements and preferred
          wood species (Teak, Sheesham, Oak).
        </p>
      </div>
    </div>
  );
}