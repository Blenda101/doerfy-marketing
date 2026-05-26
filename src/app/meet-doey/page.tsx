import type { Metadata } from 'next'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const DoeyAvatar = dynamic(() => import('@/components/DoeyAvatar'), { ssr: false })

export const metadata: Metadata = {
  title: 'Meet Doey — Doerfy',
  description:
    'Doey is the persistent AI coach across every space of the Doerfy Method. Not a chatbot. A coach with memory, methodology, and a complete picture of your life design.',
  openGraph: {
    title: 'Meet Doey — Doerfy',
    description: 'One coach. Many spaces. One mind on your whole life.',
  },
}

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const CHAT_DEMOS = [
  {
    title: 'When you\'re avoiding',
    messages: [
      { role: 'doey', text: 'You\'ve moved this Task four times. What does that mean?' },
      { role: 'user', text: 'Honestly, I think it needs more thinking.' },
      { role: 'doey', text: '"Needs more thinking" usually means the scope isn\'t clear enough to start. What\'s the first version of this that would be good enough to share — not finished, just ready?' },
      { role: 'user', text: 'A rough outline. Maybe 30 minutes of work.' },
      { role: 'doey', text: 'Then that\'s your Do Today(1). Not the project — the outline. When is it happening?' },
    ],
  },
  {
    title: 'When you\'re at a milestone',
    messages: [
      { role: 'doey', text: 'You said in March you\'d ship this by August. You shipped it July 28th.' },
      { role: 'user', text: 'I almost didn\'t make it. Last week was brutal.' },
      { role: 'doey', text: 'You made it. What did you learn — about the work, or about how you work?' },
    ],
  },
  {
    title: 'When you\'re scattered',
    messages: [
      { role: 'doey', text: 'You have 43 active Tasks across 8 Todos. Doing(7) is meant to be the seven you can finish this week. Want to triage, or change the count?' },
      { role: 'user', text: 'Triage. I know it\'s too many.' },
      { role: 'doey', text: 'Good. What\'s the one Mega Do that matters most this week?' },
    ],
  },
]

