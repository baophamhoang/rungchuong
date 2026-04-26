import { NextResponse } from 'next/server'

let localCount = 0

async function getRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) return null
  const { Redis } = await import('@upstash/redis')
  return new Redis({ url, token })
}

const KEY = 'ring_count'

export async function GET() {
  const redis = await getRedis()
  if (!redis) return NextResponse.json({ count: localCount })
  const count = (await redis.get<number>(KEY)) ?? 0
  return NextResponse.json({ count })
}

export async function POST() {
  const redis = await getRedis()
  if (!redis) return NextResponse.json({ count: ++localCount })
  const count = await redis.incr(KEY)
  return NextResponse.json({ count })
}
