import { useEffect, useState } from "react";
import { Plus, Pencil, Ban, FolderTree, RefreshCw } from "lucide-react";
import {
  fetchAdminCategories,
  deactivateCategory,
  updateCategory,
} from "../../services/api";
import CategoryFormModal from "../components/CategoryFormModal";
import ConfirmDialog from "../components/ConfirmDialog";

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const [categoryToDeactivate, setCategoryToDeactivate] = useState(null);
  const [isDeactivating, setIsDeactivating] = useState(false);

  const [categoryToReactivate, setCategoryToReactivate] = useState(null);
  const [isReactivating, setIsReactivating] = useState(false);

  useEffect(() => {
    let isMounted = true;

    fetchAdminCategories()
      .then((data) => {
        if (isMounted) setCategories(data);
      })
      .catch((err) => {
        if (isMounted) {
          setErrorMsg(err.message || "Failed to load categories");
        }
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const refetchCategories = () => {
    setIsLoading(true);
    setErrorMsg("");

    fetchAdminCategories()
      .then((data) => setCategories(data))
      .catch((err) => setErrorMsg(err.message || "Failed to load categories"))
      .finally(() => setIsLoading(false));
  };

  const handleAddClick = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleSaved = (savedCategory, isEditMode) => {
    if (isEditMode) {
      setCategories((current) =>
        current.map((cat) =>
          cat.id === savedCategory.id ? savedCategory : cat,
        ),
      );
    } else {
      setCategories((current) => [...current, savedCategory]);
    }
  };

  // ---- Deactivate flow ----
  const handleDeactivateClick = (category) => {
    setCategoryToDeactivate(category);
  };

  const handleCancelDeactivate = () => {
    if (isDeactivating) return;
    setCategoryToDeactivate(null);
  };

  const handleConfirmDeactivate = async () => {
    if (!categoryToDeactivate) return;

    setIsDeactivating(true);

    try {
      await deactivateCategory(categoryToDeactivate.id);
      setCategories((current) =>
        current.map((cat) =>
          cat.id === categoryToDeactivate.id
            ? { ...cat, is_active: false }
            : cat,
        ),
      );
      setCategoryToDeactivate(null);
    } catch (err) {
      setErrorMsg(err.message || "Failed to deactivate category");
    } finally {
      setIsDeactivating(false);
    }
  };

  // ---- Reactivate flow ----
  const handleReactivateClick = (category) => {
    setCategoryToReactivate(category);
  };

  const handleCancelReactivate = () => {
    if (isReactivating) return;
    setCategoryToReactivate(null);
  };

  const handleConfirmReactivate = async () => {
    if (!categoryToReactivate) return;

    setIsReactivating(true);

    try {
      const updated = await updateCategory(categoryToReactivate.id, {
        is_active: true,
      });
      setCategories((current) =>
        current.map((cat) =>
          cat.id === categoryToReactivate.id ? updated : cat,
        ),
      );
      setCategoryToReactivate(null);
    } catch (err) {
      setErrorMsg(err.message || "Failed to reactivate category");
    } finally {
      setIsReactivating(false);
    }
  };

  return (
    <div className="p-5 sm:p-7 md:p-9">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-lg font-bold text-stone-900 sm:text-xl">
            Categories
          </h1>
          <p className="mt-1 text-xs text-stone-500 sm:text-sm">
            Manage product categories for your storefront
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={refetchCategories}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 rounded-xl border border-stone-300 px-4 py-2.5 text-xs font-semibold text-stone-600 hover:bg-stone-100 transition-colors disabled:opacity-50"
          >
            <RefreshCw
              className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`}
            />
            Refresh
          </button>

          <button
            onClick={handleAddClick}
            className="flex items-center justify-center gap-2 rounded-xl bg-amber-900 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-xs transition-all hover:bg-amber-950"
          >
            <Plus className="h-4 w-4" strokeWidth={2.5} />
            Add New Category
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="mt-5 rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-xs font-semibold text-rose-700">
          {errorMsg}
        </div>
      )}

      {isLoading ? (
        <div className="mt-8 text-center text-sm text-stone-500">
          Loading categories...
        </div>
      ) : categories.length === 0 ? (
        <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-stone-300 p-10 text-center">
          <FolderTree className="h-8 w-8 text-stone-300" />
          <p className="mt-3 text-sm text-stone-500">
            No categories yet — add your first one.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xs"
            >
              <div className="h-32 w-full bg-stone-100 sm:h-36">
                {category.image_url ? (
                  <img
                    src={category.image_url}
                    alt={category.name}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-stone-300">
                    <FolderTree className="h-8 w-8" />
                  </div>
                )}
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-bold text-stone-900">
                    {category.name}
                  </h3>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                      category.is_active
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-stone-100 text-stone-500"
                    }`}
                  >
                    {category.is_active ? "Active" : "Inactive"}
                  </span>
                </div>

                <p className="mt-1 text-[11px] font-mono text-stone-400">
                  /{category.slug}
                </p>

                {category.description && (
                  <p className="mt-2 line-clamp-2 text-xs text-stone-500">
                    {category.description}
                  </p>
                )}

                <div className="mt-4 flex gap-2 border-t border-stone-100 pt-3">
                  <button
                    onClick={() => handleEditClick(category)}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 hover:text-stone-800 transition-colors"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Edit
                  </button>

                  {category.is_active ? (
                    <button
                      onClick={() => handleDeactivateClick(category)}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      <Ban className="h-3.5 w-3.5" />
                      Deactivate
                    </button>
                  ) : (
                    <button
                      onClick={() => handleReactivateClick(category)}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-50 transition-colors"
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                      Reactivate
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <CategoryFormModal
        key={editingCategory ? editingCategory.id : "new"}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSaved={handleSaved}
        editingCategory={editingCategory}
      />

      <ConfirmDialog
        isOpen={Boolean(categoryToDeactivate)}
        title="Deactivate category?"
        message={
          categoryToDeactivate
            ? `"${categoryToDeactivate.name}" will be hidden from the storefront. You can reactivate it anytime.`
            : ""
        }
        confirmLabel="Deactivate"
        cancelLabel="Cancel"
        isDangerous={true}
        isProcessing={isDeactivating}
        onConfirm={handleConfirmDeactivate}
        onCancel={handleCancelDeactivate}
      />

      <ConfirmDialog
        isOpen={Boolean(categoryToReactivate)}
        title="Reactivate category?"
        message={
          categoryToReactivate
            ? `"${categoryToReactivate.name}" will become visible on the storefront again.`
            : ""
        }
        confirmLabel="Reactivate"
        cancelLabel="Cancel"
        isDangerous={false}
        isProcessing={isReactivating}
        onConfirm={handleConfirmReactivate}
        onCancel={handleCancelReactivate}
      />
    </div>
  );
}
