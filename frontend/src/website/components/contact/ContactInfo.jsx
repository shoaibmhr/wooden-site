import { Mail, Phone, MapPin, Clock, ShieldCheck,  } from "lucide-react";

const WHATSAPP_NUMBER = "923027069093";
const whatsappMessage = encodeURIComponent(
  "Salam Ashtech Wooden! I would like to inquire about showroom visit & custom woodcraft quotes."
);
const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

function WhatsappIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20 3.9A10 10 0 0 0 3.6 16.4L2 22l5.7-1.5A10 10 0 1 0 20 3.9Zm-8 16.6a8.4 8.4 0 0 1-4.3-1.2l-.3-.2-3.2.8.9-3.1-.2-.3A8.5 8.5 0 1 1 12 20.5Zm4.6-6.4c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.7.8-.8 1-.2.2-.3.2-.5.1a6.9 6.9 0 0 1-3.5-3c-.3-.4.3-.4.7-1.3.1-.2 0-.4 0-.5L8.6 7.3c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.2s.9 2.6 1.1 2.8c.1.2 1.9 2.9 4.6 4 .6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.2-.2-.4-.3Z" />
    </svg>
  );
}

const infoItems = [
  { icon: MapPin, label: "Showroom & Workshop", value: "Ashtech Wooden Complex, Pakistan" },
  { icon: Phone, label: "Phone Support", value: "+92 302 7069093", href: "tel:+923027069093" },
  { icon: Mail, label: "Official Email", value: "info@ashtechwooden.com", href: "mailto:info@ashtechwooden.com" },
  { icon: Clock, label: "Working Hours", value: "9:30 AM – 6:00 PM, Monday – Saturday" },
];

export default function ContactInfo() {
  return (
    <div className="flex h-full flex-col justify-between bg-[#170e0a] p-6 sm:p-8 md:p-10 text-[#ecdfc4]">
      <div>
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d4af6a]">
          Connect With Us
        </span>
        <h2 className="mt-1 font-serif text-2xl font-bold text-[#f7f0e2] sm:text-3xl">
          Showroom & Workshop
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-[#ecdfc4]/80 leading-relaxed">
          Visit our showroom or schedule an on-site architectural measurement session with our master craftsmen.
        </p>

        <ul className="mt-8 space-y-6">
          {infoItems.map((item) => {
            const Icon = item.icon;
            const content = (
              <div className="flex items-start gap-3.5 group">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#2b1710] text-[#d4af6a] ring-1 ring-[#d4af6a]/30 group-hover:bg-[#d4af6a] group-hover:text-[#170e0a] transition-all duration-300">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#d4af6a]">
                    {item.label}
                  </p>
                  <p className="mt-0.5 text-xs sm:text-sm font-medium text-[#f0d9a8]">
                    {item.value}
                  </p>
                </div>
              </div>
            );

            return (
              <li key={item.label}>
                {item.href ? (
                  <a href={item.href} className="transition-opacity hover:opacity-85">
                    {content}
                  </a>
                ) : (
                  content
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-8 pt-6 border-t border-[#d4af6a]/20">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-emerald-600 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all duration-300 hover:bg-emerald-500"
        >
          <WhatsappIcon className="h-4 w-4 shrink-0" />
          <span>Instant WhatsApp Chat</span>
        </a>

        <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-[#ecdfc4]/70">
          <ShieldCheck className="h-3.5 w-3.5 text-[#d4af6a]" />
          <span>Turnkey Installation & Site Measurements</span>
        </div>
      </div>
    </div>
  );
}
