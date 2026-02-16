"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useSiteData } from "@/context/SiteDataContext";
import { ContentPage } from "@/components/templates/ContentPage";
import { Badge } from "@/components/atoms";
import { formatDate } from "@/lib/utils";

const categoryLabels: Record<string, string> = {
  fortbildung: "Fortbildung",
  verband: "Verband",
  mitglieder: "Mitglieder",
  allgemein: "Allgemein",
};

export default function NewsDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { news } = useSiteData();
  const article = news.find((n) => n.slug === slug && n.isPublished);

  if (!article) {
    return (
      <ContentPage
        title="Artikel nicht gefunden"
        breadcrumbItems={[
          { label: "Startseite", href: "/" },
          { label: "Aktuelles", href: "/aktuelles" },
          { label: "Artikel", href: "#" },
        ]}
      >
        <section className="bg-white py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <p className="text-neutral-600">
              Der angeforderte Artikel konnte nicht gefunden werden.
            </p>
            <Link
              href="/aktuelles"
              className="mt-6 inline-block font-medium text-primary-500 hover:underline"
            >
              ← Zurück zur Übersicht
            </Link>
          </div>
        </section>
      </ContentPage>
    );
  }

  const allNews = news.filter((n) => n.isPublished).sort((a, b) => b.date.localeCompare(a.date));
  const currentIndex = allNews.findIndex((n) => n.id === article.id);
  const prevArticle = currentIndex > 0 ? allNews[currentIndex - 1] : null;
  const nextArticle = currentIndex >= 0 && currentIndex < allNews.length - 1 ? allNews[currentIndex + 1] : null;

  return (
    <ContentPage
      title={article.title}
      breadcrumbItems={[
        { label: "Startseite", href: "/" },
        { label: "Aktuelles", href: "/aktuelles" },
        { label: article.title, href: `/aktuelles/${article.slug}` },
      ]}
    >
      <article className="bg-white py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <Badge variant="category">{categoryLabels[article.category]}</Badge>
            <span className="text-sm text-neutral-500">
              {formatDate(article.date)}
            </span>
          </div>
          <div className="prose prose-lg max-w-none border-t border-neutral-200 pt-8">
            <p className="whitespace-pre-wrap text-lg leading-relaxed text-neutral-700">
              {article.content}
            </p>
          </div>
          <nav
            className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-neutral-200 pt-8"
            aria-label="Artikel-Navigation"
          >
            <div>
              {prevArticle ? (
                <Link
                  href={`/aktuelles/${prevArticle.slug}`}
                  className="font-medium text-primary-500 hover:underline"
                >
                  ← Vorheriger Artikel
                </Link>
              ) : (
                <span className="text-neutral-400">← Vorheriger Artikel</span>
              )}
            </div>
            <Link
              href="/aktuelles"
              className="font-medium text-primary-500 hover:underline"
            >
              Zurück zur Übersicht
            </Link>
            <div>
              {nextArticle ? (
                <Link
                  href={`/aktuelles/${nextArticle.slug}`}
                  className="font-medium text-primary-500 hover:underline"
                >
                  Nächster Artikel →
                </Link>
              ) : (
                <span className="text-neutral-400">Nächster Artikel →</span>
              )}
            </div>
          </nav>
        </div>
      </article>
    </ContentPage>
  );
}
