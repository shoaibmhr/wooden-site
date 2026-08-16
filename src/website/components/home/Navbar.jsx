
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  User,
  Search,
  Heart,
  ShoppingBag,
  Armchair,
} from "lucide-react";
import Container from "../common/Container";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
  { label: "FAQs", href: "/faqs" },
];

function IconBadge({ count }) {
  if (!count) return null;
  return (
    <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#5c1f1f] text-[10px] font-semibold text-white">
      {count > 9 ? "9+" : count}
    </span>
  );
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white">
      <Container>
        <div className="flex h-16 items-center justify-between gap-3 md:h-[4.5rem] sm:gap-4">
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="-ml-2 order-1 flex items-center justify-center p-2 text-neutral-800 lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" strokeWidth={1.75} />
            ) : (
              <Menu className="h-6 w-6" strokeWidth={1.75} />
            )}
          </button>

          <Link
            to="/"
            className="order-2 flex flex-1 items-center justify-center gap-2 md:order-3 lg:order-1 lg:flex-none lg:justify-start"
          >
            <Armchair className="h-6 w-6 text-amber-800" strokeWidth={1.5} />
            <span className="text-base font-bold tracking-wide text-amber-900 sm:text-lg">
              WoodenSite
            </span>
          </Link>

          <nav className="order-3 hidden lg:order-2 lg:flex lg:flex-1 lg:justify-center">
            <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-1 xl:gap-x-9">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="inline-block whitespace-nowrap border-b-2 border-transparent pb-1 text-sm font-medium text-neutral-800 transition-colors hover:border-amber-800 hover:text-amber-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <button
            aria-label="Account"
            className="order-5 hidden text-neutral-700 transition-colors hover:text-amber-900 md:block lg:order-3"
          >
            <User className="h-5 w-5" strokeWidth={1.5} />
          </button>

          <button
            aria-label="Search"
            className="order-6 hidden text-neutral-700 transition-colors hover:text-amber-900 md:block lg:order-4"
          >
            <Search className="h-5 w-5" strokeWidth={1.5} />
          </button>

          <Link
            to="/wishlist"
            aria-label="Wishlist"
            className="relative order-4 flex text-neutral-700 transition-colors hover:text-amber-900 md:order-2 lg:order-5"
          >
            <Heart className="h-5 w-5" strokeWidth={1.5} />
            <IconBadge count={wishlistCount} />
          </Link>

          <Link
            to="/cart"
            aria-label="Cart"
            className="relative order-7 text-neutral-700 transition-colors hover:text-amber-900"
          >
            <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
            <IconBadge count={cartCount} />
          </Link>
        </div>

        {isMenuOpen && (
          <nav className="border-t border-neutral-200 pb-4 lg:hidden">
            <ul className="flex flex-col gap-1 pt-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block rounded-md px-3 py-2.5 text-sm font-medium text-neutral-800 transition-colors hover:bg-neutral-50 hover:text-amber-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </Container>
    </header>
  );
}
