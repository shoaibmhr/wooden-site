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

      {/* Bottom-left, slides in from the left */}
      <div
        className={`pointer-events-none fixed bottom-6 left-4 z-[200] flex justify-start transition-all duration-300 sm:left-6 ${
          toast ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
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

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");
  return context;
}
