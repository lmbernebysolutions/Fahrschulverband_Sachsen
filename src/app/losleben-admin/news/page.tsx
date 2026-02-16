"use client";

import Link from "next/link";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useSiteData } from "@/context/SiteDataContext";
import type { NewsArticle } from "@/lib/mockData";
import { AdminBreadcrumbs } from "@/components/admin";
import { Toast } from "@/components/molecules";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/atoms";
import { useState } from "react";

const categories = [
  { value: "fortbildung", label: "Fortbildung" },
  { value: "verband", label: "Verband" },
  { value: "mitglieder", label: "Mitglieder" },
  { value: "allgemein", label: "Allgemein" },
];

export default function AdminNewsPage() {
  const { news, deleteNews } = useSiteData();
  const [toast, setToast] = useState<{
    message: string;
    variant: "success" | "error";
  } | null>(null);

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm("Artikel wirklich löschen?")) {
      deleteNews(id);
      setToast({ message: "Artikel gelöscht.", variant: "success" });
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <AdminBreadcrumbs items={["Übersicht", "News & Artikel"]} />
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-bold text-neutral-900">
            News & Artikel
          </h1>
          <Link
            href="/losleben-admin/news/neu"
            className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-md bg-primary-500 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          >
            <Plus className="size-5 shrink-0" aria-hidden />
            Neue News
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
        {news.map((article) => (
          <Link
            key={article.id}
            href={`/losleben-admin/news/${article.id}`}
            className="flex flex-col gap-3 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm transition-all hover:border-primary-200 hover:shadow-md sm:flex-row sm:items-center sm:gap-4 sm:p-5"
          >
            <span
              className={`size-4 shrink-0 rounded-full ${article.isPublished ? "bg-green-500" : "bg-neutral-400"}`}
              title={article.isPublished ? "Publiziert" : "Entwurf"}
            />
            <div className="min-w-0 flex-1">
              <p className="break-words text-lg font-semibold text-neutral-800 sm:text-xl">
                {article.title}
              </p>
              <p className="mt-0.5 text-sm text-neutral-500 sm:text-base">
                {formatDate(article.date)}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 border-t border-neutral-100 pt-3 sm:shrink-0 sm:border-0 sm:pt-0">
              <Badge variant="category">
                {categories.find((c) => c.value === article.category)?.label ??
                  article.category}
              </Badge>
              <span className="flex items-center gap-1.5 text-primary-600 sm:gap-2">
                <Pencil className="size-4 shrink-0 sm:size-5" aria-hidden />
                <span className="text-base font-medium sm:text-lg">Bearbeiten</span>
              </span>
              <button
                type="button"
                onClick={(e) => handleDelete(e, article.id)}
                className="ml-auto rounded-lg p-2 text-neutral-500 hover:bg-red-50 hover:text-red-600 sm:ml-0"
                aria-label="Löschen"
              >
                <Trash2 className="size-4 sm:size-5" />
              </button>
            </div>
          </Link>
        ))}
        {news.length === 0 && (
          <div className="rounded-xl border border-neutral-200 bg-white p-12 text-center">
            <p className="text-xl text-neutral-600">Noch keine Artikel.</p>
            <Link
              href="/losleben-admin/news/neu"
              className="mt-6 inline-flex min-h-[56px] items-center justify-center gap-2 rounded-md bg-primary-500 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            >
              <Plus className="size-5 shrink-0" aria-hidden />
              Ersten Artikel anlegen
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
