/**
 * Mock-Daten für Phoenix Redesign
 * Landesverband Sächsischer Fahrlehrer e.V.
 * Quelle: ECHTE_TEXTE.md, MASTER_BLUEPRINT
 */

// ============================================
// TYPES
// ============================================

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  category: "fortbildung" | "verband" | "mitglieder" | "allgemein";
  isPublished: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Seminar {
  id: string;
  title: string;
  category: "§53(1)" | "ASF/FES" | "Weitere";
  dateStart: string;
  dateEnd: string;
  time: string;
  location: string;
  description: string;
  maxParticipants: number;
  currentParticipants: number;
  isOpen: boolean;
  price?: string;
}

export interface FahrschulAd {
  id: string;
  title: string;
  description: string;
  type: "verkauf" | "suche" | "kooperation";
  location: string;
  contact: string;
  date: string;
  isActive: boolean;
}

export interface Bezirksverband {
  id: string;
  name: string;
  vorsitzender: string;
  stellvertreter: string;
  kontakt: string;
  kreisVerbaende: KreisVerband[];
}

export interface KreisVerband {
  id: string;
  name: string;
  ansprechpartner: string;
  kontakt: string;
}

export interface ImageAssignment {
  imagePath: string;
  objectPosition?: string; // CSS object-position, z.B. "50% 30%" für Fokus
}

export interface SiteSettings {
  heroHeadline: string;
  heroSubtext: string;
  heroCtaText: string;
  heroCtaLink: string;
  contactEmail: string;
  contactPhone: string;
  contactFax: string;
  contactAddress: string;
  /** Zugewiesene Bilder pro Slot (ersetzt PlaceholderImage) */
  imageAssignments?: Record<string, ImageAssignment>;
  /** Seite Mitgliedschaft – bearbeitbar unter Website-Texte */
  mitgliedschaftIntro?: string;
  mitgliedschaftBeitrittHeadline?: string;
  mitgliedschaftBeitrittText?: string;
  mitgliedschaftBeitrittButton?: string;
}

/** Einzelzeile der Mitgliedschaftsbeiträge-Tabelle (editierbar, Excel-Import) */
export interface FeeRow {
  id: string;
  label: string;
  betrag: string;
  hinweis: string | null;
}

/** Person Vorstand oder Geschäftsstelle */
export interface PersonData {
  id: string;
  name: string;
  role: string;
  fahrschule?: string;
  adresse?: string;
  telefon?: string;
  mobil?: string;
  email?: string;
  aufgaben?: string[];
  slotId?: string;
}

/** Angebot des Verbands (editierbar) */
export interface Offer {
  id: string;
  title: string;
  text: string;
  order: number;
}

/** Arbeitskreis (editierbar) */
export interface WorkingGroup {
  id: string;
  label: string;
  text: string;
  leiter: string;
  mobil: string;
  order: number;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  order: number;
  children?: NavigationItem[];
}

/** Service-Navigation (flache Liste) */
export interface NavServiceItem {
  id: string;
  label: string;
  href: string;
  order: number;
}

/** Editierbare Website-Navigation (Service + Main) */
export interface WebsiteNav {
  service: NavServiceItem[];
  main: NavigationItem[];
}

/** Editierbarer Footer-Inhalt */
export interface FooterContent {
  contact: {
    name: string;
    address: string;
    phone: string;
    fax: string;
    email: string;
  };
  membershipCta: {
    headline: string;
    text: string;
    buttonText: string;
  };
  copyright: string;
}

// ============================================
// INITIAL DATA (aus ECHTE_TEXTE.md)
// ============================================

