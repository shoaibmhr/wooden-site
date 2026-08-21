import { X, ChevronLeft, ChevronRight } from "lucide-react";

const WHATSAPP_NUMBER = "923027069093";

export default function GalleryLightbox({ items, activeIndex, onClose, onNavigate }) {
  if (activeIndex === null) return null;

  const item = items[activeIndex];
  const whatsappMessage = encodeURIComponent(
    `Hi, I saw "${item.caption}" in your gallery and I'm interested in something similar.`
  );
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  const goPrev = () => onNavigate((activeIndex - 1 + items.length) % items.length);
  const goNext = () => onNavigate((activeIndex + 1) % items.length);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 sm:p-8"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6 sm:top-6"
      >
        <X className="h-5 w-5" strokeWidth={2} />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          goPrev();
        }}
        aria-label="Previous image"
        className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6"
      >
        <ChevronLeft className="h-5 w-5" strokeWidth={2} />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          goNext();
        }}
        aria-label="Next image"
        className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
      >
        <ChevronRight className="h-5 w-5" strokeWidth={2} />
      </button>

      <div
        className="flex max-h-full w-full max-w-3xl flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={item.image}
          alt={item.caption}
          className="max-h-[65vh] w-auto rounded-lg object-contain sm:max-h-[70vh]"
        />

        <div className="mt-4 w-full text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
            {item.category}
          </span>
          <p className="mt-1 text-sm text-neutral-200 sm:text-base">{item.caption}</p>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center bg-[#25D366] px-6 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#1ea952]"
          >
            Interested? Chat with Us
          </a>
        </div>
      </div>
    </div>
  );
}
