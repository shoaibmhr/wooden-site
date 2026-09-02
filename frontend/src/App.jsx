import { BrowserRouter, Routes, Route } from "react-router-dom";
import WebsiteRoutes from "./website/routes/WebsiteRoutes";
import { DarkModeProvider } from './website/components/context/DarkModeContext';

export default function App() {
  return (
    <DarkModeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<WebsiteRoutes />} />
        </Routes>
      </BrowserRouter>
    </DarkModeProvider>
  );
}