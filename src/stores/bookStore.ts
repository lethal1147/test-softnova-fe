import {
  createBookApi,
  getHomepageBookApi,
  getSearchBookApi,
  updateBookApi,
} from "@/api/book";
import { BookSchemaType } from "@/pages/booksManagement/schema";
import { BaseResponseProps, Book, BookQuery } from "@/types";
import { handleError, handleSuccess } from "@/utils";
import { create } from "zustand";

interface BookState {
  books: Book[];
  bestSeller: Book[];
  newRelease: Book[];
  selectedBook: Book | null;
  bookFilter: BookQuery;
  getSearchBook: (query: BookQuery) => Promise<void>;
  getHomepageBook: () => Promise<void>;
  selectBook: (book: Book) => void;
  changeFilter: (key: keyof BookQuery, value: string | number) => void;
  submitBook: (body: BookSchemaType, id?: number) => Promise<void>;
}

export const useBookStore = create<BookState>((set) => ({
  books: [],
  bestSeller: [],
  newRelease: [],
  selectedBook: null,
  bookFilter: {
    page: 1,
    limit: 10,
    textSearch: "",
    maxPrice: 3000,
    minPrice: 0,
  },
  getSearchBook: async (query) => {
    try {
      const response = await getSearchBookApi(query);
      if (response.error) throw new Error(response.message);
      set({ books: response.data });
    } catch (err) {
      handleError(err);
    }
  },
  getHomepageBook: async () => {
    try {
      const response = await getHomepageBookApi();
      if (response.error) throw new Error(response.message);
      set({
        bestSeller: response.data.bestSeller,
        newRelease: response.data.newRelease,
      });
    } catch (err) {
      handleError(err);
    }
  },
  selectBook: (book: Book) => {
    set({ selectedBook: book });
  },
  changeFilter: (key: keyof BookQuery, value: string | number) => {
    set((state) => ({ bookFilter: { ...state.bookFilter, [key]: value } }));
  },
  submitBook: async (body: BookSchemaType, id?: number) => {
    try {
      const formData = new FormData();
      formData.append("body", JSON.stringify({ ...body, bookImage: "" }));
      if (body.bookImage instanceof File) {
        formData.append("file", body.bookImage);
      }
      let response: BaseResponseProps<Book>;
      if (id) {
        response = await updateBookApi(id, formData);
      } else {
        response = await createBookApi(formData);
      }

      if (response.error) throw new Error(response.message);

      await useBookStore
        .getState()
        .getSearchBook(useBookStore.getState().bookFilter);
      set({ selectedBook: null });
      handleSuccess(response.message);
    } catch (err) {
      handleError(err);
    }
  },
}));
