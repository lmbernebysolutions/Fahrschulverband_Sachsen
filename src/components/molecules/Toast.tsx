"use client";

import { CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ToastProps {
  variant?: "success" | "error";
  message: string;
  onDismiss?: () => void;
  className?: string;
}

export function Toast({
  variant = "success",
  message,
  onDismiss,
  className,
}: ToastProps) {
  const Icon = variant === "success" ? CheckCircle2 : XCircle;

  return (
    <div
      role="alert"
      className={cn(
        "flex items-center gap-3 rounded-lg border px-4 py-3 shadow-lg",
        variant === "success"
          ? "border-green-200 bg-green-50 text-green-800"
          : "border-red-200 bg-red-50 text-red-800",
        className
      )}
    >
      <Icon
        className={cn(
          "size-5 shrink-0",
          variant === "success" ? "text-green-600" : "text-red-600"
        )}
        aria-hidden
      />
      <p className="flex-1 font-medium">{message}</p>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="rounded p-1 hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          aria-label="Schließen"
        >
          ×
        </button>
      )}
    </div>
  );
}
