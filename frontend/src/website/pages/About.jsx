import { useEffect, useRef, useState } from "react";
import Container from "../components/common/Container";
import PageHero from "../components/common/PageHero";
import StatsSection from "../components/home/StatsSection";
import WhyChooseUs from "../components/home/WhyChooseUs";
import { Link } from "react-router-dom";
import { Hammer, ShieldCheck, TreePine, ArrowRight, Award, Sparkles } from "lucide-react";

const timbers = [
  {
    icon: ShieldCheck,
    title: "Burma & Plantation Teak",
    description:
      "Renowned for natural teak oils, rich golden-brown luster, and unmatched weather resistance for doors, windows, and exterior millwork.",
  },
  {
    icon: Sparkles,
    title: "Pure Sheesham (Rosewood)",
    description:
      "Dense hardwood with distinct grain patterns, perfect for high-end dining tables, bed sets, and carved artisanal doors.",
  },
  {
    icon: Award,
    title: "American Red & White Oak",
    description:
      "Celebrated for crisp grain structures, high impact resistance, and elegant matte or dark walnut lacquer polishes.",
  },
];

// Shared scroll-visibility hook — same pattern used across the homepage
// sections. Worth moving to src/hooks/useInView.js and importing everywhere.
function useInView(threshold = 0.15) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible];
}

