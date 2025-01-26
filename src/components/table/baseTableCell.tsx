import { ReactNode } from "react";
import { TableCell } from "../ui/table";
import { cn } from "@/lib/utils";

const BaseTableCell = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <TableCell className={cn("px-3 py-5 capitalize", className)}>
      {children}
    </TableCell>
  );
};

export default BaseTableCell;
