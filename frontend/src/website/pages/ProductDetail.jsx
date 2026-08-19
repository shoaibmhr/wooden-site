import { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Star, Heart, ShoppingCart, Minus, Plus, Ruler, Sparkles } from "lucide-react";
import Container from "../components/common/Container";
import Breadcrumbs from "../components/common/Breadcrumbs";
import { getProductBySlug } from "../../services/api";
import { products as fallbackProducts } from "../data/products.data";
import { useCart, useWishlist } from "../../store/hooks";
import { useToast } from "../components/common/Toast";

// WhatsApp Business Number for Ashtech Wooden
const WHATSAPP_NUMBER = "923027069093";

function WhatsappIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20 3.9A10 10 0 0 0 3.6 16.4L2 22l5.7-1.5A10 10 0 1 0 20 3.9Zm-8 16.6a8.4 8.4 0 0 1-4.3-1.2l-.3-.2-3.2.8.9-3.1-.2-.3A8.5 8.5 0 1 1 12 20.5Zm4.6-6.4c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.7.8-.8 1-.2.2-.3.2-.5.1a6.9 6.9 0 0 1-3.5-3c-.3-.4.3-.4.7-1.3.1-.2 0-.4 0-.5L8.6 7.3c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.2s.9 2.6 1.1 2.8c.1.2 1.9 2.9 4.6 4 .6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.2-.2-.4-.3Z" />
    </svg>
  );
}