export const initialNews: NewsArticle[] = [
  {
    id: "1",
    slug: "fortbildung-53-chemnitz-2026",
    title: "Fortbildung gemäß § 53 (1) in Chemnitz",
    date: "2026-02-10",
    excerpt:
      "Fortbildung gemäß § 53 (1) FahrlG vom 24.03.-26.03.2026 im Hotel Alte Mühle in Chemnitz. Interessierte können sich noch für das o.g. Seminar anmelden.",
    content:
      "Fortbildung gemäß § 53 (1) FahrlG vom 24.03.-26.03.2026 im Hotel Alte Mühle in Chemnitz. Interessierte können sich noch für das o.g. Seminar anmelden. Die Fortbildung richtet sich an alle Fahrlehrer, die ihre gesetzlich vorgeschriebene Weiterbildung absolvieren möchten.",
    category: "fortbildung",
    isPublished: true,
    isFeatured: false,
    createdAt: "2026-02-10T10:00:00Z",
    updatedAt: "2026-02-10T10:00:00Z",
  },
  {
    id: "2",
    slug: "mitgliederversammlung-2026",
    title: "Mitgliederversammlung 2026",
    date: "2026-02-01",
    excerpt:
      "35 Jahre - Landesverband Sächsischer Fahrlehrer e.V. Sehr geehrte Mitglieder, sehr geehrte Partner, unsere nächste Mitgliederversammlung findet am 9. Mai 2026 im Atlanta Hotel Leipzig statt.",
    content:
      "35 Jahre - Landesverband Sächsischer Fahrlehrer e.V. Sehr geehrte Mitglieder, sehr geehrte Partner, unsere nächste Mitgliederversammlung findet am 9. Mai 2026 im Atlanta Hotel Leipzig in Leipzig/Wachau statt. Wir möchten mit Ihnen das 35-jährige Bestehen des Landesverbandes Sächs. Fahrlehrer e. V. feiern. Alle Infos zu unserer Veranstaltung. Bitte planen Sie den Termin jetzt schon in ihren Terminkalender ein. Anmeldungen zum Rahmenprogramm und zu der Abendveranstaltung sind ab sofort möglich.",
    category: "verband",
    isPublished: true,
    isFeatured: true,
    createdAt: "2026-02-01T10:00:00Z",
    updatedAt: "2026-02-01T10:00:00Z",
  },
  {
    id: "3",
    slug: "beitragsrechnung-2026",
    title: "Beitragsrechnung für 2026",
    date: "2026-01-15",
    excerpt:
      "Sehr geehrte Mitglieder, wir werden Ihnen die Rechnung für den Beitrag 2026 am 19. Januar 2026 zusenden. Der SEPA-Lastschrifteinzug wird am entsprechenden Termin durchgeführt.",
    content:
      "Sehr geehrte Mitglieder, wir werden Ihnen die Rechnung für den Beitrag 2026 am 19. Januar 2026 zusenden. Der SEPA-Lastschrifteinzug wird am entsprechenden Termin durchgeführt.",
    category: "mitglieder",
    isPublished: true,
    isFeatured: false,
    createdAt: "2026-01-15T10:00:00Z",
    updatedAt: "2026-01-15T10:00:00Z",
  },
];

export const initialSeminars: Seminar[] = [
  {
    id: "1",
    title: "§ 53 (1) FahrlG",
    category: "§53(1)",
    dateStart: "2026-03-24",
    dateEnd: "2026-03-26",
    time: "08:30 - 16:30 Uhr",
    location: "Hotel Alte Mühle in Chemnitz",
    description: "Fahrlehrerfortbildung gemäß § 53 (1) FahrlG. Anmeldeschluss: 4 Wochen vor Beginn.",
    maxParticipants: 25,
    currentParticipants: 18,
    isOpen: true,
  },
  {
    id: "2",
    title: "§ 53 (1) FahrlG",
    category: "§53(1)",
    dateStart: "2026-08-19",
    dateEnd: "2026-08-21",
    time: "08:30 - 16:30 Uhr",
    location: "Beierleins Landgasthof/VSZ am Sachsenring",
    description: "Fahrlehrerfortbildung gemäß § 53 (1) FahrlG. Anmeldeschluss: 4 Wochen vor Beginn.",
    maxParticipants: 25,
    currentParticipants: 10,
    isOpen: true,
  },
  {
    id: "3",
    title: "§ 53 (1) FahrlG",
    category: "§53(1)",
    dateStart: "2026-11-04",
    dateEnd: "2026-11-06",
    time: "08:30 - 16:30 Uhr",
    location: "Gasthof Coschütz in Dresden",
    description: "Fahrlehrerfortbildung gemäß § 53 (1) FahrlG. Anmeldeschluss: 4 Wochen vor Beginn.",
    maxParticipants: 25,
    currentParticipants: 0,
    isOpen: true,
  },
  {
    id: "4",
    title: "§ 53 (1) FahrlG",
    category: "§53(1)",
    dateStart: "2026-11-24",
    dateEnd: "2026-11-26",
    time: "08:30 - 16:30 Uhr",
    location: "Haus Grillensee in Naunhof b. Leipzig",
    description: "Fahrlehrerfortbildung gemäß § 53 (1) FahrlG. Anmeldeschluss: 4 Wochen vor Beginn.",
    maxParticipants: 25,
    currentParticipants: 0,
    isOpen: true,
  },
  {
    id: "5",
    title: "ASF",
    category: "ASF/FES",
    dateStart: "2026-10-27",
    dateEnd: "2026-10-27",
    time: "08:30 - 16:30 Uhr",
    location: "Hotel zum Erbgericht in Höckendorf bei Tharandt",
    description: "Fortbildung für Kursleiter ASF. Anmeldeschluss: 4 Wochen vor Beginn.",
    maxParticipants: 20,
    currentParticipants: 5,
    isOpen: true,
  },
  {
    id: "6",
    title: "FES",
    category: "ASF/FES",
    dateStart: "2026-10-28",
    dateEnd: "2026-10-28",
    time: "08:30 - 16:30 Uhr",
    location: "Hotel zum Erbgericht in Höckendorf bei Tharandt",
    description: "Fortbildung für Kursleiter FES. Anmeldeschluss: 4 Wochen vor Beginn.",
    maxParticipants: 20,
    currentParticipants: 3,
    isOpen: true,
  },
  {
    id: "7",
    title: "Einweisung zum Ausbildungsfahrlehrer",
    category: "Weitere",
    dateStart: "2026-02-02",
    dateEnd: "2026-02-06",
    time: "08:30 - 16:30 Uhr",
    location: "Hotel zum Erbgericht in Klingenberg OT Höckendorf",
    description: "Einweisungslehrgang für angehende Ausbildungsfahrlehrer. Anmeldeschluss: 4 Wochen vor Beginn.",
    maxParticipants: 15,
    currentParticipants: 12,
    isOpen: true,
  },
];

