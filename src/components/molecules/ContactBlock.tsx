"use client";

import type { LucideIcon } from "lucide-react";
import { Icon } from "@/components/atoms";
import { cn } from "@/lib/utils";

export interface ContactBlockProps {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
  className?: string;
}

export function ContactBlock({
  icon,
  label,
  value,
  href,
  className,
}: ContactBlockProps) {
  const content = (
    <>
      <Icon icon={icon} size="md" className="text-primary-500" aria-hidden />
      <div>
        <span className="block text-sm font-medium text-neutral-500">{label}</span>
        <span className="mt-1 block text-base font-medium text-neutral-800">
          {value}
        </span>
      </div>
    </>
  );

  const sharedClasses = cn(
    "flex items-start gap-4 rounded-xl bg-gradient-to-br from-white to-neutral-50 p-6 shadow-card transition-all duration-200",
    "hover:shadow-hover hover:border-l-4 hover:border-l-primary-500 border-l-4 border-l-transparent",
    className
  );

  if (href) {
    return (
      <a
        href={href}
        className={cn(
          sharedClasses,
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
        )}
      >
        {content}
      </a>
    );
  }

  return <div className={sharedClasses}>{content}</div>;
}
