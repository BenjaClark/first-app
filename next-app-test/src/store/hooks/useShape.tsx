import { shallow } from "zustand/shallow";

import { shapeStore } from "@/store/zustand/shapeStore";

export const useShape = () => {
  const { shape, setShape, colorShape, setColorShape } = shapeStore(
    (state) => ({
      shape: state.shape,
      setShape: state.setShape,
      colorShape: state.colorShape,
      setColorShape: state.setColorShape,
    }),
    shallow
  );

  return {
    shape,
    setShape,
    colorShape,
    setColorShape,
  };
};
