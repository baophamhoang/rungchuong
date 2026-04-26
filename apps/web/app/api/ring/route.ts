import { Redis } from '@upstash/redis'
import { NextResponse } from 'next/server'

const KEY = 'ring_count'

let redis: Redis | null = null

function getRedis() {
  if (redis) return redis
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) return null
  redis = new Redis({ url, token })
  return redis
}

export async function GET() {
  try {
    const r = getRedis()
    if (!r) return NextResponse.json({ count: 0 })
    const count = (await r.get<number>(KEY)) ?? 0
    return NextResponse.json({ count })
  } catch {
    return NextResponse.json({ count: 0 })
  }
}

export async function POST() {
  try {
    const r = getRedis()
    if (!r) return NextResponse.json({ count: 0 })
    const count = await r.incr(KEY)
    return NextResponse.json({ count })
  } catch {
    return NextResponse.json({ count: 0 })
  }
}
