import { useEffect, useState } from "react";
import heroVideo from "../../../assets/video/heroVideo.mp4";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export default function HeroCarousel() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsLoaded(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="w-full bg-[#17130F]">
     
      <div className="relative w-full h-[70vh] min-h-[460px] sm:h-[78vh] sm:min-h-[540px] lg:h-[82vh] lg:min-h-[600px] max-h-[780px] overflow-hidden">
        <video
          className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[2500ms] ease-out ${
            isLoaded ? "scale-100" : "scale-110"
          }`}
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#17130F] from-0% via-[#17130F]/45 via-40% to-[#17130F]/10" />

        {/* Extra scrim focused on the text zone, stronger on mobile where the
            video occupies more of the vertical space behind the copy */}
        <div className="absolute inset-x-0 bottom-0 h-[65%] sm:h-[55%] bg-gradient-to-t from-[#17130F]/90 via-[#17130F]/50 to-transparent" />

       
        <div className="relative z-10 flex h-full items-end">
          <div className="w-full px-6 sm:px-10 lg:px-16 pb-14 sm:pb-16 lg:pb-20">
            <div className="max-w-2xl">
              <span
                className={`block text-[11px] font-medium uppercase tracking-[0.3em] text-[#E8C888] mb-5 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] transition-all duration-700 ease-out ${
                  isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: "150ms" }}
              >
                Bespoke Wooden Craftsmanship
              </span>

              <h1 className="font-serif text-[#F3ECDD] text-4xl sm:text-6xl lg:text-[4.5rem] leading-[1.08] tracking-tight mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
                <span
                  className={`block transition-all duration-[900ms] ease-out ${
                    isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                  style={{ transitionDelay: "280ms" }}
                >
                  Tradition, trust
                </span>
                <span
                  className={`block transition-all duration-[900ms] ease-out ${
                    isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                  style={{ transitionDelay: "420ms" }}
                >
                  and <span className="italic text-[#C9A468]">perfection</span>,
                </span>
                <span
                  className={`block transition-all duration-[900ms] ease-out ${
                    isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                  style={{ transitionDelay: "560ms" }}
                >
                  built into every joint.
                </span>
              </h1>

              <p
                className={`max-w-lg text-[#F3ECDD]/95 text-sm sm:text-base leading-relaxed mb-9 drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)] transition-all duration-700 ease-out ${
                  isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: "720ms" }}
              >
                Handcrafted wooden doors, luxury furniture and architectural
                millwork — built in seasoned hardwood, finished for
                generations, not seasons.
              </p>

              <div
                className={`flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 transition-all duration-700 ease-out ${
                  isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: "860ms" }}
              >
                <Link
                  to="/get-quote"
                  className="group inline-flex items-center justify-center gap-2 bg-[#A9793C] px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#17130F] transition-colors duration-300 hover:bg-[#C9A468]"
                >
                  <span>Request a Quote</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                <Link
                  to="/products"
                  className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#F3ECDD]/90 transition-colors duration-300 hover:text-[#C9A468]"
                >
                  <span>Explore the Showcase</span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

    
      <div
        className={`w-full border-t border-[#A9793C]/20 transition-all duration-700 ease-out ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
        }`}
        style={{ transitionDelay: "1050ms" }}
      >
        <div className="px-6 sm:px-10 lg:px-16 py-5 sm:py-6 flex flex-wrap items-center gap-x-10 gap-y-3">
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#D9CFBC]/70">
            100% Seasoned Hardwood
          </span>
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#D9CFBC]/70">
            Custom Dimensions &amp; Polish
          </span>
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#D9CFBC]/70">
            Nationwide Showroom Delivery
          </span>
        </div>
      </div>
    </section>
  );
}