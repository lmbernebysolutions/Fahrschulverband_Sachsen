"use client";

import { useState } from "react";
import Link from "next/link";
import { PenSquare, RefreshCw } from "lucide-react";
import { useSiteData } from "@/context/SiteDataContext";
import { Button, Input } from "@/components/atoms";
import { formatDate } from "@/lib/utils";

export default function AdminDashboardPage() {
  const {
    news,
    seminars,
    fahrschulAds,
    settings,
    lastSync,
    updateSettings,
  } = useSiteData();

  const [startHeadline, setStartHeadline] = useState(settings.heroHeadline);
  const [startText, setStartText] = useState(settings.heroSubtext);
  const [startButtonText, setStartButtonText] = useState(settings.heroCtaText);

  const handleSaveStartbereich = () => {
    updateSettings({
      heroHeadline: startHeadline,
      heroSubtext: startText,
      heroCtaText: startButtonText,
    });
  };

  const activeSeminars = seminars.filter((s) => s.isOpen).length;
  const activeAds = fahrschulAds.filter((a) => a.isActive).length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">
          Willkommen, Peter
        </h1>
        <p className="mt-1 text-neutral-500">Hier ist Ihre Übersicht.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Link
          href="/losleben-admin/news"
          className="rounded-xl bg-white p-6 shadow-card transition-all border-l-4 border-l-transparent hover:shadow-hover hover:border-l-primary-500"
        >
          <p className="text-3xl font-bold text-primary-500">{news.length}</p>
          <p className="mt-1 text-neutral-600">News Artikel</p>
          <p className="mt-2 text-sm text-primary-500">→ Verwalten</p>
        </Link>
        <Link
          href="/losleben-admin/termine"
          className="rounded-xl bg-white p-6 shadow-card transition-all border-l-4 border-l-transparent hover:shadow-hover hover:border-l-primary-500"
        >
          <p className="text-3xl font-bold text-primary-500">
            {activeSeminars}
          </p>
          <p className="mt-1 text-neutral-600">Termine aktiv</p>
          <p className="mt-2 text-sm text-primary-500">→ Verwalten</p>
        </Link>
        <Link
          href="/losleben-admin/fahrschulmarkt"
          className="rounded-xl bg-white p-6 shadow-card transition-all border-l-4 border-l-transparent hover:shadow-hover hover:border-l-primary-500"
        >
          <p className="text-3xl font-bold text-primary-500">{activeAds}</p>
          <p className="mt-1 text-neutral-600">Anzeigen offen</p>
          <p className="mt-2 text-sm text-primary-500">→ Verwalten</p>
        </Link>
        <Link
          href="/losleben-admin/bilder"
          className="rounded-xl bg-white p-6 shadow-card transition-all border-l-4 border-l-transparent hover:shadow-hover hover:border-l-primary-500"
        >
          <p className="text-3xl font-bold text-primary-500">Bilder</p>
          <p className="mt-1 text-neutral-600">Mediathek</p>
          <p className="mt-2 text-sm text-primary-500">→ Verwalten</p>
        </Link>
        <Link
          href="/"
          target="_blank"
          className="rounded-xl bg-white p-6 shadow-card transition-all border-l-4 border-l-transparent hover:shadow-hover hover:border-l-primary-500"
        >
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
            </span>
            <p className="text-lg font-bold text-neutral-800">Website</p>
          </div>
          <p className="mt-1 text-neutral-600">Online</p>
          <p className="mt-2 text-sm text-primary-500">→ Öffnen</p>
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Link
          href="/losleben-admin/news"
          className="flex rounded-xl border-2 border-transparent bg-white p-8 shadow-card transition-all border-l-4 border-l-transparent hover:shadow-hover hover:border-l-primary-500"
        >
          <PenSquare className="size-12 shrink-0 text-primary-500" />
          <div className="ml-6">
            <h3 className="text-lg font-semibold text-neutral-800">
              Neuigkeit erstellen
            </h3>
            <p className="mt-2 text-neutral-600">
              Erstellen Sie einen neuen News-Artikel für die Website.
            </p>
            <p className="mt-4 font-medium text-primary-500">
              Neue News erstellen →
            </p>
          </div>
        </Link>
        <div className="rounded-xl bg-white p-8 shadow-card">
          <RefreshCw className="size-12 shrink-0 text-primary-500" />
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-neutral-800">
              Letzter Sync
            </h3>
            <p className="mt-2 text-neutral-600">
              Letzte Änderung: {formatDate(lastSync.slice(0, 10))},{" "}
              {new Date(lastSync).toLocaleTimeString("de-DE", {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              Uhr
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-white p-8 shadow-card lg:col-span-2">
          <h3 className="text-lg font-semibold text-neutral-800">
            Startbereich bearbeiten
          </h3>
          <p className="mt-1 text-sm text-neutral-600">
            Großer Bereich oben auf der Startseite (Überschrift, Text, Button).
          </p>
          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700">
                Überschrift
              </label>
              <Input
                value={startHeadline}
                onChange={(e) => setStartHeadline(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700">
                Text
              </label>
              <textarea
                value={startText}
                onChange={(e) => setStartText(e.target.value)}
                className="mt-1 min-h-[80px] w-full rounded-md border border-neutral-300 px-4 py-3"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700">
                Button-Text
              </label>
              <Input
                value={startButtonText}
                onChange={(e) => setStartButtonText(e.target.value)}
                className="mt-1"
              />
            </div>
            <Button variant="primary" onClick={handleSaveStartbereich}>
              Speichern
            </Button>
          </div>
        </div>

        <div className="rounded-xl bg-primary-50 p-8 lg:col-span-2">
          <h3 className="text-lg font-semibold text-neutral-800">
            Live-Vorschau
          </h3>
          <p className="mt-1 text-sm text-neutral-600">
            So sieht der Startbereich auf der Startseite aus:
          </p>
          <div className="mt-6 scale-75 origin-top-left overflow-hidden rounded-xl border border-neutral-200 bg-gradient-to-br from-primary-500 to-primary-700 p-6 lg:scale-50">
            <h1 className="text-2xl font-bold text-white">
              {startHeadline}
            </h1>
            <p className="mt-2 text-sm text-white line-clamp-2">
              {startText}
            </p>
            <div className="mt-4 flex gap-2">
              <span className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-primary-600">
                {startButtonText}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
