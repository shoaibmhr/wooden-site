import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useDarkMode } from "../context/DarkModeContext";

export default function Breadcrumbs({ items }) {
  const { isDarkMode } = useDarkMode();

  return (
    <nav aria-label="Breadcrumb" className="mb-4 sm:mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {isLast ? (
                <span className={`font-medium transition-colors duration-300 ${
                  isDarkMode ? "text-[#e8ddd0]" : "text-neutral-800"
                }`}>
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.href}
                  className={`transition-colors duration-300 ${
                    isDarkMode 
                      ? "text-[#a89888] hover:text-[#c9974a]" 
                      : "text-neutral-500 hover:text-amber-900"
                  }`}
                >
                  {item.label}
                </Link>
              )}
              {!isLast && (
                <ChevronRight
                  className={`h-3.5 w-3.5 transition-colors duration-300 ${
                    isDarkMode ? "text-[#a89888]" : "text-neutral-400"
                  }`}
                  strokeWidth={2}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}