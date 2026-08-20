import { useEffect, useState } from "react";
import { getCategories } from "../../../services/api";

export default function FilterPanel({
  selectedCategories,
  onToggleCategory,
  onClear,
}) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let isMounted = true;
    getCategories().then((data) => {
      if (isMounted && data) {
        setCategories(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const hasActiveFilters = selectedCategories.length > 0;

  return (
    <div className="rounded-xl border border-[#ecdfc4] bg-[#faf6ef] p-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-[#ecdfc4] pb-3">
        <h3 className="text-xs font-bold uppercase tracking-widest text-[#2b1710]">
          Craft Categories
        </h3>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClear}
            className="text-xs font-semibold text-[#b8863f] underline hover:text-[#2b1710]"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Category List */}
      <div className="mt-4">
        <ul className="space-y-3">
          {categories.map((category) => (
            <li key={category.id}>
              <label className="flex cursor-pointer items-center gap-2.5 text-xs sm:text-sm font-medium text-[#5c4a3b] hover:text-[#2b1710]">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.name)}
                  onChange={() => onToggleCategory(category.name)}
                  className="h-4 w-4 rounded border-[#ecdfc4] text-[#2b1710] focus:ring-[#b8863f]"
                />
                {category.name}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Craftsmanship Info Badge */}
      <div className="mt-8 rounded-lg border border-[#d4af6a]/30 bg-[#170e0a] p-4 text-[#f0d9a8]">
        <p className="text-[11px] font-bold uppercase tracking-wider text-[#d4af6a]">
          Bespoke Customization
        </p>
        <p className="mt-1 text-[11px] leading-relaxed text-[#ecdfc4]/80">
          All designs can be adapted to your room measurements and preferred wood species (Teak, Sheesham, Oak).
        </p>
      </div>
    </div>
  );
}
