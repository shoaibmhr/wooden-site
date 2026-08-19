import { useState } from "react";
import {
  Settings,
  Phone,
  Mail,
  Store,
  DollarSign,
  Truck,
  ShieldCheck,
  Save,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export default function AdminSettings() {
  const [storeName, setStoreName] = useState("WoodenSite");
  const [whatsappNumber, setWhatsappNumber] = useState("03027069093");
  const [supportEmail, setSupportEmail] = useState("info@woodensite.com");
  const [defaultDeliveryCharge, setDefaultDeliveryCharge] = useState("500");
  const [freeDeliveryThreshold, setFreeDeliveryThreshold] = useState("100000");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="border-b border-stone-800/80 pb-5">
        <h1 className="text-xl font-bold uppercase tracking-wider text-stone-100 sm:text-2xl">
          Store & System Settings
        </h1>
        <p className="mt-1 text-xs text-stone-400">
          Configure business details, WhatsApp customer channels, delivery fee rates, and currency.
        </p>
      </div>

      {savedSuccess && (
        <div className="flex items-center gap-2 rounded-2xl border border-emerald-900/60 bg-emerald-950/40 p-4 text-xs font-semibold text-emerald-300 shadow-md">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>Settings saved successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Brand & Store Identity */}
        <div className="rounded-3xl border border-stone-800/90 bg-[#1e1a18] p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Store className="h-4 w-4" />
            <span>Store Identity & Contact Channels</span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-stone-300">
                Storefront Name
              </label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-stone-700/80 bg-stone-900/90 px-3.5 py-2.5 text-xs text-stone-100 focus:border-amber-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300">
                Support Email
              </label>
              <div className="relative mt-1.5">
                <Mail className="absolute left-3.5 top-3 h-4 w-4 text-stone-500" />
                <input
                  type="email"
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                  className="w-full rounded-xl border border-stone-700/80 bg-stone-900/90 py-2.5 pl-10 pr-3.5 text-xs text-stone-100 focus:border-amber-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* WhatsApp Channel */}
          <div>
            <label className="block text-xs font-semibold text-stone-300">
              WhatsApp Order & Support Number
            </label>
            <div className="relative mt-1.5">
              <Phone className="absolute left-3.5 top-3 h-4 w-4 text-stone-500" />
              <input
                type="text"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                className="w-full rounded-xl border border-stone-700/80 bg-stone-900/90 py-2.5 pl-10 pr-3.5 text-xs text-stone-100 focus:border-amber-500 outline-none"
              />
            </div>
            <p className="mt-1 text-[10px] text-stone-400">
              Customer customized dimension orders (Length, Width) & checkout messages route to this WhatsApp line.
            </p>
          </div>
        </div>

        {/* Delivery & Shipping Rates */}
        <div className="rounded-3xl border border-stone-800/90 bg-[#1e1a18] p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Truck className="h-4 w-4" />
            <span>Shipping & Delivery Rates</span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-stone-300">
                Standard Delivery Charge (PKR)
              </label>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3.5 top-3 h-4 w-4 text-stone-500" />
                <input
                  type="number"
                  value={defaultDeliveryCharge}
                  onChange={(e) => setDefaultDeliveryCharge(e.target.value)}
                  className="w-full rounded-xl border border-stone-700/80 bg-stone-900/90 py-2.5 pl-10 pr-3.5 text-xs text-stone-100 focus:border-amber-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300">
                Free Delivery Above Order (PKR)
              </label>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3.5 top-3 h-4 w-4 text-stone-500" />
                <input
                  type="number"
                  value={freeDeliveryThreshold}
                  onChange={(e) => setFreeDeliveryThreshold(e.target.value)}
                  className="w-full rounded-xl border border-stone-700/80 bg-stone-900/90 py-2.5 pl-10 pr-3.5 text-xs text-stone-100 focus:border-amber-500 outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#5c1f1f] to-[#732929] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-xl border border-amber-500/20 hover:brightness-110 active:scale-95 transition-all"
          >
            <Save className="h-4 w-4" />
            <span>Save Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
}
