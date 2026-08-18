import { Outlet } from "react-router-dom";
import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";
import FloatingSocialMenu from "../components/common/FloatingSocialMenu";
export default function MainLayout() {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <FloatingSocialMenu/>
    </div>
  );
}
