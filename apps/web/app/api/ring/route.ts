import { NextResponse } from 'next/server'

// In-memory fallback for local dev (resets on restart)
let localCount = 0

async function getKv() {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) return null
  const { kv } = await import('@vercel/kv')
  return kv
}

const KEY = 'ring_count'

export async function GET() {
  const kv = await getKv()
  if (!kv) return NextResponse.json({ count: localCount })
  const count = (await kv.get<number>(KEY)) ?? 0
  return NextResponse.json({ count })
}

export async function POST() {
  const kv = await getKv()
  if (!kv) return NextResponse.json({ count: ++localCount })
  const count = await kv.incr(KEY)
  return NextResponse.json({ count })
}
