/**
 * Poily content-source client. doerfy.com owns the /blog presentation; Poily is
 * the content backend. Server-side only (App Router server components). Public
 * GraphQL — no auth. ISR: revalidate 60s so published edits appear within a minute.
 */
const POILY_API =
  process.env.POILY_API_URL ||
  'https://ju1sxvytc1.execute-api.us-east-1.amazonaws.com/dev/graphql'
const TENANT = process.env.POILY_TENANT || 'doerfy'

export interface BlogPostListItem {
  id: string
  slug: string
  title: string
  excerpt?: string | null
  coverImageUrl?: string | null
  publishedAt?: string | null
  readingTimeMin?: number | null
  authorName?: string | null
  tags?: string[] | null
}

export interface BlogPost extends BlogPostListItem {
  bodyHtml?: string | null
  metaTitle?: string | null
  metaDescription?: string | null
  ogImage?: string | null
  canonicalUrl?: string | null
}

async function gql<T>(query: string, variables: Record<string, unknown>): Promise<T> {
  const res = await fetch(POILY_API, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  })
  if (!res.ok) throw new Error(`Poily API ${res.status}`)
  const json = (await res.json()) as { data?: T; errors?: Array<{ message: string }> }
  if (json.errors?.length) throw new Error(json.errors[0].message)
  return json.data as T
}

export async function getBlogPosts(): Promise<BlogPostListItem[]> {
  try {
    const data = await gql<{ getPublicPosts: BlogPostListItem[] }>(
      `query ($t: String!) {
        getPublicPosts(tenantId: $t) {
          id slug title excerpt coverImageUrl publishedAt readingTimeMin authorName tags
        }
      }`,
      { t: TENANT },
    )
    return data.getPublicPosts ?? []
  } catch (err) {
    console.error('[poily] getBlogPosts failed:', err)
    return []
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const data = await gql<{ getPublicPost: BlogPost | null }>(
    `query ($t: String!, $s: String!) {
      getPublicPost(tenantId: $t, slug: $s) {
        id slug title excerpt bodyHtml coverImageUrl publishedAt readingTimeMin
        authorName tags metaTitle metaDescription ogImage canonicalUrl
      }
    }`,
    { t: TENANT, s: slug },
  )
  return data.getPublicPost
}
