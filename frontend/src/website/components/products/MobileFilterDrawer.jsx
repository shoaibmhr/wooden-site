import { X } from "lucide-react";
import FilterPanel from "./FilterPanel";

export default function MobileFilterDrawer({
  isOpen,
  onClose,
  selectedCategories,
  onToggleCategory,
  onClear,
  resultCount,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] lg:hidden">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute inset-y-0 left-0 w-full max-w-xs overflow-y-auto bg-[#faf6ef] p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between border-b border-[#ecdfc4] pb-4">
          <h2 className="font-serif text-lg font-bold text-[#2b1710]">Craft Filters</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close filters"
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#2b1710] hover:bg-[#ecdfc4]"
          >
            <X className="h-5 w-5" strokeWidth={1.75} />
          </button>
        </div>

        <FilterPanel
          selectedCategories={selectedCategories}
          onToggleCategory={onToggleCategory}
          onClear={onClear}
        />

        <button
          type="button"
          onClick={onClose}
          className="mt-8 w-full rounded-lg bg-[#2b1710] px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#f0d9a8] transition-colors hover:bg-[#3e2723]"
        >
          View {resultCount} Designs
        </button>
      </div>
    </div>
  );
}
