import { AlertTriangle, X } from "lucide-react";

export default function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  isDangerous = true,
  isProcessing = false,
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-stone-950/50 p-4 backdrop-blur-xs transition-opacity">
      <div className="w-full max-w-sm rounded-3xl border border-stone-200 bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-xl ${
              isDangerous
                ? "bg-rose-50 text-rose-600"
                : "bg-amber-50 text-amber-800"
            }`}
          >
            <AlertTriangle className="h-5 w-5" />
          </div>

          <button
            onClick={onCancel}
            className="rounded-xl p-1.5 text-stone-400 hover:bg-stone-100 hover:text-stone-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <h2 className="mt-4 text-sm font-bold text-stone-900">{title}</h2>
        <p className="mt-1.5 text-xs leading-relaxed text-stone-500">
          {message}
        </p>

        <div className="mt-6 flex justify-end gap-2.5">
          <button
            type="button"
            onClick={onCancel}
            disabled={isProcessing}
            className="rounded-xl px-4 py-2.5 text-xs font-semibold text-stone-600 hover:bg-stone-100 hover:text-stone-800 transition-colors disabled:opacity-50"
          >
            {cancelLabel}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isProcessing}
            className={`rounded-xl px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-xs transition-all disabled:opacity-50 ${
              isDangerous
                ? "bg-rose-600 hover:bg-rose-700"
                : "bg-amber-900 hover:bg-amber-950"
            }`}
          >
            {isProcessing ? "Please wait..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
