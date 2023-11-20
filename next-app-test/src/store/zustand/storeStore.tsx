import { IStore } from "@/interfaces/store";
import { create } from "zustand";

interface storeState {
  store: string;
  setStore: (store: string) => void;
  color: string;
  setColor: (color: string) => void;
}

export const storeStore = create<storeState>((set) => ({
  store: "",
  setStore: (store: string) => {
    set({ store });
  },
  color: "",
  setColor: (color: string) => {
    set({ color });
  },
}));
