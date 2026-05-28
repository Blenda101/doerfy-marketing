'use client'

import React, { useEffect, useState } from 'react'
import Script from 'next/script'
import ValueCalculator from '@/components/calculator/ValueCalculator'
import DoeyAvatar from '@/components/DoeyAvatar'

declare global {
  interface Window {
    __doerfyOpenForm: (id: string, mode: string) => void
  }
}

/* ── Doerfy logomark ─────────────────────────────────────────── */
// eslint-disable-next-line @next/next/no-img-element
const DoerfyMark = ({ className = 'w-8 h-8' }: { className?: string }) => (
  <img src="/images/logo.png" alt="Doerfy" className={className} />
)

/* ── Arrow icon ──────────────────────────────────────────────── */
const ArrowRight = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

/* ── Scroll reveal hook ──────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.reveal')
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1, rootMargin: '0px 0px -48px 0px' }
    )
    els.forEach(el => obs.observe(el))
    document.querySelectorAll<HTMLElement>('.hero-reveal').forEach(el => el.classList.add('visible'))
    return () => obs.disconnect()
  }, [])
}

/* ── Module data ─────────────────────────────────────────────── */
type ModuleKey = 'theme' | 'stories' | 'tasks' | 'todo' | 'cim' | 'notes' | 'library' | 'canvas' | 'post' | 'doey'

interface ModuleInfo {
  name: string
  space: string
  tagline: string
  desc: string
  phase: string
  color: string
  bgColor: string
  features: string[]
}

const MODULES: Record<ModuleKey, ModuleInfo> = {
  doey: {
    name: 'Doey',
    space: 'Agent in the Loop',
    tagline: 'One coach. One memory. Every space.',
    desc: 'Doey is the persistent AI coach embedded across every tool. To you, Doey is a coach — warm, specific, and always in context. To the system, Doey is the AI agent in the CIM loop, helping you embed the practice of getting life done.',
    phase: 'All Phases',
    color: '#7C5CFF',
    bgColor: 'rgba(124,92,255,0.12)',
    features: ['Life Coach and Business Coach modes', 'One memory across all spaces', 'Socratic coaching — asks more than tells', 'Pattern recognition from your Done data'],
  },
  theme: {
    name: 'Theme Builder',
    space: 'Design Phase',
    tagline: 'Author the life you intend to build.',
    desc: 'The top-level authoring environment where your life becomes intentional. With Doey, you work through the Four ACTs — Vision, Mission, Values, Strategy — to produce a written Script: your master story.',
    phase: 'Design',
    color: '#5B47D9',
    bgColor: 'rgba(91,71,217,0.1)',
    features: ['Four ACTs: Vision · Mission · Values · Strategy', 'Wheel of Life / Wheel of Focus', 'Storyboards, Movies, and Banners', 'Goals & Habits / OKRs as Strategy outputs'],
  },
  stories: {
    name: 'Stories',
    space: 'Outcome Space',
    tagline: 'Plan outcomes, not just tasks.',
    desc: 'The visual planning environment where your Theme decomposes into a nested hierarchy of executable outcomes. The Outcome Pyramid in practice: Theme → Mega Do → Project → Todo.',
    phase: 'Do — Plan',
    color: '#2D9B8A',
    bgColor: 'rgba(45,155,138,0.1)',
    features: ['Outcome Pyramid: Theme → Mega Do → Project → Todo', 'Every story has a narrative and a done-state', 'AI cascade: Doey proposes, you approve, items appear', 'Sibling awareness prevents duplicate scope'],
  },
  tasks: {
    name: 'Tasks',
    space: 'Action Space',
    tagline: 'From unlimited queue to one thing right now.',
    desc: 'The execution environment where committed Tasks flow through the seven-stage Action Funnel. The width caps are the method\'s commitment discipline: from unlimited to one.',
    phase: 'Do — Act',
    color: '#7C5CFF',
    bgColor: 'rgba(124,92,255,0.1)',
    features: ['7-stage Action Funnel: Do Queue → Doing(7) → Do Now', 'Width caps enforce commitment discipline', 'Stage, List, and Calendar views', 'Task aging and avoidance detection by Doey'],
  },
  cim: {
    name: 'Improvement Space',
    space: 'The OS',
    tagline: 'The continuous loop that compounds your doing.',
    desc: 'The Continuous Improvement Model — the operating system of Doerfy. Not a phase inside "Do." It runs across all three phases: capturing and refining in Design, generating reports in Visualize, running at full intensity in Do.',
    phase: 'All Phases — OS',
    color: '#D97706',
    bgColor: 'rgba(217,119,6,0.1)',
    features: ['Capture (always active) → COP → Commit gate', 'Altitudes: Plan (10k ft) · Review (5k ft) · Do (0 ft)', 'Five nested rhythms: Daily, Weekly, Monthly, Quarterly, Annual', 'Doey surfaces the right ritual at the right time'],
  },
  notes: {
    name: 'Notes',
    space: 'Knowledge Base — Capture',
    tagline: 'Get it out of your head the moment it appears.',
    desc: 'Quick-capture surface for ideas, thoughts, the running record of your mind. Doey extracts actions, surfaces insights, and connects everything to active Goals and Mega Dos.',
    phase: 'Knowledge — Curate',
    color: '#EA7C2B',
    bgColor: 'rgba(234,124,43,0.1)',
    features: ['Rich text with full markdown support', 'Notebooks and dynamic smart collections', 'AI extraction: actions surfaced, insights filed', 'Link notes to Tasks, Stories, and Goals'],
  },
  todo: {
    name: 'Todo',
    space: 'Outcome Space — Queue',
    tagline: 'The committed list. What you said you would do.',
    desc: 'The Todo is the smallest unit in the Outcome Pyramid — below Project, above raw Task. A Todo is a specific, bounded action you have committed to completing. Once clarified and prioritized through CIM, Todos enter the Action Funnel as executable Tasks.',
    phase: 'Do — Plan',
    color: '#1A1A2E',
    bgColor: 'rgba(28,28,46,0.07)',
    features: ['Direct output of Story and Project planning', 'Every Todo has a scope, owner, and done-state', 'COP: Clarify → Organize → Prioritize before committing', 'Committed Todos flow into the Action Funnel as Tasks'],
  },
  library: {
    name: 'Library',
    space: 'Knowledge Base — Capture',
    tagline: 'Your unified content store.',
    desc: 'The reference library — links, files, PDFs, web clips, documents. Doey ingests, summarizes, and connects captured content to active Goals and Mega Dos, making it retrievable when you need it.',
    phase: 'Knowledge — Curate',
    color: '#C0504A',
    bgColor: 'rgba(192,80,74,0.1)',
    features: ['PDFs, Office docs, Google Docs, web pages', 'Built-in viewer and editor for most types', 'Smart collections with privacy controls', 'Doey connects captures to Goals and Mega Dos'],
  },
  canvas: {
    name: 'Canvas',
    space: 'Knowledge Base — Create',
    tagline: 'Think visually. Build structure from space.',
    desc: 'The spatial thinking workspace — mind maps, diagrams, whiteboard-style layouts. Doey can generate Canvas structures from your Theme and Goals and surface connections to existing material.',
    phase: 'Knowledge — Create',
    color: '#7B9E42',
    bgColor: 'rgba(123,158,66,0.1)',
    features: ['Mind maps, diagrams, sticky notes', 'Real-time collaboration', 'AI generates structure from Goals', 'Export to image and PDF'],
  },
  post: {
    name: 'Post',
    space: 'Knowledge Base — Create',
    tagline: 'Turn your thinking into published work.',
    desc: 'The output surface where your thinking becomes published work. Doey functions as a writing partner with full context of your Theme, Knowledge Base, and voice. Publish to your personalized site or cross-post to WordPress and Ghost.',
    phase: 'Knowledge — Create',
    color: '#3B82F6',
    bgColor: 'rgba(59,130,246,0.1)',
    features: ['Draft → Review → Publish workflow', 'Personal publishing site at yourname.doerfy.com', 'Cross-post to WordPress and Ghost', 'Doey as writing partner with full Theme context'],
  },
}

