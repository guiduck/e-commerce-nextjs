import { create } from "zustand";

interface AddProductDrawerStore {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}

export const useAddProductDrawerStore = create<AddProductDrawerStore>(
  (set) => ({
    isOpen: false,
    setOpen: (isOpen) => set({ isOpen }),
  })
);

export const useAddProductDrawer = () => {
  const { setOpen } = useAddProductDrawerStore();
  return setOpen;
};
