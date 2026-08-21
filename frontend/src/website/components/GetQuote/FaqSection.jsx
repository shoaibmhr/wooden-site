import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Container from "../common/Container";
import { Link } from "react-router-dom";

const faqs = [
  {
    q: "How much advance do I need to pay?",
    a: "We require a 30% advance to begin production, with the remaining balance due before dispatch.",
  },
  {
    q: "How long does a custom order take?",
    a: "Depending on the item and complexity, most custom orders are completed within 2–4 weeks.",
  },
  {
    q: "Can I request changes after approving the design?",
    a: "Minor adjustments can be made before production begins. Once manufacturing starts, changes may affect timeline and cost.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section className="w-full bg-white py-10 sm:py-12 md:py-16">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-stone-900 text-xl sm:text-2xl md:text-3xl tracking-tight">
            Common Questions
          </h2>
        </div>

        <div className="mt-8 max-w-2xl mx-auto space-y-3">
          {faqs.map((item, index) => (
            <div
              key={item.q}
              className="rounded-xl border border-stone-200 overflow-hidden"
            >
              <button
                type="button"
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between gap-3 px-4 sm:px-5 py-3.5 text-left"
              >
                <span className="text-sm sm:text-base font-semibold text-stone-800">
                  {item.q}
                </span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-stone-500 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="px-4 sm:px-5 pb-4 text-xs sm:text-sm text-stone-500 leading-relaxed">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-7 text-center">
          
          <Link to="/faqs"
            className="text-xs sm:text-sm font-medium uppercase tracking-[0.15em] text-[#5C2A2A] hover:tracking-[0.2em] transition-all duration-300"
          >
            View All FAQs →
          </Link>
        </div>
      </Container>
    </section>
  );
}