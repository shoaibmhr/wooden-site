import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { useDarkMode } from "../context/DarkModeContext";

export default function CategoryProductCard({ product }) {
  const { isDarkMode } = useDarkMode();
  const targetHref = product.href || `/products/${product.slug || product.id}`;

  return (
    <div className={`group relative flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1.5 hover:border-[#d4af6a] hover:shadow-xl ${
      isDarkMode 
        ? "border-[#2a1f18] bg-[#1a1410] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.5)]" 
        : "border-[#ecdfc4] bg-white hover:shadow-xl"
    }`}>
      {/* Image Block */}
      <Link
        to={targetHref}
        className="relative block aspect-[4/3] w-full overflow-hidden bg-neutral-100"
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <span className="absolute left-3 top-3 z-10 rounded-md bg-[#170e0a]/85 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#f0d9a8] border border-[#d4af6a]/30 shadow-md">
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

        <p className={`mt-1 line-clamp-2 text-xs leading-relaxed ${
          isDarkMode ? "text-[#a89888]" : "text-[#5c4a3b]"
        }`}>
          {product.description}
        </p>

        <div className={`mt-3 flex items-center gap-1.5 text-xs border-t pt-3 ${
          isDarkMode 
            ? "text-[#a89888] border-[#2a1f18]" 
            : "text-[#5c4a3b] border-[#ecdfc4]/60"
        }`}>
          <ShieldCheck className="h-3.5 w-3.5 text-[#b8863f] shrink-0" />
          <span>Bespoke Sizing & Premium Polish Finish</span>
        </div>

        {/* Button */}
        <div className="mt-4">
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