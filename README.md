# Cutveo — website

Three-page marketing site. Plain HTML, CSS and vanilla JS. No build step, no
dependencies, no framework. Deploys as-is to Netlify, Vercel, Cloudflare Pages
or GitHub Pages — point them at this folder.

## Run it locally

```bash
python3 -m http.server 4173
```

Then open <http://localhost:4173>. Any static server works; the pages just need
to be served over HTTP rather than opened as `file://`, or the relative asset
paths won't resolve.

`python3 -m http.server` sends no `Cache-Control`, so browsers cache CSS and JS
heuristically and you may keep seeing an old build. Hard-reload (⌘⇧R) after
editing. Real hosts send proper headers, so this only affects local work.

## Layout

```
index.html         Home — masthead, Showreel, Case Study, Tools band, Selected Work, CTA
about.html         About — philosophy, bio, skills, CTA
projects.html      Projects — full grid with platform filters, CTA
css/styles.css     All styling. Design tokens live at the top.
js/projects.js     Project data + the project-card component (Projects page)
js/showreel.js     Direct YouTube embed (Home "Showreel")
js/reels.js        Reel data + the horizontal reel strip (Home "Selected Work")
js/experience.js   Case Study figures + Standard/AI tool lists (data shared by Home and About)
js/tools-band.js   Horizontal Tools & AI marquee (Home, reads the lists in js/experience.js)
js/site.js         Mobile nav, footer year, per-page wiring
assets/            Logo mark + favicon (placeholders)
assets/reels/      Vertical showreel clips — see assets/reels/README.md
assets/projects/   Horizontal project clips (the vertical ones reuse assets/reels/)
partials/          Canonical header/footer/CTA markup — see partials/README.md
```

## Everyday edits

| To change | Edit |
|---|---|
| Brand colour | `--brand` in `css/styles.css` (one line — everything derives from it) |
| Projects shown | the `PROJECTS` array in `js/projects.js` |
| Showreel video | `SHOWREEL_VIDEO_ID` in `js/showreel.js` |
| Reels in the strip | the `REELS` array in `js/reels.js` |
| Strip speed | `REEL_SPEED_PX_PER_SEC` in `js/reels.js` |
| Tools listed (About list + Home band) | `STANDARD_TOOLS` / `AI_TOOLS` in `js/experience.js` — one edit updates both |
| Tools band speed | `TOOLS_BAND_SPEED_PX_PER_SEC` in `js/tools-band.js` |
| Case Study headline figures | the `CASE_STUDY_STATS` array in `js/experience.js` |
| Booking link | search all three pages for `calendly.com/cutveo` (CTA block) |
| Contact email | search all three pages for `cutveo@gmail.com` |
| Header / footer / menu / CTA | see `partials/README.md` — inlined per page, three pastes |
| Mono label font | `--font-mono` in `css/styles.css` (plus the Google Fonts `<link>`) |

The two are separate on purpose: Home's "Selected Work" is the moving reel strip
(`REELS`), and the Projects page is the browsable, filterable grid with titles,
metrics and role tags (`PROJECTS`). A clip can appear in both — they're
different jobs, so they're different lists.

## The visual system

Editorial, not agency-template. Five devices carry it, and they're worth
knowing before you edit anything:

1. **The mono label layer.** Every piece of structural metadata — section index,
   platform, count, corner note — is uppercase `JetBrains Mono` at 11px
   (`.mono`). It frames the display type instead of competing with it. New
   sections get a `(0n) — Name` label, not a coloured eyebrow.
2. **Numbered indices.** Sections run `(01)`…`(0n)`; project cards carry `(01)`
   and a platform tag; tools are auto-numbered by a CSS counter. Numbers are the
   navigation.
3. **The brand field.** Brand blue is used as a full-bleed *ground*, not an
   accent. The sticky bar and the Home masthead share one uninterrupted plane of
   it, with everything on top set in cream. Section headings like "Selected
   Work" are set oversized and outlined (`.ghost-head`).
