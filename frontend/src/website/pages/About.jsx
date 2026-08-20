import Container from "../components/common/Container";
import PageHero from "../components/common/PageHero";
import StatsSection from "../components/home/StatsSection";
import WhyChooseUs from "../components/home/WhyChooseUs";
import { Link } from "react-router-dom";
import { Hammer, Sparkles, ShieldCheck, TreePine, ArrowRight, Award } from "lucide-react";

export default function About() {
  return (
    <div>
      <PageHero
        image="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1600&q=80"
        title="About Ashtech Wooden"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "About Us", href: "/about" },
        ]}
      />

      {/* Brand Heritage Section */}
      <section className="w-full bg-[#faf6ef] py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b8863f]">
                Master Woodcraft Since 1978
              </span>
              <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-[#2b1710]">
                Preserving Handcrafted Excellence & Modern Architectural Luxury
              </h2>
              <p className="mt-6 text-base leading-relaxed text-[#5c4a3b]">
                At Ashtech Wooden, wood is not just a material — it is a living medium of art, tradition, and timeless architectural beauty. For over four decades, our master artisans have designed and built bespoke wooden doors, interior paneling, luxury furniture, and architectural millwork.
              </p>
              <p className="mt-4 text-base leading-relaxed text-[#5c4a3b]">
                We combine centuries-old joinery techniques with modern precision engineering. Every piece is seasoned to perfection, hand-carved, and finished with rich natural polishes that enhance the grain of high-grade Teak, Sheesham, and Oak wood.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-6 border-t border-[#ecdfc4] pt-8">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#2b1710] text-[#d4af6a]">
                    <TreePine className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#2b1710]">Seasoned Wood</h4>
                    <p className="text-xs text-[#6b5a48]">Kiln-dried & moisture checked</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#2b1710] text-[#d4af6a]">
                    <Hammer className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#2b1710]">Hand Joinery</h4>
                    <p className="text-xs text-[#6b5a48]">Mortise & tenon mastery</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  to="/get-quote"
                  className="inline-flex items-center gap-2 rounded-sm bg-[#2b1710] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.1em] text-[#f0d9a8] shadow-md transition-all duration-300 hover:bg-[#b8863f] hover:text-white"
                >
                  Request Custom Quote
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Showcase Image Stack */}
            <div className="relative">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/10">
                <img
                  src="https://images.unsplash.com/photo-1546484475-7f7bd55792da?auto=format&fit=crop&w=1200&q=80"
                  alt="Craftsman working on fine woodwork"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              {/* Floating Quality Badge */}
              <div className="absolute -bottom-6 -left-6 rounded-2xl bg-[#170e0a] p-6 text-white shadow-2xl border border-[#d4af6a]/30 max-w-xs">
                <div className="flex items-center gap-3">
                  <Award className="h-8 w-8 text-[#d4af6a]" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#d4af6a]">
                      100% Quality Guaranteed
                    </p>
                    <p className="text-[11px] text-neutral-300">
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
      <section className="w-full bg-white py-16 sm:py-20">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b8863f]">
              Premium Timber Sourcing
            </span>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-semibold text-[#2b1710]">
              The Finest Hardwoods Chosen For Durability & Grace
            </h2>
            <p className="mt-4 text-sm sm:text-base text-neutral-600">
              We carefully select grade-A timber species to ensure long-lasting structural strength, natural resistance, and rich grain textures.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-xl border border-neutral-200 bg-[#faf6ef] p-6 text-center hover:shadow-lg transition-shadow">
              <h3 className="font-serif text-xl font-bold text-[#2b1710]">Burma & Plantation Teak</h3>
              <p className="mt-3 text-xs leading-relaxed text-[#6b5a48]">
                Renowned for natural teak oils, rich golden brown luster, and unmatched weather resistance for doors, windows, and exterior millwork.
              </p>
            </div>

            <div className="rounded-xl border border-neutral-200 bg-[#faf6ef] p-6 text-center hover:shadow-lg transition-shadow">
              <h3 className="font-serif text-xl font-bold text-[#2b1710]">Pure Sheesham (Rosewood)</h3>
              <p className="mt-3 text-xs leading-relaxed text-[#6b5a48]">
                Dense hardwood with distinct grain patterns, perfect for high-end dining tables, bed sets, and carved artisanal doors.
              </p>
            </div>

            <div className="rounded-xl border border-neutral-200 bg-[#faf6ef] p-6 text-center hover:shadow-lg transition-shadow">
              <h3 className="font-serif text-xl font-bold text-[#2b1710]">American Red & White Oak</h3>
              <p className="mt-3 text-xs leading-relaxed text-[#6b5a48]">
                Celebrated for crisp grain structures, high impact resistance, and elegant matte or dark walnut lacquer polishes.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Why Choose Us */}
      <WhyChooseUs />
    </div>
  );
}
