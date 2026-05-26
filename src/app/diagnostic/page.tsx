'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

/* ── Icons ──────────────────────────────────────────────────────── */
const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

// eslint-disable-next-line @next/next/no-img-element
const DoerfyMark = ({ className = 'w-7 h-7' }: { className?: string }) => (
  <img src="/images/logo.png" alt="Doerfy" className={className} />
)

/* ── Data ───────────────────────────────────────────────────────── */
const LAYERS = [
  { name: 'Theme',     key: 'theme',     desc: 'Life design and Vision' },
  { name: 'Outcome',   key: 'outcome',   desc: 'Goals and initiatives'  },
  { name: 'Action',    key: 'action',    desc: 'Execution and focus'    },
  { name: 'Improve',   key: 'improve',   desc: 'Review and reflection'  },
  { name: 'Knowledge', key: 'knowledge', desc: 'Capture and creation'   },
]

const QUESTIONS = [
  { id: 0, layer: 0, text: 'I can describe the life I\'m building over the next 5–10 years.' },
  { id: 1, layer: 0, text: 'I know what I\'m trying to accomplish in the next 12 months — specifically enough to recognize success.' },
  { id: 2, layer: 1, text: 'Most of what I\'m working on connects clearly to a larger goal I\'ve defined.' },
  { id: 3, layer: 1, text: 'For the next 90 days, I know the 3–5 major initiatives and what would make each one done.' },
  { id: 4, layer: 2, text: 'On a typical day, I\'m clear about what to work on next without re-deciding.' },
  { id: 5, layer: 2, text: 'I finish what I start more often than I abandon it.' },
  { id: 6, layer: 3, text: 'I have a regular practice (weekly or more) of reviewing what I\'ve done and what\'s coming.' },
  { id: 7, layer: 3, text: 'I notice patterns in my work — what I\'m avoiding, what energizes me, when I\'m most productive.' },
  { id: 8, layer: 4, text: 'When I have an idea or insight, I capture it somewhere I\'ll actually return to.' },
  { id: 9, layer: 4, text: 'My notes and references genuinely help me think and produce.' },
]

const SCALE_LABELS = ['Not at all', 'Rarely', 'Sometimes', 'Often', 'Consistently']

const DOER_TYPES: Record<string, {
  type: string
  tagline: string
  desc: string
  start: string
  startDetail: string
  color: string
}> = {
  theme: {
    type: 'Wandering Doer',
    tagline: 'Moving, but toward what?',
    desc: 'You have energy and work ethic. What\'s missing is a clear destination. Without a designed Vision, effort scatters across directions that don\'t compound into a life you intended.',
    start: 'Theme Builder — Act I: Vision',
    startDetail: 'One session with Doey working through what you\'re building in the next 5–10 years will change what your ordinary Tuesdays look like.',
    color: '#5B47D9',
  },
  outcome: {
    type: 'Drifting Doer',
    tagline: 'Vision without traction.',
    desc: 'You can see where you\'re going. What\'s missing is the structured pathway from Vision to the work of this week. Mega Dos are the identity-level outcomes that connect your horizon to your calendar.',
    start: 'Stories — first Mega Do',
    startDetail: 'Define one identity-level outcome and work with Doey to decompose it into Projects you can actually ship.',
    color: '#7C5CFF',
  },
  action: {
    type: 'Scattered Doer',
    tagline: 'Too much open, too little done.',
    desc: 'You plan and you capture. What\'s missing is commitment discipline. The Action Funnel\'s width caps — 30 tasks, 7 tasks, 1 task — are the constraint that creates the clarity you\'ve been looking for.',
    start: 'Tasks — Doing(7) triage',
    startDetail: 'Audit your queue and commit to exactly seven tasks for this week. Close everything else. That\'s the method.',
    color: '#7C5CFF',
  },
  improve: {
    type: 'Reactive Doer',
    tagline: 'Producing, but not learning.',
    desc: 'You ship. What\'s missing is the review practice that converts experience into compound improvement. Without a Weekly Review, patterns stay invisible — and the same mistakes repeat.',
    start: 'Improvement Space — Weekly Review',
    startDetail: 'Schedule 30 minutes this week. Doey will run the ritual with you: Done audit, Doing(7) reset, Theme glance.',
    color: '#2D9B8A',
  },
  knowledge: {
    type: 'Hollow Doer',
    tagline: 'Working system, empty mind.',
    desc: 'Your execution system works. What\'s missing is the knowledge layer — the captures and connections that make your thinking compound over time into something more than completed tasks.',
    start: 'Notes — one capture habit',
    startDetail: 'Every idea and insight gets out of your head the moment it appears. No filtering, no organizing. Just capture.',
    color: '#D97706',
  },
  whole: {
    type: 'Whole Doer',
    tagline: 'All five layers are strong.',
    desc: 'Every layer is functioning. You design, visualize, execute, review, and compound knowledge. The practice is yours. Doerfy refines what you\'ve already built.',
    start: 'Refinement mode',
    startDetail: 'Use Doey to identify the 10% constraint across your strongest layers. That\'s where the next compounding lives.',
    color: '#10B981',
  },
}

