import { create } from "zustand";

import { apiInstance } from "@/utils/api";

import { IUser } from "@/interfaces/user";
import { IPerson } from "@/interfaces/person";

interface userState {
  person: IPerson;
  isLoading: boolean;
  isError: boolean;
  error: string;
  getById: (id: string) => void;
  getByRut: (rut: string) => void;
  getByLogin: (login: string) => void;
  getAll: () => void;
  deleteById: (id: string) => void;
  upsert: (person: IPerson) => void;
  assignPassword: (login: string, password: string) => void;
  validate: (login: string, password: string) => void;
  updatePassword: (
    login: string,
    password: string,
    newPassword: string
  ) => void;
}

export const userStore = create<userState>((set) => ({
  person: {
    id: "",
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

  getById: async (id: string) => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
      }));

      const { data } = await apiInstance.get(`/user/getById/${id}`);

      set((state) => ({
        ...state,
        user: data,
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

      const { data } = await apiInstance.get(`/person/getByRut/${rut}`);

      set((state) => ({
        ...state,
        person: data.data,
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

  getByLogin: async (rut: string) => {
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

  getAll: async () => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
      }));

      const { data } = await apiInstance.get(`/user/getAll/`);

      set((state) => ({
        ...state,
        user: data,
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

  upsert: async (person: IPerson) => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
      }));

      const { data } = await apiInstance.post("/user/upsert", person);

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

  validate: async (login: string, password: string): Promise<boolean> => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
      }));

      const { data } = await apiInstance.post("/user/validate", {
        login,
        password,
      });

      const isValid = data.data;

      set((state) => ({
        ...state,
        user: data.data,
        isLoading: false,
        isError: true,
        error: !isValid ? "Credenciales inválidas" : "",
      }));

      return isValid;
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));

      return false;
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

      const { data } = await apiInstance.post("/user/upsert", login);

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
