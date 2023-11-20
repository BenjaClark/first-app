import { create } from "zustand";

import { apiInstance } from "@/utils/api";
import { IUser } from "@/interfaces/user";

interface userState {
  user: IUser;
  isLoading: boolean;
  isError: boolean;
  error: string;
  getById: (id: string) => void;
  getByRut: (rut: string) => void;
  getByLogin: (login: string) => void;
  getAll: () => void;
  deleteById: (id: string) => void;
  upsert: (person: IUser) => void;
  assignPassword: (login: string, password: string) => void;
  validate: (login: string, password: string) => void;
  updatePassword: (
    login: string,
    password: string,
    newPassword: string
  ) => void;
}

export const userStore = create<userState>((set) => ({
  user: {
    id: "",
    person_id: "",
    login: "",
    rut: "",
    name: "",
    paternalLastName: "",
    maternalLastName: "",
    address: "",
    district: "",
    phone: "",
    email: "",
  },
  isLoading: false,
  isError: false,
  error: "",
  data: "",

  getById: async (id: string) => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
      }));

      const { data } = await apiInstance.get(`/user/getById/${id}`);

      set((state) => ({
        ...state,
        user: data.data,
        isLoading: false,
        isError: false,
        error: "",
      }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },

  getByRut: async (rut: string) => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
      }));

      const { data } = await apiInstance.get(`/user/getByRut/${rut}`);

      set((state) => ({
        ...state,
        user: data.data,
        isLoading: false,
        isError: false,
        error: "",
      }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },

  getByLogin: async (login: string) => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
      }));

      const { data } = await apiInstance.get(`/user/getByLogin/${login}`);

      set((state) => ({
        ...state,
        user: data.data,
        isLoading: false,
        isError: false,
        error: "",
      }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },

  getAll: async () => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
      }));

      const { data } = await apiInstance.get(`/user/getAll/`);

      set((state) => ({
        ...state,
        user: data.data,
        isLoading: false,
        isError: false,
        error: "",
      }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },

  deleteById: async (id: string) => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
      }));

      const { data } = await apiInstance.get(`/user/deleteById/${id}`);

      set((state) => ({
        ...state,
        isLoading: false,
        isError: false,
        error: "",
      }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },

  upsert: async (user: IUser) => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
      }));

      const { data } = await apiInstance.post("/user/upsert", user);

      set((state) => ({
        ...state,
        user: data.data,
        isLoading: false,
        isError: true,
        error: "",
      }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },

  assignPassword: async (login: string, password: string) => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
      }));

      const { data } = await apiInstance.post("/user/assignPassword", {
        login,
        password,
      });

      set((state) => ({
        ...state,
        isLoading: false,
        isError: false,
        error: "",
      }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },

  validate: async (login: string, password: string) => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
      }));

      const { data } = await apiInstance.post("/user/validate", {
        login,
        password,
      });

      set((state) => ({
        ...state,
        user: data.data,
        isLoading: false,
        isError: false,
        error: "",
      }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },

  updatePassword: async (
    login: string,
    password: string,
    newPassword: string
  ) => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
      }));

      const { data } = await apiInstance.post("/user/updatePassword", {
        login,
        password,
        newPassword,
      });

      set((state) => ({
        ...state,
        user: data.data,
        isLoading: false,
        isError: true,
        error: "",
      }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },
}));
