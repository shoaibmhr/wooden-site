import { useState } from "react";
import Container from "../common/Container";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "923027069093";
const waMsg = encodeURIComponent("Salam Ashtech Wooden! Mujhe custom woodwork inquiry ke baare mein puchna hai.");
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
      "Simply click 'Inquire on WhatsApp' or submit your details on our Contact page with your approximate sizes or photos. Our senior woodcraft consultant will share an estimate promptly.",
  },
];

export default function HomeFaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="w-full bg-[#faf6ef] py-16 sm:py-20 lg:py-24 border-t border-[#ecdfc4]">
      <Container>
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#b8863f]">
              <HelpCircle className="h-4 w-4" />
              <span>Questions & Answers</span>
            </span>
            <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-[#2b1710] sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <div className="mx-auto mt-4 h-0.5 w-20 bg-[#d4af6a]" />
            <p className="mt-4 text-xs sm:text-sm text-neutral-600 max-w-xl mx-auto">
              Everything you need to know about our timber selection, bespoke dimensions, warranties, and site installation.
            </p>
          </div>

          {/* Accordion List */}
          <div className="mt-10 sm:mt-12 space-y-4">
            {homeFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq.question}
                  className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                    isOpen
                      ? "border-[#d4af6a] bg-white shadow-lg ring-1 ring-[#d4af6a]/30"
                      : "border-[#ecdfc4] bg-white/80 hover:border-[#b8863f]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="flex w-full items-center justify-between p-5 text-left text-sm sm:text-base font-bold text-[#2b1710] focus:outline-none"
                  >
                    <span className="font-serif pr-4">{faq.question}</span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform duration-300 ${
                        isOpen
                          ? "bg-[#2b1710] text-[#f0d9a8] rotate-180"
                          : "bg-[#faf6ef] text-[#2b1710]"
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </button>

                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-96 opacity-100 p-5 pt-0" : "max-h-0 opacity-0 overflow-hidden"
                    }`}
                  >
                    <div className="border-t border-[#ecdfc4]/60 pt-4 text-xs sm:text-sm leading-relaxed text-[#5c4a3b]">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom WhatsApp Help Banner */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl bg-[#170e0a] p-6 text-[#f7f0e2] border border-[#d4af6a]/30 shadow-xl">
            <div>
              <h4 className="font-serif text-base font-bold text-[#f0d9a8]">
                Have a specific custom design question?
              </h4>
              <p className="mt-1 text-xs text-[#ecdfc4]/80">
                Our master woodworkers are available on WhatsApp to answer all technical specs & pricing queries.
              </p>
            </div>

            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex shrink-0 items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all hover:bg-emerald-500"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Ask on WhatsApp</span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
