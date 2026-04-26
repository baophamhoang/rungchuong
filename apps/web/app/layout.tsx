import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'vietnamese'], weight: ['400', '600', '700', '900'] })

const title = 'Chuông Kì Bu | Arsenal Arteta Khóc'
const description = 'Tiếng gì vang thế nhỉ?'
const url = 'https://rungchuong.phambao.dev/'

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'rung chuong', 'rung chuông', 'arsenal', 'arteta', 'arteta khóc',
    'troll arsenal', 'fan arsenal', 'chuong ki bu', 'pham bao dev',
    'phambaodev', 'bell', 'arsenal bell',
  ],
  authors: [{ name: 'Pham Bao Dev' }],
  creator: 'Pham Bao Dev',
  metadataBase: new URL(url),
  openGraph: {
    title,
    description,
    url,
    siteName: 'Chuông Kì Bu',
    locale: 'vi_VN',
    type: 'website',
    images: [{ url: '/arsenal-logo.png', width: 512, height: 512, alt: 'Arsenal Logo' }],
  },
  twitter: {
    card: 'summary',
    title,
    description,
    images: ['/arsenal-logo.png'],
    creator: '@phambaodev',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