export default function About() {
  const [heritageRef, heritageVisible] = useInView(0.1);
  const [materialsRef, materialsVisible] = useInView(0.1);

  return (
    <div>
      <PageHero
        image="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1600&q=80"
        title="About WoodenSite"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "About Us", href: "/about" },
        ]}
      />

      {/* Brand Heritage Section */}
      <section ref={heritageRef} className="w-full bg-[#FAF6EF] py-16 sm:py-20 lg:py-24 overflow-hidden">
        <Container>
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-center lg:gap-16">
            {/* Left: copy */}
            <div>
              <span
                className={`block text-[11px] font-medium uppercase tracking-[0.3em] text-[#A9793C] transition-all duration-700 ease-out ${
                  heritageVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: "80ms" }}
              >
                Master Woodcraft Since 1978
              </span>

              <h2
                className={`mt-3 font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-normal leading-tight tracking-tight text-[#17130F] transition-all duration-[900ms] ease-out ${
                  heritageVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: "180ms" }}
              >
                Preserving Handcrafted Excellence &amp; Modern Architectural Luxury
              </h2>

              <p
                className={`mt-6 text-sm sm:text-base leading-relaxed text-[#5C5142] transition-all duration-700 ease-out ${
                  heritageVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: "300ms" }}
              >
                At WoodenSite, wood is not just a material — it is a living
                medium of art, tradition, and timeless architectural beauty.
                For over four decades, our master artisans have designed and
                built bespoke wooden doors, interior paneling, luxury
                furniture, and architectural millwork.
              </p>
              <p
                className={`mt-4 text-sm sm:text-base leading-relaxed text-[#5C5142] transition-all duration-700 ease-out ${
                  heritageVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: "380ms" }}
              >
                We combine centuries-old joinery techniques with modern
                precision engineering. Every piece is seasoned to perfection,
                hand-carved, and finished with rich natural polishes that
                enhance the grain of high-grade Teak, Sheesham, and Oak wood.
              </p>

              <div
                className={`mt-9 grid grid-cols-2 gap-6 border-t border-[#17130F]/10 pt-8 transition-all duration-700 ease-out ${
                  heritageVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: "480ms" }}
              >
                <div className="group flex items-start gap-3">
                  <div className="relative flex h-11 w-11 shrink-0 items-center justify-center">
                    <div className="absolute inset-0 border border-[#A9793C]/40 transition-all duration-500 ease-out group-hover:rotate-45 group-hover:border-[#A9793C]" />
                    <div className="absolute inset-0 scale-0 bg-[#A9793C] transition-transform duration-500 ease-out group-hover:scale-100" />
                    <TreePine className="relative h-5 w-5 text-[#A9793C] transition-colors duration-500 ease-out group-hover:text-[#17130F]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-[0.06em] text-[#17130F]">
                      Seasoned Wood
                    </h4>
                    <p className="mt-0.5 text-xs text-[#5C5142]">
                      Kiln-dried &amp; moisture checked
                    </p>
                  </div>
                </div>

                <div className="group flex items-start gap-3">
                  <div className="relative flex h-11 w-11 shrink-0 items-center justify-center">
                    <div className="absolute inset-0 border border-[#A9793C]/40 transition-all duration-500 ease-out group-hover:rotate-45 group-hover:border-[#A9793C]" />
                    <div className="absolute inset-0 scale-0 bg-[#A9793C] transition-transform duration-500 ease-out group-hover:scale-100" />
                    <Hammer className="relative h-5 w-5 text-[#A9793C] transition-colors duration-500 ease-out group-hover:text-[#17130F]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-[0.06em] text-[#17130F]">
                      Hand Joinery
                    </h4>
                    <p className="mt-0.5 text-xs text-[#5C5142]">
                      Mortise &amp; tenon mastery
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`mt-9 transition-all duration-700 ease-out ${
                  heritageVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: "580ms" }}
              >
                <Link
                  to="/get-quote"
                  className="group relative inline-flex items-center gap-2 overflow-hidden bg-[#17130F] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-[#F3ECDD] transition-all duration-300"
                >
                  <span className="absolute inset-0 -translate-x-full bg-[#A9793C] transition-transform duration-300 ease-out group-hover:translate-x-0" />
                  <span className="relative">Request Custom Quote</span>
                  <ArrowRight className="relative h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Right: Showcase image stack */}
            <div className="relative">
              <div
                className="relative aspect-[4/5] w-full overflow-hidden shadow-2xl ring-1 ring-[#17130F]/10"
                style={{
                  clipPath: heritageVisible ? "inset(0 0 0 0)" : "inset(0 0 0 100%)",
                  transition: "clip-path 1000ms cubic-bezier(0.65, 0, 0.35, 1) 150ms",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1546484475-7f7bd55792da?auto=format&fit=crop&w=1200&q=80"
                  alt="Craftsman working on fine woodwork"
                  className="h-full w-full object-cover transition-transform duration-[3000ms] ease-out"
                  style={{ transform: heritageVisible ? "scale(1.06)" : "scale(1)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#17130F]/60 via-transparent to-transparent" />
              </div>

              {/* Floating Quality Badge */}
              <div
                className={`absolute -bottom-6 -left-6 max-w-xs bg-[#17130F] p-6 text-white shadow-2xl border border-[#A9793C]/30 transition-all duration-700 ease-out ${
                  heritageVisible
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-6 scale-90"
                }`}
                style={{ transitionDelay: "900ms" }}
              >
                <div className="flex items-center gap-3">
                  <Award className="h-8 w-8 shrink-0 text-[#C9A468]" strokeWidth={1.5} />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#C9A468]">
                      100% Quality Guaranteed
                    </p>
                    <p className="text-[11px] text-[#D9CFBC]/80">
                      Lifetime Craftsmanship Warranty
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats counter section */}
      <StatsSection />

      {/* Materials & Sourcing */}
      <section ref={materialsRef} className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <span
              className={`block text-[11px] font-medium uppercase tracking-[0.3em] text-[#A9793C] transition-all duration-700 ease-out ${
                materialsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "80ms" }}
            >
              Premium Timber Sourcing
            </span>
            <h2
              className={`mt-3 font-serif text-3xl sm:text-4xl text-[#17130F] tracking-tight transition-all duration-[900ms] ease-out ${
                materialsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "180ms" }}
            >
              The Finest Hardwoods Chosen For Durability &amp; Grace
            </h2>
            <div
              className={`mx-auto mt-5 h-px bg-[#A9793C] transition-all duration-[900ms] ease-out ${
                materialsVisible ? "w-12 opacity-100" : "w-0 opacity-0"
              }`}
              style={{ transitionDelay: "340ms" }}
            />
            <p
              className={`mt-5 text-sm sm:text-base text-[#5C5142] leading-relaxed transition-all duration-700 ease-out ${
                materialsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "420ms" }}
            >
              We carefully select grade-A timber species to ensure
              long-lasting structural strength, natural resistance, and rich
              grain textures.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {timbers.map((timber, idx) => {
              const Icon = timber.icon;
              return (
                <div
                  key={timber.title}
                  className={`group border border-[#17130F]/10 bg-[#FAF6EF] p-8 text-center transition-all ease-out hover:-translate-y-1 hover:border-[#A9793C]/50 hover:shadow-[0_20px_40px_-20px_rgba(23,19,15,0.25)] ${
                    materialsVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{
                    transitionDuration: "700ms",
                    transitionDelay: materialsVisible ? `${560 + idx * 150}ms` : "0ms",
                  }}
                >
                  <div className="relative mx-auto flex h-14 w-14 items-center justify-center">
                    <div className="absolute inset-0 border border-[#A9793C]/40 transition-all duration-500 ease-out group-hover:rotate-45 group-hover:border-[#A9793C]" />
                    <div className="absolute inset-0 scale-0 bg-[#A9793C] transition-transform duration-500 ease-out group-hover:scale-100" />
                    <Icon
                      className="relative h-6 w-6 text-[#A9793C] transition-all duration-500 ease-out group-hover:scale-110 group-hover:text-[#17130F]"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="mt-5 font-serif text-lg sm:text-xl text-[#17130F] transition-colors duration-300 group-hover:text-[#A9793C]">
                    {timber.title}
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[#5C5142]">
                    {timber.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Why Choose Us */}
      <WhyChooseUs />
    </div>
  );
}