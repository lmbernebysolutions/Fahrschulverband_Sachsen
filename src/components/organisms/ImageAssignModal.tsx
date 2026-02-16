"use client";

import { useState, useRef, useCallback } from "react";
import ReactCrop, {
  type Crop,
  type PercentCrop,
  centerCrop,
  makeAspectCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { X } from "lucide-react";
import { Button } from "@/components/atoms";
import { uploadImageWithCrop, cropExistingImage } from "@/app/actions/uploadImage";
import type { ImageSlotId } from "@/lib/imageUsage";

const DEFAULT_ASPECT = 4 / 3;
/** Hero-Bereich: min-h 500px, volle Breite → typisch 3:1 (z. B. 1440×500) */
const HERO_ASPECT = 3 / 1;
const MAX_SIZE_MB = 10;

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
): PercentCrop {
  return centerCrop(
    makeAspectCrop(
      { unit: "%", width: 90 },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

export interface ImageAssignModalProps {
  slotId: ImageSlotId;
  slotLabel: string;
  uploadedImages: string[];
  aspectRatio?: "4/3" | "16/9" | "3/4" | "auto";
  onAssign: (imagePath: string, objectPosition?: string) => void;
  onClose: () => void;
}

export function ImageAssignModal({
  slotId,
  slotLabel,
  uploadedImages,
  aspectRatio = "4/3",
  onAssign,
  onClose,
}: ImageAssignModalProps) {
  const PORTRAIT_ASPECT = 3 / 4;
  const aspect =
    aspectRatio === "16/9" || aspectRatio === "auto"
      ? HERO_ASPECT
      : aspectRatio === "3/4"
        ? PORTRAIT_ASPECT
        : DEFAULT_ASPECT;
  const [step, setStep] = useState<"choose" | "crop">("choose");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedExistingPath, setSelectedExistingPath] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleFileSelect = useCallback((file: File) => {
    const maxBytes = MAX_SIZE_MB * 1024 * 1024;
    if (file.size > maxBytes) {
      setError(`Datei zu groß (${(file.size / 1024 / 1024).toFixed(1)} MB). Maximal ${MAX_SIZE_MB} MB erlaubt.`);
      return;
    }
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setError(null);
    setSelectedFile(file);
    setSelectedExistingPath(null);
    setPreviewUrl(URL.createObjectURL(file));
    setCrop(undefined);
    setStep("crop");
  }, [previewUrl]);

  const handleSelectExistingForCrop = useCallback((path: string) => {
    if (previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    setError(null);
    setSelectedFile(null);
    setSelectedExistingPath(path);
    setPreviewUrl(path);
    setCrop(undefined);
    setStep("crop");
  }, [previewUrl]);

  const onImageLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const { naturalWidth: width, naturalHeight: height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    },
    [aspect]
  );

  const handleCropAndAssign = useCallback(async () => {
    if (!crop || crop.unit !== "%") return;
    setUploading(true);
    setError(null);

    let result: { success: true; path: string } | { success: false; error: string };

    const aspectStr = aspectRatio === "16/9" ? "16/9" : aspectRatio === "3/4" ? "3/4" : aspectRatio === "auto" ? "3/1" : "4/3";

    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("cropX", String(crop.x));
      formData.append("cropY", String(crop.y));
      formData.append("cropW", String(crop.width));
      formData.append("cropH", String(crop.height));
      formData.append("aspectRatio", aspectStr);
      result = await uploadImageWithCrop(formData);
    } else if (selectedExistingPath) {
      result = await cropExistingImage(
        selectedExistingPath,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        aspectStr
      );
    } else {
      setUploading(false);
      return;
    }

    setUploading(false);
    if (result.success) {
      onAssign(result.path);
      onClose();
    } else {
      setError(result.error);
    }
  }, [selectedFile, selectedExistingPath, crop, aspectRatio, onAssign, onClose]);

  const handleClose = useCallback(() => {
    if (previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    onClose();
  }, [previewUrl, onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="image-assign-title"
    >
      <div className="max-h-[90vh] w-full max-w-2xl overflow-auto rounded-xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-neutral-200 p-4">
          <h2 id="image-assign-title" className="text-lg font-semibold text-neutral-900">
            Bild zuweisen: {slotLabel}
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700"
            aria-label="Schließen"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="p-4">
          {step === "choose" && (
            <div className="space-y-4">
              <p className="text-sm text-neutral-600">
                Wählen Sie ein vorhandenes Bild oder laden Sie ein neues hoch und schneiden Sie es zu.
              </p>
              {uploadedImages.length > 0 && (
                <div>
                  <p className="mb-2 text-sm font-medium text-neutral-700">
                    Vorhandene Bilder (klicken zum Zuschneiden)
                  </p>
                  <p className="mb-2 text-xs text-neutral-500">
                    Ausschnitt: {aspectRatio === "auto" ? "3:1 (Hero-Bereich)" : aspectRatio === "16/9" ? "16:9" : aspectRatio === "3/4" ? "3:4" : "4:3"}.
                  </p>
                  <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
                    {uploadedImages.map((path) => (
                      <button
                        key={path}
                        type="button"
                        onClick={() => handleSelectExistingForCrop(path)}
                        className="aspect-video overflow-hidden rounded-lg border-2 border-neutral-200 bg-neutral-100 transition-colors hover:border-primary-500"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={path}
                          alt=""
                          className="size-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <p className="mb-2 text-sm font-medium text-neutral-700">
                  Neues Bild hochladen und zuschneiden
                </p>
                <p className="mb-2 text-xs text-neutral-500">
                  Max. {MAX_SIZE_MB} MB – zu große Dateien werden abgelehnt.
                </p>
                {error && (
                  <div className="mb-2 rounded-lg bg-red-50 p-2 text-sm text-red-700">
                    {error}
                  </div>
                )}
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={(e) => {
                    setError(null);
                    const f = e.target.files?.[0];
                    if (f) handleFileSelect(f);
                    e.target.value = "";
                  }}
                  className="block w-full text-sm text-neutral-600 file:mr-4 file:rounded-lg file:border-0 file:bg-primary-500 file:px-4 file:py-2 file:text-white file:hover:bg-primary-600"
                />
              </div>
            </div>
          )}

          {step === "crop" && previewUrl && (
            <div className="space-y-4">
              <p className="text-sm text-neutral-600">
                Ziehen Sie den Rahmen, um den Ausschnitt zu wählen.
              </p>
              <div className="max-h-[400px] overflow-auto rounded-lg border border-neutral-200 bg-neutral-50">
                <ReactCrop
                  crop={crop}
                  onChange={(_, percentCrop) => setCrop(percentCrop)}
                  aspect={aspect}
                  className="max-h-[360px]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    ref={imgRef}
                    src={previewUrl}
                    alt="Zuschneiden"
                    onLoad={onImageLoad}
                    className="max-h-[360px] w-full object-contain"
                  />
                </ReactCrop>
              </div>
              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}
              <div className="flex justify-end gap-2">
                <Button
                  variant="secondary"
                  onClick={() => {
                    setStep("choose");
                    if (selectedFile && previewUrl?.startsWith("blob:")) {
                      URL.revokeObjectURL(previewUrl);
                    }
                    setSelectedFile(null);
                    setSelectedExistingPath(null);
                    setPreviewUrl(null);
                  }}
                >
                  Zurück
                </Button>
                <Button
                  variant="primary"
                  onClick={handleCropAndAssign}
                  disabled={!crop || uploading}
                >
                  {uploading ? "Wird verarbeitet…" : "Zuschneiden & Zuweisen"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
