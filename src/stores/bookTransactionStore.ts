import { createTransactionApi, getAllTransactionByIdApi } from "@/api";
import { BookTransactionWithItem, CreateBookTransactionBody } from "@/types";
import { handleError, handleSuccess } from "@/utils";
import { create } from "zustand";
import { useUserStore } from "./userStore";
import { useCartStore } from "./cartStore";

interface BookTransactionState {
  transactions: BookTransactionWithItem[];
  getAllTransaction: () => Promise<void>;
  createTransaction: (body: CreateBookTransactionBody) => Promise<void>;
}

export const useBookTransactionStore = create<BookTransactionState>(
  (set, get) => ({
    transactions: [],
    getAllTransaction: async () => {
      try {
        const userId = useUserStore.getState().user?.id;
        if (!userId) throw new Error("User not logged in.");

        const response = await getAllTransactionByIdApi(userId, {
          page: 1,
          limit: 10,
        });
        if (response.error) throw new Error(response.message);
        set({ transactions: response.data });
      } catch (err) {
        handleError(err);
      }
    },
    createTransaction: async (body: CreateBookTransactionBody) => {
      try {
        const response = await createTransactionApi(body);
        if (response.error) throw new Error(response.message);

        await get().getAllTransaction();
        handleSuccess(response.message);
        await useCartStore.getState().getCart();
      } catch (err) {
        handleError(err);
      }
    },
  })
);
