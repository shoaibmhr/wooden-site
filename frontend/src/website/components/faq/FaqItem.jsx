import { useState } from "react";
import { Plus } from "lucide-react";

export default function FaqItem({
  question,
  answer,
  isVisible = true,
  delay = 0,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`border-b border-neutral-200 transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{ transitionDelay: isVisible ? `${delay}ms` : "0ms" }}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="group flex w-full items-center justify-between gap-4 py-4 text-left sm:py-5"
      >
        <span
          className={`text-sm font-semibold sm:text-base transition-colors duration-300 ${
            isOpen
              ? "text-amber-800"
              : "text-neutral-900 group-hover:text-amber-800"
          }`}
        >
          {question}
        </span>
        <Plus
          className={`h-5 w-5 shrink-0 text-amber-800 transition-transform duration-300 ease-out ${
            isOpen ? "rotate-45" : "group-hover:scale-110"
          }`}
          strokeWidth={2}
        />
      </button>

      <div
        className="grid transition-[grid-template-rows] duration-400 ease-in-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p
            className={`pb-4 text-sm leading-relaxed text-neutral-600 transition-all duration-300 ease-out sm:pb-5 sm:text-base ${
              isOpen
                ? "opacity-100 translate-y-0 delay-100"
                : "opacity-0 -translate-y-1"
            }`}
          >
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
