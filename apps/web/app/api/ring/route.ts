import { Redis } from '@upstash/redis'
import { NextResponse } from 'next/server'

const redis = Redis.fromEnv()
const KEY = 'ring_count'

export async function GET() {
  try {
    const count = (await redis.get<number>(KEY)) ?? 0
    return NextResponse.json({ count })
  } catch (e) {
    return NextResponse.json({ count: 0, error: String(e) })
  }
}

export async function POST() {
  try {
    const count = await redis.incr(KEY)
    return NextResponse.json({ count })
  } catch (e) {
    return NextResponse.json({ count: 0, error: String(e) })
  }
}
