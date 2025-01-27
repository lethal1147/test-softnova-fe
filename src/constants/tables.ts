import {
  BaseColumnProps,
  BookTransactionIndexTable,
  OptionType,
} from "@/types";
import { Book } from "@/types";

export const PAGINATION_OPTIONS: OptionType[] = [
  { label: 5, value: 5 },
  { label: 10, value: 10 },
  { label: 20, value: 20 },
];

export const BOOKS_MANAGEMENT_TABLE_COLUMNS: BaseColumnProps<
  Omit<Book, "price"> & { price: string }
>[] = [
  { key: "index", label: "#" },
  { key: "name", label: "Name" },
  { key: "author", label: "Author" },
  { key: "price", label: "Price" },
  { key: "createdAt", label: "Create Date" },
  { key: "updatedAt", label: "Update Date" },
];

export const PURCHASE_HISTORY_TABLE_COLUMNS: BaseColumnProps<BookTransactionIndexTable>[] =
  [
    { key: "index", label: "#" },
    { key: "createdAt", label: "Create Date" },
    { key: "total", label: "Price before discount" },
    { key: "discount", label: "Discount" },
    { key: "net", label: "Total" },
  ];
