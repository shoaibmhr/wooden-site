import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search, Phone, ArrowRight } from "lucide-react";
import Container from "../common/Container";
import SearchOverlay from "../common/SearchOverlay";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
  { label: "FAQs", href: "/faqs" },
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

  return (
    <header className="sticky top-0 z-50 w-full bg-[#faf7f2]">
      {/* Utility bar */}
      <div className="hidden bg-[#2b1710] text-[#e8ddca] sm:block">
        <Container>
          <div className="flex h-9 items-center justify-between text-[11px] tracking-[0.12em]">
            <span className="uppercase text-[#c9a668]">
              Handcrafted Wooden Furniture, Made to Last
            </span>
            <div className="flex items-center gap-5">
              <span className="hidden items-center gap-1.5 md:flex">
                <Phone className="h-3 w-3 text-[#c9a668]" strokeWidth={1.75} />
                +92 300 123 4567
              </span>
              <Link
                to="/contact"
                className="uppercase text-[#e8ddca] transition-colors hover:text-[#c9a668]"
              >
                Visit Showroom
              </Link>
            </div>
          </div>
        </Container>
      </div>

      {/* Main nav */}
      <div
        className={`border-b transition-shadow duration-300 ${
          isScrolled
            ? "border-transparent shadow-[0_6px_24px_-12px_rgba(43,23,16,0.35)]"
            : "border-[#e8e1d4]"
        }`}
      >
        <Container>
          <div className="flex h-16 items-center justify-between gap-3 md:h-20 sm:gap-4">
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="-ml-2 order-1 flex items-center justify-center p-2 text-[#2b1710] lg:hidden"
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
              <span className="flex h-9 w-9 items-center justify-center rounded-sm border border-[#ab8552] text-sm font-semibold tracking-wide text-[#ab8552]">
                W
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-serif text-lg font-semibold tracking-wide text-[#2b1710] sm:text-xl">
                  WoodenSite
                </span>
                <span className="mt-1 hidden text-[9px] uppercase tracking-[0.25em] text-[#ab8552] sm:block">
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
                      className="group relative inline-block py-1 text-[13px] font-medium uppercase tracking-[0.08em] text-[#2b1710]"
                    >
                      {link.label}
                      <span className="pointer-events-none absolute -bottom-0.5 left-1/2 h-px w-0 -translate-x-1/2 bg-[#ab8552] transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="order-5 flex items-center gap-2 lg:order-3">
              <button
                aria-label="Search"
                onClick={() => setIsSearchOpen(true)}
                className="flex h-9 w-9 items-center justify-center text-[#2b1710] transition-colors duration-200 hover:text-[#ab8552]"
              >
                <Search className="h-[18px] w-[18px]" strokeWidth={1.5} />
              </button>

              <Link
                to="/contact"
                className="group hidden items-center gap-1.5 rounded-sm bg-[#2b1710] px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-[#faf7f2] transition-colors duration-200 hover:bg-[#ab8552] sm:flex"
              >
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

      {isMenuOpen && (
        <nav className="border-t border-[#e8e1d4] bg-[#faf7f2] pb-4 lg:hidden">
          <Container>
            <ul className="flex flex-col divide-y divide-[#e8e1d4] pt-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-3 text-sm font-medium uppercase tracking-[0.08em] text-[#2b1710] transition-colors hover:text-[#ab8552]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="mt-4 flex items-center justify-center gap-1.5 rounded-sm bg-[#2b1710] px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.1em] text-[#faf7f2] transition-colors hover:bg-[#ab8552]"
            >
              Get a Quote
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
            </Link>
          </Container>
        </nav>
      )}

      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </header>
  );
}