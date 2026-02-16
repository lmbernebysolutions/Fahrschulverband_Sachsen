import { ContentPage } from "@/components/templates/ContentPage";
import { ServiceGrid } from "@/components/organisms";
import { PlaceholderImage } from "@/components/organisms/PlaceholderImage";
import Link from "next/link";

export default function BerufskraftfahrerPage() {
  return (
    <ContentPage
      title="Berufskraftfahrer"
      subtitle="Weiterbildung für Berufskraftfahrer"
      breadcrumbItems={[
        { label: "Startseite", href: "/" },
        { label: "Für Fahrschüler", href: "/fuer-fahrschueler/fahrschulsuche" },
        { label: "Berufskraftfahrer", href: "/fuer-fahrschueler/berufskraftfahrer" },
      ]}
    >
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-2xl font-bold text-primary-500">
                Was ist die Berufskraftfahrer-Weiterbildung?
              </h2>
              <p className="mt-6 text-lg text-neutral-700">
                Die Berufskraftfahrer-Qualifikation (BKF) ist eine gesetzlich
                vorgeschriebene Weiterbildung für LKW- und Busfahrer. In
                regelmäßigen Schulungen werden Kenntnisse in den Bereichen
                Eco-Training, Sicherheitstechnik und Sozialvorschriften
                vermittelt.
              </p>
              <ul className="mt-6 space-y-2">
                {[
                  "Modulare Schulungen nach Berufskraftfahrer-Qualifikationsgesetz",
                  "Eco-Training und Kraftstoffeinsparung",
                  "Sicherheitstechnik und Ladungssicherung",
                ].map((item) => (
                  <li key={item} className="flex items-baseline gap-2">
                    <span className="shrink-0 text-primary-500">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <PlaceholderImage
              slotId="fahrschueler.berufskraftfahrer"
              label="Berufskraftfahrer"
              iconName="Truck"
              className="aspect-[4/3] w-full"
            />
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h3 className="text-xl font-semibold text-primary-500">
            Fahrschule für Berufskraftfahrer-Weiterbildung finden
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
