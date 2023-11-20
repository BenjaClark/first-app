import { shallow } from "zustand/shallow";

import { storeStore } from "@/store/zustand/storeStore";

export const useStore = () => {
  const { store, setStore, color, setColor } = storeStore(
    (state) => ({
      store: state.store,
      setStore: state.setStore,
      color: state.color,
      setColor: state.setColor,
    }),
    shallow
  );

  return {
    store,
    setStore,
    color,
    setColor,
  };
};
