import { shallow } from "zustand/shallow";

import { companyStore } from "@/store/zustand/companyStore";

export const useCompany = () => {
  const { listCompany, company, isLoading, isError, error } = companyStore(
    (state) => ({
      listCompany: state.listCompany,
      company: state.company,
      isLoading: state.isLoading,
      isError: state.isError,
      error: state.error,
    }),
    shallow
  );

  const { upsert, getByRut, getById, getAll } = companyStore();

  return {
    listCompany,
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
