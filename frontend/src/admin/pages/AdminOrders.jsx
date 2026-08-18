import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import {
  fetchOrders,
  updateOrderStatus,
  updatePaymentStatus,
} from "../../services/api";

const ORDER_STATUSES = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

const PAYMENT_STATUSES = ["pending", "paid", "failed", "refunded"];

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchOrders()
      .then((data) => {
        setOrders(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load orders");
        setIsLoading(false);
      });
  }, []);

  const replaceOrder = (updatedOrder) => {
    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === updatedOrder.id ? updatedOrder : order,
      ),
    );
  };

  const handleOrderStatusChange = async (orderId, status) => {
    try {
      setUpdatingId(`order-${orderId}`);
      const updatedOrder = await updateOrderStatus(orderId, status);
      replaceOrder(updatedOrder);
    } catch (err) {
      alert(err.message || "Failed to update order status");
    } finally {
      setUpdatingId(null);
    }
  };

  const handlePaymentStatusChange = async (orderId, paymentStatus) => {
    try {
      setUpdatingId(`payment-${orderId}`);
      const updatedOrder = await updatePaymentStatus(orderId, paymentStatus);
      replaceOrder(updatedOrder);
    } catch (err) {
      alert(err.message || "Failed to update payment status");
    } finally {
      setUpdatingId(null);
    }
  };

  const formatPrice = (value) => `PKR ${Number(value).toLocaleString()}`;

  const formatDate = (value) => new Date(value).toLocaleString("en-PK");

  return (
    <div className="space-y-6">
      <div className="border-b border-stone-800 pb-4">
        <h1 className="text-xl font-bold uppercase tracking-wider text-stone-100 sm:text-2xl">
          Orders
        </h1>
        <p className="mt-1 text-xs text-stone-400">
          View customer orders and update delivery or payment status.
        </p>
      </div>

      {isLoading ? (
        <div className="rounded-xl border border-stone-800 bg-[#262220] p-6 text-sm text-stone-400">
          Loading orders...
        </div>
      ) : error ? (
        <div className="rounded-xl border border-rose-900/50 bg-rose-950/40 p-4 text-sm text-rose-300">
          {error}
        </div>
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-stone-800 bg-[#262220] py-14">
          <ShoppingBag className="mb-3 h-10 w-10 text-stone-600" />
          <p className="text-sm font-medium text-stone-300">No orders found</p>
          <p className="mt-1 text-xs text-stone-500">
            New customer orders will appear here.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-stone-800 bg-[#262220]">
          <table className="w-full min-w-[1050px] text-left text-xs text-stone-300">
            <thead className="border-b border-stone-800 bg-stone-900/50 uppercase text-[10px] tracking-wider text-stone-400">
              <tr>
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Items</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Order Status</th>
                <th className="px-4 py-3">Payment</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-stone-800">
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="transition-colors hover:bg-stone-800/40"
                >
                  <td className="px-4 py-3 font-semibold text-amber-500">
                    {order.order_number}
                  </td>

                  <td className="px-4 py-3">
                    <p className="font-medium text-stone-100">
                      {order.customer_name}
                    </p>
                    <p className="mt-0.5 text-[11px] text-stone-500">
                      {order.customer_email}
                    </p>
                  </td>

                  <td className="px-4 py-3">{order.items.length} product(s)</td>

                  <td className="px-4 py-3 font-semibold text-stone-100">
                    {formatPrice(order.total_amount)}
                  </td>

                  <td className="px-4 py-3">
                    <select
                      value={order.status}
                      disabled={updatingId === `order-${order.id}`}
                      onChange={(event) =>
                        handleOrderStatusChange(order.id, event.target.value)
                      }
                      className="rounded-lg border border-stone-700 bg-stone-900 px-2 py-1.5 text-xs capitalize text-stone-200 outline-none focus:border-amber-500 disabled:opacity-50"
                    >
                      {ORDER_STATUSES.map((orderStatus) => (
                        <option key={orderStatus} value={orderStatus}>
                          {orderStatus}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td className="px-4 py-3">
                    <select
                      value={order.payment_status}
                      disabled={updatingId === `payment-${order.id}`}
                      onChange={(event) =>
                        handlePaymentStatusChange(order.id, event.target.value)
                      }
                      className="rounded-lg border border-stone-700 bg-stone-900 px-2 py-1.5 text-xs capitalize text-stone-200 outline-none focus:border-amber-500 disabled:opacity-50"
                    >
                      {PAYMENT_STATUSES.map((paymentStatus) => (
                        <option key={paymentStatus} value={paymentStatus}>
                          {paymentStatus}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td className="px-4 py-3 text-stone-400">
                    {formatDate(order.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
