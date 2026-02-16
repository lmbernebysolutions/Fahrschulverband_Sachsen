import Link from "next/link";
import { Badge } from "@/components/atoms";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

export interface NewsCardProps {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  isNew?: boolean;
  category?: string;
}

export function NewsCard({
  title,
  date,
  excerpt,
  slug,
  isNew,
  category,
}: NewsCardProps) {
  return (
    <Link
      href={`/aktuelles/${slug}`}
      className={cn(
        "group flex flex-col rounded-xl bg-white p-4 shadow-card sm:p-6",
        "cursor-pointer transition-all duration-200",
        "border-l-4 border-l-transparent hover:-translate-y-0.5 hover:shadow-hover hover:border-l-primary-500"
      )}
    >
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="text-sm text-neutral-500">{formatDate(date)}</span>
        {isNew && (
          <Badge variant="new">Neu</Badge>
        )}
        {category && (
          <Badge variant="category">{category}</Badge>
        )}
      </div>
      <h3 className="text-lg font-semibold text-neutral-800">{title}</h3>
      <p className="mt-2 line-clamp-3 text-base text-neutral-600">{excerpt}</p>
      <span className="mt-4 inline-flex items-center font-medium text-primary-500 group-hover:underline">
        Weiterlesen →
      </span>
    </Link>
  );
}
