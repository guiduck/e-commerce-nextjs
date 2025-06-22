export const dynamic = "force-dynamic";

import { getProductById } from "@/services/products/getProductById";
import { getRelatedProducts } from "@/services/products/getRelatedProducts";
import { ProductList } from "@/components/ui/product-list";
import dynamicImport from "next/dynamic";
import ProductDetail from "@/components/ProductDetail";

const EditProductDrawer = dynamicImport(
  () => import("@/components/ui/edit-product-drawer"),
  { ssr: true }
);

interface ProductPageProps {
  params: Promise<{ sku: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { sku } = await params;
  const productId = Number(sku);
  const product = await getProductById(productId);
  const related = await getRelatedProducts(productId);

  return (
    <div className="p-6 space-y-8">
      <EditProductDrawer product={product.data!} />

      <ProductDetail product={product.data} />

      <div>
        <h2 className="text-xl font-bold mb-4">Produtos relacionados</h2>
        <ProductList products={related} layout="carousel" editMode deleteMode />
      </div>
    </div>
  );
}
