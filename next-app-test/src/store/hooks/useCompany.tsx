import { shallow } from "zustand/shallow";

import { companyStore } from "@/store/zustand/companyStore";

export const useCompany = () => {
  const { company, isLoading, isError, error } = companyStore(
    (state) => ({
      company: state.company,
      isLoading: state.isLoading,
      isError: state.isError,
      error: state.error,
    }),
    shallow
  );

  const { upsert, getByRut, getById, getAll } = companyStore();

  return {
    company,
    isLoading,
    isError,
    error,
    upsert,
    getByRut,
    getById,
    getAll,
  };
};
