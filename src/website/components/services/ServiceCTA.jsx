import { Link } from "react-router-dom";
import Container from "../common/Container";

const WHATSAPP_NUMBER = "919509658944";
const whatsappMessage = encodeURIComponent(
  "Hi, I have a question about your furniture services.",
);
const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

export default function ServiceCTA() {
  return (
    <section className="w-full bg-[#241713] py-12 sm:py-16">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-xl font-bold text-white sm:text-2xl md:text-3xl">
            Still not sure which option is right for you?
          </h2>
          <p className="mt-3 text-sm text-stone-400 sm:text-base">
            Message us on WhatsApp — we're happy to help you decide.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center bg-[#25D366] px-8 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#1ea952]"
            >
              Chat on WhatsApp
            </a>
            <Link
              to="/products"
              className="flex items-center justify-center border border-white/30 px-8 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-white/10"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
