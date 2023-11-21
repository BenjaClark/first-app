import { shallow } from "zustand/shallow";

import { userStore } from "@/store/zustand/userStore";

export const useUser = () => {
  const { listUser, user, isLoading, isError, error } = userStore(
    (state) => ({
      listUser: state.listUser,
      user: state.user,
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
    listUser,
    user,
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
