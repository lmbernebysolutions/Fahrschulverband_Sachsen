"use client";

import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
  type Row,
} from "@tanstack/react-table";
import { Input } from "@/components/atoms";
import { Button } from "@/components/atoms";
import { cn } from "@/lib/utils";

export interface EditableTableColumn<T> {
  header: string;
  accessorKey: keyof T;
  /** Wenn true, Zelle als Textarea (mehrzeilig) */
  multiline?: boolean;
}

export interface EditableTableProps<T extends { id: string }> {
  data: T[];
  columns: EditableTableColumn<T>[];
  onEdit: (rowId: string, field: keyof T, value: unknown) => void;
  onAddRow: () => void;
  onDeleteRow: (rowId: string) => void;
  className?: string;
}

export function EditableTable<T extends { id: string }>({
  data,
  columns,
  onEdit,
  onAddRow,
  onDeleteRow,
  className,
}: EditableTableProps<T>) {
  const [editingCell, setEditingCell] = useState<{
    rowId: string;
    key: keyof T;
  } | null>(null);

  const tableColumns: ColumnDef<T>[] = [
    ...columns.map((col) => ({
      id: String(col.accessorKey),
      header: col.header,
      cell: ({ row, getValue }: { row: Row<T>; getValue: () => unknown }) => {
        const value = getValue() as string | null;
        const rowId = row.original.id;
        const isEditing =
          editingCell?.rowId === rowId && editingCell?.key === col.accessorKey;

        const handleBlur = (newVal: string) => {
          onEdit(rowId, col.accessorKey, col.multiline ? newVal : newVal);
          setEditingCell(null);
        };

        if (isEditing) {
          return col.multiline ? (
            <textarea
              className="min-h-[80px] w-full rounded border border-primary-500 px-3 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              defaultValue={value ?? ""}
              onBlur={(e) => handleBlur(e.target.value)}
              autoFocus
              rows={3}
            />
          ) : (
            <Input
              className="min-h-[48px] text-lg"
              defaultValue={value ?? ""}
              onBlur={(e) => handleBlur(e.target.value)}
              autoFocus
            />
          );
        }

        return (
          <button
            type="button"
            onClick={() => setEditingCell({ rowId, key: col.accessorKey })}
            className="w-full rounded border border-transparent px-3 py-2 text-left text-lg hover:border-neutral-300 hover:bg-neutral-50"
          >
            {value ?? "—"}
          </button>
        );
      },
      accessorKey: col.accessorKey as string,
    })),
    {
      id: "actions",
      header: "Aktionen",
      cell: ({ row }: { row: Row<T> }) => (
        <Button
          variant="danger"
          size="sm"
          onClick={() => onDeleteRow(row.original.id)}
        >
          Löschen
        </Button>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={cn("overflow-x-auto", className)}>
      <p className="mb-2 text-sm text-neutral-500 md:sr-only" role="status">
        Tabelle horizontal scrollbar – nach rechts wischen für weitere Spalten.
      </p>
      <table className="w-full min-w-[600px] border-2 border-neutral-300">
        <thead className="bg-neutral-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header, i) => (
                <th
                  key={header.id}
                  className={cn(
                    "border-b-2 border-neutral-300 p-3 text-left text-base font-semibold text-neutral-800 sm:p-4 sm:text-xl",
                    i === 0 && "sticky left-0 z-10 bg-neutral-100 shadow-[2px_0_4px_-2px_rgba(0,0,0,0.1)]"
                  )}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="border-b border-neutral-200 bg-white transition-colors hover:bg-neutral-50"
            >
              {row.getVisibleCells().map((cell, i) => (
                <td
                  key={cell.id}
                  className={cn(
                    "p-3 text-base text-neutral-800 sm:p-4 sm:text-lg",
                    i === 0 && "sticky left-0 z-10 bg-white shadow-[2px_0_4px_-2px_rgba(0,0,0,0.08)]"
                  )}
                >
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <Button variant="secondary" size="lg" onClick={onAddRow}>
          + Neue Zeile
        </Button>
      </div>
    </div>
  );
}
