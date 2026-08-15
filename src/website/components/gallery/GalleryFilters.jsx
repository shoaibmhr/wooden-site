export default function GalleryFilters({
  categories,
  activeCategory,
  onSelect,
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
      {categories.map((category) => {
        const isActive = category === activeCategory;
        return (
          <button
            key={category}
            type="button"
            onClick={() => onSelect(category)}
            className={`rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-wide transition-colors duration-200 sm:text-sm ${
              isActive
                ? "border-[#5C2A2A] bg-[#5C2A2A] text-white"
                : "border-stone-300 text-stone-600 hover:border-[#5C2A2A] hover:text-[#5C2A2A]"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
