import { useEffect, useRef, useState } from "react";
import Container from "../common/Container";
import { ChevronDown, MessageCircle } from "lucide-react";
import { useDarkMode } from "../context/DarkModeContext";

const WHATSAPP_NUMBER = "923008543635";
const waMsg = encodeURIComponent(
  "Hello, I have a question about getting some custom woodwork done. Could you please help me?"
);
const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`;

const homeFaqs = [
  {
    question: "Can I get furniture, doors, and wall paneling made in my custom room sizes?",
    answer:
      "Yes, absolutely. We manufacture everything in-house. You can share your required dimensions (Length x Width) and preferred timber species with our master craftsman on WhatsApp for a custom blueprint and quote.",
  },
  {
    question: "What timber species do you use for your woodwork?",
    answer:
      "We work exclusively with 100% seasoned, kiln-dried Burma Teak, Pure Sheesham (Rosewood), and American White Oak. We never use MDF or engineered wood for core structural frames.",
  },
  {
    question: "How does on-site measurement and turnkey installation work?",
    answer:
      "Our carpentry team offers site measurement visits for main entrance doors, wardrobes, and architectural interior paneling. Once manufactured, our team delivers and fits all elements directly at your site.",
  },
  {
    question: "What warranty do you provide on custom woodcraft?",
    answer:
      "All our solid wood furniture and architectural millwork come with a lifetime joinery warranty, kiln-dried seasoning guarantee (< 12% moisture), and termite protection treatment.",
  },
  {
    question: "How can I get an instant estimated cost quote for my project?",
    answer:
      "Simply click 'Ask on WhatsApp' or submit your details on our Contact page with your approximate sizes or photos. Our senior woodcraft consultant will share an estimate promptly.",
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

export default function HomeFaqSection() {
  const [openIndex, setOpenIndex] = useState(0);
  const [sectionRef, isVisible] = useInView(0.1);
  const { isDarkMode } = useDarkMode();

  const toggleFaq = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      ref={sectionRef}
      className={`w-full py-16 sm:py-20 lg:py-24 border-t transition-colors duration-300 ${
        isDarkMode 
          ? "bg-[#1a1410] border-[#2a1f18]" 
          : "bg-[#FAF6EF] border-[#17130F]/10"
      }`}
    >
      <Container>
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center">
            <span
              className={`block text-[11px] font-medium uppercase tracking-[0.3em] transition-all duration-700 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              } ${
                isDarkMode ? "text-[#c9974a]" : "text-[#A9793C]"
              }`}
              style={{ transitionDelay: "80ms" }}
            >
              Questions &amp; Answers
            </span>
            <h2
              className={`mt-3 font-serif tracking-tight text-3xl sm:text-4xl transition-all duration-[900ms] ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              } ${
                isDarkMode ? "text-[#e8ddd0]" : "text-[#17130F]"
              }`}
              style={{ transitionDelay: "180ms" }}
            >
              Frequently Asked Questions
            </h2>
            <div
              className={`mx-auto mt-5 h-px transition-all duration-[900ms] ease-out ${
                isVisible ? "w-12 opacity-100" : "w-0 opacity-0"
              } ${
                isDarkMode ? "bg-[#c9974a]" : "bg-[#A9793C]"
              }`}
              style={{ transitionDelay: "340ms" }}
            />
            <p
              className={`mt-5 text-sm max-w-xl mx-auto leading-relaxed transition-all duration-700 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              } ${
                isDarkMode ? "text-[#a89888]" : "text-[#5C5142]"
              }`}
              style={{ transitionDelay: "420ms" }}
            >
              Everything you need to know about our timber selection, bespoke
              dimensions, warranties, and site installation.
            </p>
          </div>

          {/* Accordion List */}
          <div className="mt-10 sm:mt-12 space-y-3">
            {homeFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq.question}
                  className={`overflow-hidden border transition-all ease-out ${
                    isOpen
                      ? `border-[#A9793C] ${
                          isDarkMode 
                            ? "bg-[#1a1410] shadow-[0_4px_20px_rgba(0,0,0,0.3)]" 
                            : "bg-white shadow-[0_4px_20px_rgba(23,19,15,0.06)]"
                        }`
                      : `${
                          isDarkMode 
                            ? "border-[#2a1f18] bg-[#1a1410] hover:border-[#A9793C]/50" 
                            : "border-[#17130F]/10 bg-white hover:border-[#A9793C]/50"
                        }`
                  } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                  style={{
                    transitionDuration: "300ms, 300ms, 700ms, 700ms",
                    transitionProperty: "border-color, box-shadow, opacity, transform",
                    transitionDelay: isVisible ? `${520 + index * 90}ms` : "0ms",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className={`group flex w-full items-center justify-between p-5 text-left text-sm sm:text-base font-semibold focus:outline-none ${
                      isDarkMode ? "text-[#e8ddd0]" : "text-[#17130F]"
                    }`}
                  >
                    <span
                      className={`font-serif pr-4 transition-colors duration-300 ${
                        isOpen ? "text-[#A9793C]" : "group-hover:text-[#A9793C]"
                      }`}
                    >
                      {faq.question}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-400 ease-out ${
                        isOpen
                          ? `${
                              isDarkMode 
                                ? "bg-[#c9974a] text-[#1a1410]" 
                                : "bg-[#17130F] text-[#F3ECDD]"
                            } rotate-180 scale-105`
                          : `${
                              isDarkMode 
                                ? "bg-[#2a1f18] text-[#d4c5b5] group-hover:bg-[#2a1f18]/60" 
                                : "bg-[#FAF6EF] text-[#17130F] group-hover:bg-[#F3ECDD]"
                            }`
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </button>

                  {/* Grid-based collapse */}
                  <div
                    className="grid transition-[grid-template-rows] duration-400 ease-in-out"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <div
                        className={`p-5 pt-0 transition-all duration-300 ease-out ${
                          isOpen
                            ? "opacity-100 translate-y-0 delay-100"
                            : "opacity-0 -translate-y-1"
                        }`}
                      >
                        <div className={`border-t pt-4 text-xs sm:text-sm leading-relaxed ${
                          isDarkMode 
                            ? "border-[#2a1f18] text-[#a89888]" 
                            : "border-[#17130F]/10 text-[#5C5142]"
                        }`}>
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div
            className={`group mt-10 flex flex-col sm:flex-row items-center justify-between gap-5 p-6 border transition-all duration-700 ease-out hover:border-[#A9793C]/60 ${
              isDarkMode 
                ? "bg-[#1a1410] border-[#2a1f18] text-[#e8ddd0]" 
                : "bg-[#17130F] border-[#A9793C]/25 text-[#F3ECDD]"
            } ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: isVisible ? `${520 + homeFaqs.length * 90 + 80}ms` : "0ms" }}
          >
            <div className="text-center sm:text-left">
              <h4 className={`font-serif text-base ${
                isDarkMode ? "text-[#e8ddd0]" : "text-[#F3ECDD]"
              }`}>
                Have a specific custom design question?
              </h4>
              <p className={`mt-1.5 text-xs ${
                isDarkMode ? "text-[#a89888]" : "text-[#D9CFBC]/80"
              }`}>
                Our master woodworkers are available on WhatsApp to answer all
                technical specs & pricing queries.
              </p>
            </div>

            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex shrink-0 items-center gap-2 overflow-hidden bg-[#1F7A52] px-6 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-white transition-transform duration-300 active:scale-[0.97]"
            >
              <span className="absolute inset-0 -translate-x-full bg-[#186541] transition-transform duration-300 ease-out group-hover:translate-x-0" />
              <MessageCircle className="relative h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              <span className="relative">Ask on WhatsApp</span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}