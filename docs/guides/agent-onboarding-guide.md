# Marketing Site Agent — Onboarding Guide

**Status:** Canonical orientation for any agent working on Doerfy marketing properties
**Owner:** Gabriel (founder)
**Last updated:** 2026-05-13

---

## What you're building

The Doerfy pre-launch marketing site. Single conversion goal: **beta signup**. Everything on the site serves that goal — even the methodology peek, the manifesto excerpt, the Doey introduction.

This is NOT the in-app HomePage (that lives in the Doerfy monorepo). This is the public-facing marketing site that lives in its own repository:

**Repo path:** `C:\Users\gsbra\Documents\Apps\doerfy-marketing`

Following the Bigtopa precedent. The marketing site will eventually host multiple Doerfy properties (`doerfy.com`, `goalgetter.doerfy.com`, satellite product sites), so design it as a multi-site monorepo from day one.

---

## Before you write any code

Read these in order. Don't skip. Don't summarize from memory — read the source. The Doerfy methodology has been carefully refined over years and recent canonical work in May 2026 locked terminology and structure that earlier docs may contradict. **The canon docs win.**

### 1. Identity & positioning (read first — this is non-negotiable foundation)

| Doc | Path | Why |
|---|---|---|
| **Doer Manifesto** | `docs/canon/identity/doer_manifesto.md` | The 10 principles. The philosophical bedrock. The site's voice should feel like this document distilled. |
| **Doerfy Vocabulary** v3.0 | `docs/canon/identity/doerfy_vocabulary.md` | Locked terminology. Use these terms exactly — Doer (not user), Doerfy (not the platform), Theme, Mega Do, etc. Has a deprecated terms list — do NOT use deprecated terms. |
| **Doey Persona Spec** | `docs/canon/identity/doey_persona_spec.md` | Doey's voice. The marketing site's voice should harmonize with how Doey talks (warm but direct, opinionated, no flattery, no emoji, brief). |

### 2. The methodology (read second — this is what we're selling)

| Doc | Path | Why |
|---|---|---|
| **Life Story Coaching Method v3.0** | `docs/knowledge/Theme/v1_theme/Life_Story_Coaching_Method.md` | Master methodology document. The single source of truth. Read at least Modules 1–8 (foundations) and Module 22 (Manifesto operationalization). |
| **Improvement Space (canonical)** | `docs/framework/coaching/improvement-space.md` | The third dimension — CSD/CDC. This is the differentiating concept many competitors can't claim. |
| **Elevation Framework** | `docs/framework/coaching/elevation-framework.md` | Plan/Review/Do at altitudes. Useful for explaining the Cadence rhythms. |
| **ACT framework (4 ACTs)** | `docs/framework/coaching/ACT.md` | Vision → Mission → Values → Strategy. The site's "what is the Method" explanation will reference this. |

### 3. Public-facing methodology pieces (for direct content lifting)

| Doc | Path | Why |
|---|---|---|
| **Doerfy Cadence** | `docs/canon/methodology-public/doerfy_cadence.md` | The 5 rhythms. Already written for public consumption. |
| **Doerfy Mantras** | `docs/canon/methodology-public/doerfy_mantras.md` | One-liners suitable for hero copy, page headers, scroll moments. |
| **Doerfy Pitch Deck** | `Doerfy_pitch.pdf` (project root) | The investor narrative. Use for positioning consistency, not for direct copy. |

### 4. Consumer framework (deep methodology context — read what you need)

| Doc | Path | Why |
|---|---|---|
| Consumer framework overview | `docs/framework/consumer/doerfy-consumer-framework.md` | The aerial view of Life Coach work. |
| Life Story ACTs | `docs/framework/consumer/life-story-acts.md` | How the 4 ACTs work for individual Doers. |
| Strategy Building | `docs/framework/consumer/strategy-building.md` | The keystone act. |
| Outcome Space | `docs/framework/consumer/outcome-space.md` | The Outcome Pyramid (Theme → Mega Do → Project → Todo). |
| Action Space | `docs/framework/consumer/action-space.md` | The Action Funnel (7 stages from Todo Queue → Done). |
| Improvement Space (consumer) | `docs/framework/consumer/improvement-space.md` | CSD/CDC applied to personal life. |

