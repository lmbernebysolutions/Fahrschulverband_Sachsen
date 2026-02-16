"use client";

import { useState } from "react";
import { Button } from "@/components/atoms";

export function PasswordGate() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "Falsches Passwort.");
        return;
      }
      window.location.reload();
    } catch {
      setError("Verbindungsfehler.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-neutral-100 px-4 py-6"
      style={{ minHeight: "100dvh" }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <h1 className="text-xl font-semibold text-neutral-800">
          Zugang geschützt
        </h1>
        <p className="mt-2 text-sm text-neutral-600">
          Bitte Passwort eingeben, um die Website zu sehen.
        </p>
        <div className="mt-6 space-y-2">
          <label htmlFor="site-password" className="sr-only">
            Passwort
          </label>
          <div className="relative">
            <input
              id="site-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Passwort"
              autoFocus
              autoComplete="current-password"
              className="min-h-[48px] w-full rounded-lg border border-neutral-300 px-4 py-3 pr-24 text-base text-neutral-800 placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              disabled={loading}
            />
            <label className="absolute right-2 top-1/2 flex -translate-y-1/2 cursor-pointer items-center gap-1.5 rounded px-2 py-1 text-sm text-neutral-600 hover:bg-neutral-100 hover:text-neutral-800">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={(e) => setShowPassword(e.target.checked)}
                className="h-4 w-4 rounded border-neutral-300"
                aria-label="Passwort anzeigen"
              />
              <span>Anzeigen</span>
            </label>
          </div>
        </div>
        {error && (
          <p className="mt-3 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
        <Button
          type="submit"
          variant="primary"
          className="mt-4 min-h-[48px] w-full"
          disabled={loading || !password.trim()}
        >
          {loading ? "Prüfe…" : "Zugang anfordern"}
        </Button>
      </form>
    </div>
  );
}
