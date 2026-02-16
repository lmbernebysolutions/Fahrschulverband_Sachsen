"use client";

import { useState, useCallback } from "react";
import { useSiteData } from "@/context/SiteDataContext";
import type { FeeRow } from "@/lib/mockData";
import { parseExcelToFees, exportFeesToExcel } from "@/lib/excelParser";
import { AdminBreadcrumbs, LargeButton } from "@/components/admin";
import { EditableTable } from "@/components/admin/organisms/EditableTable";
import { ExcelDropzone } from "@/components/admin/organisms/ExcelDropzone";
import { Toast } from "@/components/molecules";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";

export default function MitgliedschaftTabellenPage() {
  const {
    membershipFees,
    setMembershipFees,
    updateFeeRow,
    addFeeRow,
    deleteFeeRow,
  } = useSiteData();

  const [toast, setToast] = useState<{
    message: string;
    variant: "success" | "error";
  } | null>(null);
  const [importOpen, setImportOpen] = useState(false);
  useLockBodyScroll(importOpen);
  const [importPreview, setImportPreview] = useState<FeeRow[] | null>(null);
  const [importFile, setImportFile] = useState<File | null>(null);
  const [importError, setImportError] = useState<string | null>(null);

  const handleExport = useCallback(() => {
    exportFeesToExcel(membershipFees);
    setToast({ message: "Excel-Datei wurde heruntergeladen.", variant: "success" });
  }, [membershipFees]);

  const handleFileDrop = useCallback(
    async (file: File) => {
      setImportError(null);
      setImportPreview(null);
      setImportFile(file);
      try {
        const fees = await parseExcelToFees(file);
        setImportPreview(fees);
      } catch (err) {
        setImportError(
          err instanceof Error ? err.message : "Datei konnte nicht gelesen werden."
        );
      }
    },
    []
  );

  const handleConfirmImport = useCallback(() => {
    if (importPreview && importPreview.length > 0) {
      setMembershipFees(importPreview);
      setToast({ message: "Beiträge wurden importiert.", variant: "success" });
      setImportOpen(false);
      setImportPreview(null);
      setImportFile(null);
      setImportError(null);
    }
  }, [importPreview, setMembershipFees]);

  const handleCloseImport = useCallback(() => {
    setImportOpen(false);
    setImportPreview(null);
    setImportFile(null);
    setImportError(null);
  }, []);

  const handleEdit = useCallback(
    (rowId: string, field: keyof FeeRow, value: unknown) => {
      updateFeeRow(rowId, {
        [field]: field === "hinweis" && (value === "" || value === undefined) ? null : value,
      });
    },
    [updateFeeRow]
  );

  return (
    <div className="space-y-8">
      <div>
        <AdminBreadcrumbs
          items={["Übersicht", "Inhalte bearbeiten", "Tabellen (Beiträge)"]}
        />
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-bold text-neutral-900">
            Mitgliedschaftsbeiträge
          </h1>
          <div className="flex flex-wrap gap-4">
            <LargeButton variant="primary" size="xl" onClick={handleExport}>
              ↓ Als Excel exportieren
            </LargeButton>
            <LargeButton
              variant="secondary"
              size="xl"
              onClick={() => setImportOpen(true)}
            >
              ↑ Aus Excel importieren
            </LargeButton>
          </div>
        </div>
      </div>

      {toast && (
        <Toast
          variant={toast.variant}
          message={toast.message}
          onDismiss={() => setToast(null)}
        />
      )}

      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <p className="mb-6 text-lg text-neutral-600">
          Bearbeiten Sie die Tabelle direkt in den Zellen oder importieren Sie
          eine Excel-Datei mit den Spalten: Kategorie, Betrag, Hinweis.
        </p>
        <EditableTable<FeeRow>
          data={membershipFees}
          columns={[
            { header: "Kategorie", accessorKey: "label" },
            { header: "Betrag", accessorKey: "betrag" },
            { header: "Hinweis", accessorKey: "hinweis", multiline: true },
          ]}
          onEdit={handleEdit}
          onAddRow={addFeeRow}
          onDeleteRow={deleteFeeRow}
        />
      </div>

      {importOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="import-title"
        >
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-8 shadow-xl">
            <h2 id="import-title" className="text-2xl font-bold text-neutral-900">
              Excel-Datei importieren
            </h2>

            <ExcelDropzone
              onDrop={handleFileDrop}
              maxSize={5 * 1024 * 1024}
              className="mt-6"
            />

            {importError && (
              <p className="mt-4 text-lg font-medium text-red-600">
                {importError}
              </p>
            )}

            {importPreview && importPreview.length > 0 && (
              <>
                <h3 className="mt-6 text-xl font-semibold text-neutral-800">
                  Vorschau (aus Excel)
                </h3>
                <div className="mt-4 overflow-x-auto rounded-lg border border-neutral-200">
                  <table className="w-full text-left text-lg">
                    <thead className="bg-neutral-100">
                      <tr>
                        <th className="p-3 font-semibold">Kategorie</th>
                        <th className="p-3 font-semibold">Betrag</th>
                        <th className="p-3 font-semibold">Hinweis</th>
                      </tr>
                    </thead>
                    <tbody>
                      {importPreview.slice(0, 10).map((row, i) => (
                        <tr key={row.id} className="border-t border-neutral-200">
                          <td className="p-3">{row.label || "—"}</td>
                          <td className="p-3">{row.betrag || "—"}</td>
                          <td className="p-3">{row.hinweis || "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {importPreview.length > 10 && (
                    <p className="p-3 text-neutral-600">
                      … und {importPreview.length - 10} weitere Zeilen
                    </p>
                  )}
                </div>
                <div className="mt-6 flex flex-wrap gap-4">
                  <LargeButton
                    variant="primary"
                    size="xl"
                    onClick={handleConfirmImport}
                  >
                    ✓ Importieren
                  </LargeButton>
                  <LargeButton
                    variant="secondary"
                    size="xl"
                    onClick={handleCloseImport}
                  >
                    Abbrechen
                  </LargeButton>
                </div>
              </>
            )}

            <div className="mt-6">
              <button
                type="button"
                onClick={handleCloseImport}
                className="text-lg text-primary-600 hover:underline"
              >
                Schließen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
