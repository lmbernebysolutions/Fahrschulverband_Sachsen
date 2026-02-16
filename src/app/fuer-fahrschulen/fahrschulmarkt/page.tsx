"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { ContentPage } from "@/components/templates/ContentPage";
import { ListingCard } from "@/components/molecules";
import { useSiteData } from "@/context/SiteDataContext";

function getContactHref(contact: string): string | undefined {
  const email = contact.split(/[\s,]+/).find((p) => p.includes("@"));
  if (email) return `mailto:${email}`;
  const phone = contact.replace(/\s/g, "").replace(/-/g, "").replace(/\//g, "");
  if (/^[\d+()]+$/.test(phone)) return `tel:${phone}`;
  return undefined;
}

export default function FahrschulmarktPage() {
  const { fahrschulAds } = useSiteData();
  const activeAds = fahrschulAds.filter((a) => a.isActive);

  return (
    <ContentPage
      title="Fahrschulmarkt"
      subtitle="Anzeigenbörse für Fahrschulen"
      breadcrumbItems={[
        { label: "Startseite", href: "/" },
        { label: "Für Fahrschulen", href: "/fuer-fahrschulen" },
        { label: "Fahrschulmarkt", href: "/fuer-fahrschulen/fahrschulmarkt" },
      ]}
    >
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* CTA wie bei Stellenangebote: eine Zeile mit Text + Kontakt-Link */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <div>
              <h3 className="text-lg font-semibold text-neutral-800">
                Eigene Anzeige aufgeben?
              </h3>
              <p className="mt-1 text-neutral-700">
                Kontaktieren Sie uns, um eine Anzeige im Fahrschulmarkt zu platzieren.
              </p>
            </div>
            <Link
              href="/kontakt"
              title="Kontakt aufnehmen"
              className="inline-flex shrink-0 items-center gap-2 rounded-lg border-l-4 border-primary-500 bg-primary-50 px-4 py-3 font-medium text-primary-600 transition-colors hover:bg-primary-100"
            >
              <Mail className="size-4" />
              Kontakt aufnehmen
            </Link>
          </div>

          <h2 className="mt-12 text-2xl font-bold text-primary-500">
            Aktuelle Anzeigen
          </h2>
          {activeAds.length === 0 ? (
            <p className="mt-8 rounded-xl bg-neutral-50 p-8 text-neutral-600 shadow-card">
              Derzeit sind keine Anzeigen im Fahrschulmarkt eingestellt.
            </p>
          ) : (
            <div className="mt-8 space-y-6">
              {activeAds.map((ad) => (
                <ListingCard
                  key={ad.id}
                  type={ad.type}
                  date={ad.date}
                  title={ad.title}
                  description={ad.description}
                  location={ad.location}
                  contact={ad.contact}
                  contactHref={getContactHref(ad.contact)}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </ContentPage>
  );
}
