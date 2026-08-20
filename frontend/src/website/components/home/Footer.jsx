import { Link } from "react-router-dom";
import Container from "../common/Container";

function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
      <path d="M15 8.5h-2a1.5 1.5 0 0 0-1.5 1.5v2H15l-.5 3H11.5v7h-3v-7H7v-3h1.5v-2A4 4 0 0 1 12.5 5H15v3.5Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}
function YoutubeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
      <rect x="2.5" y="6" width="19" height="12" rx="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.5 9.5v5l4.5-2.5-4.5-2.5Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function WhatsappIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20 3.9A10 10 0 0 0 3.6 16.4L2 22l5.7-1.5A10 10 0 1 0 20 3.9Zm-8 16.6a8.4 8.4 0 0 1-4.3-1.2l-.3-.2-3.2.8.9-3.1-.2-.3A8.5 8.5 0 1 1 12 20.5Zm4.6-6.4c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.7.8-.8 1-.2.2-.3.2-.5.1a6.9 6.9 0 0 1-3.5-3c-.3-.4.3-.4.7-1.3.1-.2 0-.4 0-.5L8.6 7.3c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.2s.9 2.6 1.1 2.8c.1.2 1.9 2.9 4.6 4 .6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.2-.2-.4-.3Z" />
    </svg>
  );
}

const socialLinks = [
  { icon: FacebookIcon, label: "Facebook", href: "#" },
  { icon: InstagramIcon, label: "Instagram", href: "#" },
  { icon: YoutubeIcon, label: "YouTube", href: "#" },
];

const mainNavigationLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Showcase & Products", href: "/products" },
  { label: "Projects Gallery", href: "/gallery" },
  { label: "Contact Showroom", href: "/contact" },
];

const craftLinks = [
  { label: "Wooden Doors & Frames", href: "/products" },
  { label: "Custom Dining & Beds", href: "/products" },
  { label: "Interior Wood Paneling", href: "/services" },
  { label: "Polish & Restoration", href: "/services" },
  { label: "Request Custom Quote", href: "/get-quote" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#170e0a] text-[#ecdfc4] border-t border-[#d4af6a]/20">
      <Container>
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 py-14 sm:py-16 lg:grid-cols-12">
          {/* Brand column */}
          <div className="flex flex-col items-center text-center lg:col-span-4 lg:items-start lg:text-left">
            <Link to="/" className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-br from-[#3e2723] via-[#2b1710] to-[#170e0a] text-base font-semibold tracking-wide text-[#f0d9a8] ring-1 ring-[#d4af6a]/40 shadow-md">
                W
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-serif text-xl font-bold tracking-wide text-[#f0d9a8]">
                  Ashtech Wooden
                </span>
                <span className="mt-1 text-[9px] uppercase tracking-[0.25em] text-[#b8863f]">
                  Est. 1978 Fine Woodcraft
                </span>
              </span>
            </Link>

            <p className="mt-5 max-w-xs text-xs sm:text-sm leading-relaxed text-[#ecdfc4]/80">
              Master wooden craftsmen specializing in bespoke wooden doors, architectural interior paneling, luxury furniture, and custom timber millwork.
            </p>

            <div className="mt-6 space-y-2 text-xs sm:text-sm text-[#ecdfc4]/90">
              <p>
                <strong className="text-[#e0bd7c]">Showroom & Workshop:</strong> Open Monday - Saturday
              </p>
              <p>
                <strong className="text-[#e0bd7c]">WhatsApp Inquiry:</strong>{" "}
                <a
                  href="https://wa.me/923027069093"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 font-bold hover:underline"
                >
                  +92 302 7069093
                </a>
              </p>
            </div>

            <div className="mt-6 flex items-center justify-center gap-4 lg:justify-start">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2b1710] text-[#d4af6a] transition-all hover:bg-[#d4af6a] hover:text-[#170e0a]"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 lg:col-span-8 lg:pl-12">
            <div>
              <h3 className="font-serif text-sm uppercase tracking-widest text-[#f0d9a8]">
                Quick Navigation
              </h3>
              <ul className="mt-4 space-y-2.5">
                {mainNavigationLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-xs sm:text-sm text-[#ecdfc4]/70 transition-colors hover:text-[#f0d9a8]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-serif text-sm uppercase tracking-widest text-[#f0d9a8]">
                Woodcraft & Services
              </h3>
              <ul className="mt-4 space-y-2.5">
                {craftLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-xs sm:text-sm text-[#ecdfc4]/70 transition-colors hover:text-[#f0d9a8]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#d4af6a]/20 py-6 text-center text-xs text-[#ecdfc4]/60">
          <p>© {new Date().getFullYear()} Ashtech Wooden Craftsmanship. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
