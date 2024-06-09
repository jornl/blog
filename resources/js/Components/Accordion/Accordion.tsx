import {
  forwardRef,
  ForwardRefExoticComponent,
  HTMLAttributes,
  ReactNode,
  RefAttributes,
} from "react";
import {
  AccordionItem,
  AccordionItemProps,
} from "@/Components/Accordion/AccordionItem";
import {
  AccordionHeader,
  AccordionHeaderProps,
} from "@/Components/Accordion/AccordionHeader";
import { cn } from "@/Utilities/utils";
import { AccordionContext } from "@/Components/Accordion/AccordionContext";
import {
  AccordionContent,
  AccordionContentProps,
} from "@/Components/Accordion/AccordionContent";

type AccordionComponent = ForwardRefExoticComponent<
  AccordionProps & RefAttributes<HTMLDivElement>
> & {
  Item: ForwardRefExoticComponent<
    AccordionItemProps & RefAttributes<HTMLDivElement>
  >;
  Header: ForwardRefExoticComponent<
    AccordionHeaderProps & RefAttributes<HTMLButtonElement>
  >;
  Content: ForwardRefExoticComponent<
    AccordionContentProps & RefAttributes<HTMLDivElement>
  >;
};

export type AccordionProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  ({ className, ...props }, ref) => {
    return (
      <AccordionContext.Provider
        value={{
          didMount: true,
        }}
      >
        <div className={cn("", className)} {...props} ref={ref} />
      </AccordionContext.Provider>
    );
  },
) as AccordionComponent;

Accordion.Item = AccordionItem;
Accordion.Header = AccordionHeader;
Accordion.Content = AccordionContent;

export default Accordion;
