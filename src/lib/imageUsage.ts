/**
 * Zentrale Übersicht aller Bild-Referenzen im Projekt.
 * Entspricht den Kundenanforderungen: benutzerfreundliche Bildeinspeißung,
 * Vermeidung von Format-Konflikten, klare Zuordnung wo Bilder genutzt werden.
 */
export interface ImageRef {
  path: string;
  alt?: string;
  usedOn: string[];
  type: "real" | "placeholder" | "svg";
}

/** Echte Bilddateien (public/) */
export const REAL_IMAGES: ImageRef[] = [
  {
    path: "/images/logo.png",
    alt: "Landesverband Sächsischer Fahrlehrer e.V.",
    usedOn: ["Kopfbereich (alle Seiten)"],
    type: "real",
  },
];

/** SVG-Assets in public/ */
export const SVG_ASSETS: ImageRef[] = [
  { path: "/window.svg", usedOn: ["Next.js Default"], type: "svg" },
  { path: "/vercel.svg", usedOn: ["Next.js Default"], type: "svg" },
  { path: "/next.svg", usedOn: ["Next.js Default"], type: "svg" },
  { path: "/globe.svg", usedOn: ["Next.js Default"], type: "svg" },
  { path: "/file.svg", usedOn: ["Next.js Default"], type: "svg" },
];

/** Icon-Namen für PlaceholderImage (serialisierbar für Server→Client) */
export const PLACEHOLDER_ICON_NAMES = [
  "Building2", "Accessibility", "FileCheck", "Heart", "AlertTriangle", "Truck", "Users",
] as const;
export type PlaceholderIconName = (typeof PLACEHOLDER_ICON_NAMES)[number];

/** Seiten-Gruppen für die Bildverwaltung */
export const IMAGE_PAGES = [
  { pageId: "startseite", label: "Startseite" },
  { pageId: "fahrschueler", label: "Für Fahrschüler" },
  { pageId: "verband", label: "Der Verband" },
] as const;

export type ImagePageId = (typeof IMAGE_PAGES)[number]["pageId"];

/** Bild-Slots: eindeutige IDs, nach Seite gruppiert */
export const IMAGE_SLOTS = [
  { slotId: "hero.background", alt: "Hintergrund Startbereich", usedOn: "Startbereich (oben auf der Startseite)", pageId: "startseite" as ImagePageId, aspectRatio: "auto", iconName: "Building2" as PlaceholderIconName },
  { slotId: "home.verbandsgebaeude", alt: "Verbandsgebäude", usedOn: "Verbands-Intro", pageId: "startseite" as ImagePageId, aspectRatio: "4/3", iconName: "Building2" as PlaceholderIconName },
  { slotId: "fahrschueler.fahrschulsuche", alt: "Fahrschulsuche", usedOn: "Fahrschulsuche", pageId: "fahrschueler" as ImagePageId, aspectRatio: "4/3", iconName: "FileCheck" as PlaceholderIconName },
  { slotId: "fahrschueler.behindertenausbildung", alt: "Barrierefreie Ausbildung", usedOn: "Behindertenausbildung", pageId: "fahrschueler" as ImagePageId, aspectRatio: "4/3", iconName: "Accessibility" as PlaceholderIconName },
  { slotId: "fahrschueler.fahreignungsseminare", alt: "Fahreignungsseminare", usedOn: "Fahreignungsseminare", pageId: "fahrschueler" as ImagePageId, aspectRatio: "4/3", iconName: "FileCheck" as PlaceholderIconName },
  { slotId: "fahrschueler.mobil-ohne-angst", alt: "Mobil ohne Angst", usedOn: "Mobil ohne Angst", pageId: "fahrschueler" as ImagePageId, aspectRatio: "4/3", iconName: "Heart" as PlaceholderIconName },
  { slotId: "fahrschueler.aufbauseminare", alt: "Aufbauseminar Fahranfänger", usedOn: "Aufbauseminare", pageId: "fahrschueler" as ImagePageId, aspectRatio: "4/3", iconName: "AlertTriangle" as PlaceholderIconName },
  { slotId: "fahrschueler.berufskraftfahrer", alt: "Berufskraftfahrer", usedOn: "Berufskraftfahrer", pageId: "fahrschueler" as ImagePageId, aspectRatio: "4/3", iconName: "Truck" as PlaceholderIconName },
  { slotId: "verband.ueber-uns", alt: "Mitgliederversammlung", usedOn: "Über uns", pageId: "verband" as ImagePageId, aspectRatio: "4/3", iconName: "Users" as PlaceholderIconName },
  { slotId: "verband.mitgliedschaft", alt: "Verbandsmitglieder", usedOn: "Mitgliedschaft", pageId: "verband" as ImagePageId, aspectRatio: "4/3", iconName: "Users" as PlaceholderIconName },
  { slotId: "verband.vorstand.peter-losleben", alt: "Peter Losleben", usedOn: "Vorstand – Vorsitzender", pageId: "verband" as ImagePageId, aspectRatio: "3/4", iconName: "Users" as PlaceholderIconName },
  { slotId: "verband.vorstand.christina-mansfeld", alt: "Christina Mansfeld", usedOn: "Vorstand – 1. Stellvertreterin", pageId: "verband" as ImagePageId, aspectRatio: "3/4", iconName: "Users" as PlaceholderIconName },
  { slotId: "verband.vorstand.falko-schurig", alt: "Falko Schurig", usedOn: "Vorstand – 2. Stellvertreter", pageId: "verband" as ImagePageId, aspectRatio: "3/4", iconName: "Users" as PlaceholderIconName },
  { slotId: "verband.geschaeftsstelle.friederike-thomas", alt: "Friederike Thomas", usedOn: "Geschäftsstelle", pageId: "verband" as ImagePageId, aspectRatio: "3/4", iconName: "Users" as PlaceholderIconName },
  { slotId: "verband.geschaeftsstelle.ulrike-zschunke", alt: "Ulrike Zschunke", usedOn: "Geschäftsstelle", pageId: "verband" as ImagePageId, aspectRatio: "3/4", iconName: "Users" as PlaceholderIconName },
] as const;

