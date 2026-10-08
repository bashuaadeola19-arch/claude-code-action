import { put } from '@vercel/blob'
import { NextResponse } from 'next/server'

const allowedTypes = new Set(['image/jpeg', 'image/png', 'image/webp'])
const maxBytes = 5 * 1024 * 1024

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file')

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Choose an image to upload.' }, { status: 400 })
    }

    if (!allowedTypes.has(file.type)) {
      return NextResponse.json({ error: 'Use a JPG, PNG, or WebP image.' }, { status: 400 })
    }

    if (file.size > maxBytes) {
      return NextResponse.json({ error: 'Images must be 5MB or smaller.' }, { status: 400 })
    }

    const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg'
    const filename = `shoplink/products/${crypto.randomUUID()}.${extension}`
    const blob = await put(filename, file, {
      access: 'public',
      addRandomSuffix: false,
      contentType: file.type,
    })

    return NextResponse.json({ url: blob.url })
  } catch (error) {
    console.error('[v0] Product image upload failed:', error)
    return NextResponse.json({ error: 'Upload failed. Please try again.' }, { status: 500 })
  }
}
