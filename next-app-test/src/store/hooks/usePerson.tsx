import { shallow } from "zustand/shallow";

import { personStore } from "@/store/zustand/personStore";

export const usePerson = () => {
  const { listPerson, person, isLoading, isError, error } = personStore(
    (state) => ({
      listPerson: state.listPerson,
      person: state.person,
      isLoading: state.isLoading,
      isError: state.isError,
      error: state.error,
    }),
    shallow
  );

  const { upsert, getByRut, getById, getAll, deleteById } = personStore();

  return {
    listPerson,
    person,
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
