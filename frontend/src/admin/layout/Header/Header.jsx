import { Menu, Bell, ShieldCheck, Sparkles, ExternalLink } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Header({ setIsOpen }) {
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/admin":
        return "Dashboard Overview";
      case "/admin/products":
        return "Products & Inventory";
      case "/admin/orders":
        return "Customer Orders";
      case "/admin/messages":
        return "Contact Inquiries";
      case "/admin/users":
        return "User Accounts";
      case "/admin/settings":
        return "Store Settings";
      default:
        return "Admin Portal";
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-stone-200 bg-white/95 px-4 py-3 backdrop-blur-md sm:px-6 shadow-xs">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-xl p-2 text-stone-600 hover:bg-[#f7f2ea] hover:text-stone-900 lg:hidden transition-colors"
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2.5">
          <span className="hidden sm:inline-block h-2 w-2 rounded-full bg-amber-800 ring-4 ring-amber-800/15" />
          <h2 className="text-sm font-bold tracking-tight text-stone-900 sm:text-base">
            {getPageTitle()}
          </h2>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        {/* Quick View Website Button */}
        <Link
          to="/"
          target="_blank"
          className="hidden md:flex items-center gap-1.5 rounded-xl border border-stone-200 bg-stone-50/80 px-3 py-1.5 text-xs font-semibold text-stone-700 hover:border-amber-800/30 hover:bg-[#f7f2ea] hover:text-amber-900 transition-all shadow-xs"
        >
          <Sparkles className="h-3.5 w-3.5 text-amber-700" />
          <span>View Website</span>
          <ExternalLink className="h-3 w-3 text-stone-400" />
        </Link>

        {/* Notifications Icon */}
        <button
          className="relative rounded-xl p-2 text-stone-500 hover:bg-[#f7f2ea] hover:text-amber-900 transition-colors"
          title="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-amber-600 ring-2 ring-white" />
        </button>

        {/* Admin Avatar Profile */}
        <div className="flex items-center gap-2.5 border-l border-stone-200 pl-3 sm:pl-4">
          <div className="relative">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-900 to-amber-950 text-amber-300 text-xs font-bold border border-amber-800/30 shadow-xs">
              WS
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
          </div>

          <div className="hidden text-left sm:block">
            <p className="text-xs font-bold text-stone-900">WoodenSite Admin</p>
            <p className="text-[10px] text-amber-800 font-semibold flex items-center gap-1">
              <ShieldCheck className="h-3 w-3 text-amber-700" /> Super Admin
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}


