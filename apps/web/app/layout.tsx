import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'vietnamese'], weight: ['400', '600', '700', '900'] })

export const metadata: Metadata = {
  title: 'Chuông kì bu',
  description: 'Tiếng gì vang thế nhỉ?',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
