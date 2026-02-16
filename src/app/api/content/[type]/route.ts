import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import {
  initialNews,
  initialSeminars,
  initialFahrschulAds,
  initialMembershipFees,
  initialSettings,
} from "@/lib/mockData";

const DATA_DIR = path.join(process.cwd(), "data");

const ALLOWED_TYPES = [
  "news",
  "seminars",
  "fahrschulmarkt",
  "membership-fees",
  "settings",
] as const;

const INITIAL_DATA: Record<(typeof ALLOWED_TYPES)[number], unknown> = {
  news: initialNews,
  seminars: initialSeminars,
  fahrschulmarkt: initialFahrschulAds,
  "membership-fees": initialMembershipFees,
  settings: initialSettings,
};

function getFilePath(type: string): string {
  return path.join(DATA_DIR, `${type}.json`);
}

async function ensureDataDir(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

/** GET /api/content/[type] – Liest JSON-Datei, legt sie bei Bedarf aus Initialdaten an */
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

  const filePath = getFilePath(type);

  try {
    const raw = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(raw);
    return NextResponse.json(data);
  } catch (err) {
    const nodeErr = err as NodeJS.ErrnoException;
    if (nodeErr?.code === "ENOENT") {
      const initial = INITIAL_DATA[type as (typeof ALLOWED_TYPES)[number]];
      if (initial !== undefined) {
        try {
          await ensureDataDir();
          await fs.writeFile(
            filePath,
            JSON.stringify(initial, null, 2),
            "utf-8"
          );
        } catch {
          // Auf Vercel etc.: Dateisystem read-only → nur Initialdaten zurückgeben
        }
        return NextResponse.json(initial);
      }
    }
    return NextResponse.json(
      { error: "Datei nicht gefunden" },
      { status: 404 }
    );
  }
}

/** POST /api/content/[type] – Überschreibt JSON-Datei (mit optionalem Backup) */
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

  const filePath = getFilePath(type);

  try {
    const body = await request.json();

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
      // Backup optional, fortfahren
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
            "Speichern auf diesem Server nicht möglich (z. B. Vercel). Bitte localStorage oder eine Datenbank nutzen.",
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
