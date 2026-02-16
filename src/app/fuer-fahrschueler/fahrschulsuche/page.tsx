import { ContentPage } from "@/components/templates/ContentPage";
import { FahrschulSearch } from "@/components/organisms";

export default function FahrschulsuchePage() {
  return (
    <ContentPage
      title="Fahrschulsuche"
      subtitle="Finden Sie die passende Verbandsfahrschule in Ihrer Nähe"
      breadcrumbItems={[
        { label: "Startseite", href: "/" },
        { label: "Für Fahrschüler", href: "/fuer-fahrschueler/fahrschulsuche" },
        { label: "Fahrschulsuche", href: "/fuer-fahrschueler/fahrschulsuche" },
      ]}
    >
      <section className="bg-primary-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FahrschulSearch />
        </div>
      </section>
    </ContentPage>
  );
}
