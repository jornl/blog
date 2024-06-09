import { forwardRef, HTMLAttributes, ReactNode, useContext } from "react";
import { AccordionItemContext } from "@/Components/Accordion/AccordionItem";
import { cn } from "@/Utilities/utils";

export type AccordionContentProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};

export const AccordionContent = forwardRef<
  HTMLDivElement,
  AccordionContentProps
>(({ children, className, ...props }, ref) => {
  const itemContext = useContext(AccordionItemContext);

  if (!itemContext) {
    console.log("AccordionContent must be used within AccordionItem!");
    return;
  }

  return (
    <div
      className={cn(
        "mb-2 transition-all ease-in-out duration-300",
        { "bg-base-200 rounded-b-md": itemContext.open },
        className,
      )}
      aria-hidden={itemContext.open ?? undefined}
      {...props}
      ref={ref}
    >
      {itemContext.open && <>{children}</>}
    </div>
  );
});
