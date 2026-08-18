import { useEffect, useState } from "react";
import {
  X,
  Plus,
  Image as ImageIcon,
  Tag,
  DollarSign,
  FileText,
  FolderTree,
} from "lucide-react";
import { createProduct, fetchAdminCategories } from "../../services/api";

const initialFormData = {
  name: "",
  category_id: "",
  price: "",
  original_price: "",
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-stone-800 bg-[#262220] p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-stone-800 pb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-stone-100">
            Add New Product
          </h2>

          <button
            onClick={handleClose}
            className="rounded-lg p-1 text-stone-400 hover:bg-stone-800 hover:text-stone-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {errorMsg && (
          <div className="mt-4 rounded-lg border border-rose-900/50 bg-rose-950/40 p-3 text-xs text-rose-300">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-medium text-stone-400">
              Product Name *
            </label>

            <div className="relative mt-1">
              <Tag className="absolute left-3 top-3 h-4 w-4 text-stone-500" />
              <input
                type="text"
                name="name"
                required
                minLength="2"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Wooden Dining Table"
                className="w-full rounded-lg border border-stone-700 bg-stone-900 py-2 pl-9 pr-3 text-xs text-stone-100 placeholder-stone-600 focus:border-[#5c1f1f] focus:outline-none"
              />
            </div>

            {formData.name && (
              <p className="mt-1 text-[10px] text-stone-500">
                Slug: {createSlug(formData.name)}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-400">
              Category *
            </label>

            <div className="relative mt-1">
              <FolderTree className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-stone-500" />

              <select
                name="category_id"
                required
                value={formData.category_id}
                onChange={handleChange}
                disabled={categories.length === 0}
                className="w-full appearance-none rounded-lg border border-stone-700 bg-stone-900 py-2 pl-9 pr-3 text-xs text-stone-100 focus:border-[#5c1f1f] focus:outline-none disabled:opacity-50"
              >
                <option value="">
                  {categories.length === 0
                    ? "Loading categories..."
                    : "Select a category"}
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
              <label className="block text-xs font-medium text-stone-400">
                Price (PKR) *
              </label>

              <div className="relative mt-1">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-stone-500" />
                <input
                  type="number"
                  name="price"
                  required
                  min="1"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="25000"
                  className="w-full rounded-lg border border-stone-700 bg-stone-900 py-2 pl-9 pr-3 text-xs text-stone-100 placeholder-stone-600 focus:border-[#5c1f1f] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-400">
                Original Price
              </label>

              <div className="relative mt-1">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-stone-500" />
                <input
                  type="number"
                  name="original_price"
                  min="1"
                  step="0.01"
                  value={formData.original_price}
                  onChange={handleChange}
                  placeholder="Optional"
                  className="w-full rounded-lg border border-stone-700 bg-stone-900 py-2 pl-9 pr-3 text-xs text-stone-100 placeholder-stone-600 focus:border-[#5c1f1f] focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-400">
              Primary Image URL *
            </label>

            <div className="relative mt-1">
              <ImageIcon className="absolute left-3 top-3 h-4 w-4 text-stone-500" />
              <input
                type="url"
                name="primary_image_url"
                required
                value={formData.primary_image_url}
                onChange={handleChange}
                placeholder="https://example.com/product.jpg"
                className="w-full rounded-lg border border-stone-700 bg-stone-900 py-2 pl-9 pr-3 text-xs text-stone-100 placeholder-stone-600 focus:border-[#5c1f1f] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-400">
              Description *
            </label>

            <div className="relative mt-1">
              <FileText className="absolute left-3 top-3 h-4 w-4 text-stone-500" />
              <textarea
                name="description"
                required
                minLength="10"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write at least 10 characters about this product..."
                className="w-full rounded-lg border border-stone-700 bg-stone-900 py-2 pl-9 pr-3 text-xs text-stone-100 placeholder-stone-600 focus:border-[#5c1f1f] focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 border-t border-stone-800 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-lg px-4 py-2 text-xs font-medium text-stone-400 hover:bg-stone-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting || categories.length === 0}
              className="flex items-center gap-1.5 rounded-lg bg-[#5c1f1f] px-4 py-2 text-xs font-semibold text-white hover:bg-[#732929] disabled:opacity-50"
            >
              <Plus className="h-4 w-4" />
              {isSubmitting ? "Creating..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
