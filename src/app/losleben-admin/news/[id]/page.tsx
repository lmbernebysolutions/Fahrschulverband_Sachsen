"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useSiteData } from "@/context/SiteDataContext";
import type { NewsArticle } from "@/lib/mockData";
import {
  AdminBreadcrumbs,
  LargeButton,
  WizardLayout,
  type StepItem,
} from "@/components/admin";
import { Input, Label, Select, Textarea } from "@/components/atoms";
import { NewsCard } from "@/components/molecules";
import { Toast } from "@/components/molecules";

const categories = [
  { value: "fortbildung", label: "Fortbildung" },
  { value: "verband", label: "Verband" },
  { value: "mitglieder", label: "Mitglieder" },
  { value: "allgemein", label: "Allgemein" },
];

function slugify(text: string): string {
  const s = text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return s || "artikel";
}

const initialForm = {
  title: "",
  slug: "",
  date: new Date().toISOString().slice(0, 10),
  excerpt: "",
  content: "",
  category: "allgemein" as NewsArticle["category"],
  isPublished: true,
  isFeatured: false,
};

export default function AdminNewsEditPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const isNew = id === "neu";
  const { news, addNews, updateNews } = useSiteData();

  const [step, setStep] = useState<1 | 2>(1);
  const [toast, setToast] = useState<{
    message: string;
    variant: "success" | "error";
  } | null>(null);
  const [form, setForm] = useState(initialForm);

  const article = isNew ? null : news.find((a) => a.id === id);

  useEffect(() => {
    if (article) {
      setForm({
        title: article.title,
        slug: article.slug,
        date: article.date,
        excerpt: article.excerpt,
        content: article.content,
        category: article.category,
        isPublished: article.isPublished,
        isFeatured: article.isFeatured,
      });
    } else if (!isNew && !article) {
      router.replace("/losleben-admin/news");
      return;
    }
  }, [article, isNew, router]);

  const steps: StepItem[] = [
    { label: "Angaben", status: step === 1 ? "current" : step > 1 ? "completed" : "upcoming" },
    { label: "Vorschau & Bestätigung", status: step === 2 ? "current" : step > 2 ? "completed" : "upcoming" },
  ];

  const handleSave = useCallback(() => {
    const rawSlug = form.slug.trim() || slugify(form.title);
    const others = news.filter((a) => a.id !== article?.id);
    let slug = rawSlug;
    let n = 1;
    while (others.some((a) => a.slug === slug)) {
      slug = `${rawSlug}-${n}`;
      n += 1;
    }
    const payload = { ...form, slug };

    if (isNew) {
      addNews(payload);
      setToast({ message: "Artikel erstellt.", variant: "success" });
    } else if (article) {
      updateNews(article.id, payload);
      setToast({ message: "Artikel gespeichert.", variant: "success" });
    }
    setTimeout(() => router.push("/losleben-admin/news"), 800);
  }, [isNew, article, form, news, addNews, updateNews, router]);

  if (!isNew && !article) return null;

  return (
    <div className="space-y-8">
      <div>
        <AdminBreadcrumbs
          items={["Übersicht", "News & Artikel", isNew ? "Neuer Artikel" : "Bearbeiten"]}
        />
        <Link
          href="/losleben-admin/news"
          className="mt-2 inline-flex items-center gap-2 text-lg text-primary-600 hover:underline"
        >
          <ArrowLeft className="size-5" aria-hidden />
          Zurück zur Liste
        </Link>
      </div>

      {toast && (
        <Toast
          variant={toast.variant}
          message={toast.message}
          onDismiss={() => setToast(null)}
        />
      )}

      <WizardLayout
        title={isNew ? "Neuer News-Artikel" : "Artikel bearbeiten"}
        steps={steps}
      >
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <Label className="text-lg">Titel</Label>
              <Input
                value={form.title}
                onChange={(e) => {
                  setForm((f) => ({
                    ...f,
                    title: e.target.value,
                    slug: e.target.value
                      .toLowerCase()
                      .replace(/\s+/g, "-")
                      .replace(/[^a-z0-9-]/g, ""),
                  }));
                }}
                className="mt-2 min-h-[52px] text-lg"
              />
            </div>
            <div>
              <Label className="text-lg">Seitenadresse (URL-Kurzname)</Label>
              <Input
                value={form.slug}
                onChange={(e) =>
                  setForm((f) => ({ ...f, slug: e.target.value }))
                }
                className="mt-2 min-h-[52px] text-lg"
                placeholder="z. B. mein-artikel-titel"
              />
            </div>
            <div>
              <Label className="text-lg">Datum</Label>
              <Input
                type="date"
                value={form.date}
                onChange={(e) =>
                  setForm((f) => ({ ...f, date: e.target.value }))
                }
                className="mt-2 min-h-[52px] text-lg"
              />
            </div>
            <div>
              <Label className="text-lg">Kategorie</Label>
              <Select
                value={form.category}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    category: e.target.value as NewsArticle["category"],
                  }))
                }
                className="mt-2 min-h-[52px] text-lg"
              >
                {categories.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label className="text-lg">Kurzbeschreibung (Excerpt)</Label>
              <Textarea
                value={form.excerpt}
                onChange={(e) =>
                  setForm((f) => ({ ...f, excerpt: e.target.value }))
                }
                rows={3}
                className="mt-2 text-lg"
              />
            </div>
            <div>
              <Label className="text-lg">Volltext</Label>
              <Textarea
                value={form.content}
                onChange={(e) =>
                  setForm((f) => ({ ...f, content: e.target.value }))
                }
                rows={8}
                className="mt-2 text-lg"
              />
            </div>
            <div className="flex flex-wrap gap-6">
              <label className="flex min-h-[48px] cursor-pointer items-center gap-3 text-lg">
                <input
                  type="checkbox"
                  checked={form.isPublished}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      isPublished: e.target.checked,
                    }))
                  }
                  className="size-5"
                />
                <span>Veröffentlicht</span>
              </label>
              <label className="flex min-h-[48px] cursor-pointer items-center gap-3 text-lg">
                <input
                  type="checkbox"
                  checked={form.isFeatured}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      isFeatured: e.target.checked,
                    }))
                  }
                  className="size-5"
                />
                <span>Featured</span>
              </label>
            </div>
            <div className="flex gap-4 pt-4">
              <LargeButton
                variant="primary"
                size="xl"
                onClick={() => setStep(2)}
              >
                Weiter zur Vorschau
              </LargeButton>
              <Link
                href="/losleben-admin/news"
                className="inline-flex min-h-[52px] items-center justify-center rounded-md px-7 py-3.5 text-lg text-primary-500 hover:bg-primary-50"
              >
                Abbrechen
              </Link>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8">
            <div className="rounded-xl bg-primary-50 p-6">
              <h3 className="text-xl font-semibold text-neutral-800">
                Live-Vorschau
              </h3>
              <p className="mt-1 text-base text-neutral-600">
                So sieht Ihr Artikel auf der Website aus:
              </p>
              <div className="mt-6">
                <NewsCard
                  title={form.title || "Titel"}
                  date={form.date}
                  excerpt={form.excerpt || "Excerpt..."}
                  slug={form.slug || "slug"}
                  isNew={form.isFeatured}
                  category={
                    categories.find((c) => c.value === form.category)?.label
                  }
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <LargeButton variant="primary" size="xl" onClick={handleSave}>
                {isNew ? "Artikel erstellen" : "Speichern"}
              </LargeButton>
              <LargeButton
                variant="secondary"
                size="xl"
                onClick={() => setStep(1)}
              >
                Zurück zu Angaben
              </LargeButton>
              <Link
                href="/losleben-admin/news"
                className="inline-flex min-h-[52px] items-center justify-center rounded-md px-7 py-3.5 text-lg text-primary-500 hover:bg-primary-50"
              >
                Abbrechen
              </Link>
            </div>
          </div>
        )}
      </WizardLayout>
    </div>
  );
}
