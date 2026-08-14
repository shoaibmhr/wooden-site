import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
} from "react";
import { CheckCircle2 } from "lucide-react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);
  const timerRef = useRef(null);

  const showToast = useCallback((message) => {
    setToast(message);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setToast(null), 2200);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <div
        className={`pointer-events-none fixed inset-x-0 bottom-6 z-[200] flex justify-center transition-all duration-300 sm:bottom-8 ${
          toast ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
      >
        {toast && (
          <div className="pointer-events-auto flex items-center gap-2 rounded-full bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white shadow-lg sm:px-5">
            <CheckCircle2 className="h-4 w-4 text-amber-400" strokeWidth={2} />
            {toast}
          </div>
        )}
      </div>
    </ToastContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");
  return context;
}
