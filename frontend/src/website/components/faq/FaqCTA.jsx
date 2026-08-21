import Container from "../common/Container";
import { ArrowRight,  } from "lucide-react";

const WHATSAPP_NUMBER = "923027069093";
const whatsappMessage = encodeURIComponent(
  "Hi, I have a question that wasn't covered in your FAQs."
);
const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

function WhatsappIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20 3.9A10 10 0 0 0 3.6 16.4L2 22l5.7-1.5A10 10 0 1 0 20 3.9Zm-8 16.6a8.4 8.4 0 0 1-4.3-1.2l-.3-.2-3.2.8.9-3.1-.2-.3A8.5 8.5 0 1 1 12 20.5Zm4.6-6.4c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.7.8-.8 1-.2.2-.3.2-.5.1a6.9 6.9 0 0 1-3.5-3c-.3-.4.3-.4.7-1.3.1-.2 0-.4 0-.5L8.6 7.3c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.2s.9 2.6 1.1 2.8c.1.2 1.9 2.9 4.6 4 .6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.2-.2-.4-.3Z" />
    </svg>
  );
}

export default function FaqCTA() {
  return (
    <section className="relative w-full overflow-hidden py-16 sm:py-20 md:py-24">
      {/* Background image - fully visible */}
      <img
        src="https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1600&q=80"
        alt="Natural wood grain texture"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Subtle directional gradient only where needed - image stays clear */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/25 to-black/50" />

      <Container>
        <div className="relative z-10 mx-auto max-w-lg text-center">
          <div className="mx-auto max-w-md rounded-lg bg-[#170e0a]/70 px-6 py-8 backdrop-blur-sm sm:px-10 sm:py-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#d4af6a]">
              Need Help Deciding?
            </p>

            <h2 className="mt-2 font-serif text-xl font-bold text-[#f7f0e2] sm:text-2xl md:text-3xl">
              Still have questions?
            </h2>

            <p className="mt-3 text-sm text-stone-300 sm:text-base">
              Can't find what you're looking for? Message our team directly
              and we'll get back to you right away.
            </p>

            
             <a href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex items-center gap-2 rounded-sm bg-emerald-600 px-8 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-white shadow-md transition-all duration-300 hover:bg-emerald-500"
            >
              <WhatsappIcon className="h-4 w-4 shrink-0" />
              <span>Chat on WhatsApp</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}