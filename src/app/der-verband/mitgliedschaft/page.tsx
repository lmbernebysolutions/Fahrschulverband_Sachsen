"use client";

import { BookOpen, Mail, FileText, Phone, Euro, Download, Users } from "lucide-react";
import { ContentPage } from "@/components/templates/ContentPage";
import { PlaceholderImage } from "@/components/organisms/PlaceholderImage";
import { Button } from "@/components/atoms";
import { siteContent } from "@/lib/siteContent";
import { useSiteData } from "@/context/SiteDataContext";

const infoIcons = [BookOpen, FileText, Mail, FileText];

export default function MitgliedschaftPage() {
  const { membershipFees, settings } = useSiteData();
  const { intro, infoItems, finanzielleVorteile, telefonischeBeratung, beitrag, beitritt } = siteContent.mitgliedschaft;
  const feeRows = membershipFees.length > 0 ? membershipFees : beitrag.saetze.map((s, i) => ({ id: `fallback-${i}`, label: s.label, betrag: s.betrag, hinweis: s.hinweis }));

  return (
    <ContentPage
      title="Mitgliedschaft im Verband"
      subtitle="In einer Verbandsfahrschule sind Sie immer gut beraten"
      breadcrumbItems={[
        { label: "Startseite", href: "/" },
        { label: "Der Verband", href: "/der-verband/ueber-uns" },
        { label: "Mitgliedschaft", href: "/der-verband/mitgliedschaft" },
      ]}
    >
      {/* Intro – Startseiten-Stil: 2-Spalten mit Bild links, Text rechts */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:gap-16 lg:grid-cols-2 lg:items-center">
            <PlaceholderImage
              slotId="verband.mitgliedschaft"
              label="Verbandsmitglieder"
              iconName="Users"
              className="aspect-[4/3] w-full"
            />
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-primary-600">
                Mitgliedschaft
              </p>
              <h2 className="mt-4 text-2xl font-bold text-primary-500">
                In einer Verbandsfahrschule sind Sie immer gut beraten
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-neutral-700">
                {intro}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vorteile – Bento-Grid: Info klein, Finanzielle Vorteile groß */}
      <section className="bg-neutral-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-primary-500">
            Was Sie als Mitglied haben
          </h2>
          <p className="mt-2 text-neutral-600">
            Ihre Vorteile im Überblick
          </p>
          <div className="mt-12 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {/* Zeile 1: Info 1, Info 2, Finanzielle Vorteile */}
            {infoItems.slice(0, 2).map((item, i) => {
              const Icon = infoIcons[i];
              return (
              <div
                key={item.title}
                className="group flex flex-col rounded-xl bg-white p-6 shadow-card transition-all border-l-4 border-l-transparent hover:shadow-hover hover:border-l-primary-500"
              >
                <Icon className="size-10 text-primary-500" />
                <h3 className="mt-3 text-lg font-semibold text-neutral-800">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-600">{item.text}</p>
              </div>
            );
            })}
            <div
              className="group flex flex-col rounded-xl bg-white p-6 shadow-card transition-all border-l-4 border-l-transparent hover:shadow-hover hover:border-l-primary-500 sm:col-span-2 lg:col-span-1"
            >
              <Euro className="size-10 text-primary-500" />
              <h3 className="mt-3 text-lg font-semibold text-neutral-800">
                {finanzielleVorteile.title}
              </h3>
              <p className="mt-2 text-sm text-neutral-600">
                {finanzielleVorteile.text}
              </p>
            </div>
            {/* Zeile 2: Info 3, Info 4, Telefonische Beratung (unter Finanzielle) */}
            {infoItems.slice(2, 4).map((item, i) => {
              const Icon = infoIcons[i + 2];
              return (
              <div
                key={item.title}
                className="group flex flex-col rounded-xl bg-white p-6 shadow-card transition-all border-l-4 border-l-transparent hover:shadow-hover hover:border-l-primary-500"
              >
                <Icon className="size-10 text-primary-500" />
                <h3 className="mt-3 text-lg font-semibold text-neutral-800">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-600">{item.text}</p>
              </div>
            );
            })}
            <div
              className="group flex flex-col rounded-xl bg-white p-6 shadow-card transition-all border-l-4 border-l-transparent hover:shadow-hover hover:border-l-primary-500 sm:col-span-2 lg:col-span-1"
            >
              <Phone className="size-10 text-primary-500" />
              <h3 className="mt-3 text-lg font-semibold text-neutral-800">
                {telefonischeBeratung.title}
              </h3>
              <p className="mt-2 text-sm text-neutral-600">
                {telefonischeBeratung.text}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Beitrag – Regeln + Beitragstabelle */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-primary-500">
            {beitrag.headline}
          </h2>
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            <div className="rounded-xl border-l-4 border-primary-500 bg-neutral-50 p-6 lg:col-span-1">
              <h3 className="text-lg font-semibold text-primary-600">
                Wichtige Hinweise
              </h3>
              <ul className="mt-4 space-y-3 text-neutral-700">
                {beitrag.regeln.map((regel) => (
                  <li key={regel} className="flex gap-3">
                    <span className="mt-[0.65em] size-1.5 shrink-0 rounded-full bg-primary-400" aria-hidden />
                    <span>{regel}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl bg-neutral-50 p-6 sm:p-8 lg:col-span-2">
              <div className="space-y-0">
                {feeRows.map((s, i) => (
                  <div
                    key={s.id ?? s.label}
                    className={i > 0 ? "border-t border-neutral-200 pt-4 mt-4" : ""}
                  >
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-neutral-800">{s.label}</p>
                        {s.hinweis && (
                          <p className="mt-1 text-sm text-neutral-600">{s.hinweis}</p>
                        )}
                      </div>
                      <p className="mt-1 shrink-0 text-lg font-semibold text-primary-600 sm:mt-0">
                        {s.betrag}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beitritt – CTA-Bereich wie Startseite */}
      <section className="bg-neutral-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl bg-white p-8 shadow-card">
            <h2 className="text-2xl font-bold text-primary-500">
              {beitritt.headline}
            </h2>
            <p className="mt-6 text-lg text-neutral-700">{beitritt.text}</p>
            <Button
              variant="primary"
              icon={Download}
              className="mt-6"
            >
              {beitritt.buttonText}
            </Button>
            <div className="mt-8 border-t border-neutral-200 pt-6">
              <p className="font-medium text-neutral-800">
                {settings.contactAddress}
              </p>
              <p className="mt-1 text-neutral-600">
                Tel: {settings.contactPhone}
              </p>
              <p className="mt-1 text-neutral-600">
                Fax: {settings.contactFax}
              </p>
              <a
                href={`mailto:${settings.contactEmail}`}
                className="mt-1 block font-medium text-primary-500 hover:underline"
              >
                {settings.contactEmail}
              </a>
            </div>
          </div>
        </div>
      </section>
    </ContentPage>
  );
}
