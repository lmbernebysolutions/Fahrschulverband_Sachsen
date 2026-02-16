"use client";

import Link from "next/link";
import Image from "next/image";
import { useSiteData } from "@/context/SiteDataContext";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const { settings } = useSiteData();
  const heroImage =
    settings.imageAssignments?.["hero.background"]?.imagePath ??
    settings.imageAssignments?.["home.verbandsgebaeude"]?.imagePath;

  return (
    <section
      className={cn(
        "relative flex min-h-[500px] items-center overflow-hidden",
        "bg-gradient-to-br from-primary-500 to-primary-700"
      )}
    >
      {/* Hintergrundbild (wenn zugewiesen) – Zuschnitt im Admin ist 3:1 wie dieser Bereich */}
      {heroImage && (
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
            unoptimized
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          {/* Grün-Overlay: links stark (Bild kaum sichtbar), rechts schwach (Bild deutlicher) */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(23, 141, 48, 0.92) 0%, rgba(23, 141, 48, 0.65) 35%, rgba(15, 107, 32, 0.3) 70%, rgba(5, 63, 16, 0.08) 100%)",
            }}
            aria-hidden
          />
        </div>
      )}

      {/* Dekorative Formen */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        aria-hidden
      >
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-2 border-white" />
        <div className="absolute bottom-20 left-1/4 h-32 w-32 rotate-45 border-2 border-white" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="font-bold tracking-tight text-white">
            {settings.heroHeadline.includes(" - ") ? (
              <>
                <span className="block text-4xl md:text-5xl lg:text-6xl">
                  {settings.heroHeadline.split(" - ")[0]}
                </span>
                <span className="mt-1 block text-3xl md:text-4xl lg:text-5xl">
                  {settings.heroHeadline.split(" - ").slice(1).join(" - ")}
                </span>
              </>
            ) : (
              <span className="text-3xl md:text-4xl lg:text-5xl">
                {settings.heroHeadline}
              </span>
            )}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white">
            {settings.heroSubtext}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={settings.heroCtaLink}
              className="inline-flex min-h-[52px] items-center justify-center rounded-md bg-white px-7 py-3.5 text-lg font-semibold text-primary-600 transition-colors hover:bg-neutral-100 hover:text-primary-700"
            >
              {settings.heroCtaText}
            </Link>
            <Link
              href="/fuer-fahrschueler/fahrschulsuche"
              className="inline-flex min-h-[52px] items-center justify-center rounded-md border-2 border-white px-7 py-3.5 text-lg font-semibold text-white transition-colors hover:bg-white/10"
            >
              Fahrschule finden
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
