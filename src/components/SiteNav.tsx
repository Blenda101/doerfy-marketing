import Link from 'next/link'

export default function SiteNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-parchment/92 backdrop-blur-md border-b border-bone">
      <div className="max-w-6xl mx-auto px-10 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo.png" alt="Doerfy" className="w-8 h-8" />
          <span className="font-display text-xl font-bold text-ink tracking-tight">Doerfy</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link href="/method"       className="text-sm text-ink-muted hover:text-ink transition-colors">The Method</Link>
          <Link href="/second-brain" className="text-sm text-ink-muted hover:text-ink transition-colors">Second Brain</Link>
          <Link href="/manifesto"    className="text-sm text-ink-muted hover:text-ink transition-colors">Manifesto</Link>
          <Link href="/meet-doey"    className="text-sm text-ink-muted hover:text-ink transition-colors">Meet Doey</Link>
        </div>
        <Link href="/#beta" className="flex items-center gap-2 bg-manifesto text-white text-sm font-medium px-5 py-2.5 rounded hover:bg-manifesto-mid transition-colors">
          Join the Beta
        </Link>
      </div>
    </nav>
  )
}