/* ── Brain Map ───────────────────────────────────────────────── */
// 7 pills — positions match the labeled reference image.
// Left (Execution): Stories=teal top, Notes=orange mid, Library=red bottom
// Center: Todo=dark (corpus callosum area)
// Right (Knowledge): Task=purple top, Canvas=green mid, Post=blue bottom
const BRAIN_PILLS: Array<{ key: ModuleKey; label: string; x: string; y: string }> = [
  { key: 'stories', label: 'Stories', x: '17%', y: '32%' },
  { key: 'todo',    label: 'Todo',    x: '50%', y: '32%' },
  { key: 'tasks',   label: 'Tasks',   x: '83%', y: '32%' },
  { key: 'notes',   label: 'Notes',   x: '12%', y: '55%' },
  { key: 'canvas',  label: 'Canvas',  x: '88%', y: '55%' },
  { key: 'library', label: 'Library', x: '17%', y: '78%' },
  { key: 'post',    label: 'Posts',   x: '83%', y: '78%' },
]

const EXECUTION_KEYS: ModuleKey[] = ['stories', 'tasks', 'todo']
const KNOWLEDGE_KEYS: ModuleKey[] = ['notes', 'library', 'canvas', 'post']

const HEMISPHERE_CONTENT = {
  execution: {
    tag: 'Execution Space',
    title: 'Plan it. Queue it. Do it.',
    desc: 'Where intention becomes action. Stories define your outcomes, Todo holds your commitments, and Tasks carry the work forward — one step at a time.',
  },
  knowledge: {
    tag: 'Knowledge Space',
    title: 'Capture. Curate. Create.',
    desc: 'Your second brain in motion. Notes catch the spark, Library holds the substance, Canvas gives it shape, and Post sends it into the world.',
  },
}

function BrainMap({ active, onSelect, activeHemisphere, onHemisphere }: {
  active: ModuleKey | null
  onSelect: (k: ModuleKey) => void
  activeHemisphere: 'execution' | 'knowledge' | null
  onHemisphere: (h: 'execution' | 'knowledge') => void
}) {
  return (
    <div className="w-full select-none">

      {/* Top — legend circles + Execution selector */}
      <div className="flex flex-col items-center gap-1 mb-0.5">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: MODULES.stories.color }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: MODULES.tasks.color }} />
        </div>
        <button
          onClick={() => onHemisphere('execution')}
          className={`px-3 py-1 rounded-full border text-[10px] font-semibold tracking-widest uppercase transition-all ${
            activeHemisphere === 'execution'
              ? 'bg-ink text-white border-ink'
              : 'text-ink-muted border-bone hover:border-ink-faint'
          }`}
        >
          Execution
        </button>
      </div>

      {/* Brain image + pills — relative container so % positions map to image */}
      <div className="relative w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/brain.png"
          alt="Doerfy second brain module map"
          className="w-full block"
          draggable={false}
        />

      {/* Module pills */}
      {BRAIN_PILLS.map(pill => {
        const m = MODULES[pill.key]
        const isActive = active === pill.key
        const dimmed = activeHemisphere === 'execution'
          ? !EXECUTION_KEYS.includes(pill.key)
          : activeHemisphere === 'knowledge'
          ? !KNOWLEDGE_KEYS.includes(pill.key)
          : false
        return (
          <button
            key={pill.key}
            onClick={() => onSelect(pill.key)}
            style={{
              position: 'absolute',
              left: pill.x,
              top: pill.y,
              transform: `translate(-50%, -50%) scale(${isActive ? 1.12 : 1})`,
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              width: '88px',
              padding: '5px 0',
              borderRadius: '999px',
              border: `2.5px solid white`,
              backgroundColor: isActive ? m.color : m.color + 'DD',
              color: 'white',
              fontSize: '11px',
              fontWeight: '700',
              letterSpacing: '0.02em',
              justifyContent: 'center',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              opacity: dimmed ? 0.5 : 1,
              boxShadow: isActive ? `0 4px 20px ${m.color}70, 0 0 0 1px ${m.color}` : '0 2px 8px rgba(0,0,0,0.25)',
              transition: 'all 0.2s ease',
            }}
          >
            <span style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.5)',
              flexShrink: 0,
            }} />
            {pill.label}
          </button>
        )
      })}
      </div>

      {/* Bottom legend — knowledge flow */}
      <div className="flex flex-col items-center gap-1.5 mt-0.5">
        <div className="flex items-center gap-3 text-xs font-medium text-ink-muted">
          <span>Capture</span>
          <span className="text-ink-faint">&larr;</span>
          <button
            onClick={() => onHemisphere('knowledge')}
            className={`px-3 py-1 rounded-full border text-[10px] font-semibold tracking-widest uppercase transition-all ${
              activeHemisphere === 'knowledge'
                ? 'bg-ink text-white border-ink'
                : 'text-ink-muted border-bone hover:border-ink-faint'
            }`}
          >
            Knowledge
          </button>
          <span className="text-ink-faint">&rarr;</span>
          <span>Creation</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: MODULES.notes.color }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: MODULES.library.color }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: MODULES.post.color }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: MODULES.canvas.color }} />
        </div>
      </div>

    </div>
  )
}


/* ── How It Works phase mockups ─────────────────────────────── */

const PHASE_TABS = {
  design: [
    { key: 'wheel',  label: 'Wheel',  screens: ['/images/screenshots/wheel_1.png',   '/images/screenshots/wheel_2.png']   },
    { key: 'acts',   label: 'ACTs',   screens: ['/images/screenshots/acts_1.png',    '/images/screenshots/acts_2.png']    },
    { key: 'script', label: 'Script', screens: ['/images/screenshots/script_1.png',  '/images/screenshots/script_2.png']  },
  ],
  visualize: [
    { key: 'story',     label: 'Story',     screens: ['/images/screenshots/story_1.png',     '/images/screenshots/story_2.png']     },
    { key: 'goals',     label: 'Goals',     screens: ['/images/screenshots/goal_1.png',      '/images/screenshots/goal_2.png']      },
    { key: 'execution', label: 'Execution', screens: ['/images/screenshots/execution_1.png', '/images/screenshots/execution_2.png'] },
  ],
  do: [
    { key: 'tasks',    label: 'Actions',  screens: ['/images/screenshots/tasks_1.png',    '/images/screenshots/tasks_2.png']    },
    { key: 'outcomes', label: 'Outcomes', screens: ['/images/screenshots/outcomes_1.png', '/images/screenshots/outcomes_2.png'] },
    { key: 'projects', label: 'Projects', screens: ['/images/screenshots/projects_1.png', '/images/screenshots/projects_2.png'] },
  ],
} as const

