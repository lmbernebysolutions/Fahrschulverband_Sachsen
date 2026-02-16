"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useSiteData } from "@/context/SiteDataContext";
import type { Seminar } from "@/lib/mockData";
import {
  AdminBreadcrumbs,
  LargeButton,
  WizardLayout,
  type StepItem,
} from "@/components/admin";
import { Input, Label, Select } from "@/components/atoms";
import { EventCard } from "@/components/molecules";
import { Toast } from "@/components/molecules";

const categories = [
  { value: "§53(1)", label: "§ 53 (1) FahrlG" },
  { value: "ASF/FES", label: "ASF/FES" },
  { value: "Weitere", label: "Weitere Seminare" },
];

const initialForm = {
  title: "",
  category: "§53(1)" as Seminar["category"],
  dateStart: "",
  dateEnd: "",
  time: "08:30 - 16:30 Uhr",
  location: "",
  description: "",
  maxParticipants: 25,
  currentParticipants: 0,
  isOpen: true,
};

export default function AdminTermineEditPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const isNew = id === "neu";
  const { seminars, addSeminar, updateSeminar } = useSiteData();

  const [step, setStep] = useState<1 | 2>(1);
  const [toast, setToast] = useState<{
    message: string;
    variant: "success" | "error";
  } | null>(null);
  const [form, setForm] = useState(initialForm);

  const seminar = isNew ? null : seminars.find((s) => s.id === id);

  useEffect(() => {
    if (seminar) {
      setForm({
        title: seminar.title,
        category: seminar.category,
        dateStart: seminar.dateStart,
        dateEnd: seminar.dateEnd,
        time: seminar.time,
        location: seminar.location,
        description: seminar.description,
        maxParticipants: seminar.maxParticipants,
        currentParticipants: seminar.currentParticipants,
        isOpen: seminar.isOpen,
      });
    } else if (!isNew && !seminar) {
      router.replace("/losleben-admin/termine");
      return;
    }
  }, [seminar, isNew, router]);

  const steps: StepItem[] = [
    { label: "Angaben", status: step === 1 ? "current" : "completed" },
    {
      label: "Vorschau & Bestätigung",
      status: step === 2 ? "current" : "upcoming",
    },
  ];

  const handleSave = useCallback(() => {
    if (isNew && form.dateStart && form.dateEnd && form.title) {
      addSeminar(form);
      setToast({ message: "Termin erstellt.", variant: "success" });
    } else if (seminar) {
      updateSeminar(seminar.id, form);
      setToast({ message: "Termin gespeichert.", variant: "success" });
    }
    setTimeout(() => router.push("/losleben-admin/termine"), 800);
  }, [isNew, seminar, form, addSeminar, updateSeminar, router]);

  if (!isNew && !seminar) return null;

  return (
    <div className="space-y-8">
      <div>
        <AdminBreadcrumbs
          items={[
            "Übersicht",
            "Termine & Seminare",
            isNew ? "Neuer Termin" : "Bearbeiten",
          ]}
        />
        <Link
          href="/losleben-admin/termine"
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
        title={isNew ? "Neuer Termin" : "Termin bearbeiten"}
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
              <Label className="text-lg">Kategorie</Label>
              <Select
                value={form.category}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    category: e.target.value as Seminar["category"],
                  }))
                }
                className="mt-2 min-h-[52px] text-lg"
              >
                {categories.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </Select>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label className="text-lg">Startdatum</Label>
                <Input
                  type="date"
                  value={form.dateStart}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, dateStart: e.target.value }))
                  }
                  className="mt-2 min-h-[52px] text-lg"
                />
              </div>
              <div>
                <Label className="text-lg">Enddatum</Label>
                <Input
                  type="date"
                  value={form.dateEnd}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, dateEnd: e.target.value }))
                  }
                  className="mt-2 min-h-[52px] text-lg"
                />
              </div>
            </div>
            <div>
              <Label className="text-lg">Uhrzeit</Label>
              <Input
                value={form.time}
                onChange={(e) =>
                  setForm((f) => ({ ...f, time: e.target.value }))
                }
                className="mt-2 min-h-[52px] text-lg"
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
              <Label className="text-lg">Max. Teilnehmer</Label>
              <Input
                type="number"
                value={form.maxParticipants}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    maxParticipants: parseInt(e.target.value, 10) || 0,
                  }))
                }
                className="mt-2 min-h-[52px] text-lg"
              />
            </div>
            <label className="flex min-h-[48px] cursor-pointer items-center gap-3 text-lg">
              <input
                type="checkbox"
                checked={form.isOpen}
                onChange={(e) =>
                  setForm((f) => ({ ...f, isOpen: e.target.checked }))
                }
                className="size-5"
              />
              <span>Anmeldung offen</span>
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
                href="/losleben-admin/termine"
                className="inline-flex min-h-[52px] items-center justify-center rounded-md px-7 py-3.5 text-lg text-primary-500 hover:bg-primary-50"
              >
                Abbrechen
              </Link>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8">
            <div className="rounded-xl bg-primary-50 p-6">
              <h3 className="text-xl font-semibold text-neutral-800">
                Live-Vorschau
              </h3>
              <div className="mt-6">
                <EventCard
                  dateStart={form.dateStart || "2026-01-01"}
                  dateEnd={form.dateEnd || form.dateStart || "2026-01-01"}
                  title={form.title || "Titel"}
                  category={form.category}
                  location={form.location || "Ort"}
                  time={form.time}
                  availableSlots={
                    form.isOpen
                      ? form.maxParticipants - form.currentParticipants
                      : 0
                  }
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <LargeButton variant="primary" size="xl" onClick={handleSave}>
                {isNew ? "Termin erstellen" : "Speichern"}
              </LargeButton>
              <LargeButton
                variant="secondary"
                size="xl"
                onClick={() => setStep(1)}
              >
                Zurück zu Angaben
              </LargeButton>
              <Link
                href="/losleben-admin/termine"
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
