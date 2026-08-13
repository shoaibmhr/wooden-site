import { BrowserRouter } from "react-router-dom";
import WebsiteRoutes from "./website/routes/WebsiteRoutes";

export default function App() {
  return (
    <BrowserRouter>
      <WebsiteRoutes />
    </BrowserRouter>
  );
}
