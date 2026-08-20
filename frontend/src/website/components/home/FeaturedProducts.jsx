import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "../common/Container";
import ProductCard from "../common/ProductCard";
import { getProducts } from "../../../services/api";
import { products as fallbackProducts } from "../../data/products.data";

const WHATSAPP_NUMBER = "13103268940"; // from your navbar's (310) 326-8940 — change if different

export default function FeaturedProducts() {
  const [featured, setFeatured] = useState(() => fallbackProducts.slice(0, 6));

  useEffect(() => {
    let isMounted = true;
    getProducts().then((data) => {
      if (isMounted && data && data.length > 0) {
        setFeatured(data.slice(0, 6));
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hi, I'd like to get a quote for a wooden window/door from Restoration Sash & Door."
  )}`;

  return (
    <section className="w-full bg-[#F5EFE6] py-14 sm:py-16 md:py-20">
      <Container>
        <div className="mb-10 text-center sm:mb-12 md:mb-14">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A227]">
            Handcrafted in Los Angeles
          </span>
          <h2 className="mt-3 font-serif text-2xl text-[#7A1F2B] sm:text-3xl md:text-4xl">
            Our Featured Work
          </h2>
          <div className="mx-auto mt-4 h-[2px] w-16 bg-[#C9A227]" />
          <p className="mx-auto mt-4 max-w-xl text-sm text-neutral-600 sm:text-base">
            A look at the wooden windows and doors our craftsmen have built for
            homes across Southern California.
          </p>
        </div>

        {/* Grid & click-through logic unchanged */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:mt-14 sm:flex-row sm:gap-6">
          <Link
            to="/products"
            className="inline-flex items-center border border-[#7A1F2B] px-8 py-3 text-xs font-semibold uppercase tracking-widest text-[#7A1F2B] transition-all duration-300 hover:bg-[#7A1F2B] hover:text-white sm:px-10 sm:py-3.5 sm:text-sm"
          >
            View All Our Work
          </Link>

          
           <a href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] px-8 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-all duration-300 hover:bg-[#1DA851] sm:px-10 sm:py-3.5 sm:text-sm"
          >
            <svg
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.29-1.39a9.87 9.87 0 0 0 4.7 1.2h.01c5.46 0 9.9-4.45 9.9-9.9 0-2.65-1.03-5.13-2.9-7-1.87-1.87-4.35-2.91-7.01-2.91zm0 18.06h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.14.82.84-3.06-.2-.31a8.18 8.18 0 0 1-1.26-4.38c0-4.53 3.68-8.21 8.22-8.21 2.19 0 4.25.86 5.8 2.4a8.16 8.16 0 0 1 2.4 5.81c0 4.53-3.69 8.25-8.17 8.25zm4.48-6.13c-.25-.12-1.44-.71-1.66-.79-.22-.08-.38-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.53.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.22-1.46-1.37-1.7-.14-.24-.02-.37.11-.49.11-.11.25-.28.37-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.32-.75-1.81-.2-.48-.4-.41-.55-.42-.14-.01-.3-.01-.46-.01-.16 0-.42.06-.64.3-.22.24-.85.83-.85 2.02 0 1.19.87 2.34.99 2.5.12.16 1.71 2.61 4.14 3.66.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.47-.28z" />
            </svg>
            Message Us on WhatsApp
          </a>
        </div>
      </Container>
    </section>
  );
}