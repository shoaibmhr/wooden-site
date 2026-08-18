const categories = [
  "Wooden Bed",
  "Dining Set",
  "Sofa",
  "Stool",
  "Study Table",
  "TV Unit",
  "Wooden Bench",
  "Coffee Table",
  "Wall Decor",
  "Swing",
];

export default function FilterPanel({
  selectedCategories,
  onToggleCategory,
  priceRange,
  onPriceChange,
  onClear,
}) {
  const hasActiveFilters =
    selectedCategories.length > 0 ||
    priceRange.min !== "" ||
    priceRange.max !== "";

  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-widest text-amber-800">
          Filters
        </h3>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClear}
            className="text-xs font-medium text-neutral-500 underline transition-colors hover:text-amber-800"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Category */}
      <div className="mt-5">
        <h4 className="text-xs font-bold uppercase tracking-widest text-amber-800">
          Category
        </h4>
        <ul className="mt-4 space-y-3">
          {categories.map((category) => (
            <li key={category}>
              <label className="flex cursor-pointer items-center gap-2.5 text-sm text-neutral-700">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => onToggleCategory(category)}
                  className="h-4 w-4 rounded border-neutral-300 text-[#5c1f1f] focus:ring-[#5c1f1f]"
                />
                {category}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Range */}
      <div className="mt-8">
        <h4 className="text-xs font-bold uppercase tracking-widest text-amber-800">
          Price Range
        </h4>
        <div className="mt-4 flex items-center gap-2">
          <div className="flex-1">
            <label className="text-xs text-neutral-500">Min</label>
            <input
              type="number"
              min="0"
              placeholder="₹0"
              value={priceRange.min}
              onChange={(e) =>
                onPriceChange({ ...priceRange, min: e.target.value })
              }
              className="mt-1 w-full border border-neutral-300 px-2.5 py-2 text-sm focus:border-[#5c1f1f] focus:outline-none"
            />
          </div>
          <span className="mt-5 text-neutral-400">–</span>
          <div className="flex-1">
            <label className="text-xs text-neutral-500">Max</label>
            <input
              type="number"
              min="0"
              placeholder="₹1,00,000"
              value={priceRange.max}
              onChange={(e) =>
                onPriceChange({ ...priceRange, max: e.target.value })
              }
              className="mt-1 w-full border border-neutral-300 px-2.5 py-2 text-sm focus:border-[#5c1f1f] focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}


