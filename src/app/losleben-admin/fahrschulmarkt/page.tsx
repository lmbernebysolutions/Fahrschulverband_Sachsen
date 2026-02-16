"use client";

import Link from "next/link";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useSiteData } from "@/context/SiteDataContext";
import type { FahrschulAd } from "@/lib/mockData";
import { AdminBreadcrumbs } from "@/components/admin";
import { Toast } from "@/components/molecules";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/atoms";
import { useState } from "react";

const types = [
  { value: "verkauf", label: "Verkauf" },
  { value: "suche", label: "Suche" },
  { value: "kooperation", label: "Kooperation" },
];

export default function AdminFahrschulmarktPage() {
  const { fahrschulAds, deleteFahrschulAd } = useSiteData();
  const [toast, setToast] = useState<{
    message: string;
    variant: "success" | "error";
  } | null>(null);

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm("Anzeige wirklich löschen?")) {
      deleteFahrschulAd(id);
      setToast({ message: "Anzeige gelöscht.", variant: "success" });
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <AdminBreadcrumbs items={["Übersicht", "Fahrschulmarkt"]} />
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-bold text-neutral-900">
            Fahrschulmarkt
          </h1>
          <Link
            href="/losleben-admin/fahrschulmarkt/neu"
            className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-md bg-primary-500 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          >
            <Plus className="size-5 shrink-0" aria-hidden />
            Neue Anzeige
          </Link>
        </div>
      </div>

      {toast && (
        <Toast
          variant={toast.variant}
          message={toast.message}
          onDismiss={() => setToast(null)}
        />
      )}

      <div className="space-y-4">
        {fahrschulAds.map((ad) => (
          <Link
            key={ad.id}
            href={`/losleben-admin/fahrschulmarkt/${ad.id}`}
            className="flex items-center gap-4 rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition-all hover:border-primary-200 hover:shadow-md"
          >
            <span
              className={`size-4 shrink-0 rounded-full ${ad.isActive ? "bg-green-500" : "bg-neutral-400"}`}
            />
            <div className="min-w-0 flex-1">
              <p className="text-xl font-semibold text-neutral-800">
                {ad.title}
              </p>
              <p className="text-base text-neutral-500">
                {formatDate(ad.date)} | {ad.location}
              </p>
            </div>
            <Badge variant="category">
              {types.find((t) => t.value === ad.type)?.label ?? ad.type}
            </Badge>
            <span className="flex items-center gap-2 text-primary-600">
              <Pencil className="size-5" aria-hidden />
              <span className="text-lg font-medium">Bearbeiten</span>
            </span>
            <button
              type="button"
              onClick={(e) => handleDelete(e, ad.id)}
              className="rounded-lg p-2 text-neutral-500 hover:bg-red-50 hover:text-red-600"
              aria-label="Löschen"
            >
              <Trash2 className="size-5" />
            </button>
          </Link>
        ))}
        {fahrschulAds.length === 0 && (
          <div className="rounded-xl border border-neutral-200 bg-white p-12 text-center">
            <p className="text-xl text-neutral-600">Noch keine Anzeigen.</p>
            <Link
              href="/losleben-admin/fahrschulmarkt/neu"
              className="mt-6 inline-flex min-h-[56px] items-center justify-center gap-2 rounded-md bg-primary-500 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            >
              <Plus className="size-5 shrink-0" aria-hidden />
              Erste Anzeige anlegen
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
