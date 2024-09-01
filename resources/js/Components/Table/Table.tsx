import { forwardRef, ForwardRefExoticComponent, RefAttributes } from "react";
import { cn } from "@/Utilities/utils";
import { TableRow, type TableRowProps } from "@/Components/Table/TableRow";
import { TableHead, type TableHeadProps } from "@/Components/Table/TableHead";
import { TableBody, type TableBodyProps } from "@/Components/Table/TableBody";
import { TableContext } from "@/Components/Table/TableContext";
import {
  TableHeaderCell,
  TableHeaderCellProps,
} from "@/Components/Table/TableHeaderCell";
import {
  TableDataCell,
  TableDataCellProps,
} from "@/Components/Table/TableDataCell";

type TableComponent = ForwardRefExoticComponent<
  TableProps & RefAttributes<HTMLTableElement>
> & {
  Head: ForwardRefExoticComponent<
    TableHeadProps & RefAttributes<HTMLTableSectionElement>
  >;
  Body: ForwardRefExoticComponent<
    TableBodyProps & RefAttributes<HTMLTableSectionElement>
  >;
  Row: ForwardRefExoticComponent<
    TableRowProps & RefAttributes<HTMLTableRowElement>
  >;
  HeaderCell: ForwardRefExoticComponent<
    TableHeaderCellProps & RefAttributes<HTMLTableHeaderCellElement>
  >;
  DataCell: ForwardRefExoticComponent<
    TableDataCellProps & RefAttributes<HTMLTableDataCellElement>
  >;
};

export type TableProps = {
  zebra?: boolean;
  className?: string;
};

export type TableType = TableProps & RefAttributes<HTMLTableElement>;

const Table: TableType = forwardRef(({ className, zebra, ...props }, ref) => {
  return (
    <TableContext.Provider value={{ didMount: true }}>
      <table
        className={cn("table", className, { "table-zebra": zebra })}
        ref={ref}
        {...props}
      />
    </TableContext.Provider>
  );
}) as TableComponent;

Table.Head = TableHead;
Table.Body = TableBody;
Table.Row = TableRow;
Table.HeaderCell = TableHeaderCell;
Table.DataCell = TableDataCell;

export default Table;
