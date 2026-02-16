"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { AdminSidebar } from "@/components/organisms/AdminSidebar";
import { cn } from "@/lib/utils";

export interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="flex h-16 items-center justify-between bg-neutral-900 px-4 text-white sm:px-6">
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => setSidebarOpen((o) => !o)}
            className="flex min-h-[48px] min-w-[48px] items-center justify-center rounded-lg text-neutral-300 hover:bg-white/10 hover:text-white lg:hidden"
            aria-expanded={sidebarOpen}
            aria-label={sidebarOpen ? "Seitenleiste schließen" : "Seitenleiste öffnen"}
          >
            <Menu className="size-6" />
          </button>
          <Link href="/" className="font-bold text-white hover:text-primary-300">
            LSF e.V.
          </Link>
          <span className="hidden text-neutral-400 sm:inline">|</span>
          <span className="hidden text-sm text-neutral-300 sm:inline">Admin-Bereich</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/"
            className="min-h-[44px] min-w-[44px] flex items-center text-sm text-primary-300 hover:text-primary-200 sm:min-h-0 sm:min-w-0"
            aria-label="Zur öffentlichen Website"
          >
            Zur Website →
          </Link>
          <button
            type="button"
            className="min-h-[44px] min-w-[44px] flex items-center text-sm text-neutral-400 hover:text-white sm:min-h-0 sm:min-w-0"
            aria-label="Vom Admin-Bereich abmelden"
          >
            Abmelden
          </button>
        </div>
      </header>

      {/* Overlay when sidebar is open on small screens */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          aria-hidden
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex min-h-screen bg-neutral-50">
        <div
          className={cn(
            "fixed left-0 top-16 bottom-0 z-30 w-64 shrink-0 border-r border-neutral-200 bg-white shadow-xl transition-transform duration-200 sm:w-80 lg:relative lg:top-0 lg:z-auto lg:translate-x-0 lg:shadow-sm",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <AdminSidebar onClose={() => setSidebarOpen(false)} />
        </div>
        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
