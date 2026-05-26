# Unified Productivity Content Solution (UPCS)
## Your Second Limitless Brain — Where Execution Meets Knowledge

**Version**: 1.0 | **Date**: May 2026 | **Status**: Active Development

---

## Executive Summary

Doerfy's **Unified Productivity Content Solution (UPCS)** is the content infrastructure that powers Doerfy's "Second Brain" experience — a rich, interconnected ecosystem where information is captured once, curated intelligently, discoverable everywhere, and consumed in high-fidelity context.

The Second Brain concept positions Doerfy as two hemispheres working in unison:

- **Knowledge hemisphere** (left): Notes, Content Library, Canvas, Posts — where ideas are captured, curated, and created
- **Execution hemisphere** (right): Stories, Tasks, Todo — where plans are made and actions taken

UPCS is the **connective tissue** between both hemispheres. Every link, file, note, and reference captured anywhere in Doerfy flows through the UPCS pipeline, making knowledge instantly available at the point of execution and connecting actions back to the content that inspired them.

**Core Value Proposition**: *Transform fragmented content handling into a unified, intelligent system that eliminates silos, reduces cognitive load, and makes the right information available at the right moment — across every module in your second brain.*

---

## The Second Brain Framework

### Two Hemispheres, One Unified Experience

```
                    YOUR SECOND LIMITLESS BRAIN
                    ─────────────────────────────

    KNOWLEDGE                              EXECUTION
    ─────────────────────                  ─────────────────────
    
    Stories (Outcomes)    ◄────────────►   Stories (Plans)
    
    Notes                                  Tasks
    Quick capture idea lab                 How & when Work actions
    
    Library (Content)                      Canvas
    Unified content store                  Visual thinking space
    
    Posts                                  Todo
    Publishing platform                    Daily execution center
    
                  ↑   ↑   ↑
           Capture ← Knowledge → Creation
```

### Module Roles

| Module | Hemisphere | Role in Second Brain |
|--------|-----------|---------------------|
| **Notes** | Knowledge | Raw capture — ideas, thoughts, fleeting observations |
| **Content / Library** | Knowledge | Curated references — links, files, external sources |
| **Canvas** | Both | Visual thinking — diagrams, spatial layouts, mind maps |
| **Posts** | Knowledge | Published creation — blogs, documents, long-form output |
| **Stories** | Bridge | Outcomes — your what & why, connecting vision to action |
| **Tasks** | Execution | Actions — the how & when, driven by stories and notes |
| **Todo** | Execution | Daily focus — prioritized work pulled from tasks |

---

## The UPCS Pipeline: Six Steps of Content Intelligence

Every piece of content in Doerfy moves through a six-step lifecycle, from first encounter to active contribution to your knowledge base.

```
1. CAPTURE → 2. CURATE → 3. DISCOVER → 4. PRESENT → 5. CONNECT → 6. CONSUME
```

### Step 1 — Capture
**Auto-capture native content or import external sources with ease**

Content enters Doerfy through multiple channels:

- **Native creation** — Notes written in the editor, Canvas drawings, Post drafts
- **Slash commands** — `/content`, `/link`, `/file` in any TipTap editor
- **Web Clipper** — Browser extension captures pages, articles, PDFs
- **Import** — DOCX, URL import, clipboard paste with smart detection
- **Drag & drop** — Files, images, links dropped anywhere in the interface
- **Email** — Forward emails to your Doerfy inbox (planned)

**Key principle**: Capture is frictionless. The user should never have to decide *where* to put something before capturing it. The system handles routing.

---

### Step 2 — Curate
**Rich meta server-side extractions, deduplication and link cleaning**

Once captured, the UPCS pipeline automatically enriches and normalizes content:

- **Metadata extraction** — Title, description, OG image, author, publish date pulled from URLs server-side
- **Smart deduplication** — SHA-256 content hash + URL normalization prevents duplicate storage; if a link was already saved, the existing record is referenced (not duplicated)
- **Link cleaning** — UTM parameters, tracking tokens, and redirect chains are resolved to canonical URLs
- **File processing** — PDFs indexed for search, images thumbnailed, documents previewed
- **Tag suggestions** — AI-assisted tagging based on content category and context

