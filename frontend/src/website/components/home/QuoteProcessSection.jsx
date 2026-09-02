import { useEffect, useRef, useState } from "react";
import Container from "../common/Container";
import { Link } from "react-router-dom";
import { useDarkMode } from "../context/DarkModeContext";

const steps = [
  { title: "Share Your Vision", detail: "Tell us the design, material, and finish you're looking for." },
  { title: "Get a Quotation", detail: "Receive a detailed quote and delivery timeline within 24 hours." },
  { title: "Pay a 30% Advance", detail: "Confirm your order with an advance payment to begin production." },
  { title: "Approve the Final Design", detail: "Review and sign off before we move into manufacturing." },
  { title: "Receive Your Order", detail: "Your piece is finished, dispatched, and delivered to your door." },
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

export default function QuoteProcessSection() {
  const [sectionRef, isVisible] = useInView(0.15);
  const { isDarkMode } = useDarkMode();

  return (
    <section
      ref={sectionRef}
      className={`w-full border-t border-b transition-colors duration-300 overflow-hidden ${
        isDarkMode 
          ? "bg-[#1a1410] border-[#2a1f18]" 
          : "bg-white border-[#17130F]/10"
      }`}
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          {/* Left Column */}
          <div className="flex text-center lg:text-left flex-col justify-center py-10 sm:py-12 md:py-16 lg:py-20">
            <span
              className={`text-[11px] font-medium uppercase tracking-[0.3em] mb-4 transition-all duration-700 ease-out ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
              } ${
                isDarkMode ? "text-[#c9974a]" : "text-[#A9793C]"
              }`}
              style={{ transitionDelay: "80ms" }}
            >
              How It Works
            </span>

            <h2
              className={`font-serif tracking-tight leading-snug text-xl sm:text-2xl md:text-3xl lg:text-[2.125rem] transition-all duration-[900ms] ease-out ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              } ${
                isDarkMode ? "text-[#e8ddd0]" : "text-[#17130F]"
              }`}
              style={{ transitionDelay: "180ms" }}
            >
              Get a quote in 24 hours by sharing your product's design,
              material, and finish.
            </h2>

            <p
              className={`mt-4 sm:mt-5 mx-auto lg:mx-0 leading-relaxed text-sm sm:text-base max-w-xl transition-all duration-700 ease-out ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
              } ${
                isDarkMode ? "text-[#a89888]" : "text-[#5C5142]"
              }`}
              style={{ transitionDelay: "320ms" }}
            >
              We have our own manufacturing unit and can offer complete
              customization for projects of any size, from small, detailed
              customizations to large-scale orders.
            </p>

            <div
              className={`mt-8 flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 justify-center lg:justify-start transition-all duration-700 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "460ms" }}
            >
              <Link
                to="/get-quote"
                className={`group relative inline-flex items-center justify-center overflow-hidden tracking-[0.15em] font-semibold uppercase text-center text-xs sm:text-sm px-8 py-3.5 transition-transform duration-300 ease-out active:scale-[0.97] ${
                  isDarkMode
                    ? "bg-[#c9974a] text-[#1a1410]"
                    : "bg-[#A9793C] text-[#17130F]"
                }`}
              >
                <span className={`absolute inset-0 -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0 ${
                  isDarkMode ? "bg-[#b8863f]" : "bg-[#8F642F]"
                }`} />
                <span className="relative">Share Your Requirement</span>
              </Link>

              <Link
                to="/get-quote"
                className={`group inline-flex items-center justify-center border tracking-[0.15em] font-semibold uppercase text-center text-xs sm:text-sm px-8 py-3.5 transition-all duration-300 ease-out active:scale-[0.97] ${
                  isDarkMode 
                    ? "border-[#2a1f18] text-[#d4c5b5] hover:border-[#c9974a] hover:text-[#c9974a]" 
                    : "border-[#17130F]/25 text-[#17130F] hover:border-[#A9793C] hover:text-[#A9793C]"
                }`}
              >
                Bulk Order Inquiry
              </Link>
            </div>
          </div>

          {/* Right Column - Steps */}
          <div className={`py-10 sm:py-12 md:py-16 lg:py-20 lg:border-l lg:pl-16 xl:pl-20 ${
            isDarkMode ? "lg:border-[#2a1f18]" : "lg:border-[#17130F]/10"
          }`}>
            <ol className={`flex flex-col divide-y ${
              isDarkMode ? "divide-[#2a1f18]" : "divide-[#17130F]/10"
            }`}>
              {steps.map((step, idx) => (
                <li
                  key={step.title}
                  className={`group flex items-start gap-5 py-5 first:pt-0 last:pb-0 -mx-4 px-4 rounded-sm transition-all duration-300 ease-out ${
                    isDarkMode 
                      ? "hover:bg-[#2a1f18]/40" 
                      : "hover:bg-[#FAF6EF]"
                  } ${
                    isVisible
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-10"
                  }`}
                  style={{
                    transitionProperty: "opacity, transform, background-color",
                    transitionDuration: isVisible ? "700ms, 700ms, 300ms" : "700ms, 700ms, 300ms",
                    transitionDelay: isVisible ? `${380 + idx * 130}ms` : "0ms",
                  }}
                >
                  <span
                    className={`font-serif text-2xl leading-none pt-0.5 tabular-nums transition-transform duration-300 ease-out group-hover:scale-110 ${
                      isDarkMode 
                        ? "text-[#c9974a] group-hover:text-[#b8863f]" 
                        : "text-[#A9793C] group-hover:text-[#8F642F]"
                    }`}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                    <h3 className={`text-sm font-semibold uppercase tracking-[0.08em] ${
                      isDarkMode ? "text-[#e8ddd0]" : "text-[#17130F]"
                    }`}>
                      {step.title}
                    </h3>
                    <p className={`mt-1.5 text-sm leading-relaxed ${
                      isDarkMode ? "text-[#a89888]" : "text-[#5C5142]"
                    }`}>
                      {step.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}