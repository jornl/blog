import { ButtonHTMLAttributes, forwardRef, ReactNode, useContext } from "react";
import { cn } from "@/Utilities/utils";
import { AccordionItemContext } from "@/Components/Accordion/AccordionItem";

export type AccordionHeaderProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode;
};

export const AccordionHeader = forwardRef<
  HTMLButtonElement,
  AccordionHeaderProps
>(({ children, className, ...props }, ref) => {
  const itemContext = useContext(AccordionItemContext);

  if (!itemContext) {
    console.log("AccordionHeader must be used within AccordionItem!");
    return;
  }

  return (
    <button
      type="button"
      className={cn(
        "text-left w-full flex justify-between px-4 py-3 mb-1 rounded-t-md hover:bg-base-100 hover:rounded-md transition-all ease-in-out duration-200",
        { "bg-base-200": itemContext.open },
        className,
      )}
      onClick={itemContext.toggleOpen}
      aria-expanded={itemContext.open}
      {...props}
      ref={ref}
    >
      <span>{children}</span>
      <span>
        {itemContext.open ? (
          <i className="ri-arrow-down-s-fill"></i>
        ) : (
          <i className="ri-arrow-right-s-fill"></i>
        )}
      </span>
    </button>
  );
});
