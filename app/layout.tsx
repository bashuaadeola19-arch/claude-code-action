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
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
