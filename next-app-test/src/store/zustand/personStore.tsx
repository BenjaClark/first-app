import { create } from "zustand";

import { apiInstance } from "@/utils/api";

import { IPerson } from "@/interfaces/person";
import { IListPerson } from "@/interfaces/listPerson";

interface personState {
  listPerson?: IListPerson[];
  person?: IPerson;
  isLoading: boolean;
  isError: boolean;
  error: string;
  upsert: (person: IPerson) => void;
  getByRut: (rut: string) => void;
  getById: (id: string) => void;
  getAll: () => void;
  deleteById: (id: string) => void;
}

export const personStore = create<personState>((set) => ({
  listPerson: [],
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

  upsert: async (person: IPerson) => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
      }));

      const { data } = await apiInstance.post("/person/upsert", person);

      set((state) => ({
        ...state,
        person: data.data,
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
  getById: async (id: string) => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
      }));

      const { data } = await apiInstance.get(`/person/getById/${id}`);

      set((state) => ({
        ...state,
        person: data,
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

      const { data } = await apiInstance.get(`/person/getAll/`);

      set((state) => ({
        ...state,
        listPerson: data.data[0],
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

      const { data } = await apiInstance.get(`/person/deleteById/${id}`);

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
}));
