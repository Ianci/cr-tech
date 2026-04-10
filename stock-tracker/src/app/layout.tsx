import type { Metadata } from 'next'
import './globals.css'

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
    <html lang="es">
      <body className="min-h-screen bg-dark-main antialiased">{children}</body>
    </html>
  )
}
