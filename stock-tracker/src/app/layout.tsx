import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['700'],
})

export const metadata: Metadata = {
  title: 'iPhone Store — Stock en vivo',
  description: 'Inventario en tiempo real de iPhone Store',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={spaceGrotesk.variable}>
      <body className="min-h-screen bg-dark-main antialiased">{children}</body>
    </html>
  )
}
