import { cn } from "@/lib/utils";

export interface SkeletonProps {
  variant?: "text" | "card" | "avatar";
  className?: string;
}

const variantClasses = {
  text: "h-4 w-3/4",
  card: "h-48 w-full",
  avatar: "h-12 w-12 rounded-full",
};

export function Skeleton({ variant = "text", className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-neutral-200",
        variantClasses[variant],
        className
      )}
      aria-hidden
    />
  );
}
