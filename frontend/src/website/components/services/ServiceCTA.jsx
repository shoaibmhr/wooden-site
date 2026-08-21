import { Link } from "react-router-dom";
import Container from "../common/Container";
import { ArrowRight } from "lucide-react";

const WHATSAPP_NUMBER = "923027069093";
const whatsappMessage = encodeURIComponent(
  "Hi, I'd like to customize a piece of furniture for my space."
);
const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

function WhatsappIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20 3.9A10 10 0 0 0 3.6 16.4L2 22l5.7-1.5A10 10 0 1 0 20 3.9Zm-8 16.6a8.4 8.4 0 0 1-4.3-1.2l-.3-.2-3.2.8.9-3.1-.2-.3A8.5 8.5 0 1 1 12 20.5Zm4.6-6.4c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.7.8-.8 1-.2.2-.3.2-.5.1a6.9 6.9 0 0 1-3.5-3c-.3-.4.3-.4.7-1.3.1-.2 0-.4 0-.5L8.6 7.3c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.2s.9 2.6 1.1 2.8c.1.2 1.9 2.9 4.6 4 .6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.2-.2-.4-.3Z" />
    </svg>
  );
}

export default function ServiceCTA() {
  return (
    <section className="relative w-full overflow-hidden bg-[#170e0a] py-20 sm:py-24 md:py-28">
      {/* Background image */}
      <img
        src="https://images.unsplash.com/photo-1601058268499-e52658b8bb88?auto=format&fit=crop&w=1800&q=80"
        alt="Craftsman working on custom wooden furniture"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay for text readability + brand mood */}
      <div className="absolute inset-0 bg-[#170e0a]/80" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#170e0a] via-[#170e0a]/50 to-[#170e0a]/70" />

      <Container>
        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#d4af6a]">
            Bespoke Woodcraft
          </p>

          <h2 className="mt-3 font-serif text-2xl font-semibold leading-tight text-[#f7f0e2] sm:text-3xl md:text-4xl">
            Want something made just for you?
          </h2>

          <p className="mt-5 text-sm text-stone-300 sm:text-base">
            Share your vision and our master craftsmen will bring it to life —
            tailored to your space, your style, your story.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            
            <a  href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2 rounded-sm bg-emerald-600 px-8 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-white shadow-md transition-all duration-300 hover:bg-emerald-500"
            >
              <WhatsappIcon className="h-4 w-4 shrink-0" />
              <span>Customize on WhatsApp</span>
            </a>

            <Link
              to="/contact"
              className="group flex items-center justify-center gap-2 rounded-sm border border-[#d4af6a]/40 px-8 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-[#f7f0e2] transition-all duration-300 hover:border-[#d4af6a] hover:bg-[#d4af6a]/10"
            >
              <span>Contact Us</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}