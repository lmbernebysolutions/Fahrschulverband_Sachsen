"use client";

import { useState } from "react";
import { Button } from "@/components/atoms";

export function PasswordGate() {
  const [password, setPassword] = useState("");
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
      className="flex min-h-screen items-center justify-center bg-neutral-100 px-4"
      style={{ minHeight: "100dvh" }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-xl border border-neutral-200 bg-white p-8 shadow-sm"
      >
        <h1 className="text-xl font-semibold text-neutral-800">
          Zugang geschützt
        </h1>
        <p className="mt-2 text-sm text-neutral-600">
          Bitte Passwort eingeben, um die Website zu sehen.
        </p>
        <div className="mt-6">
          <label htmlFor="site-password" className="sr-only">
            Passwort
          </label>
          <input
            id="site-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Passwort"
            autoFocus
            autoComplete="current-password"
            className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-neutral-800 placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            disabled={loading}
          />
        </div>
        {error && (
          <p className="mt-3 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
        <Button
          type="submit"
          variant="primary"
          className="mt-4 w-full"
          disabled={loading || !password.trim()}
        >
          {loading ? "Prüfe…" : "Zugang anfordern"}
        </Button>
      </form>
    </div>
  );
}
