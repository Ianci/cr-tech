'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import StockTable from '@/components/StockTable'
import LastUpdated from '@/components/LastUpdated'
import { useStock } from '@/hooks/useStock'

export default function StockPage() {
  const { data, loading, lastUpdated } = useStock()

  return (
    <div className="min-h-screen bg-dark-main flex flex-col">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-4">
          <LastUpdated timestamp={lastUpdated} />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin h-8 w-8 border-4 border-dark-border border-t-accent-purple rounded-full" />
          </div>
        ) : (
          <StockTable data={data} />
        )}
      </main>
      <Footer />
    </div>
  )
}
