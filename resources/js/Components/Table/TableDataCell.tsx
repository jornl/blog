import { cn } from "@/Utilities/utils";
import {
  forwardRef,
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
} from "react";

export type TableDataCellProps = {
  className?: string;
  children?: ReactNode;
};

export type TableDataCellType = ForwardRefExoticComponent<
  TableDataCellProps & RefAttributes<HTMLTableDataCellElement>
>;

export const TableDataCell: TableDataCellType = forwardRef(
  ({ className, ...props }, ref) => {
    return <td className={cn("", className)} ref={ref} {...props} />;
  },
);
