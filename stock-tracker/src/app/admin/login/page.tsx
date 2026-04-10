'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Credenciales inválidas')
      setLoading(false)
      return
    }

    router.push('/admin')
    router.refresh()
  }

  const inputClass = 'w-full px-3 py-2 bg-dark-main border border-dark-border rounded-lg text-sm text-txt-primary placeholder-txt-secondary/50 focus:ring-2 focus:ring-accent-purple focus:border-transparent outline-none'

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-main px-4">
      <div className="w-full max-w-sm">
        <div className="bg-dark-card rounded-2xl shadow-purple-glow-lg border border-accent-purple/30 p-8">
          <h1 className="text-2xl font-bold text-txt-primary text-center mb-1">iPhone Store</h1>
          <p className="text-sm text-txt-secondary text-center mb-6">Panel de administración</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-txt-secondary mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                placeholder="admin@ejemplo.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-txt-secondary mb-1">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
              />
            </div>

            {error && (
              <p className="text-sm text-accent-light">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-btn-gradient text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? 'Ingresando...' : 'Ingresar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
