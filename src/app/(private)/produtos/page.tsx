export const dynamic = "force-static";

import { getAllProducts } from "@/services/products/getAllProducts";
import { Pagination } from "@/components/Pagination";
import { ProductList } from "@/components/ui/product-list";
import dynamicImport from "next/dynamic";
import { ProductsFilter } from "@/components/PeoductsFilter";

const AddProductDrawer = dynamicImport(
  () => import("@/components/ui/add-product-drawer"),
  {
    ssr: true,
    loading: () => (
      <div className="p-6 text-sm text-muted">Loading drawer...</div>
    ),
  }
);

export default async function ProductsPage() {
  const products = await getAllProducts(1000);

  return (
    <div className="space-y-6 p-6">
      <AddProductDrawer />

      <ProductsFilter products={products} />

      <ProductList layout="grid" deleteMode />

      <Pagination />
    </div>
  );
}
