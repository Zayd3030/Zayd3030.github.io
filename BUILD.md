# BUILD.md — Zayd Hussain Portfolio Redesign
> Full specification for rebuilding `zaydhussain.co.uk` as a professional dual-focus portfolio (Software Engineering + Business/Personal Branding)
>
> **Inspiration:** callumg.com — dark theme, terminal hero widget, timeline experience cards, filterable skills, stats bar, "open to opportunities" badge
> **Hosted:** GitHub Pages (`github.com/Zayd3030/<repo>`) — custom domain `zaydhussain.co.uk`

---

## 1. Project Overview

### Goal
Transform the current basic GitHub-style project listing into a polished, professional portfolio that positions Zayd as both a **Software Engineer** and a **Personal Branding / Content Growth Specialist**.

### Core Principles
- Single-page site (fast, no bloat, GitHub Pages friendly)
- Mobile-first, fully responsive
- Memorable design with clear personal brand
- Dual audience: technical recruiters + business/entrepreneurial clients
- Pure static HTML/CSS/JS — no build step, no dependencies to install

---

## 2. Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | **Vanilla HTML/CSS/JS** | No build step — works perfectly with GitHub Pages |
| Styling | **CSS custom properties** | Full design control, zero framework overhead |
| Fonts | **Google Fonts** (preloaded) | Free, fast, no self-hosting needed |
| Animations | **CSS keyframes + Intersection Observer** | No JS lib needed |
| Icons | **Inline SVG** | No extra HTTP requests |
| Hosting | **GitHub Pages** | Already live — keep it |
| Domain | `zaydhussain.co.uk` (keep existing CNAME) | Already established |

> ⚠️ **Do NOT introduce a build step / npm / bundler** unless you're willing to switch from GitHub Pages to Vercel/Netlify. Keep it simple: edit files, push, done.

---

## 3. GitHub Pages Deployment Workflow

Your site is already live on GitHub Pages. Here's how to work with it safely:

### Setup (one-time)
```bash
# Clone your existing repo
git clone https://github.com/Zayd3030/<your-repo-name>
cd <your-repo-name>

# Check which branch GitHub Pages is serving from
# Settings → Pages → Branch (usually main or gh-pages)
```

### Daily workflow
```bash
# 1. Pull latest before making changes
git pull origin main

# 2. Make your edits to index.html / css / js files

# 3. Preview locally before pushing
# Open index.html in browser — or run a local server:
npx serve .
# or
python3 -m http.server 8080

# 4. Commit and push — site updates automatically within ~60 seconds
git add .
git commit -m "feat: update hero section"
git push origin main
```

### Branch strategy (recommended)
```bash
# Work on a dev branch, merge to main when ready
git checkout -b redesign
# ... make all changes ...
git push origin redesign
# Open a PR on GitHub and merge when happy
```

### File structure to maintain for GitHub Pages
```
<repo-root>/
├── index.html          ← Must be named index.html at root
├── CNAME               ← Must exist: contains "zaydhussain.co.uk"
├── assets/
│   ├── images/
│   └── icons/
├── css/
│   ├── main.css
│   ├── layout.css
│   └── components.css
├── js/
│   ├── main.js
│   └── filter.js
└── BUILD.md
```

> ⚠️ **Never delete the `CNAME` file** — it maps your custom domain. If it disappears, your domain stops working.

---

## 4. Design System

### 4.1 Aesthetic Direction
**"Dark Dev Professional"** — inspired by callumg.com but with Zayd's dual identity baked in. Dark canvas, sharp typography, one bold accent, rounded cards with subtle borders. Technical enough for recruiters, clean enough for business clients.

### 4.2 Colour Palette

```css
:root {
  /* Backgrounds — match Callum's near-black palette */
  --bg-primary:    #0D0D0F;   /* Main canvas */
  --bg-secondary:  #13131A;   /* Cards, nav background */
  --bg-tertiary:   #1C1C26;   /* Hover states, terminal bg */
  --bg-card:       #16161E;   /* Experience / project cards */

  /* Text */
  --text-primary:  #F2F2F4;   /* Near-white headings */
  --text-secondary:#9B9BAD;   /* Body, descriptions */
  --text-muted:    #55556A;   /* Labels, dates, metadata */

  /* Accent — differentiate from Callum's purple, own your colour */
  --accent:        #00C9A7;   /* Electric teal/mint — techy + fresh */
  --accent-dim:    rgba(0, 201, 167, 0.15);

  /* Terminal colours */
  --terminal-bg:   #111118;
  --terminal-green:#4ADE80;
  --terminal-text: #E2E8F0;
  --terminal-dim:  #64748B;

  /* Functional */
  --border:        rgba(255,255,255,0.07);
  --border-hover:  rgba(255,255,255,0.14);
  --radius-sm:     6px;
  --radius-md:     12px;
  --radius-lg:     18px;
}
```

