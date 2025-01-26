import { BaseTableProps } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const DataTable = <T,>({
  columns = [],
  rows = [],
  children,
}: BaseTableProps<T>) => {
  return (
    <div className="overflow-hidden rounded-md border pb-8">
      <Table className="text-xs text-gray-primary">
        <TableHeader className="bg-gray-secondary">
          <TableRow>
            {columns.map((col, index) => (
              <TableHead
                className="text-nowrap px-3 py-2 font-normal uppercase"
                key={index}
              >
                {col.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.length === 0 && (
            <TableRow className="">
              <TableCell
                className="w-full px-6 py-4 text-center"
                colSpan={columns.length}
              >
                No item
              </TableCell>
            </TableRow>
          )}
          {children}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTable;
