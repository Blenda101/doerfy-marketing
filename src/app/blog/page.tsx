import type { Metadata } from 'next'
import Link from 'next/link'
import SiteNav from '@/components/SiteNav'
import { getBlogPosts } from '@/lib/poily'

export const metadata: Metadata = {
  title: 'Blog — Doerfy',
  description:
    'Field notes on life design, deliberate practice, and building a system that compounds — from the team behind Doerfy.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Blog — Doerfy',
    description: 'Field notes on life design and deliberate practice.',
    type: 'website',
    url: 'https://doerfy.com/blog',
    siteName: 'Doerfy',
  },
}

export const revalidate = 60

function fmtDate(iso?: string | null) {
  if (!iso) return null
  const d = new Date(iso)
  return isNaN(d.getTime())
    ? null
    : d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default async function BlogIndexPage() {
  const posts = await getBlogPosts()

  return (
    <>
      <SiteNav />
      <main className="bg-parchment pt-16">
        <section className="max-w-3xl mx-auto px-10 pt-20 pb-12">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-purple mb-6">
            The Doerfy Blog
          </span>
          <h1 className="font-display text-[clamp(34px,4.6vw,56px)] font-bold leading-[1.08] tracking-tight text-ink">
            Design your life, in the open.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">
            Field notes on life design, deliberate practice, and building a system that compounds.
          </p>
        </section>

        <section className="border-t border-bone bg-linen">
          <div className="max-w-6xl mx-auto px-10 py-16 lg:py-20">
            {posts.length === 0 ? (
              <p className="text-base text-ink-faint">No posts yet — check back soon.</p>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((p) => (
                  <Link
                    key={p.id}
                    href={`/blog/${p.slug}`}
                    className="group flex flex-col rounded-xl border border-bone bg-parchment p-6 transition-shadow hover:shadow-md"
                  >
                    {p.coverImageUrl && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={p.coverImageUrl}
                        alt=""
                        className="mb-4 aspect-video w-full rounded-lg object-cover"
                      />
                    )}
                    <h2 className="font-display text-xl font-semibold leading-snug text-ink transition-colors group-hover:text-purple">
                      {p.title}
                    </h2>
                    {p.excerpt && (
                      <p className="mt-2 text-[15px] leading-relaxed text-ink-muted line-clamp-3">
                        {p.excerpt}
                      </p>
                    )}
                    <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-ink-faint">
                      {fmtDate(p.publishedAt) && <time>{fmtDate(p.publishedAt)}</time>}
                      {p.readingTimeMin ? <span>· {p.readingTimeMin} min read</span> : null}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="bg-manifesto-deep border-t border-white/6 py-8">
        <div className="max-w-6xl mx-auto px-10 flex items-center justify-between flex-wrap gap-4">
          <span className="font-display text-base font-semibold text-white/60">Doerfy</span>
          <nav className="flex gap-8">
            {['/', '/method', '/second-brain', '/manifesto', '/meet-doey', '/blog'].map((href, i) => (
              <Link key={href} href={href} className="text-xs text-white/30 hover:text-white/55 transition-colors">
                {['Home', 'The Method', 'Second Brain', 'Manifesto', 'Meet Doey', 'Blog'][i]}
              </Link>
            ))}
          </nav>
          <span className="text-xs text-white/18">&copy; 2026 Doerfy</span>
        </div>
      </footer>
    </>
  )
}