type PhaseKey = keyof typeof PHASE_TABS

function makeSteps(tabs: readonly { key: string; label: string; screens: readonly [string, string] }[]) {
  return tabs.flatMap((_, ti) => [{ tabIdx: ti, screenIdx: 0 }, { tabIdx: ti, screenIdx: 1 }])
}

function PhaseMockup({ phase }: { phase: PhaseKey }) {
  const tabs = PHASE_TABS[phase]
  const steps = makeSteps(tabs)

  const [step, setStep] = useState(0)
  const [imgStyle, setImgStyle] = useState<React.CSSProperties>({ opacity: 1, transform: 'translateX(0px)' })
  const [paused, setPaused] = useState(false)
  const [renderedStep, setRenderedStep] = useState(0)

  const current = steps[step]
  const rendered = steps[renderedStep]
  const tab = tabs[rendered.tabIdx]

  function advance(nextStep: number, sameTab: boolean) {
    if (sameTab) {
      setImgStyle({ opacity: 0, transform: 'translateX(0px)', transition: 'opacity 350ms ease' })
    } else {
      setImgStyle({ opacity: 0, transform: 'translateX(-14px)', transition: 'opacity 400ms ease, transform 400ms ease' })
    }
    const outDuration = sameTab ? 360 : 410
    setTimeout(() => {
      setRenderedStep(nextStep)
      if (sameTab) {
        setImgStyle({ opacity: 0, transform: 'translateX(0px)' })
        requestAnimationFrame(() =>
          requestAnimationFrame(() =>
            setImgStyle({ opacity: 1, transform: 'translateX(0px)', transition: 'opacity 350ms ease' })
          )
        )
      } else {
        setImgStyle({ opacity: 0, transform: 'translateX(14px)' })
        requestAnimationFrame(() =>
          requestAnimationFrame(() =>
            setImgStyle({ opacity: 1, transform: 'translateX(0px)', transition: 'opacity 400ms ease, transform 400ms ease' })
          )
        )
      }
    }, outDuration)
  }

  useEffect(() => {
    if (paused) return
    const t = setTimeout(() => {
      const nextStep = (step + 1) % steps.length
      const sameTab = steps[nextStep].tabIdx === steps[step].tabIdx
      setStep(nextStep)
      advance(nextStep, sameTab)
    }, 3200)
    return () => clearTimeout(t)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, paused])

  function goToTab(tabIdx: number) {
    const nextStep = steps.findIndex(s => s.tabIdx === tabIdx)
    const sameTab = tabIdx === current.tabIdx
    setStep(nextStep)
    advance(nextStep, sameTab)
  }

  return (
    <div
      className="rounded-xl overflow-hidden border border-bone shadow-lg bg-white select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Tab bar */}
      <div className="flex items-center gap-1 px-4 pt-3 pb-2 border-b border-bone bg-parchment">
        {tabs.map((t, i) => (
          <button
            key={t.key}
            onClick={() => goToTab(i)}
            className={`text-[10px] px-2.5 py-1 rounded-full font-semibold transition-all ${
              i === current.tabIdx ? 'bg-manifesto text-white' : 'text-ink-faint hover:text-ink'
            }`}
          >
            {t.label}
          </button>
        ))}
        {/* Screen dots */}
        <div className="ml-auto flex items-center gap-1 pr-1">
          {[0, 1].map(i => (
            <span
              key={i}
              className={`rounded-full transition-all duration-300 ${
                i === current.screenIdx ? 'w-3 h-1.5 bg-purple' : 'w-1.5 h-1.5 bg-bone'
              }`}
            />
          ))}
        </div>
      </div>
      {/* Screenshot */}
      <div className="relative aspect-video bg-stone overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={tab.screens[rendered.screenIdx]}
          alt={`${tab.label} screen ${rendered.screenIdx + 1}`}
          className="w-full h-full object-cover object-top"
          style={imgStyle}
        />
      </div>
    </div>
  )
}

function DesignMockup()    { return <PhaseMockup phase="design" /> }
function VisualizeMockup() { return <PhaseMockup phase="visualize" /> }
function DoMockup()        { return <PhaseMockup phase="do" /> }

