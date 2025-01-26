import { BaseColumnProps, BookTransactionIndexTable } from "@/types";
import { Book } from "@/types";

export const BOOKS_MANAGEMENT_TABLE_COLUMNS: BaseColumnProps<Book>[] = [
  { key: "index", label: "#" },
  { key: "name", label: "Name" },
  { key: "author", label: "Author" },
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
