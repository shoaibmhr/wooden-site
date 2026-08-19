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
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-stone-800/80 pb-5">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-wider text-stone-100 sm:text-2xl">
            Product Management
          </h1>
          <p className="mt-1 text-xs text-stone-400">
            Catalog of handcrafted wooden items with inventory tracking and pricing controls.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#5c1f1f] to-[#732929] px-5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg border border-amber-500/20 transition-all hover:brightness-110 active:scale-95"
        >
          <Plus className="h-4 w-4" strokeWidth={2.5} />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter & Search Bar Controls */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 bg-[#1e1a18] p-4 rounded-2xl border border-stone-800/80 shadow-md">
        {/* Search Input */}
        <div className="relative lg:col-span-2">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-stone-500" />
          <input
            type="text"
            placeholder="Search by product name, category, or slug..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-stone-700/80 bg-stone-900/90 py-2.5 pl-10 pr-3.5 text-xs text-stone-100 placeholder-stone-500 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30"
          />
        </div>

        {/* Category Dropdown */}
        <div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full rounded-xl border border-stone-700/80 bg-stone-900/90 py-2.5 px-3 text-xs text-stone-200 outline-none focus:border-amber-500"
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
            className="w-full rounded-xl border border-stone-700/80 bg-stone-900/90 py-2.5 px-3 text-xs text-stone-200 outline-none focus:border-amber-500"
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
        <p className="text-xs font-semibold text-stone-400">
          Showing <span className="text-amber-400 font-bold">{filteredProducts.length}</span> of{" "}
          <span className="text-stone-200 font-bold">{products.length}</span> total products
        </p>
        {(searchQuery || selectedCategory !== "all" || stockFilter !== "all") && (
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
              setStockFilter("all");
            }}
            className="text-xs text-amber-500 underline hover:text-amber-400"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Main Table Content */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-16 rounded-2xl border border-stone-800 bg-[#1e1a18]">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
          <p className="mt-3 text-xs text-stone-400">Loading product inventory...</p>
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-rose-900/60 bg-rose-950/40 p-4 text-xs text-rose-300 text-center">
          {error}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 rounded-2xl border border-dashed border-stone-800 bg-[#1e1a18] text-center">
          <Package className="h-12 w-12 text-stone-600 mb-3" />
          <h3 className="text-sm font-bold text-stone-200">No products found</h3>
          <p className="text-xs text-stone-500 mt-1 max-w-sm">
            {products.length === 0
              ? "Your inventory is currently empty. Click 'Add New Product' above."
              : "No products matched your search or filters."}
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-stone-800/90 bg-[#1e1a18] shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left text-xs text-stone-300">
              <thead className="border-b border-stone-800 bg-stone-900/70 uppercase text-[10px] tracking-wider text-stone-400">
                <tr>
                  <th className="px-4 py-3.5">Product</th>
                  <th className="px-4 py-3.5">Category</th>
                  <th className="px-4 py-3.5">Price</th>
                  <th className="px-4 py-3.5">Stock Qty</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-4 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/80">
                {filteredProducts.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-[#26211f] transition-colors group"
                  >
                    {/* Product Name & Image */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-stone-700 bg-stone-900">
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
                            <div className="flex h-full w-full items-center justify-center text-stone-600">
                              <Package className="h-5 w-5" />
                            </div>
                          )}
                        </div>

                        <div>
                          <p className="font-bold text-stone-100 group-hover:text-amber-400 transition-colors">
                            {item.name}
                          </p>
                          <p className="text-[10px] text-stone-500 font-mono">
                            /{item.slug}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-4 py-3.5">
                      <span className="rounded-md bg-stone-800 px-2.5 py-1 text-[11px] font-medium text-stone-300">
                        {item.category?.name || "Uncategorized"}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="px-4 py-3.5 font-bold text-amber-400">
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
                          className="w-16 rounded-lg border border-stone-700 bg-stone-900/90 px-2.5 py-1.5 text-xs text-stone-100 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30"
                        />
                        <button
                          onClick={() => saveStock(item)}
                          disabled={updatingId === item.id}
                          title="Save stock level"
                          className="rounded-lg p-1.5 text-amber-400 hover:bg-amber-950/40 transition-colors disabled:opacity-50"
                        >
                          {savedSuccessId === item.id ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
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
                            ? "bg-stone-800 text-stone-400 border border-stone-700"
                            : item.stock_quantity === 0
                              ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                              : item.stock_quantity <= item.low_stock_threshold
                                ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
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
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`/products/${item.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          title="Preview in Store"
                          className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-800 hover:text-amber-400 transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                        <button
                          onClick={() => handleDelete(item.id, item.name)}
                          title="Delete Product"
                          className="rounded-lg p-1.5 text-stone-400 hover:bg-rose-950/40 hover:text-rose-400 transition-colors"
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
