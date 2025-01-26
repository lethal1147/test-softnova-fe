import { api } from "@/services";
import { BaseResponseProps, Book, BookQuery } from "@/types";

export const getSearchBookApi = async (
  query: BookQuery
): Promise<BaseResponseProps<Book[]>> =>
  await api.get("/book/search", { params: query });

export const getHomepageBookApi = async (): Promise<
  BaseResponseProps<{ bestSeller: Book[]; newRelease: Book[] }>
> => await api.get("/book/home");

export const createBookApi = async (
  body: FormData
): Promise<BaseResponseProps<Book>> =>
  await api.post("/book", body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateBookApi = async (
  id: number,
  body: FormData
): Promise<BaseResponseProps<Book>> =>
  await api.patch(`/book/${id}`, body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
