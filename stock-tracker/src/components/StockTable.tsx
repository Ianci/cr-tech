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
import type { Stock } from '@/types/stock'

interface StockTableProps {
  data: Stock[]
}

function StockCard({ item }: { item: Stock }) {
  const qty = item.quantity
  let borderClass = 'border-dark-border'
  if (qty === 0) borderClass = 'border-accent-light/30'
  else if (qty <= 2) borderClass = 'border-accent-low-text/30'

  let bgClass = 'bg-dark-card'
  if (qty === 0) bgClass = 'bg-dark-out-of-stock'
  else if (qty <= 2) bgClass = 'bg-dark-low-stock'

  return (
    <div
      className={`${bgClass} ${borderClass} rounded-xl border p-4`}
      style={{ boxShadow: '0 0 16px rgba(124, 58, 237, 0.15)' }}
    >
      <p className="font-semibold text-base text-txt-primary">
        {item.model} — {item.storage}
      </p>

      <div className="mt-2 space-y-1">
        <p>
          <span className="text-xs uppercase text-txt-secondary tracking-wide">Color: </span>
          <span className={`text-sm ${qty === 0 ? 'text-accent-light' : qty <= 2 ? 'text-accent-low-text' : 'text-txt-primary'}`}>
            {item.color}
          </span>
        </p>
        <p>
          <span className="text-xs uppercase text-txt-secondary tracking-wide">Condición: </span>
          <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
            item.condition === 'Nuevo'
              ? 'bg-accent-purple/20 text-accent-light'
              : 'bg-accent-deep/30 text-accent-low-text'
          }`}>
            {item.condition}
          </span>
        </p>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <p>
          <span className="text-xs uppercase text-txt-secondary tracking-wide">Precio: </span>
          <span className={`text-sm font-medium ${qty === 0 ? 'text-accent-light' : qty <= 2 ? 'text-accent-low-text' : 'text-txt-primary'}`}>
            ${item.price.toLocaleString('es-AR', { minimumFractionDigits: 0 })}
          </span>
        </p>
        <p>
          <span className="text-xs uppercase text-txt-secondary tracking-wide">Stock: </span>
          {qty === 0 ? (
            <span className="text-sm font-semibold text-accent-light">Sin stock</span>
          ) : (
            <span className={`text-sm font-medium ${qty <= 2 ? 'text-accent-low-text' : 'text-txt-primary'}`}>
              {qty} uds
            </span>
          )}
        </p>
      </div>
    </div>
  )
}

export default function StockTable({ data }: StockTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])

  const columns = useMemo<ColumnDef<Stock>[]>(
    () => [
      {
        accessorKey: 'model',
        header: 'Modelo',
        cell: (info) => <span className="font-medium text-txt-primary">{info.getValue<string>()}</span>,
      },
      {
        accessorKey: 'storage',
        header: 'Almacenamiento',
      },
      {
        accessorKey: 'color',
        header: 'Color',
      },
      {
        accessorKey: 'condition',
        header: 'Condición',
        cell: (info) => {
          const val = info.getValue<string>()
          return (
            <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
              val === 'Nuevo'
                ? 'bg-accent-purple/20 text-accent-light'
                : 'bg-accent-deep/30 text-accent-low-text'
            }`}>
              {val}
            </span>
          )
        },
      },
      {
        accessorKey: 'price',
        header: 'Precio',
        cell: (info) => {
          const val = info.getValue<number>()
          return `$${val.toLocaleString('es-AR', { minimumFractionDigits: 0 })}`
        },
      },
      {
        accessorKey: 'quantity',
        header: 'Cantidad',
        cell: (info) => {
          const qty = info.getValue<number>()
          if (qty === 0) {
            return <span className="font-semibold text-accent-light">Sin stock</span>
          }
          return qty
        },
      },
    ],
    []
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
    <>
      {/* Mobile card layout */}
      <div className="md:hidden space-y-3">
        {data.length === 0 && (
          <p className="py-8 text-center text-txt-secondary">No hay productos en el inventario</p>
        )}
        {data.map((item) => (
          <StockCard key={item.id} item={item} />
        ))}
      </div>

      {/* Desktop table layout */}
      <div className="hidden md:block overflow-x-auto rounded-2xl border border-dark-border shadow-purple-glow bg-dark-card">
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
                    <td
                      key={cell.id}
                      className={`px-4 py-3 text-sm whitespace-nowrap ${
                        qty === 0 ? 'text-accent-light' : qty <= 2 ? 'text-accent-low-text' : 'text-txt-secondary'
                      }`}
                    >
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
    </>
  )
}
