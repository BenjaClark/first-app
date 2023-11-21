import { create } from "zustand";

interface ShapeState {
  shape: string;
  setShape: (shape: string) => void;
  colorShape: string;
  setColorShape: (color: string) => void;
}

export const shapeStore = create<ShapeState>((set) => ({
  shape: "Forma",
  setShape: (shape: string) => {
    set({ shape });
  },
  colorShape: "pink",
  setColorShape: (colorShape: string) => {
    set({ colorShape });
  },
}));
