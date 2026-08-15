import { X } from "lucide-react";

export default function GalleryLightbox({ image, onClose }) {
  if (!image) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8">
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />

      <div className="relative w-full max-w-3xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute -top-10 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-200 hover:bg-white/20 sm:-top-12"
        >
          <X className="h-5 w-5" strokeWidth={1.75} />
        </button>

        <img
          src={image.src}
          alt={image.alt}
          className="max-h-[75vh] w-full rounded-lg object-contain"
        />

        <div className="mt-4 flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-sm text-stone-300">{image.alt}</p>
          <a
            href={`https://wa.me/919509658944?text=${encodeURIComponent(
              `Hi, I'm interested in something like this: ${image.alt}`,
            )}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-[#25D366] px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-white transition-colors duration-200 hover:bg-[#1ea952] sm:text-sm"
          >
            Interested? Chat with us
          </a>
        </div>
      </div>
    </div>
  );
}
