import { ContentPage } from "@/components/templates/ContentPage";
import { ServiceGrid } from "@/components/organisms";
import { PlaceholderImage } from "@/components/organisms/PlaceholderImage";
import Link from "next/link";

export default function FahreignungsseminarePage() {
  return (
    <ContentPage
      title="Fahreignungsseminare (FES)"
      subtitle="Zur Wiedererlangung der Fahrerlaubnis"
      breadcrumbItems={[
        { label: "Startseite", href: "/" },
        { label: "Für Fahrschüler", href: "/fuer-fahrschueler/fahrschulsuche" },
        { label: "Fahreignungsseminare", href: "/fuer-fahrschueler/fahreignungsseminare" },
      ]}
    >
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-2xl font-bold text-primary-500">
                Was sind Fahreignungsseminare?
              </h2>
              <p className="mt-6 text-lg text-neutral-700">
                Fahreignungsseminare (FES) ersetzen bei bestimmten
                Verkehrsverstößen einen Teil der Punkte in Flensburg. Durch die
                Teilnahme an einem anerkannten Seminar kann die Tilgung von
                Punkten beschleunigt werden. Die Seminare kombinieren
                verkehrspädagogische und verkehrspsychologische Module.
              </p>
              <ul className="mt-6 space-y-2">
                {[
                  "Punkteabbau im Fahreignungsregister",
                  "Verkehrspädagogisches und -psychologisches Modul",
                  "Anerkannt durch die Fahrerlaubnisbehörde",
                ].map((item) => (
                  <li key={item} className="flex items-baseline gap-2">
                    <span className="shrink-0 text-primary-500">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <PlaceholderImage
              slotId="fahrschueler.fahreignungsseminare"
              label="Fahreignungsseminare"
              iconName="FileCheck"
              className="aspect-[4/3] w-full"
            />
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h3 className="text-xl font-semibold text-primary-500">
            Fahrschule für Fahreignungsseminare finden
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
