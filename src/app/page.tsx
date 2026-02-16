import Link from "next/link";
import { GraduationCap, Car } from "lucide-react";
import { PublicLayout } from "@/components/templates/PublicLayout";
import {
  HeroSection,
  NewsGrid,
  EventList,
  ServiceGrid,
} from "@/components/organisms";
import { siteContent } from "@/lib/siteContent";
import { PlaceholderImage } from "@/components/organisms/PlaceholderImage";

export default function Home() {
  const { intro, fahrschueler } = siteContent.home;

  return (
    <PublicLayout>
      <HeroSection />

      {/* Zielgruppen-Einstieg */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-primary-500">
            Was können wir für Sie tun?
          </h2>
          <p className="mt-2 text-neutral-600">
            Wählen Sie Ihren Bereich
          </p>
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <Link
              href="/fuer-fahrschulen"
              className="group flex flex-col rounded-xl bg-white p-8 shadow-card transition-all border-l-4 border-l-transparent hover:-translate-y-0.5 hover:shadow-hover hover:border-l-primary-500"
            >
              <GraduationCap className="size-12 text-primary-500" />
              <h3 className="mt-4 text-xl font-semibold text-neutral-800">
                Für Fahrschulen & Fahrlehrer
              </h3>
              <p className="mt-2 text-neutral-600">
                Fortbildungen, Marktplatz und Verbandsvorteile
              </p>
              <span className="mt-4 font-medium text-primary-500 group-hover:underline">
                Mehr erfahren →
              </span>
            </Link>
            <Link
              href="/fuer-fahrschueler/fahrschulsuche"
              className="group flex flex-col rounded-xl bg-white p-8 shadow-card transition-all border-l-4 border-l-transparent hover:-translate-y-0.5 hover:shadow-hover hover:border-l-primary-500"
            >
              <Car className="size-12 text-primary-500" />
              <h3 className="mt-4 text-xl font-semibold text-neutral-800">
                Für Fahrschüler & Verkehrsteilnehmer
              </h3>
              <p className="mt-2 text-neutral-600">
                Finden Sie die passende Fahrschule in Ihrer Nähe
              </p>
              <span className="mt-4 font-medium text-primary-500 group-hover:underline">
                Fahrschule suchen →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Verband-Intro */}
      <section className="bg-neutral-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <PlaceholderImage
              slotId="home.verbandsgebaeude"
              label="Verbandsgebäude"
              iconName="Building2"
              className="aspect-[4/3] w-full"
            />
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-primary-600">
                Über uns
              </p>
              <h2 className="mt-4 text-2xl font-bold text-primary-500">
                {intro.headline}
              </h2>
              <p className="mt-6 text-lg text-neutral-700">{intro.text}</p>
              <Link
                href="/der-verband/ueber-uns"
                className="mt-6 inline-flex font-medium text-primary-500 hover:underline"
              >
                Mehr über den Verband →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Fortbildungs-Teaser */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-primary-500">
            Aktuelle Fortbildungstermine
          </h2>
          <p className="mt-2 text-neutral-600">
            Bilden Sie sich weiter – bequem online anmelden
          </p>
          <div className="mt-12">
            <EventList />
          </div>
        </div>
      </section>

      {/* Service-Kacheln */}
      <section className="bg-neutral-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-primary-500">
            {fahrschueler.headline}
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-neutral-700">
            {fahrschueler.text}
          </p>
          <div className="mt-12">
            <ServiceGrid />
          </div>
        </div>
      </section>

      {/* Aktuelle Meldungen */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-primary-500">
            Aktuelle Meldungen
          </h2>
          <div className="mt-12">
            <NewsGrid />
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
