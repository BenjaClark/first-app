import { create } from "zustand";

interface FloatingBarState {
  name: string;
  setName: (name: string) => void;
}

export const floatingBarStore = create<FloatingBarState>((set) => ({
  name: "",
  setName: (name: string) => {
    set({ name });
  },
}));
