"use client";

import { ChevronDown } from "lucide-react";
import { PersonCardWithImage } from "@/components/molecules";
import { useSiteData } from "@/context/SiteDataContext";
import { siteContent } from "@/lib/siteContent";

export function VorstandSection({
  vorstand,
}: {
  vorstand: typeof siteContent.vorstand;
}) {
  const { settings } = useSiteData();

  return (
    <div className="mt-12 grid gap-6 md:grid-cols-3">
      {vorstand.mitglieder.map((m) => (
        <PersonCardWithImage
          key={m.name}
          name={m.name}
          role={m.funktion}
          fahrschule={m.fahrschule}
          address={m.adresse}
          phone={m.mobil}
          imagePath={settings.imageAssignments?.[m.slotId]?.imagePath}
        />
      ))}
    </div>
  );
}

export function GeschaeftsstelleSection({
  geschaeftsstelle,
}: {
  geschaeftsstelle: typeof siteContent.vorstand.geschaeftsstelle;
}) {
  const { settings } = useSiteData();

  return (
    <div className="mt-12 grid gap-6 md:grid-cols-2">
      {geschaeftsstelle.mitarbeiter.map((m) => (
        <PersonCardWithImage
          key={m.name}
          name={m.name}
          phone={m.tel}
          email={m.email}
          imagePath={settings.imageAssignments?.[m.slotId]?.imagePath}
        >
          <details className="group/details">
            <summary className="flex cursor-pointer list-none items-center gap-2 py-1 text-sm font-medium text-neutral-700 hover:text-neutral-900 [&::-webkit-details-marker]:hidden">
              <ChevronDown className="size-4 shrink-0 text-neutral-500 transition-transform group-open/details:rotate-180" />
              <span>Aufgabengebiete</span>
            </summary>
            <ul className="mt-2 space-y-1 pl-6 text-sm text-neutral-600" role="list">
              {m.aufgaben.map((a) => (
                <li key={a} className="relative pl-2 before:absolute before:left-0 before:top-[0.5em] before:block before:size-1 before:rounded-full before:bg-primary-500 before:content-['']">
                  {a}
                </li>
              ))}
            </ul>
          </details>
        </PersonCardWithImage>
      ))}
    </div>
  );
}
