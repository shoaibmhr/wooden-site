import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDarkMode } from "../context/DarkModeContext";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const { isDarkMode } = useDarkMode();

  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mt-10 flex items-center justify-center gap-1.5 sm:mt-12">
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className={`flex h-9 w-9 items-center justify-center border transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
          isDarkMode
            ? "border-[#2a1f18] text-[#a89888] hover:border-[#c9974a] hover:text-[#c9974a] disabled:hover:border-[#2a1f18] disabled:hover:text-[#a89888]"
            : "border-neutral-300 text-neutral-600 hover:border-[#5c1f1f] hover:text-[#5c1f1f] disabled:hover:border-neutral-300 disabled:hover:text-neutral-600"
        }`}
      >
        <ChevronLeft className="h-4 w-4" strokeWidth={1.75} />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          className={`flex h-9 w-9 items-center justify-center text-sm font-medium transition-colors ${
            page === currentPage
              ? isDarkMode
                ? "bg-[#c9974a] text-[#1a1410]"
                : "bg-[#5c1f1f] text-white"
              : isDarkMode
                ? "border border-[#2a1f18] text-[#d4c5b5] hover:border-[#c9974a] hover:text-[#c9974a]"
                : "border border-neutral-300 text-neutral-700 hover:border-[#5c1f1f] hover:text-[#5c1f1f]"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className={`flex h-9 w-9 items-center justify-center border transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
          isDarkMode
            ? "border-[#2a1f18] text-[#a89888] hover:border-[#c9974a] hover:text-[#c9974a] disabled:hover:border-[#2a1f18] disabled:hover:text-[#a89888]"
            : "border-neutral-300 text-neutral-600 hover:border-[#5c1f1f] hover:text-[#5c1f1f] disabled:hover:border-neutral-300 disabled:hover:text-neutral-600"
        }`}
      >
        <ChevronRight className="h-4 w-4" strokeWidth={1.75} />
      </button>
    </div>
  );
}