### 4.3 Typography

```css
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap');

--font-display: 'Syne', sans-serif;          /* Hero name, section headings */
--font-body:    'DM Sans', sans-serif;       /* All body text */
--font-mono:    'JetBrains Mono', monospace; /* Terminal widget, tech tags */
```

**Type Scale:**
```css
--text-xs:    0.75rem;
--text-sm:    0.875rem;
--text-base:  1rem;
--text-lg:    1.125rem;
--text-xl:    1.5rem;
--text-2xl:   2rem;
--text-3xl:   2.5rem;
--text-hero:  clamp(3.5rem, 8vw, 6.5rem);
```

### 4.4 Spacing & Grid
- Max content width: `1100px`
- Section padding: `clamp(5rem, 10vw, 9rem)` vertical
- Card gap: `1rem`
- Project grid: 3 cols desktop → 2 tablet → 1 mobile

---

## 5. Page Sections

### Nav (sticky)
```
[zayd.]                [Experience] [Projects] [Skills] [Business] [Contact]
                                                             [LinkedIn] [GitHub] [Email]
```
- `zayd.` wordmark — dot in accent colour
- Transparent on load → `--bg-secondary` + border-bottom on scroll
- Mobile: hamburger → slide-down menu
- Active section highlight via Intersection Observer

---

### Section 1: Hero
**Layout:** Two-column — text left, terminal widget right (directly inspired by callumg.com)

**Left side:**
```
[pill badge]  📍 Software Engineer · UK

Zayd
Hussain

Aspiring Software Engineer and co-founder of VZN Media —
a performance-based personal branding agency.
I build software people use and brands that actually grow.

[View Projects →]    [Get in touch ✉]
```

**Right side — Terminal Widget:**
```
╭─────────────────────────────────────────╮
│ ● ● ●   zayd@portfolio:~               │
├─────────────────────────────────────────┤
│ zayd@portfolio:~$ whoami               │
│ Zayd Hussain, Software Engineer        │
│                                         │
│ zayd@portfolio:~$ cat about.txt        │
│ CS Student · Co-founder · Builder      │
│ Open to: Internships | Grad Roles      │
│                                         │
│ zayd@portfolio:~$ ls skills/           │
│ Python JS TypeScript PHP Java C# ...   │
│                                         │
│ zayd@portfolio:~$ █                    │
╰─────────────────────────────────────────╯
```
- Text typed out character-by-character with JS on load
- Blinking cursor (`animation: blink 1s step-end infinite`)
- macOS-style red/yellow/green dots
- Font: `JetBrains Mono`

**Below hero — Stats Bar (4 columns, inspired by callumg.com):**
```
[ X+ ]              [ 2 ]               [ 20XX ]           [ 8+ ]
Years Coding    Ventures Founded     Started Coding      Projects Built
```
- Fill in your real numbers
- Accent colour for the large stat, muted text for label
- Count-up animation when scrolled into view

---

### Section 2: Experience ("Where I've worked")
**Inspired by:** Callum's timeline card layout with icon + date badge

**Section header:**
```
[accent label]  EXPERIENCE
[h2]  Where I've worked
```

**Cards to include:**

| Role | Company | Dates | Bullets |
|---|---|---|---|
| Co-Founder | VZN Media | 20XX – Present | Performance-based content agency; helped entrepreneurs grow on Instagram/TikTok; built and managed client content systems |
| Co-Founder / Developer | ExoCard | 20XX – Present | Built NFC digital business card SaaS; full-stack (HTML/CSS/TS/PHP/MySQL/.NET); collaborated with co-founder Bilal |
| [Any part-time / internship work] | — | — | Add if applicable |

**Card design:**
- Dark rounded card (`--bg-card`, `--radius-lg`, `border: 1px solid --border`)
- Icon circle on far left (outside card)
- Role title bold, company name in accent colour
- Date badge top-right: pill with `--bg-tertiary`
- 3–4 bullet points
- Stagger-reveal on scroll

---

### Section 3: Projects ("What I've built")
**Layout:** Filterable card grid

**Filter tabs:**
```
[All]  [Engineering]  [Business]
```

