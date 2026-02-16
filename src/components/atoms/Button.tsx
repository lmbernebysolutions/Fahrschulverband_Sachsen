"use client";

import type { LucideIcon } from "lucide-react";
import { Loader2 } from "lucide-react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

const variantClasses = {
  primary:
    "bg-primary-500 text-white font-semibold hover:bg-primary-600 active:bg-primary-700 focus-visible:ring-primary-500",
  secondary:
    "border-2 border-primary-500 text-primary-500 bg-transparent hover:bg-primary-50 focus-visible:ring-primary-500",
  ghost:
    "text-primary-500 bg-transparent hover:bg-primary-50 focus-visible:ring-primary-500",
  danger:
    "bg-red-600 text-white font-semibold hover:bg-red-700 active:bg-red-800 focus-visible:ring-red-500",
};

const sizeClasses = {
  sm: "min-h-[48px] px-5 py-2.5 text-base",
  md: "min-h-[52px] px-7 py-3.5 text-lg",
  lg: "min-h-[56px] px-8 py-4 text-lg",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      icon: Icon,
      iconPosition = "left",
      fullWidth,
      loading,
      children,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type="button"
        disabled={isDisabled}
        className={cn(
          "inline-flex cursor-pointer items-center justify-center gap-2 rounded-md transition-colors duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-60",
          variantClasses[variant],
          sizeClasses[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {loading ? (
          <Loader2 className="size-5 animate-spin" aria-hidden />
        ) : Icon && iconPosition === "left" ? (
          <Icon className="size-5 shrink-0" aria-hidden />
        ) : null}
        {children}
        {!loading && Icon && iconPosition === "right" ? (
          <Icon className="size-5 shrink-0" aria-hidden />
        ) : null}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
