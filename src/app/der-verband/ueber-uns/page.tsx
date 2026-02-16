"use client";

import { useState } from "react";
import { ContentPage } from "@/components/templates/ContentPage";
import { PlaceholderImage } from "@/components/organisms/PlaceholderImage";
import { siteContent } from "@/lib/siteContent";
import {
  UsersRound,
  ShieldCheck,
  Briefcase,
  HeartHandshake,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

const processConfig = [
  {
    Icon: UsersRound,
    kurzbeschreibung: "Zusammenschluss, Interessenvertretung und kollegiales Miteinander",
  },
  {
    Icon: ShieldCheck,
    kurzbeschreibung: "Verkehrssicherheit, Forschung und qualifizierte Ausbildung",
  },
  {
    Icon: Briefcase,
    kurzbeschreibung: "Berufsbild stärken und Betriebe unterstützen",
  },
  {
    Icon: HeartHandshake,
    kurzbeschreibung: "Soziale Sicherung und Rechtsberatung für Mitglieder",
  },
] as const;

export default function UeberUnsPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <ContentPage
      title="Der Landesverband Sächsischer Fahrlehrer"
      subtitle="Seit 1991 die Interessenvertretung für sächsische Fahrlehrer"
      breadcrumbItems={[
        { label: "Startseite", href: "/" },
        { label: "Der Verband", href: "/der-verband/ueber-uns" },
        { label: "Über uns", href: "/der-verband/ueber-uns" },
      ]}
    >
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-2xl font-bold text-primary-500">
                Über den Verband
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-neutral-700">
                {siteContent.ueberUns.einleitung}
              </p>
            </div>
            <PlaceholderImage
              slotId="verband.ueber-uns"
              label="Mitgliederversammlung"
              iconName="Users"
              className="aspect-[4/3] w-full"
            />
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-primary-500">
            Aufgaben und Ziele
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-neutral-600">
            Der Landesverband verfolgt folgende satzungsgemäße Ziele – vier
            Säulen, die unsere Arbeit tragen:
          </p>

          {/* Process: 4 Säulen, Icons zentriert neben den Containern */}
          <div className="mt-16">
            <div className="space-y-0">
              {siteContent.ueberUns.aufgabenGruppen.map((gruppe, index) => {
                const { Icon, kurzbeschreibung } = processConfig[index];
                const isExpanded = expandedId === gruppe.titel;
                const isLast = index === siteContent.ueberUns.aufgabenGruppen.length - 1;

                return (
                  <div key={gruppe.titel}>
                    <div className="flex items-stretch gap-6">
                      {/* Icon zentriert neben dem Container */}
                      <div className="flex shrink-0 flex-col justify-center">
                        <div
                          className="flex size-14 shrink-0 items-center justify-center rounded-full border-4 border-white bg-primary-500 text-white shadow-card sm:size-16"
                          aria-hidden
                        >
                          <Icon className="size-6 sm:size-7" strokeWidth={2} />
                        </div>
                      </div>

                      {/* Inhalt */}
                      <div className="min-w-0 flex-1 pb-4">
                        <div
                          className={cn(
                            "rounded-xl border-l-4 border-l-transparent bg-white p-6 shadow-card transition-all duration-200",
                            "hover:shadow-hover hover:border-l-primary-500"
                          )}
                        >
                          <div className="flex items-start gap-4">
                            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary-50">
                              <Icon className="size-6 text-primary-600" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h3 className="text-xl font-semibold text-primary-600">
                                {gruppe.titel}
                              </h3>
                              <p className="mt-1 text-sm text-neutral-500">
                                {kurzbeschreibung}
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              setExpandedId(
                                isExpanded ? null : gruppe.titel
                              )
                            }
                            className="mt-4 flex items-center gap-2 text-sm font-medium text-primary-500 transition-colors hover:text-primary-600"
                          >
                            {isExpanded
                              ? "Weniger anzeigen"
                              : `${gruppe.items.length} satzungsgemäße Ziele anzeigen`}
                            <ChevronDown
                              className={cn(
                                "size-4 transition-transform duration-200",
                                isExpanded && "rotate-180"
                              )}
                            />
                          </button>

                          {isExpanded && (
                            <ul className="mt-6 space-y-3 border-t border-neutral-200 pt-6">
                              {gruppe.items.map((text) => (
                                <li
                                  key={text}
                                  className="flex gap-3 text-base leading-relaxed text-neutral-700"
                                >
                                  <span
                                    className="mt-[0.65em] size-1.5 shrink-0 rounded-full bg-primary-400"
                                    aria-hidden
                                  />
                                  <span>{text}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Verbindungslinie zwischen den Säulen – nicht nach der 4. */}
                    {!isLast && (
                      <div className="flex items-center gap-6">
                        <div className="flex w-14 shrink-0 justify-center sm:w-16">
                          <div
                            className="h-8 w-px bg-primary-200"
                            aria-hidden
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </ContentPage>
  );
}
