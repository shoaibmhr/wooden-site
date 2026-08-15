import { Link } from "react-router-dom";
import { Ruler, Package } from "lucide-react";
import Container from "../common/Container";

const WHATSAPP_NUMBER = "919509658944";
const whatsappMessage = encodeURIComponent(
  "Hi, I'd like to enquire about getting custom-made furniture for my space.",
);
const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

export default function ServicePathCards() {
  return (
    <section className="w-full bg-white py-10 sm:py-12 md:py-16">
      <Container>
        <div className="mb-8 text-center sm:mb-10 md:mb-12">
          <h2 className="text-2xl font-bold tracking-wide text-amber-900 sm:text-3xl md:text-4xl">
            Choose What Works for You
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
          {/* Custom Made */}
          <div className="flex flex-col items-center border border-neutral-200 p-6 text-center transition-shadow duration-300 hover:shadow-lg sm:p-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-50 text-amber-900 sm:h-16 sm:w-16">
              <Ruler className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.75} />
            </div>
            <h3 className="mt-4 text-lg font-bold text-neutral-900 sm:text-xl">
              Custom Made
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600 sm:text-base">
              Have specific dimensions or a design in mind? We'll build it
              exactly to your space, discussed over WhatsApp.
            </p>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex w-full items-center justify-center bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#1ea952]"
            >
              Chat on WhatsApp
            </a>
          </div>

          {/* Standard Sizes */}
          <div className="flex flex-col items-center border border-neutral-200 p-6 text-center transition-shadow duration-300 hover:shadow-lg sm:p-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-50 text-amber-900 sm:h-16 sm:w-16">
              <Package className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.75} />
            </div>
            <h3 className="mt-4 text-lg font-bold text-neutral-900 sm:text-xl">
              Standard Sizes
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600 sm:text-base">
              Prefer to order right away? Browse our ready-made sizes and add
              them straight to your cart.
            </p>
            <Link
              to="/products"
              className="mt-6 flex w-full items-center justify-center bg-[#5c1f1f] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-[#732929]"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
