import { useEffect, useState } from "react";
import { Plus, Trash2, Package, Save } from "lucide-react";
import {
  fetchProducts,
  deleteProduct,
  updateProduct,
} from "../../services/api";
import AddProductModal from "../components/AddProductModal";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

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
          setError("Failed to load products");
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        setProducts((prev) => prev.filter((p) => p.id !== id));
      } catch (err) {
        console.error("Delete product error:", err);
        alert("Failed to delete product");
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
    } catch (err) {
      alert(err.message || "Failed to update stock");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-stone-800 pb-4">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-wider text-stone-100 sm:text-2xl">
            Product Management
          </h1>
          <p className="mt-1 text-xs text-stone-400">
            Add, view, and manage items in your store inventory.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 rounded-lg bg-[#5c1f1f] px-4 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-[#732929] transition-all"
        >
          <Plus className="h-4 w-4" /> Add New Product
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-8 text-xs text-stone-400">
          Loading products...
        </div>
      ) : error ? (
        <div className="text-center py-8 text-xs text-rose-400">{error}</div>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 rounded-xl border border-dashed border-stone-800 bg-[#262220]">
          <Package className="h-10 w-10 text-stone-600 mb-2" />
          <p className="text-sm font-medium text-stone-300">
            No products found
          </p>
          <p className="text-xs text-stone-500 mt-1">
            Start by adding your first product.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-stone-800 bg-[#262220]">
          <table className="w-full text-left text-xs text-stone-300">
            <thead className="border-b border-stone-800 bg-stone-900/50 uppercase text-[10px] tracking-wider text-stone-400">
              <tr>
                <th className="px-4 py-3">Product Name</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800">
              {products.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-stone-800/40 transition-colors"
                >
                  <td className="px-4 py-3 font-medium text-stone-100">
                    {item.name}
                  </td>
                  <td className="px-4 py-3 text-stone-400">
                    {item.category?.name || "N/A"}
                  </td>
                  <td className="px-4 py-3 font-semibold text-amber-500">
                    PKR {item.price}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        value={item.stock_quantity}
                        onChange={(event) =>
                          handleStockChange(item.id, event.target.value)
                        }
                        className="w-16 rounded border border-stone-700 bg-stone-900 px-2 py-1 text-xs text-stone-100 outline-none focus:border-amber-500"
                      />
                      <button
                        onClick={() => saveStock(item)}
                        disabled={updatingId === item.id}
                        title="Save stock"
                        className="rounded p-1.5 text-amber-500 hover:bg-amber-950/40 disabled:opacity-50"
                      >
                        <Save className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-1 text-[10px] font-semibold uppercase ${
                        !item.is_active
                          ? "bg-stone-800 text-stone-400"
                          : item.stock_quantity === 0
                            ? "bg-rose-950/50 text-rose-400"
                            : item.stock_quantity <= item.low_stock_threshold
                              ? "bg-amber-950/50 text-amber-400"
                              : "bg-emerald-950/50 text-emerald-400"
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
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="rounded p-1.5 text-stone-400 hover:bg-rose-950/40 hover:text-rose-400 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onProductAdded={handleProductAdded}
      />
    </div>
  );
}
