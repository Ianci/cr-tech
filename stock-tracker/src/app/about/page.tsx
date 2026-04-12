'use client'

import CRMonogram from '@/components/CRMonogram'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { useEffect, useRef, useState } from 'react'

/* ── count-up hook ── */
function useCountUp(end: string, duration = 1600) {
  const [display, setDisplay] = useState('0')
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true

          // non-numeric → just reveal after a short delay
          const numeric = parseInt(end, 10)
          if (isNaN(numeric)) {
            setDisplay(end)
            return
          }

          const start = performance.now()
          const step = (now: number) => {
            const t = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - t, 3) // ease-out cubic
            setDisplay(String(Math.round(eased * numeric)))
            if (t < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
        }
      },
      { threshold: 0.4 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [end, duration])

  return { ref, display }
}

/* ── highlighted paragraph renderer ── */
function HighlightedText({ text }: { text: string }) {
  const parts = text.split(/(\[.*?\])/).filter(Boolean)
  return (
    <p className="text-txt-secondary text-base leading-relaxed">
      {parts.map((part, i) =>
        part.startsWith('[') && part.endsWith(']') ? (
          <mark key={i} className="about-highlight">
            {part.slice(1, -1)}
          </mark>
        ) : (
          part
        )
      )}
    </p>
  )
}

/* ── stat card ── */
function StatCard({
  icon,
  value,
  label,
}: {
  icon: string
  value: string
  label: string
}) {
  const { ref, display } = useCountUp(value)

  const numeric = /^\d+/.test(value)
  const suffix = numeric ? value.replace(/^\d+/, '') : ''

  return (
    <div ref={ref} className="about-stat-card group">
      <span className="text-2xl">{icon}</span>
      <span className="mt-2 text-xl font-bold text-txt-primary whitespace-nowrap">
        {display}
        {suffix}
      </span>
      <span className="mt-1 text-sm text-txt-secondary">{label}</span>
    </div>
  )
}

/* ── page ── */
const BODY_TEXT =
  'Somos [iStock Global], una empresa mayorista especializada exclusivamente en la comercialización de iPhones desde 2017. Con más de [8 años en el mercado], importamos directamente desde [Miami] garantizando disponibilidad, autenticidad y [los mejores precios] para revendedores y distribuidores. Nos enfocamos en un solo producto porque creemos que la especialización es la clave para ofrecer un servicio sin igual — stock siempre actualizado, atención personalizada y precios mayoristas reales.'

const STATS = [
  { icon: '🗓️', value: '2017', label: 'Año de fundación' },
  { icon: '✈️', value: '8+', label: 'Años en el mercado' },
  { icon: '📦', value: '100%', label: 'Stock verificado' },
  { icon: '🤝', value: 'Miami-Arg', label: 'Importación directa' },
]

export default function AboutPage() {
  return (
    <div
      className="min-h-screen w-full flex flex-col"
      style={{ backgroundColor: '#08071A' }}
    >
      <Header />

      <main
        className="flex-1 w-full max-w-[720px] mx-auto px-6"
        style={{ paddingTop: '64px', paddingBottom: '64px' }}
      >
        {/* ── 1. Hero ── */}
        <section className="about-fade-in text-center">
          <h1 className="text-3xl md:text-5xl leading-tight whitespace-nowrap">
            <span className="font-light text-txt-primary">
              Mayoristas de iPhone
            </span>
            <br />
            <span
              className="font-bold"
              style={{
                background: 'linear-gradient(135deg, #7C3AED, #A78BFA)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              directo desde Miami
            </span>
          </h1>
        </section>

        {/* ── 2. Divider ── */}
        <div
          className="my-10 h-px w-full"
          style={{
            background:
              'linear-gradient(90deg, transparent, #7C3AED, transparent)',
          }}
        />

        {/* ── 3. Body text ── */}
        <section
          className="about-fade-in"
          style={{ animationDelay: '0.2s', textAlign: 'center' }}
        >
          <HighlightedText text={BODY_TEXT} />
        </section>

        {/* ── 4. Stats cards ── */}
        <section className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </section>

        {/* ── 5. Monogram + tagline ── */}
        <section className="mt-16 flex flex-col items-center gap-3 text-center">
          <CRMonogram />
          <p
            className="text-sm text-txt-secondary"
            style={{ letterSpacing: '0.1em' }}
          >
            iStock Global — Especialistas en iPhone desde 2017
          </p>
        </section>
      </main>

      <Footer />

      {/* ── scoped styles ── */}
      <style>{`
        /* fade-in animation */
        @keyframes aboutFadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .about-fade-in {
          animation: aboutFadeIn 0.8s ease-out both;
        }

        /* highlighted keywords */
        .about-highlight {
          background: rgba(124, 58, 237, 0.15);
          color: #A78BFA;
          border-radius: 4px;
          padding: 0 6px;
          font-weight: 500;
        }

        /* stat cards */
        .about-stat-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          background: #0F0D2B;
          border: 1px solid #2E2A5E;
          border-radius: 16px;
          padding: 24px;
          transition: all 0.3s ease;
        }
        .about-stat-card:hover {
          border-color: #7C3AED;
          box-shadow: 0 0 20px rgba(124, 58, 237, 0.2);
        }
      `}</style>
    </div>
  )
}
