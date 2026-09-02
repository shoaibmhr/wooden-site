import { SlidersHorizontal } from "lucide-react";
import { sortOptions } from "../../data/products.data";
import { useDarkMode } from "../context/DarkModeContext";

export default function ProductToolbar({
  selectedCount,
  onOpenFilters,
  sortBy,
  onSortChange,
}) {
  const { isDarkMode } = useDarkMode();

  return (
    <div className="mb-6 flex items-center justify-between gap-3">
      <button
        type="button"
        onClick={onOpenFilters}
        className={`flex items-center gap-2 border px-4 py-2.5 text-sm font-medium transition-colors lg:hidden ${
          isDarkMode
            ? "border-[#2a1f18] text-[#d4c5b5] hover:border-[#c9974a] hover:text-[#c9974a]"
            : "border-neutral-300 text-neutral-800 hover:border-[#5c1f1f] hover:text-[#5c1f1f]"
        }`}
      >
        <SlidersHorizontal className="h-4 w-4" strokeWidth={1.75} />
        Filters
        {selectedCount > 0 && (
          <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-semibold text-white ${
            isDarkMode ? "bg-[#c9974a]" : "bg-[#5c1f1f]"
          }`}>
            {selectedCount}
          </span>
        )}
      </button>

      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className={`border px-3 py-2.5 text-sm focus:outline-none transition-colors duration-300 ${
          isDarkMode
            ? "border-[#2a1f18] bg-[#1a1410] text-[#e8ddd0] focus:border-[#c9974a]"
            : "border-neutral-300 bg-white text-neutral-800 focus:border-[#5c1f1f]"
        }`}
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}