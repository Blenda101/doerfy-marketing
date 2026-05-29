import type { Metadata } from 'next'
import Link from 'next/link'
import SiteNav from '@/components/SiteNav'

export const metadata: Metadata = {
  title: 'The Doer Manifesto — Doerfy',
  description: 'Ten principles. The philosophical bedrock of The Doerfy Method.',
  openGraph: {
    title: 'The Doer Manifesto — Doerfy',
    description: 'Ten principles that govern every decision Doerfy makes — what we build, what we don\'t build, how Doey speaks, how the Method itself is lived.',
  },
}

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const PRINCIPLES = [
  {
    roman: 'I',
    title: 'Design the life you truly desire.',
    body: 'A life that is not designed is a life that is defaulted into. The Doer chooses. The Doer authors. Theme design is the Doer\'s GPS — a clear, adaptable destination built from Vision, Mission, Values, and Strategy. It reroutes when life changes. It never loses the destination. Before the goals, before the work, before the optimization — the Doer answers the only question that matters: what is the life I am trying to build? Without that answer, the rest is motion without meaning.',
  },
  {
    roman: 'II',
    title: 'Visualize the life you design.',
    body: 'A vision unseen will not be lived. The Doer renders the designed life into something the eye can hold — a written script, a storyboard, a movie, a banner, a card on the wall. Doers keep their Theme stories in front of them: a daily visual connection to their why, where, and how. Visualization is not decoration. It is how the design survives the noise of every ordinary day. What is rendered is remembered. What is remembered is pursued.',
  },
  {
    roman: 'III',
    title: 'Theme all your lives.',
    body: 'Life has many facets. The Doer\'s Personal, Business, and Spiritual lives are not separate — they are dimensions of one master story. A scattered life is pulled in directions that don\'t connect. The Doer organizes every facet around a single Theme, and that Theme becomes the unifying narrative across all of them. Wholeness is not the absence of complexity. It is the discipline of one Theme, lived across many areas.',
  },
  {
    roman: 'IV',
    title: 'Capture the Outcomes and Actions at conception.',
    body: 'The thought is most alive at the moment it is born. The idea, the action, the commitment — captured as it is conceived, it lives. Captured an hour later, it is half what it was. Captured a day later, it is gone. The Doer captures now — in the moment of conception — and lets the system hold it. The mind is for thinking; the system is for keeping.',
  },
  {
    roman: 'V',
    title: 'Clarify, organize, and prioritize what you capture.',
    body: 'Capture alone is not enough. The thoughts and tasks the Doer captures must be processed — clarified into what they are, organized into where they belong, prioritized against everything else already committed. This is the work most people skip, and skipping it is what turns a useful inbox into an overwhelming one. The Doer doesn\'t just collect; the Doer sorts. What is clarified can be planned. What is unclarified becomes noise.',
  },
  {
    roman: 'VI',
    title: 'Focus on and commit to your life design.',
    body: 'Scattered effort produces scattered results. The Doer focuses on their life design like a magnifying glass focuses rays of sunlight — steady, aligned, producing consistent results. What matters most is not what feels urgent today. It is the life the Doer designed — the Theme, the Mission, the Goals committed to in cooler air. The Doer commits ruthlessly: from thirty things to seven, from seven to one, from one to now. Anyone can want many things. Doers commit to the few the design demands.',
  },
  {
    roman: 'VII',
    title: 'Plan, Review, and Do in rhythm.',
    body: 'The Doer moves between altitudes with intention — up to plan, up to review, back to ground to do. The rhythm is the discipline. Planning is the highest altitude of the work, and the air is thin up there. Stay too long and the Doer gets altitude sickness: dizzy with options, paralyzed by review, unable to descend. The Doer plans and reviews on cadence — briefly, deliberately — and spends most days at ground level, doing the work that was committed. A life lived in rhythm compounds. A life lived in constant planning drifts.',
  },
  {
    roman: 'VIII',
    title: 'Build a team for collective intelligence and effort.',
    body: 'No one builds a life alone. Every Doer needs a team — selected deliberately, sized to the work, drawn from wherever the right people live. Intelligence is the brain power borrowed from others — ideas, strategy, guidance, the planning thought of people whose thinking is sharper than yours in a given domain. Effort is the work itself — the hands and hours of the right people executing what was planned. The Doer needs both. What matters is selection. The wrong people on a team produce more drift than no team at all. The Doer chooses with care.',
  },
  {
    roman: 'IX',
    title: 'Continuously get better at doing.',
    body: 'The Framework is not the goal. Perfection is not the goal. The life is the goal — and the life requires constant calibration. So does the practice of using the tools and methods that serve it. The Doer reviews, reflects, and adapts. What worked is studied. What didn\'t is discarded. The Doer who stops improving doing will drift from the life they designed.',
  },
  {
    roman: 'X',
    title: 'Life is a reflection of what you do.',
    body: 'Not of what you intended. Not of what you imagined. Not of what you said. The Doer\'s life is the visible record of the actions taken, the work shipped, the days lived. The Manifesto begins and ends here: the only honest mirror of a designed life is the life that was actually lived.',
  },
]

