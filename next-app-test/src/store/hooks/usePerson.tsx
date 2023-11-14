import { shallow } from "zustand/shallow";

import { personStore } from "@/store/zustand/personStore";

export const usePerson = () => {
  const { person, isLoading, isError, error } = personStore(
    (state) => ({
      person: state.person,
      isLoading: state.isLoading,
      isError: state.isError,
      error: state.error,
    }),
    shallow
  );

  const { upsert, getByRut, getById, getAll } = personStore();

  return {
    person,
    isLoading,
    isError,
    error,
    upsert,
    getByRut,
    getById,
    getAll,
  };
};