4. **Pinterest-style masonry, and two moving strips.** Project cards (`.project-grid`
   on Projects) pack into a pure-CSS multi-column masonry — 1/2/3/4 columns by
   width, no JS library — so a tall 9:16 card and a short 16:9 card sit tight
   against each other with no dead gap. (An earlier scattered-grid version was
   replaced with this on request — too much empty space between cards.) Home's
   "Selected Work" is a full-bleed row of vertical 9:16 reels travelling right
   to left at a steady 42px/s, edge to edge with **no fade mask**: tiles cut in
   hard at the right and out at the left. The Tools & AI band below Case Study
   reuses the exact same seamless-loop mechanism for plain text instead of
   media — see "How the marquees stay seamless" below.
5. **Restraint in the palette.** Warm cream, near-black, one gray, brand blue.
   Nothing else.

**Typography.** Instrument Sans 600/700 (headings), Inter 400/500/600 (body),
JetBrains Mono 400/500 (labels) — all Google Fonts, one `<link>`. The first two
are unchanged from the original brief: Arooth's heading font paired with Lanes
Pro's body font (Inter being the free cut of Inter Display). **The mono is an
addition** — the reference designs' whole feel rests on that micro-label layer
and it can't be faked with a small sans. Swap `--font-mono` if you'd rather use
something else; nothing else needs to change.

**How the tool lists number.** `.tool-row` resets a CSS counter per `<ul>`
(`css/styles.css`), so Standard and AI each start their own `(01)` rather than
AI continuing from wherever Standard left off. `renderToolList()` in
`js/experience.js` is generic — it takes a mount and an array, so a third tool
category is a new `STANDARD_TOOLS`-shaped array, a new mount id, and one more
call in `js/site.js`.

**How the marquees stay seamless.** Both `js/reels.js` and `js/tools-band.js`
use the same trick: the track holds its item list twice and animates to
`translateX(-50%)` (`@keyframes reel-scroll`), which is what makes tiles or
text enter from the right and exit at the left with no visible jump. Two
things make that wrap invisible, and both would break silently if changed:
the track carries a trailing gap (`padding-right`) so half its width lands
exactly one set plus one gap along, and one set has to be at least as wide as
the strip/band itself, or the tail clears the far edge before the repeat
arrives and leaves a hole. Both files measure the rendered width on load and
cycle the list until that's satisfied, then re-measure on resize. If you ever
add a third marquee, copy this pattern rather than inventing a new one.

**Palette.** The brand blue is untouched. The neutrals moved from cool
off-white/pure white to **warm cream** (`#EDEAE4` / `#E4E0D8`) against a near-
black (`#0E1014`), which is what gives the editorial feel. Measured ratios:
white on brand blue 6.2:1, brand blue on cream 5.2:1, gray on cream 4.9:1,
near-black on cream 15.8:1 — all clear of the WCAG AA 4.5:1 floor.

Three contrast traps worth remembering when you extend this:
- **Nothing on the blue field may be dimmed.** Cream on brand blue is 5.2:1 —
  only 0.7 above the floor. Drop it to 85% opacity and it lands at 4.2:1 and
  fails. Build hierarchy on that field with *font and size*, never opacity.
  Every value on the masthead is full-strength cream for this reason.
- **Brand blue on the near-black slab is only 3.0:1 and fails.** Links on dark
  grounds use `--on-dark`, not `--brand`. See `.nav-overlay__foot a`.
- **Brand blue on brand blue.** The logo mark and the primary button both invert
  inside the blue bar (`.site-header .logo-mark`, `.site-header .btn--primary`).
  Anything new you put in that bar needs the same treatment.

If the sampled hex from the real logo is materially lighter than `#4B46EB`,
re-check the white-on-blue ratio before shipping.

