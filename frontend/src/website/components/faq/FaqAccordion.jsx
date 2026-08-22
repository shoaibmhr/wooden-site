import { useEffect, useRef, useState } from "react";
import Container from "../common/Container";
import FaqItem from "./FaqItem";
import { faqCategories } from "../../data/faq.data";


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
      { threshold },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible];
}


const groupStartIndices = faqCategories.reduce((acc, group, i) => {
  const prevStart =
    i === 0 ? 0 : acc[i - 1] + faqCategories[i - 1].items.length;
  acc.push(prevStart);
  return acc;
}, []);

export default function FaqAccordion() {
  const [sectionRef, isVisible] = useInView(0.05);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white py-10 sm:py-12 md:py-16"
    >
      <Container>
        <div className="mx-auto max-w-3xl">
          {faqCategories.map((group, groupIndex) => {
            const groupStartIndex = groupStartIndices[groupIndex];

            return (
              <div key={group.category} className="mb-10 last:mb-0 sm:mb-12">
                <h2
                  className={`text-xs font-bold uppercase tracking-widest text-amber-800 sm:text-sm transition-all duration-700 ease-out ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{
                    transitionDelay: isVisible
                      ? `${groupIndex * 120}ms`
                      : "0ms",
                  }}
                >
                  {group.category}
                </h2>
                <div
                  className={`mt-3 border-t border-neutral-200 origin-left transition-all duration-700 ease-out ${
                    isVisible
                      ? "opacity-100 scale-x-100"
                      : "opacity-0 scale-x-0"
                  }`}
                  style={{
                    transitionDelay: isVisible
                      ? `${groupIndex * 120 + 80}ms`
                      : "0ms",
                  }}
                >
                  {group.items.map((item, itemIndex) => (
                    <FaqItem
                      key={item.question}
                      question={item.question}
                      answer={item.answer}
                      isVisible={isVisible}
                      delay={220 + (groupStartIndex + itemIndex) * 70}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
