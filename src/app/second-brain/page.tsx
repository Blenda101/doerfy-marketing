import type { Metadata } from 'next'
import Link from 'next/link'
import SiteNav from '@/components/SiteNav'

export const metadata: Metadata = {
  title: 'Your Second Brain — Doerfy UPCS',
  description:
    'The Doerfy toolset combines a Second Brain with the Unified Productivity Content System (UPCS) — six tools across two hemispheres, one intelligent content layer keeping them in sync.',
  openGraph: {
    title: 'Your Second Brain — Doerfy UPCS',
    description: 'Execution and Knowledge — unified productivity content system.',
  },
}

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const pipeline = [
  {
    n: 1,
    step: 'Capture',
    desc: 'Auto-capture native content or import external sources with ease. Paste a link in a task, drop a file on a canvas, clip a page from the web — the system handles routing. No pre-categorization required.',
  },
  {
    n: 2,
    step: 'Curate',
    desc: 'Rich meta server-side extractions, deduplication, and link cleaning. Every URL is normalized, enriched with title, description, and OG image, and checked for duplicates via SHA-256 hash. Your library stays clean without manual effort.',
  },
  {
    n: 3,
    step: 'Discover',
    desc: 'Type /content or @ to get instant content access from anywhere. Content stored in one place is reachable from every other place — no switching context, no navigating to a library. It comes to you.',
  },
  {
    n: 4,
    step: 'Present',
    desc: 'Present in four adaptive inline modes: URL, Simple, Rich & Live. The same article appears as a clean link in a task, a rich card in your notes, and a live embed in a canvas — one resource, multiple presentations, zero duplication.',
  },
  {
    n: 5,
    step: 'Connect',
    desc: 'Track bi-directional relationships across entities with safe delete. From any content item you can see every place it appears across your brain. Safe delete shows the full impact before you remove anything.',
  },
  {
    n: 6,
    step: 'Consume',
    desc: 'Engage high-fidelity content views to gather and contribute insights. Immersive reader, annotation, text-to-speech with word-level highlight sync, and one-click task creation from reading insights — consumption creates knowledge.',
  },
]

const pillars = [
  {
    emoji: '💡',
    title: 'Innovative Link Store Architecture',
    subtitle: 'Single source of truth',
    desc: 'Central clearinghouse for all content operations — eliminating silos and creating a seamless, context-aware experience. Whether a link is saved from a task, a note, or the web clipper, it\'s stored once and available everywhere. Reference the same article in ten notes; it\'s one record.',
  },
  {
    emoji: '🥇',
    title: 'Content as a First-Class Citizen',
    subtitle: 'Rich identity for every item',
    desc: 'Every piece of content is treated as a valuable entity with its own identity, history, relationships, presentation preferences, and annotation layer. Content can be found, browsed, analyzed, and acted upon as a standalone entity — not just an appendage to a task or note.',
  },
  {
    emoji: '⏱',
    title: 'Just-in-Time Premium Presentation',
    subtitle: 'Right content, right context',
    desc: 'Fast search to access content anywhere with smart contextual presentations. A task about "Q3 strategy" surfaces the strategy documents linked in your Stories. A note about machine learning suggests the ML articles in your Library. Presentation adapts to context without duplication.',
  },
]

const hemispheres = [
  {
    side: 'Execution',
    color: '#2D9B8A',
    tagline: 'Plan it. Commit to it. Do it.',
    desc: 'Turns vision into committed action through structured planning and focused execution.',
    modules: [
      { name: 'Stories', desc: 'Your what & why — outcomes, vision, and life areas' },
      { name: 'Tasks', desc: 'Your how & when — committed work in the Action Funnel' },
    ],
  },
  {
    side: 'Knowledge',
    color: '#7C5CFF',
    tagline: 'Capture it. Connect it. Surface it.',
    desc: 'Captures, curates, and surfaces everything you need at the moment you need it.',
    modules: [
      { name: 'Notes', desc: 'Quick capture idea lab — thoughts, observations, drafts' },
      { name: 'Library', desc: 'Unified content store — links, files, and references' },
      { name: 'Canvas', desc: 'Visual thinking space — diagrams, maps, and spatial layouts' },
      { name: 'Post', desc: 'Publishing platform — long-form, audio, and EPUB output' },
    ],
  },
]

