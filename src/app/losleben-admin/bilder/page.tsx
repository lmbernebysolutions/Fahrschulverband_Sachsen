"use client";

import { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  Upload,
  FileImage,
  AlertCircle,
  ImagePlus,
  Trash2,
  LayoutGrid,
} from "lucide-react";
import {
  uploadImage,
  listUploadedImages,
  deleteImage,
} from "@/app/actions/uploadImage";
import {
  REAL_IMAGES,
  IMAGE_SLOTS,
  IMAGE_PAGES,
  getSlotDisplaySize,
} from "@/lib/imageUsage";
import { ImageAssignModal } from "@/components/organisms/ImageAssignModal";
import { useSiteData } from "@/context/SiteDataContext";
import { Toast } from "@/components/molecules";
import { cn } from "@/lib/utils";
import { Button } from "@/components/atoms";
import type { ImageSlotId, ImagePageId } from "@/lib/imageUsage";

const ACCEPT = {
  "image/png": [".png"],
  "image/jpeg": [".jpg", ".jpeg"],
  "image/webp": [".webp"],
};

export default function AdminBilderPage() {
  const { settings, updateSettings } = useSiteData();
  const [uploaded, setUploaded] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [assignModalSlot, setAssignModalSlot] = useState<ImageSlotId | null>(null);
  const [pageFilter, setPageFilter] = useState<ImagePageId | "all">("all");
  const [toast, setToast] = useState<{ message: string; variant: "success" | "error" } | null>(null);

  const loadImages = useCallback(async () => {
    setLoading(true);
    const list = await listUploadedImages();
    setUploaded(list);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadImages();
  }, [loadImages]);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;
      setUploading(true);
      setError(null);
      for (const file of acceptedFiles) {
        const formData = new FormData();
        formData.append("file", file);
        const result = await uploadImage(formData);
        if (result.success) {
          setUploaded((prev) => [...prev, result.path]);
          setToast({ message: "Bild hochgeladen.", variant: "success" });
        } else {
          setError(result.error);
          setToast({ message: result.error ?? "Upload fehlgeschlagen.", variant: "error" });
          break;
        }
      }
      setUploading(false);
      await loadImages();
    },
    [loadImages]
  );

  const handleDelete = useCallback(
    async (imagePath: string) => {
      if (!confirm("Bild wirklich löschen? Zuweisungen werden entfernt.")) return;
      setDeleting(imagePath);
      setError(null);
      const result = await deleteImage(imagePath);
      setDeleting(null);
      if (result.success) {
        setUploaded((prev) => prev.filter((p) => p !== imagePath));
        const next = { ...settings.imageAssignments };
        for (const [slotId, a] of Object.entries(next)) {
          if (a.imagePath === imagePath) delete next[slotId];
        }
        updateSettings({ imageAssignments: next });
        setToast({ message: "Bild gelöscht.", variant: "success" });
        await loadImages();
      } else {
        setError(result.error);
        setToast({ message: result.error ?? "Löschen fehlgeschlagen.", variant: "error" });
      }
    },
    [settings.imageAssignments, updateSettings, loadImages]
  );

  const MAX_SIZE_BYTES = 10 * 1024 * 1024;

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected: (rejections) => {
      const tooLarge = rejections.some((r) =>
        r.errors.some((e) => e.code === "file-too-large")
      );
      if (tooLarge) {
        setError(
          `Datei zu groß. Maximal ${MAX_SIZE_BYTES / (1024 * 1024)} MB erlaubt.`
        );
      } else {
        setError("Ungültiges Format. Erlaubt: PNG, JPG, WebP.");
      }
    },
    accept: ACCEPT,
    maxSize: MAX_SIZE_BYTES,
    disabled: uploading,
  });

  const slotsByPage = IMAGE_PAGES.map((page) => ({
    ...page,
    slots: IMAGE_SLOTS.filter((s) => s.pageId === page.pageId),
  }));

  return (
    <div className="space-y-8">
      {toast && (
        <Toast variant={toast.variant} message={toast.message} onDismiss={() => setToast(null)} />
      )}
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Bilder</h1>
        <p className="mt-1 text-neutral-500">
          Mediathek und Bildzuweisungen nach Seiten (PNG, JPG, WebP, max. 10 MB).
        </p>
      </div>

      {/* 1. Mediathek */}
      <section className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-neutral-800">
          <FileImage className="size-5" />
          Mediathek (public/images)
        </h2>
        <p className="mb-4 text-sm text-neutral-500">
          Hochgeladene Bilder. Löschen entfernt die Datei und alle Zuweisungen.
        </p>

        <div
          {...getRootProps()}
          className={`mb-6 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed py-10 transition-colors ${
            isDragActive
              ? "border-primary-500 bg-primary-50"
              : "border-neutral-300 bg-neutral-50 hover:border-primary-400 hover:bg-primary-50/50"
          } ${uploading ? "pointer-events-none opacity-60" : ""}`}
        >
          <input {...getInputProps()} />
          <Upload className="size-10 text-primary-500" aria-hidden />
          <p className="mt-3 text-neutral-600">
            {isDragActive
              ? "Dateien hier ablegen …"
              : "Dateien hierher ziehen oder klicken"}
          </p>
          <p className="mt-1 text-xs text-neutral-500">PNG, JPG, WebP – max. 10 MB</p>
        </div>

        {error && (
          <div className="mb-4 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-red-700">
            <AlertCircle className="size-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {loading ? (
          <p className="text-neutral-500">Lade …</p>
        ) : uploaded.length === 0 ? (
          <p className="rounded-lg bg-neutral-50 p-6 text-center text-neutral-600">
            Noch keine Bilder hochgeladen.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {uploaded.map((p) => (
              <div
                key={p}
                className="flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm"
              >
                <div className="relative aspect-square w-full shrink-0 bg-neutral-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p}
                    alt=""
                    className="size-full object-contain"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2 border-t border-neutral-100 bg-white p-2">
                  <p className="truncate text-xs font-medium text-neutral-800">
                    {p.replace("/images/", "")}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(p)}
                      disabled={deleting === p}
                      className="min-h-[36px] shrink-0"
                    >
                      <Trash2 className="size-4 shrink-0" />
                      Löschen
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 2. Bilder der Seiten – nach Seiten sortiert */}
      <section className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold text-neutral-800">
          <LayoutGrid className="size-5" />
          Bilder auf der Website
        </h2>
        <p className="mb-4 text-sm text-neutral-500">
          Zuweisung pro Seite. Beim Hochladen können Sie den Ausschnitt zuschneiden.
        </p>

        {/* Filter: Nur Bilder von dieser Seite */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-neutral-700">
            Anzeigen:
          </span>
          <select
            value={pageFilter}
            onChange={(e) =>
              setPageFilter(e.target.value as ImagePageId | "all")
            }
            className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-800 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          >
            <option value="all">Alle Seiten</option>
            {IMAGE_PAGES.map((page) => (
              <option key={page.pageId} value={page.pageId}>
                Nur {page.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-10">
          {slotsByPage
            .filter((g) => pageFilter === "all" || g.pageId === pageFilter)
            .map((group) => (
              <div key={group.pageId}>
                <h3 className="mb-4 text-base font-semibold text-primary-600">
                  {group.label}
                </h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {group.slots.map((slot) => {
                    const assignment = settings.imageAssignments?.[slot.slotId];
                    const displaySize = getSlotDisplaySize(slot.slotId, slot.aspectRatio);
                    return (
                      <div
                        key={slot.slotId}
                        className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm"
                      >
                        <div
                          className="relative w-full max-w-full bg-neutral-100"
                          style={{
                            maxWidth: displaySize.width,
                            aspectRatio: `${displaySize.width} / ${displaySize.height}`,
                          }}
                        >
                          {assignment?.imagePath ? (
                            <>
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={assignment.imagePath}
                                alt={slot.alt}
                                className="size-full object-cover"
                              />
                            </>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setAssignModalSlot(slot.slotId)}
                              className="flex size-full flex-col items-center justify-center gap-2 text-neutral-500 transition-colors hover:bg-primary-50 hover:text-primary-600"
                            >
                              <ImagePlus className="size-12" />
                              <span className="text-sm font-medium">
                                Bild zuweisen
                              </span>
                              <span className="text-xs">{slot.alt}</span>
                            </button>
                          )}
                        </div>
                        <div className="border-t border-neutral-100 bg-white p-3">
                          <p className="font-medium text-neutral-800">
                            {slot.alt}
                          </p>
                          <p className="mt-1 text-xs text-neutral-500">
                            {slot.usedOn}
                          </p>
                          {assignment?.imagePath && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              <Button
                                variant="primary"
                                size="sm"
                                onClick={() => setAssignModalSlot(slot.slotId)}
                                className="min-h-[36px] shrink-0"
                              >
                                <ImagePlus className="mr-1 size-4" />
                                Ändern
                              </Button>
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => {
                                  const next = { ...settings.imageAssignments };
                                  delete next[slot.slotId];
                                  updateSettings({ imageAssignments: next });
                                }}
                                className="min-h-[36px] shrink-0"
                              >
                                <Trash2 className="mr-1 size-4" />
                                Entfernen
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
        </div>
      </section>

      {assignModalSlot && (
        <ImageAssignModal
          slotId={assignModalSlot}
          slotLabel={
            IMAGE_SLOTS.find((s) => s.slotId === assignModalSlot)?.alt ?? ""
          }
          aspectRatio={
            IMAGE_SLOTS.find((s) => s.slotId === assignModalSlot)
              ?.aspectRatio === "auto"
              ? "auto"
              : IMAGE_SLOTS.find((s) => s.slotId === assignModalSlot)
                  ?.aspectRatio === "3/4"
                ? "3/4"
                : "4/3"
          }
          uploadedImages={uploaded}
          onAssign={(imagePath) => {
            updateSettings({
              imageAssignments: {
                ...settings.imageAssignments,
                [assignModalSlot]: { imagePath },
              },
            });
            setUploaded((prev) =>
              prev.includes(imagePath) ? prev : [...prev, imagePath]
            );
            setToast({ message: "Bild zugewiesen.", variant: "success" });
          }}
          onClose={() => setAssignModalSlot(null)}
        />
      )}

      {/* Echte Bilder (Logo etc.) */}
      <section className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-neutral-800">
          Feste Bilder (Kopfbereich, Logo)
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {REAL_IMAGES.map((img) => (
            <div
              key={img.path}
              className="overflow-hidden rounded-xl border border-neutral-200 bg-white"
            >
              <div className="relative aspect-video bg-neutral-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.path}
                  alt={img.alt ?? ""}
                  className="size-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
              <div className="p-3">
                <p className="font-medium text-neutral-800">{img.path}</p>
                <p className="mt-1 text-xs text-neutral-500">
                  {img.usedOn.join(", ")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}