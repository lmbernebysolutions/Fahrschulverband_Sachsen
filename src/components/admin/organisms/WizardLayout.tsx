"use client";

import { StepIndicator, type StepItem } from "./StepIndicator";
import { cn } from "@/lib/utils";

export interface WizardLayoutProps {
  title: string;
  steps: StepItem[];
  children: React.ReactNode;
  className?: string;
}

export function WizardLayout({
  title,
  steps,
  children,
  className,
}: WizardLayoutProps) {
  return (
    <div className={cn("space-y-8", className)}>
      <header>
        <h1 className="text-3xl font-bold text-neutral-900">{title}</h1>
        <div className="mt-4">
          <StepIndicator steps={steps} />
        </div>
      </header>
      <div className="rounded-xl border border-neutral-200 bg-white p-8 shadow-sm">
        {children}
      </div>
    </div>
  );
}
