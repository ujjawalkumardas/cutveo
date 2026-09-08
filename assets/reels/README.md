# Reel clips

## Current contents

All eight slots are filled. Every file is 360x640 at 12fps.

| File | Size | Length |
|---|---|---|
| `reel-01.gif` | 3.7 MB | ~5.8s |
| `reel-02.gif` | 3.8 MB | ~4.0s |
| `reel-03.gif` | 6.2 MB | ~8.8s |
| `reel-04.gif` | 22.4 MB | **~35s — far too long, trim to 6-8s** |
| `reel-05.gif` | 3.9 MB | ~3.8s |
| `reel-06.gif` | 2.7 MB | ~4.5s |
| `reel-07.gif` | 4.2 MB | ~6.4s |
| `reel-08.gif` | 3.2 MB | ~4.6s |

**~50 MB total.** Re-exporting the set as MP4 would bring it to roughly 3 MB.
Files were renamed on import; some originals carried a brand name and project
codes, which the anonymity rule bars from filenames.

## Adding more

Drop the vertical showreel clips here, then fill in `src` (and `poster`) in the
`REELS` array at the top of `js/reels.js`. Until then every tile renders as a
labelled placeholder rectangle.

**Use MP4, not GIF.** The same clip is roughly 20x smaller as H.264 at better
quality, and an animated GIF can't be stopped from script — the Pause button
would halt the strip's travel but not the clips inside it, which defeats the
point of having it. The code accepts `.gif` (rendered as `<img>`) so a handoff
never fails silently, but MP4 is the format this is built for.

**Specs** — several play at once, so keep them light:

| | |
|---|---|
| Aspect | 9:16 vertical |
| Size | ~720 x 1280 |
| Length | 6–10s loop |
| Codec | H.264 MP4 |
| Weight | under ~1.5 MB each |

Add a `poster` JPG (the first frame) alongside each clip so tiles don't flash
black before playback starts.

Naming: `reel-01.mp4` / `reel-01.jpg`, matching the `id` in the array.

## If you must ship GIF

Budget roughly `width x height x fps x seconds x k` bytes, where `k` is ~0.5 for
calm footage and ~0.9 for fast cuts or grain. 360x640 at 12fps / 128 colours
lands near 7-13 MB for 5s and 14-25 MB for 10s. Don't exceed 360px wide — tiles
render at 148-240 CSS px, so anything larger is wasted bytes. To cut size, in
order of effect: shorten the clip, drop FPS, halve the width (quadratic), reduce
colours.
