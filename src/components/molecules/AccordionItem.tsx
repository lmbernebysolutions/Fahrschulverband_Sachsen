"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Badge } from "@/components/atoms";
import { cn } from "@/lib/utils";

export interface AccordionItemProps {
  title: string;
  badge?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  isOpen?: boolean;
  onToggle?: () => void;
  className?: string;
}

export function AccordionItem({
  title,
  badge,
  children,
  defaultOpen = false,
  isOpen: controlledOpen,
  onToggle,
  className,
}: AccordionItemProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const handleToggle = () => {
    if (isControlled && onToggle) {
      onToggle();
    } else {
      setInternalOpen(!internalOpen);
    }
  };

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-card",
        className
      )}
    >
      <button
        type="button"
        onClick={handleToggle}
        className="flex w-full items-center justify-between gap-4 p-6 text-left transition-colors hover:bg-neutral-50"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-neutral-800">{title}</span>
        <span className="flex items-center gap-2">
          {badge && (
            <Badge variant="category">{badge}</Badge>
          )}
          <ChevronDown
            className={cn(
              "size-5 shrink-0 text-neutral-500 transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </span>
      </button>
      {isOpen && (
        <div className="border-t border-neutral-200 bg-neutral-50 p-6">
          {children}
        </div>
      )}
    </div>
  );
}
