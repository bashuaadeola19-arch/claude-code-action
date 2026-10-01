'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { BarChart3, ExternalLink, LayoutDashboard, LogOut, Package, Settings, Store, TrendingUp } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/neon-auth'

const products = [{ name: 'Linen co-ord set', price: '₦38,000', status: 'Available' }, { name: 'Classic tote bag', price: '₦22,000', status: 'Available' }, { name: 'Silk scarf', price: '₦12,500', status: 'Unavailable' }]

export default function DashboardPage() {
  const router = useRouter()
  const { data: session, isPending } = authClient.useSession()

  useEffect(() => {
    if (!isPending && !session) router.replace('/login')
  }, [isPending, router, session])

  if (isPending || !session) return <main className="grid min-h-screen place-items-center bg-[#f8f7f4] text-sm text-black/55">Loading your store...</main>

  async function handleSignOut() {
    await authClient.signOut()
    router.replace('/login')
    router.refresh()
  }

  return <main className="min-h-screen bg-[#f8f7f4] text-[#171717]"><header className="border-b border-black/5 bg-white"><div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 lg:px-8"><Link href="/" className="flex items-center gap-2 font-bold tracking-tight"><span className="grid size-8 place-items-center rounded-xl bg-[#174b38] text-white"><Store size={17} /></span>ShopLink</Link><div className="flex items-center gap-3"><Link href="/store/amaka-fashion" className="hidden items-center gap-2 text-sm font-medium sm:flex">View store <ExternalLink size={15} /></Link><button onClick={handleSignOut} className="inline-flex h-9 items-center gap-2 rounded-full bg-[#174b38] px-4 text-sm font-medium text-white hover:bg-[#0f382a]"><LogOut size={15} />Sign out</button></div></div></header><div className="mx-auto grid max-w-6xl gap-8 px-5 py-8 lg:grid-cols-[220px_1fr] lg:px-8"><aside className="hidden lg:block"><p className="px-3 text-xs font-semibold uppercase tracking-[0.16em] text-black/40">Manage</p><nav className="mt-4 flex flex-col gap-1"><a className="flex items-center gap-3 rounded-xl bg-[#e5f2e9] px-3 py-3 text-sm font-semibold text-[#174b38]" href="#overview"><LayoutDashboard size={17} />Overview</a><a className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-black/60" href="#products"><Package size={17} />Products</a><a className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-black/60" href="#store"><Store size={17} />Store</a><a className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-black/60" href="#settings"><Settings size={17} />Settings</a></nav></aside><section className="min-w-0"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-sm font-semibold text-[#2d8b63]">Good morning, {session.user.name || session.user.email}</p><h1 className="mt-1 text-4xl font-semibold tracking-tight">Your ShopLink dashboard</h1><p className="mt-2 text-black/50">Manage your storefront and keep your products up to date.</p></div><Link href="/store/amaka-fashion" className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#174b38] px-5 text-sm font-medium text-white">Open storefront <ExternalLink size={16} /></Link></div><div id="overview" className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><Stat label="Store status" value="Published" detail="Live and shareable" icon={<Store size={19} />} /><Stat label="Products" value="3" detail="2 available now" icon={<Package size={19} />} /><Stat label="Store views" value="128" detail="+18% this month" icon={<TrendingUp size={19} />} /><Stat label="WhatsApp clicks" value="24" detail="Customers ready to order" icon={<BarChart3 size={19} />} /></div><div id="products" className="mt-8 rounded-3xl border border-black/8 bg-white p-5 sm:p-7"><div className="flex items-center justify-between"><div><h2 className="text-xl font-semibold">Products</h2><p className="mt-1 text-sm text-black/50">Your current storefront catalogue.</p></div><Link href="/?create=1" className="rounded-full border border-black/10 px-4 py-2 text-sm font-semibold">Add product</Link></div><div className="mt-6 flex flex-col gap-3">{products.map((product) => <div key={product.name} className="flex items-center justify-between gap-4 rounded-2xl bg-[#f8f7f4] px-4 py-4"><div><p className="font-semibold">{product.name}</p><p className="mt-1 text-sm text-black/50">{product.price}</p></div><span className={`rounded-full px-3 py-1 text-xs font-semibold ${product.status === 'Available' ? 'bg-[#e5f2e9] text-[#174b38]' : 'bg-black/5 text-black/45'}`}>{product.status}</span></div>)}</div></div></section></div></main>
}

function Stat({ label, value, detail, icon }: { label: string; value: string; detail: string; icon: React.ReactNode }) { return <div className="rounded-3xl border border-black/8 bg-white p-5"><div className="flex items-center justify-between text-black/35">{icon}<BarChart3 size={17} /></div><p className="mt-7 text-sm text-black/50">{label}</p><p className="mt-1 text-2xl font-semibold">{value}</p><p className="mt-1 text-xs text-[#2d8b63]">{detail}</p></div> }
