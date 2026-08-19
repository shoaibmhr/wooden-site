import { useEffect, useState, useMemo } from "react";
import {
  Plus,
  Trash2,
  Package,
  Save,
  Search,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  SlidersHorizontal,
} from "lucide-react";
import {
  fetchProducts,
  deleteProduct,
  updateProduct,
} from "../../services/api";
import AddProductModal from "../components/AddProductModal";

function formatPrice(value) {
  return `PKR ${Number(value || 0).toLocaleString("en-PK")}`;
}

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const [savedSuccessId, setSavedSuccessId] = useState(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [stockFilter, setStockFilter] = useState("all"); // all, in_stock, low_stock, out_of_stock

  useEffect(() => {
    let isMounted = true;

    fetchProducts()
      .then((data) => {
        if (isMounted) {
          setProducts(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error("Fetch products error:", err);
          setError("Failed to load products from database");
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await deleteProduct(id);
        setProducts((prev) => prev.filter((p) => p.id !== id));
      } catch (err) {
        console.error("Delete product error:", err);
        alert(err.message || "Failed to delete product");
      }
    }
  };

  const handleProductAdded = (newProduct) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  const updateProductInState = (updatedProduct) => {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product,
      ),
    );
  };

  const handleStockChange = (productId, value) => {
    const stockQuantity = Math.max(0, Number(value) || 0);

    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === productId
          ? { ...product, stock_quantity: stockQuantity }
          : product,
      ),
    );
  };

  const saveStock = async (product) => {
    try {
      setUpdatingId(product.id);
      const updatedProduct = await updateProduct(product.id, {
        stock_quantity: product.stock_quantity,
      });
      updateProductInState(updatedProduct);
      setSavedSuccessId(product.id);
      setTimeout(() => setSavedSuccessId(null), 2000);
    } catch (err) {
      alert(err.message || "Failed to update stock");
    } finally {
      setUpdatingId(null);
    }
  };

  // Distinct categories list for filter
  const categoriesList = useMemo(() => {
    const set = new Set();
    products.forEach((p) => {
      if (p.category?.name) set.add(p.category.name);
    });
    return Array.from(set);
  }, [products]);

  // Filtered Products Memo
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // 1. Search Query Match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchName = item.name.toLowerCase().includes(query);
        const matchSlug = (item.slug || "").toLowerCase().includes(query);
        const matchCat = (item.category?.name || "").toLowerCase().includes(query);
        if (!matchName && !matchSlug && !matchCat) return false;
      }

      // 2. Category Match
      if (selectedCategory !== "all") {
        if (item.category?.name !== selectedCategory) return false;
      }

      // 3. Stock Level Match
      if (stockFilter === "in_stock") {
        if (item.stock_quantity <= item.low_stock_threshold) return false;
      } else if (stockFilter === "low_stock") {
        if (item.stock_quantity === 0 || item.stock_quantity > item.low_stock_threshold) {
          return false;
        }
      } else if (stockFilter === "out_of_stock") {
        if (item.stock_quantity !== 0) return false;
      }

      return true;
    });
  }, [products, searchQuery, selectedCategory, stockFilter]);

  return (
    <div className="space-y-6 min-w-0">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-stone-200 pb-5">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-stone-900 sm:text-2xl">
            Product Management
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-stone-500">
            Catalog of handcrafted wooden items with inventory tracking and pricing controls.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-900 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-xs transition-all hover:bg-amber-950 active:scale-95"
        >
          <Plus className="h-4 w-4" strokeWidth={2.5} />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter & Search Bar Controls */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 bg-white p-4 rounded-2xl border border-stone-200/90 shadow-xs">
        {/* Search Input */}
        <div className="relative lg:col-span-2">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-stone-400" />
          <input
            type="text"
            placeholder="Search by product name, category, or slug..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-stone-300 bg-stone-50/60 py-2.5 pl-10 pr-3.5 text-xs text-stone-900 placeholder-stone-400 outline-none focus:bg-white focus:border-amber-800 focus:ring-2 focus:ring-amber-800/10 transition-all"
          />
        </div>

        {/* Category Dropdown */}
        <div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full rounded-xl border border-stone-300 bg-stone-50/60 py-2.5 px-3 text-xs text-stone-800 outline-none focus:bg-white focus:border-amber-800 transition-all"
          >
            <option value="all">All Categories ({categoriesList.length})</option>
            {categoriesList.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Stock Filter Dropdown */}
        <div>
          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            className="w-full rounded-xl border border-stone-300 bg-stone-50/60 py-2.5 px-3 text-xs text-stone-800 outline-none focus:bg-white focus:border-amber-800 transition-all"
          >
            <option value="all">All Stock Statuses</option>
            <option value="in_stock">In Stock Only</option>
            <option value="low_stock">Low Stock Warning</option>
            <option value="out_of_stock">Out of Stock Only</option>
          </select>
        </div>
      </div>

      {/* Results Header Count */}
      <div className="flex items-center justify-between px-1">
        <p className="text-xs font-semibold text-stone-500">
          Showing <span className="text-amber-900 font-bold">{filteredProducts.length}</span> of{" "}
          <span className="text-stone-800 font-bold">{products.length}</span> total products
        </p>
        {(searchQuery || selectedCategory !== "all" || stockFilter !== "all") && (
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
              setStockFilter("all");
            }}
            className="text-xs font-semibold text-amber-800 underline hover:text-amber-950"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Main Table Content */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-16 rounded-2xl border border-stone-200 bg-white shadow-xs">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-amber-800 border-t-transparent" />
          <p className="mt-3 text-xs text-stone-500">Loading product inventory...</p>
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-700 text-center">
          {error}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 rounded-2xl border border-dashed border-stone-300 bg-white text-center shadow-xs">
          <Package className="h-12 w-12 text-stone-300 mb-3" />
          <h3 className="text-sm font-bold text-stone-800">No products found</h3>
          <p className="text-xs text-stone-500 mt-1 max-w-sm">
            {products.length === 0
              ? "Your inventory is currently empty. Click 'Add New Product' above."
              : "No products matched your search or filters."}
          </p>
        </div>
      ) : (
        <div className="w-full min-w-0 overflow-hidden rounded-2xl border border-stone-200/90 bg-white shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-xs text-stone-700">
              <thead className="border-b border-stone-200 bg-stone-50/80 uppercase text-[11px] font-semibold tracking-wider text-stone-500">
                <tr>
                  <th className="px-4 py-3.5">Product</th>
                  <th className="px-4 py-3.5">Category</th>
                  <th className="px-4 py-3.5">Price</th>
                  <th className="px-4 py-3.5">Stock Qty</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-4 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredProducts.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-[#faf7f2] transition-colors group"
                  >
                    {/* Product Name & Image */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-stone-200 bg-stone-100">
                          {item.primary_image_url ? (
                            <img
                              src={item.primary_image_url}
                              alt={item.name}
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                e.target.src = "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=300&q=80";
                              }}
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-stone-400">
                              <Package className="h-5 w-5" />
                            </div>
                          )}
                        </div>

                        <div className="min-w-0 max-w-xs">
                          <p className="font-bold text-stone-900 group-hover:text-amber-900 transition-colors truncate">
                            {item.name}
                          </p>
                          <p className="text-[10px] text-stone-400 font-mono truncate">
                            /{item.slug}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-4 py-3.5">
                      <span className="inline-block rounded-md bg-[#faf6ee] border border-amber-900/10 px-2.5 py-1 text-[11px] font-semibold text-amber-900">
                        {item.category?.name || "Uncategorized"}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="px-4 py-3.5 font-bold text-amber-900 text-sm">
                      {formatPrice(item.price)}
                    </td>

                    {/* Inline Stock Quantity Editor */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="0"
                          value={item.stock_quantity}
                          onChange={(event) =>
                            handleStockChange(item.id, event.target.value)
                          }
                          className="w-16 rounded-lg border border-stone-300 bg-stone-50/80 px-2.5 py-1.5 text-xs font-semibold text-stone-900 outline-none focus:bg-white focus:border-amber-800 focus:ring-1 focus:ring-amber-800/20"
                        />
                        <button
                          onClick={() => saveStock(item)}
                          disabled={updatingId === item.id}
                          title="Save stock level"
                          className="rounded-lg p-1.5 text-amber-900 hover:bg-amber-100/60 transition-colors disabled:opacity-50"
                        >
                          {savedSuccessId === item.id ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                          ) : (
                            <Save className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                          !item.is_active
                            ? "bg-stone-100 text-stone-600 border border-stone-200"
                            : item.stock_quantity === 0
                              ? "bg-rose-50 text-rose-700 border border-rose-200"
                              : item.stock_quantity <= item.low_stock_threshold
                                ? "bg-amber-50 text-amber-800 border border-amber-200"
                                : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        }`}
                      >
                        {!item.is_active
                          ? "Inactive"
                          : item.stock_quantity === 0
                            ? "Out of stock"
                            : item.stock_quantity <= item.low_stock_threshold
                              ? "Low stock"
                              : "In stock"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={`/products/${item.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          title="Preview in Store"
                          className="rounded-lg p-1.5 text-stone-400 hover:bg-amber-50 hover:text-amber-900 transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                        <button
                          onClick={() => handleDelete(item.id, item.name)}
                          title="Delete Product"
                          className="rounded-lg p-1.5 text-stone-400 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onProductAdded={handleProductAdded}
      />
    </div>
  );
}

