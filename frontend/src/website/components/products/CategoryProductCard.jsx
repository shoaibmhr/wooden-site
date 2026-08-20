import { Link } from "react-router-dom";
import { Star, Heart, ShoppingCart, ArrowRight } from "lucide-react";
import { useCart, useWishlist } from "../../../store/hooks";
import { useToast } from "../common/Toast";

function formatPrice(value) {
  return `PKR ${Number(value).toLogicaleString("en-PK")}`;
}

export default function CategoryProductCard({ product }) {
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  const discountPercent = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : null;

  const inWishlist = isInWishlist(product.id);
  const inCart = isInCart(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (inCart) {
      showToast(`${product.name} is already in your cart`);
      return;
    }
    addToCart(product);
    showToast(`${product.name} added to cart!`);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    showToast(
      inWishlist
        ? `${product.name} removed from wishlist`
        : `${product.name} added to wishlist ❤️`,
    );
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-amber-900/10 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-amber-900/25 hover:shadow-2xl">
     
      <Link
        to={product.href}
        className="relative block aspect-[4/3] w-full overflow-hidden bg-neutral-100"
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
        />

       
        {discountPercent && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-[#5c1f1f] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-md">
            {discountPercent}% OFF
          </span>
        )}

        {/* Top-Right: Wishlist Heart Button */}
        <button
          type="button"
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          onClick={handleToggleWishlist}
          className={`absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full shadow-md backdrop-blur-md transition-all duration-300 active:scale-90 ${
            inWishlist
              ? "bg-[#5c1f1f] text-white ring-2 ring-white"
              : "bg-white/90 text-neutral-700 hover:bg-[#5c1f1f] hover:text-white"
          }`}
        >
          <Heart
            className="h-4 w-4 transition-transform duration-200 group-hover:scale-110"
            strokeWidth={2}
            fill={inWishlist ? "currentColor" : "none"}
          />
        </button>

        {/* Quick View Overlay Bar on hover */}
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-center bg-gradient-to-t from-black/60 via-black/20 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-white drop-shadow">
            View Details <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </Link>

      {/* Product Information */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-bold uppercase tracking-widest text-amber-800">
            {product.category}
          </span>
          <div className="flex items-center gap-1">
            <Star
              className="h-3.5 w-3.5 text-amber-500"
              fill="currentColor"
              strokeWidth={0}
            />
            <span className="text-xs font-semibold text-neutral-800">
              {product.rating}
            </span>
            <span className="text-[11px] text-neutral-400">
              ({product.reviews})
            </span>
          </div>
        </div>

        {/* Product Title */}
        <Link to={product.href} className="mt-2 block">
          <h3 className="line-clamp-1 text-base font-bold text-neutral-900 transition-colors duration-200 hover:text-amber-900 sm:text-lg">
            {product.name}
          </h3>
        </Link>

        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-neutral-500">
          {product.description}
        </p>

        {/* Price Section */}
        <div className="mt-4 flex items-baseline gap-2 border-t border-neutral-100 pt-3">
          <span className="text-lg font-extrabold text-neutral-900 sm:text-xl">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs font-medium text-neutral-400 line-through sm:text-sm">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Action Buttons: Add to Cart & View */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleAddToCart}
            className={`flex items-center justify-center gap-1.5 rounded-lg border py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
              inCart
                ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                : "border-neutral-300 bg-white text-neutral-800 hover:border-[#5c1f1f] hover:bg-neutral-50"
            }`}
          >
            <ShoppingCart className="h-3.5 w-3.5" strokeWidth={2} />
            {inCart ? "In Cart" : "Add Cart"}
          </button>

          <Link
            to={product.href}
            className="flex items-center justify-center rounded-lg bg-[#5c1f1f] py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition-all duration-300 hover:bg-[#732929] hover:shadow-md"
          >
            Order Now
          </Link>
        </div>
      </div>
    </div>
  );
}
