import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, ShoppingBag } from "lucide-react";
import Container from "../components/common/Container";
import PageHero from "../components/common/PageHero";
import { useCart } from "../../store/hooks";
import { createOrder } from "../../services/api";

const initialFormData = {
  customer_name: "",
  customer_email: "",
  customer_phone: "",
  shipping_address: "",
  city: "",
  notes: "",
  payment_method: "cash_on_delivery",
  payment_reference: "",
};

function formatPrice(value) {
  return `PKR ${Number(value).toLocaleString("en-PK")}`;
}

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();

  const [formData, setFormData] = useState(initialFormData);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const invalidProduct = cartItems.find((item) => !item.numericId);

    if (invalidProduct) {
      setErrorMsg(
        "Please remove older products from cart and add them again from the live products page.",
      );
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const order = await createOrder({
        ...formData,
        items: cartItems.map((item) => ({
          product_id: item.numericId,
          quantity: item.quantity,
        })),
      });

      setPlacedOrder(order);
      clearCart();
    } catch (error) {
      setErrorMsg(error.message || "Unable to place your order.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (placedOrder) {
    return (
      <div>
        <PageHero
          image="https://images.unsplash.com/photo-1591434132137-37d04c53197e?auto=format&fit=crop&w=1600&q=80"
          title="Order Confirmed"
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Checkout", href: "/checkout" },
          ]}
        />

        <section className="bg-white py-16 sm:py-20">
          <Container>
            <div className="mx-auto max-w-xl text-center">
              <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-600" />

              <h2 className="mt-5 text-2xl font-bold text-neutral-900">
                Thank you for your order!
              </h2>

              <p className="mt-3 text-sm leading-6 text-neutral-600">
                Your order has been received. Our team will contact you soon to
                confirm delivery.
              </p>

              <div className="mt-6 rounded-lg bg-neutral-100 p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
                  Order Number
                </p>
                <p className="mt-2 text-lg font-bold text-[#5c1f1f]">
                  {placedOrder.order_number}
                </p>
                <p className="mt-2 text-sm text-neutral-600">
                  Total: {formatPrice(placedOrder.total_amount)}
                </p>
              </div>

              <Link
                to="/products"
                className="mt-8 inline-flex bg-[#5c1f1f] px-7 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-[#732929]"
              >
                Continue Shopping
              </Link>
            </div>
          </Container>
        </section>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div>
        <PageHero
          image="https://images.unsplash.com/photo-1591434132137-37d04c53197e?auto=format&fit=crop&w=1600&q=80"
          title="Checkout"
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Checkout", href: "/checkout" },
          ]}
        />

        <section className="bg-white py-16">
          <Container>
            <div className="text-center">
              <ShoppingBag className="mx-auto h-12 w-12 text-neutral-300" />
              <p className="mt-4 text-neutral-600">Your cart is empty.</p>
              <Link
                to="/products"
                className="mt-5 inline-block text-sm font-semibold text-[#5c1f1f]"
              >
                Browse Products
              </Link>
            </div>
          </Container>
        </section>
      </div>
    );
  }

  return (
    <div>
      <PageHero
        image="https://images.unsplash.com/photo-1591434132137-37d04c53197e?auto=format&fit=crop&w=1600&q=80"
        title="Checkout"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Cart", href: "/cart" },
          { label: "Checkout", href: "/checkout" },
        ]}
      />

      <section className="bg-white py-8 sm:py-12">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
            <form
              onSubmit={handleSubmit}
              className="border border-neutral-200 p-5 sm:p-7"
            >
              <h2 className="text-lg font-bold text-neutral-900">
                Delivery Details
              </h2>

              {errorMsg && (
                <div className="mt-4 border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  {errorMsg}
                </div>
              )}

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium text-neutral-700">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="customer_name"
                    required
                    minLength="2"
                    value={formData.customer_name}
                    onChange={handleChange}
                    className="mt-1.5 w-full border border-neutral-300 px-3 py-2.5 text-sm outline-none focus:border-[#5c1f1f]"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-neutral-700">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="customer_email"
                    required
                    value={formData.customer_email}
                    onChange={handleChange}
                    className="mt-1.5 w-full border border-neutral-300 px-3 py-2.5 text-sm outline-none focus:border-[#5c1f1f]"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-neutral-700">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="customer_phone"
                    required
                    minLength="7"
                    value={formData.customer_phone}
                    onChange={handleChange}
                    className="mt-1.5 w-full border border-neutral-300 px-3 py-2.5 text-sm outline-none focus:border-[#5c1f1f]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-sm font-medium text-neutral-700">
                    Delivery Address *
                  </label>
                  <textarea
                    name="shipping_address"
                    required
                    minLength="10"
                    rows="3"
                    value={formData.shipping_address}
                    onChange={handleChange}
                    className="mt-1.5 w-full border border-neutral-300 px-3 py-2.5 text-sm outline-none focus:border-[#5c1f1f]"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-neutral-700">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    minLength="2"
                    value={formData.city}
                    onChange={handleChange}
                    className="mt-1.5 w-full border border-neutral-300 px-3 py-2.5 text-sm outline-none focus:border-[#5c1f1f]"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-neutral-700">
                    Notes
                  </label>
                  <input
                    type="text"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Optional"
                    className="mt-1.5 w-full border border-neutral-300 px-3 py-2.5 text-sm outline-none focus:border-[#5c1f1f]"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-neutral-700">
                    Payment Method *
                  </label>
                  <select
                    name="payment_method"
                    value={formData.payment_method}
                    onChange={handleChange}
                    className="mt-1.5 w-full border border-neutral-300 px-3 py-2.5 text-sm outline-none focus:border-[#5c1f1f]"
                  >
                    <option value="cash_on_delivery">
                      Cash on Delivery
                    </option>
                    <option value="bank_transfer">Bank Transfer</option>
                  </select>
                </div>

                {formData.payment_method === "bank_transfer" && (
                  <div>
                    <label className="text-sm font-medium text-neutral-700">
                      Payment Reference
                    </label>
                    <input
                      type="text"
                      name="payment_reference"
                      value={formData.payment_reference}
                      onChange={handleChange}
                      placeholder="Bank transaction/reference number"
                      className="mt-1.5 w-full border border-neutral-300 px-3 py-2.5 text-sm outline-none focus:border-[#5c1f1f]"
                    />
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-7 w-full bg-[#5c1f1f] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#732929] disabled:opacity-50"
              >
                {isSubmitting ? "Placing Order..." : "Place Order"}
              </button>
            </form>

            <aside className="h-fit border border-neutral-200 p-5 sm:p-6">
              <h2 className="text-xs font-bold uppercase tracking-widest text-amber-800">
                Your Order
              </h2>

              <div className="mt-4 space-y-3 border-b border-neutral-200 pb-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between gap-3 text-sm"
                  >
                    <span className="text-neutral-600">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="font-medium text-neutral-900">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex justify-between text-base font-bold text-neutral-900">
                <span>Items Subtotal</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>

              <p className="mt-4 text-xs leading-5 text-neutral-500">
                Delivery charges and final total are calculated securely by the
                backend when you place your order.
              </p>
            </aside>
          </div>
        </Container>
      </section>
    </div>
  );
}
