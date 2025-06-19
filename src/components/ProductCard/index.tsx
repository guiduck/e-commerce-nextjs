"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Suspense, useTransition } from "react";
import { deleteProduct } from "@/services/products/deleteProduct";
import { toast } from "sonner";
import { Product } from "@/types/products";
import { Label } from "./label";
import Link from "next/link";
import Skeleton from "../ui/skeleton";
import { SmartImage } from "../ui/smart-img";

interface ProductCardProps {
  product: Product;
  allowEdit?: boolean;
  allowDelete?: boolean;
  onEdit?: (product: Product) => void;
}

export function ProductCard({
  product,
  allowEdit,
  onEdit,
  allowDelete,
}: ProductCardProps) {
  const [isPending, startTransition] = useTransition();

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
    <Card className="relative group overflow-hidden">
      <Link
        href={`/produto/${product.id}`}
        className="absolute h-3/4 w-full z-[1] cursor-default"
        aria-label={`Ver produto ${product.title}`}
      >
        <span className="sr-only">Ver produto {product.title}</span>
      </Link>

      <CardContent className="pointer-events-auto flex flex-col relative ">
        <Suspense fallback={<Skeleton className="w-full h-full" />}>
          <SmartImage
            originalUrl={product.images?.[0] ?? ""}
            alt={product.title}
          />
        </Suspense>
        <h2 className="text-lg font-bold h-14 line-clamp-2">{product.title}</h2>
        <Label className="my-1">{product.category.name}</Label>
        <p className="text-muted-foreground min-h-14 text-sm mb-2 line-clamp-3">
          {product.description}
        </p>
        <span className="flex justify-between items-center font-semibold text-2xl mb-4">
          <p>${product.price}</p>
        </span>

        <div className="flex justify-end gap-2 mt-auto">
          {allowEdit && onEdit && (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onEdit(product);
              }}
              className="w-auto h-auto py-1 px-2 cursor-pointer"
            >
              Edit
            </Button>
          )}

          {allowDelete && (
            <Button
              variant="destructive"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleDelete();
              }}
              disabled={isPending}
              className="w-auto h-auto py-1 px-2 cursor-pointer"
            >
              {isPending ? "Deleting..." : "Delete"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
