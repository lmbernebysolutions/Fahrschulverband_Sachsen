import { ContentPage } from "@/components/templates/ContentPage";
import { NewsGrid } from "@/components/organisms";

export default function AktuellesPage() {
  return (
    <ContentPage
      title="Aktuelles für Mitglieder, Fahrschüler und Verkehrsteilnehmer"
      breadcrumbItems={[
        { label: "Startseite", href: "/" },
        { label: "Aktuelles", href: "/aktuelles" },
      ]}
    >
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <NewsGrid variant="full" />
        </div>
      </section>
    </ContentPage>
  );
}
