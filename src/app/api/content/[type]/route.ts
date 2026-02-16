import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { list, put } from "@vercel/blob";
import {
  initialNews,
  initialSeminars,
  initialFahrschulAds,
  initialMembershipFees,
  initialSettings,
  initialWebsiteNav,
  initialFooterContent,
} from "@/lib/mockData";

const DATA_DIR = path.join(process.cwd(), "data");
const BLOB_PREFIX = "content/";

const ALLOWED_TYPES = [
  "news",
  "seminars",
  "fahrschulmarkt",
  "membership-fees",
  "settings",
  "websiteNav",
  "footerContent",
] as const;

const INITIAL_DATA: Record<(typeof ALLOWED_TYPES)[number], unknown> = {
  news: initialNews,
  seminars: initialSeminars,
  fahrschulmarkt: initialFahrschulAds,
  "membership-fees": initialMembershipFees,
  settings: initialSettings,
  websiteNav: initialWebsiteNav,
  footerContent: initialFooterContent,
};

function getFilePath(type: string): string {
  return path.join(DATA_DIR, `${type}.json`);
}

async function ensureDataDir(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

function useBlob(): boolean {
  return (
    typeof process.env.BLOB_READ_WRITE_TOKEN === "string" &&
    process.env.BLOB_READ_WRITE_TOKEN.length > 0
  );
}

/** Blob-Pfad für einen Typ (z. B. content/news.json) */
function getBlobPath(type: string): string {
  return `${BLOB_PREFIX}${type}.json`;
}

/** GET: Aus Vercel Blob oder Dateisystem lesen */
export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ type: string }> }
) {
  const { type } = await context.params;
  if (!type || !ALLOWED_TYPES.includes(type as (typeof ALLOWED_TYPES)[number])) {
    return NextResponse.json(
      { error: "Ungültiger Typ" },
      { status: 400 }
    );
  }

  const initial = INITIAL_DATA[type as (typeof ALLOWED_TYPES)[number]];

  if (useBlob()) {
    try {
      const pathname = getBlobPath(type);
      const { blobs } = await list({ prefix: BLOB_PREFIX });
      const blob = blobs.find((b) => b.pathname === pathname);
      if (!blob?.url) {
        return NextResponse.json(initial);
      }
      const res = await fetch(blob.url);
      if (!res.ok) return NextResponse.json(initial);
      const data = await res.json();
      return NextResponse.json(data);
    } catch {
      return NextResponse.json(initial);
    }
  }

  const filePath = getFilePath(type);
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(raw);
    return NextResponse.json(data);
  } catch (err) {
    const nodeErr = err as NodeJS.ErrnoException;
    if (nodeErr?.code === "ENOENT") {
      return NextResponse.json(initial);
    }
    return NextResponse.json(
      { error: "Datei nicht gefunden" },
      { status: 404 }
    );
  }
}

/** POST: In Vercel Blob oder Dateisystem schreiben */
export async function POST(
  request: NextRequest,
  context: { params: Promise<{ type: string }> }
) {
  const { type } = await context.params;
  if (!type || !ALLOWED_TYPES.includes(type as (typeof ALLOWED_TYPES)[number])) {
    return NextResponse.json(
      { error: "Ungültiger Typ" },
      { status: 400 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Ungültiger JSON-Body" },
      { status: 400 }
    );
  }

  if (useBlob()) {
    try {
      const pathname = getBlobPath(type);
      const payload = JSON.stringify(body, null, 2);
      await put(pathname, payload, {
        access: "public",
        contentType: "application/json",
        addRandomSuffix: false,
        allowOverwrite: true,
      });
      return NextResponse.json({ success: true });
    } catch (err) {
      console.error("POST /api/content/[type] (Blob):", err);
      return NextResponse.json(
        { error: "Speichern in Blob fehlgeschlagen" },
        { status: 500 }
      );
    }
  }

  const filePath = getFilePath(type);
  try {
    await ensureDataDir();
    const backupDir = path.join(DATA_DIR, "backups");
    try {
      const oldData = await fs.readFile(filePath, "utf-8");
      await fs.mkdir(backupDir, { recursive: true });
      await fs.writeFile(
        path.join(backupDir, `${type}-${Date.now()}.json`),
        oldData,
        "utf-8"
      );
    } catch {
      // Backup optional
    }
    await fs.writeFile(
      filePath,
      JSON.stringify(body, null, 2),
      "utf-8"
    );
    return NextResponse.json({ success: true });
  } catch (err) {
    const nodeErr = err as NodeJS.ErrnoException;
    if (nodeErr?.code === "EROFS" || nodeErr?.code === "EACCES") {
      return NextResponse.json(
        {
          error:
            "Speichern auf diesem Server nicht möglich (z. B. Vercel ohne Blob). Bitte BLOB_READ_WRITE_TOKEN setzen.",
        },
        { status: 503 }
      );
    }
    console.error("POST /api/content/[type]:", err);
    return NextResponse.json(
      { error: "Speichern fehlgeschlagen" },
      { status: 500 }
    );
  }
}