**Note on business framework:** `docs/framework/business/` exists but is scaffolded (not production-quality). Business audience is not the primary marketing target for pre-launch. Stay focused on consumer messaging unless the founder specifically directs otherwise.

### 5. Existing app HomePage (reference, not template)

**Path:** `apps/web/src/screens/HomePage/HomePage.tsx`

This is the current in-app HomePage with beta signup. Read it to understand:
- What beta-signup flow currently exists (form + BetaSurvey modal)
- What imagery, copy, and structure has been tried
- What works (the BetaSurvey flow logic) — replicate it conceptually
- What doesn't (visual design quality, AI-generic feel) — break from it

**Do NOT use this as a template.** The new marketing site is its own design system, its own repo, its own visual direction. This file is reference for *signup logic and content inventory*, not for design.

---

## Voice and tone for the marketing site

Pulled from the Doey Persona Spec and the Manifesto:

- **Warm but direct.** Brief sentences. Opinionated. No flattery.
- **No emoji.** None. Not in copy, not in CTAs.
- **No exclamation points.** Confidence without enthusiasm-marketing.
- **Doer, not user.** Doerfy is for Doers.
- **Active voice. Verb-first when possible.** *"Design the life you truly desire"* — note: that's the motto. Voice should harmonize with it.
- **No "Unlock your potential" / "Transform your life" SaaS copy.** Manifesto-grade language: declarative, philosophical, slightly literary, never breathless.
- **No "AI does the work for you" claims.** Doerfy's positioning is *framework-first, AI-second*. The Doer designs; Doey coaches. Marketing copy must reflect this distinction explicitly.

### The motto

> **Design. Visualize. Do.** *— Design, Visualize, and Do the life you truly desire.*

The motto is locked. Use it. Don't restate, rephrase, or compete with it in headers.

---

## Positioning (what to claim, what to refuse)

### Claim

- **Framework-first, AI-second.** Doerfy is a framework for life design that uses AI to coach you through it. The methodology is the moat; the AI is the leverage.
- **Whole-life design, not productivity.** Doerfy serves the entire life of a Doer — Career, Relationships, Health, Growth, all of it. Not a task manager, not a goal tracker, not a planner. A life-design system.
- **The Doer is the protagonist.** Doerfy doesn't optimize for you; it helps you design and live a life you authored. Agency, not automation.
- **Five Cadence rhythms make it a practice, not a one-time setup.** Daily, Weekly, Monthly, Quarterly, Annual. The site should reflect that this is a sustained practice.
- **Doey is a coach, not a chatbot.** Doey has a persona, has voice, has opinions. Coaches, doesn't answer-machine.

### Refuse

- Anything that sounds like a productivity tool ("get more done," "10x your output")
- Anything that promises automation ("AI handles your tasks")
- Anything that sounds like generic life-coaching SaaS ("unlock," "transform," "reach your potential")
- Comparison to Notion, Linear, Asana — Doerfy isn't a tool; it's a method
- Stock-photo lifestyle imagery, generic hero gradients, AI-art aesthetics

### The competitive frame

Doerfy stands apart from:
- **Notion / productivity SaaS:** Doerfy is framework-first, they're tool-first
- **AI coaches (Replika, Pi):** Doerfy gives you a framework + coach, not just a coach
- **Goal-trackers (Strides, Way of Life):** Doerfy starts with life design, not goal metrics
- **Journaling apps (Day One):** Doerfy authors a Life Story you can re-read, not a daily journal

The site doesn't have to name competitors directly. But the positioning should land such that someone who's used those tools recognizes Doerfy is doing something different.

---

## Design direction

### Use the taste-skill router

**Path:** `C:\Users\gsbra\Documents\Apps\doerfy\.claude\skills\taste-skill`

This skill exists specifically to prevent generic AI design defaults. **Use it from the start.** Read `SKILL.md` first; it routes you to a specific design style folder (e.g., `editorial-premium`, `quiet-luxury`, `warm-modern`) based on the brief.

