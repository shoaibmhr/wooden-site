import { motion } from "framer-motion";
import { useDarkMode } from "../context/DarkModeContext";

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
  const { isDarkMode } = useDarkMode();

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
            className={`relative px-4 py-2 text-xs font-semibold uppercase tracking-wide sm:px-5 sm:py-2.5 sm:text-sm transition-colors duration-300 ${
              isActive
                ? isDarkMode
                  ? "text-[#1a1410]"
                  : "text-white"
                : isDarkMode
                  ? "border border-[#2a1f18] text-[#a89888] hover:border-[#c9974a] hover:text-[#c9974a]"
                  : "border border-neutral-300 text-neutral-700 hover:border-[#5c1f1f] hover:text-[#5c1f1f]"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="activeFilterBg"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className={`absolute inset-0 ${
                  isDarkMode ? "bg-[#c9974a]" : "bg-[#5c1f1f]"
                }`}
              />
            )}
            <span className="relative">{category}</span>
          </motion.button>
        );
      })}
    </motion.div>
  );
}