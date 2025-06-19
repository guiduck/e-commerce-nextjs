import { getProductById } from "@/services/products/getProductById";
import { getRelatedProducts } from "@/services/products/getRelatedProducts";
import { ProductList } from "@/components/ui/product-list";
import dynamic from "next/dynamic";
import { ProductDetail } from "@/components/ProductDetail";

const EditProductDrawer = dynamic(
  () => import("@/components/ui/edit-product-drawer"),
  { ssr: true }
);

interface ProductPageProps {
  params: { sku: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const productId = Number(params.sku);
  const product = await getProductById(productId);
  const related = await getRelatedProducts(productId);

  return (
    <div className="p-6 space-y-8">
      <EditProductDrawer selectedProduct={product.data!} />

      <ProductDetail product={product.data} />

      <div>
        <h2 className="text-xl font-bold mb-4">Related Products</h2>
        <ProductList products={related} layout="carousel" editMode />
      </div>
    </div>
  );
}
