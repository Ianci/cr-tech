'use client'

interface LastUpdatedProps {
  timestamp: string | null
}

export default function LastUpdated({ timestamp }: LastUpdatedProps) {
  if (!timestamp) return null

  const date = new Date(timestamp)
  const formatted = date.toLocaleString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })

  return (
    <p className="text-sm text-accent-purple flex items-center gap-2">
      <svg className="w-4 h-4 text-accent-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      Última actualización: <span className="font-medium text-txt-primary">{formatted}</span>
    </p>
  )
}
