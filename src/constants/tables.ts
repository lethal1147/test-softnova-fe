import { BaseColumnProps } from "@/types";
import { Book } from "@/types";

export const BOOKS_MANAGEMENT_TABLE_COLUMNS: BaseColumnProps<Book>[] = [
  { key: "index", label: "#" },
  { key: "name", label: "Name" },
  { key: "author", label: "Author" },
  { key: "createdAt", label: "Create Date" },
  { key: "updatedAt", label: "Update Date" },
];
