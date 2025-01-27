import { api } from "@/services";
import {
  BaseQueryIndexProps,
  BaseResponseProps,
  BookTransaction,
  BookTransactionWithItem,
  CreateBookTransactionBody,
} from "@/types";

export const createTransactionApi = async (
  body: CreateBookTransactionBody
): Promise<BaseResponseProps<BookTransaction>> =>
  await api.post("/transaction", body);

export const getAllTransactionByIdApi = async (
  userId: number,
  query: BaseQueryIndexProps
): Promise<
  BaseResponseProps<{ transactions: BookTransactionWithItem[]; total: number }>
> =>
  await api.get(`/transaction/${userId}`, {
    params: query,
  });
