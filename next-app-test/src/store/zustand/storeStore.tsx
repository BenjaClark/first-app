import { create } from "zustand";

interface StoreState {
  store: string;
  setStore: (store: string) => void;
  color: string;
  setColor: (color: string) => void;
}

export const storeStore = create<StoreState>((set) => ({
  store: "Sucursal",
  setStore: (store: string) => {
    set({ store });
  },
  color: "red",
  setColor: (color: string) => {
    set({ color });
  },
}));