/* ═══════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════ */
export default function Home() {
  useReveal()
  const [scrolled, setScrolled] = useState(false)
  const [activeModule, setActiveModule] = useState<ModuleKey | null>(null)
  const [activeHemisphere, setActiveHemisphere] = useState<'execution' | 'knowledge' | null>(null)
  const [activePhase, setActivePhase] = useState<'design' | 'visualize' | 'do'>('design')
  const [showMethodModal, setShowMethodModal] = useState(false)

  useEffect(() => {
    if (!showMethodModal) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setShowMethodModal(false) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [showMethodModal])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const activeModuleData = activeModule ? MODULES[activeModule] : null

  return (
    <>
      <Script src="https://dev.doerfy.com/embed/forms.js" strategy="lazyOnload" />
      {/* ══ NAV ════════════════════════════════════════════════ */}
      <nav className={`fixed top-0 left-0 right-0 z-50 bg-parchment/92 backdrop-blur-md border-b border-bone transition-shadow ${scrolled ? 'shadow-sm' : ''}`}>
        <div className="max-w-6xl mx-auto px-10 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <DoerfyMark />
            <span className="font-display text-xl font-bold text-ink tracking-tight">Doerfy</span>
          </a>
          <ul className="hidden md:flex items-center gap-10 list-none">
            {[
              { label: 'How it Works', href: '#how-it-works' },
              { label: 'The System', href: '#the-operating-system' },
              { label: 'The Tools', href: '#the-system' },
              { label: 'The Manifesto', href: '#manifesto' },
              { label: 'Meet Doey', href: '#meet-doey' },
            ].map(item => (
              <li key={item.label}>
                <a href={item.href} className="text-sm text-ink-muted hover:text-ink transition-colors">{item.label}</a>
              </li>
            ))}
          </ul>
          <button onClick={() => window.__doerfyOpenForm('beta-signup-form-1e59ea', 'popup')} className="flex items-center gap-2 bg-manifesto text-white text-sm font-medium px-5 py-2.5 rounded hover:bg-manifesto-mid transition-colors">
            Join the Movement <ArrowRight size={14} />
          </button>
        </div>
      </nav>

      {/* ══ HERO ═══════════════════════════════════════════════ */}
      <section className="min-h-svh flex items-stretch bg-parchment pt-16">
        <div className="w-full grid md:grid-cols-[52fr_48fr]">
          {/* Left — headline */}
          <div className="flex flex-col justify-center px-10 py-24 max-w-2xl ml-auto mr-0">
            <div className="flex items-center gap-2 mb-10 reveal hero-reveal">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse-slow" />
              <span className="text-xs font-semibold tracking-widest uppercase text-purple">Beta &mdash; Coming Soon</span>
            </div>
            <h1 className="font-display text-[clamp(44px,5.5vw,76px)] font-medium leading-[1.06] tracking-tight text-ink mb-8 reveal hero-reveal reveal-delay-1">
              Design, visualize<br />and do the life<br /><em className="italic text-purple">you truly desire</em>
            </h1>
            <p className="text-lg leading-relaxed text-ink-muted font-light mb-10 reveal hero-reveal reveal-delay-2">
              Doerfy is a life-design system. You get a persistent AI coach, a framework with the tools to execute it, and a practice that compounds over time. All tuned to connect your vision and what you do every day.
            </p>
            <div className="flex items-center gap-6 flex-wrap reveal hero-reveal reveal-delay-3">
              <button onClick={() => window.__doerfyOpenForm('beta-signup-form-1e59ea', 'popup')} className="flex items-center gap-2 bg-purple-deep hover:bg-purple text-white px-7 py-3.5 rounded text-sm font-medium transition-all hover:-translate-y-px">
                Join the Movement <ArrowRight />
              </button>
              <a href="#manifesto" className="flex items-center gap-2 text-sm text-ink-muted border-b border-bone pb-0.5 hover:text-ink hover:border-ink-muted transition-all">
                Read the Manifesto <ArrowRight size={14} />
              </a>
            </div>
          </div>

          {/* Right — filmmaker image: person designing their life */}
          <div className="hidden md:block relative overflow-hidden bg-manifesto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/hero-filmmaker.jpg"
              alt="A person at their desk, surrounded by floating film frames showing scenes from their designed life"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
            />
            {/* Overlay gradient for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-manifesto/80 via-manifesto/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-manifesto/30 to-transparent" />
            {/* Bottom caption */}
            <div className="absolute bottom-8 left-8 right-8 z-10">
              <p className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-2">Manifesto — Principle I</p>
              <p className="font-display text-sm italic text-white/65 leading-relaxed max-w-xs">
                &ldquo;A life that is not designed is a life that is defaulted into. The Doer authors the life they live.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ POSITIONING STRIP ══════════════════════════════════ */}
      <div className="bg-purple-ultra border-y border-purple-pale py-8">
        <div className="max-w-6xl mx-auto px-10 flex items-center justify-center gap-16 flex-wrap">
          <p className="font-display text-[clamp(18px,2.5vw,26px)] text-manifesto text-center">
            Most productivity software manages your work.<br />
            <em className="italic text-purple">Doerfy is the canvas and GPS for your life.</em>
          </p>
        </div>
      </div>

      {/* ══ HOW IT WORKS ═══════════════════════════════════════ */}
      <section className="py-24 bg-parchment" id="how-it-works">
        <div className="max-w-6xl mx-auto px-10">
          <div className="grid md:grid-cols-2 gap-16 items-end mb-16">
            <div>
              <span className="flex items-center gap-3 text-xs font-semibold tracking-widest uppercase text-purple mb-4">
                <span className="w-8 h-px bg-purple inline-block" /> How it Works
              </span>
              <h2 className="font-display text-[clamp(36px,4vw,56px)] font-medium leading-[1.1] tracking-tight text-ink">
                The Doerfy<br /><em className="italic text-purple">Method.</em>
              </h2>
            </div>
            <p className="text-base leading-relaxed text-ink-muted font-light max-w-md ml-auto">
              The Doerfy Method is not a task manager with goal-setting bolted on. It begins with Vision, ends with your daily work, and keeps both connected through every tool.
            </p>
          </div>

          {/* Phase tabs */}
          <div className="flex items-center gap-2 mb-12 reveal">
            {([
              { key: 'design'    as const, label: 'Design',    num: '01' },
              { key: 'visualize' as const, label: 'Visualize', num: '02' },
              { key: 'do'        as const, label: 'Do',        num: '03' },
            ]).map(tab => (
              <button
                key={tab.key}
                onClick={() => setActivePhase(tab.key)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  activePhase === tab.key
                    ? 'bg-manifesto text-white shadow-sm'
                    : 'text-ink-muted hover:text-ink hover:bg-stone'
                }`}
              >
                <span className={`text-xs font-normal ${activePhase === tab.key ? 'text-white/60' : 'text-ink-faint'}`}>{tab.num}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Active phase panel */}
          <div className="reveal">
            {activePhase === 'design' && (
              <div className="grid md:grid-cols-[2fr_3fr] gap-14 items-center">
                <div>
                  <h3 className="font-display text-[clamp(26px,3vw,40px)] font-medium text-ink mb-5 leading-tight">Author the life you intend to build.</h3>
                  <p className="text-sm leading-relaxed text-ink-muted font-light mb-8">Before you manage tasks, you design a life. With Doey, you work through the Four ACTs — Vision, Mission, Values, Strategy — to produce a written Script: your master story. The Wheel of Life shows where you are. The Theme Builder is where you decide where you are going.</p>
                  <div className="space-y-4">
                    {[
                      { name: 'Theme Builder', desc: 'Four ACTs + your written Script' },
                      { name: 'Wheel of Life', desc: 'Rate and rank your Life Areas' },
                      { name: 'Doey — Life Coach', desc: 'AI coaching that asks, not just answers' },
                    ].map(t => (
                      <div key={t.name} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple mt-1.5 flex-shrink-0" />
                        <p className="text-sm text-ink-muted"><strong className="text-ink/80 font-medium">{t.name}</strong><span className="text-ink-faint"> — {t.desc}</span></p>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] font-semibold tracking-widest uppercase text-ink-faint/50 mt-6">Theme Builder · Wheel of Life · Four ACTs</p>
                </div>
                <DesignMockup />
              </div>
            )}
            {activePhase === 'visualize' && (
              <div className="grid md:grid-cols-[2fr_3fr] gap-14 items-center">
                <div>
                  <h3 className="font-display text-[clamp(26px,3vw,40px)] font-medium text-ink mb-5 leading-tight">Make your design seeable — then keep it visible.</h3>
                  <p className="text-sm leading-relaxed text-ink-muted font-light mb-8">A vision unseen will not be lived. Your Script is rendered into Storyboards and Movies you can watch. Goals become trackable commitment cards. The Outcome Pyramid is a graph. The Action Funnel is a shape. Visualization is not a feature — it is a phase of the Method.</p>
                  <div className="space-y-4">
                    {[
                      { name: 'Story & Storyboards', desc: 'Your life rendered as a watchable Movie' },
                      { name: 'Goals & Habits', desc: 'Strategy outputs tracked as visual cards' },
                      { name: 'Outcome Pyramid', desc: 'Theme → Mega Do → Project → Todo as a graph' },
                    ].map(t => (
                      <div key={t.name} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple mt-1.5 flex-shrink-0" />
                        <p className="text-sm text-ink-muted"><strong className="text-ink/80 font-medium">{t.name}</strong><span className="text-ink-faint"> — {t.desc}</span></p>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] font-semibold tracking-widest uppercase text-ink-faint/50 mt-6">Story · Storyboards · Movies · Goals & Habits</p>
                </div>
                <VisualizeMockup />
              </div>
            )}
            {activePhase === 'do' && (
              <div className="grid md:grid-cols-[2fr_3fr] gap-14 items-center">
                <div>
                  <h3 className="font-display text-[clamp(26px,3vw,40px)] font-medium text-ink mb-5 leading-tight">Plan the work. Then commit and execute.</h3>
                  <p className="text-sm leading-relaxed text-ink-muted font-light mb-8">The Action Funnel moves work from possibility to done. Seven stages narrow commitment: from your full queue to seven weekly tasks, from seven to one daily focus, from one to what you do right now. The Improvement Space is the OS that keeps the system honest.</p>
                  <div className="space-y-4">
                    {[
                      { name: 'Action Funnel', desc: 'Do Queue → Doing(7) → Do Now → Done' },
                      { name: 'Improvement Space', desc: 'Capture → COP → Commit → Altitudes' },
                      { name: 'Knowledge Base', desc: 'Notes · Library · Canvas · Post' },
                    ].map(t => (
                      <div key={t.name} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple mt-1.5 flex-shrink-0" />
                        <p className="text-sm text-ink-muted"><strong className="text-ink/80 font-medium">{t.name}</strong><span className="text-ink-faint"> — {t.desc}</span></p>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] font-semibold tracking-widest uppercase text-ink-faint/50 mt-6">Outcome Space · Action Funnel · Improvement Space · Knowledge Base</p>
                </div>
                <DoMockup />
              </div>
            )}
          </div>

          <div className="text-center mt-12 reveal">
            <a href="/manifesto" className="inline-flex items-center gap-2 text-sm font-medium text-purple-deep border-b border-purple-pale pb-0.5 hover:border-purple hover:text-purple transition-all">
              Read the full Manifesto <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* ══ THREE SPACES ═══════════════════════════════════════ */}
      <section className="py-16 bg-parchment border-b border-bone" id="the-operating-system">
        <div className="max-w-6xl mx-auto px-10">
          <div className="grid md:grid-cols-2 gap-16 items-end reveal">
            <div>
              <span className="flex items-center gap-3 text-xs font-semibold tracking-widest uppercase text-purple mb-4">
                <span className="w-8 h-px bg-purple inline-block" /> The Operating System
              </span>
              <h2 className="font-display text-[clamp(36px,4vw,56px)] font-medium leading-[1.1] tracking-tight text-ink">
                The engine<br /><em className="italic text-purple">beneath the Method.</em>
              </h2>
            </div>
            <p className="text-base leading-relaxed text-ink-muted font-light max-w-md ml-auto">
              Three interlocking systems run beneath Design, Visualize, and Do — the Practice that keeps the loop alive, the Outcome Space that structures what matters, and the Action Space that executes it.
            </p>
          </div>
        </div>
      </section>
      {[
        {
          img: '/images/Practice.svg',
          alt: 'Doer Practice OS — CIM loop diagram',
          tag: 'The Practice — Capture, Stage, and Deliver',
          title: 'The practice that keeps the system aligned.',
          body: 'The Continuous Improvement Practice is not a phase — it is the connective tissue between our tools, users and Doey. All internalize this practice together, closing the loop from vision to done.',
          features: [
            { label: 'Capture', desc: 'Capture at conception get it our of your head' },
            { label: 'Stage', desc: 'Hone the discipline of discernment with a trusted a trusted place to capture and create.' },
            { label: 'Deliver', desc: 'Master your work rhythm to avoid altitude sickness. Daily · Weekly · Monthly · Quarterly · Annual check-ins' },
          ],
          bg: 'bg-parchment',
          imgLeft: true,
        },
        {
          img: '/images/outcome.svg',
          alt: 'Outcome Space pyramid — Theme, Mega Dos, Projects, Todos',
          tag: 'Outcome Space — The What and the Why',
          title: 'Plan outcomes, not just tasks.',
          body: 'The Outcome Pyramid decomposes your Theme into a nested hierarchy of executable outcomes. Every level has a narrative and a done-state. Collaborate with Doey to deliver eash story levels child outcomes, and the system will keep them all connected and visible.',
          features: [
            { label: 'Theme', desc: 'Your master story. The capstone of outcomes.' },
            { label: 'Mega Do', desc: 'Project collections that serve Theme life areas.' },
            { label: 'Project', desc: 'Bounded scopes with a clear done-state and timeframe.' },
            { label: 'Todo', desc: 'Committed project work unit — decomposes to tasks in the Funnel.' },
          ],
          bg: 'bg-stone',
          imgLeft: false,
        },
        {
          img: '/images/action.svg',
          alt: 'Action Space funnel — Do Queue through Do Now',
          tag: 'Action Space — The How and the When',
          title: 'From unlimited queue to one thing right now.',
          body: 'The Action Funnel is the execution layer. Seven stages narrow commitment and focus at each stage. Aging occurs when task has exceeded its stage time threshold. The stage constraints — enforce discipline for sustained execution without overcommitmenting.',
          features: [
            { label: 'Do Queue', desc: 'Trusted holding area with lowest commitment' },
            { label: 'Do Queue', desc: 'Clarified but not yet prioritized to WIP' },
            { label: 'Doing(7)', desc: 'Committed WIP to be to complete within 7days' },
            { label: 'Do Today(1)', desc: 'Committed work for the current day' },
            { label: 'Do Now', desc: 'Single task that has current focus and attention' },
          ],
          bg: 'bg-parchment',
          imgLeft: true,
        },
      ].map((block, i) => (
        <section key={i} className={`py-24 ${block.bg} border-b border-bone`}>
          <div className="max-w-6xl mx-auto px-10">
            <div className={`grid md:grid-cols-2 gap-16 items-center reveal ${!block.imgLeft ? 'md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1' : ''}`}>
              {/* Image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={block.img}
                alt={block.alt}
                className="w-full max-w-lg mx-auto"
                draggable={false}
              />
              {/* Text */}
              <div>
                <span className="text-xs font-semibold tracking-widest uppercase text-purple mb-4 block">{block.tag}</span>
                <h2 className="font-display text-[clamp(28px,3.2vw,44px)] font-medium leading-[1.1] tracking-tight text-ink mb-5">
                  {block.title}
                </h2>
                <p className="text-base leading-relaxed text-ink-muted font-light mb-8 max-w-md">
                  {block.body}
                </p>
                <div className="space-y-3">
                  {block.features.map(f => (
                    <div key={f.label} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple mt-2 flex-shrink-0" />
                      <p className="text-sm text-ink-muted">
                        <strong className="text-ink/80 font-medium">{f.label}</strong>
                        <span className="text-ink-faint"> — {f.desc}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      <div className="bg-parchment border-b border-bone py-8 text-center">
        <button
          onClick={() => setShowMethodModal(true)}
          className="inline-flex items-center gap-2 text-sm font-medium text-purple-deep border-b border-purple-pale pb-0.5 hover:border-purple hover:text-purple transition-all"
        >
          Explore full Methodology <ArrowRight size={14} />
        </button>
      </div>

      {/* ══ DIAGNOSTIC BAND ════════════════════════════════════ */}
      <div className="bg-purple-deep py-14">
        <div className="max-w-6xl mx-auto px-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-purple-light mb-3">Before you explore the tools</p>
            <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-medium leading-[1.1] tracking-tight text-white mb-2">
              Which Doer are you?
            </h2>
            <p className="text-base text-white/55 font-light max-w-md">
              Ten questions. Five layers. Doey will know exactly where to meet you the moment you sign in.
            </p>
          </div>
          <div className="flex-shrink-0">
            <a href="/diagnostic"
              className="inline-flex items-center gap-2 bg-white text-purple-deep px-7 py-3.5 rounded text-sm font-semibold hover:bg-purple-ultra transition-all hover:-translate-y-px">
              Take the Diagnostic <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* ══ THE SYSTEM ═════════════════════════════════════════ */}
      <section className="min-h-screen bg-stone flex flex-col justify-center py-16" id="the-system">
        <div className="max-w-6xl mx-auto px-10 w-full">
          {/* Header */}
          <div className="grid md:grid-cols-2 gap-12 items-end mb-16 reveal">
            <div>
              <span className="flex items-center gap-3 text-xs font-semibold tracking-widest uppercase text-purple mb-4">
                <span className="w-8 h-px bg-purple inline-block" /> The Tools
              </span>
              <h2 className="font-display text-[clamp(32px,4vw,52px)] font-medium leading-[1.1] tracking-tight text-ink">
                Curate and Create<br />in your <em className="italic text-purple">second brain.</em>
              </h2>
            </div>
            <div className="space-y-3">
              <p className="text-base leading-relaxed text-ink-muted font-light">
                The Doerfy toolset combines execution with deeply integrated knowledge curation and creation tools. Featuring rich bi-directional relationship tracking and instant discovery.
              </p>
              <div className="flex items-start gap-8 pt-2">
                {[
                  { label: 'Doer', sub: 'Human in the loop' },
                  { label: 'Doey', sub: 'AI agent in the loop' },
                  { label: 'OS', sub: 'Continuous Improvement' },
                ].map(p => (
                  <div key={p.label}>
                    <p className="text-sm font-semibold text-ink">{p.label}</p>
                    <p className="text-xs text-ink-faint">{p.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Brain visualization + module detail */}
          <div className="grid md:grid-cols-2 gap-8 items-stretch reveal">
            {/* Left: Brain map */}
            <div className="bg-parchment border border-bone rounded-2xl p-3 overflow-hidden">
              <BrainMap
                active={activeModule}
                onSelect={(k) => { setActiveModule(activeModule === k ? null : k); setActiveHemisphere(null) }}
                activeHemisphere={activeHemisphere}
                onHemisphere={(h) => { setActiveHemisphere(activeHemisphere === h ? null : h); setActiveModule(null) }}
              />
            </div>

            {/* Right: content card — full height, screenshot pinned to bottom */}
            <div className="flex flex-col h-full">
              {activeModuleData ? (
                <div className="flex flex-col h-full p-6 rounded-xl border" style={{ borderColor: activeModuleData.color + '40', backgroundColor: activeModuleData.bgColor }}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="text-xs font-semibold tracking-widest uppercase mb-1 block" style={{ color: activeModuleData.color }}>{activeModuleData.space}</span>
                      <h3 className="font-display text-2xl font-medium text-ink">{activeModuleData.name}</h3>
                    </div>
                    <span className="text-xs text-ink-faint bg-parchment border border-bone px-2 py-1 rounded mt-1">{activeModuleData.phase}</span>
                  </div>
                  <p className="font-display text-base italic text-ink-muted mb-3">&ldquo;{activeModuleData.tagline}&rdquo;</p>
                  <p className="text-sm text-ink-muted font-light leading-relaxed mb-4">{activeModuleData.desc}</p>
                  <div className="space-y-2 mb-4">
                    {activeModuleData.features.map(f => (
                      <div key={f} className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ background: activeModuleData.color }} />
                        <span className="text-xs text-ink-muted">{f}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setActiveModule(null)}
                    className="text-xs text-ink-faint hover:text-ink transition-colors self-start"
                  >
                    &larr; Back to map
                  </button>
                  <div className="mt-auto pt-4 w-full rounded-xl border-2 border-dashed border-bone bg-white/40 aspect-video flex items-center justify-center flex-shrink-0">
                    <span className="text-xs text-ink-faint tracking-widest uppercase">Screenshot</span>
                  </div>
                </div>

              ) : activeHemisphere ? (
                <div className="flex flex-col h-full p-6 rounded-xl border border-bone bg-parchment">
                  <span className="text-xs font-semibold tracking-widest uppercase mb-1 block" style={{ color: activeHemisphere === 'execution' ? MODULES.stories.color : MODULES.tasks.color }}>
                    {HEMISPHERE_CONTENT[activeHemisphere].tag}
                  </span>
                  <h3 className="font-display text-2xl font-medium text-ink mb-3">{HEMISPHERE_CONTENT[activeHemisphere].title}</h3>
                  <p className="text-sm text-ink-muted font-light leading-relaxed mb-5">{HEMISPHERE_CONTENT[activeHemisphere].desc}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(activeHemisphere === 'execution' ? EXECUTION_KEYS : KNOWLEDGE_KEYS).map(k => {
                      const m = MODULES[k]
                      return (
                        <button
                          key={k}
                          onClick={() => { setActiveModule(k); setActiveHemisphere(null) }}
                          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-bone bg-white hover:bg-parchment text-ink-muted transition-all"
                        >
                          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: m.color }} />
                          {m.name}
                        </button>
                      )
                    })}
                  </div>
                  <div className="mt-auto pt-4 w-full rounded-xl border-2 border-dashed border-bone bg-white/40 aspect-video flex items-center justify-center flex-shrink-0">
                    <span className="text-xs text-ink-faint tracking-widest uppercase">Screenshot</span>
                  </div>
                </div>

              ) : (
                <div className="flex flex-col h-full p-6 rounded-xl border border-bone bg-parchment">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-xs font-semibold tracking-widest uppercase text-purple">The Tools</span>
                    <span className="text-xs text-ink-faint bg-white border border-bone px-2 py-1 rounded mt-0.5">Second Brain</span>
                  </div>
                  <h3 className="font-display text-2xl font-medium text-ink mb-2">Your second brain.</h3>
                  <p className="font-display text-base italic text-ink-muted mb-3">&ldquo;Execution and Knowledge — unified productivity content system (UPCS)&rdquo;</p>
                  <p className="text-sm text-ink-muted font-light leading-relaxed mb-4">
                    Six tools across two hemispheres. Execution turns vision into committed action. Knowledge captures, curates, and surfaces what you need at the moment you need it. The UPCS keeps them in sync.
                  </p>
                  <div className="space-y-2 mb-4">
                    {[
                      'Execution — Stories and Tasks drive your daily doing',
                      'Knowledge — Notes, Library, Canvas, and Post build your second brain',
                      'UPCS — content captured once, discoverable everywhere',
                    ].map(f => (
                      <div key={f} className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0 bg-purple" />
                        <span className="text-xs text-ink-muted">{f}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {BRAIN_PILLS.filter(p => p.key !== 'todo').map(pill => {
                      const m = MODULES[pill.key]
                      return (
                        <button
                          key={pill.key}
                          onClick={() => setActiveModule(pill.key)}
                          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-bone bg-white hover:bg-purple-ultra hover:border-purple-pale text-ink-muted hover:text-purple-deep transition-all"
                        >
                          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: m.color }} />
                          {m.name}
                        </button>
                      )
                    })}
                  </div>
                  {/* UPCS Pipeline */}
                  <div className="mt-auto pt-4 space-y-3">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-ink-faint">UPCS Pipeline</p>
                    <div className="grid grid-cols-3 gap-1.5 justify-items-start">
                      {(['Capture','Curate','Discover','Present','Connect','Consume'] as const).map((step, i) => (
                        <span key={step} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-ultra border border-purple-pale text-xs font-semibold text-purple-deep">
                          <span className="w-3.5 h-3.5 rounded-full bg-purple text-white flex items-center justify-center text-[9px] font-bold flex-shrink-0">{i + 1}</span>
                          {step}
                        </span>
                      ))}
                    </div>
                    <div className="grid grid-cols-3 gap-2 pt-1">
                      {([
                        { e: '💡', t: 'Link Store', d: 'Single source of truth for all content' },
                        { e: '🥇', t: 'First-Class Content', d: 'Rich meta, bi-directional relationships' },
                        { e: '⚡', t: 'Just-in-Time', d: 'Right content, right context, instantly' },
                      ]).map(p => (
                        <div key={p.t} className="p-2 rounded-lg bg-white/60 border border-bone">
                          <span className="text-sm">{p.e}</span>
                          <p className="text-xs font-bold text-ink mt-0.5">{p.t}</p>
                          <p className="text-xs text-ink-faint leading-snug mt-0.5">{p.d}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══ MEET DOEY ══════════════════════════════════════════ */}
      <section className="py-24 bg-manifesto relative overflow-hidden" id="meet-doey">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/doey-dark-texture.jpg" alt="" aria-hidden="true"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.45, mixBlendMode: 'multiply', zIndex: 0 }} />
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-purple/10 blur-3xl pointer-events-none" style={{ zIndex: 1 }} />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-purple-light/6 blur-3xl pointer-events-none" style={{ zIndex: 1 }} />
        <div className="max-w-6xl mx-auto px-10 grid md:grid-cols-2 gap-16 items-center relative" style={{ zIndex: 2 }}>
          <div className="reveal">
            <span className="flex items-center gap-3 text-xs font-semibold tracking-widest uppercase text-purple-light mb-4">
              <span className="w-8 h-px bg-purple-light inline-block" /> Meet Doey
            </span>
            <h2 className="font-display text-[clamp(36px,4vw,56px)] font-medium leading-[1.1] tracking-tight text-white mb-4">
              The agent<br /><em className="italic text-purple-light">in your loop.</em>
            </h2>
            <p className="text-base leading-relaxed text-white/55 font-light mb-8 max-w-md">
              Doey is the persistent AI coach embedded across every space in Doerfy. To you, Doey is a coach. To the system, Doey is the AI agent in the CIM loop — one identity, one memory, one intelligence on your whole life.
            </p>
            <div className="space-y-5">
              {[
                { title: 'One memory. Every space.', body: 'The Vision you discuss with Doey at design time is the same Vision that informs how Doey helps you prioritize Tasks at execution time. You never re-explain yourself.' },
                { title: 'Embeds the practice.', body: 'Doey\'s primary job is not to do the work for you. It is to help you become the kind of person for whom getting life done is natural — reflexive capture, habitual review, clear commitment.' },
                { title: 'Warm but direct.', body: 'Short sentences. No flattery. Doey asks more than it tells. It talks like a coach who has earned your trust — not a product that wants you to feel good about not doing the work.' },
              ].map(t => (
                <div key={t.title} className="flex gap-3">
                  <span className="w-1 h-full bg-purple-light/30 flex-shrink-0 rounded-full mt-1" />
                  <p className="text-sm text-white/50 leading-relaxed">
                    <strong className="text-white/80 font-medium">{t.title}</strong> {t.body}
                  </p>
                </div>
              ))}
            </div>
            <a href="/meet-doey" className="inline-flex items-center gap-2 text-sm font-medium text-purple-light border-b border-purple-light/30 pb-0.5 hover:border-purple-light transition-all mt-8">
              Read more about Doey <ArrowRight size={14} />
            </a>
          </div>

          {/* Chat demo */}
          <div className="reveal reveal-delay-2">
            <div className="bg-white/4 border border-white/8 rounded-2xl p-5 flex flex-col gap-3">
              <div className="flex items-center gap-3 pb-4 border-b border-white/6">
                <DoeyAvatar size={72} />
                <div>
                  <p className="text-sm font-semibold text-white/85">Doey</p>
                  <p className="text-xs text-green-400">&#9679; Active</p>
                </div>
              </div>
              {[
                { role: 'doey', text: 'You have three items in Doing(7) that haven\'t moved in four days. Which one is blocked, and which one are you avoiding?' },
                { role: 'user', text: 'Honestly, probably avoiding the website draft. I keep saying it needs more thinking.' },
                { role: 'doey', text: '"Needs more thinking" usually means the scope isn\'t clear enough to start. What\'s the first version that would be good enough to share — not finished, just ready?' },
                { role: 'user', text: 'A rough outline, I guess. Maybe 30 minutes of work.' },
                { role: 'doey', text: 'Then that\'s your Do Today(1). Not the website — the outline. When is it happening?' },
              ].map((msg, i) => (
                <div key={i} className={`max-w-[88%] px-4 py-3 rounded-xl text-sm leading-relaxed ${
                  msg.role === 'doey'
                    ? 'bg-white/8 text-white/80 self-start rounded-bl-sm'
                    : 'bg-purple-deep text-white/90 self-end rounded-br-sm ml-auto'
                }`}>
                  {msg.text}
                </div>
              ))}
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded px-3 py-2 mt-1">
                <span className="flex-1 text-xs text-white/25 italic">Talk to Doey&hellip;</span>
                <ArrowRight size={14} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ MANIFESTO ══════════════════════════════════════════ */}
      <section className="py-24 bg-stone relative overflow-hidden" id="manifesto">
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/manifesto-type.jpg" alt="" aria-hidden="true"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.18, mixBlendMode: 'multiply' }} />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-10">
          <div className="text-center mb-16 reveal relative z-10">
            <span className="flex items-center justify-center gap-3 text-xs font-semibold tracking-widest uppercase text-ink-muted mb-4">
              <span className="w-8 h-px bg-bone inline-block" /> The Doer Manifesto
            </span>
            <h2 className="font-display text-[clamp(32px,4vw,52px)] font-normal leading-[1.1] tracking-tight text-ink mb-4">
              Ten principles.<br /><em className="italic text-purple">The bedrock.</em>
            </h2>
            <p className="text-base text-ink-muted font-light max-w-lg mx-auto">
              Doerfy is built on a creed. Not a list of values — a set of beliefs about what a life is for.
            </p>
          </div>

          <div className="border border-bone reveal relative z-10 -mx-4 sm:mx-0">
            <div className="grid md:grid-cols-2">
              {/* Left column: I – V */}
              <div className="md:border-r border-bone">
                {[
                  { num: 'I', title: 'Design the life you truly desire.', excerpt: 'Theme design is the Doer\'s GPS — a clear, adaptable destination set by Vision, Mission, Values, and Strategy. It reroutes. It never loses the destination.' },
                  { num: 'II', title: 'Visualize the life you design.', excerpt: 'Doers keep their Theme stories in front of them — a daily visual connection to their why, where, and how.' },
                  { num: 'III', title: 'Theme all your lives.', excerpt: 'Life has many facets. The Doer\'s Personal, Business, and Spiritual lives are not separate — they are dimensions of one master story.' },
                  { num: 'IV', title: 'Capture the Outcomes and Actions at conception.', excerpt: 'The thought is most alive at the moment it is born. The mind is for designing; the system is for remembering.' },
                  { num: 'V', title: 'Clarify, organize, and prioritize what you capture.', excerpt: 'Capture alone is not enough. The Doer hones discernment — clarifying, organizing, and prioritizing.' },
                ].map((p, i) => (
                  <div key={p.num}
                    className={`group flex items-start gap-3 sm:gap-6 px-4 sm:px-8 py-4 sm:py-7 hover:bg-parchment/60 transition-colors cursor-default ${i < 4 ? 'border-b border-bone' : ''}`}>
                    <span className="font-display text-2xl sm:text-4xl font-medium italic text-purple leading-none w-8 sm:w-20 flex-shrink-0 text-right">{p.num}.</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-display text-base sm:text-xl font-medium text-ink leading-snug mb-1 sm:mb-2">{p.title}</p>
                      <p className="text-sm text-ink-faint group-hover:text-ink-muted font-light leading-relaxed transition-colors duration-200">{p.excerpt}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right column: VI – X */}
              <div>
                {[
                  { num: 'VI', title: 'Focus on and commit to your life design.', excerpt: 'Scattered effort produces scattered results. The Doers focus on their life design like a magnifying glass focuses rays of sunlight. Steady aligned focus produces consistent results.' },
                  { num: 'VII', title: 'Plan, Review, and Do in rhythm.', excerpt: 'The Doer moves between altitudes with intention — up to plan, up to review, back to ground to do. The rhythm is the discipline.' },
                  { num: 'VIII', title: 'Build a team for collective intelligence and effort.', excerpt: 'No one builds a life alone. Every Doer needs a team — selected deliberately to support and hold them accountable.' },
                  { num: 'IX', title: 'Continuously get better at doing.', excerpt: 'Life requires constant calibration, so does the practice of using the Doerfy tools and methods.' },
                  { num: 'X', title: 'Life is a reflection of what you do.', excerpt: 'Not of what you intended. Not of what you imagined. The Doer\'s life is the visible record of the actions taken.' },
                ].map((p, i) => (
                  <div key={p.num}
                    className={`group flex items-start gap-3 sm:gap-6 px-4 sm:px-8 py-4 sm:py-7 hover:bg-parchment/60 transition-colors cursor-default ${i < 4 ? 'border-b border-bone' : ''}`}>
                    <span className="font-display text-2xl sm:text-4xl font-medium italic text-purple leading-none w-8 sm:w-20 flex-shrink-0 text-right">{p.num}.</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-display text-base sm:text-xl font-medium text-ink leading-snug mb-1 sm:mb-2">{p.title}</p>
                      <p className="text-sm text-ink-faint group-hover:text-ink-muted font-light leading-relaxed transition-colors duration-200">{p.excerpt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center mt-12 reveal relative z-10">
            <a href="/manifesto" className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted border-b border-bone pb-0.5 hover:text-ink hover:border-ink-muted transition-all">
              Read the full Manifesto <ArrowRight size={14} />
            </a>
          </div>

        </div>
      </section>

      {/* ══ CALCULATOR ═════════════════════════════════════════ */}
      <section className="py-24 bg-parchment" id="calculator">
        <div className="max-w-6xl mx-auto px-10">
          <div className="mb-12 reveal">
            <span className="flex items-center gap-3 text-xs font-semibold tracking-widest uppercase text-ink-muted mb-4">
              <span className="w-8 h-px bg-bone inline-block" /> The Cost of No Life System
            </span>
            <h2 className="font-display text-[clamp(32px,4vw,52px)] font-medium leading-[1.15] tracking-tight text-ink mb-4 max-w-2xl">
              How many tools does it take<br />to <em className="italic text-purple">not have a life system?</em>
            </h2>
            <p className="text-base text-ink-muted font-light max-w-lg">
              Select the tools you currently pay for. See what you spend. Then see what one system costs instead.
            </p>
          </div>
          <div className="reveal">
            <ValueCalculator />
          </div>
        </div>
      </section>

{/* ══ BETA ═══════════════════════════════════════════════ */}
      <section className="py-24 bg-manifesto-deep relative overflow-hidden" id="beta">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full bg-purple/6 blur-3xl" />
        </div>
        <div className="max-w-6xl mx-auto px-10 grid md:grid-cols-2 gap-16 items-center relative z-10">
          <div className="reveal">
            <span className="flex items-center gap-3 text-xs font-semibold tracking-widest uppercase text-purple-light mb-4">
              <span className="w-8 h-px bg-purple-light inline-block" /> Private Beta
            </span>
            <h2 className="font-display text-[clamp(36px,4vw,56px)] font-normal leading-[1.1] tracking-tight text-white mb-4">
              Begin where you are.<br /><em className="italic text-purple-light">Doey will meet you there.</em>
            </h2>
            <p className="font-display text-lg italic text-white/40 mb-8 leading-relaxed">
              &ldquo;Design. Visualize. Do.&rdquo;
            </p>
            <div className="space-y-3">
              {[
                'Free during the beta period',
                'Early access to Doey, Outcome Space, and Action Space',
                'You help shape the Method as it\'s refined in practice',
                'Invitations sent in cohorts — limited availability',
              ].map(d => (
                <div key={d} className="flex items-center gap-2.5">
                  <span className="w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                  <span className="text-sm text-white/45">{d}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal reveal-delay-2">
            <div
              data-doerfy-form
              data-slug="beta-signup-form-1e59ea"
              data-mode="inline"
            />
          </div>
        </div>
      </section>

      {/* ══ FOOTER ═════════════════════════════════════════════ */}
      <footer className="bg-manifesto-deep border-t border-white/6 py-8">
        <div className="max-w-6xl mx-auto px-10 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <span className="font-display text-base font-semibold text-white/60">Doerfy</span>
            <span className="text-xs text-white/20 tracking-wider">Design. Visualize. Do.</span>
          </div>
          <ul className="flex gap-8 list-none">
            {[
              { label: 'The Method', href: '/method' },
              { label: 'Manifesto', href: '/manifesto' },
              { label: 'Meet Doey', href: '/meet-doey' },
              { label: 'Beta', href: '#beta' },
            ].map(l => (
              <li key={l.label}><a href={l.href} className="text-xs text-white/30 hover:text-white/55 transition-colors">{l.label}</a></li>
            ))}
          </ul>
          <span className="text-xs text-white/18">&copy; 2026 Doerfy</span>
        </div>
      </footer>
      {/* ══ METHODOLOGY LIGHTBOX ══════════════════════════════ */}
      {showMethodModal && (
        <div
          className="fixed inset-0 z-50 bg-manifesto/85 backdrop-blur-sm overflow-auto"
          onClick={() => setShowMethodModal(false)}
        >
          <div className="min-h-full flex justify-center py-10 px-4">
            <div className="relative" onClick={e => e.stopPropagation()}>
              <button
                onClick={() => setShowMethodModal(false)}
                className="absolute -top-9 right-0 flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors"
              >
                Close <span className="text-xl leading-none">×</span>
              </button>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/doerfy_method_infographic.svg"
                alt="Doerfy Method Infographic"
                className="block rounded-xl shadow-2xl"
                style={{ width: '1400px', maxWidth: '90vw' }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
