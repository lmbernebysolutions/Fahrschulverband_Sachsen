"use client";

import { cn } from "@/lib/utils";

export type StepStatus = "completed" | "current" | "upcoming";

export interface StepItem {
  label: string;
  status: StepStatus;
}

export interface StepIndicatorProps {
  steps: StepItem[];
  className?: string;
}

export function StepIndicator({ steps, className }: StepIndicatorProps) {
  return (
    <nav aria-label="Fortschritt" className={cn("flex items-center gap-2", className)}>
      {steps.map((step, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className={cn(
              "flex min-h-[48px] min-w-[48px] items-center justify-center rounded-full border-2 text-lg font-semibold transition-colors",
              step.status === "completed" &&
                "border-primary-600 bg-primary-600 text-white",
              step.status === "current" &&
                "border-primary-600 bg-primary-50 text-primary-800",
              step.status === "upcoming" &&
                "border-neutral-300 bg-white text-neutral-400"
            )}
            aria-current={step.status === "current" ? "step" : undefined}
          >
            {step.status === "completed" ? (
              <span aria-hidden>✓</span>
            ) : (
              <span>{i + 1}</span>
            )}
          </div>
          <span
            className={cn(
              "text-lg",
              step.status === "current" && "font-semibold text-neutral-900",
              step.status === "completed" && "text-neutral-600",
              step.status === "upcoming" && "text-neutral-400"
            )}
          >
            {step.label}
          </span>
          {i < steps.length - 1 && (
            <div
              className={cn(
                "mx-2 h-0.5 w-8 shrink-0 rounded",
                step.status === "completed" ? "bg-primary-400" : "bg-neutral-200"
              )}
              aria-hidden
            />
          )}
        </div>
      ))}
    </nav>
  );
}
