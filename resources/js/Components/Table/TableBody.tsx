import {
  forwardRef,
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
  useContext,
} from "react";
import { TableContext } from "@/Components/Table/TableContext";
import { cn } from "@/Utilities/utils";

export type TableBodyProps = {
  className?: string;
  children?: ReactNode;
};

export type TableBodyType = ForwardRefExoticComponent<
  TableBodyProps & RefAttributes<HTMLTableSectionElement>
>;

export const TableBody: TableBodyType = forwardRef(
  ({ className, ...props }, ref) => {
    const context = useContext(TableContext);

    if (context?.didMount === false) {
      console.log("TableHead must be used within Table!");
    }

    return <tbody className={cn("", className)} ref={ref} {...props} />;
  },
);
