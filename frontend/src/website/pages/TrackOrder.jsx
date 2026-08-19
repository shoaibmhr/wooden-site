import { useState } from "react";
import { PackageCheck, Search } from "lucide-react";
import Container from "../components/common/Container";
import PageHero from "../components/common/PageHero";
import { trackOrder } from "../../services/api";

function formatPrice(value) {
  return `PKR ${Number(value).toLocaleString("en-PK")}`;
}

export default function TrackOrder() {
  const [formData, setFormData] = useState({
    order_number: "",
    customer_email: "",
    customer_phone: "",
  });
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setOrder(null);
    setIsLoading(true);

    try {
      const orderData = await trackOrder(formData);
      setOrder(orderData);
    } catch (requestError) {
      setError(requestError.message || "Unable to find your order.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <PageHero
        image="https://images.unsplash.com/photo-1591434132137-37d04c53197e?auto=format&fit=crop&w=1600&q=80"
        title="Track Your Order"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Track Order", href: "/track-order" },
        ]}
      />

      <section className="bg-white py-10 sm:py-14">
        <Container>
          <div className="mx-auto max-w-2xl">
            <form
              onSubmit={handleSubmit}
              className="border border-neutral-200 p-5 shadow-sm sm:p-7"
            >
              <div className="flex items-center gap-3">
                <PackageCheck className="h-6 w-6 text-[#5c1f1f]" />
                <div>
                  <h1 className="text-xl font-bold text-neutral-900">
                    Find your order
                  </h1>
                  <p className="mt-1 text-sm text-neutral-600">
                    Enter the same details used at checkout.
                  </p>
                </div>
              </div>

              {error && (
                <p className="mt-5 border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  {error}
                </p>
              )}

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="sm:col-span-2 text-sm font-medium text-neutral-700">
                  Order Number
                  <input
                    name="order_number"
                    required
                    value={formData.order_number}
                    onChange={handleChange}
                    placeholder="AW-20260819-AB12CD34"
                    className="mt-1.5 w-full border border-neutral-300 px-3 py-2.5 font-mono text-sm outline-none focus:border-[#5c1f1f]"
                  />
                </label>
                <label className="text-sm font-medium text-neutral-700">
                  Email
                  <input
                    type="email"
                    name="customer_email"
                    required
                    value={formData.customer_email}
                    onChange={handleChange}
                    className="mt-1.5 w-full border border-neutral-300 px-3 py-2.5 text-sm outline-none focus:border-[#5c1f1f]"
                  />
                </label>
                <label className="text-sm font-medium text-neutral-700">
                  Phone
                  <input
                    type="tel"
                    name="customer_phone"
                    required
                    value={formData.customer_phone}
                    onChange={handleChange}
                    className="mt-1.5 w-full border border-neutral-300 px-3 py-2.5 text-sm outline-none focus:border-[#5c1f1f]"
                  />
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 bg-[#5c1f1f] px-6 py-3 text-sm font-semibold text-white hover:bg-[#732929] disabled:opacity-50"
              >
                <Search className="h-4 w-4" />
                {isLoading ? "Searching..." : "Track Order"}
              </button>
            </form>

            {order && (
              <div className="mt-6 border border-neutral-200 bg-neutral-50 p-5 sm:p-7">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
                      Order Number
                    </p>
                    <p className="mt-1 font-mono font-bold text-[#5c1f1f]">
                      {order.order_number}
                    </p>
                  </div>
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold capitalize text-amber-900">
                    {order.status}
                  </span>
                </div>

                <div className="mt-5 grid gap-3 text-sm sm:grid-cols-3">
                  <div>
                    <p className="text-neutral-500">Payment</p>
                    <p className="mt-1 font-medium capitalize text-neutral-900">
                      {order.payment_status.replace("_", " ")}
                    </p>
                  </div>
                  <div>
                    <p className="text-neutral-500">Method</p>
                    <p className="mt-1 font-medium capitalize text-neutral-900">
                      {order.payment_method.replaceAll("_", " ")}
                    </p>
                  </div>
                  <div>
                    <p className="text-neutral-500">Total</p>
                    <p className="mt-1 font-medium text-neutral-900">
                      {formatPrice(order.total_amount)}
                    </p>
                  </div>
                </div>

                <div className="mt-5 border-t border-neutral-200 pt-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
                    Items
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-neutral-700">
                    {order.items.map((item) => (
                      <li key={item.id} className="flex justify-between gap-3">
                        <span>{item.product_name} × {item.quantity}</span>
                        <span>{formatPrice(item.line_total)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>
    </div>
  );
}
