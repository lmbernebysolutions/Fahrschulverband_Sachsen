import { ContentPage } from "@/components/templates/ContentPage";
import { VorstandSection, GeschaeftsstelleSection } from "@/components/organisms/VorstandSection";
import { siteContent } from "@/lib/siteContent";

export default function VorstandGeschaeftsstellePage() {
  const { vorstand } = siteContent;

  return (
    <ContentPage
      title="Vorstand/Geschäftsstelle"
      subtitle="Wir vertreten unsere Verbandsfahrschulen landesweit und öffentlichkeitswirksam"
      breadcrumbItems={[
        { label: "Startseite", href: "/" },
        { label: "Der Verband", href: "/der-verband/ueber-uns" },
        { label: "Vorstand/Geschäftsstelle", href: "/der-verband/vorstand-geschaeftsstelle" },
      ]}
    >
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-primary-500">
            {vorstand.headline}
          </h2>
          <p className="mt-2 text-lg text-neutral-600">{vorstand.subheadline}</p>
          <VorstandSection vorstand={vorstand} />
        </div>
      </section>

      <section className="bg-neutral-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-primary-500">
            {vorstand.geschaeftsstelle.headline}
          </h2>
          <p className="mt-2 text-lg text-neutral-600">
            {vorstand.geschaeftsstelle.subheadline}
          </p>
          <GeschaeftsstelleSection geschaeftsstelle={vorstand.geschaeftsstelle} />
          <div className="mt-12 rounded-xl border-l-4 border-primary-500 bg-white p-6 shadow-card">
            <h3 className="text-lg font-semibold text-primary-600">
              Öffnungszeiten der Geschäftsstelle
            </h3>
            <div className="mt-4">
              {/* Geöffnete Tage zuerst, Montag (geschlossen) zuletzt */}
              <div className="space-y-3">
                {[
                  ...vorstand.geschaeftsstelle.oeffnungszeiten.filter(
                    (o) => o.zeiten !== "geschlossen"
                  ),
                  ...vorstand.geschaeftsstelle.oeffnungszeiten.filter(
                    (o) => o.zeiten === "geschlossen"
                  ),
                ].map((o) => (
                  <div
                    key={o.tag}
                    className="flex items-center justify-between gap-4 rounded-lg bg-neutral-50 px-4 py-3"
                  >
                    <span className="font-medium text-neutral-800">{o.tag}</span>
                    <span
                      className={
                        o.zeiten === "geschlossen"
                          ? "text-neutral-500"
                          : "text-neutral-700"
                      }
                    >
                      {o.zeiten}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </ContentPage>
  );
}