**User impact**: The library stays clean without manual effort. A link shared in three different Notes points to one content record, not three.

---

### Step 3 — Discover
**Type /content or @ to get instant content access from anywhere**

The content library is always reachable from the point of work:

- **`/content`** slash command — Opens the full content picker from any TipTap editor block
- **`@` mention** — Type `@` to reference content inline as a simple citation
- **Global search** — Full-text search across all content metadata and extracted text
- **Context-aware suggestions** — The system surfaces content relevant to the current note, task, or story
- **Browse by type** — Filter by links, files, images, videos, notes, posts
- **Recent + pinned** — Fast access to frequently used content

**Key principle**: Zero navigation cost. Content stored anywhere is reachable everywhere, without switching context.

---

### Step 4 — Present
**Present in four adaptive inline modes: URL, Simple, Rich & Live**

Content adapts its presentation to the context it's displayed in:

| Mode | Appearance | Best For |
|------|-----------|----------|
| **URL** | Clean hyperlink with favicon | Inline citation in dense text |
| **Simple** | `@reference` pill with icon | @mention-style inline citations |
| **Rich** | Card with thumbnail, title, description | Content library, preview panels |
| **Live** | Interactive iframe embed | Videos, forms, widgets in full view |

The system selects the optimal mode automatically:
- Has `embed_code`? → Live
- Has `og_image` + `og_title`? → Rich
- Type is `reference`? → Simple
- Default → Rich (degrades gracefully)

Users can override mode with a single click on any presented content block.

---

### Step 5 — Connect
**Track bi-directional relationships across entities with safe delete**

UPCS maintains a relationship graph between content and every entity it touches:

- **Content → Tasks**: A research article linked inside a task card
- **Content → Notes**: A video embedded in a note
- **Content → Stories**: A reference article tied to a life goal
- **Content → Posts**: Sources cited in a published document
- **Content → Canvas**: Files pinned on a mind map node

Relationships are **bidirectional** — from any content item you can see all the places it appears across your brain. From any task or note, you can see all its referenced content.

**Safe delete** prevents accidental knowledge loss:
- Before deleting content, the system shows an impact preview (X tasks, Y notes, Z posts reference this)
- Options: Cascade (remove all references), Archive (preserve references, hide content), Transfer (move to another record)

---

### Step 6 — Consume
**Engage high fidelity content views to gather and contribute insights**

Content is not just stored — it's actively engaged with:

- **Immersive Reader** — Clean, typography-optimized full-screen reading mode for articles and documents
- **Annotation** — Highlight passages, add inline comments, bookmark sections
- **Text-to-Speech** — Listen with synchronized word highlighting (Polly Generative / ElevenLabs)
- **Note extraction** — Convert a highlight directly into a new Note, linked back to source
- **Task generation** — Create a Task from a reading insight in one click
- **Collaborative reading** — Share annotations with team members, discuss in comment threads

---

## Three Architectural Pillars

### Pillar 1 — Innovative Link Store Architecture
> *Central clearinghouse (single source of truth) for all content operations, eliminating siloing and creating a seamless context-aware experience*

All content operations — regardless of where they originate (Notes, Canvas, Posts, Tasks, Webclipper) — flow through a single `content_items` table. This is the Link Store.

**What this enables**:
- Reference the same article in 10 different notes — it's stored once
- Delete a note — the article remains and its relationships to other entities are intact
- Search the entire library — one index, not per-module search fragments
- Analyze your knowledge graph — what content do you reference most in your stories?

**Database core**:
```
content_items        — One record per unique piece of content
content_links        — Many-to-many: content ↔ entity (task, note, story, post)
content_items.embedded_in  — JSONB: inline references within rich text
```

---

### Pillar 2 — Content as a First-Class Citizen
> *Every piece of content is treated as a valuable entity with sophisticated meta extraction and bi-directional relationship tracking*

