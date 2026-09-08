/* ==========================================================================
   Cutveo — sitewide behaviour
   Mobile nav toggle, footer year, and per-page component wiring.
   Everything here is progressive: the site reads and navigates fine without JS.
   ========================================================================== */

(function () {
  'use strict';

  /* ── Full-screen overlay menu ───────────────────────────────────────────────
     Below 900px the inline nav is replaced by a dark full-screen menu set in
     oversized display type. Focus is trapped inside it while open, page scroll
     is locked, and Escape closes it.
     ------------------------------------------------------------------------ */
  function initNav() {
    const toggle = document.querySelector('.nav-toggle');
    const overlay = document.getElementById('nav-overlay');
    if (!toggle || !overlay) return;

    const closeBtn = overlay.querySelector('.nav-overlay__close');
    const FOCUSABLE = 'a[href], button:not([disabled])';

    function setOpen(open) {
      toggle.setAttribute('aria-expanded', String(open));
      overlay.dataset.open = String(open);
      overlay.setAttribute('aria-hidden', String(!open));
      document.body.style.overflow = open ? 'hidden' : '';
      if (open && closeBtn) closeBtn.focus();
    }

    toggle.addEventListener('click', function () { setOpen(true); });
    if (closeBtn) closeBtn.addEventListener('click', function () {
      setOpen(false);
      toggle.focus();
    });

    // Any link inside the overlay closes it — in-page anchors included.
    overlay.addEventListener('click', function (event) {
      if (event.target.closest('a')) setOpen(false);
    });

    overlay.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        setOpen(false);
        toggle.focus();
        return;
      }
      if (event.key !== 'Tab') return;

      // Keep Tab cycling within the overlay while it's open.
      const items = Array.from(overlay.querySelectorAll(FOCUSABLE));
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    // Resizing up into the desktop layout restores the inline nav.
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 900 && overlay.dataset.open === 'true') setOpen(false);
    });

    setOpen(false);
  }

  /* ── Footer copyright year ──────────────────────────────────────────────── */
  function initYear() {
    document.querySelectorAll('[data-year]').forEach(function (el) {
      el.textContent = String(new Date().getFullYear());
    });
  }

  /* ── Page wiring ────────────────────────────────────────────────────────── */
  function initPage() {
    // Showreel (home only)
    if (typeof initShowreel === 'function') {
      initShowreel(document.getElementById('showreel-embed'));
    }

    // Case Study section (home only)
    if (typeof renderStats === 'function') {
      renderStats(document.getElementById('case-study-stats'), CASE_STUDY_STATS);
    }

    // Tools & AI band (home only)
    if (typeof initToolsBand === 'function') {
      initToolsBand(document.getElementById('tools-band-mount'));
    }

    // Tools — Standard / AI split, present on About (Capability index) as a
    // numbered list. renderToolList no-ops when a mount is missing, so this
    // runs safely on every page.
    if (typeof renderToolList === 'function') {
      renderToolList(document.getElementById('tool-row-standard'), STANDARD_TOOLS);
      renderToolList(document.getElementById('tool-row-ai'), AI_TOOLS);
    }

    // Reel strip (home "Selected Work")
    if (typeof initReelWall === 'function') {
      initReelWall(
        document.getElementById('reel-wall'),
        document.getElementById('reel-toggle')
      );
    }

    // Full project grid (projects page)
    if (typeof renderProjects === 'function') {
      const full = document.getElementById('project-grid');
      if (full) {
        renderProjects(full, { filter: 'all' });
        initProjectFilters(document.getElementById('project-filters'), full);
      }
    }

    // Booking is a plain link in the CTA section — no wiring needed here.
  }

  function boot() {
    initNav();
    initYear();
    initPage();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
