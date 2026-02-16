import { MapPin, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

export type ListingType = "verkauf" | "suche" | "kooperation" | "default";

export interface ListingCardProps {
  type?: ListingType;
  date: string;
  title: string;
  description?: string;
  location?: string;
  contact?: string;
  contactHref?: string;
  className?: string;
}

const typeConfig: Record<ListingType, { label: string; badgeClass: string }> = {
  verkauf: { label: "Verkauf", badgeClass: "bg-green-100 text-green-700" },
  suche: { label: "Suche", badgeClass: "bg-blue-100 text-blue-700" },
  kooperation: { label: "Kooperation", badgeClass: "bg-primary-50 text-primary-700" },
  default: { label: "Anzeige", badgeClass: "bg-neutral-200 text-neutral-700" },
};

export function ListingCard({
  type = "default",
  date,
  title,
  description,
  location,
  contact,
  contactHref,
  className,
}: ListingCardProps) {
  const config = typeConfig[type];

  return (
    <article
      className={cn(
        "rounded-xl border border-neutral-200 bg-white p-6 shadow-card transition-all",
        "border-l-4 border-l-transparent hover:shadow-hover hover:border-l-primary-500",
        className
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className={cn("rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider", config.badgeClass)}>
          {config.label}
        </span>
        <time className="text-sm text-neutral-500" dateTime={date}>
          {date}
        </time>
      </div>
      <h3 className="mt-3 text-lg font-semibold text-neutral-800">{title}</h3>
      {description && (
        <p className="mt-2 text-neutral-700">{description}</p>
      )}
      <div className="mt-4 flex flex-wrap items-center gap-4">
        {location && (
          <span className="flex items-center gap-2 text-sm text-neutral-600">
            <MapPin className="size-4 text-primary-600" />
            {location}
          </span>
        )}
        {(contact || contactHref) && (
          contactHref ? (
            <a
              href={contactHref}
              className="flex items-center gap-2 font-medium text-primary-500 hover:underline"
            >
              <Mail className="size-4" />
              {contact ?? "Kontakt →"}
            </a>
          ) : contact ? (
            <span className="flex items-center gap-2 text-sm text-neutral-600">
              <Mail className="size-4" />
              {contact}
            </span>
          ) : null
        )}
      </div>
    </article>
  );
}
