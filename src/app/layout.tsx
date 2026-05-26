import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Doerfy — Design. Visualize. Do.',
  description:
    'Doerfy is software built on a framework for life design. Get an AI coach, a system connecting your Vision to your daily work, and a practice that compounds over time.',
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
  },
  openGraph: {
    title: 'Doerfy — Design. Visualize. Do.',
    description: 'Author your life or inherit it. Doerfy is software for life design — AI coach, Outcome Space, and Action Funnel in one system.',
    type: 'website',
    url: 'https://doerfy.com',
    siteName: 'Doerfy',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Doerfy — Design. Visualize. Do.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Doerfy — Design. Visualize. Do.',
    description: 'Author your life or inherit it.',
    images: ['/images/og-image.jpg'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  )
}
