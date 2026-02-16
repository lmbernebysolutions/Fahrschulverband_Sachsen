import Link from "next/link";
import { FileText, Download, Package } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DocumentCardProps {
  title: string;
  meta?: string;
  href?: string;
  type?: "document" | "product";
  price?: string;
  ctaText?: string;
  className?: string;
}

export function DocumentCard({
  title,
  meta,
  href,
  type = "document",
  price,
  ctaText,
  className,
}: DocumentCardProps) {
  const Icon = type === "document" ? FileText : Package;
  const defaultCta = type === "document" ? "Download PDF" : "Bestellen";
  const label = ctaText ?? defaultCta;

  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-xl border border-neutral-200 bg-white p-6 shadow-card transition-all sm:flex-row sm:items-center sm:justify-between",
        "border-l-4 border-l-transparent hover:shadow-hover hover:border-l-primary-500",
        className
      )}
    >
      <div className="flex items-start gap-4">
        <Icon className="size-10 shrink-0 text-primary-500" />
        <div>
          <h3 className="font-semibold text-neutral-800">{title}</h3>
          {meta && (
            <p className="mt-1 text-sm text-neutral-500">{meta}</p>
          )}
          {price && (
            <p className="mt-1 text-sm font-medium text-neutral-700">{price}</p>
          )}
        </div>
      </div>
      {href && (
        <Link
          href={href}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-primary-500 px-5 py-2.5 text-base font-semibold text-white transition-colors hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
        >
          <Download className="size-4" />
          {label}
        </Link>
      )}
    </div>
  );
}
