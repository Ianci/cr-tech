'use client'

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Stock } from '@/types/stock'

interface AdminStockTableProps {
  data: Stock[]
  onMutate: () => void
}

function EditableCell({
  value: initialValue,
  rowId,
  columnId,
  onMutate,
}: {
  value: string | number
  rowId: string
  columnId: string
  onMutate: () => void
}) {
  const [value, setValue] = useState(initialValue)
  const [editing, setEditing] = useState(false)
  const supabase = createClient()

  async function handleBlur() {
    setEditing(false)
    if (value === initialValue) return

    let updateValue: string | number = value
    if (columnId === 'price' || columnId === 'quantity') {
      updateValue = Number(value)
      if (isNaN(updateValue)) {
        setValue(initialValue)
        return
      }
    }

    const { error } = await supabase
      .from('stock')
      .update({ [columnId]: updateValue, updated_at: new Date().toISOString() })
      .eq('id', rowId)

    if (error) {
      setValue(initialValue)
    } else {
      onMutate()
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      ;(e.target as HTMLInputElement).blur()
    }
    if (e.key === 'Escape') {
      setValue(initialValue)
      setEditing(false)
    }
  }

  if (!editing) {
    return (
      <div
        onClick={() => setEditing(true)}
        className="cursor-pointer px-1 py-0.5 rounded hover:bg-accent-purple/10 min-w-[40px] min-h-[24px] text-txt-secondary"
      >
        {columnId === 'price' ? `$${Number(value).toLocaleString('es-AR')}` : String(value)}
      </div>
    )
  }

  return (
    <input
      autoFocus
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className="w-full px-2 py-1 text-sm bg-dark-main border border-accent-purple rounded text-txt-primary focus:ring-2 focus:ring-accent-purple focus:border-transparent outline-none"
      type={columnId === 'price' || columnId === 'quantity' ? 'number' : 'text'}
    />
  )
}

export default function AdminStockTable({ data, onMutate }: AdminStockTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const supabase = createClient()

  async function handleDelete(id: string) {
    if (!confirm('¿Eliminar este producto?')) return
    const { error } = await supabase.from('stock').delete().eq('id', id)
    if (!error) onMutate()
  }

  const columns = useMemo<ColumnDef<Stock>[]>(
    () => [
      {
        accessorKey: 'model',
        header: 'Modelo',
        cell: ({ row }) => (
          <EditableCell value={row.original.model} rowId={row.original.id} columnId="model" onMutate={onMutate} />
        ),
      },
      {
        accessorKey: 'storage',
        header: 'Almacenamiento',
        cell: ({ row }) => (
          <EditableCell value={row.original.storage} rowId={row.original.id} columnId="storage" onMutate={onMutate} />
        ),
      },
      {
        accessorKey: 'color',
        header: 'Color',
        cell: ({ row }) => (
          <EditableCell value={row.original.color} rowId={row.original.id} columnId="color" onMutate={onMutate} />
        ),
      },
      {
        accessorKey: 'condition',
        header: 'Condición',
        cell: ({ row }) => (
          <EditableCell value={row.original.condition} rowId={row.original.id} columnId="condition" onMutate={onMutate} />
        ),
      },
      {
        accessorKey: 'price',
        header: 'Precio',
        cell: ({ row }) => (
          <EditableCell value={row.original.price} rowId={row.original.id} columnId="price" onMutate={onMutate} />
        ),
      },
      {
        accessorKey: 'quantity',
        header: 'Cantidad',
        cell: ({ row }) => (
          <EditableCell value={row.original.quantity} rowId={row.original.id} columnId="quantity" onMutate={onMutate} />
        ),
      },
      {
        id: 'actions',
        header: '',
        cell: ({ row }) => (
          <button
            onClick={() => handleDelete(row.original.id)}
            className="text-accent-light/70 hover:text-accent-light text-sm font-medium transition-colors"
          >
            Eliminar
          </button>
        ),
      },
    ],
    [onMutate] // eslint-disable-line react-hooks/exhaustive-deps
  )

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <div className="overflow-x-auto rounded-2xl border border-dark-border shadow-purple-glow bg-dark-card">
      <table className="min-w-full divide-y divide-dark-border">
        <thead className="bg-accent-gradient">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-[0.05em] cursor-pointer hover:text-white/80 select-none"
                >
                  <div className="flex items-center gap-1">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {{
                      asc: ' ↑',
                      desc: ' ↓',
                    }[header.column.getIsSorted() as string] ?? ''}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-dark-border">
          {table.getRowModel().rows.map((row, i) => {
            const qty = row.original.quantity
            let rowClass = i % 2 === 0 ? 'bg-dark-card' : 'bg-dark-row'
            if (qty === 0) rowClass = 'bg-dark-out-of-stock'
            else if (qty <= 2) rowClass = 'bg-dark-low-stock'

            return (
              <tr key={row.id} className={`${rowClass} hover:bg-accent-purple/10 transition-colors`}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-2 text-sm text-txt-secondary whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            )
          })}
          {table.getRowModel().rows.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center text-txt-secondary">
                No hay productos en el inventario
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