export type ImageSlotId = (typeof IMAGE_SLOTS)[number]["slotId"];

/**
 * Einheitliche Anzeigegrößen für Admin-Vorschau und Website (1:1).
 * Entspricht der typischen Darstellung im Content (max-w-7xl, 2–3 Spalten).
 */
export const DISPLAY_WIDTH_4_3 = 400;
export const DISPLAY_HEIGHT_4_3 = 300; // 4/3
export const DISPLAY_WIDTH_16_9 = 400;
export const DISPLAY_HEIGHT_16_9 = 225; // 16/9
export const DISPLAY_WIDTH_3_4 = 300;
export const DISPLAY_HEIGHT_3_4 = 400; // 3/4 (Hochformat)
/** Hero: Breite × Höhe wie typisch auf der Seite (Streifen) */
export const DISPLAY_WIDTH_HERO = 800;
export const DISPLAY_HEIGHT_HERO = 450;

export interface SlotDisplaySize {
  width: number;
  height: number;
}

export function getSlotDisplaySize(slotId: ImageSlotId, aspectRatio: string): SlotDisplaySize {
  if (slotId === "hero.background" || aspectRatio === "auto") {
    return { width: DISPLAY_WIDTH_HERO, height: DISPLAY_HEIGHT_HERO };
  }
  if (aspectRatio === "16/9") {
    return { width: DISPLAY_WIDTH_16_9, height: DISPLAY_HEIGHT_16_9 };
  }
  if (aspectRatio === "3/4") {
    return { width: DISPLAY_WIDTH_3_4, height: DISPLAY_HEIGHT_3_4 };
  }
  return { width: DISPLAY_WIDTH_4_3, height: DISPLAY_HEIGHT_4_3 };
}

/** PlaceholderImage-Einsatzorte (Legacy für Admin-Tabelle) */
export const PLACEHOLDER_USAGES: ImageRef[] = IMAGE_SLOTS.map((s) => ({
  path: "PlaceholderImage",
  alt: s.alt,
  usedOn: [s.usedOn],
  type: "placeholder" as const,
}));

export const ALL_IMAGES = [
  ...REAL_IMAGES,
  ...SVG_ASSETS,
  ...PLACEHOLDER_USAGES,
];
