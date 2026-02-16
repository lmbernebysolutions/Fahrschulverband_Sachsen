/**
 * Excel-Import/Export für Mitgliedschaftsbeiträge
 * Erwartet Spalten: Kategorie | Betrag | Hinweis
 */

import * as XLSX from "xlsx";
import type { FeeRow } from "./mockData";

export function parseExcelToFees(file: File): Promise<FeeRow[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array((e.target?.result as ArrayBuffer) ?? []);
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        if (!sheet) {
          reject(new Error("Excel-Datei enthält kein Blatt."));
          return;
        }

        type ExcelRow = {
          Kategorie?: string;
          Betrag?: string;
          Hinweis?: string;
        };
        const rows = XLSX.utils.sheet_to_json<ExcelRow>(sheet);

        const fees: FeeRow[] = rows.map((row, i) => ({
          id: `fee-${Date.now()}-${i}`,
          label: row.Kategorie ?? "",
          betrag: row.Betrag ?? "",
          hinweis: row.Hinweis?.trim() || null,
        }));

        resolve(fees);
      } catch (err) {
        reject(
          err instanceof Error ? err : new Error("Excel-Datei konnte nicht gelesen werden.")
        );
      }
    };

    reader.onerror = () =>
      reject(new Error("Datei konnte nicht geladen werden."));
    reader.readAsArrayBuffer(file);
  });
}

export function exportFeesToExcel(
  fees: FeeRow[],
  filename = "mitgliedschaftsbeitraege.xlsx"
): void {
  const worksheet = XLSX.utils.json_to_sheet(
    fees.map((f) => ({
      Kategorie: f.label,
      Betrag: f.betrag,
      Hinweis: f.hinweis ?? "",
    }))
  );

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Beiträge");
  XLSX.writeFile(workbook, filename);
}
