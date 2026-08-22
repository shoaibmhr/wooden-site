import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  Search,
  Phone,
  ArrowRight,
  ChevronDown,
  DoorClosed,
  Wrench,
  Paintbrush,
  LayoutGrid,
  Users,
  Hammer,
  Sofa,
  UtensilsCrossed,
  BedDouble,
  DoorOpen,
  Factory,
} from "lucide-react";
import Container from "../common/Container";
import SearchOverlay from "../common/SearchOverlay";


const categories = [
  {
    title: "Bed",
    href: "/category/bed",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Dining Set",
    href: "/category/dining-set",
    image:
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Swing",
    href: "/category/swing",
    image:
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Sofa",
    href: "/category/sofa",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Stool",
    href: "/category/stool",
    image:
      "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Temple",
    href: "/category/temple",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80",
  },
];

const serviceItems = [
  {
    title: "Custom Furniture Design",
    description: "Bespoke pieces built to your dimensions",
    href: "/services?type=custom-design",
    icon: Hammer,
  },
  {
    title: "Interior Wood Paneling",
    description: "Wall paneling & architectural millwork",
    href: "/services?type=paneling",
    icon: LayoutGrid,
  },
  {
    title: "Doors & Windows",
    description: "Solid wood doors, frames & finishing",
    href: "/services?type=doors-windows",
    icon: DoorClosed,
  },
  {
    title: "Bulk & Corporate Orders",
    description: "Large-scale projects, priority timelines",
    href: "/services?type=bulk-orders",
    icon: Users,
  },
  {
    title: "On-Site Installation",
    description: "Measurement visits & turnkey fitting",
    href: "/services?type=installation",
    icon: Wrench,
  },
  {
    title: "Restoration & Refinishing",
    description: "Bring old woodwork back to life",
    href: "/services?type=restoration",
    icon: Paintbrush,
  },
];
const galleryItems = [
  {
    title: "Living Rooms",
    description: "Sofas, coffee tables & TV units",
    href: "/gallery?category=living-room",
    icon: Sofa,
  },
  {
    title: "Bedrooms",
    description: "Beds, wardrobes & dressers",
    href: "/gallery?category=bedroom",
    icon: BedDouble,
  },
  {
    title: "Dining Spaces",
    description: "Tables, chairs & sideboards",
    href: "/gallery?category=dining",
    icon: UtensilsCrossed,
  },
  {
    title: "Doors & Entryways",
    description: "Main doors, gates & frames",
    href: "/gallery?category=entryway",
    icon: DoorOpen,
  },
  {
    title: "Workshop & Process",
    description: "Behind the scenes with our craftsmen",
    href: "/gallery?category=workshop",
    icon: Factory,
  },
];


