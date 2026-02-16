"use client";

import { Badge, Button } from "@/components/atoms";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

export interface EventCardProps {
  dateStart: string;
  dateEnd: string;
  title: string;
  category: string;
  location: string;
  time: string;
  availableSlots?: number;
  onRegister?: () => void;
}

function formatDay(isoDate: string): string {
  return new Date(isoDate).getDate().toString();
}

function formatMonth(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("de-DE", { month: "short" });
}

export function EventCard({
  dateStart,
  dateEnd,
  title,
  category,
  location,
  time,
  availableSlots,
  onRegister,
}: EventCardProps) {
  const isSameDay = dateStart === dateEnd;

  return (
    <article
      className={cn(
        "flex flex-col gap-4 rounded-xl bg-white p-6 shadow-card transition-all",
        "border-l-4 border-l-transparent hover:shadow-hover hover:border-l-primary-500",
        "md:flex-row md:items-start"
      )}
    >
      <div className="flex shrink-0 flex-col rounded-lg bg-primary-50 px-4 py-3 text-center">
        <span className="text-2xl font-bold text-primary-700">
          {formatDay(dateStart)}
        </span>
        <span className="text-sm font-medium text-primary-600">
          {formatMonth(dateStart)}
          {!isSameDay && ` – ${formatMonth(dateEnd)}`}
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="text-lg font-semibold text-neutral-800">{title}</h3>
        <p className="mt-1 text-sm text-neutral-600">{location}</p>
        <p className="text-sm text-neutral-500">{time}</p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Badge variant="category">{category}</Badge>
          {availableSlots !== undefined && availableSlots > 0 && (
            <Badge variant="success">{availableSlots} Plätze frei</Badge>
          )}
        </div>
      </div>

      {onRegister && (
        <div className="shrink-0 md:self-center">
          <Button variant="primary" size="sm" onClick={onRegister}>
            Anmelden
          </Button>
        </div>
      )}
    </article>
  );
}
