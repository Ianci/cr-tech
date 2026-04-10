'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Stock } from '@/types/stock'

export function useStock() {
  const [data, setData] = useState<Stock[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  const fetchStock = useCallback(async () => {
    const { data, error } = await supabase
      .from('stock')
      .select('*')
      .order('model', { ascending: true })

    if (!error && data) {
      setData(data)
    }
    setLoading(false)
  }, [supabase])

  useEffect(() => {
    fetchStock()

    const channel = supabase
      .channel('stock-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'stock' },
        () => {
          fetchStock()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const lastUpdated = data.length > 0
    ? data.reduce((latest, row) =>
        new Date(row.updated_at) > new Date(latest.updated_at) ? row : latest
      ).updated_at
    : null

  return { data, loading, lastUpdated, refetch: fetchStock }
}
