import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/Utilities/utils";

type ButtonProps = {
  className?: string;
  type?: "button" | "submit" | "reset";
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, type = "button", ...props }: ButtonProps, ref) => {
    return (
      <button type={type} ref={ref} className={cn("btn", className)} {...props}>
        {children}
      </button>
    );
  },
);

export default Button;
