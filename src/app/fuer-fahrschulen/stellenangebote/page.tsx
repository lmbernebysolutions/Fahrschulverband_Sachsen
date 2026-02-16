import { Mail } from "lucide-react";
import { ContentPage } from "@/components/templates/ContentPage";
import { ListingCard } from "@/components/molecules";
import { siteContent } from "@/lib/siteContent";

export default function StellenangebotePage() {
  const { stellenangebote } = siteContent;

  return (
    <ContentPage
      title="Stellenangebote"
      subtitle="Aktuelle Stellenangebote von Verbandsfahrschulen"
      breadcrumbItems={[
        { label: "Startseite", href: "/" },
        { label: "Für Fahrschulen", href: "/fuer-fahrschulen" },
        { label: "Stellenangebote", href: "/fuer-fahrschulen/stellenangebote" },
      ]}
    >
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <p className="text-neutral-700">
              {stellenangebote.intro}
            </p>
            <a
              href={`mailto:${stellenangebote.cta.email}`}
              title={stellenangebote.cta.text}
              className="inline-flex shrink-0 items-center gap-2 rounded-lg border-l-4 border-primary-500 bg-primary-50 px-4 py-3 font-medium text-primary-600 transition-colors hover:bg-primary-100"
            >
              <Mail className="size-4" />
              {stellenangebote.cta.headline}
            </a>
          </div>

          <h2 className="mt-12 text-2xl font-bold text-primary-500">
            Aktuelle Stellenangebote
          </h2>
          <div className="mt-8 space-y-6">
            {stellenangebote.anzeigen.map((anzeige, i) => {
              const title =
                anzeige.text.length > 70
                  ? anzeige.text.slice(0, 70).trim() + "…"
                  : anzeige.text;
              const link =
                "link" in anzeige && anzeige.link && anzeige.link !== "#"
                  ? anzeige.link
                  : undefined;
              return (
                <ListingCard
                  key={i}
                  type="suche"
                  date={`Stand: ${anzeige.stand}`}
                  title={title}
                  description={anzeige.text}
                  contactHref={link}
                  contact={link ? "Weiterlesen und bewerben" : undefined}
                />
              );
            })}
          </div>
        </div>
      </section>
    </ContentPage>
  );
}
