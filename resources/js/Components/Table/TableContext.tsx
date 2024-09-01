import { createContext } from "react";

export type TableContextType = {
  didMount: boolean;
};

export const TableContext = createContext<TableContextType>({
  didMount: false,
});
