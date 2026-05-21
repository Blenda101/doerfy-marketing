'use client'

import React, { useEffect, useRef, useState } from 'react'
import ValueCalculator from '@/components/calculator/ValueCalculator'
import { doerfySupabase } from '@/lib/doerfySupabase'

/* ── Doerfy logomark ─────────────────────────────────────────── */
const DoerfyMark = ({ className = 'w-8 h-8' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 171 103" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M82.8 32.5C82.8 32.5 69.4 58.9 47.6 76.5C18.8 99.7 0 103 0 103L52.2 101.3C52.2 101.3 72.9 71.1 82.8 32.5Z" fill="#7C5CFF"/>
    <path d="M88.1 31.8C88.1 31.8 101.6 58.1 123.4 75.7C152.2 98.9 171 102.2 171 102.2L118.8 100.6C118.8 100.6 98.1 70.4 88.1 31.8Z" fill="#7C5CFF"/>
    <path d="M85.8 32.6L67.9 101H102L85.8 32.6Z" fill="#5B47D9"/>
    <circle cx="85.8" cy="21.4" r="4.5" fill="#7C5CFF"/>
    <path d="M87.1 38.2H84.1V0H87.1V38.2Z" fill="#7C5CFF"/>
    <path d="M85.3 6.6L87.1 0H108.2L101.6 6.9L106.7 12.2L86.3 12.7L85.3 6.6Z" fill="#5B47D9"/>
  </svg>
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
    // Hero items visible immediately
    document.querySelectorAll<HTMLElement>('.hero-reveal').forEach(el => el.classList.add('visible'))
    return () => obs.disconnect()
  }, [])
}

