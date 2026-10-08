'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { ExternalLink, ImagePlus, LayoutDashboard, Loader2, LogOut, Package, Settings, Store, UploadCloud } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/neon-auth'

const products = [
  { name: 'Linen co-ord set', price: '₦38,000', status: 'Available', image: '/shoplink-icon-luxury-cream.png' },
  { name: 'Classic tote bag', price: '₦22,000', status: 'Available', image: '/shoplink-icon-luxury-emerald.png' },
  { name: 'Silk scarf', price: '₦12,500', status: 'Unavailable', image: '/shoplink-icon-luxury-onyx.png' },
]

export default function DashboardPage() {
  const router = useRouter()
  const { data: session, isPending } = authClient.useSession()
  const [uploadedImage, setUploadedImage] = useState('')
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!isPending && !session) router.replace('/login')
  }, [isPending, router, session])

  if (isPending || !session) return <main className="grid min-h-screen place-items-center bg-[#f8f7f4] text-sm text-black/55">Loading your store...</main>

  async function handleSignOut() {
    await authClient.signOut()
    router.replace('/login')
    router.refresh()
  }

  async function handleUpload(file?: File) {
    if (!file) return
    setUploadError('')
    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    try {
      const response = await fetch('/api/upload', { method: 'POST', body: formData })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Upload failed.')
      setUploadedImage(result.url)
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : 'Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#f8f7f4] text-[#171717]">
      <header className="border-b border-black/5 bg-white"><div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 lg:px-8"><Link href="/" className="flex items-center gap-2 font-bold tracking-tight"><img src="/shoplink-icon-luxury-onyx.png" alt="" className="shoplink-brand-mark size-9 rounded-xl object-cover" />ShopLink</Link><div className="flex items-center gap-3"><Link href="/store/amaka-fashion" className="hidden items-center gap-2 text-sm font-medium sm:flex">View store <ExternalLink size={15} /></Link><button onClick={handleSignOut} className="inline-flex h-9 items-center gap-2 rounded-full bg-[#174b38] px-4 text-sm font-medium text-white hover:bg-[#0f382a]"><LogOut size={15} />Sign out</button></div></div></header>
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-8 lg:grid-cols-[220px_1fr] lg:px-8">
        <aside className="hidden lg:block"><p className="px-3 text-xs font-semibold uppercase tracking-[0.16em] text-black/40">Manage</p><nav className="mt-4 flex flex-col gap-1"><a className="flex items-center gap-3 rounded-xl bg-[#e5f2e9] px-3 py-3 text-sm font-semibold text-[#174b38]" href="#overview"><LayoutDashboard size={17} />Overview</a><a className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-black/60" href="#products"><Package size={17} />Products</a><a className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-black/60" href="#store"><Store size={17} />Store</a><a className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-black/60" href="#settings"><Settings size={17} />Settings</a></nav></aside>
        <section className="min-w-0"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-sm font-semibold text-[#2d8b63]">Good morning, {session.user.name || session.user.email}</p><h1 className="mt-1 text-4xl font-semibold tracking-tight">Your ShopLink dashboard</h1><p className="mt-2 text-black/50">Manage your products and keep your storefront fresh.</p></div><Link href="/store/amaka-fashion" className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#174b38] px-5 text-sm font-semibold text-white hover:bg-[#0f382a]">Open storefront <ExternalLink size={16} /></Link></div>
          <div id="overview" className="mt-8 grid gap-4 sm:grid-cols-3"><Stat label="Store status" value="Published" detail="Your store is live" /><Stat label="Products" value="3" detail="Keep adding to grow your range" /><Stat label="WhatsApp clicks" value="128" detail="+18% this month" /></div>
          <section id="products" className="mt-8 rounded-3xl border border-black/8 bg-white p-5 sm:p-7"><div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center"><div><h2 className="text-xl font-semibold">Products</h2><p className="mt-1 text-sm text-black/50">Add product photos so customers can see what you sell.</p></div><button onClick={() => fileInputRef.current?.click()} className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#174b38] px-4 text-sm font-semibold text-white hover:bg-[#0f382a]"><ImagePlus size={16} />Upload product photo</button></div><input ref={fileInputRef} className="sr-only" type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => handleUpload(event.target.files?.[0])} />
            <div className="mt-5 grid gap-3 rounded-2xl border border-dashed border-[#2d8b63]/35 bg-[#f4faf5] p-4 sm:grid-cols-[auto_1fr_auto] sm:items-center"><div className="grid size-16 place-items-center overflow-hidden rounded-xl bg-white">{uploadedImage ? <img src={uploadedImage} alt="Uploaded product" className="size-full object-cover" /> : uploading ? <Loader2 className="animate-spin text-[#174b38]" /> : <UploadCloud className="text-[#2d8b63]" />}</div><div><p className="text-sm font-semibold">{uploading ? 'Uploading your image...' : uploadedImage ? 'Photo uploaded successfully' : 'Upload a product image'}</p><p className="mt-1 text-xs text-black/50">JPG, PNG or WebP · max 5MB</p>{uploadError && <p className="mt-1 text-xs font-medium text-red-600">{uploadError}</p>}</div><button onClick={() => fileInputRef.current?.click()} disabled={uploading} className="h-9 rounded-full border border-black/10 bg-white px-4 text-sm font-medium hover:bg-black/[.03] disabled:opacity-50">Choose image</button></div>
            <div className="mt-6 grid gap-3">{products.map((product) => <div key={product.name} className="flex items-center gap-3 rounded-2xl border border-black/6 p-3"><img src={product.image} alt="" className="size-14 rounded-xl object-cover" /><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{product.name}</p><p className="mt-1 text-sm text-black/50">{product.price}</p></div><span className="rounded-full bg-[#e5f2e9] px-3 py-1 text-xs font-semibold text-[#174b38]">{product.status}</span></div>)}</div>
          </section>
        </section>
      </div>
    </main>
  )
}

function Stat({ label, value, detail }: { label: string; value: string; detail: string }) { return <div className="rounded-3xl border border-black/8 bg-white p-5"><p className="text-sm text-black/50">{label}</p><p className="mt-2 text-2xl font-semibold">{value}</p><p className="mt-1 text-xs text-[#2d8b63]">{detail}</p></div> }
