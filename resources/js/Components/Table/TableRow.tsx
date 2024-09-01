import {
  forwardRef,
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
} from "react";
import { cn } from "@/Utilities/utils";

export type TableRowProps = {
  className?: string;
  children?: ReactNode;
};

export type TableRowType = ForwardRefExoticComponent<
  TableRowProps & RefAttributes<HTMLTableRowElement>
>;

export const TableRow: TableRowType = forwardRef(
  ({ className = "", ...props }, ref) => {
    return <tr className={cn("", className)} ref={ref} {...props} />;
  },
);
