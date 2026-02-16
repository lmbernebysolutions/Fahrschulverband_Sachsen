"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { Button, Input, Select } from "@/components/atoms";
import { ServiceGrid } from "./ServiceGrid";
import { cn } from "@/lib/utils";

const specializations = [
  { value: "", label: "Alle" },
  { value: "bkf", label: "Berufskraftfahrer" },
  { value: "asf", label: "Aufbauseminar" },
  { value: "fes", label: "Fahreignungsseminare" },
  { value: "behindert", label: "Behindertenausbildung" },
  { value: "mobil", label: "Mobil ohne Angst" },
];

export function FahrschulSearch() {
  const [plz, setPlz] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
  };

  return (
    <section>
      <form
        onSubmit={handleSearch}
        className="relative -mt-8 rounded-xl bg-white p-6 shadow-lg lg:mx-8"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-neutral-400" />
            <Input
              type="text"
              placeholder="PLZ oder Ort eingeben"
              value={plz}
              onChange={(e) => setPlz(e.target.value)}
              className="pl-12"
            />
          </div>
          <Select
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
          >
            {specializations.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </Select>
          <Button type="submit" variant="primary" fullWidth>
            Fahrschule finden
          </Button>
        </div>
      </form>

      {searched && (
        <div className="mt-12 rounded-xl bg-neutral-50 p-8">
          <h3 className="text-lg font-semibold text-neutral-800">
            Such-Ergebnisse (Mock)
          </h3>
          <p className="mt-2 text-neutral-600">
            In einer echten Implementierung würden hier Fahrschulen aus der
            Umgebung angezeigt.
          </p>
        </div>
      )}

      <div className="mt-16">
        <h2 className="mb-6 text-xl font-bold text-primary-500">
          Weitere Online-Suchmöglichkeiten
        </h2>
        <ServiceGrid />
      </div>
    </section>
  );
}
