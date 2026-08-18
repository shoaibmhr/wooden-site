import { NavLink, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Layers,
  Mail,
  ShoppingBag,
  Users,
  Settings,
  User,
  LogOut,
  X,
  Store,
} from "lucide-react";
import { adminNavItems } from "../../constants/adminNav";

const iconMap = {
  LayoutDashboard,
  Package,
  Layers,
  Mail,
  ShoppingBag,
  Users,
  Settings,
  User,
};

export default function Sidebar({ isOpen, onClose, onLogout }) {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex w-64 flex-col bg-[#1c1917] text-stone-200 border-r border-stone-800 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="flex h-16 shrink-0 items-center justify-between px-5 border-b border-stone-800 bg-[#161412]">
          <Link
            to="/admin"
            className="flex items-center gap-2.5"
            onClick={onClose}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#5c1f1f] text-amber-300 font-bold shadow-md">
              AW
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-wide text-stone-100 uppercase">
                Ashtech Wooden
              </h1>
              <span className="text-[10px] font-semibold text-amber-500 uppercase tracking-widest block">
                Admin Portal
              </span>
            </div>
          </Link>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-800 hover:text-stone-100 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-1.5 overflow-y-auto px-3 py-4 scrollbar-thin scrollbar-thumb-stone-800">
          <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-stone-500">
            Main Menu
          </div>

          {adminNavItems.map((item) => {
            const Icon = iconMap[item.icon] || LayoutDashboard;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/admin"}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-[#5c1f1f] text-white shadow-sm font-semibold border-l-4 border-amber-400"
                      : "text-stone-400 hover:bg-stone-800/80 hover:text-stone-200"
                  }`
                }
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Quick Link to Customer Store & Logout */}
        <div className="p-3 border-t border-stone-800 bg-[#161412] space-y-1.5">
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg px-3.5 py-2 text-xs font-medium text-stone-400 hover:bg-stone-800 hover:text-amber-400 transition-colors"
          >
            <Store className="h-4 w-4 shrink-0 text-amber-500" />
            <span>Visit Customer Website</span>
          </Link>

          <button
            type="button"
            onClick={onLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3.5 py-2 text-xs font-medium text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 transition-colors"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            <span>Logout Account</span>
          </button>
        </div>
      </aside>
    </>
  );
}
