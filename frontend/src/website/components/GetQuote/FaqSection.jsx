import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

// Stagger container for FAQ items
const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section className="w-full bg-white py-10 sm:py-12 md:py-16">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="font-serif text-stone-900 text-xl sm:text-2xl md:text-3xl tracking-tight">
            Common Questions
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-8 max-w-2xl mx-auto space-y-3"
        >
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={item.q}
                variants={itemVariant}
                className="rounded-xl border border-stone-200 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="group w-full flex items-center justify-between gap-3 px-4 sm:px-5 py-3.5 text-left"
                >
                  <span
                    className={`text-sm sm:text-base font-semibold transition-colors duration-300 ${
                      isOpen
                        ? "text-[#5C2A2A]"
                        : "text-stone-800 group-hover:text-[#5C2A2A]"
                    }`}
                  >
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <ChevronDown className="h-4 w-4 shrink-0 text-stone-500" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 sm:px-5 pb-4 text-xs sm:text-sm text-stone-500 leading-relaxed">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-7 text-center"
        >
          <Link
            to="/faqs"
            className="text-xs sm:text-sm font-medium uppercase tracking-[0.15em] text-[#5C2A2A] hover:tracking-[0.2em] transition-all duration-300"
          >
            View All FAQs →
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
