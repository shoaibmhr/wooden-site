import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, ArrowRight } from "lucide-react";
import { getProducts } from "../../../services/api";
import { products as fallbackProducts } from "../../data/products.data";

export default function SearchOverlay({ isOpen, onClose }) {
  const [productList, setProductList] = useState(() => fallbackProducts);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    getProducts().then((data) => {
      if (isMounted && data && data.length > 0) {
        setProductList(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleClose = () => {
    setQuery("");
    onClose();
  };

  
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150]" onClick={handleClose}>
      <div className="absolute inset-0 bg-black/50" />

      <div
        className="relative mx-auto mt-0 w-full max-w-2xl bg-white shadow-xl sm:mt-20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-neutral-200 px-4 py-4 sm:px-6">
          <Search
            className="h-5 w-5 shrink-0 text-neutral-400"
            strokeWidth={1.75}
          />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && query.trim()) handleViewAllResults();
            }}
            placeholder="Search for beds, sofas, dining sets..."
            className="flex-1 border-none text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none sm:text-base"
          />
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close search"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-100"
          >
            <X className="h-5 w-5" strokeWidth={1.75} />
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto">
          {query.trim() === "" ? (
            <div className="px-4 py-10 text-center text-sm text-neutral-400 sm:px-6">
              Start typing to search our products
            </div>
          ) : results.length === 0 ? (
            <div className="px-4 py-10 text-center text-sm text-neutral-500 sm:px-6">
              No products found for "{query}"
            </div>
          ) : (
            <>
              <ul className="divide-y divide-neutral-100">
                {results.map((product) => (
                  <li key={product.id}>
                    <button
                      type="button"
                      onClick={() => handleSelectProduct(product)}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-neutral-50 sm:px-6"
                    >
                      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-neutral-900 sm:text-base">
                          {product.name}
                        </p>
                        <p className="text-xs text-neutral-500 sm:text-sm">
                          {product.category}
                        </p>
                      </div>
                      <ArrowRight
                        className="h-4 w-4 shrink-0 text-neutral-400"
                        strokeWidth={2}
                      />
                    </button>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={handleViewAllResults}
                className="flex w-full items-center justify-center gap-2 border-t border-neutral-200 px-4 py-3.5 text-sm font-semibold text-amber-900 transition-colors hover:bg-amber-50 sm:px-6"
              >
                View all results for "{query}"
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
