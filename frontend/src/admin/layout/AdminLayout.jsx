import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/admin/login");
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#fbf9f5] text-stone-800 antialiased selection:bg-amber-900 selection:text-white">
      <Sidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        handleLogout={handleLogout}
      />
      <div className="flex flex-1 flex-col min-w-0 overflow-y-auto overflow-x-hidden bg-[#fbf9f5]">
        <Header setIsOpen={setSidebarOpen} />
        <main className="flex-1 w-full min-w-0 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}