export const initialFahrschulAds: FahrschulAd[] = [
  {
    id: "1",
    title: "Altersbedingt - Fahrschule aller Klassen zu verkaufen",
    description: "Fahrschule aller Klassen und staatlich anerkannte Aus- und Weiterbildungsstätte im Raum Bautzen - zu verkaufen. Bei Interesse bitte unter 03594 779780 melden.",
    type: "verkauf",
    location: "Raum Bautzen",
    contact: "03594 779780",
    date: new Date().toISOString().slice(0, 10),
    isActive: true,
  },
  {
    id: "2",
    title: "Gut laufende Fahrschule zwischen Dresden und Leipzig",
    description: "Du träumst von Selbstständigkeit? Gut laufende Fahrschule aller Klassen, zwischen Dresden und Leipzig (Ort mit 35.000 Einwohnern) gelegen, altersbedingt, zeitnah abzugeben. Unsere Fahrschule besteht seit 33 Jahren. Anerkannte Ausbildungsstätte gemäß § 18 (3) BKrFQG. Arbeit für mindestens 2–3 Fahrlehrer/-in in Vollzeit. Auf Wunsch Mietkauf möglich.",
    type: "verkauf",
    location: "Zwischen Dresden und Leipzig",
    contact: "0172/3510527, FS-mituns@gmx.de",
    date: new Date().toISOString().slice(0, 10),
    isActive: true,
  },
];

export const initialBezirksverbaende: Bezirksverband[] = [];

export const initialSettings: SiteSettings = {
  heroHeadline: "35 Jahre - Landesverband Sächsischer Fahrlehrer e.V.",
  heroSubtext:
    "Ihr Interessenverband für Fahrschulen und Fahrlehrer in Sachsen. Fortbildungen, Fahrschulsuche und aktuelle Brancheninformationen.",
  heroCtaText: "Mitgliederversammlung 2026",
  heroCtaLink: "/aktuelles/mitgliederversammlung-2026",
  contactEmail: "info@fahrlehrerverband-sachsen.de",
  contactPhone: "0351 478 68-0",
  contactFax: "0351 478 68-12",
  contactAddress: "Bernhardstr. 35, 01187 Dresden",
  imageAssignments: {},
  mitgliedschaftIntro: "Die Mitgliedschaft im Verband. In einer Verbandsfahrschule sind Sie immer gut beraten. Laut unserer Satzung können alle von der Behörde zugelassenen Fahrlehrer Mitglied des Verbandes werden. Der Antrag ist schriftlich zu stellen. Fördernde Mitglieder können alle natürlichen und juristischen Personen werden, die die Ziele des Verbandes anerkennen und unterstützen.",
  mitgliedschaftBeitrittHeadline: "Haben wir Ihr Interesse geweckt?",
  mitgliedschaftBeitrittText: "Dann freuen wir uns auf Ihre Mitgliedschaft. An dieser Stelle können Sie das Beitrittsformular im PDF-Format downloaden. Bitte füllen Sie es aus und schicken Sie es anschließend per FAX an: 0351 47868-12, per Post: Landesverband Sächsischer Fahrlehrer e.V., Bernhardstr. 35, 01187 Dresden, oder per Mail an: info@fahrlehrerverband-sachsen.de an uns zurück.",
  mitgliedschaftBeitrittButton: "Beitrittserklärung Sächsischer Fahrlehrerverband (PDF)",
};

