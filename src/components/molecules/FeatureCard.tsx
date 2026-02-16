import type { LucideIcon } from "lucide-react";
import { Icon } from "@/components/atoms";
import { cn } from "@/lib/utils";

export interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({
  icon,
  title,
  description,
  className,
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-start gap-3 rounded-xl bg-white p-6 shadow-card transition-all duration-200",
        "border-l-4 border-l-transparent hover:-translate-y-1 hover:shadow-hover hover:border-l-primary-500",
        className
      )}
    >
      <Icon icon={icon} size="lg" className="text-primary-500" />
      <h3 className="text-lg font-semibold text-neutral-800">{title}</h3>
      <p className="text-base text-neutral-600">{description}</p>
    </div>
  );
}
