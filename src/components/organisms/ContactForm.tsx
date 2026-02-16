"use client";

import { useState } from "react";
import { FormField } from "@/components/molecules";
import { Button } from "@/components/atoms";
import { Toast } from "@/components/molecules";

const betreffOptions = [
  { value: "fortbildung", label: "Fortbildung" },
  { value: "mitgliedschaft", label: "Mitgliedschaft" },
  { value: "fahrschulmarkt", label: "Fahrschulmarkt" },
  { value: "sonstiges", label: "Sonstiges" },
];

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("success");
  };

  return (
    <div className="space-y-6">
      {status === "success" && (
        <Toast
          variant="success"
          message="Vielen Dank! Wir melden uns innerhalb von 2 Werktagen."
          onDismiss={() => setStatus("idle")}
        />
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField
          label="Name"
          name="name"
          required
          placeholder="Ihr Name"
        />
        <FormField
          label="E-Mail"
          name="email"
          type="email"
          required
          placeholder="ihre@email.de"
        />
        <FormField
          label="Betreff"
          name="betreff"
          as="select"
          options={betreffOptions}
          required
        />
        <FormField
          label="Nachricht"
          name="message"
          as="textarea"
          required
          placeholder="Ihre Nachricht..."
        />
        <p className="text-sm text-neutral-500">
          Wir melden uns innerhalb von 2 Werktagen.
        </p>
        <Button type="submit" variant="primary" fullWidth>
          Nachricht senden
        </Button>
      </form>
    </div>
  );
}
