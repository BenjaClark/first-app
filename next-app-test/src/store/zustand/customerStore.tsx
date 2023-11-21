import { create } from "zustand";

import { apiInstance } from "@/utils/api";

import { ICustomer } from "@/interfaces/customer";
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
}

export const customerStore = create<customerState>((set) => ({
  listCustomer: [],
  customer: {
    id: "",
    type: "",
    person_id: "",
    company_id: "",
    rut: "",
    fantasyName: "",
    name: "",
    paternalLastName: "",
    maternalLastName: "",
    activity: "",
    address: "",
    district: "",
    email: "",
    phone: "",
  },
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
        customer: data.data,
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
        customer: data.data,
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
        customer: data.data,
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
        listCustomer: data.data,
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

      const { data } = await apiInstance.get(`/customer/deleteById/${id}`);

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
