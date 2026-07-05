/* ═══════════════════════════════════════════════════════════
   FORMULA HUB — acidsBasesNav.js
   ACIDS & BASES MODULE NAV
   Sub-tab switching for the Acids & Bases module (calculators live in acidsBasesCalculators.js).
═══════════════════════════════════════════════════════════ */

  /* ═══════════════════════════════════════════════════════════
     ACIDS & BASES MODULE LOGIC
  ═══════════════════════════════════════════════════════════ */

  // ── Acid sub-tab switching ──
  function activateAcidTab(panelId) {
    if (activeCategory !== 'acids') syncActiveNav('acids');
    document.querySelectorAll('#acidsModule .mol-tab').forEach(t =>
      t.classList.toggle('active', t.dataset.acidPanel === panelId));
    document.querySelectorAll('#acidsModule .mol-panel').forEach(p =>
      p.classList.toggle('active', p.id === 'panel-' + panelId));
    setBreadcrumbSub(ACID_TAB_LABELS[panelId] || '');
  }

  document.querySelectorAll('#acidsModule .mol-tab').forEach(tab => {
    tab.addEventListener('click', () => activateAcidTab(tab.dataset.acidPanel));
  });

