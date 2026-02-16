import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "min-h-[48px] w-full rounded-md border px-4 py-3 text-base",
          "bg-white text-neutral-800 placeholder:text-neutral-400",
          "transition-colors duration-200",
          "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
          "disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:opacity-60",
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-neutral-300 hover:border-neutral-400",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
