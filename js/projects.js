/* ==========================================================================
   Cutveo — project data + the project-card component (Projects page)

   ── HOW THE FILTERS WORK ────────────────────────────────────────────────────
   `platform` drives both the filter tabs and the card shape:

     'youtube'   -> horizontal 16:9 card. Long-form YouTube work.
     'instagram' -> vertical   9:16 card. Reels and Shorts.

   The All tab shows both. Nothing else needs configuring.

   ── HOW TO ADD A PROJECT ────────────────────────────────────────────────────
     {
       id:          'unique-slug',
       title:       'Shown on the card',
       description: 'One line on what the edit does.',
       platform:    'youtube' | 'instagram',
       media:       'assets/projects/yt-01.gif',   // .gif/.webp -> <img>, .mp4/.webm -> <video>
       href:        '',            // optional: link out to the published video
       role:        'Editor',      // the work done. NEVER frame this as "Client".
       metric:      ''             // optional. Leave '' unless the number is verified.
     }

   ── NOTE ON WEIGHT ──────────────────────────────────────────────────────────
   The horizontal set is ~277MB of GIF and the vertical set ~50MB (~327MB
   total). Cards are lazy-loaded, so only what scrolls into view is fetched,
   but a visitor who reaches the bottom of the All tab will have pulled the
   lot — at this size, that's a lot. An MP4 re-encode of an earlier, smaller
   version of this set measured ~15MB against ~167MB of GIF, a ~10x reduction;
   that ratio has held as more clips were added, so ~327MB of GIF would land
   around ~33MB as MP4. Kept as GIF at the founder's request, reconfirmed each
   time this list has grown. This note stops being updated per-batch — see
   README.md for the standing flag; check current folder size for the live
   number rather than trusting the figure above.

   The vertical entries deliberately point at `assets/reels/` rather than a copy
   in `assets/projects/` — same files as the Home strip, so they exist once on
   disk and share one browser cache entry.
   ========================================================================== */

