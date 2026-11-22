import Link from 'next/link'
import type { ReactNode } from 'react'

import SiteNav from '@/components/SiteNav'

export const LEGAL_ENTITY = 'Data Savvy, Inc.'
export const CONTACT_EMAIL = 'support@doerfy.com'

/** Shared shell for /privacy and /terms. Stripe's customer portal links here. */
export default function LegalPage({
  title,
  updated,
  children,
}: {
  title: string
  updated: string
  children: ReactNode
}) {
  return (
    <>
      <SiteNav />
      <main className="bg-parchment pt-16 min-h-screen">
        <article className="max-w-3xl mx-auto px-6 sm:px-10 pt-16 pb-24 text-ink">
          <h1 className="font-display text-4xl font-semibold mb-2">{title}</h1>
          <p className="text-sm text-ink-faint mb-12">Last updated: {updated}</p>
          <div className="space-y-10 text-[15px] leading-relaxed text-ink-muted [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-ink [&_h2]:mb-3 [&_h3]:font-semibold [&_h3]:text-ink [&_h3]:mt-5 [&_h3]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_ul]:mt-2 [&_p+p]:mt-3 [&_a]:text-purple-deep [&_a]:underline">
            {children}
          </div>
          <p className="mt-16 text-sm text-ink-faint">
            <Link href="/privacy">Privacy Policy</Link> · <Link href="/terms">Terms of Service</Link> ·{' '}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </p>
        </article>
      </main>
    </>
  )
}
