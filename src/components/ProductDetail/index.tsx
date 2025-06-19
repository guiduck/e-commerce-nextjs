import { Card } from "@/components/ui/card";
import { Product } from "@/types/products";
import { SmartImage } from "../ui/smart-img";

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
      <h1 className="text-2xl font-bold">{product.title}</h1>

      <SmartImage originalUrl={product.images?.[0] ?? ""} alt={product.title} />

      <p>{product.description}</p>

      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold">${product.price}</span>
      </div>
    </Card>
  );
}
