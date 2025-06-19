import { Card } from "@/components/ui/card";
import Image from "next/image";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
};

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

      <Image
        src={product.images?.[0]}
        alt={product.title}
        width={100}
        height={100}
        className="w-full h-64 object-cover rounded"
      />

      <p>{product.description}</p>

      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold">${product.price}</span>
      </div>
    </Card>
  );
}
