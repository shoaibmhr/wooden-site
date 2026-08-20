import { useState } from "react";
import { X } from "lucide-react";

const WHATSAPP_NUMBER = "923027069093";

function WhatsappIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20 3.9A10 10 0 0 0 3.6 16.4L2 22l5.7-1.5A10 10 0 1 0 20 3.9Zm-8 16.6a8.4 8.4 0 0 1-4.3-1.2l-.3-.2-3.2.8.9-3.1-.2-.3A8.5 8.5 0 1 1 12 20.5Zm4.6-6.4c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.7.8-.8 1-.2.2-.3.2-.5.1a6.9 6.9 0 0 1-3.5-3c-.3-.4.3-.4.7-1.3.1-.2 0-.4 0-.5L8.6 7.3c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.2s.9 2.6 1.1 2.8c.1.2 1.9 2.9 4.6 4 .6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.2-.2-.4-.3Z" />
    </svg>
  );
}

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);

  const defaultMsg = encodeURIComponent(
    "Salam Ashtech Wooden! Mujhe custom furniture aur interior woodcraft ke baare mein inquire karna hai."
  );
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${defaultMsg}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Quick chat popup box */}
      {isOpen && (
        <div className="w-72 sm:w-80 rounded-2xl border border-[#d4af6a]/30 bg-[#170e0a]/95 text-[#f7f0e2] p-4 shadow-2xl backdrop-blur-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-3">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#e0bd7c]">
                  Ashtech Woodcraft
                </h4>
                <p className="text-[10px] text-neutral-400">Master Craftsman Online</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-neutral-400 hover:text-white p-1"
              aria-label="Close popup"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="my-3 text-xs leading-relaxed text-neutral-300">
            Aap kis type ki wooden product ya interior work karwana chahte hain? Abhi WhatsApp par hamare craftsman se consult karein!
          </div>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg transition-transform hover:bg-emerald-500 active:scale-95"
          >
            <WhatsappIcon className="h-4 w-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      )}

      {/* Main floating button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-[0_4px_20px_rgba(16,185,129,0.45)] transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Contact on WhatsApp"
      >
        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[9px] font-bold text-black ring-2 ring-white">
          1
        </span>
        <WhatsappIcon className="h-7 w-7 transition-transform group-hover:rotate-12" />
      </button>
    </div>
  );
}
