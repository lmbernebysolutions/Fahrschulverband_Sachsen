"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AdminBreadcrumbsProps {
  /** Breadcrumb labels. Last item is current page (no link). */
  items: string[];
  /** Optional base path for links: item 0 -> base, 1 -> base/segment1, etc. */
  basePath?: string;
  className?: string;
}

export function AdminBreadcrumbs({
  items,
  basePath = "/losleben-admin",
  className,
}: AdminBreadcrumbsProps) {
  if (!items.length) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "flex flex-wrap items-center gap-1 text-lg text-neutral-700",
        className
      )}
    >
      {items.map((label, i) => {
        const isFirst = i === 0;
        const isLast = i === items.length - 1;
        return (
          <span key={i} className="flex items-center gap-1">
            {i > 0 && (
              <ChevronRight
                className="size-5 text-neutral-400 shrink-0"
                aria-hidden
              />
            )}
            {isLast ? (
              <span
                className="font-semibold text-neutral-900"
                aria-current="page"
              >
                {label}
              </span>
            ) : isFirst ? (
              <Link
                href={basePath}
                className="text-neutral-600 hover:text-primary-600 hover:underline"
              >
                {label}
              </Link>
            ) : (
              <span className="text-neutral-600">{label}</span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
