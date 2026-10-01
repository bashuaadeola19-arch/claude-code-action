import { generateText, gateway } from 'ai'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const product = typeof body.product === 'string' ? body.product.trim() : ''
    const price = typeof body.price === 'string' ? body.price.trim() : ''
    if (!product) return NextResponse.json({ error: 'Product name is required.' }, { status: 400 })
    if (!process.env.AI_GATEWAY_API_KEY && process.env.NODE_ENV !== 'development') return NextResponse.json({ description: `A stylish ${product.toLowerCase()} made for everyday confidence and easy wear.` })
    const result = await generateText({
      model: gateway('openai/gpt-4o-mini'),
      system: 'You write concise ecommerce copy for small Nigerian businesses. Use clear, warm language. Return only one sentence, no quotes.',
      prompt: `Write a short product description for ${product}${price ? ` priced at ${price}` : ''}.`,
    })
    return NextResponse.json({ description: result.text.trim() })
  } catch {
    return NextResponse.json({ description: 'A stylish, versatile piece made for everyday confidence.' })
  }
}
