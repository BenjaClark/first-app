import { create } from "zustand";

import { apiInstance } from "@/utils/api";

import { ICustomer, initDataCustomer } from "@/interfaces/customer";
import { IListCustomer } from "@/interfaces/listCustomer";

interface customerState {
  listCustomer: IListCustomer[];
  customer: ICustomer;
  isLoading: boolean;
  isError: boolean;
  error: string;
  upsert: (customer: ICustomer) => void;
  getByRut: (rut: string) => void;
  getById: (id: string) => void;
  getAll: () => void;
  deleteById: (id: string) => void;
  resetCustomer: () => void;
}

export const customerStore = create<customerState>((set) => ({
  listCustomer: [],
  customer: initDataCustomer,
  isLoading: false,
  isError: false,
  error: "",
  upsert: async (customer: ICustomer) => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
      }));

      const { data } = await apiInstance.post("/customer/upsert", customer);

      set((state) => ({
        ...state,
        customer: data.data || initDataCustomer,
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

      const { data } = await apiInstance.get(`/customer/getByRut/${rut}`);

      set((state) => ({
        ...state,
        customer: data.data || initDataCustomer,
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

      const { data } = await apiInstance.get(`/customer/getById/${id}`);

      set((state) => ({
        ...state,
        customer: data.data || initDataCustomer,
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

      const { data } = await apiInstance.get(`/customer/getAll/`);

      set((state) => ({
        ...state,
        listCustomer: data.data || [],
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

      const { data } = await apiInstance.delete(`/customer/deleteById/${id}`);

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
  resetCustomer: () => {
    set((state) => ({
      ...state,
      customer: initDataCustomer,
    }));
  },
}));