Content is not an attachment or a footnote. Each content item has:

- Its own identity (id, title, description, tags, color theme)
- Its own history (created, updated, accessed timestamps)
- Its own relationships graph (embedded in, linked to, referenced by)
- Its own presentation preferences (default display mode)
- Its own annotation layer (highlights, comments, bookmarks)
- Its own access control (private, shared, public)

This means content can be **found**, **browsed**, **analyzed**, and **acted upon** as a standalone entity — not just as an appendage to a task or note.

---

### Pillar 3 — Just-in-Time Premium Presentation
> *Fast search to access content anywhere from anywhere with smart contextual presentations and engagement-enhancing content relationships*

Content surfaces where and when it is needed, not where it was filed:

- A task about "Q3 strategy" automatically surfaces the strategy documents linked in your Stories
- A note about "machine learning" suggests the ML articles you've saved in your Library
- The Canvas node for a project shows the task count, note count, and linked content in its tooltip
- A Post being drafted surfaces related content you've cited before

Presentation adapts to context: the same article appears as a small `@pill` citation inside a note but as a full rich card in the Content Library panel.

---

## How UPCS Powers Each Brain Module

### Notes ← → UPCS
- Every link pasted or `/content` inserted in a note is captured into the Link Store
- Notes themselves become content items (searchable, referenceable from other modules)
- Reader mode available for longer notes
- Highlights in reader mode sync back as inline annotations

### Library (Content) ← → UPCS
- The Library **is** the Link Store's primary UI — a browsable grid/list of all content items
- Four presentation modes for each item
- Relationship panel shows where each item is used across the brain
- Duplicate detection and merge tools

### Canvas ← → UPCS
- Canvas nodes can be linked to content items (shows rich card on hover)
- Files dropped on Canvas are captured into Link Store
- Mind maps of content relationships can be exported to Canvas

### Posts ← → UPCS
- All citations and embeds in a Post are tracked as content links
- Published posts become public content items (accessible to readers)
- Audio narration generated via UPCS audio pipeline
- EPUB export packages all referenced content

### Stories ← → UPCS
- Stories can have reference content linked (articles, videos that shaped the vision)
- Content recommendations surface based on story themes and keywords
- Highlights from reader mode can be linked to a story as an insight

### Tasks ← → UPCS
- Tasks can attach content items (reference materials, deliverable files)
- Content linked to a task appears in the task's Work panel
- Completing a task can trigger an insight capture prompt

---

## Current Implementation Status

### Shipped
- Link Store (content_items + content_links tables)
- Server-side metadata extraction (title, OG image, description)
- SHA-256 deduplication with URL normalization
- Four presentation modes (URL / Simple / Rich / Live)
- Video hover autoplay system (YouTube, Vimeo)
- Bidirectional relationship tracking with JSONB embedded_in
- Impact-aware delete (cascade / archive / transfer)
- Duplicate detection and merge
- Content property sheet with relationship panel
- `/content` slash command in TipTap editors
- Webclipper → Library ingest
- Immersive Reader (modal + full screen)
- Browser TTS with word-level highlight sync
- Multi-color annotation highlights

### In Progress
- Annotation bidirectional sync (reader highlights → TipTap source document)
- Context-aware content suggestions (surface content by story/note theme)
- Audio narration pipeline (Polly Generative standard / Fish Audio premium)
- EPUB 3 export

### Planned — Near Term
- `@` mention content picker inline in TipTap
- Note-to-content extraction from reader annotations
- One-click Task creation from reader insight
- Canvas ↔ content item linking
- Email-to-Library ingest

### Planned — Medium Term
- AI-assisted auto-tagging and categorization
- Semantic search (natural language across content library)
- Collaborative annotation (shared highlights, comment threads)
- Team content libraries (shared Link Store across workspace members)
- Reading progress analytics (time spent, completion rates)

### Planned — Long Term
- AI content summarization
- Content recommendation engine (surface relevant items by context)
- Offline Library access (selective download + sync)
- Integration APIs (Notion import, Readwise sync, Zotero, Apple Notes)
- Mobile-native reader (iOS + Android)

