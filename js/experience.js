/* ==========================================================================
   Cutveo — "Case Study" section data + renderers
   Cutveo has no client case studies yet, so the case study is the founder's
   own Instagram account (@kumarrujjawal) — real, verified numbers, not
   Cutveo's business account. Nothing here should ever read as client proof
   until there's an actual client to attribute it to.
   ========================================================================== */

/* ── Aggregate stat line ─────────────────────────────────────────────────────
   Real figures from @kumarrujjawal, supplied directly by the founder. A
   fourth figure ("791 editors in atova.club") was dropped on request — it's
   about a separate community, not Cutveo's editing output.
   ------------------------------------------------------------------------- */
const CASE_STUDY_STATS = [
  { value: '14.5K', label: 'organic followers, no paid promotion' },
  { value: '100%', label: 'self-produced, ideation through posting' },
  { value: '0', label: 'spent on ads to get there' }
];

/* Tools — safe to state; these are software, not claims about clients.
   Two lists rather than one: standard editing software, and the AI tools used
   alongside it. TODO(content): AI_TOOLS is deliberately not exhaustive — the
   "+ more" note next to it is real, not filler, so don't remove it without
   also removing the claim it's covering. Also feeds the horizontal tools band
   on Home — see js/tools-band.js. */
const STANDARD_TOOLS = [
  'Adobe Premiere Pro',
  'Adobe After Effects',
  'Adobe Photoshop'
];

const AI_TOOLS = [
  'Gemini',
  'Magnific AI',
  'Higgsfield',
  'Claude',
  'ChatGPT'
];

/* Renders the headline figures at the top of the Case Study: a big display
   value with its mono label beneath, one item per stat.
   @param {HTMLElement} mount
   @param {Array} stats   array of { value, label, placeholder? } */
function renderStats(mount, stats) {
  if (!mount) return;
  mount.replaceChildren();

  stats.forEach(function (stat) {
    const li = document.createElement('li');
    if (stat.placeholder) li.dataset.placeholder = 'true';

    const value = document.createElement('p');
    value.className = 'case-study__figure-value';
    value.textContent = stat.value;

    const label = document.createElement('p');
    label.className = 'mono case-study__figure-label';
    label.textContent = stat.label;

    li.append(value, label);
    mount.appendChild(li);
  });
}

/* Generic — used for both the Standard and the AI tool lists on About. Each
   mount gets its own <ul>, so the (01)(02)... counter in .tool-chip::before
   (see css/styles.css) restarts per list rather than running Standard into
   AI. */
function renderToolList(mount, tools) {
  if (!mount) return;
  mount.replaceChildren();

  tools.forEach(function (tool) {
    const li = document.createElement('li');
    li.className = 'tool-chip';
    li.textContent = tool;
    mount.appendChild(li);
  });
}
