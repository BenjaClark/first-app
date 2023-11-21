import { create } from "zustand";

interface MenuState {
  showMenu: boolean;
  setShowMenu: (showMenu: boolean) => void;
}

export const menuStore = create<MenuState>((set) => ({
  showMenu: false,
  setShowMenu: (showMenu: boolean) => {
    set({ showMenu });
  },
}));
