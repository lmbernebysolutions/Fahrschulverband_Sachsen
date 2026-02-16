import { ContentPage } from "@/components/templates/ContentPage";
import { ImpressumContent } from "./ImpressumContent";

export default function ImpressumPage() {
  return (
    <ContentPage
      title="Impressum"
      breadcrumbItems={[
        { label: "Startseite", href: "/" },
        { label: "Impressum", href: "/impressum" },
      ]}
    >
      <section className="bg-white py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <ImpressumContent />
        </div>
      </section>
    </ContentPage>
  );
}
