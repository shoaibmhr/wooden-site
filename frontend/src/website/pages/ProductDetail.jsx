import { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Ruler, Sparkles, ArrowRight, ShieldCheck, Hammer, CheckCircle2 } from "lucide-react";
import Container from "../components/common/Container";
import Breadcrumbs from "../components/common/Breadcrumbs";
import { getProductBySlug } from "../../services/api";
import { products as fallbackProducts } from "../data/products.data";

// WhatsApp Business Number for Ashtech Wooden
const WHATSAPP_NUMBER = "923027069093";

function WhatsappIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20 3.9A10 10 0 0 0 3.6 16.4L2 22l5.7-1.5A10 10 0 1 0 20 3.9Zm-8 16.6a8.4 8.4 0 0 1-4.3-1.2l-.3-.2-3.2.8.9-3.1-.2-.3A8.5 8.5 0 1 1 12 20.5Zm4.6-6.4c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.7.8-.8 1-.2.2-.3.2-.5.1a6.9 6.9 0 0 1-3.5-3c-.3-.4.3-.4.7-1.3.1-.2 0-.4 0-.5L8.6 7.3c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.2s.9 2.6 1.1 2.8c.1.2 1.9 2.9 4.6 4 .6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.2-.2-.4-.3Z" />
    </svg>
  );
}

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(
    () => fallbackProducts.find((p) => p.id === id || p.slug === id) || null,
  );

  const [activeImage, setActiveImage] = useState(0);

  // Custom Dimensions & Customization State
  const [customLength, setCustomLength] = useState("");
  const [customWidth, setCustomWidth] = useState("");
  const [customUnit, setCustomUnit] = useState("Feet");
  const [customPolish, setCustomPolish] = useState("Natural Teak Finish");
  const [customNotes, setCustomNotes] = useState("");

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

  const gallery =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];

  const currentImage = gallery[activeImage] || product.image;
  
  const absoluteImageUrl = currentImage?.startsWith("http")
    ? currentImage
    : `${window.location.origin}${currentImage?.startsWith("/") ? "" : "/"}${currentImage || ""}`;

  const currentProductUrl = window.location.href;

  const buildWhatsAppMessage = () => {
    let message = `🪵 *CUSTOM WOODWORK INQUIRY - ASHTECH WOODEN* 🪵\n`;
    message += `-----------------------------------------------\n`;
    message += `📦 *Design:* ${product.name}\n`;
    if (product.category) message += `🏷️ *Category:* ${product.category}\n`;
    message += `🖼️ *Photo:* ${absoluteImageUrl}\n`;
    message += `🔗 *Link:* ${currentProductUrl}\n`;
    message += `-----------------------------------------------\n`;
    message += `📏 *CUSTOM SPECIFICATIONS & DIMENSIONS:*\n`;
    
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
      message += `• *Timber Finish:* ${customPolish}\n`;
    }

    if (customNotes.trim()) {
      message += `• *Custom Request:* ${customNotes.trim()}\n`;
    }

    message += `-----------------------------------------------\n`;
    message += `Salam Ashtech Wooden! Mujhe ye project apne room / villa ke custom size ke mutabiq ready karwana hai. Kindly image aur dimensions check kar ke estimated price quote aur delivery time share karein.`;

    return encodeURIComponent(message);
  };

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMessage()}`;

  return (
    <section className="w-full bg-[#faf6ef] py-10 sm:py-12 md:py-16">
      <Container>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Showcase", href: "/products" },
            { label: product.name, href: product.href },
          ]}
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Image gallery */}
          <div>
            <div className="aspect-[4/3] sm:aspect-square w-full overflow-hidden rounded-2xl border border-[#ecdfc4] bg-white shadow-xl">
              <img
                src={currentImage}
                alt={product.name}
                className="h-full w-full object-cover transition-all duration-500"
              />
            </div>
            {gallery.length > 1 && (
              <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                {gallery.map((img, index) => (
                  <button
                    key={img}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    className={`h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                      activeImage === index
                        ? "border-[#2b1710] ring-2 ring-[#d4af6a]"
                        : "border-transparent opacity-70 hover:opacity-100"
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
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b8863f]">
              {product.category || "Bespoke Woodcraft"}
            </span>
            <h1 className="mt-2 font-serif text-3xl font-bold leading-tight text-[#2b1710] sm:text-4xl">
              {product.name}
            </h1>

            <div className="mt-4 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-3 py-1 rounded-md border border-emerald-300">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-700" />
                Custom Size & Timber Finish Available
              </span>
            </div>

            <div className="mt-5 rounded-lg bg-[#2b1710]/5 border border-[#ecdfc4] p-4">
              <p className="text-xs uppercase tracking-widest font-semibold text-[#b8863f]">
                Price Quote Policy
              </p>
              <p className="mt-1 text-sm font-serif font-bold text-[#2b1710]">
                Price Available Upon Dimension & Wood Species Selection
              </p>
              <p className="mt-1 text-xs text-neutral-600">
                Since every piece is custom handcrafted for your space, final price depends on dimensions, timber species (Teak, Sheesham, Oak), and polish complexity.
              </p>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-[#5c4a3b] sm:text-base">
              {product.description}
            </p>

            {/* Custom Sizing & Direct WhatsApp Inquiry Box */}
            <div className="mt-8 rounded-2xl border-2 border-[#d4af6a]/40 bg-white p-5 sm:p-6 shadow-xl relative overflow-hidden">
              <div className="flex items-center gap-2.5 text-[#2b1710]">
                <Ruler className="h-5 w-5 text-[#b8863f]" />
                <h3 className="font-serif text-base font-bold uppercase tracking-wider">
                  Select Custom Dimensions & Polish
                </h3>
              </div>
              <p className="mt-1 text-xs text-neutral-600">
                Enter your exact room dimensions below to send a direct inquiry to our master craftsman on WhatsApp:
              </p>

              {/* Length, Width & Unit */}
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#2b1710]">
                    Length
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 7"
                    value={customLength}
                    onChange={(e) => setCustomLength(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-[#ecdfc4] bg-[#faf6ef] px-3 py-2 text-xs text-neutral-900 focus:border-[#b8863f] focus:outline-none focus:ring-1 focus:ring-[#b8863f]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#2b1710]">
                    Width
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 3.5"
                    value={customWidth}
                    onChange={(e) => setCustomWidth(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-[#ecdfc4] bg-[#faf6ef] px-3 py-2 text-xs text-neutral-900 focus:border-[#b8863f] focus:outline-none focus:ring-1 focus:ring-[#b8863f]"
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#2b1710]">
                    Unit
                  </label>
                  <select
                    value={customUnit}
                    onChange={(e) => setCustomUnit(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-[#ecdfc4] bg-[#faf6ef] px-3 py-2 text-xs text-neutral-900 focus:border-[#b8863f] focus:outline-none focus:ring-1 focus:ring-[#b8863f]"
                  >
                    <option value="Feet">Feet (ft)</option>
                    <option value="Inches">Inches (in)</option>
                    <option value="cm">Centimeters (cm)</option>
                    <option value="Meters">Meters (m)</option>
                  </select>
                </div>
              </div>

              {/* Polish Finish Selection */}
              <div className="mt-3.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#2b1710]">
                  Timber Polish / Finish Selection
                </label>
                <select
                  value={customPolish}
                  onChange={(e) => setCustomPolish(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-[#ecdfc4] bg-[#faf6ef] px-3 py-2 text-xs text-neutral-900 focus:border-[#b8863f] focus:outline-none focus:ring-1 focus:ring-[#b8863f]"
                >
                  <option value="Natural Teak Finish">Natural Teak Polish</option>
                  <option value="Dark Walnut Polish">Dark Walnut Polish</option>
                  <option value="Sheesham Honey Finish">Sheesham Honey Finish</option>
                  <option value="Matt Black Modern">Matt Black Modern</option>
                  <option value="High Gloss Lacquer">High Gloss Lacquer</option>
                  <option value="Raw Seasoned Hardwood">Raw Seasoned Hardwood</option>
                </select>
              </div>

              {/* Special Note */}
              <div className="mt-3">
                <input
                  type="text"
                  placeholder="Special instructions (e.g. carved border, glass fittings)"
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  className="w-full rounded-lg border border-[#ecdfc4] bg-[#faf6ef] px-3 py-2 text-xs text-neutral-900 focus:border-[#b8863f] focus:outline-none focus:ring-1 focus:ring-[#b8863f]"
                />
              </div>

              {/* Hero Action Buttons — Single line WhatsApp */}
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:from-emerald-500 hover:to-emerald-400 hover:shadow-xl active:scale-[0.99]"
              >
                <WhatsappIcon className="h-5 w-5 shrink-0" />
                <span>Inquire on WhatsApp</span>
              </a>

              <Link
                to="/get-quote"
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-[#2b1710] bg-[#2b1710] px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#f0d9a8] transition-colors hover:bg-[#3e2723]"
              >
                <span>Request Formal PDF Quote</span>
                <ArrowRight className="h-4 w-4 text-[#d4af6a]" />
              </Link>
            </div>

            {/* Quality Badges */}
            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-[#ecdfc4] pt-6">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="h-5 w-5 text-[#b8863f]" />
                <div>
                  <h4 className="text-xs font-bold text-[#2b1710]">Seasoned Timber</h4>
                  <p className="text-[10px] text-neutral-500">Kiln-dried & termite treated</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Hammer className="h-5 w-5 text-[#b8863f]" />
                <div>
                  <h4 className="text-xs font-bold text-[#2b1710]">Turnkey Fitting</h4>
                  <p className="text-[10px] text-neutral-500">Site measurement & installation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
