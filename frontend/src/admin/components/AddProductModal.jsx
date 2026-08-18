import { useState } from "react";
import { X, Plus, Image, Tag, DollarSign, FileText } from "lucide-react";
import { createProduct } from "../../services/api";

export default function AddProductModal({ isOpen, onClose, onProductAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    image_url: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
      };
      const newProduct = await createProduct(payload);
      onProductAdded(newProduct);
      onClose();
      setFormData({
        name: "",
        category: "",
        price: "",
        description: "",
        image_url: "",
      });
    } catch (err) {
      console.error("Create product error:", err);
      setErrorMsg(err.message || "Failed to create product");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-stone-800 bg-[#262220] p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-stone-800 pb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-stone-100">
            Add New Product
          </h2>
          <button
            onClick={onClose}
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
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Wooden Dining Table"
                className="w-full rounded-lg border border-stone-700 bg-stone-900 py-2 pl-9 pr-3 text-xs text-stone-100 placeholder-stone-600 focus:border-[#5c1f1f] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-stone-400">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g. Furniture"
                className="mt-1 w-full rounded-lg border border-stone-700 bg-stone-900 py-2 px-3 text-xs text-stone-100 placeholder-stone-600 focus:border-[#5c1f1f] focus:outline-none"
              />
            </div>

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
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="25000"
                  className="w-full rounded-lg border border-stone-700 bg-stone-900 py-2 pl-9 pr-3 text-xs text-stone-100 placeholder-stone-600 focus:border-[#5c1f1f] focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-400">
              Image URL
            </label>
            <div className="relative mt-1">
              <Image className="absolute left-3 top-3 h-4 w-4 text-stone-500" />
              <input
                type="url"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full rounded-lg border border-stone-700 bg-stone-900 py-2 pl-9 pr-3 text-xs text-stone-100 placeholder-stone-600 focus:border-[#5c1f1f] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-400">
              Description
            </label>
            <div className="relative mt-1">
              <FileText className="absolute left-3 top-3 h-4 w-4 text-stone-500" />
              <textarea
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                placeholder="Product details..."
                className="w-full rounded-lg border border-stone-700 bg-stone-900 py-2 pl-9 pr-3 text-xs text-stone-100 placeholder-stone-600 focus:border-[#5c1f1f] focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 border-t border-stone-800 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-xs font-medium text-stone-400 hover:bg-stone-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
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
