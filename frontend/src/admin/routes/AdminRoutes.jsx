import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AdminLogin from "../pages/AdminLogin";
import AdminLayout from "../layout/AdminLayout";
import AdminDashboard from "../pages/AdminDashboard";
import AdminProducts from "../pages/AdminProducts";
import AdminOrders from "../pages/AdminOrders";
import AdminUsers from "../pages/AdminUsers";
import AdminInquiries from "../pages/AdminInquiries";
import AdminSettings from "../pages/AdminSettings";
import AdminCategories from "../pages/AdminCategories";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="messages" element={<AdminInquiries />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="categories" element={<AdminCategories />} />
        </Route>
      </Route>
    </Routes>
  );
}

