import { Link } from "react-router-dom";
import { Trash2, ShoppingCart, Heart } from "lucide-react";
import Container from "../components/common/Container";
import Breadcrumbs from "../components/common/Breadcrumbs";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useToast } from "../components/common/Toast";

function formatPrice(value) {
  return `₹${value.toLocaleString("en-IN")}`;
}

export default function Wishlist() {
  const { wishlistItems, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleMoveToCart = (item) => {
    addToCart(item);
    toggleWishlist(item);
    showToast(`${item.name} moved to cart`);
  };

  if (wishlistItems.length === 0) {
    return (
      <section className="w-full bg-white py-16 sm:py-20">
        <Container>
          <div className="flex flex-col items-center text-center">
            <Heart className="h-14 w-14 text-neutral-300" strokeWidth={1.25} />
            <h1 className="mt-4 text-xl font-bold text-neutral-900 sm:text-2xl">
              Your wishlist is empty
            </h1>
            <p className="mt-2 text-sm text-neutral-600 sm:text-base">
              Save items you love by tapping the heart icon on any product.
            </p>
            <Link
              to="/products"
              className="mt-6 inline-flex items-center bg-[#5c1f1f] px-8 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-all duration-300 hover:bg-[#732929] sm:px-10 sm:text-sm"
            >
              Browse Products
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="w-full bg-white py-8 sm:py-10 md:py-12">
      <Container>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Wishlist", href: "/wishlist" },
          ]}
        />

        <div className="mb-6 flex items-center justify-between sm:mb-8">
          <h1 className="text-2xl font-bold tracking-wide text-amber-900 sm:text-3xl">
            Your Wishlist
          </h1>
          <span className="text-sm text-neutral-500">
            {wishlistItems.length}{" "}
            {wishlistItems.length === 1 ? "item" : "items"}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white transition-shadow duration-300 hover:shadow-xl"
            >
              <Link
                to={item.href}
                className="relative block aspect-square w-full overflow-hidden bg-neutral-50"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <button
                  type="button"
                  aria-label="Remove from wishlist"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleWishlist(item);
                    showToast(`${item.name} removed from wishlist`);
                  }}
                  className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-neutral-700 shadow-sm transition-colors duration-200 hover:text-[#5c1f1f] sm:right-3 sm:top-3"
                >
                  <Trash2 className="h-4 w-4" strokeWidth={1.75} />
                </button>
              </Link>

              <div className="flex flex-1 flex-col p-3 sm:p-4">
                <Link to={item.href}>
                  <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-neutral-900 transition-colors duration-200 hover:text-amber-900 sm:text-base">
                    {item.name}
                  </h3>
                </Link>

                <span className="mt-2 text-sm font-bold text-neutral-900 sm:text-base">
                  {formatPrice(item.price)}
                </span>

                <button
                  type="button"
                  onClick={() => handleMoveToCart(item)}
                  className="mt-3 flex w-full items-center justify-center gap-2 bg-[#5c1f1f] px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-[#732929] sm:mt-4 sm:py-3 sm:text-sm"
                >
                  <ShoppingCart className="h-4 w-4" strokeWidth={1.75} />
                  Move to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
