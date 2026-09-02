import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { useDarkMode } from "../context/DarkModeContext";

export default function ProductCard({ product }) {
  const { isDarkMode } = useDarkMode();
  const targetHref = product.href || `/products/${product.slug || product.id}`;

  return (
    <div className={`group flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1.5 hover:border-[#d4af6a] hover:shadow-[0_14px_36px_rgba(43,23,16,0.12)] ${
      isDarkMode 
        ? "border-[#2a1f18] bg-[#1a1410] hover:shadow-[0_14px_36px_rgba(0,0,0,0.4)]" 
        : "border-[#ecdfc4]/80 bg-white hover:shadow-[0_14px_36px_rgba(43,23,16,0.12)]"
    }`}>
      {/* Photo Block */}
      <Link to={targetHref} className="relative block aspect-[4/3] sm:aspect-square w-full overflow-hidden bg-neutral-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <span className="absolute left-3 top-3 rounded-md bg-[#170e0a]/85 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#f0d9a8] border border-[#d4af6a]/30 shadow-md">
          {product.category || "Custom Hardwood"}
        </span>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <Link to={targetHref}>
          <h3 className={`line-clamp-1 font-serif text-base font-bold transition-colors duration-200 hover:text-[#b8863f] sm:text-lg ${
            isDarkMode ? "text-[#e8ddd0]" : "text-[#2b1710]"
          }`}>
            {product.name}
          </h3>
        </Link>

        <div className={`mt-2 flex items-center gap-1.5 text-xs ${
          isDarkMode ? "text-[#a89888]" : "text-[#5c4a3b]"
        }`}>
          <ShieldCheck className="h-3.5 w-3.5 text-[#b8863f] shrink-0" />
          <span className="line-clamp-1">Built to Custom Size & Timber Selection</span>
        </div>

        <div className={`mt-4 border-t pt-3 ${
          isDarkMode ? "border-[#2a1f18]" : "border-[#ecdfc4]/60"
        }`}>
          <Link
            to={targetHref}
            className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-bold uppercase tracking-wider shadow-sm transition-all duration-300 hover:shadow-md ${
              isDarkMode
                ? "bg-[#c9974a] text-[#1a1410] hover:bg-[#b8863f]"
                : "bg-[#2b1710] text-[#f0d9a8] hover:bg-[#3e2723]"
            }`}
          >
            <span>View Specs & Inquire</span>
            <ArrowRight className={`h-4 w-4 ${
              isDarkMode ? "text-[#1a1410]" : "text-[#d4af6a]"
            }`} />
          </Link>
        </div>
      </div>
    </div>
  );
}