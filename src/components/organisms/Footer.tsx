"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { siteContent } from "@/lib/siteContent";
import { useSiteData } from "@/context/SiteDataContext";
import { cn } from "@/lib/utils";

const memberLinks = [
  { label: "Mitgliederbereich", href: "/mitgliederbereich" },
  { label: "Termine Fortbildung", href: "/fuer-fahrschulen/termine-fortbildung" },
  { label: "Fahrschulmarkt", href: "/fuer-fahrschulen/fahrschulmarkt" },
  { label: "Downloads", href: "/mitgliederbereich" },
];

export function Footer() {
  const pathname = usePathname();
  const { footerContent, websiteNav } = useSiteData();
  const footer = footerContent ?? siteContent.footer;
  const { contact, membershipCta, copyright } = footer;
  const navMain = (websiteNav?.main?.length ? websiteNav.main : siteContent.nav.main) as { label: string; href: string; children?: { label: string; href: string }[] }[];
  const [openNav, setOpenNav] = useState<Record<string, boolean>>({});

  const showMembershipCta = !pathname.startsWith("/fuer-fahrschueler");

  const toggleNav = (key: string) => {
    setOpenNav((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <footer>
      {/* Mitglieder-Hinweis (ausgeblendet auf Für Fahrschüler-Seiten) */}
      {showMembershipCta && (
        <div className="bg-primary-500 py-16 text-white">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold">{membershipCta.headline}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white">
              {membershipCta.text}
            </p>
            <Link
              href="/der-verband/mitgliedschaft"
              className="mt-6 inline-flex min-h-[52px] items-center justify-center rounded-md bg-white px-8 py-3.5 text-lg font-semibold text-primary-500 transition-colors hover:bg-neutral-100"
            >
              {membershipCta.buttonText}
            </Link>
          </div>
        </div>
      )}

      {/* Main Footer – #9d9d9d mit Weiß für Kontrast */}
      <div
        className="py-16 text-white"
        style={{ backgroundColor: "var(--color-header-footer)" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:grid-cols-4">
            {/* Kontakt */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                Kontakt
              </h3>
              <p className="mt-4 font-medium text-white">{contact.name}</p>
              <p className="mt-2 text-white/95">{contact.address}</p>
              <p className="mt-2">
                <a
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  className="text-white/95 hover:text-white"
                >
                  Tel: {contact.phone}
                </a>
              </p>
              <p className="mt-1 text-white/95">Fax: {contact.fax}</p>
              <a
                href={`mailto:${contact.email}`}
                className="mt-2 block text-white/95 hover:text-white"
              >
                {contact.email}
              </a>
            </div>

            {/* Navigation – ausklappbar */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                Navigation
              </h3>
              <ul className="mt-4 space-y-1">
                {navMain.map((item) => (
                  <li key={item.href}>
                    {"children" in item && item.children ? (
                      <>
                        <button
                          type="button"
                          onClick={() => toggleNav(item.href)}
                          className="flex min-h-[44px] w-full items-center justify-between py-2 text-left text-white/95 hover:text-white"
                          aria-expanded={openNav[item.href] ?? false}
                        >
                          <span>{item.label}</span>
                          <ChevronDown
                            className={cn(
                              "size-4 shrink-0 transition-transform",
                              openNav[item.href] && "rotate-180"
                            )}
                          />
                        </button>
                        {openNav[item.href] && (
                          <ul className="ml-2 mt-1 space-y-1 border-l-2 border-white/20 pl-3">
                            <li>
                              <Link
                                href={item.href}
                                className="block py-1 text-white/90 hover:text-white"
                              >
                                Übersicht
                              </Link>
                            </li>
                            {item.children.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  className="block py-1 text-white/90 hover:text-white"
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className="block py-2 text-white/95 hover:text-white"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Für Mitglieder */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                Für Mitglieder
              </h3>
              <ul className="mt-4 space-y-2">
                {memberLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/95 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Partner */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                Partner & Mitgliedschaften
              </h3>
              <p className="mt-4 text-sm text-white/90">
                Bundesvereinigung der Fahrlehrerverbände
              </p>
              <p className="mt-1 text-sm text-white/90">IPV</p>
              <p className="mt-1 text-sm text-white/90">
                FV Fahrlehrerversicherung
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div
        className="border-t border-white/20 py-4"
        style={{ backgroundColor: "var(--color-header-footer)" }}
      >
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 text-sm text-white/95 sm:px-6 lg:px-8">
          <span>{copyright}</span>
          <div className="flex gap-6">
            <Link href="/datenschutz" className="hover:text-white">
              Datenschutz
            </Link>
            <Link href="/impressum" className="hover:text-white">
              Impressum
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
