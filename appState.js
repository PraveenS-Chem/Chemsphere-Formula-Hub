/* ═══════════════════════════════════════════════════════════
   FORMULA HUB — appState.js
   APP STATE, RENDER & EVENTS
   Core view state, top-level render helpers, and global event wiring.
═══════════════════════════════════════════════════════════ */

  // ── STATE ──
  let activeCategory = 'all';
  let searchQuery    = '';

  // ── RENDER ──
  function getFiltered() {
    return FORMULAS.filter(f => {
      const catOk = activeCategory === 'all' || f.category === activeCategory;
      const q     = searchQuery.toLowerCase();
      const searchOk = !q ||
        f.name.toLowerCase().includes(q) ||
        f.expr.toLowerCase().includes(q) ||
        f.desc.toLowerCase().includes(q) ||
        f.vars.some(v => v.toLowerCase().includes(q));
      return catOk && searchOk;
    });
  }

  // ── EVENTS ──
  document.querySelectorAll('.nav-item[data-category]').forEach(el => {
    el.addEventListener('click', () => {
      const cat = el.dataset.category;
      if (['mole','solutions','gas','acids','stoichiometry','all','recent','bookmarks','periodic','constants'].includes(cat)) {
        setCategory(cat);
      }
      // Close mobile sidebar
      document.getElementById('sidebar').classList.remove('open');
      document.getElementById('overlay').classList.remove('show');
    });
  });

  // Dismiss first-time hint
  const hubHint = document.getElementById('hubHint');
  document.getElementById('hubHintDismiss').addEventListener('click', () => {
    if (hubHint) {
      hubHint.style.display = 'none';
      hubHint.dataset.dismissed = 'true';
    }
  });

  document.querySelectorAll('.cat-card[data-category]').forEach(el => {
    el.addEventListener('click', () => setCategory(el.dataset.category));
  });

  document.getElementById('searchInput').addEventListener('input', e => {
    searchQuery = e.target.value;
    updatePageMeta();
    renderCards();
  });

