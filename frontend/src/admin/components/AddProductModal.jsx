import { useEffect, useState } from "react";
import {
  X,
  Plus,
  Image as ImageIcon,
  Tag,
  DollarSign,
  FileText,
  FolderTree,
  Sparkles,
  Package,
} from "lucide-react";
import { createProduct, fetchAdminCategories } from "../../services/api";

const initialFormData = {
  name: "",
  category_id: "",
  price: "",
  original_price: "",
  stock_quantity: "10",
  low_stock_threshold: "3",
  primary_image_url: "",
  description: "",
};

function createSlug(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function AddProductModal({ isOpen, onClose, onProductAdded }) {
  const [formData, setFormData] = useState(initialFormData);
  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    fetchAdminCategories()
      .then((data) => {
        setCategories(data.filter((category) => category.is_active));
      })
      .catch((err) => {
        setErrorMsg(err.message || "Failed to load product categories");
      });
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleClose = () => {
    setFormData(initialFormData);
    setErrorMsg("");
    onClose();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const slug = createSlug(formData.name);

    if (!slug) {
      setErrorMsg("Please enter a valid product name.");
      return;
    }

    if (!formData.category_id) {
      setErrorMsg("Please select a category.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const payload = {
        name: formData.name.trim(),
        slug,
        category_id: Number(formData.category_id),
        description: formData.description.trim(),
        price: Number(formData.price),
        original_price: formData.original_price
          ? Number(formData.original_price)
          : null,
        stock_quantity: Number(formData.stock_quantity),
        low_stock_threshold: Number(formData.low_stock_threshold),
        primary_image_url: formData.primary_image_url.trim(),
        rating: 0,
        review_count: 0,
        is_active: true,
        images: [],
      };

      const newProduct = await createProduct(payload);

      onProductAdded(newProduct);
      setFormData(initialFormData);
      onClose();
    } catch (err) {
      setErrorMsg(err.message || "Failed to create product");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md transition-opacity">
      <div className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-stone-800/90 bg-[#1e1a18] p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-stone-800/80 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#5c1f1f] text-amber-300">
              <Package className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-stone-100">
                Add New Handcrafted Product
              </h2>
              <p className="text-[11px] text-stone-400">
                Publish a new item to the WoodenSite catalog
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="rounded-xl p-1.5 text-stone-400 hover:bg-stone-800 hover:text-stone-200 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {errorMsg && (
          <div className="mt-4 rounded-xl border border-rose-900/60 bg-rose-950/50 p-3.5 text-xs text-rose-300">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-300">
              Product Title *
            </label>

            <div className="relative mt-1.5">
              <Tag className="absolute left-3.5 top-3 h-4 w-4 text-stone-500" />
              <input
                type="text"
                name="name"
                required
                minLength="2"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Royal Solid Sheesham Dining Table"
                className="w-full rounded-xl border border-stone-700/80 bg-stone-900/90 py-2.5 pl-10 pr-3.5 text-xs text-stone-100 placeholder-stone-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 outline-none"
              />
            </div>

            {formData.name && (
              <p className="mt-1 text-[10px] text-stone-400 font-mono">
                Live URL Slug: <span className="text-amber-400">/{createSlug(formData.name)}</span>
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-300">
              Category *
            </label>

            <div className="relative mt-1.5">
              <FolderTree className="pointer-events-none absolute left-3.5 top-3 h-4 w-4 text-stone-500" />

              <select
                name="category_id"
                required
                value={formData.category_id}
                onChange={handleChange}
                disabled={categories.length === 0}
                className="w-full appearance-none rounded-xl border border-stone-700/80 bg-stone-900/90 py-2.5 pl-10 pr-3.5 text-xs text-stone-100 focus:border-amber-500 outline-none disabled:opacity-50"
              >
                <option value="">
                  {categories.length === 0
                    ? "Loading categories..."
                    : "Select a Category"}
                </option>

                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-stone-300">
                Selling Price (PKR) *
              </label>

              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3.5 top-3 h-4 w-4 text-stone-500" />
                <input
                  type="number"
                  name="price"
                  required
                  min="1"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g. 45000"
                  className="w-full rounded-xl border border-stone-700/80 bg-stone-900/90 py-2.5 pl-10 pr-3.5 text-xs text-stone-100 placeholder-stone-500 focus:border-amber-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300">
                Original / Strike Price (PKR)
              </label>

              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3.5 top-3 h-4 w-4 text-stone-500" />
                <input
                  type="number"
                  name="original_price"
                  min="1"
                  step="0.01"
                  value={formData.original_price}
                  onChange={handleChange}
                  placeholder="Optional (for discount tag)"
                  className="w-full rounded-xl border border-stone-700/80 bg-stone-900/90 py-2.5 pl-10 pr-3.5 text-xs text-stone-100 placeholder-stone-500 focus:border-amber-500 outline-none"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-stone-300">
                Initial Stock Units *
              </label>
              <input
                type="number"
                name="stock_quantity"
                required
                min="0"
                value={formData.stock_quantity}
                onChange={handleChange}
                className="mt-1.5 w-full rounded-xl border border-stone-700/80 bg-stone-900/90 px-3.5 py-2.5 text-xs text-stone-100 focus:border-amber-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300">
                Low Stock Alert Limit
              </label>
              <input
                type="number"
                name="low_stock_threshold"
                required
                min="0"
                value={formData.low_stock_threshold}
                onChange={handleChange}
                className="mt-1.5 w-full rounded-xl border border-stone-700/80 bg-stone-900/90 px-3.5 py-2.5 text-xs text-stone-100 focus:border-amber-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-300">
              Primary Image URL *
            </label>

            <div className="relative mt-1.5">
              <ImageIcon className="absolute left-3.5 top-3 h-4 w-4 text-stone-500" />
              <input
                type="url"
                name="primary_image_url"
                required
                value={formData.primary_image_url}
                onChange={handleChange}
                placeholder="https://example.com/furniture-image.jpg"
                className="w-full rounded-xl border border-stone-700/80 bg-stone-900/90 py-2.5 pl-10 pr-3.5 text-xs text-stone-100 placeholder-stone-500 focus:border-amber-500 outline-none"
              />
            </div>

            {formData.primary_image_url && (
              <div className="mt-2.5 flex items-center gap-3 rounded-xl border border-stone-800 bg-stone-900/60 p-2">
                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-stone-700 bg-stone-950">
                  <img
                    src={formData.primary_image_url}
                    alt="Preview"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
                <div className="text-[11px] text-stone-400 truncate">
                  <span className="font-bold text-amber-400 flex items-center gap-1">
                    <Sparkles className="h-3 w-3" /> Live Image Preview
                  </span>
                  <span className="truncate block opacity-70">{formData.primary_image_url}</span>
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-300">
              Description & Specifications *
            </label>

            <div className="relative mt-1.5">
              <FileText className="absolute left-3.5 top-3 h-4 w-4 text-stone-500" />
              <textarea
                name="description"
                required
                minLength="10"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe wood type (Sheesham, Teak, Walnut), finish, warranty, and dimensions..."
                className="w-full rounded-xl border border-stone-700/80 bg-stone-900/90 py-2.5 pl-10 pr-3.5 text-xs text-stone-100 placeholder-stone-500 focus:border-amber-500 outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2.5 border-t border-stone-800/80 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl px-5 py-2.5 text-xs font-semibold text-stone-400 hover:bg-stone-800 hover:text-stone-200 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting || categories.length === 0}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#5c1f1f] to-[#732929] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:brightness-110 disabled:opacity-50"
            >
              <Plus className="h-4 w-4" strokeWidth={2.5} />
              <span>{isSubmitting ? "Creating..." : "Save & Publish Product"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
