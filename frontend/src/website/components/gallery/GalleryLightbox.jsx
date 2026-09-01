import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const WHATSAPP_NUMBER = "923008543635"; // Updated WhatsApp number

export default function GalleryLightbox({ items, activeIndex, onClose, onNavigate }) {
  const [direction, setDirection] = useState(0);

  const isOpen = activeIndex !== null;
  const item = isOpen ? items[activeIndex] : null;

  const whatsappHref = item
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        `Hey Sir!\n\nI hope you're doing well. I was browsing Art By Adeel's gallery and came across "${item.caption}" and was truly impressed by the craftsmanship.\n\nI'm interested in discussing a similar custom piece for my space. Could you please share more details about the design, available wood options, and an estimated price range?\n\nI would love to get your expert advice on this project. Please let me know a suitable time for a quick consultation.\n\nLooking forward to hearing from you!\n\n`
      )}`
    : "#";

  const goPrev = () => {
    setDirection(-1);
    onNavigate((activeIndex - 1 + items.length) % items.length);
  };

  const goNext = () => {
    setDirection(1);
    onNavigate((activeIndex + 1) % items.length);
  };

  const imageVariants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 sm:p-8"
          onClick={onClose}
        >
          <motion.button
            type="button"
            onClick={onClose}
            aria-label="Close"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6 sm:top-6"
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </motion.button>

          <motion.button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            aria-label="Previous image"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2} />
          </motion.button>

          <motion.button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            aria-label="Next image"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={2} />
          </motion.button>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex max-h-full w-full max-w-3xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative flex max-h-[65vh] w-full items-center justify-center overflow-hidden sm:max-h-[70vh]">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.img
                  key={item.image}
                  src={item.image}
                  alt={item.caption}
                  custom={direction}
                  variants={imageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="max-h-[65vh] w-auto rounded-lg object-contain sm:max-h-[70vh]"
                />
              </AnimatePresence>
            </div>

            <motion.div
              key={`caption-${item.image}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="mt-4 w-full text-center"
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
                {item.category}
              </span>
              <p className="mt-1 text-sm text-neutral-200 sm:text-base">{item.caption}</p>

              
               <a href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center bg-[#25D366] px-6 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#1ea952]"
              >
                Interested? Chat with Us
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}