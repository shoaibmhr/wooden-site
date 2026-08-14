import { Armchair } from "lucide-react";
import Container from "../common/Container";


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
function XIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      {...props}
    >
      <path
        d="M5 5l14 14M19 5 5 19"
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
function LinkedinIcon(props) {
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
        rx="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 10.5v6M8 7.5v.01M12.5 16.5v-3.5a2 2 0 0 1 4 0v3.5M12.5 16.5v-6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function PinterestIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      {...props}
    >
      <path
        d="M8 20c1-3 2-7 2-9a3 3 0 1 1 5 2c0 2-1 4-3 4s-2.5-1.2-2.5-1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="12"
        r="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function WhatsappIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      {...props}
    >
      <path
        d="M20 3.9A10 10 0 0 0 3.6 16.4L2 22l5.7-1.5A10 10 0 1 0 20 3.9Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 8.7c.2-.5.4-.5.7-.5h.5c.2 0 .4 0 .6.4.2.5.7 1.7.7 1.8.1.1.1.3 0 .4-.1.2-.1.3-.3.5-.1.2-.3.3-.4.5-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.6-.1.2-.2.7-.8.9-1 .2-.3.4-.2.6-.1l1.6.8c.2.1.4.2.4.3.1.2.1 1-.2 1.9-.3.8-1.6 1.5-2.2 1.6-.6.1-1.3.1-2.1-.1-.5-.1-1.1-.3-1.9-.6-3.4-1.4-5.6-4.9-5.7-5.1-.2-.2-1.4-1.8-1.4-3.5s.9-2.4 1.2-2.8Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const socialLinks = [
  { icon: FacebookIcon, label: "Facebook", href: "#" },
  { icon: XIcon, label: "X", href: "#" },
  { icon: InstagramIcon, label: "Instagram", href: "#" },
  { icon: PinterestIcon, label: "Pinterest", href: "#" },
  { icon: YoutubeIcon, label: "YouTube", href: "#" },
  { icon: LinkedinIcon, label: "LinkedIn", href: "#" },
  { icon: WhatsappIcon, label: "WhatsApp", href: "#" },
];

const supportLinks = [
  { label: "Assembly Services", href: "/assembly-services" },
  { label: "Cleaning & Care", href: "/cleaning-care" },
  { label: "Contact us", href: "/contact" },
  { label: "FAQs", href: "/faqs" },
  { label: "Track Order", href: "/track-order" },
];

const usefulLinks = [
  { label: "Blogs", href: "/blogs" },
  { label: "Buy in Bulk (B2B)", href: "/bulk-order" },
  { label: "Custom & Bespoke Furniture", href: "/custom-furniture" },
  { label: "Interior Services", href: "/interior-services" },
  { label: "Price match", href: "/price-match" },
];

const policyLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Return/ Refund/ Exchange Policy", href: "/return-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Warranty", href: "/warranty" },
  { label: "Shipping Policy", href: "/shipping-policy" },
];

const paymentMethods = [
  "AMEX",
  "Diners",
  "Maestro",
  "Mastercard",
  "RuPay",
  "VISA",
];

// Same underline-on-hover pattern as the Navbar's nav links, so footer
// links feel like part of the same system rather than a separate component.
const linkClass =
  "inline-block border-b border-transparent pb-0.5 text-sm text-stone-500 transition-colors duration-200 hover:border-[#5C2A2A] hover:text-[#5C2A2A]";

function FooterLinkList({ title, links }) {
  return (
    <div>
      <h3 className="font-serif text-stone-900 text-sm sm:text-base tracking-wide uppercase">
        {title}
      </h3>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.href} className={linkClass}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-neutral-200">
      <Container>
        <div className="py-14 sm:py-16 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-12">
          {/* Brand column */}
          <div className="lg:col-span-4">
            <a href="/" className="flex items-center gap-2">
              <Armchair className="h-6 w-6 text-amber-800" strokeWidth={1.5} />
              <span className="text-lg font-bold tracking-wide text-amber-900">
                Woodshala
              </span>
            </a>

            <p className="mt-4 text-sm text-stone-500 leading-relaxed max-w-xs">
              Affordable, handcrafted solid wood furniture with polish
              customisation — built by our own manufacturing unit.
            </p>

            <div className="mt-6 space-y-2.5 text-sm text-stone-500">
              <h3 className="font-serif text-stone-900 text-sm sm:text-base tracking-wide uppercase mb-1">
                Contact us
              </h3>
              <p className="text-xs text-stone-400">9:30 AM to 5:30 PM</p>
              <p>
                Email :{" "}
                <a href="mailto:info@woodshala.com" className={linkClass}>
                  info@woodshala.com
                </a>
              </p>
              <p>
                Whatsapp :{" "}
                <a href="https://wa.me/919509658944" className={linkClass}>
                  +91-9509658944
                </a>
              </p>
              <p>
                OR Visit{" "}
                <a href="/contact" className={linkClass}>
                  Contact us
                </a>{" "}
                Page
              </p>
            </div>

            <div className="mt-6 flex items-center gap-5">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="text-stone-500 transition-all duration-200 hover:text-[#5C2A2A] hover:-translate-y-0.5"
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-10">
            <FooterLinkList title="Support" links={supportLinks} />
            <FooterLinkList title="Useful Links" links={usefulLinks} />
            <FooterLinkList title="Policy" links={policyLinks} />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-neutral-200 text-center sm:text-left py-6 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-xs text-stone-400 leading-relaxed">
            <p>© 2026 - Woodshala - All Rights Reserved</p>
            <p>
              Parshwa Art and Craft Pvt. Ltd. • Subject to Jodhpur Jurisdiction
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
            {paymentMethods.map((method) => (
              <span
                key={method}
                className="flex items-center  justify-center rounded border border-stone-200 bg-stone-50 px-2.5 py-1.5 text-[10px] font-semibold tracking-wide text-stone-500"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
