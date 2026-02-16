/**
 * Client-seitige Bildkomprimierung vor Upload (Best Practice).
 * Verkleinert große Bilder auf max. 1920px Breite und reduziert die Dateigröße,
 * damit der Upload schnell und zuverlässig funktioniert – auch bei 4–10 MB Originalen.
 */

const MAX_WIDTH = 1920;
const JPEG_QUALITY = 0.88;

export async function compressImageFile(file: File): Promise<File> {
  if (typeof document === "undefined" || typeof Image === "undefined") return file;

  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      const { width, height } = img;
      const scale = width > MAX_WIDTH ? MAX_WIDTH / width : 1;
      const w = Math.round(width * scale);
      const h = Math.round(height * scale);

      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(file);
        return;
      }
      ctx.drawImage(img, 0, 0, w, h);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            resolve(file);
            return;
          }
          const baseName = file.name.replace(/\.[^.]+$/, "") || "bild";
          const compressed = new File([blob], `${baseName}.jpg`, {
            type: "image/jpeg",
            lastModified: Date.now(),
          });
          resolve(compressed);
        },
        "image/jpeg",
        JPEG_QUALITY
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(file);
    };

    img.src = url;
  });
}

/** Ab dieser Größe wird komprimiert (1.5 MB), darunter wird das Original gesendet */
export const COMPRESS_THRESHOLD_BYTES = 1.5 * 1024 * 1024;
