import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  FolderTree,
  Users,
  Mail,
  ShoppingBag,
  Clock3,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Plus,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import { fetchDashboardStats } from "../../services/api";

function formatPrice(val) {
  return `PKR ${Number(val || 0).toLocaleString("en-PK")}`;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const loadStats = () => {
    setIsLoading(true);
    setError("");
    fetchDashboardStats()
      .then((data) => {
        setStats(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load dashboard metrics");
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadStats();
  }, []);

  const todayDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* =========================================================
          HERO WELCOME BANNER
      ========================================================== */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#5c1f1f] via-[#3d1313] to-[#241713] p-6 sm:p-8 shadow-2xl border border-amber-500/20">
        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest">
              <Sparkles className="h-4 w-4" />
              <span>WoodenSite Management Console</span>
            </div>
            <h1 className="mt-2 text-2xl font-black text-white sm:text-3xl lg:text-4xl tracking-tight">
              Welcome Back, Admin
            </h1>
            <p className="mt-2 max-w-xl text-xs sm:text-sm text-stone-300 leading-relaxed">
              Here is your store's live performance, customer orders, inventory levels, and inquiry overview for today ({todayDate}).
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              to="/admin/products"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-stone-950 shadow-lg transition-all hover:brightness-110 active:scale-95"
            >
              <Plus className="h-4 w-4" strokeWidth={2.5} />
              <span>Manage Products</span>
            </Link>

            <button
              onClick={loadStats}
              disabled={isLoading}
              title="Refresh Stats"
              className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-xs font-semibold text-stone-200 backdrop-blur-md transition-all hover:bg-white/10 active:scale-95 disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin text-amber-400" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>

        {/* Ambient background glow decoration */}
        <div className="pointer-events-none absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-10 -top-10 h-64 w-64 rounded-full bg-[#5c1f1f]/30 blur-3xl" />
      </div>

      {error && (
        <div className="rounded-2xl border border-rose-900/60 bg-rose-950/40 p-4 text-sm text-rose-300 shadow-md">
          {error}
        </div>
      )}

      {/* Loading Skeleton */}
      {isLoading && !stats && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-32 animate-pulse rounded-2xl border border-stone-800 bg-[#1e1a18]"
            />
          ))}
        </div>
      )}

      {stats && (
        <>
          {/* =========================================================
              FINANCIAL & PRIMARY REVENUE METRICS
          ========================================================== */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-widest text-amber-500">
                Financial & Revenue Highlights
              </h2>
              <span className="text-[11px] text-stone-400">All non-cancelled transactions</span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {/* Total Order Value */}
              <div className="group relative overflow-hidden rounded-2xl border border-stone-800/90 bg-[#1e1a18] p-5 shadow-xl transition-all duration-300 hover:border-amber-500/30">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                      Total Order Value
                    </span>
                    <p className="mt-2 text-2xl sm:text-3xl font-black text-stone-100 tracking-tight">
                      {formatPrice(stats.total_order_value)}
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-stone-400">
                      <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
                      <span>{stats.total_orders} total customer orders</span>
                    </p>
                  </div>
                  <div className="rounded-xl bg-[#5c1f1f]/30 p-3 text-amber-400 border border-amber-900/30">
                    <DollarSign className="h-6 w-6" />
                  </div>
                </div>
              </div>

              {/* Confirmed Paid Revenue */}
              <div className="group relative overflow-hidden rounded-2xl border border-stone-800/90 bg-[#1e1a18] p-5 shadow-xl transition-all duration-300 hover:border-emerald-500/30">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                      Confirmed Paid Revenue
                    </span>
                    <p className="mt-2 text-2xl sm:text-3xl font-black text-emerald-400 tracking-tight">
                      {formatPrice(stats.paid_revenue)}
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-stone-400">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                      <span>Cleared & completed payments</span>
                    </p>
                  </div>
                  <div className="rounded-xl bg-emerald-950/40 p-3 text-emerald-400 border border-emerald-900/30">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                </div>
              </div>

              {/* Pending Orders Attention */}
              <div className="group relative overflow-hidden rounded-2xl border border-stone-800/90 bg-[#1e1a18] p-5 shadow-xl transition-all duration-300 hover:border-amber-500/30 sm:col-span-2 lg:col-span-1">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                      Pending Action Orders
                    </span>
                    <p className="mt-2 text-2xl sm:text-3xl font-black text-amber-400 tracking-tight">
                      {stats.pending_orders}
                    </p>
                    <p className="mt-1 text-xs text-stone-400">
                      Orders awaiting review & shipping
                    </p>
                  </div>
                  <div className="rounded-xl bg-amber-950/40 p-3 text-amber-400 border border-amber-900/30">
                    <Clock3 className="h-6 w-6" />
                  </div>
                </div>
                <Link
                  to="/admin/orders"
                  className="mt-4 flex items-center justify-between text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
                >
                  <span>Process pending orders</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* =========================================================
              OPERATIONAL KPI METRICS GRID
          ========================================================== */}
          <div>
            <div className="mb-3">
              <h2 className="text-xs font-bold uppercase tracking-widest text-amber-500">
                Store Operations & Catalog
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* Products Card */}
              <div className="rounded-2xl border border-stone-800/90 bg-[#1e1a18] p-5 shadow-xl">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                      Total Products
                    </span>
                    <p className="mt-2 text-2xl font-bold text-stone-100">
                      {stats.total_products}
                    </p>
                    <p className="mt-1 text-xs text-emerald-400 font-medium">
                      {stats.active_products} live in catalog
                    </p>
                  </div>
                  <div className="rounded-xl bg-stone-900 p-2.5 text-stone-300 border border-stone-800">
                    <Package className="h-5 w-5 text-amber-500" />
                  </div>
                </div>
              </div>

              {/* Categories Card */}
              <div className="rounded-2xl border border-stone-800/90 bg-[#1e1a18] p-5 shadow-xl">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                      Categories
                    </span>
                    <p className="mt-2 text-2xl font-bold text-stone-100">
                      {stats.total_categories}
                    </p>
                    <p className="mt-1 text-xs text-stone-400">
                      {stats.active_categories} active categories
                    </p>
                  </div>
                  <div className="rounded-xl bg-stone-900 p-2.5 text-stone-300 border border-stone-800">
                    <FolderTree className="h-5 w-5 text-amber-500" />
                  </div>
                </div>
              </div>

              {/* Registered Customers */}
              <div className="rounded-2xl border border-stone-800/90 bg-[#1e1a18] p-5 shadow-xl">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                      Customers
                    </span>
                    <p className="mt-2 text-2xl font-bold text-stone-100">
                      {stats.total_customers}
                    </p>
                    <p className="mt-1 text-xs text-stone-400">
                      Registered customer accounts
                    </p>
                  </div>
                  <div className="rounded-xl bg-stone-900 p-2.5 text-stone-300 border border-stone-800">
                    <Users className="h-5 w-5 text-amber-500" />
                  </div>
                </div>
              </div>

              {/* Customer Inquiries */}
              <div className="rounded-2xl border border-stone-800/90 bg-[#1e1a18] p-5 shadow-xl">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                      Inquiries
                    </span>
                    <p className="mt-2 text-2xl font-bold text-stone-100">
                      {stats.total_inquiries}
                    </p>
                    <p className="mt-1 text-xs font-semibold text-amber-400">
                      {stats.new_inquiries} unread new messages
                    </p>
                  </div>
                  <div className="rounded-xl bg-stone-900 p-2.5 text-stone-300 border border-stone-800">
                    <Mail className="h-5 w-5 text-amber-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================
              INVENTORY HEALTH & STOCK WARNINGS
          ========================================================== */}
          {(stats.low_stock_products > 0 || stats.out_of_stock_products > 0) && (
            <div className="rounded-2xl border border-amber-900/40 bg-gradient-to-r from-amber-950/40 via-[#262220] to-[#1e1a18] p-5 sm:p-6 shadow-xl">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3.5">
                  <div className="rounded-xl bg-amber-500/20 p-2.5 text-amber-400">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-stone-100">
                      Inventory Restocking Alert
                    </h3>
                    <p className="mt-1 text-xs text-stone-300 leading-relaxed">
                      You have <span className="font-bold text-amber-400">{stats.low_stock_products} low-stock</span> and{" "}
                      <span className="font-bold text-rose-400">{stats.out_of_stock_products} out-of-stock</span> item(s). Update stock to keep products available for order.
                    </p>
                  </div>
                </div>

                <Link
                  to="/admin/products"
                  className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-[#5c1f1f] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all hover:bg-[#732929]"
                >
                  <span>Update Stock</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* =========================================================
              QUICK ACCESS MATRIX
          ========================================================== */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Link
              to="/admin/orders"
              className="group rounded-2xl border border-stone-800 bg-[#1e1a18] p-5 shadow-md transition-all duration-300 hover:border-[#5c1f1f] hover:bg-[#25201e]"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-[#5c1f1f]/40 p-3 text-amber-400">
                  <ShoppingBag className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-100 group-hover:text-amber-400 transition-colors">
                    Manage Orders
                  </h4>
                  <p className="text-xs text-stone-400">
                    Update delivery & payment statuses
                  </p>
                </div>
              </div>
            </Link>

            <Link
              to="/admin/products"
              className="group rounded-2xl border border-stone-800 bg-[#1e1a18] p-5 shadow-md transition-all duration-300 hover:border-[#5c1f1f] hover:bg-[#25201e]"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-[#5c1f1f]/40 p-3 text-amber-400">
                  <Package className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-100 group-hover:text-amber-400 transition-colors">
                    Catalog & Stock
                  </h4>
                  <p className="text-xs text-stone-400">
                    Add new items or edit inventory
                  </p>
                </div>
              </div>
            </Link>

            <Link
              to="/admin/messages"
              className="group rounded-2xl border border-stone-800 bg-[#1e1a18] p-5 shadow-md transition-all duration-300 hover:border-[#5c1f1f] hover:bg-[#25201e]"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-[#5c1f1f]/40 p-3 text-amber-400">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-100 group-hover:text-amber-400 transition-colors">
                    Inquiries & Messages
                  </h4>
                  <p className="text-xs text-stone-400">
                    Respond to customer inquiries
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

