# Vercel Deployment – Übersicht

## Passwortschutz (Vercel)

In den **Vercel Environment Variables** setzen: `SITE_PASSWORD` = **Losleben2026** (oder eigenes Passwort). Ohne diese Variable ist der Zugang offen.

---

## Kurzantwort: **Teilweise ja**

- **Website (öffentliche Seiten)** → funktioniert auf Vercel.
- **Admin (Lesen, Bearbeiten im Browser)** → funktioniert, Daten liegen in **localStorage** (pro Gerät/Browser).
- **API-Routen (JSON speichern)** und **Bild-Uploads** → funktionieren auf Vercel **nicht dauerhaft**, weil das Dateisystem dort schreibgeschützt ist.

---

## Was auf Vercel funktioniert

| Bereich | Status |
|--------|--------|
| Build & Deploy | ✅ `next build` läuft durch |
| Öffentliche Seiten (Startseite, Verband, Termine, …) | ✅ |
| Admin-UI (Losleben-Admin) | ✅ |
| Admin-Daten (News, Termine, Fahrschulmarkt, Einstellungen, Website-Texte, Beiträge) | ✅ Über **localStorage** – Änderungen bleiben im jeweiligen Browser, nicht auf dem Server |

---

## Was auf Vercel nicht dauerhaft funktioniert

### 1. API-Routen `/api/content/[type]` (GET + POST)

- **GET**: Könnte funktionieren, wenn die JSON-Dateien im Repo unter `data/` liegen und mit ausgeliefert werden. Aktuell werden die Dateien beim ersten GET angelegt – auf Vercel ist das Schreiben in `data/` nicht möglich.
- **POST**: Schreibzugriffe auf `data/` schlagen fehl, weil das Dateisystem in Serverless-Funktionen **read-only** ist (außer `/tmp`, der nicht dauerhaft ist).

**Folge:** Die geplante Persistenz über JSON-Dateien (Phase 3) ist auf Vercel so **nicht** nutzbar.

### 2. Bild-Upload (Server Actions in `uploadImage.ts`)

- Bilder werden in `public/images/` geschrieben.
- Auf Vercel ist `public/` zur Laufzeit **nicht beschreibbar** – Uploads scheitern oder würden nur in einer temporären Umgebung landen und gehen beim nächsten Request verloren.

**Folge:** Die Admin-Funktion „Bilder hochladen / zuweisen“ funktioniert auf Vercel **nicht**.

---

## Empfehlungen für ein vollständiges Vercel-Deployment

1. **Daten (Content, News, Termine, …)**  
   - Option A: Weiter **localStorage** nutzen (kein Server-Speicher, aber Admin funktioniert pro Browser).  
   - Option B: Externen Dienst nutzen (z. B. **Vercel Postgres**, **Vercel Blob**, **Supabase**, **Airtable**) und die API-Routen bzw. den Context darauf umbauen.

2. **Bilder**  
   - Upload in **Vercel Blob Storage** (oder S3, Cloudinary, etc.) umbauen.  
   - URLs der Bilder in Einstellungen/Context speichern und in der UI anzeigen.

3. **API-Routen anpassen**  
   - Wenn du bei JSON bleiben willst: Nur **lesen** aus dem Repo (z. B. `data/*.json` ins Build aufnehmen).  
   - Schreiben über eine externe Speicherlösung (Datenbank, Blob, etc.) anbinden.

---

## Deployment ohne Änderungen

Wenn du **ohne** Code-Anpassung auf Vercel deployen willst:

- **Deploy:** z. B. `vercel` im Ordner `website/` oder Verknüpfung mit GitHub.
- **Ergebnis:**  
  - Öffentliche Website und Admin-UI laufen.  
  - Admin-Änderungen (Texte, News, Termine, …) bleiben nur im **localStorage** des Browsers.  
  - **Bild-Uploads** und **API POST** schlagen fehl (Fehler in der Konsole bzw. in der Network-Ansicht).

Wenn du möchtest, kann ich als Nächstes konkrete Schritte vorschlagen (z. B. API nur lesend machen, Fehler abfangen, oder Umstieg auf Vercel Blob/Postgres skizzieren).
