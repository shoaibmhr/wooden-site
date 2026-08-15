import { X } from "lucide-react";
import FilterPanel from "./FilterPanel";

export default function MobileFilterDrawer({
  isOpen,
  onClose,
  selectedCategories,
  onToggleCategory,
  priceRange,
  onPriceChange,
  onClear,
  resultCount,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] lg:hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute inset-y-0 left-0 w-full max-w-xs overflow-y-auto bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-base font-bold text-neutral-900">Filters</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close filters"
            className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-600 hover:bg-neutral-100"
          >
            <X className="h-5 w-5" strokeWidth={1.75} />
          </button>
        </div>

        <FilterPanel
          selectedCategories={selectedCategories}
          onToggleCategory={onToggleCategory}
          priceRange={priceRange}
          onPriceChange={onPriceChange}
          onClear={onClear}
        />

        <button
          type="button"
          onClick={onClose}
          className="mt-8 w-full bg-[#5c1f1f] px-4 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-[#732929]"
        >
          Show {resultCount} Results
        </button>
      </div>
    </div>
  );
}
