import { shallow } from "zustand/shallow";

import { productStore } from "@/store/zustand/productStore";

export const useProduct = () => {
  const { product, isLoading, isError, error } = productStore(
    (state) => ({
      product: state.product,
      isLoading: state.isLoading,
      isError: state.isError,
      error: state.error,
    }),
    shallow
  );

  const { upsert, getByCode, getById, getAll } = productStore();

  return {
    product,
    isLoading,
    isError,
    error,
    upsert,
    getByCode,
    getById,
    getAll,
  };
};
