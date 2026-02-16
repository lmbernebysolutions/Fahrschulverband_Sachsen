"use client";

import { useSiteData } from "@/context/SiteDataContext";

export function ImpressumContent() {
  const { settings } = useSiteData();

  return (
    <div className="prose prose-lg max-w-none text-neutral-700">
      <h2 className="text-xl font-semibold text-neutral-800">
        Angaben gemäß § 5 TMG
      </h2>
      <p className="mt-4 font-semibold">
        Landesverband Sächsischer Fahrlehrer e.V.
      </p>
      <p className="mt-2">{settings.contactAddress}</p>

      <h2 className="mt-8 text-xl font-semibold text-neutral-800">Kontakt</h2>
      <p className="mt-4">Telefon: {settings.contactPhone}</p>
      <p>Telefax: {settings.contactFax}</p>
      <p>
        E-Mail:{" "}
        <a
          href={`mailto:${settings.contactEmail}`}
          className="text-primary-500 hover:underline"
        >
          {settings.contactEmail}
        </a>
      </p>

      <h2 className="mt-8 text-xl font-semibold text-neutral-800">
        Vertreten durch
      </h2>
      <p className="mt-4">
        Den Vorstand des Landesverbandes Sächsischer Fahrlehrer e.V.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-neutral-800">
        Registereintrag
      </h2>
      <p className="mt-4">
        Eintragung im Vereinsregister. Registergericht: Amtsgericht Dresden.
        Registernummer: [VR-Nummer].
      </p>

      <h2 className="mt-8 text-xl font-semibold text-neutral-800">
        Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
      </h2>
      <p className="mt-4">[Name und Anschrift des Verantwortlichen]</p>
    </div>
  );
}
