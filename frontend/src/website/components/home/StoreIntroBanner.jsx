import { useEffect, useRef, useState } from "react";

export default function StoreIntroBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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
      className="w-full bg-[#FAF6EF] border-y border-[#17130F]/10"
    >
      <div className="mx-auto max-w-4xl text-center px-4 py-14 sm:px-6 sm:py-16 md:py-20">
        <span
          className={`block text-[11px] font-medium uppercase tracking-[0.3em] text-[#A9793C] mb-4 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "100ms" }}
        >
          The WoodenSite Store
        </span>

        <h2
          className={`font-serif text-[#17130F] tracking-tight leading-tight text-2xl sm:text-3xl md:text-4xl transition-all duration-[900ms] ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "220ms" }}
        >
          Affordable, solid wood
          <span className="text-[#A9793C]">.</span> Built to order
          <span className="text-[#A9793C]">.</span>
        </h2>

        <p
          className={`mt-4 text-[#5C5142] text-sm sm:text-base max-w-xl mx-auto leading-relaxed transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "380ms" }}
        >
          Every piece is finished to your specification, with polish
          customisation included at no additional cost.
        </p>

        {/* Stat row */}
        <div
          className={`mt-9 flex items-center justify-center gap-6 sm:gap-10 text-[#17130F] transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "520ms" }}
        >
          <div>
            <div className="font-serif text-xl sm:text-2xl">3000+</div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.15em] text-[#5C5142]">
              Products
            </div>
          </div>
          <span className="h-8 w-px bg-[#17130F]/10" />
          <div>
            <div className="font-serif text-xl sm:text-2xl">100%</div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.15em] text-[#5C5142]">
              Solid Wood
            </div>
          </div>
          <span className="h-8 w-px bg-[#17130F]/10" />
          <div>
            <div className="font-serif text-xl sm:text-2xl">Free</div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.15em] text-[#5C5142]">
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
            className="inline-block bg-[#A9793C] hover:bg-[#8F642F] text-[#17130F]
                       tracking-[0.15em] font-semibold uppercase
                       text-xs sm:text-sm
                       px-8 py-3.5
                       transition-colors duration-300 ease-out
                       active:scale-[0.98]"
          >
            Browse Our Full Collection
          </a>
        </div>
      </div>
    </section>
  );
}