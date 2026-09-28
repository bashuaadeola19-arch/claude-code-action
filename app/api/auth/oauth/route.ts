import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const url = new URL(request.url)
  const provider = url.searchParams.get("provider") || "github"
  const authBase = process.env.NEON_AUTH_BASE_URL || process.env.VITE_NEON_AUTH_URL
  if (authBase) {
    const destination = new URL("/oauth/authorize", authBase)
    destination.searchParams.set("provider", provider)
    destination.searchParams.set("redirect_uri", new URL("/", request.url).toString())
    return NextResponse.redirect(destination)
  }
  return NextResponse.redirect(new URL("/?auth=setup-required", request.url))
}
