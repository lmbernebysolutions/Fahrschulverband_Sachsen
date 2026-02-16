import { ContentPage } from "@/components/templates/ContentPage";

export default function DatenschutzPage() {
  return (
    <ContentPage
      title="Datenschutzerklärung"
      breadcrumbItems={[
        { label: "Startseite", href: "/" },
        { label: "Datenschutz", href: "/datenschutz" },
      ]}
    >
      <section className="bg-white py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none text-neutral-700">
            <h2 className="text-xl font-semibold text-neutral-800">
              1. Verantwortlicher
            </h2>
            <p className="mt-4">
              Landesverband Sächsischer Fahrlehrer e.V., Bernhardstr. 35, 01187
              Dresden, ist verantwortlich für die Verarbeitung personenbezogener
              Daten auf dieser Website.
            </p>

            <h2 className="mt-8 text-xl font-semibold text-neutral-800">
              2. Erhebung und Speicherung personenbezogener Daten
            </h2>
            <p className="mt-4">
              Beim Besuch unserer Website werden durch den Browser automatisch
              Informationen an den Server gesendet. Dazu gehören u.a. IP-Adresse,
              Browsertyp, Datum und Uhrzeit des Zugriffs. Diese Daten werden
              ausschließlich zur Gewährleistung eines störungsfreien Betriebs
              der Website erhoben.
            </p>

            <h2 className="mt-8 text-xl font-semibold text-neutral-800">
              3. Kontaktformular
            </h2>
            <p className="mt-4">
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden
              Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort
              angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage bei uns
              gespeichert.
            </p>

            <h2 className="mt-8 text-xl font-semibold text-neutral-800">
              4. Ihre Rechte
            </h2>
            <p className="mt-4">
              Sie haben das Recht auf Auskunft, Berichtigung, Löschung und
              Einschränkung der Verarbeitung Ihrer personenbezogenen Daten. Sie
              können sich bei Fragen zum Datenschutz an uns wenden.
            </p>

            <h2 className="mt-8 text-xl font-semibold text-neutral-800">
              5. Änderungen
            </h2>
            <p className="mt-4">
              Wir behalten uns vor, diese Datenschutzerklärung anzupassen, um sie
              an geänderte Rechtslagen oder bei Änderungen des Dienstes
              anzupassen.
            </p>
          </div>
        </div>
      </section>
    </ContentPage>
  );
}