/** Mitgliedschaftsbeiträge (editierbar, Excel-Import) – aus siteContent.mitgliedschaft.beitrag.saetze */
export const initialMembershipFees: FeeRow[] = [
  { id: "fee-1", label: "Aufnahmegebühr", betrag: "25,00 EUR", hinweis: null },
  { id: "fee-2", label: "Fahrschulinhaber / verantwortliche Leiter", betrag: "304,00 EUR", hinweis: null },
  { id: "fee-3", label: "Angestellte Fahrlehrer", betrag: "189,00 EUR", hinweis: null },
  {
    id: "fee-4",
    label: "Angestellte Fahrlehrer (Fahrschulinhaber bereits Mitglied)",
    betrag: "135,84 EUR",
    hinweis: "ohne Fahrlehrer-Info und Zeitschrift „Fahrschule“",
  },
  {
    id: "fee-5",
    label: "Fahrlehrer in Ausbildung (FLiAusB)",
    betrag: "beitragsfrei",
    hinweis:
      "ohne Fahrlehrer-Info und Zeitschrift „Fahrschule“ – Kontakt zum Büro erforderlich",
  },
];

/** Website-Navigation (editierbar) – aus siteContent.nav */
export const initialWebsiteNav: WebsiteNav = {
  service: [
    { id: "svc-1", label: "Kontakt", href: "/kontakt", order: 1 },
    { id: "svc-2", label: "Mitgliederbereich", href: "/mitgliederbereich", order: 2 },
    { id: "svc-3", label: "Impressum", href: "/impressum", order: 3 },
    { id: "svc-4", label: "Datenschutz", href: "/datenschutz", order: 4 },
  ],
  main: [
    {
      id: "main-1",
      label: "Der Verband",
      href: "/der-verband/ueber-uns",
      order: 1,
      children: [
        { id: "main-1-1", label: "Über uns", href: "/der-verband/ueber-uns", order: 1 },
        { id: "main-1-2", label: "Vorstand/Geschäftsstelle", href: "/der-verband/vorstand-geschaeftsstelle", order: 2 },
        { id: "main-1-3", label: "Mitgliedschaft", href: "/der-verband/mitgliedschaft", order: 3 },
      ],
    },
    {
      id: "main-2",
      label: "Für Fahrschulen",
      href: "/fuer-fahrschulen",
      order: 2,
      children: [
        { id: "main-2-1", label: "Übersicht", href: "/fuer-fahrschulen", order: 1 },
        { id: "main-2-2", label: "Termine Fortbildung", href: "/fuer-fahrschulen/termine-fortbildung", order: 2 },
        { id: "main-2-3", label: "Stellenangebote", href: "/fuer-fahrschulen/stellenangebote", order: 3 },
        { id: "main-2-4", label: "Fahrschulmarkt", href: "/fuer-fahrschulen/fahrschulmarkt", order: 4 },
      ],
    },
    {
      id: "main-3",
      label: "Für Fahrschüler",
      href: "/fuer-fahrschueler/fahrschulsuche",
      order: 3,
      children: [
        { id: "main-3-1", label: "Fahrschulsuche", href: "/fuer-fahrschueler/fahrschulsuche", order: 1 },
        { id: "main-3-2", label: "Berufskraftfahrer", href: "/fuer-fahrschueler/berufskraftfahrer", order: 2 },
        { id: "main-3-3", label: "Aufbauseminare", href: "/fuer-fahrschueler/aufbauseminare", order: 3 },
        { id: "main-3-4", label: "Mobil ohne Angst", href: "/fuer-fahrschueler/mobil-ohne-angst", order: 4 },
        { id: "main-3-5", label: "Fahreignungsseminare", href: "/fuer-fahrschueler/fahreignungsseminare", order: 5 },
        { id: "main-3-6", label: "Behindertenausbildung", href: "/fuer-fahrschueler/behindertenausbildung", order: 6 },
      ],
    },
    { id: "main-4", label: "Aktuelles", href: "/aktuelles", order: 4 },
  ],
};

