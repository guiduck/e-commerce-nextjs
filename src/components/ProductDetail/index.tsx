/* eslint-disable @next/next/no-img-element */
import { Card } from "@/components/ui/card";
import { Product } from "@/types/products";
import { isValidHttpUrl } from "@/lib/validators";

const FALLBACK_IMAGE = "https://placehold.co/300x300?text=No+Image";

export function ProductDetail({ product }: { product: Product | null }) {
  const rawImageUrl = product?.images?.[0] ?? "";
  const imgSrc = isValidHttpUrl(rawImageUrl)
    ? `/api/images/proxy?url=${encodeURIComponent(rawImageUrl)}`
    : FALLBACK_IMAGE;

  if (!product) {
    return (
      <div className="border p-6 rounded text-center text-muted-foreground">
        Produto não encontrado ou removido.
      </div>
    );
  }

  return (
    <Card className="p-4 space-y-4 border rounded">
      <h1 className="text-2xl font-bold">{product.title}</h1>

      <img
        src={imgSrc}
        alt={product.title}
        data-loaded="false"
        className="w-full h-40 object-cover rounded mb-2 transition-opacity duration-300"
      />

      <p>{product.description}</p>

      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold">${product.price}</span>
      </div>
    </Card>
  );
}
