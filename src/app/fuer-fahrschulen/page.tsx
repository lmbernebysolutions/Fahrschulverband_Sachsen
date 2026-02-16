import Link from "next/link";
import {
  GraduationCap,
  ShoppingBag,
  Percent,
  ClipboardList,
} from "lucide-react";
import { ContentPage } from "@/components/templates/ContentPage";
import { EventList } from "@/components/organisms";
import { Badge } from "@/components/atoms";

export default function FuerFahrschulenPage() {
  return (
    <ContentPage
      title="Für Fahrschulen & Fahrlehrer"
      subtitle="Fortbildung, Netzwerk und finanzielle Vorteile"
      breadcrumbItems={[
        { label: "Startseite", href: "/" },
        { label: "Für Fahrschulen", href: "/fuer-fahrschulen" },
      ]}
    >
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-primary-500">
            Unsere Angebote für Sie
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 sm:items-stretch">
            <div className="flex flex-col rounded-xl bg-white p-6 shadow-card transition-all border-l-4 border-l-transparent hover:shadow-hover hover:border-l-primary-500">
              <GraduationCap className="size-12 text-primary-500" />
              <h3 className="mt-4 text-xl font-semibold text-neutral-800">
                Fortbildungsveranstaltungen
              </h3>
              <p className="mt-2 flex-1 text-neutral-700">
                Förderung von Aus- und Weiterbildung mit regelmäßigen
                Fortbildungsveranstaltungen für Fahrlehrer und Kursleiter.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="category">§ 53 (1) FahrlG</Badge>
                <Badge variant="category">Kursleiter ASF/FES</Badge>
                <Badge variant="category">Sonderseminare</Badge>
              </div>
              <Link
                href="/fuer-fahrschulen/termine-fortbildung"
                className="mt-auto pt-6 inline-block font-medium text-primary-500 hover:underline"
              >
                Zu den Terminen →
              </Link>
            </div>
            <div className="flex flex-col rounded-xl bg-white p-6 shadow-card transition-all border-l-4 border-l-transparent hover:shadow-hover hover:border-l-primary-500">
              <ShoppingBag className="size-12 text-primary-500" />
              <h3 className="mt-4 text-xl font-semibold text-neutral-800">
                Fahrschulmarkt
              </h3>
              <p className="mt-2 flex-1 text-neutral-700">
                Anzeigenbörse für Fahrschulen – Verkauf, Suche, Kooperation.
              </p>
              <Link
                href="/fuer-fahrschulen/fahrschulmarkt"
                className="mt-auto pt-6 inline-block font-medium text-primary-500 hover:underline"
              >
                Zum Marktplatz →
              </Link>
            </div>
            <div className="flex flex-col rounded-xl bg-white p-6 shadow-card transition-all border-l-4 border-l-transparent hover:shadow-hover hover:border-l-primary-500">
              <Percent className="size-12 text-primary-500" />
              <h3 className="mt-4 text-xl font-semibold text-neutral-800">
                Rahmenverträge
              </h3>
              <p className="mt-2 flex-1 text-neutral-700">
                Finanzielle Vorteile durch Partnerkonditionen.
              </p>
            </div>
            <div className="flex flex-col rounded-xl bg-white p-6 shadow-card transition-all border-l-4 border-l-transparent hover:shadow-hover hover:border-l-primary-500">
              <ClipboardList className="size-12 text-primary-500" />
              <h3 className="mt-4 text-xl font-semibold text-neutral-800">
                Online-Anmeldung
              </h3>
              <p className="mt-2 flex-1 text-neutral-700">
                Bequem online zu Fortbildungen anmelden.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-primary-500">
            Nächste Fortbildungstermine
          </h2>
          <div className="mt-12">
            <EventList />
          </div>
        </div>
      </section>

    </ContentPage>
  );
}
