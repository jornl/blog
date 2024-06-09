import { createContext } from "react";

export type AccordionContextType = {
  didMount: boolean;
};

export const AccordionContext = createContext<AccordionContextType | null>({
  didMount: false,
});
