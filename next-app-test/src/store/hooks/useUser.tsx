import { shallow } from "zustand/shallow";

import { userStore } from "@/store/zustand/userStore";

export const useUser = () => {
  const { person, isLoading, isError, error } = userStore(
    (state) => ({
      person: state.person,
      isLoading: state.isLoading,
      isError: state.isError,
      error: state.error,
    }),
    shallow
  );

  const {
    getById,
    getByRut,
    getByLogin,
    getAll,
    deleteById,
    upsert,
    assignPassword,
    validate,
    updatePassword,
  } = userStore();

  return {
    person,
    isLoading,
    isError,
    error,
    getById,
    getByRut,
    getByLogin,
    getAll,
    deleteById,
    upsert,
    assignPassword,
    validate,
    updatePassword,
  };
};
