"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { EditProductForm } from "@/components/EditProductForm";
import { useEditProductDrawer } from "@/stores/useEditProductDrawer";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/products";

interface EditProductDrawerProps {
  selectedProduct?: Product;
}

export function EditProductDrawer({ selectedProduct }: EditProductDrawerProps) {
  const { open, product, toggle, setProduct, close } = useEditProductDrawer();

  const isInline = !!selectedProduct;
  const isOpen = isInline ? open : open && !!product;
  const activeProduct = isInline ? selectedProduct : product;

  return (
    <Drawer
      open={isOpen}
      onOpenChange={(open) => {
        toggle(open);
        if (isInline && open) {
          setProduct(selectedProduct);
        }
      }}
    >
      {isInline && (
        <DrawerTrigger asChild>
          <Button variant="default">Editar Produto</Button>
        </DrawerTrigger>
      )}

      {activeProduct && (
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Editar Produto</DrawerTitle>
          </DrawerHeader>
          <EditProductForm product={activeProduct} onSuccess={close} />
        </DrawerContent>
      )}
    </Drawer>
  );
}

export default EditProductDrawer;
