/* ==========================================================================
   Cutveo — Home showreel embed
   A plain YouTube embed — no custom play button drawn over it. The resting
   frame is whatever YouTube itself renders before playback (its own
   thumbnail + its own play control), same as pasting a normal embed anywhere
   else. `loading="lazy"` is the one concession to performance: the browser
   defers requesting the iframe until it's near the viewport, without needing
   a custom click-to-load layer on top of it.
   ========================================================================== */

/* youtu.be/dkPL1Wx7Yu4 */
const SHOWREEL_VIDEO_ID = 'dkPL1Wx7Yu4';

function initShowreel(mount) {
  if (!mount) return;

  const frame = document.createElement('iframe');
  frame.src = 'https://www.youtube-nocookie.com/embed/' + SHOWREEL_VIDEO_ID + '?rel=0';
  frame.title = 'Cutveo showreel';
  frame.loading = 'lazy';
  frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
  frame.allowFullscreen = true;
  frame.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');

  mount.replaceChildren(frame);
}
