import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, ArrowRight } from "lucide-react";
import { products as fallbackProducts } from "../../data/products.data";

export default function SearchOverlay({ isOpen, onClose }) {
  const [productList] = useState(() => fallbackProducts);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleClose = () => {
    setQuery("");
    onClose();
  };

  // Lock body scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const results = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return [];
    return productList
      .filter((p) => p.name.toLowerCase().includes(trimmed))
      .slice(0, 6);
  }, [productList, query]);

  const handleSelectProduct = (product) => {
    handleClose();
    navigate(product.href);
  };

  const handleViewAllResults = () => {
    handleClose();
    navigate("/products", { state: { searchQuery: query } });
  };

  return (
    <div
      className={`fixed inset-0 z-[150] transition-opacity duration-300 ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#170e0a]/40 backdrop-blur-[2px]"
        onClick={handleClose}
      />

      {/* Dropdown panel - slides down from top, below navbar */}
      <div
        className={`absolute left-0 right-0 top-0 w-full bg-white shadow-[0_16px_40px_-12px_rgba(28,18,13,0.35)] transition-all duration-300 ease-out ${
          isOpen ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
        }`}
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="flex items-center gap-3 border-b border-[#ecdfc4] py-5">
            <Search
              className="h-5 w-5 shrink-0 text-[#b8863f]"
              strokeWidth={1.75}
            />
            <input
              type="text"
              autoFocus={isOpen}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && query.trim()) handleViewAllResults();
              }}
              placeholder="Search for products, categories..."
              className="flex-1 border-none bg-transparent text-sm text-[#2b1710] placeholder-neutral-400 focus:outline-none sm:text-base"
            />
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close search"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-[#faf6ef]"
            >
              <X className="h-5 w-5" strokeWidth={1.75} />
            </button>
          </div>

          <div className="max-h-[60vh] overflow-y-auto pb-4">
            {query.trim() === "" ? (
              <div className="px-2 py-10 text-center text-sm text-neutral-400">
                Start typing to search our products
              </div>
            ) : results.length === 0 ? (
              <div className="px-2 py-10 text-center text-sm text-neutral-500">
                No products found for "{query}"
              </div>
            ) : (
              <>
                <ul className="divide-y divide-[#ecdfc4]">
                  {results.map((product) => (
                    <li key={product.id}>
                      <button
                        type="button"
                        onClick={() => handleSelectProduct(product)}
                        className="flex w-full items-center gap-3 px-2 py-3 text-left transition-colors hover:bg-[#faf6ef]"
                      >
                        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-[#2b1710] sm:text-base">
                            {product.name}
                          </p>
                          <p className="text-xs text-neutral-500 sm:text-sm">
                            {product.category}
                          </p>
                        </div>
                        <ArrowRight
                          className="h-4 w-4 shrink-0 text-[#b8863f]"
                          strokeWidth={2}
                        />
                      </button>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={handleViewAllResults}
                  className="mt-2 flex w-full items-center justify-center gap-2 border-t border-[#ecdfc4] px-2 py-3.5 text-sm font-semibold text-[#b8863f] transition-colors hover:bg-[#faf6ef]"
                >
                  View all results for "{query}"
                  <ArrowRight className="h-4 w-4" strokeWidth={2} />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
