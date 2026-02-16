import { cn } from "@/lib/utils";

export interface BentoItemProps {
  children: React.ReactNode;
  className?: string;
  colSpan?: 1 | 2 | 3;
}

const colSpanClasses = {
  1: "",
  2: "md:col-span-2",
  3: "md:col-span-3",
};

export function BentoItem({
  children,
  className,
  colSpan = 1,
}: BentoItemProps) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-xl bg-white p-6 shadow-card",
        colSpanClasses[colSpan],
        className
      )}
    >
      {children}
    </div>
  );
}
