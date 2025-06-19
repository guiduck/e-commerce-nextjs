import { Product } from "@/types/products";
import { create } from "zustand";

interface EditProductState {
  product?: Product | null;
  open: boolean;
  setProduct: (product: EditProductState["product"]) => void;
  toggle: (open: boolean) => void;
  close: () => void;
}

export const useEditProductDrawer = create<EditProductState>((set) => ({
  product: null,
  open: false,
  setProduct: (product?: Product | null) => set({ product }),
  toggle: (open: boolean) => set({ open }),
  close: () => set({ open: false, product: null }),
}));
