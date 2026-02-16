"use client";

import {
  Search,
  Truck,
  AlertTriangle,
  Heart,
  FileCheck,
  Accessibility,
} from "lucide-react";
import { ServiceTile } from "@/components/molecules";
import { useSiteData } from "@/context/SiteDataContext";
import type { ImageSlotId } from "@/lib/imageUsage";

const services: Array<{
  icon: typeof Search;
  title: string;
  description: string;
  href: string;
  slotId: ImageSlotId;
}> = [
  {
    icon: Search,
    title: "FAHRSCHULSUCHE",
    description: "Finden Sie die passende Verbandsfahrschule in Ihrer Nähe.",
    href: "/fuer-fahrschueler/fahrschulsuche",
    slotId: "fahrschueler.fahrschulsuche",
  },
  {
    icon: Truck,
    title: "BERUFSKRAFTFAHRER",
    description: "Weiterbildung für Berufskraftfahrer.",
    href: "/fuer-fahrschueler/berufskraftfahrer",
    slotId: "fahrschueler.berufskraftfahrer",
  },
  {
    icon: AlertTriangle,
    title: "AUFBAUSEMINAR FAHRANFÄNGER",
    description: "ASF-Seminare für Fahranfänger.",
    href: "/fuer-fahrschueler/aufbauseminare",
    slotId: "fahrschueler.aufbauseminare",
  },
  {
    icon: Heart,
    title: "MOBIL OHNE ANGST",
    description: "Spezielles Programm für ältere Verkehrsteilnehmer.",
    href: "/fuer-fahrschueler/mobil-ohne-angst",
    slotId: "fahrschueler.mobil-ohne-angst",
  },
  {
    icon: FileCheck,
    title: "FAHREIGNUNGSSEMINARE",
    description: "FES-Seminare zur Wiedererlangung der Fahrerlaubnis.",
    href: "/fuer-fahrschueler/fahreignungsseminare",
    slotId: "fahrschueler.fahreignungsseminare",
  },
  {
    icon: Accessibility,
    title: "BEHINDERTENAUSBILDUNG",
    description: "Fahrschulen mit Behindertenausbildung.",
    href: "/fuer-fahrschueler/behindertenausbildung",
    slotId: "fahrschueler.behindertenausbildung",
  },
];

export function ServiceGrid() {
  const { settings } = useSiteData();

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <ServiceTile
          key={service.href}
          icon={service.icon}
          title={service.title}
          description={service.description}
          href={service.href}
          imagePath={settings.imageAssignments?.[service.slotId]?.imagePath}
        />
      ))}
    </div>
  );
}
