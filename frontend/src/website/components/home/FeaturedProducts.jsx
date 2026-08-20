import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "../common/Container";
import ProductCard from "../common/ProductCard";
import { getProducts } from "../../../services/api";
import { products as fallbackProducts } from "../../data/products.data";
import { ArrowRight } from "lucide-react";

const WHATSAPP_NUMBER = "923027069093";

function WhatsappIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20 3.9A10 10 0 0 0 3.6 16.4L2 22l5.7-1.5A10 10 0 1 0 20 3.9Zm-8 16.6a8.4 8.4 0 0 1-4.3-1.2l-.3-.2-3.2.8.9-3.1-.2-.3A8.5 8.5 0 1 1 12 20.5Zm4.6-6.4c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.7.8-.8 1-.2.2-.3.2-.5.1a6.9 6.9 0 0 1-3.5-3c-.3-.4.3-.4.7-1.3.1-.2 0-.4 0-.5L8.6 7.3c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.2s.9 2.6 1.1 2.8c.1.2 1.9 2.9 4.6 4 .6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.2-.2-.4-.3Z" />
    </svg>
  );
}

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

  const waMsg = encodeURIComponent(
    "Salam Ashtech Wooden! Mujhe custom furniture aur interior doors ke quotes chahiye."
  );
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`;

  return (
    <section className="w-full bg-[#faf6ef] py-14 sm:py-16 md:py-20 border-t border-[#ecdfc4]">
      <Container>
        <div className="mb-10 text-center sm:mb-12 md:mb-14">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b8863f]">
            Handcrafted Woodwork Showcase
          </span>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-[#2b1710]">
            Featured Architectural Designs
          </h2>
          <div className="mx-auto mt-4 h-0.5 w-20 bg-[#d4af6a]" />
          <p className="mx-auto mt-4 max-w-xl text-xs sm:text-sm text-neutral-600">
            A glance at custom doors, luxury dining, bed sets, and interior wood paneling crafted for our clients.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:mt-14 sm:flex-row sm:gap-5">
          <Link
            to="/products"
            className="flex items-center justify-center gap-2 rounded-lg bg-[#2b1710] px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-[0.12em] text-[#f0d9a8] shadow-md transition-all duration-300 hover:bg-[#3e2723]"
          >
            <span>Explore Full Showcase</span>
            <ArrowRight className="h-4 w-4 text-[#d4af6a]" />
          </Link>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 rounded-lg bg-emerald-600 px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-[0.12em] text-white shadow-md transition-all duration-300 hover:bg-emerald-500"
          >
            <WhatsappIcon className="h-4 w-4 shrink-0" />
            <span>Consult Master Craftsman</span>
          </a>
        </div>
      </Container>
    </section>
  );
}