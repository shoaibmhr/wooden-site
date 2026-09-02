import { Search, X } from "lucide-react";
import { useDarkMode } from "../context/DarkModeContext";

export default function SearchBar({ value, onChange }) {
  const { isDarkMode } = useDarkMode();

  return (
    <div className="relative w-full sm:max-w-xs">
      <Search
        className={`pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${
          isDarkMode ? "text-[#a89888]" : "text-neutral-400"
        }`}
        strokeWidth={1.75}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search products..."
        className={`w-full border py-2.5 pl-9 pr-8 text-sm focus:outline-none transition-colors duration-300 ${
          isDarkMode
            ? "border-[#2a1f18] bg-[#1a1410] text-[#e8ddd0] placeholder-[#a89888] focus:border-[#c9974a]"
            : "border-neutral-300 bg-white text-neutral-900 placeholder-neutral-400 focus:border-[#5c1f1f]"
        }`}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className={`absolute right-2.5 top-1/2 -translate-y-1/2 transition-colors ${
            isDarkMode 
              ? "text-[#a89888] hover:text-[#e8ddd0]" 
              : "text-neutral-400 hover:text-neutral-700"
          }`}
        >
          <X className="h-4 w-4" strokeWidth={1.75} />
        </button>
      )}
    </div>
  );
}