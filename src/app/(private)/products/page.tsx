import { getAllProducts } from "@/services/products/getAllProducts";
import { Pagination } from "@/components/Pagination";
import { ProductList } from "@/components/ui/product-list";
import dynamic from "next/dynamic";

const AddProductDrawer = dynamic(
  () => import("@/components/ui/add-product-drawer"),
  {
    ssr: true,
    loading: () => (
      <div className="p-6 text-sm text-muted">Loading drawer...</div>
    ),
  }
);

const ITEMS_PER_PAGE = 10;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const currentPage = Number(searchParams.page) || 1;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const products = await getAllProducts(ITEMS_PER_PAGE, offset);

  console.log(products);

  return (
    <div className="space-y-6 p-6">
      <AddProductDrawer />

      <ProductList products={products} layout="grid" />

      <Pagination
        currentPage={currentPage}
        hasNextPage={products.length === ITEMS_PER_PAGE}
      />
    </div>
  );
}