For the Doerfy marketing site, my recommendation as a starting point — though the final call is yours after reading the taste-skill router — is:

**Editorial-premium** or **Warm-modern** as the primary direction. Reasons:

- *Editorial-premium* matches the Manifesto's literary feel and Doerfy's framework-first positioning. Magazine-grade typography, generous whitespace, story-led structure.
- *Warm-modern* matches Doey's voice (warm but direct) and avoids cold tech-product aesthetics.

Hybrid: editorial-premium hero/manifesto sections + warm-modern feature/explanation sections might be the right move. Decide after reading the taste-skill style folders.

**Hard refusals on visual direction:**
- No generic AI gradients (purple/pink, blue/cyan)
- No glassmorphism unless the chosen style explicitly calls for it
- No stock-photo lifestyle imagery (mountain summits, people typing on laptops)
- No emoji decoration
- No "innovative tech startup" aesthetic (we're a method, not a tech company)

### Imagery direction

The Doerfy app uses visual storytelling — Storyboards, banners, Movies — as the visualization layer of the Theme. The marketing site should reflect this *aesthetic philosophy* (visual narrative anchored in personal story) without literally showing app screenshots in hero positions.

Suggested imagery directions:
- Original photography of "designed life" moments (not generic lifestyle stock)
- Editorial illustrations matching the chosen style
- The Manifesto rendered as visual typography
- Theme Storyboard frames as supporting imagery in deeper sections

Avoid:
- App screenshots in the hero (looks like a tool, not a method)
- AI-generated imagery that screams "AI-generated"
- Generic productivity imagery (calendars, checkmarks, clocks)

---

## Repo structure (recommended)

Repo location: `C:\Users\gsbra\Documents\Apps\doerfy-marketing` (locked, following the Bigtopa precedent).

Set up as a multi-app monorepo:

```
doerfy-marketing/
├── apps/
│   ├── doerfy-com/              (the main marketing site — doerfy.com)
│   ├── goalgetter/              (future — goalgetter.doerfy.com)
│   └── ...                       (other satellite product sites)
├── packages/
│   ├── ui/                       (shared component library — taste-skill-derived)
│   ├── content/                  (shared canon content — Manifesto excerpts, mantras, methodology blurbs)
│   └── analytics/                (shared tracking, signup pipeline)
├── docs/
│   └── (this onboarding guide gets copied here)
└── README.md
```

**Note on cross-repo file access:** The new agent will work in the `doerfy-marketing` repo but needs to read canon and framework docs from the `doerfy` repo. Ensure the agent has filesystem access to both:

- `C:\Users\gsbra\Documents\Apps\doerfy-marketing` (write)
- `C:\Users\gsbra\Documents\Apps\doerfy` (read — for canon, framework, methodology, taste-skill, existing HomePage reference)

Copy this onboarding guide and the taste-skill folder into the marketing repo for self-containment, but treat the doerfy repo as the source of truth for canon.

Stack recommendation (verify with founder before locking):
- **Astro** or **Next.js (static export)** — both serve the static, fast, SEO-friendly needs
- **Tailwind** for styling (matches Doerfy app conventions)
- **Vercel** or **Cloudflare Pages** for hosting
- **The Doerfy app's Supabase** for beta signup persistence (single source of truth for the beta_signups table)

If Astro: lean into its content-collections feature for the Manifesto, mantras, methodology blurbs.
If Next.js: app router, static export.

---

## Page inventory (initial scope — confirm with founder)

The site should be small and focused for pre-launch. Suggested initial pages:

### Required
- **Home** — hero, methodology peek, manifesto teaser, Doey introduction, beta signup CTA (multiple placements)
- **The Method** — what is the Doerfy Method (4 ACTs, 3 Dimensions, Cadence, 6 Doer Types)
- **The Manifesto** — full 10 principles, rendered editorially
- **About / Why Doerfy** — origin story, founder POV (Gabriel's "Coming Out of the Basement" framing if appropriate)
- **Beta** — dedicated signup page with extended survey

### Probably
- **Meet Doey** — what Doey is, what Doey isn't, the persona, the coach posture
- **Doer Diagnostic teaser** — the 10-question assessment as a lead magnet/pre-launch nurture tool

### Later
- Goalgetter (satellite product) — separate site/subdomain
- Education plan landing — when ready
- Pro / Team tier pages — post-launch

---

## Beta signup flow

The existing `BetaSurvey` component in the app HomePage provides the logical model:

1. User enters email in hero or footer CTA
2. Signup row created in `beta_signups` table (Supabase) with email + timestamp
3. Modal opens with extended survey (Doer Type self-identification, interest areas, current tool stack, etc.)
4. Survey responses join the signup row
5. Confirmation: warm thank-you, set expectations for what happens next

**Replicate this flow** in the marketing site. Same Supabase backend. Same database table. Don't reinvent.

Survey questions to consider (verify with founder):
- Which Doer Type resonates most? (Wandering / Drifting / Scattered / Reactive / Hollow / Whole)
- Which Life Area feels most under-served right now?
- What tools have you tried? (Notion, Linear, Todoist, Day One, etc.)
- Personal Workspace, Organization, or both?
- Any specific moment that brought you here?

---

## Conversion architecture

Single primary CTA: **"Join the beta"** (or similar — finalize copy with founder).

Placement:
- Hero (primary)
- After methodology peek (secondary)
- After Manifesto excerpt (tertiary)
- Footer (persistent)

Sub-CTAs:
- "Read the Manifesto" → `/manifesto`
- "See the Method" → `/method`
- "Meet Doey" → `/doey`

Don't dilute the primary CTA. Everything routes toward beta signup. Articles, deep pages, and exploration paths are nurture, not conversion.

---

## Technical handoff conventions (when you're ready to build)

1. **Repo is locked:** `C:\Users\gsbra\Documents\Apps\doerfy-marketing` (new repo, monorepo pattern). Initialize it if it's empty.
2. **Choose stack with the founder** — Astro vs Next.js (recommendation: Astro for content-heavy, Next.js if you anticipate richer interactivity). Confirm before scaffolding.
3. **Set up taste-skill** — read the style router, pick the style, pull recipes.
4. **Build content layer first** — Manifesto content, mantras, methodology blurbs as content files (Astro collections or MDX in Next.js).
5. **Build component library next** — typography system, color tokens, spacing, button variants, signup form — all derived from the chosen style.
6. **Build pages last** — once content and components are in place, pages compose quickly.
7. **Tests:** at minimum, beta signup flow works end-to-end with Supabase. Accessibility audit (Lighthouse). Performance budget (initial load <2s on 3G).

---

## What to do before writing code

1. Read this guide fully.
2. Read the canon docs in section 1 of "Before you write any code."
3. Read the taste-skill router.
4. Read the master methodology (Section 2, Module 1–8 minimum).
5. Skim the existing HomePage for content inventory.
6. Send the founder a brief summary:
   - Your understanding of Doerfy's positioning in one paragraph
   - Your chosen design style from the taste-skill router (with reasoning)
   - Your proposed page inventory and any deviations from this guide's suggestions
   - Any conflicts you found between this guide and the canon docs
   - Your proposed stack and repo strategy
7. Wait for approval before building.

This is the same discovery-first pattern used in the Stories Coach implementation. Surface understanding before code.

---

## Things you might be tempted to do but shouldn't

- **Don't auto-import everything from the Doerfy app HomePage.** It's a reference for content and signup logic. The marketing site is its own design.
- **Don't use the Doerfy app's design tokens directly.** The marketing site has its own visual identity. Inherit the brand (Manifesto voice, vocabulary) but not the app's UI conventions.
- **Don't default to a generic SaaS marketing template.** The taste-skill exists to prevent this.
- **Don't write copy without reading the Manifesto.** Marketing copy must harmonize with Manifesto voice. Reading it once isn't enough — internalize the rhythm and stance.
- **Don't promise what Doerfy isn't.** Doerfy is not currently shipping. It's pre-launch beta. The site should make this clear without apology.
- **Don't add features to scope.** If you find yourself proposing a blog, podcast page, or course landing — flag it, don't build it. Pre-launch site is focused.

---

## Reference: cross-product context

You'll see references in the canon to other Doerfy products that aren't yet shipped:

- **Doerfy app** (the core platform) — in active development
- **Goalgetter** (satellite product) — early stage
- **Wheel of Life / Eat an Elephant / Goal Gauntlet** (satellite micro-products) — "Constellation Strategy" lead magnets
- **Education plan** (separate SKU) — student-led, not institutional
- **Pro / Team tiers** — business workspaces, post-launch

For pre-launch marketing scope, focus on the **core consumer Doerfy product (Personal Workspace, Life Coach Doey)**. Other products are future-state; don't promise them on the main marketing site.

If the founder later commissions a goalgetter.doerfy.com site, that's a separate handoff with its own onboarding. Same repo, different app.

---

## Final note

The Doerfy methodology is meticulously crafted. The vocabulary is locked. The Manifesto is final. Your job is to make this method legible, attractive, and conversion-worthy on the public web — without diluting the methodology or borrowing generic SaaS marketing tropes.

Read the canon. Apply taste. Convert beta signups. In that order.

When in doubt, ask the founder. The canon is the authority; the founder is the tie-breaker.

---

## Cross-references

- Canon: `docs/canon/`
- Framework: `docs/framework/`
- Methodology master: `docs/knowledge/Theme/v1_theme/Life_Story_Coaching_Method.md` v3.0
- Taste skill: `.claude/skills/taste-skill/SKILL.md`
- Existing HomePage reference: `apps/web/src/screens/HomePage/HomePage.tsx`
- Pitch deck: `Doerfy_pitch.pdf`

---

## Appendix: Current Beta Page Critique

The current beta landing page (at `/beta` route, served by `HomePage.tsx`) exists. The founder has flagged it as having poor design. Study it as a **what-not-to-do reference**, not a template. The information architecture (page sequence) is roughly right; the visual execution and copy are what's broken.

### Visual problems to break from

- **Purple gradient hero** — generic AI-startup aesthetic. The taste-skill exists specifically to prevent this.
- **Yellow gradient text + yellow CTA button** — clashing energy in the hero.
- **Sparkle emoji in the BETA badge** — violates the no-emoji rule. Remove.
- **Random small lifestyle photo floating beside "The Doerfy Framework"** — looks like a placeholder bug.
- **Three-card pattern repeated across every section** — Tools/Methods/Practices, Manifesto cards, Three Spaces. Card-spam pattern. Vary the section treatments.
- **Outcome Pyramid rendered as a stack of purple rectangles** — not the conceptual pyramid it should be. Lose the pyramid metaphor entirely.
- **Action Funnel rendered as identical-width bars** — labeled Do Queue / Do / Doing / Do Today / Do Now, all the same width. Misses the *funnel narrowing* that's the whole metaphor. The Funnel has 7 stages, not 5, and they get progressively tighter.
- **Elevation Framework shown as a circle** with Plan/Review/Do inside. Misses the entire point — these are *altitudes* (10k ft / 5k ft / 0 ft), not a circular cycle. Render as elevation, not as a cycle.
- **Cluttered icon-and-label cards everywhere** — lucide-react icons + heading + body text + bullet list. Every section uses this template. Break the pattern.

### Copy problems to break from

Every one of these phrases violates the voice rules in this guide. They appear on the current page. Replace all of them.

- *"The revolutionary productivity framework that bridges vision and execution, transforming your aspirations into accomplishments"* — "revolutionary," "productivity framework," "transforming aspirations." SaaS-template language top to bottom.
- *"A revolutionary approach to personal productivity"* — second "revolutionary." Productivity framing again. Doerfy isn't a productivity tool.
- *"Three Spaces of Achievement"* — wrong frame. Doerfy is about *design*, not *achievement*. The three are **Outcome Space, Action Space, Improvement Space** (or, in the master doc framing, the *Three Dimensions of Doerfy*).
- *"Our core beliefs that drive transformation"* — the Manifesto isn't "beliefs"; it's principles. And "drive transformation" is filler.
- *"Powerful Tools for Every Need"* — generic feature-section header.
- *"Be Among the First to Experience Doerfy"* — SaaS beta-launch cliché. The Manifesto-grade alternative would be declarative, not breathless.
- *"Transform Aspiration / Connect Daily Actions / Get All Lives Done"* — Manifesto cards labeled with generic verbs. The actual Manifesto has 10 named principles. Use those, not invented stand-ins.
- *"Stories: Design your life narrative with themes, mega dos, and projects that give meaning to every action"* — stitches multiple methodology layers into one mushy sentence. Stories is the Outcome Planning module; Themes are separate; Mega Dos and Projects are levels within Stories.

### Methodology accuracy problems

- **"Mega Do: Major life initiatives"** — the canonical phrasing is *identity-level outcomes*. "Major life initiatives" is close but loses the identity layer that makes Mega Do distinct.
- **"Theme: Your life vision and mission"** — wrong. The Theme is the *master story* containing 4 ACTs (Vision, Mission, Values, Strategy) + Life Areas. Vision and Mission are two of the four ACTs, not the whole Theme.
- **Improvement Space framed only as "Continuously Get Better"** — misses the CSD/CDC vocabulary (Capture/Stage/Deliver operationally; Conception/Discernment/Cadence philosophically) that's the actual content of the third dimension.
- **Plan/Review/Do shown as a cycle** — misses the Elevation Framework's whole point. These are altitudes (10k / 5k / 0 ft), not a circular workflow. The methodology document is explicit about this.
- **"Tools / Methods / Practices" framing at the top** — this isn't how the methodology decomposes. Doerfy has Three Dimensions (Outcome / Action / Improvement Space), 4 ACTs, the Outcome Pyramid, the Action Funnel, and the Cadence rhythms. "Tools / Methods / Practices" is invented framing that doesn't appear in canon.
- **Footer says © 2024** — stale. Current year is 2026.

### What's salvageable

- **Page sequence:** Hero → Framework overview → Manifesto teaser → Three Spaces/Dimensions → Tools → Beta CTA. This rough sequence works. Keep the skeleton, replace the execution.
- **Beta signup logic:** The form + BetaSurvey modal pattern is fine. Replicate the flow conceptually (email capture → Supabase row → extended survey → confirmation).
- **Locked nav items:** Home, How it Works, Manifesto, Products, Sign In — reasonable structure. Refine labels with the founder ("How it Works" may become "The Method"; "Products" may become "What's Coming" or get removed pre-launch).

### Rendering the conceptual diagrams

The three conceptual visuals on the current page are all rendered as **rectangles**. They should be rendered as **the concept they represent**:

- **Outcome Pyramid** — actual pyramid shape (or a strong typographic hierarchy that *reads* as descent from apex to base). Apex = Theme. Base = Todo/Task. Width visually narrows at the top, widens at the base, opposite of the current rendering.
- **Action Funnel** — actual funnel shape, narrowing from left to right (or top to bottom). 7 stages, not 5: Todo Queue → Do Queue → Do(30) → Doing(7) → Do Today(1) → Do Now → Done. The width caps (30 → 7 → 1 → 1) are visually meaningful — the funnel literally narrows.
- **Elevation Framework** — altitude visualization. Three horizontal bands at descending altitudes (10k ft / 5k ft / 0 ft), with Plan/Review/Do labels. Not a circle. The whole point is that these are *vertical* in conceptual space.

These aren't decorative diagrams. They're the methodology made visible. Render them with care.

### Net direction for the new agent

The current page is a useful demonstration of every default the taste-skill is designed to prevent: AI-gradient hero, card-spam structure, generic SaaS copy, conceptual diagrams rendered as colored rectangles, and methodology terms used loosely. The new marketing site must do the opposite at every layer.

When in doubt, ask: *would this paragraph fit in the Manifesto?* If not, rewrite it. *Does this section look like a Notion landing page?* If yes, art-direct it harder.
