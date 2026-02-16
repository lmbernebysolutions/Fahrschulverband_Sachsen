import { cn } from "@/lib/utils";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export function Label({
  children,
  className,
  required,
  ...props
}: LabelProps) {
  return (
    <label
      className={cn(
        "block text-base font-medium text-neutral-800",
        className
      )}
      {...props}
    >
      {children}
      {required && (
        <span className="ml-1 text-red-600" aria-hidden>
          *
        </span>
      )}
    </label>
  );
}
