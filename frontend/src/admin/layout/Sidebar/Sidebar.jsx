import { Link, useLocation } from "react-router-dom";
import { ExternalLink, LogOut, X } from "lucide-react";
import { ADMIN_NAV_ITEMS } from "../../constants/adminNav";

export default function Sidebar({ isOpen, setIsOpen, handleLogout }) {
  const location = useLocation();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 transform bg-[#262220] p-4 border-r border-stone-800 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 flex flex-col justify-between ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Header Branding */}
          <div className="flex items-center justify-between pb-6 border-b border-stone-800">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#5c1f1f] text-amber-300 font-bold text-lg shadow-md border border-amber-900/40">
                AW
              </div>
              <div>
                <h1 className="text-sm font-bold uppercase tracking-wider text-stone-100">
                  Ashtech
                </h1>
                <span className="text-[10px] font-semibold tracking-widest text-amber-500 uppercase">
                  Admin Panel
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-stone-400 hover:bg-stone-800 lg:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Nav Items */}
          <nav className="mt-6 space-y-1.5">
            {ADMIN_NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-[#5c1f1f] text-white shadow-md border border-amber-900/30"
                      : "text-stone-400 hover:bg-stone-800/60 hover:text-stone-200"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-stone-800 pt-4 space-y-2">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between rounded-lg px-3.5 py-2 text-xs font-medium text-stone-400 hover:bg-stone-800/60 hover:text-stone-200 transition-colors"
          >
            <span>View Storefront</span>
            <ExternalLink className="h-4 w-4" />
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-xs font-semibold text-rose-400 hover:bg-rose-950/40 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
