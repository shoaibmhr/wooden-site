import { useMemo, useState } from "react";
import Container from "../components/common/Container";
import PageHero from "../components/common/PageHero";
import GalleryFilter from "../components/gallery/GalleryFilters";
import GalleryMasonryGrid from "../components/gallery/GalleryMasonryGrid";
import GalleryLightbox from "../components/gallery/GalleryLightbox";
import GalleryCTA from "../components/gallery/GalleryCTA";
import { categories, galleryItems } from "../data/gallery.data";

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeIndex, setActiveIndex] = useState(null);

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return galleryItems;
    return galleryItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const handleSelectItem = (item) => {
    const index = filteredItems.findIndex((i) => i.id === item.id);
    setActiveIndex(index);
  };

  return (
    <div>
      <PageHero
        image="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80"
        title="Gallery"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Gallery", href: "/gallery" },
        ]}
      />

      <section className="w-full bg-white py-10 sm:py-12 md:py-16">
        <Container>
          <GalleryFilter
            categories={categories}
            activeCategory={activeCategory}
            onSelectCategory={(category) => {
              setActiveCategory(category);
              setActiveIndex(null);
            }}
          />

          <div className="mt-8 sm:mt-10">
            <GalleryMasonryGrid items={filteredItems} onSelectItem={handleSelectItem} />
          </div>
        </Container>
      </section>

      <GalleryLightbox
        items={filteredItems}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />

      <GalleryCTA />
    </div>
  );
}
