import { Product } from "@/types/products";
import { create } from "zustand";

interface ProductsState {
  allProducts: Product[];
  filteredProducts: Product[];
  currentPage: number;
  totalPages: number;
  setAllProducts: (products: Product[]) => void;
  setFilteredProducts: (products: Product[]) => void;
  setCurrentPage: (page: number) => void;
  setTotalPages: (pages: number) => void;
}

export const useProductsStore = create<ProductsState>((set) => ({
  allProducts: [],
  filteredProducts: [],
  currentPage: 1,
  totalPages: 1,
  setAllProducts: (products) => set({ allProducts: products }),
  setFilteredProducts: (products) => set({ filteredProducts: products }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setTotalPages: (pages) => set({ totalPages: pages }),
}));
