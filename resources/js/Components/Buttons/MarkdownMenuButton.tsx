import { cn } from "@/Utilities/utils";
import { ButtonHTMLAttributes } from "react";

type MarkdownButtonType = {
  active?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function MarkdownMenuButton({
  active = false,
  className = "",
  children,
  ...props
}: MarkdownButtonType) {
  return (
    <button
      className={cn(
        "px-3 py-2 bg-base-200 hover:bg-base-300",
        { "bg-base-300": active },
        className,
      )}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}
