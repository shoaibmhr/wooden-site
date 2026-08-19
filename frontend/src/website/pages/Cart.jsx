import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import Container from "../components/common/Container";
import { useCart } from "../../store/hooks";
import PageHero from "../components/common/PageHero";

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

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  const getFullImageUrl = (img) => {
    if (!img) return "";
    if (img.startsWith("http://") || img.startsWith("https://")) return img;
    return `${window.location.origin}${img.startsWith("/") ? "" : "/"}${img}`;
  };

  const buildWhatsappMessage = () => {
    let msg = `🪵 *NEW CART ORDER INQUIRY - ASHTECH WOODEN* 🪵\n`;
    msg += `-----------------------------------------------\n`;
    msg += `Salam Ashtech Wooden! I would like to place an order for the following items:\n\n`;

    cartItems.forEach((item, index) => {
      const fullImg = getFullImageUrl(item.image);
      const productHref = `${window.location.origin}${item.href || `/products/${item.slug || item.id}`}`;
      msg += `${index + 1}. *${item.name}*\n`;
      msg += `   • Qty: ${item.quantity}\n`;
      msg += `   • Price: ${formatPrice(item.price * item.quantity)}\n`;
      if (fullImg) msg += `   • 🖼️ Image: ${fullImg}\n`;
      msg += `   • 🔗 Link: ${productHref}\n\n`;
    });

    msg += `-----------------------------------------------\n`;
    msg += `💰 *Total Amount:* ${formatPrice(cartTotal)}\n\n`;
    msg += `📏 *Custom Dimensions / Note:*\n`;
    msg += `[ Please mention if you require custom length, width, or specific polish for any item ]\n\n`;
    msg += `Kindly confirm product availability, customisation options, and delivery timeline.`;

    return encodeURIComponent(msg);
  };

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsappMessage()}`;

  return (
    <div>
      <PageHero
        image="https://images.unsplash.com/photo-1591434132137-37d04c53197e?auto=format&fit=crop&w=1600&q=80"
        title="Your Cart"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Cart", href: "/cart" },
        ]}
      />

      {cartItems.length === 0 ? (
        <section className="w-full bg-white py-16 sm:py-20">
          <Container>
            <div className="flex flex-col items-center text-center">
              <ShoppingBag
                className="h-14 w-14 text-neutral-300"
                strokeWidth={1.25}
              />
              <h2 className="mt-4 text-xl font-bold text-neutral-900 sm:text-2xl">
                Your cart is empty
              </h2>
              <p className="mt-2 text-sm text-neutral-600 sm:text-base">
                Looks like you haven't added anything yet.
              </p>
              <Link
                to="/products"
                className="mt-6 inline-flex items-center bg-[#5c1f1f] px-8 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-all duration-300 hover:bg-[#732929] sm:px-10 sm:text-sm"
              >
                Browse Products
              </Link>
            </div>
          </Container>
        </section>
      ) : (
        <section className="w-full bg-white py-8 sm:py-10 md:py-12">
          <Container>
            <div className="flex flex-col gap-8 lg:flex-row">
              {/* Cart items list */}
              <div className="flex-1 divide-y divide-neutral-200 border-y border-neutral-200">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 py-5">
                    <Link
                      to={item.href}
                      className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-neutral-50 sm:h-24 sm:w-24"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </Link>

                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <Link to={item.href}>
                          <h3 className="line-clamp-2 text-sm font-semibold text-neutral-900 hover:text-amber-900 sm:text-base">
                            {item.name}
                          </h3>
                        </Link>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          aria-label="Remove item"
                          className="shrink-0 text-neutral-400 transition-colors hover:text-[#5c1f1f]"
                        >
                          <Trash2 className="h-4 w-4" strokeWidth={1.75} />
                        </button>
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center border border-neutral-300">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            aria-label="Decrease quantity"
                            className="flex h-8 w-8 items-center justify-center text-neutral-600 hover:bg-neutral-50"
                          >
                            <Minus className="h-3.5 w-3.5" strokeWidth={1.75} />
                          </button>
                          <span className="flex h-8 w-9 items-center justify-center text-sm font-medium text-neutral-900">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            aria-label="Increase quantity"
                            className="flex h-8 w-8 items-center justify-center text-neutral-600 hover:bg-neutral-50"
                          >
                            <Plus className="h-3.5 w-3.5" strokeWidth={1.75} />
                          </button>
                        </div>

                        <span className="text-sm font-bold text-neutral-900 sm:text-base">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order summary */}
              <aside className="w-full shrink-0 lg:w-80">
                <div className="border border-neutral-200 p-5 sm:p-6">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-amber-800">
                    Order Summary
                  </h2>

                  <div className="mt-4 flex items-center justify-between text-sm text-neutral-600">
                    <span>
                      Subtotal (
                      {cartItems.reduce((sum, item) => sum + item.quantity, 0)}{" "}
                      items)
                    </span>
                    <span className="font-medium text-neutral-900">
                      {formatPrice(cartTotal)}
                    </span>
                  </div>

                  <div className="mt-4 border-t border-neutral-200 pt-4 flex items-center justify-between">
                    <span className="text-base font-bold text-neutral-900">
                      Total
                    </span>
                    <span className="text-lg font-bold text-neutral-900">
                      {formatPrice(cartTotal)}
                    </span>
                  </div>

                  <Link
                    to="/checkout"
                    className="mt-6 flex w-full items-center justify-center gap-2.5 bg-[#5c1f1f] px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#732929]"
                  >
                    <ShoppingBag className="h-5 w-5" />
                    Proceed to Checkout
                  </Link>

                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 flex w-full items-center justify-center gap-2.5 rounded border border-[#25D366] bg-green-50/50 px-6 py-3 text-sm font-bold text-[#1a9a4b] shadow-sm transition-colors duration-300 hover:bg-[#25D366] hover:text-white"
                  >
                    <WhatsappIcon className="h-5 w-5" />
                    Order on WhatsApp
                  </a>
                  <p className="mt-2 text-xs text-neutral-500">
                    All cart items & images will be pre-filled in your WhatsApp message.
                  </p>

                  <Link
                    to="/products"
                    className="mt-4 block text-center text-sm font-medium text-neutral-600 underline transition-colors hover:text-amber-900"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </aside>
            </div>
          </Container>
        </section>
      )}
    </div>
  );
}

