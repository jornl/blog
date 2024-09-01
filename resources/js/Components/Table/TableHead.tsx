import {
  forwardRef,
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
  useContext,
} from "react";
import { cn } from "@/Utilities/utils";
import { TableContext } from "@/Components/Table/TableContext";

export type TableHeadProps = {
  className?: string;
  children?: ReactNode;
};

export type TableHeadType = ForwardRefExoticComponent<
  TableHeadProps & RefAttributes<HTMLTableSectionElement>
>;

export const TableHead: TableHeadType = forwardRef(
  ({ className = "", ...props }, ref) => {
    const context = useContext(TableContext);

    if (context?.didMount === false) {
      console.log("TableHead must be used within Table!");
    }

    return <thead className={cn("text-lg", className)} ref={ref} {...props} />;
  },
);
