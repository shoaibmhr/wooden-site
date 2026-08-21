import { BrowserRouter, Routes, Route } from "react-router-dom";
import WebsiteRoutes from "./website/routes/WebsiteRoutes";

export default function App() {
  return (
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<WebsiteRoutes />} />
          </Routes>
        </BrowserRouter>
  );
}
