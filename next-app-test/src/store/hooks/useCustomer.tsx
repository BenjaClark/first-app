import { shallow } from "zustand/shallow";

import { customerStore } from "@/store/zustand/customerStore";

export const useCustomer = () => {
  const { customer, isLoading, isError, error } = customerStore(
    (state) => ({
      customer: state.customer,
      isLoading: state.isLoading,
      isError: state.isError,
      error: state.error,
    }),
    shallow
  );

  const { upsert, getByRut, getById, getAll } = customerStore();

  return {
    customer,
    isLoading,
    isError,
    error,
    upsert,
    getByRut,
    getById,
    getAll,
  };
};
