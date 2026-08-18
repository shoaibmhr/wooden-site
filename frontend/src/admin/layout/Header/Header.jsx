import { Menu, Bell, User } from "lucide-react";

export default function Header({ onToggleSidebar, }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-neutral-200 bg-white/95 px-4 backdrop-blur-md sm:px-6 lg:px-8">
      {/* Left side: Hamburger on mobile + Title */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label="Toggle menu"
          className="rounded-lg p-2 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="hidden sm:block">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-800">
            Store Management
          </span>
          <p className="text-xs text-neutral-500">
            Ashtech Wooden Handcrafted Furniture
          </p>
        </div>
      </div>

      {/* Right side: Notifications & Admin Profile */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Notification Bell */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-lg p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800 transition-colors"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5c1f1f]"></span>
          </span>
        </button>

        <div className="h-6 w-px bg-neutral-200 hidden sm:block" />

        {/* Admin User Info */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#5c1f1f] text-white font-semibold text-sm shadow-sm">
            <User className="h-4 w-4" />
          </div>
          <div className="hidden md:block text-left">
            <span className="block text-xs font-bold text-neutral-900 leading-tight">
              Admin
            </span>
            <span className="block text-[11px] text-neutral-500 leading-tight">
              admin@ashtech.com
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