**Engineering Projects:**
| Project | Stack | GitHub | Live |
|---|---|---|---|
| ExoCard | HTML, CSS, TS, PHP, MySQL, .NET | link | link |
| Python Pokédex GUI | Python | link | — |
| Sorting Algorithm Visualiser | Python, Pygame | link | — |
| Unity RPG Game | Unity, C# | link | — |
| Python Discord Bot | Python | link | — |
| VB Fitness Tracker | VB.NET, MySQL | link | — |
| Java FizzBuzz w/ JUnit 5 | Java | link | — |
| Python Hangman | Python | link | — |

**Business Projects:**
| Project | Description |
|---|---|
| VZN Media | Performance content agency — Instagram & TikTok growth for entrepreneurs |
| ExoCard | NFC digital business card platform — co-founded SaaS product |

**Project card design:**
- Screenshot/image top (16:9, `object-fit: cover`)
- Project name, tech stack pill tags (mono font), one-line description
- Category badge top-right of image
- Hover: `translateY(-4px)`, brighter border, "View →" CTA slides in
- `data-category="engineering"` or `data-category="business"` on each card

---

### Section 4: Skills ("What I work with")
**Inspired by:** Callum's category filter tabs + pill tags in a bordered container

**Filter tabs:**
```
[All]  [Languages]  [Frameworks & Libraries]  [Tools]  [Business]
```

**Skill groups:**
```
Languages:
HTML · CSS · JavaScript · TypeScript · Python · Java · PHP · C# · Visual Basic · SQL

Frameworks & Libraries:
.NET Core · jQuery · Pygame · Discord.py · Apache ECharts · LightPick · SortableJS · Firebase

Tools:
Git · GitHub · VS Code · Unity Engine · MySQL

Business:
Short Form Content · Instagram Growth · TikTok Strategy · Personal Branding · Client Management · Agency Operations
```

---

### Section 5: Business Spotlight — VZN Media

```
[accent label]  MY AGENCY

VZN Media
Performance-Based Personal Branding

I co-founded VZN Media to help established entrepreneurs and
personal brands dominate Short Form Content on Instagram and TikTok.

[X+ Clients]   [X Million Views]   [X% Avg Growth]

[→ Visit vzn-media.com]   [→ Work With Us]
```

- Subtle VZN Media brand treatment / logo
- Client logos strip if available
- Testimonial quote if you have one

---

### Section 6: Contact ("Get in touch")
**Inspired by:** Callum's centred dark rounded card with "Open to opportunities" badge

```
╭────────────────────────────────────────────╮
│       [pill] Open to opportunities         │
│                                            │
│           Get in touch                     │
│                                            │
│  Whether you're hiring a developer,        │
│  looking for a content partner, or want    │
│  to collaborate — I'd love to hear from    │
│  you.                                      │
│                                            │
│  [✉ mzaydh@gmail.com] [LinkedIn] [GitHub] │
╰────────────────────────────────────────────╯
```

- Email: filled accent button (most prominent)
- LinkedIn + GitHub: outlined buttons

---

### Footer
```
© 2025 Zayd Hussain  ·  Built by Zayd  ·  [GitHub]  [LinkedIn]  [VZN Media]
```

---

## 6. Interactions & Animations

### On Load (staggered CSS)
1. Nav fades in — 0ms
2. Hero badge — 100ms
3. Hero name — 200ms
4. Hero body + CTAs — 350–500ms
5. Terminal widget fades in — 400ms, typing starts
6. Stats bar — 600ms

### Terminal Typing (JS)
- Character-by-character reveal per line
- Next line starts after previous completes
- Blinking cursor: `animation: blink 1s step-end infinite`

### On Scroll (Intersection Observer)
- Section labels + headings: `translateY(20px) opacity(0)` → normal
- Experience cards: stagger 100ms between each
- Project cards: stagger-reveal on grid entry
- Stats numbers: count-up on entry

### Hover
- Project cards: `translateY(-4px)` + glow shadow
- Experience cards: border to `--border-hover`
- Buttons: fill slides from left (`::before`, `overflow: hidden`)
- Nav links: underline grows left to right

---

## 7. Responsive Breakpoints

```css
@media (min-width: 640px)  { /* sm */ }
@media (min-width: 768px)  { /* md — tablet */ }
@media (min-width: 1024px) { /* lg — desktop */ }
@media (min-width: 1280px) { /* xl */ }
```

**Mobile changes:**
- Hero stacks vertically; terminal widget goes below text
- Terminal hidden on `< 480px` or simplified to static text
- Nav collapses to hamburger
- Project grid: 1 → 2 → 3 columns
- Experience cards: icon column collapses

---

## 8. SEO & Meta

