import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ToastProvider } from "./website/components/common/Toast";
import WebsiteRoutes from "./website/routes/WebsiteRoutes";
import AdminRoutes from "./admin/routes/AdminRoutes";

export default function App() {
  return (
    <Provider store={store}>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            {/* 1. Customer Website Routes */}
            <Route path="/*" element={<WebsiteRoutes />} />
            {/* 2. Admin Panel Routes */}
            <Route path="/admin/*" element={<AdminRoutes />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </Provider>
  );
}
