import { cn, OverridableComponent } from "@/Utilities/utils";
import { ElementType, forwardRef, HTMLAttributes, ReactNode } from "react";

interface HeaderProps extends HTMLAttributes<HTMLHeadingElement> {
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: ReactNode;
}

const Header: OverridableComponent<HeaderProps, HTMLHeadingElement> =
  forwardRef(({ as = "h1", className, children, ...props }, ref) => {
    const Component = as as ElementType;

    return (
      <Component className={cn("text-2xl", className)} ref={ref} {...props}>
        {children}
      </Component>
    );
  });

export default Header;
