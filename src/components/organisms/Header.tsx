"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Mail, Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/atoms";
import { siteContent } from "@/lib/siteContent";
import { useSiteData } from "@/context/SiteDataContext";
import { cn } from "@/lib/utils";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { settings, websiteNav } = useSiteData();
  const pathname = usePathname();
  const nav = websiteNav ?? { service: [], main: [] };

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  /** Dropdown-Child: „Übersicht“ (href = Parent-Href) nur bei exaktem Pfad aktiv, sonst wie isActive. */
  const isChildActive = (parentHref: string, childHref: string) => {
    if (childHref === parentHref) return pathname === childHref;
    return pathname === childHref || pathname.startsWith(`${childHref}/`);
  };

  /** Parent-Nav ist aktiv, wenn aktuelle Route in dieser Sektion liegt */
  const isParentActive = (item: { href: string }) => {
    if (pathname === item.href || pathname.startsWith(`${item.href}/`)) return true;
    const section = "/" + item.href.split("/").filter(Boolean)[0];
    return pathname === section || pathname.startsWith(`${section}/`);
  };

  return (
    <header className="sticky top-0 z-20 shadow-sm">
      {/* TopBar – #9d9d9d mit Weiß für Kontrast */}
      <div
        className="py-2 text-sm text-white"
        style={{ backgroundColor: "var(--color-header-footer)" }}
      >
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-6">
            <a
              href={`tel:${settings.contactPhone.replace(/\s/g, "")}`}
              className="flex items-center gap-2 text-white hover:text-white/90"
            >
              <Phone className="size-4" aria-hidden />
              <span>{settings.contactPhone}</span>
            </a>
            <a
              href={`mailto:${settings.contactEmail}`}
              className="flex items-center gap-2 text-white hover:text-white/90"
            >
              <Mail className="size-4" aria-hidden />
              <span>{settings.contactEmail}</span>
            </a>
          </div>
          <nav className="flex flex-wrap gap-4" aria-label="Service-Navigation">
            {(nav.service.length ? nav.service : siteContent.nav.service).map((item) => (
              <Link
                key={"id" in item ? (item as { id: string }).id : (item as { href: string }).href}
                href={item.href}
                className="text-white hover:text-white/90"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Navbar */}
      <div className="bg-white pb-2 pt-4">
        <div className="mx-auto flex max-w-7xl items-end justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="-mb-14 shrink-0"
            aria-label="Startseite"
          >
            <Image
              src="/images/logo.png"
              alt="Landesverband Sächsischer Fahrlehrer e.V."
              width={280}
              height={112}
              className="h-24 w-auto object-contain object-bottom"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label="Hauptnavigation"
          >
            {(nav.main.length ? nav.main : siteContent.nav.main).map((item) =>
              "children" in item && item.children ? (
                <div
                  key={"id" in item ? (item as { id: string }).id : item.href}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex min-h-[48px] min-w-[48px] items-center py-3 px-4 text-lg font-medium transition-colors",
                      isParentActive(item)
                        ? "border-b-2 border-primary-500 text-primary-500"
                        : "text-neutral-700 hover:bg-primary-50 hover:text-primary-600"
                    )}
                  >
                    {item.label}
                  </Link>
                  <div
                    className={cn(
                      "absolute left-0 top-full min-w-[220px] rounded-lg border border-neutral-200 bg-white py-2 shadow-lg transition-opacity duration-200",
                      openDropdown === item.label
                        ? "opacity-100"
                        : "pointer-events-none opacity-0"
                    )}
                  >
                    {item.children.map((child) => (
                      <Link
                        key={"id" in child ? (child as { id: string }).id : child.href}
                        href={child.href}
                        className={cn(
                          "block py-3 px-4 text-lg hover:bg-primary-50",
                          isChildActive(item.href, child.href)
                            ? "font-semibold text-primary-500"
                            : "text-neutral-700"
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={"id" in item ? (item as { id: string }).id : item.href}
                  href={item.href}
                  className={cn(
                    "flex min-h-[48px] min-w-[48px] items-center py-3 px-4 text-lg font-medium transition-colors",
                    isActive(item.href)
                      ? "text-primary-500 border-b-2 border-primary-500"
                      : "text-neutral-700 hover:bg-primary-50 hover:text-primary-600"
                  )}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="hidden shrink-0 items-center gap-3 lg:flex">
            <Link href="/losleben-admin">
              <Button variant="secondary" size="sm">
                Test Admin Dashboard
              </Button>
            </Link>
            <Link href="/der-verband/mitgliedschaft">
              <Button variant="primary" size="sm">
                Mitglied werden
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex min-h-[48px] min-w-[48px] items-center justify-center rounded-lg lg:hidden"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Menü schließen" : "Menü öffnen"}
          >
            {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="border-t border-neutral-200 bg-white lg:hidden">
            <nav className="mx-auto max-w-7xl px-4 py-4" aria-label="Mobile Navigation">
              {(nav.main.length ? nav.main : siteContent.nav.main).map((item) => (
                <div key={"id" in item ? (item as { id: string }).id : item.href} className="border-b border-neutral-100">
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "block py-4 text-lg font-medium",
                      "children" in item && item.children
                        ? isParentActive(item)
                          ? "text-primary-500"
                          : "text-neutral-700"
                        : isActive(item.href)
                          ? "text-primary-500"
                          : "text-neutral-700"
                    )}
                  >
                    {item.label}
                  </Link>
                  {"children" in item && item.children && (
                    <div className="pb-2 pl-4">
                      {item.children.map((child) => (
                        <Link
                          key={"id" in child ? (child as { id: string }).id : child.href}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            "block py-2 text-base",
                            isChildActive(item.href, child.href)
                              ? "font-semibold text-primary-500"
                              : "text-neutral-600"
                          )}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="mt-4 flex flex-col gap-2">
                <Link href="/losleben-admin" onClick={() => setMobileOpen(false)}>
                  <Button variant="secondary" fullWidth>
                    Test Admin Dashboard
                  </Button>
                </Link>
                <Link href="/der-verband/mitgliedschaft" onClick={() => setMobileOpen(false)}>
                  <Button variant="primary" fullWidth>
                    Mitglied werden
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
