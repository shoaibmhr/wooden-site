import { useMemo, useState } from "react";
import Container from "../components/common/Container";
import GalleryFilters from "../components/gallery/GalleryFilters";
import GalleryGrid from "../components/gallery/GalleryGrid";
import GalleryLightbox from "../components/gallery/GalleryLightbox";
import GalleryCTA from "../components/gallery/GalleryCTA";
import { galleryImages, galleryCategories } from "../data/gallery.data";

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeImage, setActiveImage] = useState(null);

  const filteredImages = useMemo(() => {
    if (activeCategory === "All") return galleryImages;
    return galleryImages.filter((img) => img.category === activeCategory);
  }, [activeCategory]);

  return (
    <>
      <section className="w-full bg-white">
        <Container>
          <div className="py-10 sm:py-12 md:py-16">
            <div className="text-center max-w-2xl mx-auto">
              <h1 className="font-serif text-stone-900 tracking-tight leading-snug text-xl sm:text-2xl md:text-3xl">
                Our Work
              </h1>
              <p className="mt-3 text-sm text-stone-500 sm:text-base">
                A look at real pieces we've built for real homes.
              </p>
            </div>

            <div className="mt-8 sm:mt-10">
              <GalleryFilters
                categories={galleryCategories}
                activeCategory={activeCategory}
                onSelect={setActiveCategory}
              />
            </div>

            <div className="mt-8 sm:mt-10">
              <GalleryGrid images={filteredImages} onImageClick={setActiveImage} />
            </div>
          </div>
        </Container>
      </section>

      <GalleryCTA />

      <GalleryLightbox image={activeImage} onClose={() => setActiveImage(null)} />
    </>
  );
}
