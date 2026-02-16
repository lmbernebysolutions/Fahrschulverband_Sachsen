import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "site_access";
const COOKIE_VALUE = "1";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 Tage

export async function POST(request: NextRequest) {
  const password = process.env.SITE_PASSWORD;
  if (!password) {
    return NextResponse.json(
      { error: "Passwortschutz ist nicht konfiguriert." },
      { status: 500 }
    );
  }

  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  const submitted = body.password ?? "";
  if (submitted !== password) {
    return NextResponse.json({ error: "Falsches Passwort." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, COOKIE_VALUE, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
  return res;
}
