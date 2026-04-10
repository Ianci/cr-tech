'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AdminStockTable from '@/components/AdminStockTable'
import AddRowModal from '@/components/AddRowModal'
import LastUpdated from '@/components/LastUpdated'
import { useStock } from '@/hooks/useStock'

export default function AdminPage() {
  const { data, loading, lastUpdated, refetch } = useStock()
  const [showAdd, setShowAdd] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-dark-main pb-16">
      <Header showLogout onLogout={handleLogout} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-4">
          <LastUpdated timestamp={lastUpdated} />
          <button
            onClick={() => setShowAdd(true)}
            className="px-4 py-2 text-sm font-medium text-white bg-btn-gradient rounded-lg hover:opacity-90 transition-opacity"
          >
            + Agregar modelo
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin h-8 w-8 border-4 border-dark-border border-t-accent-purple rounded-full" />
          </div>
        ) : (
          <AdminStockTable data={data} onMutate={refetch} />
        )}

        <AddRowModal open={showAdd} onClose={() => setShowAdd(false)} onAdded={refetch} />
      </main>
      <Footer />
    </div>
  )
}
