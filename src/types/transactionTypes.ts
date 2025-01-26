import { Book } from "./bookTypes";

export interface BookTransactionItem {
  id: number;
  bookId: number;
  price: number;
  qty: number;
  transactionId: number;
}

export interface BookTransactionItemWithBook extends BookTransactionItem {
  book: Book;
}

export interface BookTransaction {
  id: number;
  userId: number;
  total: number;
  discount: number;
  createdAt: Date;
}

export interface BookTransactionWithItem extends BookTransaction {
  bookTransaction: BookTransactionItemWithBook[];
}

export interface CreateBookTransactionItemBody {
  bookId: number;
  price: number;
  qty: number;
}

export interface CreateBookTransactionBody {
  userId: number;
  total: number;
  discount: number;
  bookTransactionItem: CreateBookTransactionItemBody[];
}

export interface BookTransactionIndexTable
  extends Omit<BookTransactionWithItem, "total" | "discount"> {
  net: string;
  total: string;
  discount: string;
}
