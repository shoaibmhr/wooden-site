import { Link } from "react-router-dom";
import Container from "../common/Container";
import logo from "../../../assets/image/logo-footer.png";

function FacebookIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      {...props}
    >
      <path
        d="M15 8.5h-2a1.5 1.5 0 0 0-1.5 1.5v2H15l-.5 3H11.5v7h-3v-7H7v-3h1.5v-2A4 4 0 0 1 12.5 5H15v3.5Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function InstagramIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      {...props}
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="12"
        r="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}
function YoutubeIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      {...props}
    >
      <rect
        x="2.5"
        y="6"
        width="19"
        height="12"
        rx="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 9.5v5l4.5-2.5-4.5-2.5Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
    <footer className="w-full bg-[#17130F] text-[#D9CFBC] border-t border-[#A9793C]/20">
      <Container>
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 py-14 sm:py-16 lg:grid-cols-12">
          <div className="flex flex-col items-start text-left lg:col-span-4">
            <Link to="/" className="flex items-start gap-3">
              <img
                src={logo}
                alt="Art By Adeel Logo"
                className="h-12 w-12 shrink-0 object-contain sm:h-14 sm:w-14"
              />
              <span className="flex flex-col leading-none">
                <span className="font-serif text-xl font-semibold tracking-wide text-[#F3ECDD]">
                  Art By Adeel
                </span>
                <span className="mt-1 text-[9px] uppercase tracking-[0.25em] text-[#A9793C]">
                  Premium Interiors Arts
                </span>
              </span>
            </Link>

            <p className="mt-5 max-w-xs text-xs sm:text-sm leading-relaxed text-[#D9CFBC]/75">
              Master wooden craftsmen specializing in bespoke wooden doors,
              architectural interior paneling, luxury furniture, and custom
              timber millwork.
            </p>

            <div className="mt-6 space-y-2 text-xs sm:text-sm text-[#D9CFBC]/85">
              <p>
                <strong className="text-[#C9A468]">Showroom & Workshop:</strong>{" "}
                Open Monday - Saturday
              </p>
              <p>
                <strong className="text-[#C9A468]">WhatsApp Inquiry:</strong>{" "}
                <a
                  href="https://wa.me/923027069093"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#F3ECDD] font-semibold hover:text-[#C9A468] hover:underline"
                >
                  +92 302 7069093
                </a>
              </p>
            </div>

            <div className="mt-6 flex items-center justify-start gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#241C15] text-[#A9793C] transition-colors duration-300 hover:bg-[#A9793C] hover:text-[#17130F]"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 lg:col-span-8 lg:pl-12">
            <div>
              <h3 className="font-serif text-sm uppercase tracking-widest text-[#C9A468]">
                Quick Navigation
              </h3>
              <ul className="mt-4 space-y-2.5">
                {mainNavigationLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-xs sm:text-sm text-[#D9CFBC]/70 transition-colors hover:text-[#F3ECDD]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-serif text-sm uppercase tracking-widest text-[#C9A468]">
                Woodcraft & Services
              </h3>
              <ul className="mt-4 space-y-2.5">
                {craftLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-xs sm:text-sm text-[#D9CFBC]/70 transition-colors hover:text-[#F3ECDD]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-[#A9793C]/20 py-6 text-center text-xs text-[#D9CFBC]/60">
          <p>© {new Date().getFullYear()} Art By Adeel. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