export default function SecondBrainPage() {
  return (
    <>
      <SiteNav />

      <main className="bg-parchment pt-16">

        {/* ── HERO ─────────────────────────────────────────────── */}
        <section className="max-w-4xl mx-auto px-10 pt-20 pb-16 text-center">
          <span className="inline-flex items-center gap-2 mb-6 text-xs font-semibold tracking-widest uppercase text-purple">
            <span className="w-1.5 h-1.5 rounded-full bg-purple animate-pulse-slow" />
            The Toolset
          </span>
          <h1 className="font-display text-[clamp(36px,5vw,64px)] font-medium leading-[1.08] tracking-tight text-ink mb-6">
            Your second limitless brain.<br />
            <em className="italic text-purple">Execution and Knowledge — unified.</em>
          </h1>
          <p className="text-lg text-ink-muted font-light leading-relaxed max-w-2xl mx-auto mb-4">
            Doerfy combines six tools across two hemispheres with the <strong className="font-medium text-ink">Unified Productivity Content System (UPCS)</strong> — an intelligent content layer that captures once, enriches automatically, and surfaces everywhere.
          </p>
          <p className="text-sm text-ink-faint max-w-xl mx-auto mb-10">
            No more switching between apps. No more duplicated links. No more losing context. One brain. Two hemispheres. Zero silos.
          </p>
          <Link
            href="/#beta"
            className="inline-flex items-center gap-2 bg-purple-deep hover:bg-purple text-white px-8 py-3.5 rounded text-sm font-medium transition-all hover:-translate-y-px"
          >
            Join the Beta <ArrowRight />
          </Link>
        </section>

        {/* ── TWO HEMISPHERES ──────────────────────────────────── */}
        <section className="bg-stone border-y border-bone py-16">
          <div className="max-w-5xl mx-auto px-10">
            <div className="text-center mb-12">
              <p className="text-xs font-semibold tracking-widest uppercase text-ink-faint mb-3">The Framework</p>
              <h2 className="font-display text-3xl font-medium text-ink">Two hemispheres. One unified brain.</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {hemispheres.map(h => (
                <div key={h.side} className="bg-parchment rounded-2xl border border-bone p-8">
                  <span
                    className="text-xs font-semibold tracking-widest uppercase mb-2 block"
                    style={{ color: h.color }}
                  >
                    {h.side}
                  </span>
                  <h3 className="font-display text-2xl font-medium text-ink mb-1">{h.tagline}</h3>
                  <p className="text-sm text-ink-muted font-light mb-6">{h.desc}</p>
                  <div className="space-y-3">
                    {h.modules.map(m => (
                      <div key={m.name} className="flex gap-3 items-start">
                        <span
                          className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                          style={{ background: h.color }}
                        />
                        <div>
                          <span className="text-sm font-semibold text-ink">{m.name}</span>
                          <span className="text-sm text-ink-faint"> — {m.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 rounded-2xl overflow-hidden border border-bone bg-stone">
              <img
                src="/images/second_brain.png"
                alt="Doerfy Second Brain — Execution and Knowledge hemispheres diagram"
                className="w-full h-auto"
              />
            </div>
            <p className="text-center text-sm text-ink-faint mt-6">
              The <strong className="font-medium text-ink-muted">UPCS</strong> is the connective tissue between both hemispheres — every link, file, note, and reference flows through it.
            </p>
          </div>
        </section>

        {/* ── UPCS PIPELINE ────────────────────────────────────── */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-10">
            <div className="text-center mb-14">
              <p className="text-xs font-semibold tracking-widest uppercase text-ink-faint mb-3">The Intelligence Layer</p>
              <h2 className="font-display text-3xl font-medium text-ink mb-3">
                The UPCS Pipeline
              </h2>
              <p className="text-sm text-ink-muted max-w-xl mx-auto">
                Every piece of content in Doerfy moves through a six-step lifecycle — from first encounter to active contribution to your knowledge base.
              </p>
            </div>

            {/* Pipeline infographic */}
            <div className="relative mb-16">
              {/* Connector line */}
              <div className="hidden md:block absolute top-8 left-[8%] right-[8%] h-px bg-bone z-0" />
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4 relative z-10">
                {pipeline.map(p => (
                  <div key={p.step} className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-2xl bg-purple text-white flex items-center justify-center text-xl font-bold font-display mb-3 shadow-md shadow-purple/20">
                      {p.n}
                    </div>
                    <p className="text-sm font-semibold text-ink mb-1">{p.step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pipeline detail cards */}
            <div className="grid md:grid-cols-2 gap-4">
              {pipeline.map(p => (
                <div key={p.step} className="flex gap-4 p-5 bg-white rounded-xl border border-bone">
                  <div className="w-8 h-8 rounded-lg bg-purple-ultra border border-purple-pale flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-purple">{p.n}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink mb-1">{p.step}</p>
                    <p className="text-sm text-ink-muted font-light leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── THREE PILLARS ─────────────────────────────────────── */}
        <section className="bg-stone border-y border-bone py-20">
          <div className="max-w-5xl mx-auto px-10">
            <div className="text-center mb-14">
              <p className="text-xs font-semibold tracking-widest uppercase text-ink-faint mb-3">The Architecture</p>
              <h2 className="font-display text-3xl font-medium text-ink">Three pillars of unification.</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {pillars.map(p => (
                <div key={p.title} className="bg-parchment rounded-2xl border border-bone p-7">
                  <span className="text-3xl mb-4 block">{p.emoji}</span>
                  <p className="text-xs font-semibold tracking-widest uppercase text-purple mb-1">{p.subtitle}</p>
                  <h3 className="font-display text-lg font-medium text-ink mb-3">{p.title}</h3>
                  <p className="text-sm text-ink-muted font-light leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FREE DOWNLOAD ─────────────────────────────────────── */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-10">
            <div className="bg-stone border border-bone rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <p className="text-xs font-semibold tracking-widest uppercase text-purple mb-2">Free Download</p>
                <h3 className="font-display text-2xl font-medium text-ink mb-2">The Doerfy Method Infographic</h3>
                <p className="text-sm text-ink-muted font-light leading-relaxed max-w-md">
                  A single-page visual overview of the complete Doerfy Method — all ten principles, the two hemispheres, and how the UPCS connects them. Print it, pin it, share it.
                </p>
              </div>
              <a
                href="/images/doerfy_method_infographic.svg"
                download="doerfy_method_infographic.svg"
                className="flex-shrink-0 inline-flex items-center gap-2 bg-purple-deep hover:bg-purple text-white px-7 py-3.5 rounded text-sm font-medium transition-all hover:-translate-y-px"
              >
                Download Free
              </a>
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section className="py-24 text-center">
          <div className="max-w-2xl mx-auto px-10">
            <p className="text-xs font-semibold tracking-widest uppercase text-ink-faint mb-4">Ready to build yours?</p>
            <h2 className="font-display text-4xl font-medium text-ink mb-4">
              Stop managing tools.<br /><em className="italic text-purple">Start building your brain.</em>
            </h2>
            <p className="text-base text-ink-muted font-light mb-10">
              Join the Doerfy beta and get early access to the full Second Brain toolset — Stories, Tasks, Notes, Library, Canvas, and Post — unified by the UPCS.
            </p>
            <Link
              href="/#beta"
              className="inline-flex items-center gap-2 bg-purple-deep hover:bg-purple text-white px-10 py-4 rounded text-sm font-medium transition-all hover:-translate-y-px shadow-lg shadow-purple/20"
            >
              Join the Beta <ArrowRight />
            </Link>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-manifesto-deep border-t border-white/6 py-8">
        <div className="max-w-6xl mx-auto px-10 flex items-center justify-between flex-wrap gap-4">
          <span className="font-display text-base font-semibold text-white/60">Doerfy</span>
          <nav className="flex gap-8">
            {['/', '/method', '/second-brain', '/manifesto', '/meet-doey'].map((href, i) => (
              <Link key={href} href={href} className="text-xs text-white/30 hover:text-white/55 transition-colors">
                {['Home', 'The Method', 'Second Brain', 'Manifesto', 'Meet Doey'][i]}
              </Link>
            ))}
          </nav>
          <span className="text-xs text-white/18">&copy; 2026 Doerfy</span>
        </div>
      </footer>
    </>
  )
}
