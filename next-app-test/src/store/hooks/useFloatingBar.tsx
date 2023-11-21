import { shallow } from "zustand/shallow";

import { floatingBarStore } from "@/store/zustand/floatingBarStore";

export const useFloatingBar = () => {
  const { name, setName } = floatingBarStore(
    (state) => ({
      name: state.name,
      setName: state.setName,
    }),
    shallow
  );

  return {
    name,
    setName,
  };
};
