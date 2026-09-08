# Partials

There is no build step. Every page ships complete, static HTML — that's what
keeps the site fast, deployable anywhere, and hand-editable a year from now.

The tradeoff: the header, footer and CTA markup is **inlined in all three
pages**. The files in this folder are the canonical copies. When one of those
blocks changes, change it here first, then paste it into each page.

## The blocks

| File               | Marker comment in each page | Appears in |
|--------------------|-----------------------------|------------|
| `header.html`      | `<!-- ══ HEADER ══ ... -->` | index, about, projects |
| `masthead.html`    | `<!-- ── Masthead ── -->`   | index only |
| `nav-overlay.html` | `<!-- ══ OVERLAY MENU ══ ... -->` | index, about, projects |
| `footer.html`      | `<!-- ══ FOOTER ══ ... -->` | index, about, projects |
| `cta.html`         | `<!-- ══ CTA / BOOKING ══ ... -->` | index, about, projects |

Each block in a page sits directly below its marker comment and ends at the
matching closing tag (`</header>`, `</div>`, `</footer>`, `</section>`).

`nav-overlay.html` is the full-screen dark menu shown below 900px. It lives
outside `<main>`, directly after the header.

`masthead.html` is the blue field on Home. It is **not** shared — it exists only
so you can see the block on its own. The header sits directly above it with no
gap; if you add spacing between them the single plane of colour breaks.

## The per-page differences

`header.html` and `nav-overlay.html` carry `aria-current="page"` on the **Home**
link. When pasting into another page, move that attribute to the link for the
page you're on and remove it from the others.

`cta.html` opens with a mono index label — `(03) — Booking` on Home, `(04)` on
About, `(02)` on Projects. The number is that section's position on its page, so
adjust it to match. Nothing else differs.

## Adding a fourth page

1. Copy `about.html` — it has the simplest body.
2. Replace `<main>`, the `<title>`, the meta description and the canonical URL.
3. Add a nav `<li>` to `header.html` and a footer `<li>` to `footer.html`, then
   re-paste both into every page.

## If this becomes a chore

At five or more pages, reach for a static site generator (Eleventy is the
smallest jump — it reads plain HTML with includes and outputs the same static
files). Until then, three pastes is cheaper than a toolchain.