const PROJECTS = [
  /* ── Long-form YouTube ──────────────────────────────────────────────────
     yt-01 through yt-10 are sequences from two business-explainer edits (a
     beer-market story and an innerwear-market story); yt-11 onward are single
     sequences pulled from various other, unrelated edits. Titles describe the
     craft in each shot, not the source video.
     TODO(content): if yt-01..10 should read as two grouped projects rather
     than ten separate sequences, say so and they can be grouped.
     TODO(links): add `href` to each once the published videos are public. */
  {
    id: 'yt-01',
    title: 'Coastline market map',
    description: 'Illustrated map built on-screen to establish where the market grew, animated in scene rather than cutting to a flat graphic.',
    platform: 'youtube',
    media: 'assets/projects/yt-01.gif',
    href: '',
    role: 'Editor',
    metric: ''
  },
  {
    id: 'yt-02',
    title: 'Stamp-grid motif',
    description: 'Repeating product stamps used as a scale device, timed so the grid completes on the voiceover beat.',
    platform: 'youtube',
    media: 'assets/projects/yt-02.gif',
    href: '',
    role: 'Editor',
    metric: ''
  },
  {
    id: 'yt-03',
    title: 'Colour-field reset',
    description: 'Full-bleed colour plate that clears the frame between chapters, giving the next point a clean entry.',
    platform: 'youtube',
    media: 'assets/projects/yt-03.gif',
    href: '',
    role: 'Editor',
    metric: ''
  },
  {
    id: 'yt-04',
    title: 'Territory reveal',
    description: 'Topographic push-in isolating the region the story turns on, labelled in plain type so the map does the work.',
    platform: 'youtube',
    media: 'assets/projects/yt-04.gif',
    href: '',
    role: 'Editor',
    metric: ''
  },
  {
    id: 'yt-05',
    title: 'Product line-up card',
    description: 'Archive photograph framed as a print card and held just long enough to read the whole shelf.',
    platform: 'youtube',
    media: 'assets/projects/yt-05.gif',
    href: '',
    role: 'Editor',
    metric: ''
  },
  {
    id: 'yt-06',
    title: 'Archive era title',
    description: 'Black-and-white archive footage with a serif year set over it, date-stamping the chapter without narration.',
    platform: 'youtube',
    media: 'assets/projects/yt-06.gif',
    href: '',
    role: 'Editor',
    metric: ''
  },
  {
    id: 'yt-07',
    title: 'Competitor wall',
    description: 'Three campaign posters staged as a gallery wall so the positioning of each brand reads in a single frame.',
    platform: 'youtube',
    media: 'assets/projects/yt-07.gif',
    href: '',
    role: 'Editor',
    metric: ''
  },
  {
    id: 'yt-08',
    title: 'Market highlight',
    description: 'Region picked out in colour against a desaturated map to show the footprint at a glance.',
    platform: 'youtube',
    media: 'assets/projects/yt-08.gif',
    href: '',
    role: 'Editor',
    metric: ''
  },
  {
    id: 'yt-09',
    title: 'Archive ad pan',
    description: 'Slow move across a vintage press advertisement, letting the original copy carry the point rather than a caption.',
    platform: 'youtube',
    media: 'assets/projects/yt-09.gif',
    href: '',
    role: 'Editor',
    metric: ''
  },
  {
    id: 'yt-10',
    title: 'Product spotlight',
    description: 'Product isolated in a vignette and centred for a single-idea beat, cleaned up off a stock plate.',
    platform: 'youtube',
    media: 'assets/projects/yt-10.gif',
    href: '',
    role: 'Editor',
    metric: ''
  },
  {
    id: 'yt-11',
    title: 'Publication citation card',
    description: 'A masthead and headline framed as a live news card, using the source outlet’s own type and colour to carry the claim without narration.',
    platform: 'youtube',
    media: 'assets/projects/yt-11.gif',
    href: '',
    role: 'Editor',
    metric: ''
  },
  {
    id: 'yt-12',
    title: 'Kinetic line reveal',
    description: 'A single sentence built word by word against a plain field, holding attention on the line before the next cut.',
    platform: 'youtube',
    media: 'assets/projects/yt-12.gif',
    href: '',
    role: 'Editor',
    metric: ''
  },
  {
    id: 'yt-13',
    title: 'Icon-and-wordmark reveal',
    description: 'A circular mark animates in beside a name card, introducing a source or sponsor without a full title sequence.',
    platform: 'youtube',
    media: 'assets/projects/yt-13.gif',
    href: '',
    role: 'Editor',
    metric: ''
  },
  {
    id: 'yt-14',
    title: 'Cost-breakdown table',
    description: 'A running-cost table built around a hero product shot, columns filling in as the presenter walks through each line item.',
    platform: 'youtube',
    media: 'assets/projects/yt-14.gif',
    href: '',
    role: 'Editor',
    metric: ''
  },
  {
    id: 'yt-15',
    title: 'Framed photo carousel',
    description: 'A bordered card cycling through sourced photography with a date-range badge, giving archival stills a consistent presentation frame.',
    platform: 'youtube',
    media: 'assets/projects/yt-15.gif',
    href: '',
    role: 'Editor',
    metric: ''
  },
  {
    id: 'yt-16',
    title: 'Year-marker timeline',
    description: 'A horizontal timeline with dated waypoints, drawing on as the narration moves chronologically through the story.',
    platform: 'youtube',
    media: 'assets/projects/yt-16.gif',
    href: '',
    role: 'Editor',
    metric: ''
  },
  {
    id: 'yt-17',
    title: 'Portrait with data badge',
    description: 'A portrait held in frame with a figure badge locked to the corner, pairing a face to a number without cutting away.',
    platform: 'youtube',
    media: 'assets/projects/yt-17.gif',
    href: '',
    role: 'Editor',
    metric: ''
  },
  {
    id: 'yt-18',
    title: 'Abstract concept graphic',
    description: 'A 3D icon animates against a textured field to stand in for an idea in the voiceover, where no literal footage exists.',
    platform: 'youtube',
    media: 'assets/projects/yt-18.gif',
    href: '',
    role: 'Editor',
    metric: ''
  },
  {
    id: 'yt-19',
    title: 'Brand card reveal',
    description: 'A full logo card scales in from a slab of colour, marking a transition to a new subject without a spoken introduction.',
    platform: 'youtube',
    media: 'assets/projects/yt-19.gif',
    href: '',
    role: 'Editor',
    metric: ''
  },
  {
    id: 'yt-20',
    title: 'Overhead desk checklist',
    description: 'A checklist shot from directly above a styled desk, setting up the video’s structure before the narration begins.',
    platform: 'youtube',
    media: 'assets/projects/yt-20.gif',
    href: '',
    role: 'Editor',
    metric: ''
  },
  {
    id: 'yt-21',
    title: 'Callout-ready product shot',
    description: 'A product hero shot with an empty label field positioned for a spec or price callout to animate in.',
    platform: 'youtube',
    media: 'assets/projects/yt-21.gif',
    href: '',
    role: 'Editor',
    metric: ''
  },
  {
    id: 'yt-22',
    title: 'Layered photo collage',
    description: 'Two photographs stacked and rotated with a bold border colour, contrasting an interior shot against a street scene.',
    platform: 'youtube',
    media: 'assets/projects/yt-22.gif',
    href: '',
    role: 'Editor',
    metric: ''
  },
  {
    id: 'yt-23',
    title: 'Interview subject at podium',
    description: 'A speaker held in a mid shot with a smaller reference photo pinned in the corner, keeping the audience oriented on who is talking.',
    platform: 'youtube',
    media: 'assets/projects/yt-23.gif',
    href: '',
    role: 'Editor',
    metric: ''
  },
  {
    id: 'yt-24',
    title: 'Gradient colour card',
    description: 'A soft duotone gradient card used as a transition plate between sections.',
    platform: 'youtube',
    media: 'assets/projects/yt-24.gif',
    href: '',
    role: 'Editor',
    metric: ''
  },
  {
    id: 'yt-25',
    title: 'Rotated year card',
    description: 'A tilted colour card carrying a single year, marking a jump back in the timeline.',
    platform: 'youtube',
    media: 'assets/projects/yt-25.gif',
    href: '',
    role: 'Editor',
    metric: ''
  },
  {
    id: 'yt-26',
    title: 'Vintage logo card',
    description: 'An archival logo treated in low-contrast monochrome against a dark field, framed by a bracketed timeline marker.',
    platform: 'youtube',
    media: 'assets/projects/yt-26.gif',
    href: '',
    role: 'Editor',
    metric: ''
  },

  /* ── Vertical Reels / Shorts ─────────────────────────────────────────────
     Same files as the Home strip — see the note at the top of this file. */
  {
    id: 'ig-01',
    title: 'Caption-punch talking head',
    description: 'Straight-to-camera cut with an animated caption that punches in on the key phrase.',
    platform: 'instagram',
    media: 'assets/reels/reel-01.gif',
    href: '',
    role: 'Editor',
    metric: ''
  },
  {
    id: 'ig-02',
    title: 'Subtitled b-roll',
    description: 'B-roll sequence carried entirely by burned-in subtitles, built to read on silent autoplay.',
    platform: 'instagram',
    media: 'assets/reels/reel-02.gif',
    href: '',
    role: 'Editor',
    metric: ''
  },
  {
    id: 'ig-03',
    title: 'Kinetic-type podcast cut',
    description: 'Podcast clip with full-frame kinetic type covering the set-up so the payoff lands on camera.',
    platform: 'instagram',
    media: 'assets/reels/reel-03.gif',
    href: '',
    role: 'Editor',
    metric: ''
  },
  {
    id: 'ig-04',
    title: 'Callout-led explainer',
    description: 'Talking-head edit with a graphic callout timed to arrive on the punchline.',
    platform: 'instagram',
    media: 'assets/reels/reel-04.gif',
    href: '',
    role: 'Editor',
    metric: ''
  },
  {
    id: 'ig-05',
    title: 'Composited product frame',
    description: 'Cut-out subject composited over a treated background plate to sell the idea in one image.',
    platform: 'instagram',
    media: 'assets/reels/reel-05.gif',
    href: '',
    role: 'Editor',
    metric: ''
  },
  {
    id: 'ig-06',
    title: 'Archive-ad opener',
    description: 'Vintage advertisement animated in under title cards, setting the period in the first second.',
    platform: 'instagram',
    media: 'assets/reels/reel-06.gif',
    href: '',
    role: 'Editor',
    metric: ''
  },
  {
    id: 'ig-07',
    title: 'Documentary profile card',
    description: 'Documentary still with a lower-third callout introducing the subject without stopping the cut.',
    platform: 'instagram',
    media: 'assets/reels/reel-07.gif',
    href: '',
    role: 'Editor',
    metric: ''
  },
  {
    id: 'ig-08',
    title: 'Graphic-led title sequence',
    description: 'Boarding-pass device built in frame to introduce the subject and the journey in one graphic.',
    platform: 'instagram',
    media: 'assets/reels/reel-08.gif',
    href: '',
    role: 'Editor',
    metric: ''
  }
];

