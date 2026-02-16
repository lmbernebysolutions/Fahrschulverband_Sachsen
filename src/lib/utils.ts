import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Kombiniert Klassen mit tailwind-merge für konfliktfreie Zusammenführung.
 * Verwendung: cn("px-4 py-2", className, condition && "bg-primary-500")
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formatiert ISO-Datum zu deutschem Format (z.B. "15. Februar 2026")
 */
export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