**Everything heavy is lazy, except the showreel now — and booking isn't an
embed at all.** Project cards serve local clips with `loading="lazy"`, so only
what scrolls into view is fetched — load-bearing here, given the GIFs total
300+ MB. The showreel used to be a click-to-load facade (nothing from YouTube
requested until the visitor clicked); that was removed on request so the
section shows YouTube's own native embed chrome instead of a custom button.
`js/showreel.js` now embeds the iframe directly with `loading="lazy"` — a
native browser hint that defers off-screen iframes, but a much weaker
guarantee than the old explicit click-gate, and it sits high enough on Home
that it may not be off-screen at all on many viewports. YouTube's player
JS now loads on every homepage visit. Booking is a plain link out to Calendly
rather than an inline widget: the widget sizes its own iframe and kept getting
clipped by the frame around it, and a link also works with JS disabled and
loads no third-party script.

**Accessibility.** Skip link, one `h1` per page with no skipped levels, labelled
landmarks, visible focus rings, `aria-current` on the active nav item,
`aria-expanded` on the mobile toggle, and `prefers-reduced-motion` honoured.
Alt text on the logo row names the organisation only.

The reel strip carries a **Pause button, and it is not optional** — WCAG 2.2.2
requires a way to stop anything that moves on its own for more than five
seconds, and the strip never stops by itself. If you restyle that section, the
control has to survive. Under `prefers-reduced-motion` the strip starts stopped
and the button becomes an opt-in to the movement; the duplicated second set of
tiles is `aria-hidden`, since it exists only to make the loop seamless.

**How the loop stays seamless.** The track holds the reels twice and animates to
`translateX(-50%)`. Two things make the wrap invisible, and both will bite you if
you change the markup: the track carries a trailing gap (`padding-right`) so half
its width is exactly one set plus one gap, and **one set must be at least as wide
as the viewport** or the tail clears the left edge before the repeat arrives,
leaving a visible hole. `renderReelStrip()` measures and cycles short lists to
cover that. Duration is derived from the measured width, so speed stays constant
whatever the tile size or reel count.

**Watch the video count on wide screens.** Tiles are rendered twice, and wide
viewports get extra copies — at 2600px that is 32 tiles, so 32 playing `<video>`
elements once the placeholders are replaced. Keep the clips tiny (see
`assets/reels/README.md`). If it ever stutters, widen `--reel-tile` sizing or
trim the `REELS` list rather than adding more.

**Navigation.** Desktop keeps the nav inline in the header — a three-page
marketing site shouldn't hide its own pages behind a hamburger. Below 900px it
becomes the full-screen dark overlay from the reference, with focus trapped
inside, scroll locked, and Escape to close.

**Progressive enhancement.** The header, footer, all copy and every link work
with JavaScript disabled — booking included, since it's a plain link. Only the
project cards, the reel strip and the overlay menu need JS; the Projects page
carries a `<noscript>` note pointing at Instagram.

---

## ⚠️ Before this goes live

Everything below is a **placeholder**. Nothing here invents a client name, a
metric or a testimonial — but nothing here is publishable either.

### Blocking — the site is wrong until these are real

