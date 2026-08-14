import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "./website/components/common/Toast";
import { CartProvider } from "./website/context/CartContext";
import { WishlistProvider } from "./website/context/WishlistContext";
import WebsiteRoutes from "./website/routes/WebsiteRoutes";

export default function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <WishlistProvider>
          <BrowserRouter>
            <WebsiteRoutes />
          </BrowserRouter>
        </WishlistProvider>
      </CartProvider>
    </ToastProvider>
  );
}
