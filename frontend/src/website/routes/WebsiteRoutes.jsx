import { Routes, Route } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import CategoryPage from "../pages/CategoryPage";
import Wishlist from "../pages/Wishlist";
import Services from "../pages/Services";
import Contact from "../pages/Contact";
import Gallery from "../pages/Gallery";
import Faq from "../pages/Faq";
import NotFound from "../pages/NotFound";
import Checkout from "../pages/Checkout";
import TrackOrder from "../pages/TrackOrder";
import ScrollToTop from "../components/common/ScrollToTop";

export default function WebsiteRoutes() {
  return (
    <>
    <ScrollToTop/>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/category/:categorySlug" element={<CategoryPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/faqs" element={<Faq />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
