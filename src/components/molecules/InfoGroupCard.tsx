import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InfoGroupCardProps {
  icon: LucideIcon;
  title: string;
  items: string[];
  className?: string;
}

export function InfoGroupCard({
  icon: Icon,
  title,
  items,
  className,
}: InfoGroupCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl bg-white p-6 shadow-card transition-transform duration-200",
        "border-l-4 border-l-transparent hover:-translate-y-1 hover:shadow-hover hover:border-l-primary-500",
        className
      )}
    >
      <Icon className="size-12 text-primary-500" />
      <h3 className="mt-4 text-lg font-semibold text-primary-500">{title}</h3>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-base leading-relaxed text-neutral-700">
            <span
              className="mt-[0.65em] size-1.5 shrink-0 rounded-full bg-primary-400"
              aria-hidden
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