1. **Showreel exposes the founder's real name — now visible on page load, not
   just on click. Look at this one first.** The Home showreel embeds a real
   YouTube video (`youtu.be/dkPL1Wx7Yu4`, `SHOWREEL_VIDEO_ID` in
   `js/showreel.js`). Checked via YouTube's public oEmbed API: the video's
   title is *"Video Editor & Channel Manager | Showreel 2025-26"* and its
   channel/author name is a real personal name, not a handle. `js/showreel.js`
   embeds the iframe directly now (a custom click-to-load facade was removed
   on request, to show YouTube's own native embed chrome instead) — which
   means that name and title render in the YouTube player's own UI immediately
   when the homepage loads, with no click required. Previously this was at
   least gated behind a click; it no longer is. There is no reliable iframe
   parameter to suppress channel attribution (`modestbranding` only affects
   the YouTube logo). This directly contradicts the anonymity rule in this
   brief: *"Never use the founder's real name or personal photo anywhere on
   the site."* I could not fix this at the code level — the fix has to happen
   at the source, e.g. re-upload the reel from a channel with no personal name
   attached to it (a Cutveo brand channel), or confirm this specific exposure
   is acceptable before launch.

2. **Brand hex.** `--brand: #4b46eb` in `css/styles.css:14` is the *estimate from
   the brief*, not a sample. The logo image was never supplied, so it could not
   be sampled. Open the Instagram profile picture, pick the circle's fill, and
   replace that one value. Same for the two `#4B46EB` fills in
   `assets/logo.svg` and `assets/favicon.svg`.

3. **Logo asset.** `assets/logo.svg` and `assets/favicon.svg` are placeholders I
   drew — a blue circle with "veo." set in a system sans. They are *not* the
   real wordmark. Replace both with exports of the actual logo. The header and
   footer currently use a CSS-drawn mark (`.logo-mark`); once a real image
   exists, swap that span for an `<img>`.

4. **Projects page weight — a standing issue, not a per-batch caveat.** 34 real
   clips are in: 26 horizontal (YouTube filter) and 8 vertical (Instagram
   filter), all GIF, **~327 MB** total (`du -sh assets/projects assets/reels`
   for the live number — clips keep getting added, so treat any number written
   here as already stale). Cards are lazy-loaded so only what enters the
   viewport is fetched, which is the only thing making this survivable at all.
   An MP4 re-encode measured a consistent **~10x reduction** against the
   equivalent GIFs the one time it was checked; kept as GIF at the founder's
   request each time this list has grown, most recently at ~327 MB. That
   request is being treated as durable, not re-litigated on every addition —
   if it should be revisited, that has to come from the founder, not from
   assuming the number is now "too big."
   `href` is empty on every entry; add the published video links when public.

5. **Reel strip — all eight slots filled, and the section is far too heavy.**
   The GIFs total **~50 MB**. `reel-04.gif` alone is **22 MB** — roughly 35s of
   footage where every other clip is 4-9s. On a plain `python3 -m http.server`
   the strip took over 20 seconds to paint *on localhost*, at 36 MB; it is worse
   now. On a real connection this is a dead section for most visitors.
   Re-export the set as H.264 MP4 (~0.4 MB each, about 3 MB total) and trim
   reel-04 to 6-8s. The code already renders `<video>` when `src` ends `.mp4`,
   so it is a filename change in `REELS` and nothing else.

6. **Tools & AI band has no way to stop it.** Removed on request, along with
   cutting the band's height by roughly half. WCAG 2.2.2 requires a visible
   control for anything that moves on its own past five seconds — the reel
   strip elsewhere on Home still has its Pause button; this band doesn't.
   `prefers-reduced-motion` is still honoured (the band starts motionless for
   visitors whose OS has that on), but that's a passive fallback, not the
   required control, and it only helps visitors who've configured that
   setting. If this needs to clear an accessibility review, wire a Pause
   button back the same way `js/reels.js` wires the reel strip's: a button
   sibling (never a child) of the mount, toggling `data-paused` on the
   `.tools-band` section via a click handler.

### Needs a decision from you

7. **Founder bio wording.** `about.html` is written **fully anonymous** — "its
   founder", "a full-time video editor and channel manager". No name, no photo,
   no reference to any other business, anywhere in copy, alt text, meta tags or
   file names. If first-name-only gets approved, only the first paragraph under
   "Who's behind it" changes.

8. **"AI creator".** Not mentioned anywhere on the site. It's an open question
   in the brief and I had nothing to base a claim on, so I left it out. Say the
   word if it should appear.

9. **OG image.** No `assets/og-image.png` exists, so link previews will be
    bare. A 1200×630 image plus the `og:image` and `og:url` tags in each
    `<head>` would fix it.

### Alternate subheadlines

The brief invited options. The hero currently uses the draft as written. Two
alternates in the same voice, if you want to A/B them:

- *"Most channels don't have a footage problem. They have an edit problem. We fix the second one."*
- *"We edit YouTube and Instagram content for people who've noticed their retention graph falls off a cliff at 0:30."*

### Resolved

- **Capability section reworked — formats, not services.** "What We Handle" on
  About no longer splits Editing vs. Channel Management. Cutveo doesn't
  currently offer channel management, so that column is gone. In its place:
  the two formats actually edited — **Horizontal** (long-form: talking-head
  videos, podcasts, documentaries) and **Vertical / Short-form** (talking-head
  videos, and repurposing from podcasts). An earlier pass added a shared
  **Craft** block underneath (pacing, motion graphics, colour, sound) so those
  skills didn't read as exclusive to one format — removed on request, so the
  section is now just the two format columns. Tools split into **Standard**
  (Premiere Pro, After Effects, Photoshop) and **AI** (Gemini, Magnific AI,
  Higgsfield, Claude, ChatGPT, + more) — each list numbers independently, see
  "How the tool lists number" below. Same split fed Home's old Experience
  section (since replaced by Case Study — see below) and still feeds the
  masthead's Tools column (DaVinci Resolve dropped from the masthead list — it
  was never in scope, just inherited from an earlier draft).

