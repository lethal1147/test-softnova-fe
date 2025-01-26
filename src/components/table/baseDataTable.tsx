import { BaseTableProps } from "@/types";
import DataTable from "./dataTable";
import { TableRow } from "../ui/table";
import BaseTableCell from "./baseTableCell";
import { formatDate } from "@/utils";

export default function BaseDataTable<T>({ columns, rows }: BaseTableProps<T>) {
  return (
    <DataTable columns={columns} rows={rows}>
      {rows.map((row, index: number) => (
        <TableRow key={index}>
          {columns?.map((col, idx) => {
            let cellContent: React.ReactNode;
            if (col.key === "index") {
              cellContent = index + 1;
            } else if (
              (col.key.toString().toLowerCase().includes("date") ||
                col.key.toString().toLowerCase().endsWith("at")) &&
              row[col.key as keyof T]
            ) {
              cellContent = formatDate(row[col.key as keyof T] as string);
            } else {
              cellContent = row[col.key as keyof T] as React.ReactNode;
            }

            return <BaseTableCell key={idx}>{cellContent}</BaseTableCell>;
          })}
        </TableRow>
      ))}
    </DataTable>
  );
}
