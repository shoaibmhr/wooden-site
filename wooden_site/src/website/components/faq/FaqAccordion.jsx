import Container from "../common/Container";
import FaqItem from "./FaqItem";
import { faqCategories } from "../../data/faq.data";

export default function FaqAccordion() {
  return (
    <section className="w-full bg-white py-10 sm:py-12 md:py-16">
      <Container>
        <div className="mx-auto max-w-3xl">
          {faqCategories.map((group) => (
            <div key={group.category} className="mb-10 last:mb-0 sm:mb-12">
              <h2 className="text-xs font-bold uppercase tracking-widest text-amber-800 sm:text-sm">
                {group.category}
              </h2>
              <div className="mt-3 border-t border-neutral-200">
                {group.items.map((item) => (
                  <FaqItem key={item.question} question={item.question} answer={item.answer} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
