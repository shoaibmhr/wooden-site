import { Link, useLocation } from "react-router-dom";
import { ExternalLink, LogOut, X, Armchair, Shield, Sparkles } from "lucide-react";
import { ADMIN_NAV_ITEMS } from "../../constants/adminNav";

export default function Sidebar({ isOpen, setIsOpen, handleLogout }) {
  const location = useLocation();

  return (
    <>
      {/* Mobile Overlay with blur */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 transform bg-[#1e1a18] p-4 border-r border-stone-800/80 shadow-2xl transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 flex flex-col justify-between ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Header Branding */}
          <div className="flex items-center justify-between pb-5 border-b border-stone-800/80">
            <Link to="/admin" className="flex items-center gap-3 group">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#5c1f1f] to-[#3b1212] text-amber-300 shadow-lg border border-amber-500/30 group-hover:scale-105 transition-transform">
                <Armchair className="h-6 w-6 text-amber-400" strokeWidth={1.75} />
              </div>
              <div>
                <h1 className="text-sm font-bold uppercase tracking-wider text-stone-100 flex items-center gap-1.5">
                  WoodenSite
                </h1>
                <span className="text-[10px] font-semibold tracking-widest text-amber-500 uppercase flex items-center gap-1">
                  <Shield className="h-2.5 w-2.5" /> Admin Portal
                </span>
              </div>
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-stone-400 hover:bg-stone-800 hover:text-stone-200 lg:hidden transition-colors"
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Nav Section Label */}
          <div className="mt-5 px-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-stone-500">
              Management
            </p>
          </div>

          {/* Nav Items */}
          <nav className="mt-2 space-y-1.5">
            {ADMIN_NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`group relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-[#5c1f1f] to-[#732929] text-white shadow-lg border border-amber-500/30 shadow-[#5c1f1f]/20"
                      : "text-stone-400 hover:bg-[#282321] hover:text-stone-200"
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 transition-colors ${
                      isActive ? "text-amber-300" : "text-stone-500 group-hover:text-amber-400"
                    }`}
                  />
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-stone-800/80 pt-4 space-y-2">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-medium text-stone-400 hover:bg-[#282321] hover:text-amber-400 transition-all border border-transparent hover:border-stone-800"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              Live Storefront
            </span>
            <ExternalLink className="h-3.5 w-3.5 text-stone-500" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 transition-all border border-transparent hover:border-rose-900/30"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}