function formatPrice(value) {
  return `PKR ${Number(value).toLocaleString("en-PK")}`;
}

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(
    () => fallbackProducts.find((p) => p.id === id || p.slug === id) || null,
  );

  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Custom Dimensions & Customization State
  const [customLength, setCustomLength] = useState("");
  const [customWidth, setCustomWidth] = useState("");
  const [customUnit, setCustomUnit] = useState("Feet");
  const [customPolish, setCustomPolish] = useState("Natural Teak");
  const [customNotes, setCustomNotes] = useState("");

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  useEffect(() => {
    let isMounted = true;
    if (id) {
      getProductBySlug(id).then((data) => {
        if (isMounted && data) {
          setProduct(data);
        }
      });
    }
    return () => {
      isMounted = false;
    };
  }, [id]);

  if (!product) {
    return <Navigate to="/products" replace />;
  }

  const discountPercent = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : null;
  const inWishlist = isInWishlist(product.id);
  const gallery =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];

  const currentImage = gallery[activeImage] || product.image;
  
  // Resolve absolute image URL for WhatsApp card preview
  const absoluteImageUrl = currentImage?.startsWith("http")
    ? currentImage
    : `${window.location.origin}${currentImage?.startsWith("/") ? "" : "/"}${currentImage || ""}`;

  const currentProductUrl = window.location.href;

  // Build high-converting, professional WhatsApp custom order message
  const buildWhatsAppMessage = () => {
    let message = `🪵 *CUSTOM WOODEN ORDER - ASHTECH WOODEN* 🪵\n`;
    message += `-----------------------------------------------\n`;
    message += `📦 *Product:* ${product.name}\n`;
    if (product.category) message += `🏷️ *Category:* ${product.category}\n`;
    message += `💰 *Catalog Price:* ${formatPrice(product.price)}\n`;
    message += `🖼️ *Product Image:* ${absoluteImageUrl}\n`;
    message += `🔗 *Product Link:* ${currentProductUrl}\n`;
    message += `-----------------------------------------------\n`;
    message += `📏 *CUSTOM MEASUREMENTS & REQUIREMENTS:*\n`;
    
    if (customLength) {
      message += `• *Length:* ${customLength} ${customUnit}\n`;
    } else {
      message += `• *Length:* [ _Enter desired length_ ]\n`;
    }

    if (customWidth) {
      message += `• *Width:* ${customWidth} ${customUnit}\n`;
    } else {
      message += `• *Width:* [ _Enter desired width_ ]\n`;
    }

    if (customPolish) {
      message += `• *Polish/Finish:* ${customPolish}\n`;
    }

    if (customNotes.trim()) {
      message += `• *Special Request:* ${customNotes.trim()}\n`;
    }

    message += `• *Quantity:* ${quantity}\n`;
    message += `-----------------------------------------------\n`;
    message += `Salam Ashtech Wooden! Mujhe ye product apne custom size ke mutabiq ready karwana hai. Kindly image aur dimensions check kar ke final price quote aur delivery time share karein.`;

    return encodeURIComponent(message);
  };

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMessage()}`;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addToCart(product);
    showToast(`${product.name} added to cart`);
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
    showToast(
      inWishlist
        ? `${product.name} removed from wishlist`
        : `${product.name} added to wishlist`,
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
            <div className="aspect-square w-full overflow-hidden rounded-xl border border-neutral-100 bg-neutral-50 shadow-sm">
              <img
                src={currentImage}
                alt={product.name}
                className="h-full w-full object-cover transition-all duration-300"
              />
            </div>
            {gallery.length > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                {gallery.map((img, index) => (
                  <button
                    key={img}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    className={`h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                      activeImage === index
                        ? "border-[#5c1f1f] ring-2 ring-[#5c1f1f]/20"
                        : "border-transparent hover:border-neutral-300"
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="h-full w-full object-cover"
                    />
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
              <Star
                className="h-4 w-4 text-amber-500"
                fill="currentColor"
                strokeWidth={0}
              />
              <span className="text-sm font-medium text-neutral-700">
                {product.rating}
              </span>
              <span className="text-sm text-neutral-400">
                ({product.reviews} reviews)
              </span>
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

            <p className="mt-4 text-sm leading-relaxed text-neutral-600 sm:text-base">
              {product.description}
            </p>

            {/* ========================================================
                CUSTOM SIZE & WHATSAPP ORDER SECTION
                User can fill length, width, polish & send directly
            ========================================================= */}
            <div className="mt-6 rounded-xl border-2 border-emerald-100 bg-[#f4fcf6] p-4 sm:p-5 shadow-sm">
              <div className="flex items-center gap-2 text-emerald-800">
                <Ruler className="h-5 w-5 text-emerald-600" />
                <h3 className="text-sm font-bold uppercase tracking-wider">
                  Custom Size & Direct WhatsApp Order
                </h3>
              </div>
              <p className="mt-1 text-xs text-neutral-600">
                Enter your required dimensions below, or click directly to discuss size & polish with our craftsman on WhatsApp.
              </p>

              {/* Length, Width and Unit Inputs */}
              <div className="mt-3.5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-700">
                    Length
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 6"
                    value={customLength}
                    onChange={(e) => setCustomLength(e.target.value)}
                    className="mt-1 w-full rounded border border-neutral-300 bg-white px-2.5 py-1.5 text-xs text-neutral-800 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-700">
                    Width
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 3.5"
                    value={customWidth}
                    onChange={(e) => setCustomWidth(e.target.value)}
                    className="mt-1 w-full rounded border border-neutral-300 bg-white px-2.5 py-1.5 text-xs text-neutral-800 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-700">
                    Unit
                  </label>
                  <select
                    value={customUnit}
                    onChange={(e) => setCustomUnit(e.target.value)}
                    className="mt-1 w-full rounded border border-neutral-300 bg-white px-2.5 py-1.5 text-xs text-neutral-800 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  >
                    <option value="Feet">Feet (ft)</option>
                    <option value="Inches">Inches (in)</option>
                    <option value="cm">Centimeters (cm)</option>
                    <option value="Meters">Meters (m)</option>
                  </select>
                </div>
              </div>

              {/* Polish / Finish Selection */}
              <div className="mt-3">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-700">
                  Polish / Finish Preference
                </label>
                <select
                  value={customPolish}
                  onChange={(e) => setCustomPolish(e.target.value)}
                  className="mt-1 w-full rounded border border-neutral-300 bg-white px-2.5 py-1.5 text-xs text-neutral-800 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                >
                  <option value="Natural Teak Finish">Natural Teak Finish</option>
                  <option value="Dark Walnut Polish">Dark Walnut Polish</option>
                  <option value="Sheesham Honey Finish">Sheesham Honey Finish</option>
                  <option value="Matt Black Modern">Matt Black Modern</option>
                  <option value="High Gloss Lacquer">High Gloss Lacquer</option>
                  <option value="Raw Unpolished Wood">Raw Unpolished Wood</option>
                </select>
              </div>

              {/* Special Note */}
              <div className="mt-2.5">
                <input
                  type="text"
                  placeholder="Additional note (e.g. storage drawers, carved border)"
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  className="w-full rounded border border-neutral-300 bg-white px-2.5 py-1.5 text-xs text-neutral-800 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              {/* Main WhatsApp CTA Button */}
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex w-full items-center justify-center gap-2.5 rounded-lg bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-md transition-all duration-300 hover:bg-[#1ea952] hover:shadow-lg active:scale-[0.99]"
              >
                <WhatsappIcon className="h-5 w-5 shrink-0" />
                <span>Order on WhatsApp with Custom Size</span>
              </a>

              <div className="mt-2 flex items-center justify-center gap-1.5 text-[11px] text-emerald-800">
                <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                <span>Product image & dimensions will be sent to WhatsApp automatically</span>
              </div>
            </div>

            {/* Standard Cart & Checkout Actions */}
            <div className="mt-6 border-t border-neutral-200 pt-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-neutral-300 rounded">
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
                  className="flex flex-1 items-center justify-center gap-2 rounded bg-[#5c1f1f] px-4 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-[#732929]"
                >
                  <ShoppingCart className="h-4 w-4" strokeWidth={1.75} />
                  Add to Cart
                </button>

                <button
                  type="button"
                  onClick={handleToggleWishlist}
                  aria-label={
                    inWishlist ? "Remove from wishlist" : "Add to wishlist"
                  }
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded border transition-colors duration-200 ${
                    inWishlist
                      ? "border-[#5c1f1f] bg-[#5c1f1f] text-white"
                      : "border-neutral-300 text-neutral-700 hover:border-[#5c1f1f] hover:text-[#5c1f1f]"
                  }`}
                >
                  <Heart
                    className="h-5 w-5"
                    strokeWidth={1.75}
                    fill={inWishlist ? "currentColor" : "none"}
                  />
                </button>
              </div>

              {/* Proceed to Cart/Checkout */}
              <Link
                to="/cart"
                className="mt-3 flex w-full items-center justify-center rounded border border-[#5c1f1f] px-4 py-3 text-sm font-semibold uppercase tracking-wide text-[#5c1f1f] transition-all duration-300 hover:bg-[#5c1f1f] hover:text-white"
              >
                View Cart & Checkout
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