/** Footer-Inhalt (editierbar) – aus siteContent.footer */
export const initialFooterContent: FooterContent = {
  contact: {
    name: "Landesverband Sächsischer Fahrlehrer e.V.",
    address: "Bernhardstr. 35, 01187 Dresden",
    phone: "0351 478 68-0",
    fax: "0351 478 68-12",
    email: "info@fahrlehrerverband-sachsen.de",
  },
  membershipCta: {
    headline: "Werden Sie Mitglied!",
    text: "Profitieren Sie von Fortbildungsangeboten, Rahmenverträgen und der starken Gemeinschaft.",
    buttonText: "Jetzt Mitglied werden",
  },
  copyright: "© 2026 Landesverband Sächs. Fahrlehrer e.V.",
};

/** Angebote des Landesverbandes (editierbar) – aus siteContent.angebote.items */
export const initialOffers: Offer[] = [
  { id: "off-1", title: "Rahmenvertrag mit TOTAL", text: "Alle selbständig tätigen Fahrschulen des Landesverbandes Sächsische Fahrlehrer e.V. erhalten attraktive Nachlässe auf Kraftstoffe, Schmierstoffe und Autowäsche. Sowohl im Inland als auch Ausland bietet Ihnen die TOTAL-Tankkarte eine einfache bargeldlose und kostensparende Abwicklung Ihrer Betankungen. Somit bleibt Ihnen das Sammeln unnötiger Belege erspart!", order: 1 },
  { id: "off-2", title: "Fahrlehrer-Info für Sachsen", text: "Das Rundschreiben des Landesverbandes Sächsischer Fahrlehrer e.V. erscheint vierteljährlich und wird kostenlos an alle Mitglieder verschickt. Damit informieren wir aktuell zu allen die Fahrlehrerschaft betreffenden rechtlichen Änderungen und berichten über Aktivitäten und Veranstaltungen auf Landes- und Bundesebene. Erläuterungen und Handlungsempfehlungen sollen Sie in Ihrer Tätigkeit als Fahrlehrer bzw. Fahrschulinhaber unterstützen. Wichtige Urteile und der aktuelle Fortbildungskalender sind fester Bestandteil der Fahrlehrer-Info.", order: 2 },
  { id: "off-3", title: "Rahmenvertrag mit ORLEN Deutschland - star Tankstellen", text: "Die star Flottenkarte bietet die Möglichkeit des bargeldlosen Zahlens an knapp 550 teilnehmenden star Tankstellen von Schleswig-Holstein bis ins Rhein-Main Gebiet. In Zusammenarbeit mit dem Landesverband Sächsischer Fahrlehrer e.V. erhalten die Mitglieder exklusiv Top-Konditionen!", order: 3 },
  { id: "off-4", title: "Flottenkundenvertrag mit ATU", text: "Digital, bequem und nachhaltig - das ist ATU für Geschäftskunden. Als erfahrener Partner im Bereich Flottenlösungen unterstützen wir Sie mit maßgeschneiderten Komplettservices und digitalen Fuhrparklösungen bei den täglichen Aufgaben rund um die Verwaltung Ihrer Flotte. Als Vorreiter in den Bereichen E-Mobilität, Digitalisierung und Nachhaltigkeit sind wir der perfekte Partner für moderne Fuhrparkverwaltung - heute und in Zukunft.", order: 4 },
  { id: "off-5", title: "Kostenlose Informationen und Materialien", text: "Selbstverständlich unterstützen wir unsere Mitglieder auch mit kostenlosen Informationsmaterialien und anderen Hilfsmitteln. Wir weisen allerdings darauf hin, dass bestimmte Angebote nicht immer verfügbar sind und gegebenenfalls auch durch andere Artikel oder aus aktuellem Anlass ersetzt werden.", order: 5 },
  { id: "off-6", title: "Kostenloser Eintrag in der Online-Fahrschulsuche", text: "Nicht nur Verbandsmitglieder zählen zu den Besuchern unserer Internetseite. Auch angehende Fahrschüler, Verkehrsteilnehmer oder Unternehmen informieren sich auf der Internetseite des Landesverbandes. Speziell für diese Interessenten bieten wir eine sehr komfortable Online-Fahrschulsuche an. Als Verbandsmitglied können Sie sich mit Ihrem Fahrschulunternehmen kostenlos in dieser Online-Suche eintragen lassen.", order: 6 },
];