export default function ManifestoPage() {
  return (
    <>
      <SiteNav />

      <main className="bg-parchment pt-16">
        {/* Hero */}
        <section className="max-w-3xl mx-auto px-10 pt-20 pb-16">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-purple mb-6">The Doer Manifesto</span>
          <h1 className="font-display text-[clamp(40px,5vw,72px)] font-medium leading-[1.08] tracking-tight text-ink mb-6">
            Ten principles.<br /><em className="italic text-purple">The bedrock.</em>
          </h1>
          <p className="text-lg leading-relaxed text-ink-muted font-light max-w-xl">
            The Manifesto is the foundation of the entire Doerfy framework. Not a list of values — a founding guide. Every principle is defensible on its own.
            Beneath every layer of Doerfy, beneath even Doey, sit these ten beliefs.
          </p>
        </section>

        {/* Opening note */}
        <section className="bg-manifesto py-16">
          <div className="max-w-3xl mx-auto px-10">
            <p className="font-display text-[clamp(22px,2.8vw,36px)] italic text-white/80 leading-relaxed mb-8">
              We are not just building software. We are starting a movement — of Doers in pursuit of the life they truly desire.
              These ten beliefs are the foundation of that movement.
            </p>
            <Link
              href="/#beta"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/18 border border-white/20 text-white text-sm font-medium px-6 py-3 rounded transition-all hover:-translate-y-px">
              Join the Beta <ArrowRight />
            </Link>
          </div>
        </section>

        {/* Principles */}
        <section className="max-w-3xl mx-auto px-10 py-20">
          <div className="space-y-0">
            {PRINCIPLES.map((p, i) => (
              <article key={p.roman} className={`py-14 ${i < PRINCIPLES.length - 1 ? 'border-b border-bone' : ''}`}>
                <div className="flex items-baseline gap-6 mb-5">
                  <span className="font-display text-sm italic text-purple w-8 flex-shrink-0">{p.roman}.</span>
                  <h2 className="font-display text-[clamp(22px,2.5vw,30px)] font-medium text-ink leading-snug">
                    {p.title}
                  </h2>
                </div>
                <div className="pl-14">
                  <p className="text-base leading-[1.8] text-ink-muted font-light">{p.body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Groups explanation */}
        <section className="bg-stone border-y border-bone py-16">
          <div className="max-w-3xl mx-auto px-10">
            <h2 className="font-display text-2xl font-medium text-ink mb-8">How the principles relate</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  label: 'Principles I–III',
                  title: 'The Design principles',
                  desc: 'What the Doer believes about authoring, rendering, and integrating their life.',
                },
                {
                  label: 'Principles IV–VII',
                  title: 'The Do principles',
                  desc: 'The three phases of the improvement loop: capture, stage, deliver.',
                },
                {
                  label: 'Principles VIII–X',
                  title: 'The Compounding principles',
                  desc: 'What the Doer believes about help, improvement, and the final verdict of a life.',
                },
              ].map(g => (
                <div key={g.label} className="bg-parchment border border-bone rounded-xl p-5">
                  <p className="text-xs font-semibold tracking-widest uppercase text-purple mb-2">{g.label}</p>
                  <h3 className="font-display text-base font-medium text-ink mb-2">{g.title}</h3>
                  <p className="text-sm text-ink-muted font-light leading-relaxed">{g.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-manifesto-deep py-20">
          <div className="max-w-3xl mx-auto px-10 text-center">
            <p className="font-display text-sm italic text-white/35 mb-4">Principle X</p>
            <h2 className="font-display text-[clamp(28px,4vw,48px)] font-normal text-white leading-[1.15] tracking-tight mb-6">
              Life is a reflection<br /><em className="italic text-purple-light">of what you do.</em>
            </h2>
            <p className="text-base text-white/45 font-light mb-10 max-w-md mx-auto">
              The Method begins with design. It ends with doing. The Manifesto is the bridge.
            </p>
            <div className="flex items-center justify-center gap-6 flex-wrap">
              <Link href="/#beta"
                className="inline-flex items-center gap-2 bg-purple-deep hover:bg-purple text-white px-8 py-3.5 rounded text-sm font-medium transition-all hover:-translate-y-px">
                Join the Beta
              </Link>
              <Link href="/method"
                className="text-sm text-white/45 border-b border-white/15 pb-0.5 hover:text-white/70 hover:border-white/30 transition-all">
                Explore the Framework
              </Link>
            </div>
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
