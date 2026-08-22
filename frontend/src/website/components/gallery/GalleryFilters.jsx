import { motion } from "framer-motion";

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
};

const buttonVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function GalleryFilter({
  categories,
  activeCategory,
  onSelectCategory,
}) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="flex flex-wrap justify-center gap-2 sm:gap-3"
    >
      {categories.map((category) => {
        const isActive = category === activeCategory;
        return (
          <motion.button
            key={category}
            variants={buttonVariant}
            type="button"
            onClick={() => onSelectCategory(category)}
            whileTap={{ scale: 0.95 }}
            className={`relative px-4 py-2 text-xs font-semibold uppercase tracking-wide sm:px-5 sm:py-2.5 sm:text-sm ${
              isActive
                ? "text-white"
                : "border border-neutral-300 text-neutral-700 transition-colors duration-300 hover:border-[#5c1f1f] hover:text-[#5c1f1f]"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="activeFilterBg"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="absolute inset-0 bg-[#5c1f1f]"
              />
            )}
            <span className="relative">{category}</span>
          </motion.button>
        );
      })}
    </motion.div>
  );
}