const PLATFORM_LABEL = { youtube: 'YouTube', instagram: 'Instagram' };

/* Escape any string before it reaches innerHTML. */
function esc(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* Two-digit index used by the mono label above each card: 1 -> "01". */
function padIndex(n) {
  return String(n).padStart(2, '0');
}

/* GIF and WebP have to go in an <img>; MP4/WebM in a <video>. */
function createProjectMedia(project) {
  if (/\.(gif|webp|png|jpe?g)$/i.test(project.media)) {
    const img = document.createElement('img');
    img.src = project.media;
    // Essential here: the GIF set is large, so only what scrolls into view loads.
    img.loading = 'lazy';
    img.decoding = 'async';
    img.alt = project.title;
    return img;
  }

  const video = document.createElement('video');
  video.src = project.media;
  video.muted = true;
  video.loop = true;
  video.autoplay = true;
  video.playsInline = true;
  video.setAttribute('playsinline', '');
  video.setAttribute('preload', 'metadata');
  video.setAttribute('aria-label', project.title);
  return video;
}

/**
 * Build one project card.
 * @param {Object} project
 * @param {number} index   1-based position, shown as the card's "(01)" label
 */
function createProjectCard(project, index) {
  const li = document.createElement('li');
  li.className = 'project-card';
  li.dataset.platform = project.platform;

  const vertical = project.platform === 'instagram';
  const platformLabel = PLATFORM_LABEL[project.platform] || 'Video';

  // Mono label strip above the media: running index left, platform right.
  const head = document.createElement('div');
  head.className = 'project-card__head';
  head.innerHTML =
    '<span class="mono mono--ink">(' + esc(padIndex(index)) + ')</span>' +
    '<span class="mono">' + esc(platformLabel) + '</span>';

  const media = document.createElement('div');
  media.className = 'project-card__media' + (vertical ? ' project-card__media--vertical' : '');

  if (project.media) {
    const node = createProjectMedia(project);
    // Link out to the published video when there is one to link to.
    if (project.href) {
      const link = document.createElement('a');
      link.href = project.href;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.setAttribute('aria-label', project.title + ' — watch on ' + platformLabel);
      link.appendChild(node);
      media.appendChild(link);
    } else {
      media.appendChild(node);
    }
  } else {
    // No media yet — a clearly labelled empty frame, never a fake embed.
    const empty = document.createElement('div');
    empty.className = 'project-card__empty mono';
    empty.textContent = 'Placeholder — ' + platformLabel + ' clip goes here';
    media.appendChild(empty);
  }

  const body = document.createElement('div');
  body.className = 'project-card__body';
  body.innerHTML =
    '<h3 class="project-card__title">' + esc(project.title) + '</h3>' +
    (project.metric ? '<p class="project-card__metric">' + esc(project.metric) + '</p>' : '') +
    '<p class="project-card__desc">' + esc(project.description) + '</p>' +
    // Role tag. Always the work done — never framed as a client relationship.
    '<p class="mono project-card__foot">Role &mdash; ' + esc(project.role || 'Editor') + '</p>';

  li.append(head, media, body);
  return li;
}

/**
 * Render a set of project cards into a <ul>.
 * @param {HTMLElement} mount   the <ul class="project-grid"> to fill
 * @param {Object} options      { limit?: number, filter?: 'all'|'youtube'|'instagram' }
 */
function renderProjects(mount, options) {
  if (!mount) return;
  const opts = options || {};
  let list = PROJECTS.slice();

  if (opts.filter && opts.filter !== 'all') {
    list = list.filter(function (p) { return p.platform === opts.filter; });
  }
  if (opts.limit) list = list.slice(0, opts.limit);

  mount.replaceChildren();

  if (!list.length) {
    const li = document.createElement('li');
    li.className = 'placeholder-box';
    li.textContent = 'No projects in this category yet.';
    mount.appendChild(li);
    return;
  }

  list.forEach(function (project, i) {
    mount.appendChild(createProjectCard(project, i + 1));
  });

  // Expose the visible count so a mono label elsewhere can read it, e.g. "(18)".
  document.querySelectorAll('[data-project-count]').forEach(function (el) {
    el.textContent = '(' + padIndex(list.length) + ')';
  });
}

/* Wire up the Projects page filter tabs, if present. */
function initProjectFilters(tabList, mount) {
  if (!tabList || !mount) return;
  const tabs = Array.from(tabList.querySelectorAll('.filter-tab'));

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.setAttribute('aria-selected', String(t === tab)); });
      renderProjects(mount, { filter: tab.dataset.filter });
    });
  });
}
