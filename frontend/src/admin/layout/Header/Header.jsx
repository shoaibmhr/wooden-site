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
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-stone-800/80 bg-[#1e1a18]/95 px-4 backdrop-blur-md sm:px-6 shadow-sm">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-xl p-2 text-stone-400 hover:bg-[#282321] hover:text-stone-200 lg:hidden transition-colors"
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-block h-2 w-2 rounded-full bg-[#5c1f1f] ring-4 ring-[#5c1f1f]/20" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-stone-100 sm:text-base">
            {getPageTitle()}
          </h2>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        {/* Quick View Website Button */}
        <Link
          to="/"
          target="_blank"
          className="hidden md:flex items-center gap-1.5 rounded-lg border border-stone-700 bg-stone-900/60 px-3 py-1.5 text-xs font-medium text-stone-300 hover:border-amber-500/40 hover:text-amber-400 transition-all"
        >
          <Sparkles className="h-3.5 w-3.5 text-amber-500" />
          <span>View Website</span>
          <ExternalLink className="h-3 w-3 opacity-60" />
        </Link>

        {/* Notifications Icon */}
        <button
          className="relative rounded-xl p-2 text-stone-400 hover:bg-[#282321] hover:text-amber-400 transition-colors"
          title="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-amber-500 ring-2 ring-[#1e1a18] animate-pulse" />
        </button>

        {/* Admin Avatar Profile */}
        <div className="flex items-center gap-2.5 border-l border-stone-800/80 pl-3 sm:pl-4">
          <div className="relative">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#5c1f1f] to-[#732929] text-amber-300 text-xs font-bold border border-amber-500/30 shadow-md">
              WS
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-[#1e1a18]" />
          </div>

          <div className="hidden text-left sm:block">
            <p className="text-xs font-bold text-stone-100">WoodenSite Admin</p>
            <p className="text-[10px] text-amber-400 font-medium flex items-center gap-1">
              <ShieldCheck className="h-3 w-3 text-amber-500" /> Super Admin
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

