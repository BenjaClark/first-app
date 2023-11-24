import { shallow } from "zustand/shallow";

import { customerStore } from "@/store/zustand/customerStore";

export const useCustomer = () => {
  const { listCustomer, customer, isLoading, isError, error } = customerStore(
    (state) => ({
      listCustomer: state.listCustomer,
      customer: state.customer,
      isLoading: state.isLoading,
      isError: state.isError,
      error: state.error,
    }),
    shallow
  );

  const { upsert, getByRut, getById, getAll, deleteById } = customerStore();

  return {
    listCustomer,
    customer,
    isLoading,
    isError,
    error,
    upsert,
    getByRut,
    getById,
    getAll,
    deleteById,
  };
};
