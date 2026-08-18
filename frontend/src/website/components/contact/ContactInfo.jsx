import { Mail, Phone, MapPin, Clock } from "lucide-react";

const WHATSAPP_NUMBER = "919509658944";
const whatsappMessage = encodeURIComponent("Hi, I have a question about your furniture.");
const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

function WhatsappIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20 3.9A10 10 0 0 0 3.6 16.4L2 22l5.7-1.5A10 10 0 1 0 20 3.9Zm-8 16.6a8.4 8.4 0 0 1-4.3-1.2l-.3-.2-3.2.8.9-3.1-.2-.3A8.5 8.5 0 1 1 12 20.5Zm4.6-6.4c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.7.8-.8 1-.2.2-.3.2-.5.1a6.9 6.9 0 0 1-3.5-3c-.3-.4.3-.4.7-1.3.1-.2 0-.4 0-.5L8.6 7.3c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.2s.9 2.6 1.1 2.8c.1.2 1.9 2.9 4.6 4 .6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.2-.2-.4-.3Z" />
    </svg>
  );
}

const infoItems = [
  { icon: MapPin, label: "Address", value: "Jodhpur, Rajasthan, India" },
  { icon: Phone, label: "Phone", value: "+91-9509658944", href: "tel:+919509658944" },
  { icon: Mail, label: "Email", value: "info@woodshala.com", href: "mailto:info@woodshala.com" },
  { icon: Clock, label: "Working Hours", value: "9:30 AM – 5:30 PM, Mon–Sat" },
];

export default function ContactInfo() {
  return (
    <div className="flex h-full flex-col bg-[#faf1e0] p-6 sm:p-8 md:p-10">
      <h2 className="text-xs font-bold uppercase tracking-widest text-amber-800">
        Contact Details
      </h2>

      <ul className="mt-5 flex-1 space-y-5">
        {infoItems.map((item) => {
          const Icon = item.icon;
          const content = (
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-amber-900">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <div>
                <p className="text-xs text-neutral-500">{item.label}</p>
                <p className="text-sm font-medium text-neutral-900 sm:text-base">
                  {item.value}
                </p>
              </div>
            </div>
          );

          return (
            <li key={item.label}>
              {item.href ? (
                <a href={item.href} className="transition-opacity hover:opacity-70">
                  {content}
                </a>
              ) : (
                content
              )}
            </li>
          );
        })}
      </ul>

      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex w-full items-center justify-center gap-2.5 bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#1ea952] sm:w-auto"
      >
        <WhatsappIcon className="h-5 w-5" />
        Chat on WhatsApp
      </a>
    </div>
  );
}
