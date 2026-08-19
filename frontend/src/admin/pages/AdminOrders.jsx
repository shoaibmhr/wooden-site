import { useEffect, useState, useMemo } from "react";
import {
  ShoppingBag,
  Search,
  Eye,
  X,
  MapPin,
  Phone,
  Mail,
  User,
  Calendar,
  CreditCard,
  Truck,
  CheckCircle2,
  Clock3,
  AlertCircle,
  FileText,
} from "lucide-react";
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

function formatPrice(value) {
  return `PKR ${Number(value || 0).toLocaleString("en-PK")}`;
}

function formatDate(value) {
  return new Date(value).toLocaleString("en-PK", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);

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
    if (selectedOrder && selectedOrder.id === updatedOrder.id) {
      setSelectedOrder(updatedOrder);
    }
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

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchNum = (order.order_number || "").toLowerCase().includes(q);
        const matchName = (order.customer_name || "").toLowerCase().includes(q);
        const matchEmail = (order.customer_email || "").toLowerCase().includes(q);
        const matchPhone = (order.customer_phone || "").toLowerCase().includes(q);
        if (!matchNum && !matchName && !matchEmail && !matchPhone) return false;
      }

      // 2. Status Filter
      if (statusFilter !== "all" && order.status !== statusFilter) {
        return false;
      }

      return true;
    });
  }, [orders, searchQuery, statusFilter]);

  // Order Counts by Status
  const statusCounts = useMemo(() => {
    const counts = { all: orders.length };
    ORDER_STATUSES.forEach((st) => {
      counts[st] = orders.filter((o) => o.status === st).length;
    });
    return counts;
  }, [orders]);

  const getOrderStatusBadgeClass = (status) => {
    switch (status) {
      case "delivered":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
      case "shipped":
        return "bg-blue-500/10 text-blue-400 border-blue-500/30";
      case "processing":
        return "bg-purple-500/10 text-purple-400 border-purple-500/30";
      case "confirmed":
        return "bg-cyan-500/10 text-cyan-400 border-cyan-500/30";
      case "cancelled":
        return "bg-rose-500/10 text-rose-400 border-rose-500/30";
      case "pending":
      default:
        return "bg-amber-500/10 text-amber-400 border-amber-500/30";
    }
  };

  const getPaymentBadgeClass = (paymentStatus) => {
    switch (paymentStatus) {
      case "paid":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
      case "failed":
      case "refunded":
        return "bg-rose-500/10 text-rose-400 border-rose-500/30";
      case "pending":
      default:
        return "bg-amber-500/10 text-amber-400 border-amber-500/30";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-stone-800/80 pb-5">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-wider text-stone-100 sm:text-2xl">
            Customer Orders
          </h1>
          <p className="mt-1 text-xs text-stone-400">
            Process incoming orders, review custom requests, and update shipment/payment states.
          </p>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="space-y-3">
        {/* Status Pills */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1">
          <button
            onClick={() => setStatusFilter("all")}
            className={`rounded-xl px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
              statusFilter === "all"
                ? "bg-[#5c1f1f] text-white shadow-md border border-amber-500/30"
                : "bg-[#1e1a18] text-stone-400 hover:bg-[#282321] hover:text-stone-200 border border-stone-800"
            }`}
          >
            All Orders ({statusCounts.all || 0})
          </button>

          {ORDER_STATUSES.map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`rounded-xl px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                statusFilter === status
                  ? "bg-[#5c1f1f] text-white shadow-md border border-amber-500/30"
                  : "bg-[#1e1a18] text-stone-400 hover:bg-[#282321] hover:text-stone-200 border border-stone-800"
              }`}
            >
              {status} ({statusCounts[status] || 0})
            </button>
          ))}
        </div>

        {/* Search Input Bar */}
        <div className="relative bg-[#1e1a18] p-3 rounded-2xl border border-stone-800/80 shadow-md">
          <Search className="absolute left-6 top-5 h-4 w-4 text-stone-500" />
          <input
            type="text"
            placeholder="Search by Order # (e.g. AW-2026...), Customer Name, Email, or Phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-stone-700/80 bg-stone-900/90 py-2.5 pl-11 pr-4 text-xs text-stone-100 placeholder-stone-500 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30"
          />
        </div>
      </div>

      {/* Main Content Area */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-16 rounded-2xl border border-stone-800 bg-[#1e1a18]">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
          <p className="mt-3 text-xs text-stone-400">Loading orders...</p>
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-rose-900/60 bg-rose-950/40 p-4 text-xs text-rose-300 text-center">
          {error}
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 rounded-2xl border border-dashed border-stone-800 bg-[#1e1a18] text-center">
          <ShoppingBag className="h-12 w-12 text-stone-600 mb-3" />
          <h3 className="text-sm font-bold text-stone-200">No orders found</h3>
          <p className="text-xs text-stone-500 mt-1 max-w-sm">
            {orders.length === 0
              ? "New customer orders will appear here automatically."
              : "No orders matched your active filters or search query."}
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-stone-800/90 bg-[#1e1a18] shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-left text-xs text-stone-300">
              <thead className="border-b border-stone-800 bg-stone-900/70 uppercase text-[10px] tracking-wider text-stone-400">
                <tr>
                  <th className="px-4 py-3.5">Order Number</th>
                  <th className="px-4 py-3.5">Customer</th>
                  <th className="px-4 py-3.5">Items</th>
                  <th className="px-4 py-3.5">Total Amount</th>
                  <th className="px-4 py-3.5">Order Status</th>
                  <th className="px-4 py-3.5">Payment</th>
                  <th className="px-4 py-3.5">Date</th>
                  <th className="px-4 py-3.5 text-right">Details</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-stone-800/80">
                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-[#26211f] transition-colors group"
                  >
                    {/* Order Number */}
                    <td className="px-4 py-3.5">
                      <span className="font-mono font-bold text-amber-400 group-hover:text-amber-300">
                        {order.order_number}
                      </span>
                    </td>

                    {/* Customer Info */}
                    <td className="px-4 py-3.5">
                      <p className="font-bold text-stone-100">
                        {order.customer_name}
                      </p>
                      <p className="text-[11px] text-stone-400">
                        {order.customer_phone}
                      </p>
                      <p className="text-[10px] text-stone-500 truncate max-w-[160px]">
                        {order.customer_email}
                      </p>
                    </td>

                    {/* Items Count */}
                    <td className="px-4 py-3.5">
                      <span className="rounded-md bg-stone-800/90 px-2.5 py-1 text-[11px] font-semibold text-stone-300">
                        {order.items.length} item(s)
                      </span>
                    </td>

                    {/* Total Amount */}
                    <td className="px-4 py-3.5 font-bold text-stone-100">
                      {formatPrice(order.total_amount)}
                    </td>

                    {/* Order Status Select */}
                    <td className="px-4 py-3.5">
                      <div className="relative inline-block">
                        <select
                          value={order.status}
                          disabled={updatingId === `order-${order.id}`}
                          onChange={(e) =>
                            handleOrderStatusChange(order.id, e.target.value)
                          }
                          className={`rounded-lg border px-2.5 py-1.5 text-xs font-bold capitalize outline-none transition-colors disabled:opacity-50 ${getOrderStatusBadgeClass(
                            order.status,
                          )} bg-stone-900/90`}
                        >
                          {ORDER_STATUSES.map((st) => (
                            <option key={st} value={st} className="bg-stone-900 text-stone-200">
                              {st}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>

                    {/* Payment Status Select */}
                    <td className="px-4 py-3.5">
                      <div className="relative inline-block">
                        <select
                          value={order.payment_status}
                          disabled={updatingId === `payment-${order.id}`}
                          onChange={(e) =>
                            handlePaymentStatusChange(order.id, e.target.value)
                          }
                          className={`rounded-lg border px-2.5 py-1.5 text-xs font-bold capitalize outline-none transition-colors disabled:opacity-50 ${getPaymentBadgeClass(
                            order.payment_status,
                          )} bg-stone-900/90`}
                        >
                          {PAYMENT_STATUSES.map((st) => (
                            <option key={st} value={st} className="bg-stone-900 text-stone-200">
                              {st}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="px-4 py-3.5 text-[11px] text-stone-400">
                      {formatDate(order.created_at)}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3.5 text-right">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-stone-800 px-3 py-1.5 text-xs font-semibold text-stone-200 hover:bg-[#5c1f1f] hover:text-white transition-colors"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =========================================================
          ORDER DETAILS INSPECTION MODAL
      ========================================================== */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-stone-800/90 bg-[#1e1a18] p-6 shadow-2xl text-stone-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-stone-800/80 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500">
                  Order Details
                </span>
                <h2 className="text-lg font-black text-stone-100 font-mono">
                  {selectedOrder.order_number}
                </h2>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="rounded-xl p-1.5 text-stone-400 hover:bg-stone-800 hover:text-stone-200 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Customer & Shipping Summary Grid */}
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 rounded-2xl border border-stone-800 bg-stone-900/60 p-4 text-xs">
              <div>
                <p className="font-bold uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5" /> Customer Information
                </p>
                <p className="font-semibold text-stone-100 text-sm">
                  {selectedOrder.customer_name}
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-stone-400">
                  <Phone className="h-3 w-3 text-stone-500" /> {selectedOrder.customer_phone}
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-stone-400">
                  <Mail className="h-3 w-3 text-stone-500" /> {selectedOrder.customer_email}
                </p>
              </div>

              <div>
                <p className="font-bold uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" /> Shipping Address
                </p>
                <p className="text-stone-300 leading-relaxed">
                  {selectedOrder.shipping_address}
                </p>
                <p className="mt-1 font-semibold text-stone-100">
                  City: <span className="text-amber-400">{selectedOrder.city}</span>
                </p>
                {selectedOrder.notes && (
                  <p className="mt-2 text-stone-400 italic bg-stone-950/60 p-2 rounded-lg border border-stone-800">
                    "{selectedOrder.notes}"
                  </p>
                )}
              </div>
            </div>

            {/* Ordered Items Table */}
            <div className="mt-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-500 mb-3 flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5" /> Order Line Items ({selectedOrder.items.length})
              </h3>
              <div className="overflow-hidden rounded-2xl border border-stone-800 bg-stone-900/60">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-stone-800 bg-stone-900 uppercase text-[10px] text-stone-400 tracking-wider">
                    <tr>
                      <th className="px-3.5 py-2.5">Item</th>
                      <th className="px-3.5 py-2.5">Price</th>
                      <th className="px-3.5 py-2.5">Qty</th>
                      <th className="px-3.5 py-2.5 text-right">Line Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800">
                    {selectedOrder.items.map((item) => (
                      <tr key={item.id}>
                        <td className="px-3.5 py-3 font-semibold text-stone-100">
                          {item.product_name}
                        </td>
                        <td className="px-3.5 py-3 text-stone-400">
                          {formatPrice(item.product_price)}
                        </td>
                        <td className="px-3.5 py-3 text-stone-300">
                          {item.quantity}
                        </td>
                        <td className="px-3.5 py-3 text-right font-bold text-amber-400">
                          {formatPrice(item.line_total)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Subtotal, Delivery and Grand Total */}
            <div className="mt-4 flex flex-col items-end gap-1.5 border-t border-stone-800/80 pt-4 text-xs">
              <div className="flex justify-between w-64 text-stone-400">
                <span>Subtotal:</span>
                <span className="font-semibold text-stone-200">
                  {formatPrice(selectedOrder.subtotal)}
                </span>
              </div>
              <div className="flex justify-between w-64 text-stone-400">
                <span>Delivery Charge:</span>
                <span className="font-semibold text-stone-200">
                  {formatPrice(selectedOrder.delivery_charge)}
                </span>
              </div>
              <div className="flex justify-between w-64 text-sm font-black text-amber-400 border-t border-stone-800 pt-2">
                <span>Grand Total:</span>
                <span>{formatPrice(selectedOrder.total_amount)}</span>
              </div>
            </div>

            {/* Modal Close Button */}
            <div className="mt-6 flex justify-end border-t border-stone-800/80 pt-4">
              <button
                onClick={() => setSelectedOrder(null)}
                className="rounded-xl bg-[#5c1f1f] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg hover:bg-[#732929] transition-colors"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

