"use client";

import Link from "next/link";
import { useSiteData } from "@/context/SiteDataContext";
import { NewsCard } from "@/components/molecules";
import { Input } from "@/components/atoms";
import { Search } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const categoryLabels: Record<string, string> = {
  fortbildung: "Fortbildung",
  verband: "Verband",
  mitglieder: "Mitglieder",
  allgemein: "Allgemein",
};

export interface NewsGridProps {
  /** Vollansicht auf /aktuelles: Liste untereinander, Suche, kein "Alle Meldungen"-Button */
  variant?: "full" | "teaser";
}

export function NewsGrid({ variant = "teaser" }: NewsGridProps) {
  const { news } = useSiteData();
  const [filter, setFilter] = useState<string>("alle");
  const [search, setSearch] = useState("");
  const published = news.filter((n) => n.isPublished);

  const byCategory =
    filter === "alle"
      ? published
      : published.filter((n) => n.category === filter);

  const filtered = search.trim()
    ? byCategory.filter(
        (n) =>
          n.title.toLowerCase().includes(search.toLowerCase()) ||
          n.excerpt.toLowerCase().includes(search.toLowerCase()) ||
          n.content.toLowerCase().includes(search.toLowerCase())
      )
    : byCategory;

  const isFull = variant === "full";

  return (
    <section>
      <div className="mb-8 space-y-4">
        <div className="flex flex-wrap justify-center gap-2">
          {["alle", "fortbildung", "verband", "mitglieder", "allgemein"].map(
            (cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={cn(
                  "min-h-[48px] rounded-md px-4 py-2 text-sm font-medium transition-colors",
                  filter === cat
                    ? "bg-primary-500 text-white"
                    : "bg-neutral-200 text-neutral-700 hover:bg-neutral-300"
                )}
              >
                {cat === "alle" ? "Alle" : categoryLabels[cat]}
              </button>
            )
          )}
        </div>
        {isFull && (
          <div className="mx-auto max-w-md">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-neutral-400" />
              <Input
                type="search"
                placeholder="Meldungen durchsuchen..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-12"
                aria-label="Meldungen durchsuchen"
              />
            </div>
          </div>
        )}
      </div>
      <div
        className={cn(
          isFull ? "flex flex-col gap-6" : "grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        )}
      >
        {filtered.map((article) => (
          <NewsCard
            key={article.id}
            title={article.title}
            date={article.date}
            excerpt={article.excerpt}
            slug={article.slug}
            isNew={article.isFeatured}
            category={categoryLabels[article.category]}
          />
        ))}
      </div>
      {isFull === false && filtered.length > 0 && (
        <div className="mt-8 text-center">
          <Link
            href="/aktuelles"
            className="inline-flex items-center font-medium text-primary-500 hover:underline"
          >
            Alle Meldungen →
          </Link>
        </div>
      )}
    </section>
  );
}
