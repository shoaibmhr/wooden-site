import { Menu, Bell, ShieldCheck } from "lucide-react";

export default function Header({ setIsOpen }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-stone-800 bg-[#262220]/90 px-4 backdrop-blur-md sm:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-lg p-2 text-stone-400 hover:bg-stone-800 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <span className="hidden sm:inline-block text-xs font-semibold uppercase tracking-widest text-amber-500">
          Dashboard Controls
        </span>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative rounded-lg p-2 text-stone-400 hover:bg-stone-800 hover:text-stone-200">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-amber-500" />
        </button>

        <div className="flex items-center gap-2 border-l border-stone-800 pl-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5c1f1f] text-amber-300 text-xs font-bold border border-amber-900/40">
            A
          </div>
          <div className="hidden text-left sm:block">
            <p className="text-xs font-semibold text-stone-200">Admin User</p>
            <p className="text-[10px] text-stone-500 flex items-center gap-1">
              <ShieldCheck className="h-3 w-3 text-amber-500" /> Authorized
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
