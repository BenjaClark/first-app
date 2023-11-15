import { create } from "zustand";

import { apiInstance } from "@/utils/api";

import { IProduct } from "@/interfaces/product";

interface productState {
  product: IProduct;
  isLoading: boolean;
  isError: boolean;
  error: string;
  upsert: (product: IProduct) => void;
  getByCode: (code: number) => void;
  getById: (id: string) => void;
  getAll: () => void;
  deleteById: (id: string) => void;
}

export const productStore = create<productState>((set) => ({
  product: {
    id: "",
    code: 0,
    name: "",
    price: 0,
  },
  isLoading: false,
  isError: false,
  error: "",
  upsert: async (product: IProduct) => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
      }));

      const { data } = await apiInstance.post("/product/upsert", product);

      set((state) => ({
        ...state,
        product: data.data,
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
  getByCode: async (code: number) => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
      }));

      const { data } = await apiInstance.get(`/product/getByCode/${code}`);

      set((state) => ({
        ...state,
        product: data.data,
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

      const { data } = await apiInstance.get(`/product/getById/${id}`);

      set((state) => ({
        ...state,
        product: data.data,
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

      const { data } = await apiInstance.get(`/product/getAll/`);

      set((state) => ({
        ...state,
        product: data.data,
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

      const { data } = await apiInstance.get(`/product/deleteById/${id}`);

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