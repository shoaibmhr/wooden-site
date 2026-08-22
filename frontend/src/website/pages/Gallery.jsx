import { useMemo, useState, } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import Container from "../components/common/Container";
import PageHero from "../components/common/PageHero";
import GalleryFilter from "../components/gallery/GalleryFilters";
import GalleryMasonryGrid from "../components/gallery/GalleryMasonryGrid";
import GalleryLightbox from "../components/gallery/GalleryLightbox";
import GalleryCTA from "../components/gallery/GalleryCTA";
import { categories, galleryItems } from "../data/gallery.data";


const categorySlugMap = {
  "living-room": "Living Room",
  bedroom: "Bedroom",
  dining: "Dining",
  office: "Office",
  entryway: "Entryway",
  decor: "Decor",
  outdoor: "Outdoor",
  workshop: "Workshop",
};

export default function Gallery() {
  const [searchParams] = useSearchParams();
  const categoryFromUrl =
    categorySlugMap[searchParams.get("category")] || "All";

  const [activeCategory, setActiveCategory] = useState(categoryFromUrl);
  const [activeIndex, setActiveIndex] = useState(null);

  
  const [lastSyncedCategory, setLastSyncedCategory] = useState(categoryFromUrl);
  if (categoryFromUrl !== lastSyncedCategory) {
    setLastSyncedCategory(categoryFromUrl);
    setActiveCategory(categoryFromUrl);
    setActiveIndex(null);
  }
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
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.08, ease: "easeOut" }}
          >
            <GalleryFilter
              categories={categories}
              activeCategory={activeCategory}
              onSelectCategory={(category) => {
                setActiveCategory(category);
                setActiveIndex(null);
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            className="mt-8 sm:mt-10"
          >
            <GalleryMasonryGrid
              items={filteredItems}
              onSelectItem={handleSelectItem}
              activeCategory={activeCategory}
            />
          </motion.div>
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
