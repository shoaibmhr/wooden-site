export default function GalleryGrid({ images, onImageClick }) {
  if (images.length === 0) {
    return (
      <p className="py-16 text-center text-sm text-stone-500">
        No photos in this category yet.
      </p>
    );
  }

  return (
    <div className="columns-2 gap-3 sm:columns-3 sm:gap-4 lg:columns-4">
      {images.map((image) => (
        <button
          key={image.id}
          type="button"
          onClick={() => onImageClick(image)}
          className="group mb-3 block w-full overflow-hidden rounded-lg break-inside-avoid sm:mb-4"
        >
          <img
            src={image.src}
            alt={image.alt}
            className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </button>
      ))}
    </div>
  );
}
