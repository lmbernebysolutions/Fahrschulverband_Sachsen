"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href: string;
}

const pathLabels: Record<string, string> = {
  "der-verband": "Der Verband",
  "ueber-uns": "Über uns",
  mitgliedschaft: "Mitgliedschaft",
  arbeitskreise: "Arbeitskreise",
  "bezirks-kreisverbaende": "Bezirks-/Kreisverbände",
  "fuer-fahrschulen": "Für Fahrschulen",
  "termine-fortbildung": "Termine Fortbildung",
  fahrschulmarkt: "Fahrschulmarkt",
  "fuer-fahrschueler": "Für Fahrschüler",
  fahrschulsuche: "Fahrschulsuche",
  berufskraftfahrer: "Berufskraftfahrer",
  aufbauseminare: "Aufbauseminare",
  "mobil-ohne-angst": "Mobil ohne Angst",
  fahreignungsseminare: "Fahreignungsseminare",
  behindertenausbildung: "Behindertenausbildung",
  aktuelles: "Aktuelles",
  kontakt: "Kontakt",
  mitgliederbereich: "Mitgliederbereich",
  impressum: "Impressum",
  datenschutz: "Datenschutz",
};

export interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  const pathname = usePathname();

  const breadcrumbItems: BreadcrumbItem[] =
    items ??
    (() => {
      const segments = pathname.split("/").filter(Boolean);
      const result: BreadcrumbItem[] = [
        { label: "Startseite", href: "/" },
      ];
      let href = "";
      for (const segment of segments) {
        href += `/${segment}`;
        const label =
          pathLabels[segment] ??
          segment
            .split("-")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" ");
        result.push({ label, href });
      }
      return result;
    })();

  if (breadcrumbItems.length <= 1) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex flex-wrap items-center gap-1 text-sm", className)}
    >
      {breadcrumbItems.map((item, i) => {
        const isLast = i === breadcrumbItems.length - 1;
        return (
          <span key={item.href} className="flex items-center gap-1">
            {i > 0 && (
              <ChevronRight
                className="size-4 text-neutral-400"
                aria-hidden
              />
            )}
            {isLast ? (
              <span className="font-medium text-neutral-700" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="text-neutral-500 hover:text-primary-600 hover:underline"
              >
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
