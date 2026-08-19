import { Link, useLocation } from "react-router-dom";
import { ExternalLink, LogOut, X, Armchair, Shield, Sparkles } from "lucide-react";
import { ADMIN_NAV_ITEMS } from "../../constants/adminNav";

export default function Sidebar({ isOpen, setIsOpen, handleLogout }) {
  const location = useLocation();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-stone-950/40 backdrop-blur-xs lg:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 transform bg-white p-4 sm:p-5 border-r border-stone-200 shadow-sm transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 flex flex-col justify-between ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Header Branding */}
          <div className="flex items-center justify-between pb-5 border-b border-stone-100">
            <Link to="/admin" className="flex items-center gap-3 group">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-900 to-amber-950 text-amber-300 shadow-md border border-amber-800/30 group-hover:scale-105 transition-transform">
                <Armchair className="h-6 w-6 text-amber-300" strokeWidth={1.75} />
              </div>
              <div>
                <h1 className="text-sm font-bold uppercase tracking-wider text-stone-900 flex items-center gap-1.5">
                  WoodenSite
                </h1>
                <span className="text-[10px] font-bold tracking-widest text-amber-800 uppercase flex items-center gap-1">
                  <Shield className="h-2.5 w-2.5 text-amber-700" /> Admin Portal
                </span>
              </div>
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-stone-400 hover:bg-stone-100 hover:text-stone-700 lg:hidden transition-colors"
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Nav Section Label */}
          <div className="mt-5 px-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
              Management
            </p>
          </div>

          {/* Nav Items */}
          <nav className="mt-2 space-y-1">
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
                      ? "bg-amber-900 text-white shadow-sm shadow-amber-950/10"
                      : "text-stone-600 hover:bg-[#f7f2ea] hover:text-stone-900"
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 transition-colors ${
                      isActive ? "text-amber-300" : "text-stone-400 group-hover:text-amber-800"
                    }`}
                  />
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-amber-300" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-stone-100 pt-4 space-y-2">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-medium text-stone-600 hover:bg-[#f7f2ea] hover:text-amber-900 transition-all border border-stone-200/70"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-amber-700" />
              Live Storefront
            </span>
            <ExternalLink className="h-3.5 w-3.5 text-stone-400" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition-all border border-transparent hover:border-rose-100"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}


