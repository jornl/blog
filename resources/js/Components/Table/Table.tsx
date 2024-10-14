import {
  forwardRef,
  ForwardRefExoticComponent,
  RefAttributes,
  TableHTMLAttributes,
} from "react";
import { cn } from "@/Utilities/utils";
import { TableRow } from "@/Components/Table/TableRow";
import { TableHead } from "@/Components/Table/TableHead";
import { TableBody } from "@/Components/Table/TableBody";
import { TableContext } from "@/Components/Table/TableContext";
import { TableHeaderCell } from "@/Components/Table/TableHeaderCell";
import { TableDataCell } from "@/Components/Table/TableDataCell";

export type TableProps = TableHTMLAttributes<HTMLTableElement> & {
  zebra?: boolean;
  className?: string;
};

type TableComponent = ForwardRefExoticComponent<
  TableProps & RefAttributes<HTMLTableElement>
> & {
  Head: typeof TableHead;
  Body: typeof TableBody;
  Row: typeof TableRow;
  HeaderCell: typeof TableHeaderCell;
  DataCell: typeof TableDataCell;
};

const Table: TableComponent = forwardRef(
  ({ className, zebra, ...props }, ref) => {
    return (
      <TableContext.Provider value={{ didMount: true }}>
        <table
          {...props}
          className={cn("table", className, { "table-zebra": zebra })}
          ref={ref}
        />
      </TableContext.Provider>
    );
  },
) as TableComponent;

Table.Head = TableHead;
Table.Body = TableBody;
Table.Row = TableRow;
Table.HeaderCell = TableHeaderCell;
Table.DataCell = TableDataCell;

export default Table;
