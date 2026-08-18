import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ToastProvider } from "./website/components/common/Toast";
import WebsiteRoutes from "./website/routes/WebsiteRoutes";

export default function App() {
  return (
    <Provider store={store}>
      <ToastProvider>
        <BrowserRouter>
          <WebsiteRoutes />
        </BrowserRouter>
      </ToastProvider>
    </Provider>
  );
}
