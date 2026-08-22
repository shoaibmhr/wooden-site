import { motion } from "framer-motion";
import { Eye } from "lucide-react";

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04 },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

export default function GalleryMasonryGrid({
  items,
  onSelectItem,
  activeCategory,
}) {
  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="py-16 text-center text-sm text-neutral-500"
      >
        No projects found in this category yet.
      </motion.div>
    );
  }

  return (
    <motion.div
      key={activeCategory}
      variants={container}
      initial="hidden"
      animate="visible"
      className="columns-2 gap-4 sm:columns-3 sm:gap-5 lg:columns-4"
    >
      {items.map((item) => (
        <motion.button
          key={item.id}
          variants={itemVariant}
          type="button"
          onClick={() => onSelectItem(item)}
          className="group relative mb-4 block w-full overflow-hidden rounded-lg break-inside-avoid sm:mb-5"
        >
          <img
            src={item.image}
            alt={item.caption}
            className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/0 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:p-4">
            <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-amber-300">
              <Eye className="h-3.5 w-3.5" strokeWidth={2} />
              {item.category}
            </span>
            <p className="mt-1 text-left text-xs font-medium leading-snug text-white sm:text-sm">
              {item.caption}
            </p>
          </div>
        </motion.button>
      ))}
    </motion.div>
  );
}
