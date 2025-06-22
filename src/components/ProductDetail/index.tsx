import { Card } from "@/components/ui/card";
import { Product } from "@/types/products";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Skeleton from "../ui/skeleton";
const SmartImage = dynamic(() => import("../ui/smart-img"), { ssr: true });

export function ProductDetail({ product }: { product: Product | null }) {
  if (!product) {
    return (
      <div className="border p-6 rounded text-center text-muted-foreground">
        Produto não encontrado ou removido.
      </div>
    );
  }

  return (
    <Card className="p-4 space-y-4 border rounded">
      <p className="text-2xl font-bold">{product.title}</p>
      <Suspense fallback={<Skeleton />}>
        <SmartImage
          key={product.images?.[0] ?? "no-img"}
          originalUrl={product.images?.[0] ?? ""}
          alt={product.title}
        />
      </Suspense>

      <p>{product.description}</p>

      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold">${product.price}</span>
      </div>
    </Card>
  );
}

export default ProductDetail;
