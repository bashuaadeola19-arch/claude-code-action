import type { Metadata } from "next"
import "./globals.css"

const productionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : undefined

export const metadata: Metadata = {
  metadataBase: productionUrl ? new URL(productionUrl) : undefined,
  title: "Claude Code Action | Transcript workspace",
  description: "Review, search, and format Claude Code Action transcripts in one focused workspace.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Claude Code Action | Transcript workspace",
    description: "Review, search, and format Claude Code Action transcripts in one focused workspace.",
    type: "website",
    url: "/",
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>
}