/* ── Scoring ────────────────────────────────────────────────────── */
function computeResult(answers: number[]): { typeKey: string; layerScores: number[] } {
  const layerScores = LAYERS.map((_, li) => {
    const qs = QUESTIONS.filter(q => q.layer === li)
    const sum = qs.reduce((acc, q) => acc + (answers[q.id] ?? 0), 0)
    return sum / qs.length
  })

  if (layerScores.every(s => s >= 4)) return { typeKey: 'whole', layerScores }

  // Weakest layer — tie-break: lower index (higher in methodology hierarchy) wins
  const minScore = Math.min(...layerScores)
  const weakestIdx = layerScores.indexOf(minScore)
  return { typeKey: LAYERS[weakestIdx].key, layerScores }
}

function scoreColor(score: number): string {
  if (score >= 4) return 'bg-green-500'
  if (score >= 3) return 'bg-purple'
  if (score >= 2) return 'bg-amber-500'
  return 'bg-red-500/80'
}

/* ── Quiz component ─────────────────────────────────────────────── */
function Quiz({ onComplete }: { onComplete: (answers: number[]) => void }) {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<number[]>(Array(10).fill(0))
  const [selected, setSelected] = useState<number | null>(null)
  const [animating, setAnimating] = useState(false)

  const q = QUESTIONS[current]
  const layerIdx = q.layer
  const isLast = current === QUESTIONS.length - 1

  function choose(val: number) {
    if (animating) return
    const next = [...answers]
    next[current] = val
    setAnswers(next)
    setSelected(val)
    setAnimating(true)

    setTimeout(() => {
      if (isLast) {
        onComplete(next)
      } else {
        setCurrent(c => c + 1)
        setSelected(null)
        setAnimating(false)
      }
    }, 320)
  }

  return (
    <div className="min-h-[calc(100svh-64px)] flex flex-col items-center justify-center px-6 py-16">
      {/* Layer progress strip */}
      <div className="flex items-center gap-2 mb-10">
        {LAYERS.map((l, i) => (
          <div key={l.key} className="flex items-center gap-2">
            <div className={`flex items-center gap-1.5 ${i === layerIdx ? 'opacity-100' : i < layerIdx ? 'opacity-40' : 'opacity-20'} transition-opacity duration-300`}>
              <span className={`w-2 h-2 rounded-full transition-all duration-300 ${i === layerIdx ? 'bg-purple scale-125' : i < layerIdx ? 'bg-purple-light' : 'bg-bone'}`} />
              <span className={`text-xs font-medium tracking-wide ${i === layerIdx ? 'text-purple' : 'text-ink-faint'} transition-colors duration-300`}>
                {l.name}
              </span>
            </div>
            {i < LAYERS.length - 1 && (
              <span className="w-6 h-px bg-bone mx-1" />
            )}
          </div>
        ))}
      </div>

      {/* Question card */}
      <div
        className="w-full max-w-xl text-center"
        style={{ opacity: animating ? 0 : 1, transform: animating ? 'translateY(-12px)' : 'translateY(0)', transition: 'opacity 0.25s ease, transform 0.25s ease' }}
      >
        <p className="text-xs font-semibold tracking-widest uppercase text-ink-faint mb-6">
          {current + 1} of {QUESTIONS.length}
        </p>

        <p className="font-display text-[clamp(20px,3vw,30px)] font-medium text-ink leading-[1.25] mb-12">
          &ldquo;{q.text}&rdquo;
        </p>

        {/* Scale buttons */}
        <div className="flex items-stretch gap-2 mb-3">
          {[1, 2, 3, 4, 5].map(val => (
            <button
              key={val}
              onClick={() => choose(val)}
              className={`flex-1 py-5 rounded-lg border text-base font-display font-medium transition-all duration-150 ${
                selected === val
                  ? 'bg-purple border-purple text-white scale-95'
                  : 'bg-parchment border-bone text-ink-faint hover:border-purple hover:text-purple hover:bg-purple-ultra'
              }`}
            >
              {val}
            </button>
          ))}
        </div>
        <div className="flex justify-between px-1">
          <span className="text-[10px] text-ink-faint">Not at all</span>
          <span className="text-[10px] text-ink-faint">Consistently</span>
        </div>
      </div>

      {/* Skip / back row */}
      <div className="flex items-center gap-8 mt-12">
        {current > 0 && (
          <button
            onClick={() => { setCurrent(c => c - 1); setSelected(answers[current - 1] || null) }}
            className="text-xs text-ink-faint hover:text-ink transition-colors"
          >
            ← Back
          </button>
        )}
      </div>
    </div>
  )
}

