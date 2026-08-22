import { useEffect, useRef, useState } from "react";
import Container from "../common/Container";

import backgroundImage from "../../../assets/image/bg-2-1 - Copy.jpg";
import roomImage from "../../../assets/image/lookbook-1.jpg";

const panelHeight =
  "min-h-[320px] sm:min-h-[380px] md:min-h-[420px] lg:h-[420px] xl:h-[460px]";


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

export default function RoomInspiration() {
  const [sectionRef, isVisible] = useInView(0.15);

  return (
    <section ref={sectionRef} className="w-full bg-[#FAF6EF] py-14 sm:py-16 md:py-20 overflow-hidden">
      <Container>
        <div className="grid w-full gap-4 sm:gap-5 lg:grid-cols-[5fr_7fr] lg:gap-6">
         
          <div
            className={`relative flex items-center justify-center overflow-hidden px-6 py-10 sm:px-8 sm:py-12 md:px-12 md:py-14 lg:px-10 lg:py-12 xl:px-16 ${panelHeight}`}
            style={{
              clipPath: isVisible ? "inset(0 0 0 0)" : "inset(0 0 0 100%)",
              transition: "clip-path 1000ms cubic-bezier(0.65, 0, 0.35, 1)",
            }}
          >
           
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[3500ms] ease-out"
              style={{
                backgroundImage: `url(${backgroundImage})`,
                transform: isVisible ? "scale(1.08)" : "scale(1)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#17130F]/85 via-[#17130F]/45 to-[#17130F]/15" />

            <div className="relative w-full max-w-xl text-center text-[#F3ECDD] lg:text-left">
              <span
                className={`block text-[11px] font-medium uppercase tracking-[0.3em] text-[#C9A468] transition-all duration-700 ease-out ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: "500ms" }}
              >
                Style Guide
              </span>

              <h2
                className={`mt-3 font-serif text-4xl font-normal leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] transition-all duration-[900ms] ease-out ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: "620ms" }}
              >
                Room
                <br />
                Inspiration
              </h2>

              <p
                className={`mt-5 text-sm leading-7 text-[#D9CFBC]/85 sm:mt-6 sm:text-base lg:max-w-md transition-all duration-700 ease-out ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: "760ms" }}
              >
                Discover fresh ideas from our in-house stylists and other
                WoodenSite customers to transform your own room.
              </p>

              <button
                type="button"
                className={`group relative mt-7 inline-flex min-h-12 items-center justify-center overflow-hidden border border-[#F3ECDD] px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#F3ECDD] transition-all duration-700 ease-out focus:outline-none focus:ring-2 focus:ring-[#F3ECDD] focus:ring-offset-2 focus:ring-offset-transparent sm:px-8 sm:text-sm ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: "880ms" }}
              >
                <span className="absolute inset-0 -translate-y-full bg-[#F3ECDD] transition-transform duration-300 ease-out group-hover:translate-y-0" />
                <span className="relative transition-colors duration-300 ease-out group-hover:text-[#17130F]">
                  Shop All New In
                </span>
              </button>
            </div>
          </div>

         
          <div
            className={`relative overflow-hidden ${panelHeight}`}
            style={{
              clipPath: isVisible ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
              transition: "clip-path 1000ms cubic-bezier(0.65, 0, 0.35, 1) 150ms",
            }}
          >
            <img
              src={roomImage}
              alt="Room inspiration furniture"
              className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-[3500ms] ease-out"
              style={{ transform: isVisible ? "scale(1.08)" : "scale(1)" }}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}