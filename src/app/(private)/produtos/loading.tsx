import ProductCardSkeleton from "@/components/ProductCard/skeleton";

export default function LoadingProductsPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProductCardSkeleton key={i + 1} />
        ))}
      </div>
    </div>
  );
}
