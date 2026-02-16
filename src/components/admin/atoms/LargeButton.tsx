"use client";

import type { LucideIcon } from "lucide-react";
import { Loader2 } from "lucide-react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface LargeButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "xl" | "2xl";
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
    "border-2 border-primary-500 text-primary-600 bg-transparent hover:bg-primary-50 focus-visible:ring-primary-500",
  ghost:
    "text-primary-600 bg-transparent hover:bg-primary-50 focus-visible:ring-primary-500",
  danger:
    "bg-red-600 text-white font-semibold hover:bg-red-700 active:bg-red-800 focus-visible:ring-red-500",
};

const sizeClasses = {
  xl: "min-h-[56px] px-8 py-4 text-xl rounded-lg",
  "2xl": "min-h-[64px] px-10 py-5 text-2xl rounded-xl",
};

const iconSizeClasses = {
  xl: "size-6",
  "2xl": "size-7",
};

const LargeButton = forwardRef<HTMLButtonElement, LargeButtonProps>(
  (
    {
      variant = "primary",
      size = "xl",
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
    const iconSize = iconSizeClasses[size];

    return (
      <button
        ref={ref}
        type="button"
        disabled={isDisabled}
        className={cn(
          "inline-flex cursor-pointer items-center justify-center gap-3 transition-colors duration-200",
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
          <Loader2 className={cn(iconSize, "shrink-0 animate-spin")} aria-hidden />
        ) : Icon && iconPosition === "left" ? (
          <Icon className={cn(iconSize, "shrink-0")} aria-hidden />
        ) : null}
        {children}
        {!loading && Icon && iconPosition === "right" ? (
          <Icon className={cn(iconSize, "shrink-0")} aria-hidden />
        ) : null}
      </button>
    );
  }
);

LargeButton.displayName = "LargeButton";

export { LargeButton };
