'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, LoaderCircle, Store } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { authClient, authErrorMessage } from '@/lib/neon-auth'

export default function LoginPage() {
  const router = useRouter()
  const [mode, setMode] = useState<'sign-in' | 'sign-up'>('sign-in')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isPending, setIsPending] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setIsPending(true)
    try {
      const result = mode === 'sign-up'
        ? await authClient.signUp.email({ email, password, name })
        : await authClient.signIn.email({ email, password })
      if (result.error) throw new Error(result.error.message || 'Authentication failed')
      router.push('/dashboard')
      router.refresh()
    } catch (authError) {
      setError(authErrorMessage(authError))
    } finally {
      setIsPending(false)
    }
  }

  const isSignUp = mode === 'sign-up'

  return <main className="min-h-screen bg-[#f8f7f4] px-5 py-8 text-[#171717]"><div className="mx-auto flex max-w-5xl items-center justify-between"><Link href="/" className="flex items-center gap-2 font-bold tracking-tight"><img src="/shoplink-icon-luxury-emerald.png" alt="" className="shoplink-brand-mark size-9 rounded-xl object-cover" />ShopLink</Link><Link href="/" className="text-sm text-black/55">Back home</Link></div><section className="mx-auto grid max-w-4xl gap-10 py-16 lg:grid-cols-[0.9fr_1fr] lg:items-center lg:py-24"><div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2d8b63]">{isSignUp ? 'Start selling' : 'Welcome back'}</p><h1 className="mt-3 text-5xl font-semibold tracking-[-0.05em]">{isSignUp ? 'Create your ShopLink account.' : 'Your store, one tap away.'}</h1><p className="mt-5 max-w-md leading-7 text-black/55">{isSignUp ? 'Save your storefront, manage products, and share one simple link with customers.' : 'Sign in to manage your products, copy your store link, and see how customers are finding you.'}</p></div><form onSubmit={handleSubmit} className="rounded-3xl border border-black/8 bg-white p-6 shadow-sm sm:p-8"><div className="flex flex-col gap-5">{isSignUp && <label className="flex flex-col gap-2 text-sm font-medium">Your name<input required value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" className="h-12 rounded-xl border border-black/10 px-4 outline-none focus:border-[#2d8b63]" placeholder="Amaka" /></label>}<label className="flex flex-col gap-2 text-sm font-medium">Email address<input required value={email} onChange={(event) => setEmail(event.target.value)} type="email" autoComplete="email" placeholder="you@business.com" className="h-12 rounded-xl border border-black/10 px-4 outline-none focus:border-[#2d8b63]" /></label><label className="flex flex-col gap-2 text-sm font-medium">Password<input required minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} type="password" autoComplete={isSignUp ? 'new-password' : 'current-password'} placeholder={isSignUp ? 'At least 8 characters' : 'Enter your password'} className="h-12 rounded-xl border border-black/10 px-4 outline-none focus:border-[#2d8b63]" /></label>{error && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}<button disabled={isPending} className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#174b38] font-medium text-white hover:bg-[#0f382a] disabled:cursor-not-allowed disabled:opacity-60">{isPending && <LoaderCircle className="animate-spin" size={17} />}{isSignUp ? 'Create account' : 'Sign in'} {!isPending && <ArrowRight size={17} />}</button><p className="text-center text-sm text-black/45">{isSignUp ? 'Already have an account?' : 'New to ShopLink?'} <button type="button" onClick={() => { setMode(isSignUp ? 'sign-in' : 'sign-up'); setError('') }} className="font-semibold text-[#174b38]">{isSignUp ? 'Sign in' : 'Create your account'}</button></p></div></form></section></main>
}
