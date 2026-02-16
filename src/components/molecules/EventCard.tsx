"use client";

import { Badge, Button } from "@/components/atoms";
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

/** Datumsbereich für Vorschau: Monat nie doppelt, einheitliche Abkürzungen (Okt., Nov.). */
function formatEventDateRange(dateStart: string, dateEnd: string): { dayLine: string; monthLine: string } {
  const dStart = new Date(dateStart);
  const dEnd = new Date(dateEnd);
  const dayS = dStart.getDate();
  const dayE = dEnd.getDate();
  const sameDay = dateStart === dateEnd;
  const sameMonth = dStart.getMonth() === dEnd.getMonth() && dStart.getFullYear() === dEnd.getFullYear();

  const monthLong = (d: Date) => d.toLocaleDateString("de-DE", { month: "long" });
  const monthShort = (d: Date) => d.toLocaleDateString("de-DE", { month: "short" }).replace(/\.$/, "") + ".";

  if (sameDay) {
    return { dayLine: dayS.toString(), monthLine: monthLong(dStart) };
  }
  if (sameMonth) {
    return { dayLine: `${dayS}. – ${dayE}.`, monthLine: monthLong(dStart) };
  }
  return { dayLine: `${dayS}. ${monthShort(dStart)} – ${dayE}. ${monthShort(dEnd)}`, monthLine: "" };
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
  const { dayLine, monthLine } = formatEventDateRange(dateStart, dateEnd);

  return (
    <article
      className={cn(
        "flex flex-col gap-4 rounded-xl bg-white p-6 shadow-card transition-all",
        "border-l-4 border-l-transparent hover:shadow-hover hover:border-l-primary-500",
        "md:flex-row md:items-start"
      )}
    >
      <div className="flex shrink-0 flex-col rounded-lg bg-primary-50 px-4 py-3 text-center">
        <span className={cn(
          "font-bold leading-tight text-primary-700",
          monthLine ? "text-2xl" : "text-sm"
        )}>
          {dayLine}
        </span>
        {monthLine && (
          <span className="mt-1 text-sm font-medium text-primary-600">
            {monthLine}
          </span>
        )}
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
