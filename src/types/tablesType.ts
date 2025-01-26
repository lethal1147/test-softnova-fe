import { ReactNode } from "react";

export interface BaseColumnProps<T> {
  key: keyof T | "index";
  label: string;
  align?: "left" | "center" | "right";
  value?: (value: T[keyof T]) => React.ReactNode;
}

export interface BaseTableProps<T> {
  columns: BaseColumnProps<T>[];
  rows: T[];
  children?: ReactNode;
}
