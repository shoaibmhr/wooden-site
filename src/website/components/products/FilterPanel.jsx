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
  onClear,
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-widest text-amber-800">
          Category
        </h3>
        {selectedCategories.length > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="text-xs font-medium text-neutral-500 underline transition-colors hover:text-amber-800"
          >
            Clear
          </button>
        )}
      </div>

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
  );
}