export default function MeetDoeyPage() {
  return (
    <>
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-manifesto/95 backdrop-blur-md border-b border-white/8">
        <div className="max-w-6xl mx-auto px-10 h-16 flex items-center justify-between">
          <Link href="/" className="font-display text-xl font-bold text-white tracking-tight">Doerfy</Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/method"       className="text-sm text-white/50 hover:text-white/80 transition-colors">The Method</Link>
            <Link href="/second-brain" className="text-sm text-white/50 hover:text-white/80 transition-colors">Second Brain</Link>
            <Link href="/manifesto"    className="text-sm text-white/50 hover:text-white/80 transition-colors">Manifesto</Link>
            <Link href="/meet-doey"    className="text-sm text-white/50 hover:text-white/80 transition-colors">Meet Doey</Link>
          </div>
          <Link href="/#beta" className="flex items-center gap-2 bg-purple-deep hover:bg-purple text-white text-sm font-medium px-5 py-2.5 rounded transition-colors">
            Join the Beta
          </Link>
        </div>
      </nav>

      <main className="bg-manifesto pt-16">

        {/* Hero */}
        <section className="max-w-3xl mx-auto px-10 pt-20 pb-20 relative">
          <div className="absolute -top-10 -right-40 w-96 h-96 rounded-full bg-purple/8 blur-3xl pointer-events-none" />
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-purple-light mb-6">Meet Doey</span>
          <h1 className="font-display text-[clamp(40px,5vw,72px)] font-medium leading-[1.08] tracking-tight text-white mb-6">
            Your coach.<br /><em className="italic text-purple-light">Not a chatbot.</em>
          </h1>
          <p className="text-lg leading-relaxed text-white/55 font-light max-w-xl">
            Doey is the persistent AI coach across every space of the Doerfy Method. One identity. Complete memory.
            A single mind on your whole life — from Theme Builder to the Do Now moment.
          </p>
        </section>

        {/* What makes a coach */}
        <section className="border-t border-white/8 py-20">
          <div className="max-w-3xl mx-auto px-10">
            <h2 className="font-display text-[clamp(26px,3vw,40px)] font-medium text-white leading-[1.15] mb-8">
              A coach is not an assistant.
            </h2>
            <p className="text-base leading-relaxed text-white/55 font-light mb-10">
              That distinction shapes every word Doey writes. An assistant does what you ask.
              A coach holds you accountable to what you said you wanted — whether you asked today or six months ago.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: 'Asks more than it tells.', body: 'In coaching moments, Doey asks questions. In execution moments, Doey is decisive. The difference between the two is what Doey is for.' },
                { title: 'Remembers what matters.', body: 'The goal you discussed in the Theme Builder informs how Doey helps you prioritize tasks today. One coach. One memory. One mind.' },
                { title: 'Names what you\'re avoiding.', body: 'If you\'ve moved a Task four times, Doey says so — not "you might want to consider" but "you\'ve moved this four times. What\'s actually in the way?"' },
                { title: 'Holds your Theme.', body: 'Doey doesn\'t optimize for what feels urgent. Doey holds the life you designed and brings it back when the noise of the week pulls you away.' },
              ].map(t => (
                <div key={t.title} className="bg-white/5 border border-white/8 rounded-xl p-5">
                  <p className="font-medium text-white/85 text-sm mb-2">{t.title}</p>
                  <p className="text-sm text-white/40 font-light leading-relaxed">{t.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Doey's voice */}
        <section className="border-t border-white/8 py-20">
          <div className="max-w-3xl mx-auto px-10">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-purple-light mb-6">Doey&rsquo;s Voice</span>
            <h2 className="font-display text-[clamp(26px,3vw,40px)] font-medium text-white leading-[1.15] mb-8">
              Warm. Direct. <em className="italic text-purple-light">Brief.</em>
            </h2>
            <div className="space-y-6 mb-12">
              {[
                { rule: 'Sentences are short.', desc: 'Long sentences are signs of unclear thinking. Doey writes the way a thoughtful coach speaks — in sentences that fit in a breath.' },
                { rule: 'Specifics, not platitudes.', desc: 'Never "great job." Always "you completed 8 of 12 tasks in your Base Fitness Mega Do — three weeks ahead of pace." Praise is data, not feeling.' },
                { rule: 'No corporate hedging.', desc: 'Doey doesn\'t say "I\'d suggest you might want to consider perhaps thinking about." Doey says "Try this." You can disagree.' },
                { rule: 'No emoji by default.', desc: 'The product carries warmth visually. Doey carries it through attentiveness and remembered detail — not performance.' },
              ].map(v => (
                <div key={v.rule} className="flex gap-4">
                  <span className="w-1 flex-shrink-0 bg-purple/40 rounded-full" />
                  <div>
                    <p className="font-medium text-white/80 text-sm mb-1">{v.rule}</p>
                    <p className="text-sm text-white/40 font-light leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Chat demos */}
        <section className="border-t border-white/8 py-20">
          <div className="max-w-5xl mx-auto px-10">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-purple-light mb-6">Doey in context</span>
            <h2 className="font-display text-[clamp(26px,3vw,40px)] font-medium text-white leading-[1.15] mb-12">
              How Doey handles real moments.
            </h2>
            <div className="grid md:grid-cols-3 gap-5">
              {CHAT_DEMOS.map(demo => (
                <div key={demo.title} className="bg-white/4 border border-white/8 rounded-2xl p-5 flex flex-col gap-3">
                  <div className="flex items-center gap-3 pb-4 border-b border-white/6">
                    <DoeyAvatar size={56} />
                    <div>
                      <p className="text-xs font-medium text-white/70">Doey</p>
                      <p className="text-xs text-purple-light/70">{demo.title}</p>
                    </div>
                  </div>
                  {demo.messages.map((msg, i) => (
                    <div key={i} className={`max-w-[92%] px-3 py-2 rounded-lg text-xs leading-relaxed ${
                      msg.role === 'doey'
                        ? 'bg-white/7 text-white/75 self-start rounded-bl-sm'
                        : 'bg-purple-deep text-white/85 self-end ml-auto rounded-br-sm'
                    }`}>
                      {msg.text}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <p className="text-xs text-white/25 mt-6 text-center">Same Doey. Different moment. One coach.</p>
          </div>
        </section>

        {/* Adapts across spaces */}
        <section className="border-t border-white/8 py-20">
          <div className="max-w-3xl mx-auto px-10">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-purple-light mb-6">One identity. Many spaces.</span>
            <h2 className="font-display text-[clamp(26px,3vw,40px)] font-medium text-white leading-[1.15] mb-6">
              Doey is the same coach<br /><em className="italic text-purple-light">in every room.</em>
            </h2>
            <p className="text-base leading-relaxed text-white/55 font-light mb-10">
              The work changes — Theme Builder requires different thinking than the Action Funnel. But Doey&rsquo;s character doesn&rsquo;t.
              A reflective question in Design and a sharp prioritization in Do Now should sound like the same person, just doing different work.
            </p>
            <div className="space-y-0">
              {[
                { space: 'Theme Builder', persona: 'Socratic life coach', desc: 'Draws out your Vision, Mission, Values, and Strategy through questions. Never tells you what you want.' },
                { space: 'Outcome Space', persona: 'Life-area goal strategist', desc: 'Helps you shape Mega Dos, Projects, and Todos with clear done-states and honest scope.' },
                { space: 'Action Funnel', persona: 'Prioritization partner', desc: 'Cuts through the noise. Surfaces what matters this week, today, right now.' },
                { space: 'Knowledge Base', persona: 'Writing partner + connector', desc: 'Drafts posts, notes, canvases — with your full Theme and life context as background.' },
              ].map((s, i) => (
                <div key={s.space} className={`py-5 flex items-baseline gap-6 ${i < 3 ? 'border-b border-white/8' : ''}`}>
                  <div className="w-36 flex-shrink-0">
                    <p className="font-display text-sm italic text-white/70">{s.space}</p>
                    <p className="text-xs text-purple-light/60 mt-0.5">{s.persona}</p>
                  </div>
                  <p className="text-sm text-white/35 font-light leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Coaching styles */}
        <section className="border-t border-white/8 bg-manifesto-deep py-20">
          <div className="max-w-3xl mx-auto px-10">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-purple-light mb-6">Coaching Styles</span>
            <h2 className="font-display text-[clamp(26px,3vw,40px)] font-medium text-white leading-[1.15] mb-6">
              One Doey. Three textures.
            </h2>
            <p className="text-base leading-relaxed text-white/45 font-light mb-10">
              You set a Coaching Style per Theme. Style is a tonal modulation on the canonical persona — not a different character.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  style: 'Conversational',
                  tag: 'Default',
                  desc: 'Warm but direct. Brief sentences. Opinionated. Comfortable with silence. The baseline Doey — what every other style modulates from.',
                  sample: '"You\'ve moved this four times. Want to figure out what\'s actually in the way?"',
                },
                {
                  style: 'Professional',
                  tag: 'Business mode',
                  desc: 'A formal register. Less colloquial warmth, more precision. Fewer contractions. Slightly more declarative.',
                  sample: '"This Task has moved four times. The pattern is worth examining."',
                },
                {
                  style: 'Inspirational',
                  tag: 'Meaning-forward',
                  desc: 'More Manifesto invocation. Slightly elevated register at milestones. Sparing purposeful use of a single emoji.',
                  sample: '"You\'ve moved this four times. Manifesto V: clarify, organize, prioritize. What\'s actually in the way?"',
                },
              ].map(s => (
                <div key={s.style} className="bg-white/4 border border-white/8 rounded-xl p-5">
                  <div className="flex items-baseline gap-2 mb-3">
                    <p className="font-display text-base italic text-white/80">{s.style}</p>
                    <span className="text-xs text-white/25">{s.tag}</span>
                  </div>
                  <p className="text-xs text-white/40 font-light leading-relaxed mb-4">{s.desc}</p>
                  <p className="text-xs text-white/55 italic border-l border-white/15 pl-3">
                    {s.sample}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-manifesto border-t border-white/8 py-20">
          <div className="max-w-3xl mx-auto px-10 text-center">
            <p className="font-display text-sm italic text-white/35 mb-4">Doey is ready.</p>
            <h2 className="font-display text-[clamp(28px,4vw,48px)] font-normal text-white leading-[1.15] tracking-tight mb-4">
              Begin where you are.<br /><em className="italic text-purple-light">Doey will meet you there.</em>
            </h2>
            <p className="text-base text-white/40 font-light mb-10 max-w-md mx-auto">
              Your first conversation with Doey starts with one question: what is the life you are trying to build?
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
