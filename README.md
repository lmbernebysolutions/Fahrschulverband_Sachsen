# Landesverband Sächsischer Fahrlehrer e.V. – Website

Next.js-Website mit Admin-Bereich (`/losleben-admin`).

## Passwortschutz

Beim ersten Aufruf erscheint eine Zugangsabfrage. Ohne gültiges Passwort ist kein Seiteninhalt sichtbar.

- **Umgebung:** In `.env.local` (lokal) bzw. in Vercel unter **Environment Variables** setzen: `SITE_PASSWORD` = gewünschtes Passwort (für dieses Projekt: **Losleben2026**).
- Ohne gesetztes `SITE_PASSWORD` ist der Passwortschutz deaktiviert (nur für lokale Entwicklung sinnvoll).
- Siehe `.env.example`.

## Kundentest / Testanleitung

1. **Zugang:** Beim ersten Aufruf der Website erscheint die Passwortabfrage. Passwort eingeben (wird vom Betreiber bereitgestellt, z. B. aus `.env` / Vercel: `SITE_PASSWORD`). Der Zugang bleibt für 7 Tage gespeichert.
2. **Öffentliche Seiten:** Startseite, Der Verband, Für Fahrschulen, Für Fahrschüler, Aktuelles, Kontakt usw. über die Navigation durchklicken – alle Inhalte sind nutzbar.
3. **Admin-Bereich:** Unter **/losleben-admin** (Link im Header) können Sie alle Inhalte bearbeiten:
   - **Dashboard:** Startbereich (Überschrift, Text, Button) anpassen und speichern.
   - **News & Artikel:** Neue Artikel anlegen, bearbeiten, veröffentlichen. Der URL-Kurzname (Slug) wird bei leerer Eingabe automatisch aus dem Titel erzeugt.
   - **Termine, Fahrschulmarkt, Bilder, Website-Texte (Navigation, Footer, Mitgliedschaft), Tabellen (Beiträge), Einstellungen:** Änderungen werden gespeichert und sind für alle Besucher sichtbar.
4. **Persistenz:** Alle Admin-Änderungen werden über die API gespeichert (lokal: Dateisystem; auf Vercel: **Vercel Blob**). Dafür auf Vercel die Umgebungsvariable **BLOB_READ_WRITE_TOKEN** setzen (Vercel Blob Storage). Ohne Token sind auf Vercel keine Speicherungen möglich (Hinweis 503).

## Responsive (Mobile-first)

- **Breakpoints (Tailwind):** `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px. Kritische UI (Navigation, Haupt-CTA) ist unterhalb `lg` für Touch optimiert.
- **Container:** Einheitlich `max-w-7xl` mit `px-4 sm:px-6 lg:px-8`.
- **Touch-Ziele:** Klickbare Elemente mind. 44–48px (WCAG); CSS-Variable `--touch-target-min: 48px` in `globals.css`.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