/* ── Results component ──────────────────────────────────────────── */
function Results({ answers }: { answers: number[] }) {
  const { typeKey, layerScores } = computeResult(answers)
  const doer = DOER_TYPES[typeKey]
  const [visible, setVisible] = useState(false)
  const [barsReady, setBarsReady] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 80)
    const t2 = setTimeout(() => setBarsReady(true), 500)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <div
      className="min-h-[calc(100svh-64px)] flex flex-col items-center justify-center px-6 py-16"
      style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}
    >
      <div className="w-full max-w-2xl">
        {/* Doer Type */}
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-widest uppercase text-purple mb-4">Your Doer Type</p>
          <h2
            className="font-display text-[clamp(40px,6vw,72px)] font-medium leading-[1.06] tracking-tight text-ink mb-3"
            style={{ color: doer.color }}
          >
            {doer.type}
          </h2>
          <p className="font-display text-xl italic text-ink-muted">{doer.tagline}</p>
        </div>

        {/* Description */}
        <p className="text-base leading-relaxed text-ink-muted font-light text-center max-w-lg mx-auto mb-12">
          {doer.desc}
        </p>

        {/* Layer scores */}
        <div className="bg-stone border border-bone rounded-2xl p-6 mb-6">
          <p className="text-xs font-semibold tracking-widest uppercase text-ink-faint mb-5">Five-layer breakdown</p>
          <div className="space-y-3">
            {LAYERS.map((l, i) => {
              const score = layerScores[i]
              const pct = `${(score / 5) * 100}%`
              const isWeakest = typeKey !== 'whole' && LAYERS[i].key === typeKey
              return (
                <div key={l.key}>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-medium ${isWeakest ? 'text-ink' : 'text-ink-muted'}`}>
                      {l.name}
                      {isWeakest && <span className="ml-2 text-[10px] font-semibold tracking-widest uppercase text-amber-600">Weakest layer</span>}
                    </span>
                    <span className="text-xs text-ink-faint">{score.toFixed(1)}<span className="text-bone">/5</span></span>
                  </div>
                  <div className="h-2 bg-bone rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${scoreColor(score)}`}
                      style={{ width: barsReady ? pct : '0%', transitionDelay: `${i * 100}ms` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Starting point */}
        <div className="bg-purple-ultra border border-purple-pale rounded-2xl p-6 mb-8">
          <p className="text-xs font-semibold tracking-widest uppercase text-purple mb-2">Where to begin</p>
          <p className="font-display text-lg font-medium text-ink mb-2">{doer.start}</p>
          <p className="text-sm text-ink-muted font-light leading-relaxed">{doer.startDetail}</p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href={`/#beta?doer_type=${typeKey}`}
            className="inline-flex items-center gap-2 bg-purple-deep hover:bg-purple text-white px-8 py-4 rounded text-sm font-medium transition-all hover:-translate-y-px mb-4"
          >
            Join the Beta — I&apos;m a {doer.type.split(' ')[0]} Doer <ArrowRight />
          </Link>
          <p className="text-xs text-ink-faint mt-3">Free during the beta period. No credit card.</p>
        </div>

        {/* Retake */}
        <div className="text-center mt-8 pt-8 border-t border-bone">
          <button
            onClick={() => window.location.reload()}
            className="text-xs text-ink-faint hover:text-ink transition-colors border-b border-bone pb-0.5"
          >
            Retake the Diagnostic
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── Intro ──────────────────────────────────────────────────────── */
function Intro({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-[calc(100svh-64px)] flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="max-w-xl">
        <p className="text-xs font-semibold tracking-widest uppercase text-purple mb-6">The Doer Diagnostic</p>
        <h1 className="font-display text-[clamp(36px,5vw,64px)] font-medium leading-[1.08] tracking-tight text-ink mb-5">
          Which Doer<br /><em className="italic text-purple">are you?</em>
        </h1>
        <p className="text-base leading-relaxed text-ink-muted font-light mb-4 max-w-md mx-auto">
          Ten questions across five layers of the Doerfy Method. Your weakest layer determines your starting point — and how Doey will meet you.
        </p>
        <p className="text-sm text-ink-faint mb-10">Takes about 2 minutes. No account needed.</p>

        <button
          onClick={onStart}
          className="inline-flex items-center gap-2 bg-purple-deep hover:bg-purple text-white px-8 py-4 rounded text-sm font-medium transition-all hover:-translate-y-px"
        >
          Begin the Diagnostic <ArrowRight />
        </button>

        <div className="mt-12 grid grid-cols-5 gap-3 max-w-sm mx-auto">
          {LAYERS.map(l => (
            <div key={l.key} className="text-center">
              <span className="block w-2 h-2 rounded-full bg-bone mx-auto mb-1.5" />
              <span className="text-[10px] text-ink-faint">{l.name}</span>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-ink-faint mt-2">Five layers evaluated</p>
      </div>
    </div>
  )
}

/* ── Page ───────────────────────────────────────────────────────── */
type Phase = 'intro' | 'quiz' | 'results'

export default function DiagnosticPage() {
  const [phase, setPhase] = useState<Phase>('intro')
  const [answers, setAnswers] = useState<number[]>([])

  function handleComplete(a: number[]) {
    setAnswers(a)
    setPhase('results')
  }

  return (
    <>
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-parchment/92 backdrop-blur-md border-b border-bone">
        <div className="max-w-6xl mx-auto px-10 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <DoerfyMark />
            <span className="font-display text-xl font-bold text-ink tracking-tight">Doerfy</span>
          </Link>
          {phase !== 'results' && (
            <Link href="/#beta" className="text-sm font-medium text-purple-deep border-b border-purple-pale pb-0.5 hover:border-purple hover:text-purple transition-all">
              Join the Beta
            </Link>
          )}
        </div>
      </nav>

      <main className="bg-parchment pt-16">
        {phase === 'intro'   && <Intro   onStart={() => setPhase('quiz')} />}
        {phase === 'quiz'    && <Quiz    onComplete={handleComplete} />}
        {phase === 'results' && <Results answers={answers} />}
      </main>

      {phase !== 'quiz' && (
        <footer className="bg-manifesto-deep border-t border-white/6 py-6">
          <div className="max-w-6xl mx-auto px-10 flex items-center justify-between flex-wrap gap-4">
            <span className="font-display text-sm font-semibold text-white/50">Doerfy</span>
            <nav className="flex gap-6">
              {[['/', 'Home'], ['/method', 'The Method'], ['/manifesto', 'Manifesto']].map(([href, label]) => (
                <Link key={href} href={href} className="text-xs text-white/25 hover:text-white/50 transition-colors">{label}</Link>
              ))}
            </nav>
            <span className="text-xs text-white/18">&copy; 2026 Doerfy</span>
          </div>
        </footer>
      )}
    </>
  )
}
