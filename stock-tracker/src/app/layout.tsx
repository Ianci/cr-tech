import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['700'],
})

export const metadata: Metadata = {
  title: 'iStock Global Importaciones',
  description: 'iPhones | Mayorista | Tecnología',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={spaceGrotesk.variable}>
      <body
        className={`${inter.className} min-h-screen bg-dark-main antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
