import { Link } from "react-router-dom";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useToast } from "./Toast";

function formatPrice(value) {
  return `₹${value.toLocaleString("en-IN")}`;
}

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product);
    showToast(`${product.name} added to cart`);
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
    showToast(
      inWishlist ? `${product.name} removed from wishlist` : `${product.name} added to wishlist`
    );
  };

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white transition-shadow duration-300 hover:shadow-xl">
      <Link to={product.href} className="relative block aspect-square w-full overflow-hidden bg-neutral-50">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {discountPercent && (
          <span className="absolute left-2 top-2 rounded bg-[#5c1f1f] px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white sm:left-3 sm:top-3 sm:px-2.5 sm:text-xs">
            {discountPercent}% Off
          </span>
        )}

        <button
          type="button"
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          onClick={(e) => {
            e.preventDefault();
            handleToggleWishlist();
          }}
          className={`absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full shadow-sm transition-colors duration-200 sm:right-3 sm:top-3 ${
            inWishlist ? "bg-[#5c1f1f] text-white" : "bg-white/90 text-neutral-700 hover:text-amber-800"
          }`}
        >
          <Heart className="h-4 w-4" strokeWidth={1.75} fill={inWishlist ? "currentColor" : "none"} />
        </button>
      </Link>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <Link to={product.href}>
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-neutral-900 transition-colors duration-200 hover:text-amber-900 sm:text-base">
            {product.name}
          </h3>
        </Link>

        <div className="mt-1.5 flex items-center gap-1 sm:mt-2">
          <Star className="h-3.5 w-3.5 text-amber-500 sm:h-4 sm:w-4" fill="currentColor" strokeWidth={0} />
          <span className="text-xs font-medium text-neutral-700 sm:text-sm">{product.rating}</span>
          <span className="text-xs text-neutral-400">({product.reviews})</span>
        </div>

        <div className="mt-2 flex flex-wrap items-baseline gap-x-2 sm:mt-3">
          <span className="text-sm font-bold text-neutral-900 sm:text-base">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-neutral-400 line-through sm:text-sm">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          className="mt-3 flex w-full items-center justify-center gap-2 bg-[#5c1f1f] px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-[#732929] sm:mt-4 sm:py-3 sm:text-sm"
        >
          <ShoppingCart className="h-4 w-4" strokeWidth={1.75} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
