"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useSiteData } from "@/context/SiteDataContext";
import type { FahrschulAd } from "@/lib/mockData";
import {
  AdminBreadcrumbs,
  LargeButton,
  WizardLayout,
  type StepItem,
} from "@/components/admin";
import { Input, Label, Select, Textarea } from "@/components/atoms";
import { Toast } from "@/components/molecules";

const types = [
  { value: "verkauf", label: "Verkauf" },
  { value: "suche", label: "Suche" },
  { value: "kooperation", label: "Kooperation" },
];

const initialForm = {
  title: "",
  description: "",
  type: "verkauf" as FahrschulAd["type"],
  location: "",
  contact: "",
  isActive: true,
};

export default function AdminFahrschulmarktEditPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const isNew = id === "neu";
  const { fahrschulAds, addFahrschulAd, updateFahrschulAd } = useSiteData();

  const [step, setStep] = useState<1 | 2>(1);
  const [toast, setToast] = useState<{
    message: string;
    variant: "success" | "error";
  } | null>(null);
  const [form, setForm] = useState(initialForm);

  const ad = isNew ? null : fahrschulAds.find((a) => a.id === id);

  useEffect(() => {
    if (ad) {
      setForm({
        title: ad.title,
        description: ad.description,
        type: ad.type,
        location: ad.location,
        contact: ad.contact,
        isActive: ad.isActive,
      });
    } else if (!isNew && !ad) {
      router.replace("/losleben-admin/fahrschulmarkt");
      return;
    }
  }, [ad, isNew, router]);

  const steps: StepItem[] = [
    { label: "Angaben", status: step === 1 ? "current" : "completed" },
    {
      label: "Vorschau & Bestätigung",
      status: step === 2 ? "current" : "upcoming",
    },
  ];

  const handleSave = useCallback(() => {
    if (isNew && form.title) {
      addFahrschulAd({
        ...form,
        date: new Date().toISOString().slice(0, 10),
      });
      setToast({ message: "Anzeige erstellt.", variant: "success" });
    } else if (ad) {
      updateFahrschulAd(ad.id, form);
      setToast({ message: "Anzeige gespeichert.", variant: "success" });
    }
    setTimeout(() => router.push("/losleben-admin/fahrschulmarkt"), 800);
  }, [isNew, ad, form, addFahrschulAd, updateFahrschulAd, router]);

  if (!isNew && !ad) return null;

  return (
    <div className="space-y-8">
      <div>
        <AdminBreadcrumbs
          items={[
            "Übersicht",
            "Fahrschulmarkt",
            isNew ? "Neue Anzeige" : "Bearbeiten",
          ]}
        />
        <Link
          href="/losleben-admin/fahrschulmarkt"
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
        title={isNew ? "Neue Anzeige" : "Anzeige bearbeiten"}
        steps={steps}
      >
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <Label className="text-lg">Titel</Label>
              <Input
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                className="mt-2 min-h-[52px] text-lg"
              />
            </div>
            <div>
              <Label className="text-lg">Typ</Label>
              <Select
                value={form.type}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    type: e.target.value as FahrschulAd["type"],
                  }))
                }
                className="mt-2 min-h-[52px] text-lg"
              >
                {types.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label className="text-lg">Beschreibung</Label>
              <Textarea
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                rows={5}
                className="mt-2 text-lg"
              />
            </div>
            <div>
              <Label className="text-lg">Ort</Label>
              <Input
                value={form.location}
                onChange={(e) =>
                  setForm((f) => ({ ...f, location: e.target.value }))
                }
                className="mt-2 min-h-[52px] text-lg"
              />
            </div>
            <div>
              <Label className="text-lg">Kontakt (E-Mail)</Label>
              <Input
                type="email"
                value={form.contact}
                onChange={(e) =>
                  setForm((f) => ({ ...f, contact: e.target.value }))
                }
                className="mt-2 min-h-[52px] text-lg"
              />
            </div>
            <label className="flex min-h-[48px] cursor-pointer items-center gap-3 text-lg">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) =>
                  setForm((f) => ({ ...f, isActive: e.target.checked }))
                }
                className="size-5"
              />
              <span>Aktiv</span>
            </label>
            <div className="flex gap-4 pt-4">
              <LargeButton
                variant="primary"
                size="xl"
                onClick={() => setStep(2)}
              >
                Weiter zur Vorschau
              </LargeButton>
              <Link
                href="/losleben-admin/fahrschulmarkt"
                className="inline-flex min-h-[52px] items-center justify-center rounded-md px-7 py-3.5 text-lg text-primary-500 hover:bg-primary-50"
              >
                Abbrechen
              </Link>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8">
            <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-6">
              <h3 className="text-xl font-semibold text-neutral-800">
                Vorschau
              </h3>
              <dl className="mt-4 space-y-2 text-lg">
                <div>
                  <dt className="font-medium text-neutral-600">Titel</dt>
                  <dd className="text-neutral-900">{form.title || "—"}</dd>
                </div>
                <div>
                  <dt className="font-medium text-neutral-600">Typ</dt>
                  <dd className="text-neutral-900">
                    {types.find((t) => t.value === form.type)?.label ?? form.type}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-neutral-600">Ort</dt>
                  <dd className="text-neutral-900">{form.location || "—"}</dd>
                </div>
                <div>
                  <dt className="font-medium text-neutral-600">Beschreibung</dt>
                  <dd className="whitespace-pre-wrap text-neutral-900">
                    {form.description || "—"}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-neutral-600">Kontakt</dt>
                  <dd className="text-neutral-900">{form.contact || "—"}</dd>
                </div>
                <div>
                  <dt className="font-medium text-neutral-600">Status</dt>
                  <dd className="text-neutral-900">
                    {form.isActive ? "Aktiv" : "Inaktiv"}
                  </dd>
                </div>
              </dl>
            </div>
            <div className="flex flex-wrap gap-4">
              <LargeButton variant="primary" size="xl" onClick={handleSave}>
                {isNew ? "Anzeige erstellen" : "Speichern"}
              </LargeButton>
              <LargeButton
                variant="secondary"
                size="xl"
                onClick={() => setStep(1)}
              >
                Zurück zu Angaben
              </LargeButton>
              <Link
                href="/losleben-admin/fahrschulmarkt"
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
