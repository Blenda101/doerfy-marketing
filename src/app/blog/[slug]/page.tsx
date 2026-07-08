import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import SiteNav from '@/components/SiteNav'
import { getBlogPost } from '@/lib/poily'

export const revalidate = 60

function fmtDate(iso?: string | null) {
  if (!iso) return null
  const d = new Date(iso)
  return isNaN(d.getTime())
    ? null
    : d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = await getBlogPost(params.slug)
  if (!post) return { title: 'Not found — Doerfy' }
  const title = post.metaTitle || post.title
  const description = post.metaDescription || post.excerpt || undefined
  const url = `https://doerfy.com/blog/${post.slug}`
  return {
    title: `${title} — Doerfy`,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title,
      description,
      type: 'article',
      url,
      siteName: 'Doerfy',
      ...(post.ogImage ? { images: [post.ogImage] } : {}),
    },
    twitter: {
      card: post.ogImage ? 'summary_large_image' : 'summary',
      title,
      description,
    },
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)
  if (!post) notFound()

  const url = `https://doerfy.com/blog/${post.slug}`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    ...(post.metaDescription || post.excerpt
      ? { description: post.metaDescription || post.excerpt }
      : {}),
    ...(post.ogImage || post.coverImageUrl
      ? { image: [post.ogImage || post.coverImageUrl] }
      : {}),
    ...(post.authorName ? { author: { '@type': 'Person', name: post.authorName } } : {}),
    publisher: { '@type': 'Organization', name: 'Doerfy' },
    ...(post.publishedAt ? { datePublished: post.publishedAt } : {}),
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  }

  return (
    <>
      <SiteNav />
      <main className="bg-parchment pt-16">
        <article className="max-w-3xl mx-auto px-10 pt-16 pb-20 lg:pt-20">
          <Link href="/blog" className="text-sm font-semibold text-purple hover:underline">
            ← Blog
          </Link>
          <h1 className="mt-5 font-display text-[clamp(30px,4vw,48px)] font-bold leading-[1.08] tracking-tight text-ink">
            {post.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-faint">
            {post.authorName && <span>{post.authorName}</span>}
            {fmtDate(post.publishedAt) && (
              <>
                {post.authorName && <span aria-hidden>·</span>}
                <time>{fmtDate(post.publishedAt)}</time>
              </>
            )}
            {post.readingTimeMin ? <span>· {post.readingTimeMin} min read</span> : null}
          </div>

          {post.coverImageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.coverImageUrl}
              alt=""
              className="mt-8 aspect-video w-full rounded-xl object-cover"
            />
          )}

          <div
            className="blog-content mt-10"
            dangerouslySetInnerHTML={{ __html: post.bodyHtml || '' }}
          />
        </article>
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
    </>
  )
}
