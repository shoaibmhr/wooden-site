import { X } from "lucide-react";
import { useDarkMode } from "../context/DarkModeContext";

export default function FilterChips({
  selectedCategories,
  onRemoveCategory,
  priceRange,
  onClearPrice,
  searchQuery,
  onClearSearch,
}) {
  const { isDarkMode } = useDarkMode();

  const hasChips =
    selectedCategories.length > 0 ||
    priceRange.min !== "" ||
    priceRange.max !== "" ||
    searchQuery;

  if (!hasChips) return null;

  const priceLabel =
    priceRange.min || priceRange.max
      ? `₹${priceRange.min || "0"} – ₹${priceRange.max || "∞"}`
      : null;

  return (
    <div className="mb-4 flex flex-wrap items-center gap-2">
      {searchQuery && (
        <button
          type="button"
          onClick={onClearSearch}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
            isDarkMode 
              ? "bg-[#2a1f18] text-[#d4c5b5] hover:bg-[#3a2f28]" 
              : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
          }`}
        >
          "{searchQuery}"
          <X className={`h-3 w-3 ${
            isDarkMode ? "text-[#a89888]" : "text-neutral-700"
          }`} strokeWidth={2} />
        </button>
      )}

      {selectedCategories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onRemoveCategory(category)}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
            isDarkMode 
              ? "bg-[#2a1f18] text-[#d4c5b5] hover:bg-[#3a2f28]" 
              : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
          }`}
        >
          {category}
          <X className={`h-3 w-3 ${
            isDarkMode ? "text-[#a89888]" : "text-neutral-700"
          }`} strokeWidth={2} />
        </button>
      ))}

      {priceLabel && (
        <button
          type="button"
          onClick={onClearPrice}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
            isDarkMode 
              ? "bg-[#2a1f18] text-[#d4c5b5] hover:bg-[#3a2f28]" 
              : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
          }`}
        >
          {priceLabel}
          <X className={`h-3 w-3 ${
            isDarkMode ? "text-[#a89888]" : "text-neutral-700"
          }`} strokeWidth={2} />
        </button>
      )}
    </div>
  );
}