/* ═══════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════ */
export default function Home() {
  useReveal()
  const [scrolled, setScrolled] = useState(false)
  const [betaSubmitted, setBetaSubmitted] = useState(false)
  const [betaEmail, setBetaEmail] = useState('')
  const [betaName, setBetaName] = useState('')
  const [betaFocus, setBetaFocus] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleBetaSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!betaEmail) return
    try {
      const { error } = await doerfySupabase.from('marketing_leads').insert({
        email: betaEmail,
        source: 'doerfy_marketing_homepage',
        lead_type: 'beta',
        status: 'new',
        cohort_tags: ['beta_2026'],
        survey_data: {
          first_name: betaName || null,
          primary_focus: betaFocus || null,
        },
      })
      if (error) {
        // Duplicate email = already on the list; other errors log but don't block UX
        if (error.code !== '23505') {
          console.error('Beta signup error:', error.message)
        }
      }
    } catch (err) {
      console.error('Beta signup failed:', err)
    }
    setBetaSubmitted(true)
  }

  return (
    <>
      {/* ══ NAV ════════════════════════════════════════════════ */}
      <nav className={`fixed top-0 left-0 right-0 z-50 bg-parchment/92 backdrop-blur-md border-b border-bone transition-shadow ${scrolled ? 'shadow-sm' : ''}`}>
        <div className="max-w-6xl mx-auto px-10 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <DoerfyMark />
            <span className="font-display text-xl font-bold text-ink tracking-tight">Doerfy</span>
          </a>
          <ul className="hidden md:flex items-center gap-10 list-none">
            {['How it Works', 'The Method', 'The Manifesto', 'Meet Doey'].map(label => (
              <li key={label}>
                <a href={`#${label.toLowerCase().replace(/\s+/g, '-').replace(/the-/g, '')}`}
                  className="text-sm text-ink-muted hover:text-ink transition-colors">{label}</a>
              </li>
            ))}
          </ul>
          <a href="#beta" className="flex items-center gap-2 bg-manifesto text-white text-sm font-medium px-5 py-2.5 rounded hover:bg-manifesto-mid transition-colors">
            Join the Beta <ArrowRight size={14} />
          </a>
        </div>
      </nav>

      {/* ══ HERO ═══════════════════════════════════════════════ */}
      <section className="min-h-svh flex items-stretch bg-parchment pt-16">
        <div className="w-full grid md:grid-cols-[55fr_45fr]">
          {/* Left */}
          <div className="flex flex-col justify-center px-10 py-24 max-w-2xl ml-auto mr-0">
            <div className="flex items-center gap-2 mb-10 reveal hero-reveal">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse-slow" />
              <span className="text-xs font-semibold tracking-widest uppercase text-purple">Beta &mdash; Coming Soon</span>
            </div>
            <h1 className="font-display text-[clamp(48px,6vw,80px)] font-medium leading-[1.08] tracking-tight text-ink mb-8 reveal hero-reveal reveal-delay-1">
              Design the life<br /><em className="italic text-purple">you truly desire.</em>
            </h1>
            <p className="text-lg leading-relaxed text-ink-muted font-light max-w-lg mb-10 reveal hero-reveal reveal-delay-2">
              Doerfy is software built on a framework for life design. You get an AI coach named Doey, a system that connects your Vision to your daily work, and a practice that compounds over time.
            </p>
            <div className="flex items-center gap-6 flex-wrap reveal hero-reveal reveal-delay-3">
              <a href="#beta" className="flex items-center gap-2 bg-purple-deep hover:bg-purple text-white px-7 py-3.5 rounded text-sm font-medium transition-all hover:-translate-y-px">
                Join the Beta <ArrowRight />
              </a>
              <a href="#manifesto" className="flex items-center gap-2 text-sm text-ink-muted border-b border-bone pb-0.5 hover:text-ink hover:border-ink-muted transition-all">
                Read the Manifesto <ArrowRight size={14} />
              </a>
            </div>
          </div>

          {/* Right — dark panel with editorial image */}
          <div className="hidden md:flex flex-col justify-center bg-manifesto px-10 py-24 relative overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/hero-editorial.jpg" alt="" aria-hidden="true"
              style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', opacity:0.35, mixBlendMode:'luminosity' }} />
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-purple/10 blur-3xl pointer-events-none z-10" />
            <div className="space-y-0 mb-12 relative z-10">
              {[
                { num: 'I', word: 'Design', em: true, desc: 'Theme · Vision · Strategy' },
                { num: 'II', word: 'Visualize', em: false, desc: 'Story · Goals' },
                { num: 'III', word: 'Do', em: false, desc: 'Outcomes · Actions' },
              ].map(item => (
                <div key={item.num} className="flex items-baseline gap-6 py-6 border-b border-white/8 last:border-0">
                  <span className="text-xs font-medium tracking-widest text-purple-light/60 w-6">{item.num}</span>
                  <span className={`font-display text-[clamp(32px,4vw,52px)] leading-none ${item.em ? 'italic text-purple-light' : 'text-white'}`}>
                    {item.word}
                  </span>
                  <span className="text-xs text-white/30 tracking-wider ml-auto">{item.desc}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-white/8 pt-6 relative z-10">
              <p className="text-xs font-semibold tracking-widest uppercase text-white/25 mb-2">Manifesto — Principle I</p>
              <p className="font-display text-sm italic text-white/55 leading-relaxed">
                "A life that is not designed is a life that is defaulted into. The Doer chooses. The Doer authors."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ POSITIONING STRIP ══════════════════════════════════ */}
      <div className="bg-purple-ultra border-y border-purple-pale py-8">
        <div className="max-w-6xl mx-auto px-10 flex items-center justify-center gap-16 flex-wrap">
          <p className="font-display text-[clamp(18px,2.5vw,26px)] text-manifesto text-center">
            Most software manages your work.<br />
            <em className="italic text-purple">Doerfy designs your life.</em>
          </p>
          <div className="hidden lg:block w-px h-8 bg-purple-pale" />
          <p className="text-sm text-ink-muted font-light max-w-xs text-center">
            Powered by the Doerfy Method — a framework for intentional living built into every feature.
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
                Three things.<br /><em className="italic text-purple">One practice.</em>
              </h2>
            </div>
            <p className="text-base leading-relaxed text-ink-muted font-light max-w-md ml-auto">
              Doerfy is not a task manager with extra steps. It begins with your Vision and ends with your daily work — connected, committed, and in rhythm.
            </p>
          </div>

          <div className="reveal">
            {[
              {
                num: '01', tag: 'Design Phase — Theme Builder',
                title: 'Design your Theme.',
                body: 'Before you manage tasks, you author your life. A Theme is the master story that unifies your career, health, relationships, and craft — not as separate tabs, but as one life lived on purpose. The Four ACTs (Vision, Mission, Values, Strategy) give your Theme structure. Doey helps you find yours.',
                visual: (
                  <div className="bg-manifesto rounded-xl p-5 h-full flex flex-col justify-center">
                    <p className="text-xs font-semibold tracking-widest uppercase text-purple-light mb-3">Current Theme</p>
                    <p className="font-display text-lg italic text-white mb-4">&ldquo;The Year of Deep Work&rdquo;</p>
                    <div className="flex flex-wrap gap-2">
                      {['Act I: Vision', 'Act II: Mission', 'Act III: Values', 'Act IV: Strategy'].map(a => (
                        <span key={a} className="text-xs text-white/50 bg-white/10 border border-white/10 px-2 py-1 rounded">{a}</span>
                      ))}
                    </div>
                  </div>
                ),
              },
              {
                num: '02', tag: 'Outcome Space — Pyramid',
                title: 'Organize your Outcomes.',
                body: 'The Outcome Pyramid gives every commitment a place. At the top: your Theme. Below it: the Mega Dos that define who you are becoming. Below those: Projects that ship. At the base: Todos that feed them. Nothing floats. Everything connects to what you designed.',
                visual: (
                  <div className="bg-stone border border-bone rounded-xl p-5 flex flex-col justify-center gap-1.5">
                    {[
                      { label: 'Theme', w: '40%', bg: 'bg-purple-deep' },
                      { label: 'Mega Do', w: '60%', bg: 'bg-purple' },
                      { label: 'Project', w: '78%', bg: 'bg-purple-light' },
                      { label: 'Todo Queue', w: '100%', bg: 'bg-purple-pale', text: 'text-purple-deep' },
                    ].map(row => (
                      <div key={row.label} style={{ width: row.w }} className={`h-7 ${row.bg} rounded flex items-center px-2.5`}>
                        <span className={`text-xs font-medium ${row.text || 'text-white'}`}>{row.label}</span>
                      </div>
                    ))}
                  </div>
                ),
              },
              {
                num: '03', tag: 'Action Space — Funnel',
                title: 'Commit and execute.',
                body: 'The Action Funnel moves your work from possibility to done. Each stage narrows commitment: from your full queue to seven weekly tasks, from seven to one daily focus, from one to what you do right now. Doers don\'t drift. The Funnel ensures they don\'t.',
                visual: (
                  <div className="bg-stone border border-bone rounded-xl p-5 flex flex-col justify-center gap-1.5">
                    {[
                      { label: 'Todo Queue', color: 'bg-purple-pale', active: false },
                      { label: 'Do Queue', color: 'bg-purple-pale', active: false },
                      { label: 'Do(30) — this month', color: 'bg-purple-light', active: false },
                      { label: 'Doing(7) — this week', color: 'bg-purple', active: true },
                      { label: 'Do Today(1)', color: 'bg-purple-deep', active: true },
                      { label: 'Do Now', color: 'bg-manifesto', active: false },
                      { label: 'Done', color: 'bg-green-500', active: false },
                    ].map(step => (
                      <div key={step.label} className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${step.color}`} />
                        <span className={`text-xs ${step.active ? 'font-semibold text-purple-deep' : 'text-ink-muted'}`}>{step.label}</span>
                      </div>
                    ))}
                  </div>
                ),
              },
            ].map(item => (
              <div key={item.num} className="grid md:grid-cols-[64px_1fr_1fr] gap-8 items-start py-8 border-t border-bone last:border-b">
                <span className="font-display text-sm text-ink-faint pt-1">{item.num}</span>
                <div>
                  <span className="inline-flex items-center text-xs font-semibold tracking-widest uppercase text-purple-deep bg-purple-ultra px-2.5 py-1 rounded mb-4">{item.tag}</span>
                  <h3 className="font-display text-[clamp(22px,2.5vw,30px)] font-medium text-ink mb-3 leading-tight">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-ink-muted font-light">{item.body}</p>
                </div>
                <div className="min-h-40">{item.visual}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ MEET DOEY ══════════════════════════════════════════ */}
      <section className="py-24 bg-manifesto relative overflow-hidden" id="meet-doey">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/doey-dark-texture.jpg" alt="" aria-hidden="true"
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', opacity:0.45, mixBlendMode:'multiply', zIndex:0 }} />
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-purple/10 blur-3xl pointer-events-none" style={{zIndex:1}} />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-purple-light/6 blur-3xl pointer-events-none" style={{zIndex:1}} />
        <div className="max-w-6xl mx-auto px-10 grid md:grid-cols-2 gap-16 items-center relative" style={{zIndex:2}}>
          <div className="reveal">
            <span className="flex items-center gap-3 text-xs font-semibold tracking-widest uppercase text-purple-light mb-4">
              <span className="w-8 h-px bg-purple-light inline-block" /> Meet Doey
            </span>
            <h2 className="font-display text-[clamp(36px,4vw,56px)] font-medium leading-[1.1] tracking-tight text-white mb-4">
              Your coach.<br /><em className="italic text-purple-light">Not a chatbot.</em>
            </h2>
            <p className="text-base leading-relaxed text-white/55 font-light mb-8 max-w-md">
              Doey knows your Theme, your Outcomes, your patterns, and your commitments. Doey asks more than it tells. It holds the structure so you can focus on the work.
            </p>
            <div className="space-y-5">
              {[
                { title: 'Persistent across all spaces.', body: 'Doey remembers your Vision when you\'re buried in a task, and remembers the task when you\'re dreaming about the future.' },
                { title: 'Framework-first.', body: 'Doey operates within the Doerfy Method. It won\'t tell you to hustle harder. It will ask where that aligns with your Theme.' },
                { title: 'Warm but direct.', body: 'Short sentences. No flattery. Doey talks like a coach who has earned your trust — not a product that wants you to feel good about not doing the work.' },
              ].map(t => (
                <div key={t.title} className="flex gap-3">
                  <span className="w-1 h-full bg-purple-light/30 flex-shrink-0 rounded-full mt-1" />
                  <p className="text-sm text-white/50 leading-relaxed">
                    <strong className="text-white/80 font-medium">{t.title}</strong> {t.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Chat demo */}
          <div className="reveal reveal-delay-2">
            <div className="bg-white/4 border border-white/8 rounded-2xl p-5 flex flex-col gap-3">
              <div className="flex items-center gap-3 pb-4 border-b border-white/6">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple to-purple-light flex items-center justify-center">
                  <span className="font-display italic text-sm text-white font-semibold">D</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white/85">Doey</p>
                  <p className="text-xs text-green-400">&#9679; Active</p>
                </div>
              </div>
              {[
                { role: 'doey', text: 'You have three items in Doing(7) that haven\'t moved in four days. Which one is blocked, and which one are you avoiding?' },
                { role: 'user', text: 'Honestly, probably avoiding the website draft. I keep saying it needs more thinking.' },
                { role: 'doey', text: '"Needs more thinking" usually means the scope isn\'t clear enough to start. What\'s the first version of this that would be good enough to share — not finished, just ready?' },
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
            style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', opacity:0.18, mixBlendMode:'multiply' }} />
        </div>
        <div className="max-w-6xl mx-auto px-10">
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

          <div className="grid md:grid-cols-2 border border-bone reveal relative z-10">
            {[
              { num: 'I.', title: 'Design the life you truly desire.', excerpt: 'A life that is not designed is a life that is defaulted into. Before anything else — before the goals, before the work — the Doer answers the only question that matters.' },
              { num: 'II.', title: 'Visualize what you have designed.', excerpt: 'A vision unseen will not be lived. What is rendered is remembered. What is remembered is pursued.' },
              { num: 'III.', title: 'Live by Theme.', excerpt: 'Career, family, health, craft — these are not separate lives competing for attention. They are domains within the one life the Theme designs.' },
              { num: 'X.', title: 'Life is a reflection of what you do.', excerpt: 'Not of what you intended. Not of what you imagined. The Doer\'s life is the visible record of the actions taken, the work shipped, the days lived.' },
            ].map((p, i) => (
              <div key={p.num} className={`p-8 border-bone hover:bg-linen transition-colors ${i % 2 === 0 ? 'border-r' : ''} ${i < 2 ? 'border-b' : ''}`}>
                <p className="font-display text-sm italic text-purple mb-3">{p.num}</p>
                <h3 className="font-display text-xl font-medium text-ink mb-2 leading-snug">{p.title}</h3>
                <p className="text-sm text-ink-muted leading-relaxed font-light">{p.excerpt}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 pt-8 border-t border-bone reveal relative z-10">
            <p className="text-sm text-ink-muted mb-4">Showing 4 of <strong className="text-ink font-medium">10 principles</strong></p>
            <a href="/manifesto" className="inline-flex items-center gap-2 text-sm font-medium text-purple-deep border-b border-purple-pale pb-0.5 hover:border-purple hover:text-purple transition-all">
              Read all ten principles <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* ══ THE METHOD ═════════════════════════════════════════ */}
      <section className="py-24 bg-parchment" id="the-method">
        <div className="max-w-6xl mx-auto px-10">
          <div className="mb-16 reveal">
            <span className="flex items-center gap-3 text-xs font-semibold tracking-widest uppercase text-purple mb-4">
              <span className="w-8 h-px bg-purple inline-block" /> The Doerfy Method
            </span>
            <h2 className="font-display text-[clamp(36px,4vw,52px)] font-medium leading-[1.1] tracking-tight text-ink mb-4">
              Design. Visualize. <em className="italic text-purple">Do.</em>
            </h2>
            <p className="text-base text-ink-muted font-light max-w-xl">
              Two structures do the heavy lifting. The Outcome Pyramid holds what you are building. The Action Funnel moves your best work to front and center, every day.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 reveal">
            {/* Pyramid */}
            <div className="bg-stone border border-bone rounded-2xl p-6">
              <p className="text-xs font-semibold tracking-widest uppercase text-purple mb-1">Outcome Space</p>
              <h3 className="font-display text-2xl font-medium text-ink mb-1">The Outcome Pyramid</h3>
              <p className="text-sm text-ink-muted font-light mb-6">From Theme to Todo — everything connected.</p>
              <svg viewBox="0 0 480 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                <path d="M240 20L150 74L330 74Z" fill="#5B47D9"/>
                <text x="240" y="53" textAnchor="middle" fontFamily="Georgia,serif" fontSize="13" fontStyle="italic" fill="white">Theme</text>
                <path d="M150 82L80 136L400 136Z" fill="#7C5CFF"/>
                <text x="240" y="116" textAnchor="middle" fontFamily="Georgia,serif" fontSize="13" fontStyle="italic" fill="white">Mega Do</text>
                <path d="M80 144L28 198L452 198Z" fill="#A78BFA"/>
                <text x="240" y="178" textAnchor="middle" fontFamily="Georgia,serif" fontSize="13" fill="white">Project</text>
                <rect x="20" y="206" width="440" height="48" rx="4" fill="#EDE6FF"/>
                <text x="240" y="235" textAnchor="middle" fontFamily="Georgia,serif" fontSize="13" fill="#5B47D9">Todo Queue</text>
                <text x="20" y="274" fontFamily="DM Sans,sans-serif" fontSize="11" fill="#8D8AA0">Identity outcomes at apex. Daily work at the base.</text>
              </svg>
            </div>

            {/* Funnel */}
            <div className="bg-stone border border-bone rounded-2xl p-6">
              <p className="text-xs font-semibold tracking-widest uppercase text-purple mb-1">Action Space</p>
              <h3 className="font-display text-2xl font-medium text-ink mb-1">The Action Funnel</h3>
              <p className="text-sm text-ink-muted font-light mb-6">Seven stages. Narrowing commitment to what matters now.</p>
              <svg viewBox="0 0 480 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                <rect x="20" y="20" width="440" height="30" rx="4" fill="#C4B5FD" fillOpacity="0.4"/>
                <text x="240" y="40" textAnchor="middle" fontFamily="DM Sans,sans-serif" fontSize="11" fill="#5B47D9" fontWeight="500">Todo Queue</text>
                <rect x="44" y="58" width="392" height="30" rx="4" fill="#C4B5FD" fillOpacity="0.55"/>
                <text x="240" y="78" textAnchor="middle" fontFamily="DM Sans,sans-serif" fontSize="11" fill="#5B47D9" fontWeight="500">Do Queue</text>
                <rect x="72" y="96" width="336" height="30" rx="4" fill="#A78BFA" fillOpacity="0.65"/>
                <text x="240" y="116" textAnchor="middle" fontFamily="DM Sans,sans-serif" fontSize="11" fill="white" fontWeight="500">Do(30) — this month</text>
                <rect x="104" y="134" width="272" height="34" rx="4" fill="#7C5CFF"/>
                <text x="240" y="156" textAnchor="middle" fontFamily="DM Sans,sans-serif" fontSize="12" fill="white" fontWeight="600">Doing(7) — this week</text>
                <rect x="140" y="176" width="200" height="34" rx="4" fill="#5B47D9"/>
                <text x="240" y="198" textAnchor="middle" fontFamily="DM Sans,sans-serif" fontSize="12" fill="white" fontWeight="600">Do Today(1)</text>
                <rect x="172" y="218" width="136" height="28" rx="4" fill="#2D2A4A"/>
                <text x="240" y="237" textAnchor="middle" fontFamily="DM Sans,sans-serif" fontSize="11" fill="rgba(255,255,255,0.8)" fontWeight="500">Do Now</text>
                <rect x="200" y="254" width="80" height="24" rx="4" fill="#10B981"/>
                <text x="240" y="271" textAnchor="middle" fontFamily="DM Sans,sans-serif" fontSize="11" fill="white" fontWeight="600">Done</text>
              </svg>
            </div>
          </div>

          <div className="text-center mt-8 reveal">
            <a href="/method" className="inline-flex items-center gap-2 text-sm font-medium text-purple-deep border-b border-purple-pale pb-0.5 hover:border-purple hover:text-purple transition-all">
              Explore the full Method <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* ══ CALCULATOR ═════════════════════════════════════════ */}
      <section className="py-24 bg-stone" id="calculator">
        <div className="max-w-6xl mx-auto px-10">
          <div className="mb-12 reveal">
            <span className="flex items-center gap-3 text-xs font-semibold tracking-widest uppercase text-ink-muted mb-4">
              <span className="w-8 h-px bg-bone inline-block" /> The Cost of No System
            </span>
            <h2 className="font-display text-[clamp(32px,4vw,52px)] font-medium leading-[1.15] tracking-tight text-ink mb-4 max-w-2xl">
              How many tools does it take<br />to <em className="italic text-purple">not have a system?</em>
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
            <div className="bg-white/4 border border-white/8 rounded-2xl p-8">
              {betaSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center mx-auto mb-4">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10l5 5 7-8" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <h3 className="font-display text-xl font-medium text-white mb-2">Request received.</h3>
                  <p className="text-sm text-white/45">You&rsquo;re on the list. We&rsquo;ll be in touch when your cohort opens.</p>
                </div>
              ) : (
                <>
                  <h3 className="font-display text-2xl font-medium text-white mb-1">Request early access.</h3>
                  <p className="text-sm text-white/40 mb-6 font-light">Tell us where you are. Doey will be ready.</p>
                  <form onSubmit={handleBetaSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold tracking-widest uppercase text-white/35 mb-1.5">Email address</label>
                      <input type="email" required value={betaEmail} onChange={e => setBetaEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full bg-white/6 border border-white/12 rounded px-4 py-3 text-white/85 text-sm placeholder-white/25 outline-none focus:border-purple-light transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold tracking-widest uppercase text-white/35 mb-1.5">First name</label>
                      <input type="text" value={betaName} onChange={e => setBetaName(e.target.value)}
                        placeholder="Your first name"
                        className="w-full bg-white/6 border border-white/12 rounded px-4 py-3 text-white/85 text-sm placeholder-white/25 outline-none focus:border-purple-light transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold tracking-widest uppercase text-white/35 mb-1.5">Primary focus</label>
                      <select value={betaFocus} onChange={e => setBetaFocus(e.target.value)}
                        className="w-full bg-white/6 border border-white/12 rounded px-4 py-3 text-white/60 text-sm outline-none focus:border-purple-light transition-colors appearance-none">
                        <option value="" disabled>Where do you most want to improve?</option>
                        <option value="vision">Building a clear Vision for my life</option>
                        <option value="organization">Organizing my work and goals</option>
                        <option value="execution">Executing consistently on what matters</option>
                        <option value="rhythm">Building better daily and weekly habits</option>
                        <option value="all">All of the above</option>
                      </select>
                    </div>
                    <button type="submit"
                      className="w-full flex items-center justify-center gap-2 bg-purple-deep hover:bg-purple text-white py-3.5 rounded text-sm font-medium transition-all hover:-translate-y-px mt-2">
                      Request Early Access <ArrowRight />
                    </button>
                  </form>
                  <p className="text-center text-xs text-white/20 mt-4">No credit card. No commitments. Just the Method.</p>
                </>
              )}
            </div>
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
            {['The Method', 'Manifesto', 'Meet Doey', 'About', 'Beta'].map(l => (
              <li key={l}><a href={`/${l.toLowerCase().replace(/\s+/g, '-')}`} className="text-xs text-white/30 hover:text-white/55 transition-colors">{l}</a></li>
            ))}
          </ul>
          <span className="text-xs text-white/18">&copy; 2026 Doerfy</span>
        </div>
      </footer>
    </>
  )
}
