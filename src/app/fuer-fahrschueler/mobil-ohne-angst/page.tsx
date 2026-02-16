import { ContentPage } from "@/components/templates/ContentPage";
import { ServiceGrid } from "@/components/organisms";
import { PlaceholderImage } from "@/components/organisms/PlaceholderImage";
import Link from "next/link";

export default function MobilOhneAngstPage() {
  return (
    <ContentPage
      title="Mobil ohne Angst"
      subtitle="Fahrunterricht für ältere Verkehrsteilnehmer"
      breadcrumbItems={[
        { label: "Startseite", href: "/" },
        { label: "Für Fahrschüler", href: "/fuer-fahrschueler/fahrschulsuche" },
        { label: "Mobil ohne Angst", href: "/fuer-fahrschueler/mobil-ohne-angst" },
      ]}
    >
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-2xl font-bold text-primary-500">
                Was ist Mobil ohne Angst?
              </h2>
              <p className="mt-6 text-lg text-neutral-700">
                Mobil ohne Angst ist ein spezielles Schulungsprogramm für
                ältere Verkehrsteilnehmer, die unsicher beim Fahren geworden
                sind oder ihre Fahrkompetenz auffrischen möchten. In ruhiger
                Atmosphäre werden individuelle Ängste abgebaut und die
                Fahrfertigkeit gestärkt.
              </p>
              <ul className="mt-6 space-y-2">
                {[
                  "Individuelle Fahrstunden",
                  "Ruhige und geduldige Anleitung",
                  "Auffrischung der Fahrkompetenz",
                ].map((item) => (
                  <li key={item} className="flex items-baseline gap-2">
                    <span className="shrink-0 text-primary-500">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <PlaceholderImage
              slotId="fahrschueler.mobil-ohne-angst"
              label="Mobil ohne Angst"
              iconName="Heart"
              className="aspect-[4/3] w-full"
            />
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h3 className="text-xl font-semibold text-primary-500">
            Fahrschule für Mobil ohne Angst finden
          </h3>
          <Link
            href="/fuer-fahrschueler/fahrschulsuche"
            className="mt-4 inline-block font-medium text-primary-500 hover:underline"
          >
            Zur Fahrschulsuche →
          </Link>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h3 className="mb-6 text-xl font-semibold text-neutral-800">
            Weitere Spezialprogramme
          </h3>
          <ServiceGrid />
        </div>
      </section>
    </ContentPage>
  );
}
