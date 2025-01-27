import { createTransactionApi, getAllTransactionByIdApi } from "@/api";
import {
  BaseQueryIndexProps,
  BookTransactionWithItem,
  CreateBookTransactionBody,
} from "@/types";
import { handleError, handleSuccess } from "@/utils";
import { create } from "zustand";
import { useUserStore } from "./userStore";
import { useCartStore } from "./cartStore";
import { useLoaderStore } from "./loaderStore";

interface BookTransactionState {
  transactions: BookTransactionWithItem[];
  totalTransactions: number;
  transactionFilter: BaseQueryIndexProps;
  getAllTransaction: (query: BaseQueryIndexProps) => Promise<void>;
  createTransaction: (body: CreateBookTransactionBody) => Promise<void>;
}

export const useBookTransactionStore = create<BookTransactionState>(
  (set, get) => ({
    transactions: [],
    totalTransactions: 0,
    transactionFilter: { page: 1, limit: 10 },
    getAllTransaction: async (query) => {
      try {
        useLoaderStore.getState().startLoading();
        const userId = useUserStore.getState().user?.id;
        if (!userId) throw new Error("User not logged in.");

        const response = await getAllTransactionByIdApi(userId, query);
        if (response.error) throw new Error(response.message);
        set({
          transactions: response.data.transactions,
          totalTransactions: response.data.total,
        });
      } catch (err) {
        handleError(err);
      } finally {
        useLoaderStore.getState().stopLoading();
      }
    },
    createTransaction: async (body: CreateBookTransactionBody) => {
      try {
        useLoaderStore.getState().startLoading();
        const response = await createTransactionApi(body);
        if (response.error) throw new Error(response.message);

        await get().getAllTransaction(get().transactionFilter);
        handleSuccess(response.message);
        await useCartStore.getState().getCart();
      } catch (err) {
        handleError(err);
      } finally {
        useLoaderStore.getState().stopLoading();
      }
    },
    changeFilter: (key: keyof BaseQueryIndexProps, value: number) => {
      set((state) => ({
        transactionFilter: { ...state.transactionFilter, [key]: value },
      }));
    },
  })
);