const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "Services",
    href: "/services",
    dropdown: { type: "list", items: serviceItems, cta: { label: "View All Services", href: "/services" } },
  },
  {
    label: "Categories",
    href: "/products",
    dropdown: { type: "images", items: categories, cta: { label: "View All Categories", href: "/products" } },
  },
  {
    label: "Gallery",
    href: "/gallery",
    dropdown: { type: "list", items: galleryItems, cta: { label: "View Full Gallery", href: "/gallery" } },
  },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  // Which desktop dropdown is currently open, identified by nav link label.
  const [openMenu, setOpenMenu] = useState(null);
  // Which mobile accordion(s) are expanded, identified by nav link label.
  const [openMobileMenus, setOpenMobileMenus] = useState({});
  const closeTimer = useRef(null);

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

  // Small delay before closing on mouse-out so moving the cursor from the
  // nav link down into its dropdown panel doesn't close it prematurely.
  const openDropdown = (label) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };
  const scheduleCloseDropdown = () => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 150);
  };

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const toggleMobileMenu = (label) => {
    setOpenMobileMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

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
                {navLinks.map((link) => {
                  if (!link.dropdown) {
                    return (
                      <li key={link.label}>
                        <Link
                          to={link.href}
                          className="group relative inline-block py-1 text-[13px] font-medium uppercase tracking-[0.08em] text-[#2b1710] transition-colors duration-200 hover:text-[#9c7a3f]"
                        >
                          {link.label}
                          <span className="pointer-events-none absolute -bottom-0.5 left-1/2 h-px w-0 -translate-x-1/2 bg-gradient-to-r from-[#b8863f] to-[#f0d9a8] transition-all duration-300 group-hover:w-full" />
                        </Link>
                      </li>
                    );
                  }

                  const isOpen = openMenu === link.label;
                  const isImageType = link.dropdown.type === "images";

                  return (
                    <li
                      key={link.label}
                      className="relative"
                      onMouseEnter={() => openDropdown(link.label)}
                      onMouseLeave={scheduleCloseDropdown}
                    >
                      <Link
                        to={link.href}
                        onClick={() => setOpenMenu(null)}
                        className="group relative flex items-center gap-1 py-1 text-[13px] font-medium uppercase tracking-[0.08em] text-[#2b1710] transition-colors duration-200 hover:text-[#9c7a3f]"
                        aria-expanded={isOpen}
                      >
                        {link.label}
                        <ChevronDown
                          className={`h-3.5 w-3.5 transition-transform duration-300 ease-out ${
                            isOpen ? "rotate-180" : ""
                          }`}
                          strokeWidth={2}
                        />
                        <span
                          className={`pointer-events-none absolute -bottom-0.5 left-1/2 h-px -translate-x-1/2 bg-gradient-to-r from-[#b8863f] to-[#f0d9a8] transition-all duration-300 ${
                            isOpen ? "w-full" : "w-0 group-hover:w-full"
                          }`}
                        />
                      </Link>

                      {/* Dropdown panel */}
                      <div
                        className={`absolute top-full z-50 pt-4 transition-all duration-300 ease-out ${
                          isImageType
                            ? "left-1/2 w-[min(640px,90vw)] -translate-x-1/2"
                            : "left-1/2 w-[300px] -translate-x-1/2"
                        } ${
                          isOpen
                            ? "pointer-events-auto opacity-100 translate-y-0"
                            : "pointer-events-none opacity-0 -translate-y-2"
                        }`}
                      >
                        <div className="overflow-hidden rounded-md border border-[#ecdfc4] bg-[#faf6ef] shadow-[0_18px_50px_-12px_rgba(28,18,13,0.25)]">
                          {/* Thin gradient cap, echoes the shimmer line at the top of the page */}
                          <div className="h-[3px] w-full bg-gradient-to-r from-[#b8863f] via-[#f0d9a8] to-[#b8863f]" />

                          {isImageType ? (
                            <div className="grid grid-cols-3 gap-1 p-4">
                              {link.dropdown.items.map((category, idx) => (
                                <Link
                                  key={category.title}
                                  to={category.href}
                                  onClick={() => setOpenMenu(null)}
                                  className="group/item flex items-center gap-3 rounded-sm p-2 transition-colors duration-200 hover:bg-[#f0e6cc]/60"
                                  style={{
                                    transitionDelay: isOpen ? `${idx * 40}ms` : "0ms",
                                  }}
                                >
                                  <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-sm border border-[#ecdfc4]">
                                    <img
                                      src={category.image}
                                      alt={category.title}
                                      loading="lazy"
                                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover/item:scale-110"
                                    />
                                  </span>
                                  <span className="text-[12.5px] font-medium uppercase tracking-[0.06em] text-[#2b1710] transition-colors duration-200 group-hover/item:text-[#9c7a3f]">
                                    {category.title}
                                  </span>
                                </Link>
                              ))}
                            </div>
                          ) : (
                            <div className="p-2">
                              {link.dropdown.items.map((item, idx) => {
                                const Icon = item.icon;
                                return (
                                  <Link
                                    key={item.title}
                                    to={item.href}
                                    onClick={() => setOpenMenu(null)}
                                    className={`group/item relative flex items-start gap-3 overflow-hidden rounded-sm p-2.5 transition-all duration-300 ease-out hover:bg-[#f0e6cc]/60 ${
                                      isOpen
                                        ? "opacity-100 translate-x-0"
                                        : "opacity-0 -translate-x-2"
                                    }`}
                                    style={{
                                      transitionDelay: isOpen ? `${idx * 45}ms` : "0ms",
                                    }}
                                  >
                                    {/* Gold accent bar that draws in on hover */}
                                    <span className="absolute inset-y-1.5 left-0 w-[3px] scale-y-0 bg-gradient-to-b from-[#b8863f] to-[#f0d9a8] transition-transform duration-300 ease-out group-hover/item:scale-y-100" />
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-[#f0e6cc]/70 text-[#b8863f] transition-colors duration-300 group-hover/item:bg-[#2b1710] group-hover/item:text-[#f0d9a8]">
                                      <Icon className="h-4 w-4" strokeWidth={1.75} />
                                    </span>
                                    <span className="flex flex-col">
                                      <span className="text-[12.5px] font-semibold uppercase tracking-[0.05em] text-[#2b1710] transition-colors duration-200 group-hover/item:text-[#9c7a3f]">
                                        {item.title}
                                      </span>
                                      <span className="mt-0.5 text-[11px] leading-snug text-[#6b5a48]">
                                        {item.description}
                                      </span>
                                    </span>
                                  </Link>
                                );
                              })}
                            </div>
                          )}

                          <div className="border-t border-[#ecdfc4] px-4 py-3">
                            <Link
                              to={link.dropdown.cta.href}
                              onClick={() => setOpenMenu(null)}
                              className="group/all flex items-center justify-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#b8863f] transition-colors duration-200 hover:text-[#9c7a3f]"
                            >
                              {link.dropdown.cta.label}
                              <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover/all:translate-x-1" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
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
            {navLinks.map((link) => {
              if (!link.dropdown) {
                return (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block py-3.5 text-sm font-medium uppercase tracking-[0.08em] text-[#2b1710] transition-colors hover:text-[#b8863f]"
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              }

              const isOpen = !!openMobileMenus[link.label];
              const isImageType = link.dropdown.type === "images";

              return (
                <li key={link.label}>
                  <div className="flex items-center justify-between">
                    <Link
                      to={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex-1 py-3.5 text-sm font-medium uppercase tracking-[0.08em] text-[#2b1710] transition-colors hover:text-[#b8863f]"
                    >
                      {link.label}
                    </Link>
                    <button
                      type="button"
                      onClick={() => toggleMobileMenu(link.label)}
                      aria-label={`Toggle ${link.label}`}
                      aria-expanded={isOpen}
                      className="p-2 text-[#2b1710]"
                    >
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-300 ease-out ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        strokeWidth={1.75}
                      />
                    </button>
                  </div>
                  <div
                    className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      {isImageType ? (
                        <div className="grid grid-cols-3 gap-2 pb-4">
                          {link.dropdown.items.map((category) => (
                            <Link
                              key={category.title}
                              to={category.href}
                              onClick={() => {
                                setIsMenuOpen(false);
                                toggleMobileMenu(link.label);
                              }}
                              className="flex flex-col items-center gap-1.5 rounded-sm p-1.5 text-center transition-colors hover:bg-[#f0e6cc]/60"
                            >
                              <span className="h-14 w-14 overflow-hidden rounded-sm border border-[#ecdfc4]">
                                <img
                                  src={category.image}
                                  alt={category.title}
                                  loading="lazy"
                                  className="h-full w-full object-cover"
                                />
                              </span>
                              <span className="text-[10.5px] font-medium uppercase tracking-[0.04em] text-[#2b1710]">
                                {category.title}
                              </span>
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col gap-1 pb-4">
                          {link.dropdown.items.map((item) => {
                            const Icon = item.icon;
                            return (
                              <Link
                                key={item.title}
                                to={item.href}
                                onClick={() => {
                                  setIsMenuOpen(false);
                                  toggleMobileMenu(link.label);
                                }}
                                className="flex items-center gap-3 rounded-sm p-2 transition-colors hover:bg-[#f0e6cc]/60"
                              >
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-[#f0e6cc]/70 text-[#b8863f]">
                                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                                </span>
                                <span className="text-[12px] font-medium uppercase tracking-[0.04em] text-[#2b1710]">
                                  {item.title}
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
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