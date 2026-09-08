/* ==========================================================================
   Cutveo — horizontal Tools & AI band (Home, below Case Study)
   Every name from STANDARD_TOOLS and AI_TOOLS (js/experience.js) as plain
   text, travelling right to left across a full-bleed brand-blue band. Same
   seamless-loop technique as the reel strip in js/reels.js: the track holds
   the list twice and animates to translateX(-50%), so a trailing gap plus a
   set at least as wide as the band is what makes the wrap invisible.
   ========================================================================== */

const TOOLS_BAND_SPEED_PX_PER_SEC = 36;

function buildToolsBandItems() {
  const items = [];
  items.push({ text: 'Standard', kind: 'group' });
  STANDARD_TOOLS.forEach(function (tool) { items.push({ text: tool, kind: 'tool' }); });
  items.push({ text: 'AI', kind: 'group' });
  AI_TOOLS.forEach(function (tool) { items.push({ text: tool, kind: 'tool' }); });
  return items;
}

function createToolsBandItem(item, isDuplicate) {
  const li = document.createElement('li');
  li.className = 'tools-band__item' + (item.kind === 'group' ? ' tools-band__item--group' : '');
  li.textContent = item.text;
  // The repeat exists only to make the loop seamless — hide it from AT.
  if (isDuplicate) li.setAttribute('aria-hidden', 'true');
  return li;
}

function fillToolsBandTrack(track, list) {
  track.replaceChildren();
  list.forEach(function (item) { track.appendChild(createToolsBandItem(item, false)); });
  list.forEach(function (item) { track.appendChild(createToolsBandItem(item, true)); });
}

/**
 * Build the band. Same two-part trick as renderReelStrip in js/reels.js:
 * the track holds the item list twice and animates to translateX(-50%); a
 * trailing gap (padding-right in CSS) puts the halfway point at exactly one
 * set plus one gap, and the set is cycled until it's at least as wide as the
 * band so the tail never clears the edge before the repeat arrives.
 */
function renderToolsBand(mount) {
  if (!mount) return;
  mount.replaceChildren();

  const baseItems = buildToolsBandItems();
  if (!baseItems.length) return;

  const track = document.createElement('ul');
  track.className = 'tools-band__track';
  mount.appendChild(track);

  fillToolsBandTrack(track, baseItems);
  const oneSetWidth = track.scrollWidth / 2;
  const bandWidth = mount.clientWidth;

  if (oneSetWidth > 0 && bandWidth > oneSetWidth) {
    const copies = Math.ceil(bandWidth / oneSetWidth);
    const list = [];
    for (let c = 0; c < copies; c += 1) {
      baseItems.forEach(function (item) { list.push(item); });
    }
    fillToolsBandTrack(track, list);
  }

  const setWidth = track.scrollWidth / 2;
  const duration = setWidth > 0 ? setWidth / TOOLS_BAND_SPEED_PX_PER_SEC : 40;
  track.style.setProperty('--tools-band-duration', duration.toFixed(2) + 's');
}

/* No visible Pause control on this band (removed on request — see the
   README's Resolved section for the WCAG 2.2.2 tradeoff that removal makes).
   `prefers-reduced-motion` is still honoured passively: someone who has that
   OS setting on gets the band motionless from the first paint, with no button
   needed to make it happen.
   `data-paused` lives on the outer <section class="tools-band">, not on the
   mount div the track gets rendered into — the mount's children are replaced
   wholesale on every (re)render, so anything stateful has to live one level
   up. `closest()` finds that ancestor. */
function applyToolsBandReducedMotion(mount) {
  if (!mount) return;
  const band = mount.closest('.tools-band') || mount;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  band.dataset.paused = String(reduce.matches);
}

function initToolsBand(mount) {
  if (!mount) return;

  renderToolsBand(mount);
  applyToolsBandReducedMotion(mount);

  let lastWidth = mount.clientWidth;
  let timer = null;

  window.addEventListener('resize', function () {
    if (Math.abs(mount.clientWidth - lastWidth) < 40) return;
    window.clearTimeout(timer);
    timer = window.setTimeout(function () {
      lastWidth = mount.clientWidth;
      renderToolsBand(mount);
    }, 180);
  });
}
