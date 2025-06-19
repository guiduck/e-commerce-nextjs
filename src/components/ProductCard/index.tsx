"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import Image from "next/image";
import { deleteProduct } from "@/services/products/deleteProduct";
import { toast } from "sonner";
import { isValidHttpUrl } from "@/lib/validators";

interface ProductCardProps {
  product: {
    id: number;
    title: string;
    price: number;
    description: string;
    images: string[];
  };
  allowEdit?: boolean;
  onEdit?: () => void;
}

const FALLBACK_IMAGE = "https://placehold.co/300x300?text=No+Image";

export function ProductCard({ product, allowEdit, onEdit }: ProductCardProps) {
  const [isPending, startTransition] = useTransition();
  const [imgSrc, setImgSrc] = useState(() => {
    const url = product.images?.[0] ?? "";
    return isValidHttpUrl(url) ? url : FALLBACK_IMAGE;
  });

  const handleImgError = () => {
    setImgSrc(FALLBACK_IMAGE);
  };

  const router = useRouter();

  const handleDelete = () => {
    startTransition(() => {
      deleteProduct(product.id).then((res) => {
        if (res.error) {
          toast.error(res.error ?? "Erro ao deletar produto");
          return;
        }
        toast.success("Produto deletado com sucesso");
      });
    });
  };

  return (
    <Card>
      <CardContent className="flex flex-col">
        <Image
          src={imgSrc}
          alt={product.title}
          width={100}
          height={100}
          onError={handleImgError}
          className="w-full h-40 object-cover rounded mb-2"
        />
        <h2 className="text-lg font-bold h-14 line-clamp-2">{product.title}</h2>
        <p className="text-muted-foreground min-h-14 text-sm mb-2 line-clamp-3">
          {product.description}
        </p>
        <span className="font-semibold text-2xl mb-4">${product.price}</span>

        <div className="flex justify-between items-center">
          <Button
            variant={"outline"}
            className="w-auto h-auto py-1 px-2 "
            onClick={() => router.push(`/product/${product.id}`)}
          >
            View
          </Button>

          <div className="flex gap-2">
            {allowEdit && onEdit && (
              <Button onClick={onEdit} className="w-auto h-auto py-1 px-2 ">
                Edit
              </Button>
            )}

            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isPending}
              className="w-auto h-auto py-1 px-2 "
            >
              {isPending ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
