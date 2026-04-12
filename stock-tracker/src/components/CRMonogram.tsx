'use client'

import Link from 'next/link'

export default function CRMonogram() {
  return (
    <Link href="/" className="no-underline">
      <span
        className="font-[var(--font-space-grotesk)] text-[1.4rem] font-extrabold select-none"
        style={{
          letterSpacing: '-0.03em',
          background: 'linear-gradient(135deg, #4C1D95, #7C3AED)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0 0 4px rgba(124, 58, 237, 0.5))',
        }}
      >
        iStock Global
      </span>
    </Link>
  )
}
