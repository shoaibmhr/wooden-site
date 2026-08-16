export default function GalleryFilter({
  categories,
  activeCategory,
  onSelectCategory,
}) {
  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
      {categories.map((category) => {
        const isActive = category === activeCategory;
        return (
          <button
            key={category}
            type="button"
            onClick={() => onSelectCategory(category)}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors duration-300 sm:px-5 sm:py-2.5 sm:text-sm ${
              isActive
                ? "bg-[#5c1f1f] text-white"
                : "border border-neutral-300 text-neutral-700 hover:border-[#5c1f1f] hover:text-[#5c1f1f]"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
