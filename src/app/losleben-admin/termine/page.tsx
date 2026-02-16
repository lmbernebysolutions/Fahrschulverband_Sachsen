"use client";

import Link from "next/link";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useSiteData } from "@/context/SiteDataContext";
import type { Seminar } from "@/lib/mockData";
import { AdminBreadcrumbs } from "@/components/admin";
import { Toast } from "@/components/molecules";
import { Badge } from "@/components/atoms";
import { useState } from "react";

export default function AdminTerminePage() {
  const { seminars, deleteSeminar } = useSiteData();
  const [toast, setToast] = useState<{
    message: string;
    variant: "success" | "error";
  } | null>(null);

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm("Termin wirklich löschen?")) {
      deleteSeminar(id);
      setToast({ message: "Termin gelöscht.", variant: "success" });
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <AdminBreadcrumbs items={["Übersicht", "Termine & Seminare"]} />
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-bold text-neutral-900">
            Termine & Seminare
          </h1>
          <Link
            href="/losleben-admin/termine/neu"
            className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-md bg-primary-500 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          >
            <Plus className="size-5 shrink-0" aria-hidden />
            Neuer Termin
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
        {seminars.map((seminar) => (
          <Link
            key={seminar.id}
            href={`/losleben-admin/termine/${seminar.id}`}
            className="flex items-center gap-4 rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition-all hover:border-primary-200 hover:shadow-md"
          >
            <div className="min-w-0 flex-1">
              <p className="text-xl font-semibold text-neutral-800">
                {seminar.title}
              </p>
              <p className="text-base text-neutral-500">
                {seminar.dateStart} – {seminar.dateEnd} | {seminar.location}
              </p>
            </div>
            <Badge variant="category">{seminar.category}</Badge>
            <span className="flex items-center gap-2 text-primary-600">
              <Pencil className="size-5" aria-hidden />
              <span className="text-lg font-medium">Bearbeiten</span>
            </span>
            <button
              type="button"
              onClick={(e) => handleDelete(e, seminar.id)}
              className="rounded-lg p-2 text-neutral-500 hover:bg-red-50 hover:text-red-600"
              aria-label="Löschen"
            >
              <Trash2 className="size-5" />
            </button>
          </Link>
        ))}
        {seminars.length === 0 && (
          <div className="rounded-xl border border-neutral-200 bg-white p-12 text-center">
            <p className="text-xl text-neutral-600">Noch keine Termine.</p>
            <Link
              href="/losleben-admin/termine/neu"
              className="mt-6 inline-flex min-h-[56px] items-center justify-center gap-2 rounded-md bg-primary-500 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            >
              <Plus className="size-5 shrink-0" aria-hidden />
              Ersten Termin anlegen
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
