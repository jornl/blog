import { forwardRef, InputHTMLAttributes, useRef } from "react";
import { cn, mergeRefs } from "@/Utilities/utils";

export type FormInputProps = {
  type?: "text" | "password" | "email" | "file" | "number" | "tel";
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const FormInput = forwardRef(function (
  {
    type = "text",
    className = "",
    ...props
  }: InputHTMLAttributes<HTMLInputElement>,
  ref,
) {
  const localRef = useRef<HTMLInputElement>(null);

  const mergedRef = mergeRefs([ref, localRef]);

  return (
    <input
      ref={mergedRef}
      {...props}
      type={type}
      className={cn(
        {
          "input input-bordered": type !== "file",
          "file-input file-input-bordered": type === "file",
        },
        className,
      )}
    />
  );
});

export default FormInput;
