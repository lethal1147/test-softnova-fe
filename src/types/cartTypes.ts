import { Book } from "./bookTypes";

export interface Cart {
  id: number;
  qty: number;
  userId: number;
  bookId: number;
}

export interface CartWithBook extends Cart {
  book: Book;
}

export interface CreateCartBody {
  userId: number;
  bookId: number;
  qty: number;
}
