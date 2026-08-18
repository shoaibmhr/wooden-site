import ProductCard from "../common/ProductCard";

export default function ProductResultsGrid({ products, onClearFilters }) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-neutral-600">No products match the selected filters.</p>
        <button
          type="button"
          onClick={onClearFilters}
          className="mt-4 text-sm font-semibold text-[#5c1f1f] underline"
        >
          Clear filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
