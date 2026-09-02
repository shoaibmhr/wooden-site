import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, ArrowRight } from "lucide-react";
import { products as fallbackProducts } from "../../data/products.data";
import { useDarkMode } from "../context/DarkModeContext";

export default function SearchOverlay({ isOpen, onClose }) {
  const [productList,] = useState(() => fallbackProducts);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();

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
        className={`relative mx-auto mt-0 w-full max-w-2xl shadow-xl sm:mt-20 transition-colors duration-300 ${
          isDarkMode ? "bg-[#1a1410]" : "bg-white"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`flex items-center gap-3 border-b px-4 py-4 sm:px-6 transition-colors duration-300 ${
          isDarkMode ? "border-[#2a1f18]" : "border-neutral-200"
        }`}>
          <Search
            className={`h-5 w-5 shrink-0 ${
              isDarkMode ? "text-[#a89888]" : "text-neutral-400"
            }`}
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
            className={`flex-1 border-none text-sm placeholder-neutral-400 focus:outline-none sm:text-base transition-colors duration-300 ${
              isDarkMode 
                ? "bg-[#1a1410] text-[#e8ddd0] placeholder-[#a89888]" 
                : "bg-white text-neutral-900 placeholder-neutral-400"
            }`}
          />
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close search"
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
              isDarkMode 
                ? "text-[#a89888] hover:bg-[#2a1f18]" 
                : "text-neutral-500 hover:bg-neutral-100"
            }`}
          >
            <X className="h-5 w-5" strokeWidth={1.75} />
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto">
          {query.trim() === "" ? (
            <div className={`px-4 py-10 text-center text-sm sm:px-6 ${
              isDarkMode ? "text-[#a89888]" : "text-neutral-400"
            }`}>
              Start typing to search our products
            </div>
          ) : results.length === 0 ? (
            <div className={`px-4 py-10 text-center text-sm sm:px-6 ${
              isDarkMode ? "text-[#a89888]" : "text-neutral-500"
            }`}>
              No products found for "{query}"
            </div>
          ) : (
            <>
              <ul className={`divide-y transition-colors duration-300 ${
                isDarkMode ? "divide-[#2a1f18]" : "divide-neutral-100"
              }`}>
                {results.map((product) => (
                  <li key={product.id}>
                    <button
                      type="button"
                      onClick={() => handleSelectProduct(product)}
                      className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors sm:px-6 ${
                        isDarkMode 
                          ? "hover:bg-[#2a1f18]" 
                          : "hover:bg-neutral-50"
                      }`}
                    >
                      <div className={`h-14 w-14 shrink-0 overflow-hidden rounded-lg ${
                        isDarkMode ? "bg-[#2a1f18]" : "bg-neutral-100"
                      }`}>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className={`truncate text-sm font-medium sm:text-base ${
                          isDarkMode ? "text-[#e8ddd0]" : "text-neutral-900"
                        }`}>
                          {product.name}
                        </p>
                        <p className={`text-xs sm:text-sm ${
                          isDarkMode ? "text-[#a89888]" : "text-neutral-500"
                        }`}>
                          {product.category}
                        </p>
                      </div>
                      <ArrowRight
                        className={`h-4 w-4 shrink-0 ${
                          isDarkMode ? "text-[#a89888]" : "text-neutral-400"
                        }`}
                        strokeWidth={2}
                      />
                    </button>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={handleViewAllResults}
                className={`flex w-full items-center justify-center gap-2 border-t px-4 py-3.5 text-sm font-semibold transition-colors sm:px-6 ${
                  isDarkMode
                    ? "border-[#2a1f18] text-[#c9974a] hover:bg-[#2a1f18]"
                    : "border-neutral-200 text-amber-900 hover:bg-amber-50"
                }`}
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