/* ==========================================================================
   Cutveo — Selected Work reel strip
   One full-bleed row of vertical 9:16 tiles travelling right to left.

   ── HOW TO SWAP A RECTANGLE FOR A REAL REEL ─────────────────────────────────
   Every entry below renders a placeholder rectangle while `src` is empty. Fill
   `src` (and ideally `poster`) and it becomes an autoplaying muted loop — no
   other change needed.

     { id: 'reel-01',
       src:    'assets/reels/reel-01.mp4',   // vertical, 9:16
       poster: 'assets/reels/reel-01.jpg',   // first frame, keeps it from flashing black
       label:  'Reel 01' }                   // shown on the placeholder + used as alt

   Keep the clips SHORT and SMALL — the whole row plays at once, and the strip
   renders each reel at least twice. 6–10s, ~720x1280, H.264, under ~1.5MB each
   is a good target. `preload="metadata"` is set for you.

   TODO(content): all entries are placeholders. Replace with real reels.
   ========================================================================== */

const REELS = [
  // TODO(perf): all eight are GIFs totalling ~50MB, and reel-04 alone is 22MB
  // (~35s where the rest are 4-9s). Re-exporting the set as MP4 would take it to
  // roughly 3MB. `label` doubles as alt text — keep it describing the edit, not
  // the person on screen.
  { id: 'reel-01', src: 'assets/reels/reel-01.gif', poster: '', label: 'Talking-head edit with animated caption' },
  { id: 'reel-02', src: 'assets/reels/reel-02.gif', poster: '', label: 'B-roll edit with subtitle overlay' },
  { id: 'reel-03', src: 'assets/reels/reel-03.gif', poster: '', label: 'Podcast edit with kinetic type' },
  { id: 'reel-04', src: 'assets/reels/reel-04.gif', poster: '', label: 'Talking-head edit with graphic callout' },
  { id: 'reel-05', src: 'assets/reels/reel-05.gif', poster: '', label: 'Composited product edit with motion background' },
  { id: 'reel-06', src: 'assets/reels/reel-06.gif', poster: '', label: 'Archive-footage edit with animated titles' },
  { id: 'reel-07', src: 'assets/reels/reel-07.gif', poster: '', label: 'Documentary edit with lower-third callout' },
  { id: 'reel-08', src: 'assets/reels/reel-08.gif', poster: '', label: 'Graphic-led edit with animated typography' }
];

/* Travel speed in pixels per second. The duration is derived from this and the
   measured width, so the strip moves at the same pace whatever the tile size or
   the number of reels. Raise it to speed the row up. */
const REEL_SPEED_PX_PER_SEC = 42;

function createReelTile(reel, isDuplicate) {
  const li = document.createElement('li');
  li.className = 'reel-tile';
  // The repeat exists only to make the loop seamless — hide it from AT.
  if (isDuplicate) li.setAttribute('aria-hidden', 'true');

  if (reel.src && /\.(gif|webp|png|jpe?g)$/i.test(reel.src)) {
    // Image formats can't go in a <video>, which would fail silently. Note that
    // an animated GIF cannot be stopped from script, so the Pause button will
    // halt the strip's travel but not the clip itself — prefer MP4.
    const img = document.createElement('img');
    img.src = reel.src;
    img.loading = 'lazy';
    img.decoding = 'async';
    img.alt = reel.label;
    li.appendChild(img);
  } else if (reel.src) {
    const video = document.createElement('video');
    video.src = reel.src;
    if (reel.poster) video.poster = reel.poster;
    video.muted = true;
    video.loop = true;
    video.autoplay = true;
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('preload', 'metadata');
    video.setAttribute('aria-label', reel.label);
    li.appendChild(video);
  } else {
    const ph = document.createElement('div');
    ph.className = 'reel-tile__placeholder';
    const label = document.createElement('span');
    label.className = 'mono mono--dark';
    label.textContent = reel.label;
    ph.appendChild(label);
    li.appendChild(ph);
  }

  return li;
}

function fillTrack(track, list) {
  track.replaceChildren();
  list.forEach(function (reel) { track.appendChild(createReelTile(reel, false)); });
  list.forEach(function (reel) { track.appendChild(createReelTile(reel, true)); });
}

/**
 * Build the strip.
 *
 * The track holds the reels twice and animates to translateX(-50%), which moves
 * it leftward so tiles enter from the right. Two things make that wrap
 * invisible:
 *
 *   1. The track carries a trailing gap (padding-right in CSS), so half its
 *      width lands exactly one set plus one gap along.
 *   2. One set must be at least as wide as the strip itself, or the tail would
 *      clear the right edge before the repeat arrives and leave a hole. Short
 *      reel lists are cycled until the set is wide enough.
 */
function renderReelStrip(mount) {
  if (!mount) return;
  mount.replaceChildren();
  if (!REELS.length) return;

  const track = document.createElement('ul');
  track.className = 'reel-track';
  mount.appendChild(track);

  // Measure one pass to learn the real tile width at this viewport.
  fillTrack(track, REELS);
  const oneSetWidth = track.scrollWidth / 2;
  const stripWidth = mount.clientWidth;

  if (oneSetWidth > 0 && stripWidth > oneSetWidth) {
    // Exactly enough to cover, no more. Every extra copy doubles into two more
    // tiles, and once these are real clips each tile is a playing <video>.
    const copies = Math.ceil(stripWidth / oneSetWidth);
    const list = [];
    for (let c = 0; c < copies; c += 1) {
      REELS.forEach(function (reel) { list.push(reel); });
    }
    fillTrack(track, list);
  }

  const setWidth = track.scrollWidth / 2;
  const duration = setWidth > 0 ? setWidth / REEL_SPEED_PX_PER_SEC : 60;
  track.style.setProperty('--reel-duration', duration.toFixed(2) + 's');
}

/**
 * Wire the pause control.
 * WCAG 2.2.2: anything that moves on its own for more than five seconds needs a
 * way to stop it. The strip never stops on its own, so this button is required,
 * not decorative.
 */
function initReelToggle(button, strip) {
  if (!button || !strip) return;

  function setPaused(paused) {
    strip.dataset.paused = String(paused);
    button.setAttribute('aria-pressed', String(paused));
    button.textContent = paused ? 'Play' : 'Pause';

    strip.querySelectorAll('video').forEach(function (v) {
      if (paused) { v.pause(); } else { v.play().catch(function () {}); }
    });
  }

  button.addEventListener('click', function () {
    setPaused(strip.dataset.paused !== 'true');
  });

  // Someone who asked for reduced motion gets it stopped, and the button then
  // works the other way round — as an opt-in to the movement.
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  setPaused(reduce.matches);
}

function initReelWall(mount, button) {
  if (!mount) return;

  renderReelStrip(mount);
  initReelToggle(button, mount);

  // Tile width is viewport-relative, so both the set width and the duration go
  // stale on resize. Only rebuild on a real width change — mobile browsers fire
  // resize when the address bar hides, which changes height alone.
  let lastWidth = mount.clientWidth;
  let timer = null;

  window.addEventListener('resize', function () {
    if (Math.abs(mount.clientWidth - lastWidth) < 40) return;
    window.clearTimeout(timer);
    timer = window.setTimeout(function () {
      lastWidth = mount.clientWidth;
      const wasPaused = mount.dataset.paused === 'true';
      renderReelStrip(mount);
      mount.dataset.paused = String(wasPaused);
      if (!wasPaused) {
        mount.querySelectorAll('video').forEach(function (v) {
          v.play().catch(function () {});
        });
      }
    }, 180);
  });
}
