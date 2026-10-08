import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ShopLink — Turn Your WhatsApp Business Into an Online Store',
  description: 'Create a professional online storefront and let customers order your products directly through WhatsApp.',
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/shoplink-icon-luxury-emerald.png', type: 'image/png' },
      { url: '/shoplink-icon-luxury-onyx.png', type: 'image/png', media: '(prefers-color-scheme: dark)' },
      { url: '/shoplink-icon-luxury-cream.png', type: 'image/png', media: '(prefers-color-scheme: light)' },
      { url: '/shoplink-icon.png', type: 'image/png' },
    ],
    apple: [
      { url: '/shoplink-icon-luxury-cream.png', type: 'image/png' },
      { url: '/shoplink-icon-luxury-emerald.png', type: 'image/png' },
    ],
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <footer className="border-t border-black/5 bg-[#f8f7f4] px-5 py-4 text-center text-[11px] text-black/45">
          <p>
            Icons by{' '}
            <a className="underline underline-offset-2 transition-colors hover:text-black/70" href="https://www.flaticon.com/authors/hidemaru" target="_blank" rel="noreferrer">
              HideMaru
            </a>
            ,{' '}
            <a className="underline underline-offset-2 transition-colors hover:text-black/70" href="https://www.flaticon.com/authors/flat-icons" target="_blank" rel="noreferrer">
              Flat Icons
            </a>
            ,{' '}
            <a className="underline underline-offset-2 transition-colors hover:text-black/70" href="https://www.flaticon.com/authors/magnific" target="_blank" rel="noreferrer">
              Magnific
            </a>
            {' '}and{' '}
            <a className="underline underline-offset-2 transition-colors hover:text-black/70" href="https://www.flaticon.com/authors/those-icons" target="_blank" rel="noreferrer">
              Those Icons
            </a>
            {' '}from{' '}
            <a className="underline underline-offset-2 transition-colors hover:text-black/70" href="https://www.flaticon.com/" target="_blank" rel="noreferrer">
              Flaticon
            </a>
          </p>
        </footer>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
