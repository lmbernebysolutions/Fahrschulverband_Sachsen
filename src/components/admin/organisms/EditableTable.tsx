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
      <table className="w-full border-2 border-neutral-300">
        <thead className="bg-neutral-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border-b-2 border-neutral-300 p-4 text-left text-xl font-semibold text-neutral-800"
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
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-4 text-lg text-neutral-800">
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
