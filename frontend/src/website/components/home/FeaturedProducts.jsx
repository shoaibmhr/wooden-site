import { useState, useEffect, useRef } from "react";
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


function useInView(threshold = 0.15) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible];
}

export default function FeaturedProducts() {
  const [featured, setFeatured] = useState(() => fallbackProducts.slice(0, 6));
  const [sectionRef, isVisible] = useInView(0.1);

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
    "Hello, I came across WoodenSite and I'm interested in getting a quote for custom furniture and interior doors. Could you please share more details?"
  );
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`;

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#FAF6EF] py-16 sm:py-20 md:py-24 border-t border-[#17130F]/10"
    >
      <Container>
        {/* Header */}
        <div className="mb-12 text-center sm:mb-14 md:mb-16">
          <span
            className={`text-[11px] font-medium uppercase tracking-[0.3em] text-[#A9793C] transition-all duration-700 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "80ms" }}
          >
            Handcrafted Woodwork Showcase
          </span>

          <h2
            className={`mt-3 font-serif text-3xl sm:text-4xl md:text-[2.75rem] text-[#17130F] tracking-tight leading-tight transition-all duration-[900ms] ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "180ms" }}
          >
            Featured Architectural Designs
          </h2>

          <div
            className={`mx-auto mt-5 h-px bg-[#A9793C] transition-all duration-[900ms] ease-out ${
              isVisible ? "w-12 opacity-100" : "w-0 opacity-0"
            }`}
            style={{ transitionDelay: "340ms" }}
          />

          <p
            className={`mx-auto mt-5 max-w-xl text-xs sm:text-sm text-[#5C5142] leading-relaxed transition-all duration-700 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "420ms" }}
          >
            A glance at custom doors, luxury dining, bed sets, and interior wood
            paneling crafted for our clients.
          </p>
        </div>

        {/* Product grid — each card staggers in on scroll */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {featured.map((product, idx) => (
            <div
              key={product.id}
              className={`transition-all duration-700 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${520 + (idx % 3) * 130}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div
          className={`mt-14 flex flex-col items-center justify-center gap-4 sm:mt-16 sm:flex-row sm:gap-5 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "900ms" }}
        >
          <Link
            to="/products"
            className="group flex w-full items-center justify-center gap-2 bg-[#17130F] px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-[#F3ECDD] transition-all duration-300 hover:bg-[#241C15] sm:w-auto sm:text-sm"
          >
            <span>Explore Full Showcase</span>
            <ArrowRight className="h-4 w-4 text-[#A9793C] transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex w-full items-center justify-center gap-2.5 bg-[#1F7A52] px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:bg-[#186541] sm:w-auto sm:text-sm"
          >
            <WhatsappIcon className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:scale-110" />
            <span>Consult Master Craftsman</span>
          </a>
        </div>
      </Container>
    </section>
  );
}