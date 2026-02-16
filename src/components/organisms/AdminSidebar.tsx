"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  ImageIcon,
  Table2,
  Newspaper,
  Calendar,
  Store,
  Settings,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

type NavGroup = {
  label: string;
  items: { href: string; label: string; icon: React.ComponentType<{ className?: string }> }[];
};

const navGroups: NavGroup[] = [
  {
    label: "Inhalte bearbeiten",
    items: [
      { href: "/losleben-admin/inhalte/website-texte", label: "Website-Texte", icon: FileText },
      { href: "/losleben-admin/bilder", label: "Bilder verwalten", icon: ImageIcon },
      { href: "/losleben-admin/inhalte/tabellen/mitgliedschaft", label: "Tabellen (Beiträge)", icon: Table2 },
    ],
  },
  {
    label: "Daten verwalten",
    items: [
      { href: "/losleben-admin/news", label: "News & Artikel", icon: Newspaper },
      { href: "/losleben-admin/termine", label: "Termine & Seminare", icon: Calendar },
      { href: "/losleben-admin/fahrschulmarkt", label: "Fahrschulmarkt", icon: Store },
    ],
  },
  {
    label: "Einstellungen",
    items: [
      { href: "/losleben-admin/einstellungen", label: "Kontaktdaten, Startbereich", icon: Settings },
    ],
  },
];

export interface AdminSidebarProps {
  /** Called when a nav link is clicked (e.g. to close drawer on mobile) */
  onClose?: () => void;
}

export function AdminSidebar({ onClose }: AdminSidebarProps = {}) {
  const pathname = usePathname();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    "Inhalte bearbeiten": true,
    "Daten verwalten": true,
    "Einstellungen": true,
  });

  const toggleGroup = (label: string) => {
    setOpenGroups((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <aside className="h-full w-full overflow-y-auto">
      <nav className="flex flex-col py-4" aria-label="Admin-Navigation">
        <Link
          href="/losleben-admin"
          onClick={onClose}
          className={cn(
            "flex min-h-[56px] items-center gap-3 px-6 py-4 text-xl font-medium transition-all duration-200",
            pathname === "/losleben-admin"
              ? "border-l-4 border-primary-600 bg-primary-50 text-primary-800"
              : "border-l-4 border-transparent text-neutral-800 hover:bg-neutral-50 hover:text-primary-600"
          )}
        >
          <LayoutDashboard className="size-6 shrink-0" aria-hidden />
          Übersicht
        </Link>

        {navGroups.map((group) => {
          const isOpen = openGroups[group.label] ?? true;
          return (
            <div key={group.label} className="mt-2">
              <button
                type="button"
                onClick={() => toggleGroup(group.label)}
                className="flex w-full min-h-[56px] items-center justify-between gap-2 px-6 py-3 text-left text-lg font-semibold text-neutral-800 hover:bg-neutral-50"
                aria-expanded={isOpen}
              >
                <span>{group.label}</span>
                <ChevronDown
                  className={cn("size-5 shrink-0 text-neutral-500 transition-transform duration-200", isOpen && "rotate-180")}
                  aria-hidden
                />
              </button>
              {isOpen && (
                <div className="border-l-2 border-neutral-100 pl-2">
                  {group.items.map((item) => {
                    const isActive =
                      item.href !== "/losleben-admin" && pathname.startsWith(item.href);
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          "flex min-h-[56px] items-center gap-3 px-6 py-3 text-xl transition-all duration-200",
                          isActive
                            ? "border-l-4 border-primary-600 bg-primary-50 font-medium text-primary-800"
                            : "border-l-4 border-transparent text-neutral-700 hover:bg-neutral-50 hover:text-primary-600"
                        )}
                      >
                        <Icon className="size-6 shrink-0" aria-hidden />
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
