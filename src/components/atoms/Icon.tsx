import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface IconProps {
  icon: LucideIcon;
  size?: "sm" | "md" | "lg";
  className?: string;
  "aria-label"?: string;
}

const sizeClasses = {
  sm: "size-4",
  md: "size-6",
  lg: "size-8",
};

export function Icon({
  icon: IconComponent,
  size = "md",
  className,
  "aria-label": ariaLabel,
}: IconProps) {
  return (
    <IconComponent
      className={cn("shrink-0", sizeClasses[size], className)}
      aria-hidden={!ariaLabel}
      aria-label={ariaLabel}
    />
  );
}
