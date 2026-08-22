import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Container from "../common/Container";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const WHATSAPP_NUMBER = "923027069093";


if (typeof document !== "undefined" && !document.getElementById("service-highlight-style")) {
  const styleTag = document.createElement("style");
  styleTag.id = "service-highlight-style";
  styleTag.textContent = `
    @keyframes service-card-pulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(212, 175, 106, 0.55); }
      50% { box-shadow: 0 0 0 10px rgba(212, 175, 106, 0); }
    }
  `;
  document.head.appendChild(styleTag);
}

function WhatsappIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20 3.9A10 10 0 0 0 3.6 16.4L2 22l5.7-1.5A10 10 0 1 0 20 3.9Zm-8 16.6a8.4 8.4 0 0 1-4.3-1.2l-.3-.2-3.2.8.9-3.1-.2-.3A8.5 8.5 0 1 1 12 20.5Zm4.6-6.4c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.7.8-.8 1-.2.2-.3.2-.5.1a6.9 6.9 0 0 1-3.5-3c-.3-.4.3-.4.7-1.3.1-.2 0-.4 0-.5L8.6 7.3c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.2s.9 2.6 1.1 2.8c.1.2 1.9 2.9 4.6 4 .6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.2-.2-.4-.3Z" />
    </svg>
  );
}


const services = [
  {
    slug: "custom-design",
    title: "Bespoke Custom Furniture",
    description:
      "We design and build custom furniture to your exact room dimensions and wood preference — solid Teak, Sheesham, and Oak dining sets, beds, & wardrobes.",
    image:
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "doors-windows",
    title: "Carved Main Doors & Frames",
    description:
      "Solid wooden entrance doors, carved panels, pivot doors, and jamb frames built with seasoned weather-resistant timber for villas and modern homes.",
    image:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "paneling",
    title: "Interior Wood Paneling & Fluted Walls",
    description:
      "Transform interior living spaces with floor-to-ceiling wooden accent walls, fluted timber panels, acoustic louvers, and bespoke ceiling beams.",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "bulk-orders",
    title: "Wooden Windows & Glass Casements",
    description:
      "Traditional sash windows, modern casements, and sliding patio doors built with precision weather seals and high-durability wood polishes.",
    image:
      "https://images.unsplash.com/photo-1546484475-7f7bd55792da?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "restoration",
    title: "Artisan Polish & Antique Lacquer",
    description:
      "Bring old heirloom wood back to life with our re-polishing service — natural teak oil, dark walnut stain, matt black, and lacquer finishes.",
    image:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "installation",
    title: "Commercial & Villa Fitting Services",
    description:
      "Full turnkey installation by our master carpentry team. We measure, deliver, align, and fit all wooden elements at your site.",
    image:
      "https://images.unsplash.com/photo-1757416654883-c73c67b3382b?auto=format&fit=crop&w=900&q=80",
  },
];


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

export default function ServicesGrid() {
  const [headerRef, headerVisible] = useInView(0.2);
  const [gridRef, gridVisible] = useInView(0.08);
  const [searchParams] = useSearchParams();
  const [highlightedSlug, setHighlightedSlug] = useState(null);

  
  useEffect(() => {
    const targetSlug = searchParams.get("type");
    if (!targetSlug) return;

    const el = document.getElementById(`service-${targetSlug}`);
    if (!el) return;

    const scrollTimer = setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      setHighlightedSlug(targetSlug);
    }, 100);

    const clearTimer = setTimeout(() => setHighlightedSlug(null), 4000);

    return () => {
      clearTimeout(scrollTimer);
      clearTimeout(clearTimer);
    };
  }, [searchParams]);

  return (
    <section className="w-full bg-[#faf6ef] py-16 sm:py-20 lg:py-24 overflow-hidden">
      <Container>
        {/* Section header — same reveal cadence as About's section intros */}
        <div ref={headerRef} className="mb-14 text-center max-w-2xl mx-auto">
          <span
            className={`block text-[11px] font-semibold uppercase tracking-[0.3em] text-[#b8863f] transition-all duration-700 ease-out ${
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "80ms" }}
          >
            Artisanal Capability
          </span>
          <h2
            className={`mt-3 font-serif text-3xl sm:text-4xl font-normal tracking-tight text-[#2b1710] transition-all duration-[900ms] ease-out ${
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "180ms" }}
          >
            Bespoke Woodwork &amp; Interior Services
          </h2>
          <div
            className={`mx-auto mt-5 h-px bg-[#d4af6a] transition-all duration-[900ms] ease-out ${
              headerVisible ? "w-14 opacity-100" : "w-0 opacity-0"
            }`}
            style={{ transitionDelay: "340ms" }}
          />
          <p
            className={`mt-5 text-sm sm:text-base leading-relaxed text-[#5c4a3b] transition-all duration-700 ease-out ${
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "420ms" }}
          >
            From single custom furniture pieces to full luxury villa architectural
            wood projects — every service backed by four decades of craftsmanship.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => {
            const waMsg = encodeURIComponent(
              `Salam Ashtech Wooden! Mujhe *${service.title}* ke baare mein consult karna hai.`
            );
            const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`;
            const isHighlighted = highlightedSlug === service.slug;

            return (
              <div
                key={service.title}
                id={`service-${service.slug}`}
                className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition-all ease-out hover:-translate-y-1.5 hover:border-[#d4af6a]/60 hover:shadow-[0_24px_45px_-22px_rgba(43,23,16,0.25)] ${
                  isHighlighted
                    ? "border-[#d4af6a] ring-2 ring-[#d4af6a]/70 shadow-[0_24px_45px_-22px_rgba(212,175,106,0.5)]"
                    : "border-[#ecdfc4]"
                } ${
                  gridVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDuration: "700ms",
                  transitionDelay: gridVisible ? `${idx * 120}ms` : "0ms",
                  animation: isHighlighted ? "service-card-pulse 1.1s ease-out 3" : "none",
                }}
              >
                {isHighlighted && (
                  <div className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded-full bg-[#2b1710] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#f0d9a8] shadow-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    You're here
                  </div>
                )}

                <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100">
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-85" />

                 
                  <div className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center">
                    <div className="absolute inset-0 rotate-45 border border-white/50 transition-all duration-500 ease-out group-hover:border-[#d4af6a] group-hover:bg-[#2b1710]/70" />
                    <span className="relative font-serif text-xs text-white">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-serif text-lg sm:text-xl font-semibold text-[#2b1710] transition-colors duration-300 group-hover:text-[#b8863f]">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[#5c4a3b] flex-1">
                    {service.description}
                  </p>

                  <div className="mt-6 flex items-center gap-3 border-t border-[#ecdfc4] pt-4">
                    <Link
                      to="/get-quote"
                      className="group/btn relative flex-1 overflow-hidden rounded-lg bg-[#2b1710] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#f0d9a8] transition-colors duration-300"
                    >
                      <span className="absolute inset-0 -translate-x-full bg-[#3e2723] transition-transform duration-300 ease-out group-hover/btn:translate-x-0" />
                      <span className="relative flex items-center justify-center gap-1.5">
                        Get Quote
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover/btn:translate-x-1" />
                      </span>
                    </Link>

                    
                     <a href={waHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center rounded-lg bg-emerald-600 p-2.5 text-white transition-all duration-300 hover:scale-105 hover:bg-emerald-500"
                      title="Consult on WhatsApp"
                    >
                      <WhatsappIcon className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}