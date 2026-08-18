import { SlidersHorizontal } from "lucide-react";
import { sortOptions } from "../../data/products.data";

export default function ProductToolbar({
  selectedCount,
  onOpenFilters,
  sortBy,
  onSortChange,
}) {
  return (
    <div className="mb-6 flex items-center justify-between gap-3">
      <button
        type="button"
        onClick={onOpenFilters}
        className="flex items-center gap-2 border border-neutral-300 px-4 py-2.5 text-sm font-medium text-neutral-800 transition-colors hover:border-[#5c1f1f] hover:text-[#5c1f1f] lg:hidden"
      >
        <SlidersHorizontal className="h-4 w-4" strokeWidth={1.75} />
        Filters
        {selectedCount > 0 && (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#5c1f1f] text-[10px] font-semibold text-white">
            {selectedCount}
          </span>
        )}
      </button>

      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="ml-auto border border-neutral-300 bg-white px-3 py-2.5 text-sm text-neutral-800 focus:border-[#5c1f1f] focus:outline-none"
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
