import { useEffect, useRef, useState } from "react";
import { useDarkMode } from "../context/DarkModeContext";

export default function StoreIntroBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`w-full border-y transition-colors duration-300 ${
        isDarkMode 
          ? "bg-[#1a1410] border-[#2a1f18]" 
          : "bg-[#FAF6EF] border-[#17130F]/10"
      }`}
    >
      <div className="mx-auto max-w-4xl text-center px-4 py-14 sm:px-6 sm:py-16 md:py-20">
        <span
          className={`block text-[11px] font-medium uppercase tracking-[0.3em] mb-4 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          } ${
            isDarkMode ? "text-[#c9974a]" : "text-[#A9793C]"
          }`}
          style={{ transitionDelay: "100ms" }}
        >
          The WoodenSite Store
        </span>

        <h2
          className={`font-serif tracking-tight leading-tight text-2xl sm:text-3xl md:text-4xl transition-all duration-[900ms] ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          } ${
            isDarkMode ? "text-[#e8ddd0]" : "text-[#17130F]"
          }`}
          style={{ transitionDelay: "220ms" }}
        >
          Affordable, solid wood
          <span className={isDarkMode ? "text-[#c9974a]" : "text-[#A9793C]"}>.</span> Built to order
          <span className={isDarkMode ? "text-[#c9974a]" : "text-[#A9793C]"}>.</span>
        </h2>

        <p
          className={`mt-4 text-sm sm:text-base max-w-xl mx-auto leading-relaxed transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          } ${
            isDarkMode ? "text-[#a89888]" : "text-[#5C5142]"
          }`}
          style={{ transitionDelay: "380ms" }}
        >
          Every piece is finished to your specification, with polish
          customisation included at no additional cost.
        </p>

        {/* Stat row */}
        <div
          className={`mt-9 flex items-center justify-center gap-6 sm:gap-10 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          } ${
            isDarkMode ? "text-[#e8ddd0]" : "text-[#17130F]"
          }`}
          style={{ transitionDelay: "520ms" }}
        >
          <div>
            <div className="font-serif text-xl sm:text-2xl">3000+</div>
            <div className={`mt-1 text-[10px] uppercase tracking-[0.15em] ${
              isDarkMode ? "text-[#a89888]" : "text-[#5C5142]"
            }`}>
              Products
            </div>
          </div>
          <span className={`h-8 w-px ${
            isDarkMode ? "bg-[#2a1f18]" : "bg-[#17130F]/10"
          }`} />
          <div>
            <div className="font-serif text-xl sm:text-2xl">100%</div>
            <div className={`mt-1 text-[10px] uppercase tracking-[0.15em] ${
              isDarkMode ? "text-[#a89888]" : "text-[#5C5142]"
            }`}>
              Solid Wood
            </div>
          </div>
          <span className={`h-8 w-px ${
            isDarkMode ? "bg-[#2a1f18]" : "bg-[#17130F]/10"
          }`} />
          <div>
            <div className="font-serif text-xl sm:text-2xl">Free</div>
            <div className={`mt-1 text-[10px] uppercase tracking-[0.15em] ${
              isDarkMode ? "text-[#a89888]" : "text-[#5C5142]"
            }`}>
              Polish Customisation
            </div>
          </div>
        </div>

        <div
          className={`mt-10 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "660ms" }}
        >
          <a
            href="/products"
            className={`inline-block tracking-[0.15em] font-semibold uppercase text-xs sm:text-sm px-8 py-3.5 transition-colors duration-300 ease-out active:scale-[0.98] ${
              isDarkMode
                ? "bg-[#c9974a] hover:bg-[#b8863f] text-[#1a1410]"
                : "bg-[#A9793C] hover:bg-[#8F642F] text-[#17130F]"
            }`}
          >
            Browse Our Full Collection
          </a>
        </div>
      </div>
    </section>
  );
}