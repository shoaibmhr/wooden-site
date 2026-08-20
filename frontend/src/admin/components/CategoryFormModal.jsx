import { useState } from "react";
import {
  X,
  Plus,
  Image as ImageIcon,
  Tag,
  FileText,
  Sparkles,
  FolderTree,
} from "lucide-react";
import { createCategory, updateCategory } from "../../services/api";

function createSlug(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function CategoryFormModal({
  isOpen,
  onClose,
  onSaved,
  editingCategory,
}) {
  const isEditMode = Boolean(editingCategory);

  const [formData, setFormData] = useState(() => ({
    name: editingCategory?.name || "",
    description: editingCategory?.description || "",
    image_url: editingCategory?.image_url || "",
  }));
  const [uploadMode, setUploadMode] = useState("url");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((current) => ({
        ...current,
        image_url: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleClose = () => {
    setErrorMsg("");
    onClose();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const slug = createSlug(formData.name);

    if (!slug) {
      setErrorMsg("Please enter a valid category name.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const payload = {
        name: formData.name.trim(),
        slug,
        description: formData.description.trim(),
        image_url: formData.image_url.trim(),
      };

      const savedCategory = isEditMode
        ? await updateCategory(editingCategory.id, payload)
        : await createCategory(payload);

      onSaved(savedCategory, isEditMode);
      onClose();
    } catch (err) {
      setErrorMsg(err.message || "Failed to save category");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/50 p-4 backdrop-blur-xs transition-opacity">
      <div className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-stone-200 bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-stone-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-900 text-amber-300">
              <FolderTree className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-stone-900">
                {isEditMode ? "Edit Category" : "Add New Category"}
              </h2>
              <p className="text-[11px] text-stone-500">
                {isEditMode
                  ? "Update this category's details"
                  : "Create a new product category"}
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="rounded-xl p-1.5 text-stone-400 hover:bg-stone-100 hover:text-stone-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {errorMsg && (
          <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-xs font-semibold text-rose-700">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700">
              Category Name *
            </label>

            <div className="relative mt-1.5">
              <Tag className="absolute left-3.5 top-3 h-4 w-4 text-stone-400" />
              <input
                type="text"
                name="name"
                required
                minLength="2"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Wooden Toys"
                className="w-full rounded-xl border border-stone-300 bg-stone-50/60 py-2.5 pl-10 pr-3.5 text-xs text-stone-900 placeholder-stone-400 focus:bg-white focus:border-amber-800 focus:ring-2 focus:ring-amber-800/10 outline-none transition-all"
              />
            </div>

            {formData.name && (
              <p className="mt-1 text-[10px] text-stone-500 font-mono">
                Live URL Slug:{" "}
                <span className="text-amber-800 font-semibold">
                  /{createSlug(formData.name)}
                </span>
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700">
              Description
            </label>

            <div className="relative mt-1.5">
              <FileText className="absolute left-3.5 top-3 h-4 w-4 text-stone-400" />
              <textarea
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                placeholder="Short description of this category..."
                className="w-full rounded-xl border border-stone-300 bg-stone-50/60 py-2.5 pl-10 pr-3.5 text-xs text-stone-900 placeholder-stone-400 focus:bg-white focus:border-amber-800 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700">
              Category Image
            </label>

            <div className="mt-1.5 flex gap-2">
              <button
                type="button"
                onClick={() => setUploadMode("url")}
                className={`flex-1 rounded-xl border py-2 text-xs font-semibold transition-all ${
                  uploadMode === "url"
                    ? "border-amber-800 bg-amber-50 text-amber-900"
                    : "border-stone-300 bg-stone-50/60 text-stone-500"
                }`}
              >
                Image URL
              </button>
              <button
                type="button"
                onClick={() => setUploadMode("file")}
                className={`flex-1 rounded-xl border py-2 text-xs font-semibold transition-all ${
                  uploadMode === "file"
                    ? "border-amber-800 bg-amber-50 text-amber-900"
                    : "border-stone-300 bg-stone-50/60 text-stone-500"
                }`}
              >
                Upload from Device
              </button>
            </div>

            {uploadMode === "url" ? (
              <div className="relative mt-2.5">
                <ImageIcon className="absolute left-3.5 top-3 h-4 w-4 text-stone-400" />
                <input
                  type="url"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleChange}
                  placeholder="https://example.com/category-image.jpg"
                  className="w-full rounded-xl border border-stone-300 bg-stone-50/60 py-2.5 pl-10 pr-3.5 text-xs text-stone-900 placeholder-stone-400 focus:bg-white focus:border-amber-800 outline-none transition-all"
                />
              </div>
            ) : (
              <div className="relative mt-2.5">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full rounded-xl border border-stone-300 bg-stone-50/60 py-2.5 px-3.5 text-xs text-stone-900 file:mr-3 file:rounded-lg file:border-0 file:bg-amber-900 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white outline-none transition-all"
                />
              </div>
            )}

            {formData.image_url && (
              <div className="mt-2.5 flex items-center gap-3 rounded-xl border border-stone-200 bg-[#faf6ee] p-2.5">
                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-stone-200 bg-white">
                  <img
                    src={formData.image_url}
                    alt="Preview"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
                <div className="text-[11px] text-stone-600 truncate">
                  <span className="font-bold text-amber-900 flex items-center gap-1">
                    <Sparkles className="h-3 w-3 text-amber-700" /> Live Preview
                  </span>
                  <span className="truncate block opacity-80">
                    {uploadMode === "file"
                      ? "Selected from device"
                      : formData.image_url}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2.5 border-t border-stone-100 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl px-5 py-2.5 text-xs font-semibold text-stone-600 hover:bg-stone-100 hover:text-stone-800 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 rounded-xl bg-amber-900 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-xs transition-all hover:bg-amber-950 disabled:opacity-50"
            >
              <Plus className="h-4 w-4" strokeWidth={2.5} />
              <span>
                {isSubmitting
                  ? "Saving..."
                  : isEditMode
                    ? "Update Category"
                    : "Save Category"}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
