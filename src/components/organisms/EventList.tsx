"use client";

import { useSiteData } from "@/context/SiteDataContext";
import { EventCard } from "@/components/molecules";
import { Input } from "@/components/atoms";
import Link from "next/link";
import { Search } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const categories = ["alle", "§53(1)", "ASF/FES", "Weitere"] as const;

export interface EventListProps {
  /** Vollansicht auf /termine-fortbildung: Suche, kein "Alle Termine"-Button */
  variant?: "full" | "teaser";
}

export function EventList({ variant = "teaser" }: EventListProps) {
  const { seminars } = useSiteData();
  const [filter, setFilter] = useState<string>("alle");
  const [search, setSearch] = useState("");

  const byCategory =
    filter === "alle"
      ? seminars
      : seminars.filter((s) => s.category === filter);

  const filtered = search.trim()
    ? byCategory.filter(
        (s) =>
          s.title.toLowerCase().includes(search.toLowerCase()) ||
          s.location.toLowerCase().includes(search.toLowerCase()) ||
          s.description.toLowerCase().includes(search.toLowerCase())
      )
    : byCategory;

  const isFull = variant === "full";

  return (
    <section>
      <div className="mb-8 space-y-4">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
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
              {cat === "alle" ? "Alle" : cat}
            </button>
          ))}
        </div>
        {isFull && (
          <div className="mx-auto max-w-md">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-neutral-400" />
              <Input
                type="search"
                placeholder="Termine durchsuchen..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-12"
                aria-label="Termine durchsuchen"
              />
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-6">
        {filtered.map((seminar) => (
          <EventCard
            key={seminar.id}
            dateStart={seminar.dateStart}
            dateEnd={seminar.dateEnd}
            title={seminar.title}
            category={seminar.category}
            location={seminar.location}
            time={seminar.time}
            availableSlots={
              seminar.isOpen
                ? seminar.maxParticipants - seminar.currentParticipants
                : 0
            }
            onRegister={() => {
              /* Modal/Form öffnen – Mock */
            }}
          />
        ))}
      </div>
      {isFull === false && filtered.length > 0 && (
        <div className="mt-8 text-center">
          <Link
            href="/fuer-fahrschulen/termine-fortbildung"
            className="inline-flex items-center font-medium text-primary-500 hover:underline"
          >
            Alle Termine ansehen →
          </Link>
        </div>
      )}
    </section>
  );
}
