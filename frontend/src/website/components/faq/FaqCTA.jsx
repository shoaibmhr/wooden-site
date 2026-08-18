import Container from "../common/Container";

const WHATSAPP_NUMBER = "919509658944";
const whatsappMessage = encodeURIComponent("Hi, I have a question that wasn't covered in your FAQs.");
const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

export default function FaqCTA() {
  return (
    <section className="w-full bg-[#faf1e0] py-10 sm:py-12 md:py-16">
      <Container>
        <div className="mx-auto max-w-lg text-center">
          <h2 className="text-lg font-bold text-neutral-900 sm:text-xl">
            Still have questions?
          </h2>
          <p className="mt-2 text-sm text-neutral-600 sm:text-base">
            Can't find what you're looking for? Message us directly.
          </p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center bg-[#25D366] px-8 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#1ea952]"
          >
            Chat on WhatsApp
          </a>
        </div>
      </Container>
    </section>
  );
}
