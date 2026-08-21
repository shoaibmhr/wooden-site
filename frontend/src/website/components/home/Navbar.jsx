import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search, Phone, ArrowRight } from "lucide-react";
import Container from "../common/Container";
import SearchOverlay from "../common/SearchOverlay";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Showcase", href: "/products" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#faf6ef]">
      <style>{`
        @keyframes wd-shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
      `}</style>

      {/* Shimmer accent line */}
      <div className="h-[3px] w-full wd-shimmer-line" />

      {/* Main nav */}
      <div
        className={`border-b transition-shadow duration-300 ${
          isScrolled
            ? "border-transparent shadow-[0_8px_28px_-14px_rgba(28,18,13,0.45)]"
            : "border-[#ecdfc4]/60"
        }`}
      >
        <Container>
          <div className="flex h-16 items-center justify-between gap-3 md:h-20 sm:gap-4">
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="-ml-2 order-1 flex items-center justify-center p-2 text-[#2b1710] transition-transform active:scale-90 lg:hidden"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" strokeWidth={1.5} />
              ) : (
                <Menu className="h-6 w-6" strokeWidth={1.5} />
              )}
            </button>

            <Link
              to="/"
              className="order-2 flex flex-1 items-center justify-center gap-2.5 md:order-2 lg:order-1 lg:flex-none lg:justify-start"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-br from-[#3e2723] via-[#2b1710] to-[#170e0a] text-sm font-semibold tracking-wide text-[#f0d9a8] shadow-[0_2px_10px_-2px_rgba(28,18,13,0.55)] ring-1 ring-[#d4af6a]/40">
                W
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-serif text-lg font-semibold tracking-wide text-[#2b1710] sm:text-xl">
                  WoodenSite
                </span>
                <span className="mt-1 hidden text-[9px] uppercase tracking-[0.25em] text-[#b8863f] sm:block">
                  Est. Fine Woodcraft
                </span>
              </span>
            </Link>

            <nav className="order-3 hidden lg:order-2 lg:flex lg:flex-1 lg:justify-center">
              <ul className="flex flex-wrap items-center justify-center gap-x-8 xl:gap-x-10">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="group relative inline-block py-1 text-[13px] font-medium uppercase tracking-[0.08em] text-[#2b1710] transition-colors duration-200 hover:text-[#9c7a3f]"
                    >
                      {link.label}
                      <span className="pointer-events-none absolute -bottom-0.5 left-1/2 h-px w-0 -translate-x-1/2 bg-gradient-to-r from-[#b8863f] to-[#f0d9a8] transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="order-5 flex items-center gap-2 lg:order-3">
              <button
                aria-label="Search"
                onClick={() => setIsSearchOpen(true)}
                className="flex h-9 w-9 items-center justify-center text-[#2b1710] transition-colors duration-200 hover:text-[#b8863f]"
              >
                <Search className="h-[18px] w-[18px]" strokeWidth={1.5} />
              </button>

              <Link
                to="/get-quote"
                className="group relative hidden items-center gap-1.5 overflow-hidden rounded-sm bg-gradient-to-r from-[#2b1710] to-[#3e2723] px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-[#f7f0e2] shadow-[0_2px_10px_-2px_rgba(28,18,13,0.5)] transition-all duration-200 hover:shadow-[0_4px_18px_-2px_rgba(212,175,106,0.55)] sm:flex"
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                Get a Quote
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                  strokeWidth={2}
                />
              </Link>
            </div>
          </div>
        </Container>
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 lg:hidden ${
          isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          onClick={() => setIsMenuOpen(false)}
          className={`absolute inset-0 bg-[#170e0a]/45 backdrop-blur-[2px] transition-opacity duration-300 ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <nav
          className={`absolute left-0 top-0 flex h-full w-[82%] max-w-sm flex-col bg-[#faf6ef] shadow-2xl transition-transform duration-300 ease-out ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-16 items-center justify-between border-b border-[#ecdfc4] px-5">
            <span className="font-serif text-lg font-semibold text-[#2b1710]">
              WoodenSite
            </span>
            <button
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
              className="p-2 text-[#2b1710]"
            >
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
          <ul className="flex flex-1 flex-col divide-y divide-[#ecdfc4] overflow-y-auto px-5 pt-2">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-3.5 text-sm font-medium uppercase tracking-[0.08em] text-[#2b1710] transition-colors hover:text-[#b8863f]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="border-t border-[#ecdfc4] p-5">
            <Link
              to="/get-quote"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-center gap-1.5 rounded-sm bg-gradient-to-r from-[#2b1710] to-[#3e2723] px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.1em] text-[#f7f0e2] transition-colors hover:from-[#b8863f] hover:to-[#9c7a3f]"
            >
              Get a Quote
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
            </Link>
            <div className="mt-4 flex items-center justify-center gap-1.5 text-[12px] text-[#6b5a48]">
              <Phone
                className="h-3.5 w-3.5 text-[#b8863f]"
                strokeWidth={1.75}
              />
              +92 300 123 4567
            </div>
          </div>
        </nav>
      </div>

      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </header>
  );
}