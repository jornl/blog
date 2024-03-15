import {
  forwardRef,
  InputHTMLAttributes,
  useImperativeHandle,
  useRef,
} from "react";
import { cn } from "@/Utilities/utils";

const FormInput = forwardRef(function (
  {
    type = "text",
    className = "",
    ...props
  }: InputHTMLAttributes<HTMLInputElement>,
  ref,
) {
  const localRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => ({
    focus: () => {
      localRef.current?.focus();
    },
  }));

  return (
    <input
      ref={localRef}
      {...props}
      type={type}
      className={cn("input input-bordered", className)}
    />
  );
});

export default FormInput;
