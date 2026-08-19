import { useMemo, useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import Container from "../components/common/Container";
import Breadcrumbs from "../components/common/Breadcrumbs";
import PageHero from "../components/common/PageHero";
import CategoryProductCard from "../components/products/CategoryProductCard";
import { getProducts } from "../../services/api";
import {
  products as fallbackProducts,
  categoryMeta,
  sortOptions,
} from "../data/products.data";
import { MessageCircle, SlidersHorizontal, Sparkles } from "lucide-react";

// WhatsApp number for Ashtech Wooden
const WHATSAPP_NUMBER = "923027069093";

const allCategoriesList = [
  { slug: "bed", name: "Beds" },
  { slug: "dining-set", name: "Dining Sets" },
  { slug: "swing", name: "Jhula & Swings" },
  { slug: "sofa", name: "Sofas" },
  { slug: "stool", name: "Stools" },
  { slug: "temple", name: "Pooja Temples" },
];

export default function CategoryPage() {
  const { categorySlug } = useParams();
  const [productList, setProductList] = useState(() => fallbackProducts);
  const [sortBy, setSortBy] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");

  const currentMeta = categoryMeta[categorySlug];

  useEffect(() => {
    let isMounted = true;
    if (categorySlug) {
      getProducts({ category_slug: categorySlug }).then((data) => {
        if (isMounted && data && data.length > 0) {
          setProductList(data);
        }
      });
    }
    return () => {
      isMounted = false;
    };
  }, [categorySlug]);

  // 1. All hooks must run BEFORE any early return
  const categoryProducts = useMemo(() => {
    if (!categorySlug) return [];
    let result = productList.filter(
      (p) =>
        p.categorySlug === categorySlug ||
        p.categorySlug === "" ||
        p.category?.toLowerCase() === categorySlug,
    );

    if (searchQuery.trim() !== "") {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.trim().toLowerCase()),
      );
    }

    result = [...result];
    if (sortBy === "price-low") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") result.sort((a, b) => b.price - a.price);
    if (sortBy === "rating") result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [productList, categorySlug, sortBy, searchQuery]);

  const customWhatsAppMsg = useMemo(() => {
    if (!currentMeta) return "";
    return encodeURIComponent(
      `Hi Ashtech Wooden! I am looking for custom designs and custom sizing in "${currentMeta.title}". Can you share catalogues and quotes?`,
    );
  }, [currentMeta]);

  // 2. Early return AFTER all hooks
  if (!currentMeta) {
    return <Navigate to="/products" replace />;
  }

  return (
    <div className="min-h-screen bg-[#fdfbf7]">
      {/* Dynamic Hero Banner */}
      <PageHero
        image={currentMeta.heroImage}
        title={currentMeta.title}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Collections", href: "/products" },
          {
            label: currentMeta.categoryName,
            href: `/category/${categorySlug}`,
          },
        ]}
      />

      <section className="w-full py-8 sm:py-10 md:py-14">
        <Container>
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Collections", href: "/products" },
              {
                label: currentMeta.categoryName,
                href: `/category/${categorySlug}`,
              },
            ]}
          />

          {/* Quick Category Navigation Pills */}
          <div className="my-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="shrink-0 text-xs font-bold uppercase tracking-wider text-neutral-400">
              Browse:
            </span>
            {allCategoriesList.map((cat) => {
              const isActive = cat.slug === categorySlug;
              return (
                <Link
                  key={cat.slug}
                  to={`/category/${cat.slug}`}
                  className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-[#5c1f1f] text-white shadow-md"
                      : "bg-white text-neutral-700 border border-neutral-200 hover:border-amber-900/40 hover:text-amber-900"
                  }`}
                >
                  {cat.name}
                </Link>
              );
            })}
          </div>

          {/* Category Header & Filter Toolbar */}
          <div className="mt-4 flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6 border border-amber-900/10">
            <div>
              <h1 className="text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl md:text-3xl">
                {currentMeta.title}
              </h1>
              <p className="mt-1 max-w-2xl text-xs text-neutral-600 sm:text-sm">
                {currentMeta.description}
              </p>
            </div>

            {/* Sort & Search Controls */}
            <div className="flex flex-wrap items-center gap-3">
              <input
                type="text"
                placeholder="Search in this category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-lg border border-neutral-200 bg-neutral-50 px-3.5 py-2 text-xs text-neutral-800 placeholder-neutral-400 focus:border-[#5c1f1f] focus:bg-white focus:outline-none sm:text-sm"
              />

              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-neutral-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-xs font-medium text-neutral-800 focus:border-[#5c1f1f] focus:bg-white focus:outline-none sm:text-sm"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results Info Count */}
          <div className="mt-6 flex items-center justify-between px-1">
            <p className="text-xs font-medium text-neutral-500 sm:text-sm">
              Showing{" "}
              <span className="font-bold text-neutral-900">
                {categoryProducts.length}
              </span>{" "}
              handcrafted items
            </p>
          </div>

          {/* Product Grid */}
          {categoryProducts.length > 0 ? (
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
              {categoryProducts.map((product) => (
                <CategoryProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="my-12 flex flex-col items-center justify-center rounded-2xl bg-white p-12 text-center shadow-sm">
              <Sparkles className="h-12 w-12 text-amber-800/40" />
              <h3 className="mt-4 text-lg font-bold text-neutral-900">
                No products found
              </h3>
              <p className="mt-1 text-sm text-neutral-500">
                Try searching with different keywords or clear the search query.
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="mt-4 rounded-lg bg-[#5c1f1f] px-5 py-2 text-xs font-semibold uppercase text-white hover:bg-[#732929]"
              >
                Clear Search
              </button>
            </div>
          )}

          {/* WhatsApp Custom Sizing CTA Banner */}
          <div className="mt-14 overflow-hidden rounded-3xl bg-gradient-to-r from-amber-950 via-[#5c1f1f] to-amber-900 p-6 text-white shadow-xl sm:p-10">
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <div className="text-center md:text-left">
                <span className="inline-block rounded-full bg-amber-400/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-200">
                  Custom Woodworking & Sizing
                </span>
                <h3 className="mt-2 text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">
                  Need a custom dimension or bespoke carving?
                </h3>
                <p className="mt-2 max-w-xl text-xs text-amber-100 sm:text-sm">
                  We handcraft furniture in Sheesham, Teak, and Rosewood
                  according to your exact room blueprint. Chat directly with our
                  master craftsmen on WhatsApp!
                </p>
              </div>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${customWhatsAppMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex shrink-0 items-center gap-2.5 rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:bg-[#1ea952] hover:scale-105"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp Custom Sizing
              </a>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
