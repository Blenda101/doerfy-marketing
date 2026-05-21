import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'The Doerfy Method — Design. Visualize. Do.',
  description:
    'A complete framework — tools, methods, and practices — for designing the life you truly desire and actually living it. Three phases, ten principles, one persistent coach.',
  openGraph: {
    title: 'The Doerfy Method — Design. Visualize. Do.',
    description: 'Three phases. One sequence. Lived in rhythm.',
  },
}

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function MethodPage() {
  return (
    <>
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-parchment/92 backdrop-blur-md border-b border-bone">
        <div className="max-w-6xl mx-auto px-10 h-16 flex items-center justify-between">
          <Link href="/" className="font-display text-xl font-bold text-ink tracking-tight">Doerfy</Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/manifesto" className="text-sm text-ink-muted hover:text-ink transition-colors">Manifesto</Link>
            <Link href="/meet-doey" className="text-sm text-ink-muted hover:text-ink transition-colors">Meet Doey</Link>
          </div>
          <Link href="/#beta" className="flex items-center gap-2 bg-manifesto text-white text-sm font-medium px-5 py-2.5 rounded hover:bg-manifesto-mid transition-colors">
            Join the Beta
          </Link>
        </div>
      </nav>

      <main className="bg-parchment pt-16">

        {/* Hero */}
        <section className="max-w-3xl mx-auto px-10 pt-20 pb-16">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-purple mb-6">The Doerfy Method</span>
          <h1 className="font-display text-[clamp(40px,5vw,72px)] font-medium leading-[1.08] tracking-tight text-ink mb-6">
            Design.<br />Visualize.<br /><em className="italic text-purple">Do.</em>
          </h1>
          <p className="text-lg leading-relaxed text-ink-muted font-light max-w-xl">
            A complete framework — tools, methods, and practices — for designing the life you truly desire and actually living it.
          </p>
        </section>

        {/* Problem */}
        <section className="bg-stone border-y border-bone py-20">
          <div className="max-w-3xl mx-auto px-10">
            <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-medium text-ink leading-[1.15] mb-8">
              Most productivity tools solve<br />the wrong problem.
            </h2>
            <p className="text-base leading-relaxed text-ink-muted font-light mb-6">
              You don't need another inbox. You don't need another goal-setting app. You don't need a smarter to-do list.
              You need a way to know — at the end of a long week — whether you spent the hours on the life you actually want.
            </p>
            <p className="text-base leading-relaxed text-ink-muted font-light mb-10">
              Most productivity tools are designed to make you <em>more efficient.</em> The Doerfy Method is designed to make you
              <em> more intentional.</em> Those aren't the same thing. You can be brutally efficient at the wrong work, and many ambitious people are.
            </p>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                {
                  title: 'The vision-execution gap',
                  body: 'People who can articulate inspiring visions can\'t translate them into the work of an ordinary Tuesday. Productivity apps live downstream of the gap — they help you do something without ever asking whether the something is the right something.',
                },
                {
                  title: 'The capture-overwhelm spiral',
                  body: 'People who capture rigorously end up drowning in inboxes, lists, and tags. The system that promised relief becomes another job. They quit the system rather than admit it failed.',
                },
                {
                  title: 'The planning-paralysis loop',
                  body: 'People who plan well plan too much. They spend their week reviewing, reorganizing, re-prioritizing — visiting the highest altitude of the work but never coming down to do it.',
                },
              ].map(item => (
                <div key={item.title} className="bg-parchment border border-bone rounded-xl p-5">
                  <h3 className="font-display text-base font-medium text-ink mb-2 leading-snug">{item.title}</h3>
                  <p className="text-sm text-ink-muted font-light leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Three Phases */}
        <section className="py-20">
          <div className="max-w-3xl mx-auto px-10">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-purple mb-6">Three phases. One sequence.</span>
            <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-medium text-ink leading-[1.15] mb-14">
              Lived in rhythm.
            </h2>

            {/* Design */}
            <div className="grid md:grid-cols-[80px_1fr] gap-8 pb-16 border-b border-bone mb-16">
              <div className="flex flex-col items-start pt-1">
                <span className="font-display text-[clamp(48px,6vw,80px)] font-medium italic text-purple/20 leading-none">I</span>
              </div>
              <div>
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-purple bg-purple-ultra px-2.5 py-1 rounded mb-4">Design Phase — Theme Builder</span>
                <h3 className="font-display text-[clamp(26px,3vw,38px)] font-medium text-ink leading-[1.1] mb-4">Design</h3>
                <p className="font-display text-base italic text-ink-muted mb-5">Discover and author the life you truly desire.</p>
                <p className="text-base leading-relaxed text-ink-muted font-light mb-5">
                  Most lives are inherited from circumstance. The Doer chooses. Working with Doey, our persistent AI coach,
                  you walk through the <strong className="font-medium text-ink">Four ACTs of Life Design</strong> — Vision, Mission, Values, and Strategy —
                  using a Socratic conversation grounded in the deepest coaching traditions. The output is a written <strong className="font-medium text-ink">Script</strong> — your master story.
                </p>
                <div className="bg-manifesto rounded-xl p-5">
                  <p className="text-xs font-semibold tracking-widest uppercase text-purple-light mb-4">The Four ACTs</p>
                  <div className="space-y-3">
                    {[
                      { act: 'Act I', name: 'Vision', desc: 'Your 5–10 year picture. The life you are building.' },
                      { act: 'Act II', name: 'Mission', desc: 'Your 3–5 year campaign toward that Vision.' },
                      { act: 'Act III', name: 'Values', desc: 'The principles that govern how you work across every domain.' },
                      { act: 'Act IV', name: 'Strategy', desc: 'The keystone. How you specifically execute this year.' },
                    ].map(a => (
                      <div key={a.act} className="flex items-baseline gap-3">
                        <span className="text-xs text-purple-light/50 w-12 flex-shrink-0 font-medium">{a.act}</span>
                        <span className="font-display text-sm italic text-white/70">{a.name}</span>
                        <span className="text-xs text-white/30 ml-auto hidden md:block">{a.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Visualize */}
            <div className="grid md:grid-cols-[80px_1fr] gap-8 pb-16 border-b border-bone mb-16">
              <div className="flex flex-col items-start pt-1">
                <span className="font-display text-[clamp(48px,6vw,80px)] font-medium italic text-purple/20 leading-none">II</span>
              </div>
              <div>
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-purple bg-purple-ultra px-2.5 py-1 rounded mb-4">Story · Goals · Storyboards</span>
                <h3 className="font-display text-[clamp(26px,3vw,38px)] font-medium text-ink leading-[1.1] mb-4">Visualize</h3>
                <p className="font-display text-base italic text-ink-muted mb-5">Make the design seeable, and keep it visible.</p>
                <p className="text-base leading-relaxed text-ink-muted font-light mb-5">
                  A vision unseen will not be lived. Doerfy renders your designed life as Storyboards, banners, and Movies you can watch.
                  Your Goals become trackable, instrumented commitments. Visualization is not a phase that ends — it is a quality that
                  runs through every layer of the Method, keeping the design alive while you work.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Theme Visual Story', desc: 'Storyboards, banners, Movies — the designed life rendered and watchable.' },
                    { label: 'Goals & Habits', desc: 'Strategy outputs as instrumented, trackable commitments with a cadence.' },
                  ].map(v => (
                    <div key={v.label} className="bg-stone border border-bone rounded-xl p-4">
                      <p className="font-medium text-sm text-ink mb-1.5">{v.label}</p>
                      <p className="text-xs text-ink-muted font-light leading-relaxed">{v.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Do */}
            <div className="grid md:grid-cols-[80px_1fr] gap-8">
              <div className="flex flex-col items-start pt-1">
                <span className="font-display text-[clamp(48px,6vw,80px)] font-medium italic text-purple/20 leading-none">III</span>
              </div>
              <div>
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-purple bg-purple-ultra px-2.5 py-1 rounded mb-4">Outcome Space · Action Space · Improvement</span>
                <h3 className="font-display text-[clamp(26px,3vw,38px)] font-medium text-ink leading-[1.1] mb-4">Do</h3>
                <p className="font-display text-base italic text-ink-muted mb-5">Plan the work, then act on the work.</p>
                <p className="text-base leading-relaxed text-ink-muted font-light">
                  Doing happens in two structural spaces with one improvement loop running across them.
                  The <strong className="font-medium text-ink">Outcome Space</strong> decomposes your Theme into the work you are building.
                  The <strong className="font-medium text-ink">Action Space</strong> moves that work from possibility to done.
                  The <strong className="font-medium text-ink">Improvement Space</strong> is the practice of getting better at both.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Architecture — Pyramid + Funnel */}
        <section className="bg-stone border-y border-bone py-20">
          <div className="max-w-5xl mx-auto px-10">
            <div className="mb-12">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-purple mb-4">The Architecture</span>
              <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-medium text-ink leading-[1.15]">
                Two structures. One system.
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Outcome Pyramid */}
              <div className="bg-parchment border border-bone rounded-2xl p-6">
                <p className="text-xs font-semibold tracking-widest uppercase text-purple mb-1">Outcome Space</p>
                <h3 className="font-display text-2xl font-medium text-ink mb-1">The Outcome Pyramid</h3>
                <p className="text-sm text-ink-muted font-light mb-6">From Theme to Todo — everything connected.</p>
                <svg viewBox="0 0 480 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full mb-6">
                  <path d="M240 20L150 74L330 74Z" fill="#5B47D9"/>
                  <text x="240" y="53" textAnchor="middle" fontFamily="Georgia,serif" fontSize="13" fontStyle="italic" fill="white">Theme</text>
                  <path d="M150 82L80 136L400 136Z" fill="#7C5CFF"/>
                  <text x="240" y="116" textAnchor="middle" fontFamily="Georgia,serif" fontSize="13" fontStyle="italic" fill="white">Mega Do</text>
                  <path d="M80 144L28 198L452 198Z" fill="#A78BFA"/>
                  <text x="240" y="178" textAnchor="middle" fontFamily="Georgia,serif" fontSize="13" fill="white">Project</text>
                  <rect x="20" y="206" width="440" height="48" rx="4" fill="#EDE6FF"/>
                  <text x="240" y="235" textAnchor="middle" fontFamily="Georgia,serif" fontSize="13" fill="#5B47D9">Todo</text>
                </svg>
                <div className="space-y-3">
                  {[
                    { name: 'Theme', desc: 'Your master story. The apex of the pyramid.' },
                    { name: 'Mega Do', desc: 'Identity-level outcomes. Who you are becoming.' },
                    { name: 'Project', desc: 'Shippable deliverables. Finite, bounded, done.' },
                    { name: 'Todo', desc: 'Work streams within a Project. Bridge to the Action Space.' },
                  ].map(l => (
                    <div key={l.name} className="flex items-baseline gap-3">
                      <span className="font-display text-sm italic text-purple w-20 flex-shrink-0">{l.name}</span>
                      <span className="text-xs text-ink-muted font-light">{l.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Funnel */}
              <div className="bg-parchment border border-bone rounded-2xl p-6">
                <p className="text-xs font-semibold tracking-widest uppercase text-purple mb-1">Action Space</p>
                <h3 className="font-display text-2xl font-medium text-ink mb-1">The Action Funnel</h3>
                <p className="text-sm text-ink-muted font-light mb-6">Seven stages. Narrowing commitment to what matters now.</p>
                <svg viewBox="0 0 480 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full mb-6">
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
                <p className="text-sm text-ink-muted font-light leading-relaxed">
                  Each stage narrows commitment: from your full queue to seven this week, from seven to one today, from one to what you do right now.
                  Doers don&rsquo;t drift. The Funnel ensures they don&rsquo;t.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Improvement Space */}
        <section className="py-20">
          <div className="max-w-3xl mx-auto px-10">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-purple mb-6">Improvement Space</span>
            <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-medium text-ink leading-[1.15] mb-6">
              Capture. Stage. <em className="italic text-purple">Deliver.</em>
            </h2>
            <p className="text-base leading-relaxed text-ink-muted font-light mb-10">
              The third dimension of Doerfy operates <em>across</em> the Outcome and Action Spaces — improving the Doer's use of both.
              Three columns. Two names. One practice.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  operational: 'Capture',
                  philosophical: 'Conception',
                  desc: 'Get thoughts out of your head the moment they appear. No filtering, no judging. The mind is for designing; the system is for remembering.',
                },
                {
                  operational: 'Stage',
                  philosophical: 'Discernment',
                  desc: 'Clarify, organize, prioritize, and commit what you captured. The wisdom act of distinguishing signal from noise.',
                },
                {
                  operational: 'Deliver',
                  philosophical: 'Cadence',
                  desc: 'Execute across three altitudes — Plan (10k ft), Review (5k ft), Do (ground) — in the rhythm that keeps the system honest.',
                },
              ].map(col => (
                <div key={col.operational} className="bg-stone border border-bone rounded-xl p-5">
                  <p className="font-display text-xl font-medium text-ink mb-0.5">{col.operational}</p>
                  <p className="font-display text-sm italic text-purple mb-3">{col.philosophical}</p>
                  <p className="text-sm text-ink-muted font-light leading-relaxed">{col.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The Cadence */}
        <section className="bg-stone border-y border-bone py-20">
          <div className="max-w-3xl mx-auto px-10">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-purple mb-6">The Doerfy Cadence</span>
            <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-medium text-ink leading-[1.15] mb-6">
              Five rhythms that make<br />the Method a practice.
            </h2>
            <p className="text-base leading-relaxed text-ink-muted font-light mb-10">
              A methodology that isn&rsquo;t practiced is just a diagram. The Cadence turns the Method into a life.
            </p>
            <div className="space-y-0">
              {[
                { name: 'The Daily', time: '5 min morning + 3 min evening', altitude: '0 ft — ground', desc: 'Set and close the day. Surface Do Today(1) and Doing(7).' },
                { name: 'The Review', time: '30–45 min weekly', altitude: '5k ft — tactical', desc: 'The most important rhythm. Capture catch-up, Done audit, Doing(7) reset, Theme glance.' },
                { name: 'The Tune-Up', time: '60–90 min monthly', altitude: 'Mid-high', desc: 'Wheel re-rate, Mega Do review, Goal check, Knowledge sweep.' },
                { name: 'The Reset', time: '2–3 hours quarterly', altitude: '10k ft — strategic', desc: 'Full Strategy refresh. Mega Do harvest. Three priority Mega Dos for the next quarter.' },
                { name: 'The Re-Authoring', time: 'Full day annually', altitude: 'Stratosphere', desc: 'Read last year\'s Script. Watch last year\'s Story. Revisit all Four ACTs. Re-author.' },
              ].map((r, i) => (
                <div key={r.name} className={`py-5 flex items-baseline gap-6 ${i < 4 ? 'border-b border-bone' : ''}`}>
                  <div className="w-28 flex-shrink-0">
                    <p className="font-display text-sm italic text-ink">{r.name}</p>
                    <p className="text-xs text-purple mt-0.5">{r.altitude}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-ink-muted mb-1">{r.time}</p>
                    <p className="text-sm text-ink-muted font-light">{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Foundation */}
        <section className="bg-manifesto py-20">
          <div className="max-w-3xl mx-auto px-10">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-purple-light mb-6">The Foundation</span>
            <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-medium text-white leading-[1.15] mb-6">
              Two permanent things<br /><em className="italic text-purple-light">beneath every layer.</em>
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <p className="text-xs font-semibold tracking-widest uppercase text-purple-light mb-3">The Doer Manifesto</p>
                <p className="font-display text-lg italic text-white/70 mb-3">Ten principles. The why of the Method.</p>
                <p className="text-sm text-white/40 font-light leading-relaxed mb-5">
                  Every decision Doerfy makes — what to build, what not to build, how Doey speaks — is tested against these ten beliefs.
                </p>
                <Link href="/manifesto" className="inline-flex items-center gap-2 text-sm text-purple-light border-b border-purple-light/30 pb-0.5 hover:border-purple-light transition-all">
                  Read the Manifesto <ArrowRight />
                </Link>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <p className="text-xs font-semibold tracking-widest uppercase text-purple-light mb-3">Doey, the coach</p>
                <p className="font-display text-lg italic text-white/70 mb-3">The persistent intelligence across every space.</p>
                <p className="text-sm text-white/40 font-light leading-relaxed mb-5">
                  Not a chatbot. A coach with a complete memory of your Theme, your commitments, and your patterns. One mind on your whole life.
                </p>
                <Link href="/meet-doey" className="inline-flex items-center gap-2 text-sm text-purple-light border-b border-purple-light/30 pb-0.5 hover:border-purple-light transition-all">
                  Meet Doey <ArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-parchment">
          <div className="max-w-3xl mx-auto px-10 text-center">
            <h2 className="font-display text-[clamp(28px,4vw,48px)] font-normal text-ink leading-[1.15] tracking-tight mb-4">
              The framework is the product.
            </h2>
            <p className="text-base text-ink-muted font-light mb-8 max-w-md mx-auto">
              Every screen serves a phase. Every artifact has a defined role.
              The structure does the heavy lifting so you can focus on the doing.
            </p>
            <Link href="/#beta"
              className="inline-flex items-center gap-2 bg-purple-deep hover:bg-purple text-white px-8 py-3.5 rounded text-sm font-medium transition-all hover:-translate-y-px">
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
            {['/', '/manifesto', '/meet-doey'].map((href, i) => (
              <Link key={href} href={href} className="text-xs text-white/30 hover:text-white/55 transition-colors">
                {['Home', 'Manifesto', 'Meet Doey'][i]}
              </Link>
            ))}
          </nav>
          <span className="text-xs text-white/18">&copy; 2026 Doerfy</span>
        </div>
      </footer>
    </>
  )
}
