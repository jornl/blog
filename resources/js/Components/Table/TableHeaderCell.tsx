import { cn } from "@/Utilities/utils";
import {
  forwardRef,
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
} from "react";

export type TableHeaderCellProps = {
  className?: string;
  children?: ReactNode;
};

export type TableHeaderCellType = ForwardRefExoticComponent<
  TableHeaderCellProps & RefAttributes<HTMLTableHeaderCellElement>
>;

export const TableHeaderCell: TableHeaderCellType = forwardRef(
  ({ className = "", ...props }, ref) => {
    return <th className={cn("", className)} ref={ref} {...props} />;
  },
);
