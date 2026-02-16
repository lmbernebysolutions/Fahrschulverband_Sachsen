"use client";

import { useState } from "react";
import { ContentPage } from "@/components/templates/ContentPage";
import { Button, Input, Label } from "@/components/atoms";
import { Lock } from "lucide-react";
import Link from "next/link";
import { Toast } from "@/components/molecules";

export default function MitgliederbereichPage() {
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowToast(true);
  };

  return (
    <ContentPage
      title="Mitgliederbereich"
      subtitle="Exklusive Inhalte für Mitglieder"
      breadcrumbItems={[
        { label: "Startseite", href: "/" },
        { label: "Mitgliederbereich", href: "/mitgliederbereich" },
      ]}
    >
      <section className="flex min-h-[60vh] items-center justify-center bg-neutral-50 py-24">
        <div className="mx-auto w-full max-w-md px-4">
          <div className="rounded-2xl bg-white p-12 shadow-xl">
            <Lock className="mx-auto size-12 text-primary-500" />
            <h2 className="mt-6 text-center text-xl font-bold text-primary-500">
              Mitgliederbereich
            </h2>
            <p className="mt-2 text-center text-neutral-600">
              Melden Sie sich an, um auf exklusive Inhalte zuzugreifen.
            </p>

            {showToast && (
              <Toast
                variant="error"
                message="Diese Funktion ist im Mockup nicht verfügbar."
                onDismiss={() => setShowToast(false)}
                className="mt-6"
              />
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div>
                <Label htmlFor="username">Benutzername oder E-Mail</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  className="mt-2"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Passwort</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  className="mt-2"
                  required
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  className="size-4 rounded border-neutral-300"
                />
                <Label htmlFor="remember" className="font-normal">
                  Angemeldet bleiben
                </Label>
              </div>
              <Button type="submit" variant="primary" fullWidth>
                Anmelden
              </Button>
            </form>

            <div className="mt-6 border-t border-neutral-200 pt-6 text-center">
              <Link
                href="/kontakt"
                className="text-sm font-medium text-primary-500 hover:underline"
              >
                Passwort vergessen?
              </Link>
            </div>
          </div>
        </div>
      </section>
    </ContentPage>
  );
}
