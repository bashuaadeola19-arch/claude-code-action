'use client'

import Link from 'next/link'
import { ArrowRight, Store } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#f8f7f4] px-5 py-8 text-[#171717]">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold tracking-tight"><span className="grid size-8 place-items-center rounded-xl bg-[#174b38] text-white"><Store size={17} /></span>ShopLink</Link>
        <Link href="/" className="text-sm text-black/55">Back home</Link>
      </div>
      <section className="mx-auto grid max-w-4xl gap-10 py-16 lg:grid-cols-[0.9fr_1fr] lg:items-center lg:py-24">
        <div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2d8b63]">Welcome back</p><h1 className="mt-3 text-5xl font-semibold tracking-[-0.05em]">Your store, one tap away.</h1><p className="mt-5 max-w-md leading-7 text-black/55">Sign in to manage your products, copy your store link, and see how customers are finding you.</p></div>
        <div className="rounded-3xl border border-black/8 bg-white p-6 shadow-sm sm:p-8"><div className="flex flex-col gap-5"><label className="flex flex-col gap-2 text-sm font-medium">Email address<input type="email" placeholder="you@business.com" className="h-12 rounded-xl border border-black/10 px-4 outline-none focus:border-[#2d8b63]" /></label><label className="flex flex-col gap-2 text-sm font-medium">Password<input type="password" placeholder="Enter your password" className="h-12 rounded-xl border border-black/10 px-4 outline-none focus:border-[#2d8b63]" /></label><Link href="/dashboard" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#174b38] font-medium text-white hover:bg-[#0f382a]">Sign in <ArrowRight data-icon="inline-end" /></Link><p className="text-center text-sm text-black/45">New to ShopLink? <Link href="/?create=1" className="font-semibold text-[#174b38]">Create your store</Link></p></div></div>
      </section>
    </main>
  )
}
