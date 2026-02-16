"use client";

import { ContentPage } from "@/components/templates/ContentPage";
import { ContactForm } from "@/components/organisms";
import { ContactBlock } from "@/components/molecules";
import { useSiteData } from "@/context/SiteDataContext";
import { Mail, MapPin, Phone, Printer } from "lucide-react";

export default function KontaktPage() {
  const { settings } = useSiteData();

  return (
    <ContentPage
      title="Kontakt"
      subtitle="Wir sind für Sie da"
      breadcrumbItems={[
        { label: "Startseite", href: "/" },
        { label: "Kontakt", href: "/kontakt" },
      ]}
    >
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:gap-16 lg:grid-cols-2">
            <div className="space-y-6">
              <ContactBlock
                icon={Phone}
                label="Telefon"
                value={settings.contactPhone}
                href={`tel:${settings.contactPhone.replace(/\s/g, "")}`}
              />
              <ContactBlock
                icon={Mail}
                label="E-Mail"
                value={settings.contactEmail}
                href={`mailto:${settings.contactEmail}`}
              />
              <ContactBlock
                icon={MapPin}
                label="Adresse"
                value={settings.contactAddress}
              />
              <ContactBlock
                icon={Printer}
                label="Telefax"
                value={settings.contactFax}
              />
            </div>
            <div>
              <h2 className="mb-6 text-xl font-semibold text-neutral-800">
                Nachricht senden
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </ContentPage>
  );
}
