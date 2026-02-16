"use server";

import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp"];

/** Meldung, wenn Dateisystem schreibgeschützt ist (z. B. Vercel). */
const READONLY_FS_MESSAGE =
  "Bild-Upload ist auf diesem Server nicht möglich (z. B. Vercel). Bitte lokal testen oder einen Speicherdienst (z. B. Vercel Blob) einbinden.";

function isReadOnlyError(err: unknown): boolean {
  const e = err as NodeJS.ErrnoException;
  return e?.code === "EROFS" || e?.code === "EACCES";
}
const MAX_SIZE_MB = 10;
const MAX_WIDTH = 1920;
const QUALITY = 85;

/**
 * Server Action: Bild-Upload in public/images.
 * Migriert von ByteCloud-Konzept: Auto-Resize, Format-Normalisierung.
 * Löst Format-Konflikte und große Dateien – benutzerfreundlich.
 */
export async function uploadImage(formData: FormData): Promise<
  | { success: true; path: string }
  | { success: false; error: string }
> {
  const file = formData.get("file") as File | null;
  if (!file) {
    return { success: false, error: "Keine Datei ausgewählt." };
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      success: false,
      error: `Ungültiges Format. Erlaubt: PNG, JPG, WebP. Sie haben: ${file.type}`,
    };
  }

  const sizeMB = file.size / (1024 * 1024);
  if (sizeMB > MAX_SIZE_MB) {
    return {
      success: false,
      error: `Datei zu groß (max. ${MAX_SIZE_MB} MB). Aktuell: ${sizeMB.toFixed(1)} MB`,
    };
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_").replace(/\.[^.]+$/, "") || "bild";
  const publicDir = path.join(process.cwd(), "public", "images");

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  try {
    await fs.mkdir(publicDir, { recursive: true });
  } catch (err) {
    if (isReadOnlyError(err)) {
      return { success: false, error: READONLY_FS_MESSAGE };
    }
    throw err;
  }

  let fileName: string;
  try {
    fileName = `${safeName}-${Date.now()}.webp`;
    const optimized = await sharp(buffer)
      .resize(MAX_WIDTH, undefined, { withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toBuffer();
    await fs.writeFile(path.join(publicDir, fileName), optimized);
  } catch (err) {
    if (isReadOnlyError(err)) {
      return { success: false, error: READONLY_FS_MESSAGE };
    }
    const ext = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
    fileName = `${safeName}-${Date.now()}.${ext}`;
    try {
      await fs.writeFile(path.join(publicDir, fileName), buffer);
    } catch (writeErr) {
      if (isReadOnlyError(writeErr)) {
        return { success: false, error: READONLY_FS_MESSAGE };
      }
      throw writeErr;
    }
  }

  return { success: true, path: `/images/${fileName}` };
}

/** Ziel-Seitenverhältnis: exakt Container-Maße. Hero = 3:1 (Breite : min-h 500px typisch). */
const TARGET_ASPECTS = { "4/3": [4, 3], "16/9": [16, 9], "3/4": [3, 4], "3/1": [3, 1] } as const;

/**
 * Upload mit Crop: Nutzer wählt Ausschnitt, wird zugeschnitten.
 * cropX, cropY, cropW, cropH = Prozent (0-100) vom Originalbild.
 * aspectRatio = "4/3" | "16/9" – Output hat exakt diese Maße (Container-Match).
 */
export async function uploadImageWithCrop(formData: FormData): Promise<
  | { success: true; path: string }
  | { success: false; error: string }
> {
  const file = formData.get("file") as File | null;
  const cropX = parseFloat((formData.get("cropX") as string) ?? "0");
  const cropY = parseFloat((formData.get("cropY") as string) ?? "0");
  const cropW = parseFloat((formData.get("cropW") as string) ?? "100");
  const cropH = parseFloat((formData.get("cropH") as string) ?? "100");
  const aspectRatio = ((formData.get("aspectRatio") as string) ?? "4/3") as "4/3" | "16/9" | "3/4" | "3/1";
  const [num, den] = TARGET_ASPECTS[aspectRatio as keyof typeof TARGET_ASPECTS] ?? TARGET_ASPECTS["4/3"];

  if (!file) {
    return { success: false, error: "Keine Datei ausgewählt." };
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      success: false,
      error: `Ungültiges Format. Erlaubt: PNG, JPG, WebP.`,
    };
  }

  const sizeMB = file.size / (1024 * 1024);
  if (sizeMB > MAX_SIZE_MB) {
    return {
      success: false,
      error: `Datei zu groß (max. ${MAX_SIZE_MB} MB).`,
    };
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_").replace(/\.[^.]+$/, "") || "bild";
  const publicDir = path.join(process.cwd(), "public", "images");

  try {
    await fs.mkdir(publicDir, { recursive: true });
  } catch (err) {
    if (isReadOnlyError(err)) {
      return { success: false, error: READONLY_FS_MESSAGE };
    }
    throw err;
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  let fileName: string;
  try {
    const img = sharp(buffer);
    const meta = await img.metadata();
    const w = meta.width ?? 1;
    const h = meta.height ?? 1;

    const left = Math.round((cropX / 100) * w);
    const top = Math.round((cropY / 100) * h);
    const width = Math.max(1, Math.round((cropW / 100) * w));
    const height = Math.max(1, Math.round((cropH / 100) * h));

    const targetWidth = width;
    const targetHeight = Math.round((targetWidth * den) / num);

    fileName = `${safeName}-${Date.now()}.webp`;
    const cropped = await img
      .extract({ left: Math.max(0, left), top: Math.max(0, top), width, height })
      .resize(targetWidth, targetHeight, { fit: "cover", position: "center" })
      .webp({ quality: QUALITY })
      .toBuffer();
    await fs.writeFile(path.join(publicDir, fileName), cropped);
  } catch (err) {
    if (isReadOnlyError(err)) {
      return { success: false, error: READONLY_FS_MESSAGE };
    }
    const result = await uploadImage(formData);
    return result;
  }

  return { success: true, path: `/images/${fileName}` };
}

/**
 * Bereits hochgeladenes Bild zuschneiden.
 * aspectRatio = "4/3" | "16/9" – Output hat exakt diese Maße (Container-Match).
 */
export async function cropExistingImage(
  imagePath: string,
  cropX: number,
  cropY: number,
  cropW: number,
  cropH: number,
  aspectRatio: "4/3" | "16/9" | "3/4" | "3/1" = "4/3"
): Promise<
  | { success: true; path: string }
  | { success: false; error: string }
> {
  if (!imagePath.startsWith("/images/")) {
    return { success: false, error: "Ungültiger Bildpfad." };
  }
  const fileName = imagePath.replace("/images/", "");
  const publicDir = path.join(process.cwd(), "public", "images");
  const filePath = path.join(publicDir, fileName);

  const [num, den] = TARGET_ASPECTS[aspectRatio as keyof typeof TARGET_ASPECTS] ?? TARGET_ASPECTS["4/3"];

  try {
    const buffer = await fs.readFile(filePath);
    const img = sharp(buffer);
    const meta = await img.metadata();
    const w = meta.width ?? 1;
    const h = meta.height ?? 1;

    const left = Math.round((cropX / 100) * w);
    const top = Math.round((cropY / 100) * h);
    const width = Math.max(1, Math.round((cropW / 100) * w));
    const height = Math.max(1, Math.round((cropH / 100) * h));

    const targetWidth = width;
    const targetHeight = Math.round((targetWidth * den) / num);

    const baseName = fileName.replace(/\.[^.]+$/, "") || "bild";
    const newFileName = `${baseName}-cropped-${Date.now()}.webp`;

    const cropped = await img
      .extract({
        left: Math.max(0, left),
        top: Math.max(0, top),
        width,
        height,
      })
      .resize(targetWidth, targetHeight, { fit: "cover", position: "center" })
      .webp({ quality: QUALITY })
      .toBuffer();
    await fs.writeFile(path.join(publicDir, newFileName), cropped);

    return { success: true, path: `/images/${newFileName}` };
  } catch (e) {
    if (isReadOnlyError(e)) {
      return { success: false, error: READONLY_FS_MESSAGE };
    }
    return {
      success: false,
      error: e instanceof Error ? e.message : "Zuschneiden fehlgeschlagen.",
    };
  }
}

/**
 * Löscht ein Bild aus der Mediathek (public/images).
 * Entfernt auch die Zuweisung aus settings, falls das Bild einem Slot zugewiesen war.
 */
export async function deleteImage(imagePath: string): Promise<
  | { success: true }
  | { success: false; error: string }
> {
  if (!imagePath.startsWith("/images/")) {
    return { success: false, error: "Ungültiger Bildpfad." };
  }
  const fileName = imagePath.replace("/images/", "");
  const publicDir = path.join(process.cwd(), "public", "images");
  const filePath = path.join(publicDir, fileName);

  try {
    await fs.unlink(filePath);
    return { success: true };
  } catch (e) {
    if (isReadOnlyError(e)) {
      return { success: false, error: READONLY_FS_MESSAGE };
    }
    return {
      success: false,
      error: e instanceof Error ? e.message : "Löschen fehlgeschlagen.",
    };
  }
}

/**
 * Listet alle Bilder in public/images auf (für Admin-Übersicht).
 */
export async function listUploadedImages(): Promise<string[]> {
  const publicDir = path.join(process.cwd(), "public", "images");
  try {
    const files = await fs.readdir(publicDir);
    return files
      .filter((f) => /\.(png|jpg|jpeg|webp)$/i.test(f))
      .map((f) => `/images/${f}`);
  } catch {
    return [];
  }
}