- **Experience section replaced with Case Study — Cutveo's own account, not a
  client.** Home's `(02)` section no longer runs the "Years of edits before
  the first invoice" stat block plus a "Worked with" logo roster. Cutveo has
  no client case studies yet, so a real client-shaped section had nothing
  honest to put in it. In its place: a **Case Study** section built around
  Cutveo's own Instagram (`@cut.veo`) — heading, a stat line (still
  placeholder tokens, now framed as followers/views/reels rather than
  videos-edited/channels-managed), and a 4-tile grid explicitly labelled
  "Reels — @cut.veo" and left blank until real reels are picked. `WORKED_WITH`
  and `renderWorkedWith()` are deleted, not hidden — there was nowhere else on
  the site using them, and reviving a client-logo roster later is cheap to
  rebuild from this note if the underlying need comes back.
  **Tools moved out entirely**, into a new full-bleed, brand-blue **Tools &
  AI band** directly below Case Study (`js/tools-band.js`) — every name from
  `STANDARD_TOOLS`/`AI_TOOLS` as scrolling plain text, reusing the exact
  seamless-loop mechanism the reel strip already used (see "How the marquees
  stay seamless"). It launched with its own Pause button per WCAG 2.2.2 — that
  button was removed on request and the band's height cut by roughly half,
  see the Blocking checklist below for what that trade-off means.

- **Case Study copy rewritten to match a reference's format, not its numbers.**
  The founder supplied a competitor's real case-study text as a copy source —
  a real person's real follower count, ad spend, and named community. Copying
  those verbatim onto Cutveo's site would present someone else's specific,
  attributable facts as if they were @cut.veo's own verified stats, which is
  fabrication regardless of whose words carry it. What got matched instead:
  the two-line declarative headline shape, the first-person "everything gets
  tested here first" narrative beat, and the three-stat layout — all rewritten
  in Cutveo's own voice, values still `X`/`Y`/`Z` placeholders. Real @cut.veo
  numbers drop in as a one-line edit in `CASE_STUDY_STATS` whenever they exist.

- **Case Study restructured to a supplied reference's shape.** The section now
  runs: subject (`@kumarrujjawal`) + role, three headline figures, a rule, then
  **Before** in the left column and **What we did** / **Impact** in the right,
  with a row of three reels under each. Only the *structure* came from the
  reference the founder supplied — type, colour, mono labels and spacing are
  Cutveo's own throughout. Notes on the pieces:
  - The dotted-leader `.stat-line` component is **gone**, replaced by
    `.case-study__figures` — same `CASE_STUDY_STATS` data, rendered as big
    display values with a mono label under each. `renderStats()` in
    `js/experience.js` emits the new markup; nothing else used `.stat-line`.
  - Both reel rows are filled, each cover captioned with its view count.
    **Before:** `reel-before-mistakes.jpg` (7,882), `reel-before-own-videos.jpg`
    (5,670), `reel-before-jl-cut.jpg` (8,322) — plain phone-shot talking heads.
    **After:** `reel-actors.jpg` (799K), `reel-frames.jpg` (49.4K),
    `reel-palettes.jpg` (46.5K) — designed covers. All six supplied by the
    founder, view counts taken from the filenames they arrived under.
  - What keeps the two rows level: `.case-study__col` is a flex column with
    each `.case-study__reels` block on `margin-top: auto`, so differing copy
    lengths above don't push one row out of line with the other. It's load-
    bearing — remove it and the rows desynchronise.
  - `reel-storytelling.jpg` (3,630 views) is on disk but **unused** — it was
    the fourth cover from the earlier version and wasn't among the three the
    founder picked for "after". Ask before deleting; it may belong in the
    "before" row.
  - Two of the three after covers show the founder's face, so the
    **"no personal photo" exception is live again**, alongside the handle
    being shown as text. Both are approved for this section specifically and
    neither extends to the rest of the site — `about.html` stays fully
    anonymous (see item 7 above).
  - **The Before / What we did / Impact copy is a DRAFT and needs review.**
    "What we did" and "Impact" only restate what the supplied figures already
    establish (self-produced, no ad spend, 14.5K followers, a 799K reel), so
    they assert nothing that isn't evidenced. **"Before" is the weak one** —
    the real starting point isn't known here, so it says only what's safely
    true of any unfunded account. Marked `TODO(content)` in `index.html`.
    Worth noting the covers now carry an argument the copy doesn't yet make:
    5-8K views on the before reels against 46K-799K on the after ones, same
    person, same account. That contrast is evidenced and free to use.

- **Case Study re-attributed to @kumarrujjawal (the founder's personal
  account), not @cut.veo — real numbers, real handle, both shown as text.**
  The section's account line, lead paragraph, stat-line `aria-label`, and the
  "Reels" heading all read `@kumarrujjawal` now, and `CASE_STUDY_STATS` in
  `js/experience.js` carries three real, founder-supplied figures — **14.5K**
  organic followers (no paid promotion), **100%** self-produced (ideation
  through posting), **0** spent on ads — replacing the `X`/`Y`/`Z` placeholder
  tokens. A fourth figure the founder supplied, "791 editors in atova.club,"
  was left out on request: it's about a separate community, not Cutveo's
  editing output. This is a second, larger exception to the anonymity rule
  than the photos above — `@kumarrujjawal` is the founder's real name as
  literal, visible, searchable text, which is exactly what the brief's
  anonymity rule was written to prevent. I flagged that distinction explicitly
  before making the change; the founder confirmed showing the handle anyway.
  It's still scoped to this one section: `about.html` stays fully anonymous
  (see item 8 below), and the two exceptions here don't license using the name
  or a photo anywhere else on the site without the same explicit sign-off.
  Numbers were also correct to begin with, not fabricated — the earlier
  refusal in this log to copy a "competitor's" case-study numbers turned out
  to rest on a wrong assumption: `@kumarrujjawal` is the founder's own
  account, not a third party's, so reusing its real figures here isn't
  misattribution the way copying a stranger's numbers would have been.

- **Contact email — done.** `cutveo@gmail.com` replaces the `hello@cutveo.co`
  placeholder across all three pages and both partials (`partials/cta.html`,
  `partials/footer.html`), in the link text and the `mailto:` alike.

- **Calendly link — done.** The CTA on all three pages links out to
  `https://calendly.com/cutveo/30min`, opening in a new tab. Verified live: the
  owner reads "cut veo", the event is "30 Minute - Intro call", and the calendar
  is taking bookings.
- **Inline embed removed.** The Calendly inline widget was replaced with a
  direct link — the widget sizes its own iframe and was being clipped by the
  frame around it. `js/calendly.js` is deleted, so there is now no third-party
  JavaScript anywhere on the site.
- **Call length — done.** The real event is **30 minutes**, not the 20 I had
  placeheld. The CTA copy on all three pages and the Booking column in the Home
  masthead now say 30. If you ever change the event's duration, those four
  places have to change with it.
