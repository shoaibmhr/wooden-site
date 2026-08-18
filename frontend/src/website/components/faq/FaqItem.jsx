import { useState } from "react";
import { Plus } from "lucide-react";

export default function FaqItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-neutral-200">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 py-4 text-left sm:py-5"
      >
        <span className="text-sm font-semibold text-neutral-900 sm:text-base">
          {question}
        </span>
        <Plus
          className={`h-5 w-5 shrink-0 text-amber-800 transition-transform duration-300 ${
            isOpen ? "rotate-45" : ""
          }`}
          strokeWidth={2}
        />
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="pb-4 text-sm leading-relaxed text-neutral-600 sm:pb-5 sm:text-base">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
