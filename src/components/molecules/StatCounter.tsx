"use client";

import type { LucideIcon } from "lucide-react";
import { Icon } from "@/components/atoms";
import { cn } from "@/lib/utils";

export interface StatCounterProps {
  value: string;
  label: string;
  icon?: LucideIcon;
  className?: string;
}

export function StatCounter({
  value,
  label,
  icon,
  className,
}: StatCounterProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center",
        className
      )}
    >
      {icon && (
        <Icon
          icon={icon}
          size="lg"
          className="mb-2 text-primary-500"
          aria-hidden
        />
      )}
      <span className="text-3xl font-bold text-primary-500">{value}</span>
      <span className="mt-1 text-base text-neutral-500">{label}</span>
    </div>
  );
}
