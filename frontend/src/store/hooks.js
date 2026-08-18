import { useDispatch, useSelector } from "react-redux";
import {
  addToCart as addToCartAction,
  removeFromCart as removeFromCartAction,
  updateQuantity as updateQuantityAction,
  clearCart as clearCartAction,
} from "./slices/cartSlice";
import { toggleWishlist as toggleWishlistAction } from "./slices/wishlistSlice";

export function useCart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const addToCart = (product) => dispatch(addToCartAction(product));

  const removeFromCart = (id) => dispatch(removeFromCartAction(id));

  const updateQuantity = (id, quantity) =>
    dispatch(updateQuantityAction({ id, quantity }));

  const clearCart = () => dispatch(clearCartAction());

  const isInCart = (id) => cartItems.some((item) => item.id === id);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    cartCount,
    cartTotal,
  };
}

export function useWishlist() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const toggleWishlist = (product) => dispatch(toggleWishlistAction(product));

  const isInWishlist = (id) => wishlistItems.some((item) => item.id === id);

  const wishlistCount = wishlistItems.length;

  return {
    wishlistItems,
    toggleWishlist,
    isInWishlist,
    wishlistCount,
  };
}
