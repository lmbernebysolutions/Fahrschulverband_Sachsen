"use client";

import { useState, useEffect } from "react";
import { useSiteData } from "@/context/SiteDataContext";
import { Button, Input, Label, Textarea } from "@/components/atoms";
import { Toast } from "@/components/molecules";

export default function AdminEinstellungenPage() {
  const { settings, updateSettings } = useSiteData();
  const [form, setForm] = useState({
    heroHeadline: settings.heroHeadline,
    heroSubtext: settings.heroSubtext,
    heroCtaText: settings.heroCtaText,
    heroCtaLink: settings.heroCtaLink,
    contactEmail: settings.contactEmail,
    contactPhone: settings.contactPhone,
    contactFax: settings.contactFax,
    contactAddress: settings.contactAddress,
  });

  useEffect(() => {
    setForm({
      heroHeadline: settings.heroHeadline,
      heroSubtext: settings.heroSubtext,
      heroCtaText: settings.heroCtaText,
      heroCtaLink: settings.heroCtaLink,
      contactEmail: settings.contactEmail,
      contactPhone: settings.contactPhone,
      contactFax: settings.contactFax,
      contactAddress: settings.contactAddress,
    });
  }, [settings]);
  const [toast, setToast] = useState<{
    message: string;
    variant: "success" | "error";
  } | null>(null);

  const handleSave = () => {
    updateSettings(form);
    setToast({ message: "Einstellungen gespeichert.", variant: "success" });
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-neutral-900">Einstellungen</h1>

      {toast && (
        <Toast
          variant={toast.variant}
          message={toast.message}
          onDismiss={() => setToast(null)}
        />
      )}

      <div className="space-y-8">
        <div className="rounded-xl bg-white p-4 shadow-card sm:p-6 lg:p-8">
          <h2 className="text-lg font-semibold text-neutral-800">
            Startbereich (Startseite oben)
          </h2>
          <p className="mt-1 text-sm text-neutral-600">
            Überschrift, Text und Button im großen Bereich oben auf der Startseite.
          </p>
          <div className="mt-6 space-y-4">
            <div>
              <Label>Überschrift</Label>
              <Input
                value={form.heroHeadline}
                onChange={(e) =>
                  setForm((f) => ({ ...f, heroHeadline: e.target.value }))
                }
              />
            </div>
            <div>
              <Label>Text</Label>
              <Textarea
                value={form.heroSubtext}
                onChange={(e) =>
                  setForm((f) => ({ ...f, heroSubtext: e.target.value }))
                }
                rows={3}
              />
            </div>
            <div>
              <Label>Button-Text</Label>
              <Input
                value={form.heroCtaText}
                onChange={(e) =>
                  setForm((f) => ({ ...f, heroCtaText: e.target.value }))
                }
              />
            </div>
            <div>
              <Label>Link-Adresse (Ziel des Buttons)</Label>
              <Input
                value={form.heroCtaLink}
                onChange={(e) =>
                  setForm((f) => ({ ...f, heroCtaLink: e.target.value }))
                }
              />
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-4 shadow-card sm:p-6 lg:p-8">
          <h2 className="text-lg font-semibold text-neutral-800">
            Kontaktdaten
          </h2>
          <div className="mt-6 space-y-4">
            <div>
              <Label>E-Mail</Label>
              <Input
                type="email"
                value={form.contactEmail}
                onChange={(e) =>
                  setForm((f) => ({ ...f, contactEmail: e.target.value }))
                }
              />
            </div>
            <div>
              <Label>Telefon</Label>
              <Input
                value={form.contactPhone}
                onChange={(e) =>
                  setForm((f) => ({ ...f, contactPhone: e.target.value }))
                }
              />
            </div>
            <div>
              <Label>Fax</Label>
              <Input
                value={form.contactFax}
                onChange={(e) =>
                  setForm((f) => ({ ...f, contactFax: e.target.value }))
                }
              />
            </div>
            <div>
              <Label>Adresse</Label>
              <Input
                value={form.contactAddress}
                onChange={(e) =>
                  setForm((f) => ({ ...f, contactAddress: e.target.value }))
                }
              />
            </div>
          </div>
        </div>

        <Button variant="primary" onClick={handleSave}>
          Alle Speichern
        </Button>
      </div>
    </div>
  );
}
