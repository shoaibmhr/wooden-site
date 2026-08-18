import { useEffect, useState } from "react";
import {
  Package,
  FolderTree,
  Users,
  Mail,
  MessageSquareText,
  ShoppingBag,
  Clock3,
} from "lucide-react";
import { fetchDashboardStats } from "../../services/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    fetchDashboardStats()
      .then((data) => {
        if (isMounted) {
          setStats(data);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || "Failed to load dashboard");
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const cards = stats
    ? [
        {
          label: "Total Products",
          value: stats.total_products,
          detail: `${stats.active_products} active`,
          icon: Package,
        },
        {
          label: "Categories",
          value: stats.total_categories,
          detail: `${stats.active_categories} active`,
          icon: FolderTree,
        },
        {
          label: "Customers",
          value: stats.total_customers,
          detail: "Registered customers",
          icon: Users,
        },
        {
          label: "Contact Messages",
          value: stats.total_inquiries,
          detail: `${stats.new_inquiries} new`,
          icon: Mail,
        },
        {
          label: "Total Orders",
          value: stats.total_orders,
          detail: "All customer orders",
          icon: ShoppingBag,
        },
        {
          label: "Pending Orders",
          value: stats.pending_orders,
          detail: "Need your attention",
          icon: Clock3,
        },
      ]
    : [];

  return (
    <div className="space-y-6">
      <div className="border-b border-stone-800 pb-4">
        <h1 className="text-xl font-bold uppercase tracking-wider text-stone-100 sm:text-2xl">
          Overview
        </h1>
        <p className="mt-1 text-xs text-stone-400">
          Live data from your Ashtech Wooden database.
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-rose-900/50 bg-rose-950/40 p-4 text-sm text-rose-300">
          {error}
        </div>
      )}

      {!stats && !error && (
        <div className="rounded-xl border border-stone-800 bg-[#262220] p-6 text-sm text-stone-400">
          Loading dashboard statistics...
        </div>
      )}

      {stats && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.label}
                className="rounded-xl border border-stone-800 bg-[#262220] p-5 shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-amber-500">
                      {card.label}
                    </p>
                    <p className="mt-2 text-3xl font-bold text-stone-100">
                      {card.value}
                    </p>
                    <p className="mt-1 text-xs text-stone-500">{card.detail}</p>
                  </div>

                  <div className="rounded-lg bg-[#5c1f1f]/40 p-3 text-amber-400">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {stats && (
        <div className="rounded-xl border border-stone-800 bg-[#262220] p-5">
          <div className="flex items-center gap-3">
            <MessageSquareText className="h-5 w-5 text-amber-500" />
            <div>
              <h2 className="text-sm font-semibold text-stone-100">
                New customer messages
              </h2>
              <p className="mt-1 text-xs text-stone-400">
                You currently have {stats.new_inquiries} unread contact
                inquiry/inquiries to review.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
