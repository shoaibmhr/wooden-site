import { Outlet } from "react-router-dom";
import Navbar from "../components/home/Navbar";

export default function MainLayout() {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
      {/* Footer yahan future mein aayega */}
    </div>
  );
}
