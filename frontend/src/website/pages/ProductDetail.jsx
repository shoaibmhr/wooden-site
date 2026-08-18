import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Star, Heart, ShoppingCart, Minus, Plus } from "lucide-react";
import Container from "../components/common/Container";
import Breadcrumbs from "../components/common/Breadcrumbs";
import { products } from "../data/products.data";
import { useCart, useWishlist } from "../../store/hooks";
import { useToast } from "../components/common/Toast";

// Replace with your actual WhatsApp business number (with country code, no + or spaces)
const WHATSAPP_NUMBER = "919509658944";

function WhatsappIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20 3.9A10 10 0 0 0 3.6 16.4L2 22l5.7-1.5A10 10 0 1 0 20 3.9Zm-8 16.6a8.4 8.4 0 0 1-4.3-1.2l-.3-.2-3.2.8.9-3.1-.2-.3A8.5 8.5 0 1 1 12 20.5Zm4.6-6.4c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.7.8-.8 1-.2.2-.3.2-.5.1a6.9 6.9 0 0 1-3.5-3c-.3-.4.3-.4.7-1.3.1-.2 0-.4 0-.5L8.6 7.3c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.2s.9 2.6 1.1 2.8c.1.2 1.9 2.9 4.6 4 .6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.2-.2-.4-.3Z" />
    </svg>
  );
}

function formatPrice(value) {
  return `₹${value.toLocaleString("en-IN")}`;
}

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  if (!product) {
    return <Navigate to="/products" replace />;
  }

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;
  const inWishlist = isInWishlist(product.id);
  const gallery = product.images && product.images.length > 0 ? product.images : [product.image];

  const whatsappMessage = encodeURIComponent(
    `Hi, I'm interested in "${product.name}" (${formatPrice(product.price)}) — ${window.location.href}\n\nCould you share more details and customisation options?`
  );
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addToCart(product);
    showToast(`${product.name} added to cart`);
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
    showToast(
      inWishlist ? `${product.name} removed from wishlist` : `${product.name} added to wishlist`
    );
  };

  return (
    <section className="w-full bg-white py-8 sm:py-10 md:py-12">
      <Container>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            { label: product.name, href: product.href },
          ]}
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Image gallery */}
          <div>
            <div className="aspect-square w-full overflow-hidden rounded-xl bg-neutral-50">
              <img
                src={gallery[activeImage]}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            {gallery.length > 1 && (
              <div className="mt-3 flex gap-2">
                {gallery.map((img, index) => (
                  <button
                    key={img}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    className={`h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                      activeImage === index ? "border-[#5c1f1f]" : "border-transparent"
                    }`}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-800">
              {product.category}
            </span>
            <h1 className="mt-2 text-2xl font-bold leading-snug text-neutral-900 sm:text-3xl">
              {product.name}
            </h1>

            <div className="mt-3 flex items-center gap-1.5">
              <Star className="h-4 w-4 text-amber-500" fill="currentColor" strokeWidth={0} />
              <span className="text-sm font-medium text-neutral-700">{product.rating}</span>
              <span className="text-sm text-neutral-400">({product.reviews} reviews)</span>
            </div>

            <div className="mt-4 flex flex-wrap items-baseline gap-x-3">
              <span className="text-2xl font-bold text-neutral-900 sm:text-3xl">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-base text-neutral-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="rounded bg-[#5c1f1f] px-2 py-1 text-xs font-semibold text-white">
                    {discountPercent}% Off
                  </span>
                </>
              )}
            </div>

            <p className="mt-5 text-sm leading-relaxed text-neutral-600 sm:text-base">
              {product.description}
            </p>

            {/* WhatsApp enquiry — primary CTA for custom sizing */}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex w-full items-center justify-center gap-2.5 bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#1ea952] sm:py-4"
            >
              <WhatsappIcon className="h-5 w-5" />
              Chat on WhatsApp for Custom Size
            </a>
            <p className="mt-2 text-xs text-neutral-500">
              Need a different length or width? Message us on WhatsApp with your measurements for a custom quote.
            </p>

            <div className="mt-6 border-t border-neutral-200 pt-6">
              {/* Quantity + Add to Cart */}
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-neutral-300">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="flex h-11 w-11 items-center justify-center text-neutral-600 hover:bg-neutral-50"
                  >
                    <Minus className="h-4 w-4" strokeWidth={1.75} />
                  </button>
                  <span className="flex h-11 w-12 items-center justify-center text-sm font-medium text-neutral-900">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Increase quantity"
                    className="flex h-11 w-11 items-center justify-center text-neutral-600 hover:bg-neutral-50"
                  >
                    <Plus className="h-4 w-4" strokeWidth={1.75} />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex flex-1 items-center justify-center gap-2 bg-[#5c1f1f] px-4 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-[#732929]"
                >
                  <ShoppingCart className="h-4 w-4" strokeWidth={1.75} />
                  Add to Cart
                </button>

                <button
                  type="button"
                  onClick={handleToggleWishlist}
                  aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
                  className={`flex h-11 w-11 shrink-0 items-center justify-center border transition-colors duration-200 ${
                    inWishlist
                      ? "border-[#5c1f1f] bg-[#5c1f1f] text-white"
                      : "border-neutral-300 text-neutral-700 hover:border-[#5c1f1f] hover:text-[#5c1f1f]"
                  }`}
                >
                  <Heart className="h-5 w-5" strokeWidth={1.75} fill={inWishlist ? "currentColor" : "none"} />
                </button>
              </div>

              {/* Place order */}
              <Link
                to="/cart"
                className="mt-3 flex w-full items-center justify-center border border-[#5c1f1f] px-4 py-3 text-sm font-semibold uppercase tracking-wide text-[#5c1f1f] transition-all duration-300 hover:bg-[#5c1f1f] hover:text-white"
              >
                Place Order
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