---

## User Experience Principles

### 1. Capture without friction
The user should never have to think about where to put content. Capture anywhere; the system routes it. A link pasted in a task is as accessible in the Library as one explicitly saved via the Webclipper.

### 2. Zero navigation cost
Content stored in one place is accessible from every other place. No "go to the Library to find it" — it comes to you via search, suggestions, and `@` reference.

### 3. Presentation adapts to context
The same content item renders as a simple pill in dense text, a rich card in a browser view, and a full interactive embed in a reading session. The user sees the right density at the right moment.

### 4. Relationships are first-class
Every connection between a piece of content and a note/task/story is trackable, visible, and navigable. Knowledge graphs emerge naturally from regular use.

### 5. Consumption creates knowledge
Reading and consuming content is not a passive dead end. Every highlight, annotation, and reading session can be converted into a Note, Task, or Story insight — closing the Capture → Create loop.

---

## Competitive Differentiation

| Capability | Doerfy UPCS | Notion | Obsidian | Readwise | Roam Research |
|-----------|------------|--------|----------|---------|--------------|
| Unified content store | ✅ | Partial | ❌ | ❌ | Partial |
| Server-side meta extraction | ✅ | ✅ | ❌ | ✅ | ❌ |
| Deduplication | ✅ | ❌ | ❌ | ❌ | ❌ |
| Four presentation modes | ✅ | Partial | ❌ | ❌ | ❌ |
| Bidirectional relationships | ✅ | Partial | ✅ | ❌ | ✅ |
| Reader + annotation | ✅ | ❌ | ❌ | ✅ | Partial |
| TTS with word highlight | ✅ | ❌ | ❌ | ❌ | ❌ |
| Execution integration (Tasks/Stories) | ✅ | Partial | ❌ | ❌ | Partial |
| Audio narration of posts | ✅ | ❌ | ❌ | ❌ | ❌ |
| Webclipper → library | ✅ | ✅ | ❌ | ✅ | ❌ |

**Unique position**: Doerfy is the only platform that combines a full second-brain content system (capture, curate, discover, present) with a life execution layer (stories, tasks, goals) and a publishing pipeline (posts, audio, EPUB) in one workspace.

---

## Success Metrics

### Engagement
- Content items created per active user per week
- `@` mention and `/content` usage rate in notes and tasks
- Library open rate (% of sessions that include a Library view)
- Reader session duration (target: >5 min average)

### Knowledge Quality
- Annotation creation rate per reading session
- Note-from-annotation conversion rate
- Avg. relationships per content item (signals a rich, connected graph)
- Duplicate rate (target: <5% of new saves are duplicates)

### Execution Bridge
- Content items linked to active Tasks
- Content items linked to active Stories
- Tasks created from reader insights (future metric)

### Retention Signal
- Users with >20 content items retained at 90 days vs. those with <5 (hypothesis: content density predicts retention)

---

## Technical Architecture Reference

**Backend**
- `apps/api/src/content/content.resolver.ts` — GraphQL resolver (all content operations)
- `packages/database/prisma/schema.prisma` → `content_items`, `content_links` tables
- Metadata extraction: Lambda function, server-side (avoids CORS, handles JS-rendered pages)

**Frontend**
- `apps/web/src/modules/content/` — Content module UI
- `apps/web/src/services/reading/` — Reader and annotation services
- `apps/web/src/components/tiptap/extensions/` — `/content` slash command, `@` mention (planned)
- `apps/web/src/modules/posts/` — Post module (audio, EPUB, publication pipeline)

**Key docs**
- `docs/knowledge/Content Module/` — Content module architecture guides
- `docs/knowledge/Canonical/` — Reader and annotation specs
- `docs/knowledge/Posts/` — Publishing pipeline handoffs

---

*This document merges the UPCS pipeline (Capture → Curate → Discover → Present → Connect → Consume) with the Second Brain product vision. It supersedes the earlier `UCMS_Overview.md` as the authoritative product-level description of Doerfy's content strategy.*
