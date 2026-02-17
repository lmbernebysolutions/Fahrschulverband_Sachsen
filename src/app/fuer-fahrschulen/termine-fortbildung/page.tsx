import { ContentPage } from "@/components/templates/ContentPage";
import { EventList } from "@/components/organisms";
import { AccordionItem } from "@/components/molecules";

/** Seminarinhalte in 2 logischen Blöcken (gleicher Container) */
const SEMINARINHALTE_BLOCK_1 = [
  "Einweisung in das Praxis Training FAS",
  "das neue Datenblatt FAS",
  "Elektromobilität und Ladeinfrastruktur",
  "Das Rückmeldeprotokoll und die Fehlerbewertung anhand des ePr",
];
const SEMINARINHALTE_BLOCK_2 = [
  "Neues zum Verkehrsrecht und die direkte Auswirkung auf Ausbildung und Prüfung",
  "Arbeitsplatz Fahrlehrer/Zeitmanagement",
  "Verhalten nach Verkehrsunfall/Besonderheiten bei Motorradunfällen",
  "Drogen und Verkehrstüchtigkeit/Strafrechtliche Ahndung",
  "Aktuelles zur Versicherung der Fahrschule",
];

const SACHSENRING_THEORIE = [
  "automatisierte Fahrfunktionen, Einsatz von FAS in der Prüfung seit Mai 2022",
  "OPFEP – die Optimierung der prakt. Fahrerlaubnisprüfung und der neue Verkehrswahrnehmungstest",
  "Erkenntnisse aus OFSA II",
  "Schutzkleidung – neue Normen seit 2022",
  "Besonderheiten bei der Motorradausbildung",
];

const SACHSENRING_PRAXIS = [
  "Training im Realverkehr, Training mit dem Schräglagentrainer",
  "Sektionstraining auf den Übungspisten des VSZ am Sachsenring, Fahrtechnik, Fahrlinie und Blickführung",
  "automatisiertes und vernetztes Fahren mit Auswirkungen auf die Fahrausbildung",
];

export default function TermineFortbildungPage() {
  return (
    <ContentPage
      title="Termine Fortbildung"
      subtitle="Alle aktuellen Fortbildungsveranstaltungen"
      breadcrumbItems={[
        { label: "Startseite", href: "/" },
        { label: "Für Fahrschulen", href: "/fuer-fahrschulen" },
        { label: "Termine Fortbildung", href: "/fuer-fahrschulen/termine-fortbildung" },
      ]}
    >
      {/* Seminarinhalte – ein Container (nur Container-Farbe), Liste darin */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-primary-500">
            Seminarinhalte
          </h2>
          <p className="mt-2 text-neutral-600">
            Themen unserer Fortbildungsveranstaltungen – übersichtlich nach Themenblöcken.
          </p>
          <div className="mt-8 rounded-xl bg-neutral-50 p-6 sm:p-8">
            <div className="space-y-8 sm:grid sm:grid-cols-2 sm:gap-8 sm:space-y-0">
              <div className="min-w-0">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-primary-600">
                  Technik & Prüfung
                </h3>
                <ul className="mt-3 space-y-3 text-neutral-700 break-words" role="list">
                  {SEMINARINHALTE_BLOCK_1.map((item) => (
                    <li
                      key={item}
                      className="flex min-w-0 gap-2 break-words"
                    >
                      <span className="mt-[0.65em] size-1.5 shrink-0 rounded-full bg-primary-500" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-primary-600">
                  Recht, Beruf & Versicherung
                </h3>
                <ul className="mt-3 space-y-3 text-neutral-700 break-words" role="list">
                  {SEMINARINHALTE_BLOCK_2.map((item) => (
                    <li
                      key={item}
                      className="flex min-w-0 gap-2 break-words"
                    >
                      <span className="mt-[0.65em] size-1.5 shrink-0 rounded-full bg-primary-500" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Termine-Übersicht + EventList */}
      <section className="bg-neutral-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-primary-500">
            Termine & Anmeldung
          </h2>
          <p className="mt-2 text-neutral-600">
            Filter und Suche – Anmeldeschluss beachten
          </p>
          <div className="mt-12">
            <EventList variant="full" />
          </div>
        </div>
      </section>

      {/* Seminar Sachsenring – Detail */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-primary-500">
            Seminarinhalt für die kombinierte Fahrlehrerweiterbildung am Sachsenring
          </h2>
          <p className="mt-2 text-neutral-600">
            Theorie und Praxis im Überblick
          </p>

          <div className="mt-8 space-y-6">
            <AccordionItem
              title="Theorie-Themen u. a."
              className="border-l-4 border-l-primary-500"
              defaultOpen={false}
            >
              <ul
                className="space-y-2 text-neutral-700 break-words"
                role="list"
              >
                {SACHSENRING_THEORIE.map((item) => (
                  <li
                    key={item}
                    className="flex min-w-0 gap-2 break-words"
                  >
                    <span className="mt-[0.65em] size-1.5 shrink-0 rounded-full bg-primary-500" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </AccordionItem>
            <AccordionItem
              title="Praxis u. a."
              className="border-l-4 border-l-primary-500"
              defaultOpen={false}
            >
              <ul
                className="space-y-2 text-neutral-700 break-words"
                role="list"
              >
                {SACHSENRING_PRAXIS.map((item) => (
                  <li
                    key={item}
                    className="flex min-w-0 gap-2 break-words"
                  >
                    <span className="mt-[0.65em] size-1.5 shrink-0 rounded-full bg-primary-500" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </AccordionItem>
          </div>

          {/* Hinweis Tabelle Termin/Seminar/Ort/Anmeldeschluss */}
          <div className="mt-12 rounded-xl border border-neutral-200 bg-neutral-50 p-6">
            <p className="text-sm font-medium text-neutral-700">
              Zu jedem Termin finden Sie in der Liste oben: <strong>Termin</strong>, <strong>Seminar</strong>, <strong>Ort</strong> und <strong>Anmeldeschluss</strong>.
            </p>
          </div>
        </div>
      </section>
    </ContentPage>
  );
}
