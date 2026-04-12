import Footer from '@/components/Footer'
import Header from '@/components/Header'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: '@iStock Global Importaciones',
  description: 'iPhones | Mayorista | Tecnología',
}

const ICON_SIZE = 28

// iPhone — app accent color
// const IPhoneIcon = (
//   <svg
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="1.5"
//     width={ICON_SIZE}
//     height={ICON_SIZE}
//     style={{ color: '#A78BFA' }}
//   >
//     <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
//     <line
//       x1="12"
//       y1="18"
//       x2="12.01"
//       y2="18"
//       strokeWidth="2"
//       strokeLinecap="round"
//     />
//   </svg>
// )

// WhatsApp — brand green
const WhatsAppIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width={ICON_SIZE}
    height={ICON_SIZE}
    style={{ color: '#25D366' }}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.112 1.523 5.84L.057 23.882l6.22-1.432A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.371l-.36-.214-3.714.856.88-3.614-.235-.372A9.818 9.818 0 1 1 12 21.818z" />
  </svg>
)

// Instagram — brand gradient
const InstagramIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="url(#ig-gradient)"
    width={ICON_SIZE}
    height={ICON_SIZE}
  >
    <defs>
      <linearGradient id="ig-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f09433" />
        <stop offset="25%" stopColor="#e6683c" />
        <stop offset="50%" stopColor="#dc2743" />
        <stop offset="75%" stopColor="#cc2366" />
        <stop offset="100%" stopColor="#bc1888" />
      </linearGradient>
    </defs>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
)

// TikTok — app accent color
const TikTokIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width={ICON_SIZE}
    height={ICON_SIZE}
    style={{ color: '#A78BFA' }}
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
  </svg>
)

// Facebook — brand blue
// const FacebookIcon = (
//   <svg viewBox="0 0 24 24" fill="#1877F2" width={ICON_SIZE} height={ICON_SIZE}>
//     <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
//   </svg>
// )

type LinkItem = {
  icon: ReactNode
  label: string
  href: string
  internal?: boolean
}

const links: LinkItem[] = [
  // {
  //   icon: IPhoneIcon,
  //   label: 'Ver stock disponible',
  //   href: '/stock',
  //   internal: true,
  // },
  { icon: WhatsAppIcon, label: 'Grupo de Difusión - MAYORISTAS 🚀', href: '' },
  { icon: InstagramIcon, label: 'Seguinos en Instagram', href: '' },
  { icon: WhatsAppIcon, label: 'Chatea con nosotros', href: '' },
  { icon: TikTokIcon, label: 'Seguinos en TikTok', href: '' },
  // { icon: FacebookIcon, label: 'Seguinos en Facebook', href: '' },
]

function CardContent({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <>
      <span className="links-card-icon">{icon}</span>
      <span className="flex-1 text-center">{label}</span>
    </>
  )
}

export default function Home() {
  return (
    <div
      className="min-h-screen w-full pb-16"
      style={{ backgroundColor: '#08071A' }}
    >
      <Header />
      <main className="w-full flex justify-center">
        <div
          className="w-full max-w-[480px] mx-auto flex flex-col items-center px-6"
          style={{ paddingTop: '48px', paddingBottom: '80px' }}
        >
          {/* Avatar */}
          <Image
            src="/istock-global-navbar.png"
            alt="iStock Global Importaciones"
            width={80}
            height={80}
            priority
            className="rounded-full object-cover"
            style={{
              width: '80px',
              height: '80px',
              border: '2px solid #7C3AED',
              boxShadow: '0 0 16px rgba(124, 58, 237, 0.6)',
            }}
          />

          {/* Name */}
          <h1 className="mt-5 font-bold text-txt-primary text-xl">
            iStock Global
          </h1>

          {/* Description */}
          <p className="mt-1 text-txt-secondary text-sm text-center">
            Importadores directos de Miami | Mayoristas y distribuidores de
            tecnología.
          </p>

          {/* Social icons */}
          <div className="mt-5 flex items-center gap-5">
            {/* TikTok */}
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="social-icon text-txt-secondary hover:text-accent-light"
            >
              <svg
                viewBox="0 0 24 24"
                fill="#7C3AED"
                style={{ width: '22px', height: '22px' }}
              >
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="social-icon text-txt-secondary hover:text-accent-light"
            >
              <svg
                viewBox="0 0 24 24"
                fill="#7C3AED"
                style={{ width: '22px', height: '22px' }}
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="social-icon text-txt-secondary hover:text-accent-light"
            >
              <svg
                viewBox="0 0 24 24"
                fill="#7C3AED"
                style={{ width: '22px', height: '22px' }}
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
          </div>

          {/* Link cards */}
          <div className="mt-8 w-full flex flex-col gap-3">
            {links.map((item) =>
              item.internal ? (
                <Link key={item.label} href={item.href} className="links-card">
                  <CardContent icon={item.icon} label={item.label} />
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="links-card"
                >
                  <CardContent icon={item.icon} label={item.label} />
                </a>
              )
            )}
          </div>
        </div>
      </main>
      <Footer />

      <style>{`
        .social-icon {
          display: inline-flex;
          transition: transform 0.25s ease, color 0.25s ease, filter 0.25s ease;
          will-change: transform;
        }
        .social-icon:hover {
          transform: translateY(-3px) scale(1.08);
          filter: drop-shadow(0 4px 8px rgba(124, 58, 237, 0.45));
        }

        .links-card {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          background: #0F0D2B;
          border: 1px solid #2E2A5E;
          border-radius: 12px;
          padding: 14px 20px;
          color: #EDE9FE;
          font-weight: 500;
          transition: all 0.2s ease;
        }
        .links-card:hover {
          border-color: #7C3AED;
          box-shadow: 0 0 12px rgba(124, 58, 237, 0.3);
        }
        .links-card-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 100%;
          flex-shrink: 0;
          color: #A78BFA;
        }
      `}</style>
    </div>
  )
}
