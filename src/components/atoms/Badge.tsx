import { cn } from "@/lib/utils";

export interface BadgeProps {
  variant?: "default" | "success" | "warning" | "new" | "category";
  children: React.ReactNode;
  className?: string;
}

const variantClasses = {
  default: "bg-neutral-200 text-neutral-700",
  success: "bg-green-50 text-green-700",
  warning: "bg-accent-100 text-accent-600",
  new: "bg-accent-100 text-accent-600",
  category: "bg-primary-50 text-primary-700",
};

export function Badge({
  variant = "default",
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
