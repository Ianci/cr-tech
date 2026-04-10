'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface AddRowModalProps {
  open: boolean
  onClose: () => void
  onAdded: () => void
}

const CONDITIONS = ['Nuevo', 'Reacondicionado']

const inputClass = 'w-full px-3 py-2 bg-dark-main border border-dark-border rounded-lg text-sm text-txt-primary placeholder-txt-secondary/50 focus:ring-2 focus:ring-accent-purple focus:border-transparent outline-none'

export default function AddRowModal({ open, onClose, onAdded }: AddRowModalProps) {
  const [form, setForm] = useState({
    model: '',
    storage: '',
    color: '',
    condition: 'Nuevo',
    price: '',
    quantity: '',
  })
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  if (!open) return null

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.from('stock').insert({
      model: form.model,
      storage: form.storage,
      color: form.color,
      condition: form.condition,
      price: Number(form.price),
      quantity: Number(form.quantity),
    })

    setLoading(false)
    if (!error) {
      setForm({ model: '', storage: '', color: '', condition: 'Nuevo', price: '', quantity: '' })
      onAdded()
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-dark-card rounded-2xl shadow-purple-glow-lg border border-accent-purple/30 w-full max-w-md p-6">
        <h2 className="text-lg font-bold text-txt-primary mb-4">Agregar modelo</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            required
            placeholder="Modelo (ej: iPhone 15 Pro)"
            value={form.model}
            onChange={(e) => setForm({ ...form, model: e.target.value })}
            className={inputClass}
          />
          <input
            required
            placeholder="Almacenamiento (ej: 256GB)"
            value={form.storage}
            onChange={(e) => setForm({ ...form, storage: e.target.value })}
            className={inputClass}
          />
          <input
            required
            placeholder="Color (ej: Black Titanium)"
            value={form.color}
            onChange={(e) => setForm({ ...form, color: e.target.value })}
            className={inputClass}
          />
          <select
            value={form.condition}
            onChange={(e) => setForm({ ...form, condition: e.target.value })}
            className={inputClass}
          >
            {CONDITIONS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <div className="grid grid-cols-2 gap-3">
            <input
              required
              type="number"
              placeholder="Precio"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className={inputClass}
            />
            <input
              required
              type="number"
              placeholder="Cantidad"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
              className={inputClass}
            />
          </div>
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-txt-secondary bg-dark-main border border-dark-border rounded-lg hover:bg-dark-row transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-btn-gradient rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? 'Agregando...' : 'Agregar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