```html
<title>Zayd Hussain — Software Engineer & Brand Strategist</title>
<meta name="description" content="Zayd Hussain — Software Engineering student, co-founder of VZN Media and ExoCard. Building software and growing brands." />

<meta property="og:title" content="Zayd Hussain" />
<meta property="og:description" content="Software Engineer & Personal Branding Specialist" />
<meta property="og:image" content="https://zaydhussain.co.uk/assets/images/og-image.jpg" />
<meta property="og:url" content="https://zaydhussain.co.uk" />
<meta property="og:type" content="website" />

<meta name="twitter:card" content="summary_large_image" />
<link rel="canonical" href="https://zaydhussain.co.uk" />
```

---

## 9. Performance Targets

| Metric | Target |
|---|---|
| Lighthouse Performance | ≥ 90 |
| LCP | < 2.5s |
| CLS | < 0.1 |
| Page weight | < 400KB |
| Images | WebP, `loading="lazy"` |
| Fonts | `<link rel="preload">`, `font-display: swap` |

---

## 10. Content Checklist

- [ ] High-quality profile photo (headshot, neutral background)
- [ ] Project screenshots for all 8 engineering projects (WebP)
- [ ] VZN Media logo (white/light version for dark bg)
- [ ] ExoCard screenshot / logo
- [ ] VZN Media stats: client count, views, growth %
- [ ] Start dates for VZN Media and ExoCard
- [ ] Client logos for VZN Media (if shareable)
- [ ] Testimonial quote from a VZN Media client
- [ ] Real numbers for stats bar
- [ ] LinkedIn + GitHub URLs confirmed
- [ ] Contact email confirmed

---

## 11. Build Phases

### Phase 0 — Prep
- [ ] Clone repo locally
- [ ] Back up current `index.html` as `index-old.html`
- [ ] Confirm GitHub Pages branch (main or gh-pages)
- [ ] Verify `CNAME` file exists and contains `zaydhussain.co.uk`
- [ ] Test local preview: `python3 -m http.server 8080`

### Phase 1 — HTML Structure
- [ ] Full `index.html` with all sections, semantic tags, IDs, `data-category` attributes

### Phase 2 — CSS
- [ ] `main.css`: variables, reset, fonts
- [ ] `layout.css`: nav, hero, section spacing, grids
- [ ] `components.css`: cards, buttons, badges, terminal, filter tabs

### Phase 3 — JavaScript
- [ ] `main.js`: scroll animations, nav behaviour, stat count-up
- [ ] `filter.js`: project + skills filter
- [ ] Terminal typing animation

### Phase 4 — Content & Polish
- [ ] Real photos, screenshots, logos
- [ ] Mobile responsive pass
- [ ] Cross-browser check

### Phase 5 — Deploy
- [ ] Lighthouse audit
- [ ] Confirm `CNAME` intact
- [ ] Push to main → verify live at `zaydhussain.co.uk`
- [ ] Test OG image at opengraph.xyz

---

## 12. Claude Code Workflow

```bash
# Clone your repo and open with Claude Code
git clone https://github.com/Zayd3030/<repo-name>
cd <repo-name>
claude .
```

**Prompts to use in order:**

1. `"Read BUILD.md. Back up index.html as index-old.html. Then create a new index.html with all 6 sections and nav using semantic HTML, correct IDs and data-category attributes as specced"`
2. `"Create css/main.css with the full design system from BUILD.md — variables, reset, Google Fonts import, base typography"`
3. `"Create css/layout.css — sticky nav, two-column hero layout, stats bar, section spacing, responsive grid"`
4. `"Create css/components.css — experience cards, project cards, skill pills, filter tabs, terminal widget, buttons, all hover states"`
5. `"Create js/main.js — Intersection Observer scroll animations, nav background on scroll, stats count-up animation"`
6. `"Create js/filter.js — project category filter and skills category filter with active tab styling"`
7. `"Add the terminal typing animation to js/main.js — character by character, line by line, blinking cursor"`
8. `"Full responsive pass — test and fix every section for mobile using the breakpoints in BUILD.md"`

---

## 13. Key Upgrades From Current Site

| Current | New |
|---|---|
| Generic GitHub project list | Curated filterable showcase |
| No experience section | Full timeline cards (VZN Media, ExoCard, etc.) |
| No personality in hero | Terminal widget + personal tone |
| No stats / social proof | Stats bar + VZN Media metrics |
| No business identity | Dedicated VZN Media spotlight section |
| No design system | Full dark theme, CSS variables, typography |
| No animations | Load reveals, scroll animations, typing effect |
| No SEO meta | Full OG + canonical + Twitter cards |
| Skills as a basic list | Filterable skill tabs with categories |

---

*This BUILD.md is the single source of truth. Keep it in the repo root and reference it at the start of every Claude Code session.*
