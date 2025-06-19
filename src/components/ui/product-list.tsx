"use client";

import { ProductCard } from "@/components/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useEditProductDrawer } from "@/stores/useEditProductDrawer";
import { useProductsStore } from "@/stores/useProductsStore";
import { Product } from "@/types/products";

interface ProductListProps {
  products?: Product[];
  layout?: "grid" | "carousel";
  editMode?: boolean;
}

export function ProductList({
  products: initialProducts,
  layout = "grid",
  editMode = false,
}: ProductListProps) {
  const { setProduct, toggle } = useEditProductDrawer();
  const { filteredProducts } = useProductsStore();

  const products = filteredProducts ?? initialProducts;

  const handleEdit = (product: Product) => {
    setProduct(product);
    toggle(true);
  };

  if (!products || products.length === 0) {
    return (
      <div className="text-center text-muted-foreground text-sm py-4">
        nenhum produto encontrado
      </div>
    );
  }

  if (layout === "carousel") {
    return (
      <Carousel className="w-full">
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem key={product.id} className="basis-2/3 md:basis-2/7">
              <ProductCard
                product={product}
                allowEdit={editMode}
                onEdit={() => handleEdit(product)}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          allowEdit={editMode}
          onEdit={() => handleEdit(product)}
        />
      ))}
    </div>
  );
}
