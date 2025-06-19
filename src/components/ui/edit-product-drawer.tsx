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
  product?: Product;
}

export function EditProductDrawer({ product }: EditProductDrawerProps) {
  const {
    open,
    product: selectedProduct,
    toggle,
    setProduct,
    close,
  } = useEditProductDrawer();

  const isOpen = open && (!!selectedProduct || !!product);
  const activeProduct = selectedProduct ?? product;

  return (
    <Drawer
      open={isOpen}
      onOpenChange={(open) => {
        toggle(open);
        if (open) {
          setProduct(activeProduct);
          return;
        }
        setProduct(null);
      }}
    >
      <DrawerTrigger asChild>
        <Button variant="default">Editar Produto</Button>
      </DrawerTrigger>
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
