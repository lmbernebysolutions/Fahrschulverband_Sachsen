"use client";

import Link from "next/link";
import { AdminSidebar } from "@/components/organisms/AdminSidebar";

export interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="flex h-16 items-center justify-between bg-neutral-900 px-6 text-white">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-bold text-white hover:text-primary-300">
            LSF e.V.
          </Link>
          <span className="text-neutral-400">|</span>
          <span className="text-sm text-neutral-300">Admin-Bereich</span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-sm text-primary-300 hover:text-primary-200"
            aria-label="Zur öffentlichen Website"
          >
            Zur Website →
          </Link>
          <button
            type="button"
            className="text-sm text-neutral-400 hover:text-white"
            aria-label="Vom Admin-Bereich abmelden"
          >
            Abmelden
          </button>
        </div>
      </header>

      <div className="flex min-h-screen bg-neutral-50">
        <AdminSidebar />
        <main className="flex-1 p-8 sm:p-12 max-w-6xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
