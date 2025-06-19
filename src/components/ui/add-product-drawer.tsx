"use client";

import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { AddProductForm } from "@/components/AddProductForm";
import { useAddProductDrawerStore } from "@/stores/useAddPrductDrawer";

export function AddProductDrawer() {
  const { isOpen, setOpen } = useAddProductDrawerStore();

  return (
    <Drawer open={isOpen} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="default">Novo Produto</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Adicionar Produto</DrawerTitle>
        </DrawerHeader>
        <AddProductForm onSuccess={() => setOpen(false)} />
      </DrawerContent>
    </Drawer>
  );
}

export default AddProductDrawer;
