'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

interface Meme {
  id: number
  offset: number
}

export default function Home() {
  const [count, setCount] = useState<number | null>(null)
  const [ringing, setRinging] = useState(false)
  const [memes, setMemes] = useState<Meme[]>([])
  const hasRung = () => localStorage.getItem('rang') === '1'
  const markRung = () => localStorage.setItem('rang', '1')

  useEffect(() => {
    fetch('/api/ring')
      .then(r => r.json())
      .then(d => setCount(d.count))
      .catch(() => {})
  }, [])

  const ring = useCallback(async () => {
    // Bell shake
    setRinging(false)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setRinging(true))
    })

    // Sound
    const audio = new Audio('/bell-soundtrack.mp3')
    audio.play().catch(() => {})

    // Haptics
    navigator.vibrate?.([80, 30, 80])

    // Spawn meme
    const id = Date.now() + Math.random()
    const offset = (Math.random() - 0.5) * 60
    setMemes(prev => [...prev, { id, offset }])
    setTimeout(() => setMemes(prev => prev.filter(m => m.id !== id)), 1300)

    // Only count the first ring per browser (persists across refreshes)
    if (!hasRung()) {
      markRung()
      try {
        const res = await fetch('/api/ring', { method: 'POST' })
        const data = await res.json()
        setCount(data.count)
      } catch {}
    }
  }, [])

  return (
    <>
      <div className="bg" />

      <div className="meme-stage">
        {memes.map(m => (
          <img
            key={m.id}
            src="/arteta-cry.png"
            alt="Arteta"
            className="meme-popup"
            style={{ marginLeft: m.offset }}
          />
        ))}
      </div>

      <div className="container">
        <h1 className="title">Chuông kì bu</h1>
        <p className="subtitle">Tiếng gì vang thế nhỉ?</p>

        <button
          className={`bell-btn${ringing ? ' ringing' : ''}`}
          onClick={ring}
          onAnimationEnd={() => setRinging(false)}
          aria-label="Rung chuông"
        >
          <div className="bell-wrap">
            <svg className="bell-svg" viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="bellGrad" cx="40%" cy="30%" r="60%">
                  <stop offset="0%" stopColor="#ffe066" />
                  <stop offset="100%" stopColor="#b8860b" />
                </radialGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <path
                d="M50 8 C28 8 14 26 14 50 L14 78 Q14 84 8 88 L92 88 Q86 84 86 78 L86 50 C86 26 72 8 50 8Z"
                fill="url(#bellGrad)"
                filter="url(#glow)"
              />
              <ellipse cx="50" cy="88" rx="42" ry="6" fill="#a07820" />
              <line x1="50" y1="88" x2="50" y2="102" stroke="#a07820" strokeWidth="4" strokeLinecap="round" />
              <circle cx="50" cy="104" r="6" fill="#a07820" />
              <rect x="45" y="2" width="10" height="10" rx="5" fill="#a07820" />
            </svg>

            <div className="arsenal-badge">
              <Image src="/arsenal-logo.png" alt="Arsenal" width={100} height={100} priority />
            </div>
          </div>
        </button>

        <p className="counter">
          {count === null ? ' ' : (
            <>Đã có <span>{count.toLocaleString('vi-VN')}</span> người rung chuông</>
          )}
        </p>

        <p className="tap-hint">Bấm để rung</p>
      </div>
    </>
  )
}
