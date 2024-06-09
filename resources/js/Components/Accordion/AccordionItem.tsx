import {
  createContext,
  forwardRef,
  HTMLAttributes,
  ReactNode,
  useContext,
  useState,
} from "react";
import { cn } from "@/Utilities/utils";
import { AccordionContext } from "@/Components/Accordion/AccordionContext";

export type AccordionItemProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  open?: boolean;
};

export type AccordionItemContextProps = {
  open: boolean;
  toggleOpen: () => void;
};

export const AccordionItemContext =
  createContext<AccordionItemContextProps | null>(null);

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ children, open, className, ...props }, ref) => {
    const [_open, _setOpen] = useState(false);
    const context = useContext(AccordionContext);

    if (context?.didMount === false) {
      console.log("AccordionItem must be used within Accordion!");
    }

    const toggleOpen = () => {
      _setOpen((prev) => !prev);
    };

    return (
      <div className={cn("", className)} {...props} ref={ref}>
        <AccordionItemContext.Provider
          value={{ open: _open, toggleOpen: toggleOpen }}
        >
          {children}
        </AccordionItemContext.Provider>
      </div>
    );
  },
);
