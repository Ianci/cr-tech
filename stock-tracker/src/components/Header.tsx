'use client'

import CRMonogram from '@/components/CRMonogram'

interface HeaderProps {
  showLogout?: boolean
  onLogout?: () => void
}

export default function Header({ showLogout, onLogout }: HeaderProps) {
  return (
    <header
      className="bg-dark-card border-y border-dark-border"
      style={{ boxShadow: '0 1px 12px rgba(124, 58, 237, 0.2)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CRMonogram />
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-accent-purple/15 text-txt-primary border border-dark-border">
            Stock en tiempo real
            <span className="h-2 w-2 rounded-full bg-accent-light animate-pulse-dot" />
          </span>
        </div>
        {showLogout && (
          <button
            onClick={onLogout}
            className="px-4 py-2 text-sm font-medium text-txt-primary border border-dark-border rounded-lg hover:text-accent-light hover:border-accent-purple/50 transition-colors"
          >
            Cerrar sesión
          </button>
        )}
      </div>
    </header>
  )
}
