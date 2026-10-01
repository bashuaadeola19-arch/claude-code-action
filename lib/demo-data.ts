export type Product = { name: string; price: string; description: string; category: string; image: string; available: boolean }

export const demoProducts: Product[] = [
  { name: 'The Amaka Two-Piece', price: '65000', description: 'A polished two-piece set cut for easy, confident days.', category: 'Sets', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=700&q=80', available: true },
  { name: 'Linen Co-ord Set', price: '48000', description: 'Soft, breathable linen for effortless weekend dressing.', category: 'Sets', image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=700&q=80', available: true },
  { name: 'Satin Slip Dress', price: '35000', description: 'A flattering satin silhouette for dinners and special moments.', category: 'Dresses', image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=700&q=80', available: true },
]

export function money(value: string) { return `₦${Number(value || 0).toLocaleString('en-NG')}` }
