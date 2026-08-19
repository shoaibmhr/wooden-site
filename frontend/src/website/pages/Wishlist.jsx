import { Link } from "react-router-dom";
import { Trash2, ShoppingCart, Heart } from "lucide-react";
import Container from "../components/common/Container";
import { useCart, useWishlist } from "../../store/hooks";
import { useToast } from "../components/common/Toast";
import PageHero from "../components/common/PageHero";

function formatPrice(value) {
  return `PKR ${Number(value).toLocaleString("en-PK")}`;
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

  return (
    <div>
      <PageHero
        image="https://images.unsplash.com/photo-1757416654883-c73c67b3382b?auto=format&fit=crop&w=1600&q=80"
        title="Your Wishlist"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Wishlist", href: "/wishlist" },
        ]}
      />

      {wishlistItems.length === 0 ? (
        <section className="w-full bg-white py-16 sm:py-20">
          <Container>
            <div className="flex flex-col items-center text-center">
              <Heart
                className="h-14 w-14 text-neutral-300"
                strokeWidth={1.25}
              />
              <h2 className="mt-4 text-xl font-bold text-neutral-900 sm:text-2xl">
                Your wishlist is empty
              </h2>
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
      ) : (
        <section className="w-full bg-white py-8 sm:py-10 md:py-12">
          <Container>
            <div className="mb-6 flex items-center justify-end sm:mb-8">
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
      )}
    </div>
  );
}
