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
    if (sortBy === "rating") result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [productList, categorySlug, sortBy, searchQuery]);

  const customWhatsAppMsg = useMemo(() => {
    if (!currentMeta) return "";
    return encodeURIComponent(
      `Hi Ashtech Wooden! I am looking for custom designs and custom sizing in "${currentMeta.title}". Can you share catalogues and quotes?`,
    );
  }, [currentMeta]);

  if (!currentMeta) {
    return <Navigate to="/products" replace />;
  }

  return (
    <div className="min-h-screen bg-[#faf6ef]">
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
                      ? "bg-[#2b1710] text-[#f0d9a8] shadow-md"
                      : "bg-white text-neutral-700 border border-[#ecdfc4] hover:border-[#2b1710] hover:text-[#2b1710]"
                  }`}
                >
                  {cat.name}
                </Link>
              );
            })}
          </div>

          {/* Category Header & Filter Toolbar */}
          <div className="mt-4 flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6 border border-[#ecdfc4]">
            <div>
              <h1 className="font-serif text-xl font-bold tracking-tight text-[#2b1710] sm:text-2xl md:text-3xl">
                {currentMeta.title}
              </h1>
              <p className="mt-1 max-w-2xl text-xs text-neutral-600 sm:text-sm">
                {currentMeta.description}
              </p>
            </div>

            {/* Search Controls */}
            <div className="flex flex-wrap items-center gap-3">
              <input
                type="text"
                placeholder="Search in this collection..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-lg border border-[#ecdfc4] bg-[#faf6ef] px-3.5 py-2 text-xs text-neutral-800 placeholder-neutral-400 focus:border-[#2b1710] focus:bg-white focus:outline-none sm:text-sm"
              />

              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-neutral-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-lg border border-[#ecdfc4] bg-[#faf6ef] px-3 py-2 text-xs font-medium text-neutral-800 focus:border-[#2b1710] focus:bg-white focus:outline-none sm:text-sm"
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
              <span className="font-bold text-[#2b1710]">
                {categoryProducts.length}
              </span>{" "}
              handcrafted designs
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
              <Sparkles className="h-12 w-12 text-[#b8863f]/40" />
              <h3 className="mt-4 text-lg font-bold text-neutral-900">
                No designs found
              </h3>
              <p className="mt-1 text-sm text-neutral-500">
                Try searching with different keywords or clear the search query.
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="mt-4 rounded-lg bg-[#2b1710] px-5 py-2 text-xs font-semibold uppercase text-[#f0d9a8] hover:bg-[#3e2723]"
              >
                Clear Search
              </button>
            </div>
          )}

          {/* WhatsApp Custom Sizing CTA Banner */}
          <div className="mt-14 overflow-hidden rounded-3xl bg-gradient-to-r from-[#170e0a] via-[#2b1710] to-[#170e0a] p-6 text-white shadow-xl sm:p-10 border border-[#d4af6a]/30">
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <div className="text-center md:text-left">
                <span className="inline-block rounded-full bg-[#d4af6a]/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#d4af6a]">
                  Custom Woodworking & Sizing
                </span>
                <h3 className="mt-2 font-serif text-xl font-bold tracking-tight sm:text-2xl md:text-3xl text-[#f7f0e2]">
                  Need custom dimensions or bespoke carving?
                </h3>
                <p className="mt-2 max-w-xl text-xs text-[#ecdfc4]/80 sm:text-sm">
                  We handcraft furniture in Sheesham, Teak, and Oak according to your exact room blueprint. Chat directly with our master craftsman on WhatsApp!
                </p>
              </div>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${customWhatsAppMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex shrink-0 items-center gap-2.5 rounded-full bg-emerald-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:bg-emerald-500 hover:scale-105"
              >
                <MessageCircle className="h-5 w-5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
