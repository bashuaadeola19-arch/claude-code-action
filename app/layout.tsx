import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Claude Code Action | Transcript workspace",
  description: "Review, search, and format Claude Code Action transcripts in one focused workspace.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>
}

