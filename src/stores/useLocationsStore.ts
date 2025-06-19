import { LocationsType } from "@/types/locations";
import { create } from "zustand";

interface locationsState {
  locations?: LocationsType[] | null;
  setLocations: (location: locationsState["locations"]) => void;
}

export const useLocationsStore = create<locationsState>((set) => ({
  locations: [],
  setLocations: (locations?: locationsState["locations"]) => set({ locations }),
}));
