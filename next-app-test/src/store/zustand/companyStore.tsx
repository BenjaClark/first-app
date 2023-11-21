import { create } from "zustand";

import { apiInstance } from "@/utils/api";

import { ICompany } from "@/interfaces/company";
import { IListCompany } from "@/interfaces/listCompany";

interface companyState {
  listCompany?: IListCompany[];
  company: ICompany;
  isLoading: boolean;
  isError: boolean;
  error: string;
  upsert: (person: ICompany) => void;
  getByRut: (rut: string) => void;
  getById: (id: string) => void;
  getAll: () => void;
  deleteById: (id: string) => void;
}

export const companyStore = create<companyState>((set) => ({
  listCompany: [],
  company: {
    id: "",
    rut: "",
    fantasyName: "",
    name: "",
    activity: "",
    address: "",
    district: "",
    email: "",
    phone: "",
  },
  isLoading: false,
  isError: false,
  error: "",
  upsert: async (company: ICompany) => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
      }));

      const { data } = await apiInstance.post("/company/upsert", company);

      set((state) => ({
        ...state,
        company: data.data,
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

      const { data } = await apiInstance.get(`/company/getByRut/${rut}`);

      set((state) => ({
        ...state,
        company: data.data,
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

      const { data } = await apiInstance.get(`/company/getById/${id}`);

      set((state) => ({
        ...state,
        company: data.data,
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

      const { data } = await apiInstance.get(`/company/getAll/`);

      set((state) => ({
        ...state,
        listCompany: data.data,
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

      const { data } = await apiInstance.get(`/company/deleteById/${id}`);

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
