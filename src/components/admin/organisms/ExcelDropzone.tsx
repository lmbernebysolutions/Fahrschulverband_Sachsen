"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ExcelDropzoneProps {
  onDrop: (file: File) => void;
  accept?: string;
  maxSize?: number;
  className?: string;
}

const DEFAULT_MAX_SIZE = 5 * 1024 * 1024; // 5 MB

export function ExcelDropzone({
  onDrop,
  accept = ".xlsx,.xls,.csv",
  maxSize = DEFAULT_MAX_SIZE,
  className,
}: ExcelDropzoneProps) {
  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) onDrop(file);
    },
    [onDrop]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "application/vnd.ms-excel": [".xls"],
      "text/csv": [".csv"],
    },
    maxSize,
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-xl border-4 border-dashed p-12 text-center transition-colors",
        isDragActive
          ? "border-primary-600 bg-primary-50"
          : "border-neutral-300 bg-neutral-50 hover:border-neutral-400 hover:bg-neutral-100",
        className
      )}
    >
      <input {...getInputProps()} aria-label="Excel-Datei auswählen" />
      <Upload
        className="mb-4 size-12 text-neutral-400"
        aria-hidden
      />
      <p className="text-xl font-semibold text-neutral-800">
        {isDragActive
          ? "Datei hier ablegen…"
          : "Excel-Datei hier ablegen oder klicken"}
      </p>
      <p className="mt-2 text-lg text-neutral-600">
        Unterstützte Formate: .xlsx, .xls, .csv (max. 5 MB)
      </p>
    </div>
  );
}
