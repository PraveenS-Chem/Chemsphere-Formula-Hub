/* ═══════════════════════════════════════════════════════════
   FORMULA HUB — enhancedSearch.js
   ENHANCED SEARCH
   Search dropdown with deep-link navigation straight to a formula's calculator, wrapped in its own IIFE (initEnhancedSearch).
═══════════════════════════════════════════════════════════ */

  /* ═══════════════════════════════════════════════════════════
     ENHANCED SEARCH — dropdown with deep-link navigation
  ═══════════════════════════════════════════════════════════ */
  (function initEnhancedSearch() {

    // ── Route map: formula id → {cat, tab, openFn} ──
    const ROUTE = {
      // Mole
      1:  { cat:'mole',         tab:'mole-calc',             open: () => { setCategory('mole');         activateMoleTab('mole-calc'); }},
      2:  { cat:'mole',         tab:'mass-mole',             open: () => { setCategory('mole');         activateMoleTab('mass-mole'); }},
      3:  { cat:'mole',         tab:'particle-calc',         open: () => { setCategory('mole');         activateMoleTab('particle-calc'); }},
      5:  { cat:'mole',         tab:'mole-calc',             open: () => { setCategory('mole');         activateMoleTab('mole-calc'); }},
      6:  { cat:'mole',         tab:'mole-calc',             open: () => { setCategory('mole');         activateMoleTab('mole-calc'); }},
      // Solutions
      7:  { cat:'solutions',    tab:'sol-molarity',          open: () => { setCategory('solutions');    activateSolTab('sol-molarity'); }},
      8:  { cat:'solutions',    tab:'sol-molality',          open: () => { setCategory('solutions');    activateSolTab('sol-molality'); }},
      9:  { cat:'solutions',    tab:'sol-dilution',          open: () => { setCategory('solutions');    activateSolTab('sol-dilution'); }},
      10: { cat:'solutions',    tab:'sol-normality',         open: () => { setCategory('solutions');    activateSolTab('sol-normality'); }},
      11: { cat:'solutions',    tab:'sol-raoult',            open: () => { setCategory('solutions');    activateSolTab('sol-raoult'); }},
      // Gas Laws
      12: { cat:'gas',          tab:'gas-boyle',             open: () => { setCategory('gas');          activateGasTab('gas-boyle'); }},
      13: { cat:'gas',          tab:'gas-charles',           open: () => { setCategory('gas');          activateGasTab('gas-charles'); }},
      14: { cat:'gas',          tab:'gas-gaylussac',         open: () => { setCategory('gas');          activateGasTab('gas-gaylussac'); }},
      25: { cat:'gas',          tab:'gas-combined',          open: () => { setCategory('gas');          activateGasTab('gas-combined'); }},
      15: { cat:'gas',          tab:'gas-ideal',             open: () => { setCategory('gas');          activateGasTab('gas-ideal'); }},
      16: { cat:'gas',          tab:'gas-graham',            open: () => { setCategory('gas');          activateGasTab('gas-graham'); }},
      // Acids & Bases
      17: { cat:'acids',        tab:'acid-ph',               open: () => { setCategory('acids');        activateAcidTab('acid-ph'); }},
      18: { cat:'acids',        tab:'acid-poh',              open: () => { setCategory('acids');        activateAcidTab('acid-poh'); }},
      19: { cat:'acids',        tab:'acid-phrel',            open: () => { setCategory('acids');        activateAcidTab('acid-phrel'); }},
      // Stoichiometry
      22: { cat:'stoichiometry',tab:'stoich-yield',          open: () => { setCategory('stoichiometry');activateStoichTab('stoich-yield'); }},
      23: { cat:'stoichiometry',tab:'stoich-limiting',       open: () => { setCategory('stoichiometry');activateStoichTab('stoich-limiting'); }},
    };

    // Module-level entries (no specific tab)
    const MODULE_ENTRIES = [
      { type:'module', icon:'🔬', name:'Mole Concept',   meta:'Module — moles, mass, particles',     cat:'mole',          open: () => setCategory('mole') },
      { type:'module', icon:'🧪', name:'Solutions',      meta:'Module — molarity, dilution, normality', cat:'solutions',   open: () => setCategory('solutions') },
      { type:'module', icon:'💨', name:'Gas Laws',       meta:'Module — Boyle, Charles, Ideal Gas',  cat:'gas',           open: () => setCategory('gas') },
      { type:'module', icon:'🧫', name:'Acids & Bases',  meta:'Module — pH, pOH, ion concentration', cat:'acids',         open: () => setCategory('acids') },
      { type:'module', icon:'⚗️', name:'Stoichiometry',  meta:'Module — yield, limiting reagent, empirical formula', cat:'stoichiometry', open: () => setCategory('stoichiometry') },
    ];

    // Calculator tab entries (direct calculator links)
    const CALC_ENTRIES = [
      { type:'calc', icon:'🔬', name:'Mole Calculator',            meta:'n = m / M',                  cat:'mole',          open: () => { setCategory('mole');         activateMoleTab('mole-calc'); }},
      { type:'calc', icon:'⚛️', name:'Mass–Mole Converter',        meta:'N = n × Nₐ',                 cat:'mole',          open: () => { setCategory('mole');         activateMoleTab('mass-mole'); }},
      { type:'calc', icon:'📦', name:'Particle Calculator',        meta:'n = N / Nₐ',                 cat:'mole',          open: () => { setCategory('mole');         activateMoleTab('particle-calc'); }},
      { type:'calc', icon:'🧪', name:'Molarity Calculator',        meta:'C = n / V',                  cat:'solutions',     open: () => { setCategory('solutions');    activateSolTab('sol-molarity'); }},
      { type:'calc', icon:'💧', name:'Molality Calculator',        meta:'b = n / kg(solvent)',         cat:'solutions',     open: () => { setCategory('solutions');    activateSolTab('sol-molality'); }},
      { type:'calc', icon:'🧬', name:'Normality Calculator',       meta:'N = n·eq / V',               cat:'solutions',     open: () => { setCategory('solutions');    activateSolTab('sol-normality'); }},
      { type:'calc', icon:'🌊', name:'Dilution Calculator',        meta:'C₁V₁ = C₂V₂',               cat:'solutions',     open: () => { setCategory('solutions');    activateSolTab('sol-dilution'); }},
      { type:'calc', icon:'🫧', name:"Raoult's Law Calculator",   meta:'Pₛ = χₛ · P°',              cat:'solutions',     open: () => { setCategory('solutions');    activateSolTab('sol-raoult'); }},
      { type:'calc', icon:'💨', name:"Boyle's Law Calculator",    meta:'P₁V₁ = P₂V₂',               cat:'gas',           open: () => { setCategory('gas');          activateGasTab('gas-boyle'); }},
      { type:'calc', icon:'🌡️', name:"Charles' Law Calculator",   meta:'V₁/T₁ = V₂/T₂',             cat:'gas',           open: () => { setCategory('gas');          activateGasTab('gas-charles'); }},
      { type:'calc', icon:'🔥', name:"Gay-Lussac's Law Calc",     meta:'P₁/T₁ = P₂/T₂',             cat:'gas',           open: () => { setCategory('gas');          activateGasTab('gas-gaylussac'); }},
      { type:'calc', icon:'⚗️', name:'Combined Gas Law Calc',      meta:'P₁V₁/T₁ = P₂V₂/T₂',        cat:'gas',           open: () => { setCategory('gas');          activateGasTab('gas-combined'); }},
      { type:'calc', icon:'📐', name:'Ideal Gas Law Calculator',   meta:'PV = nRT',                   cat:'gas',           open: () => { setCategory('gas');          activateGasTab('gas-ideal'); }},
      { type:'calc', icon:'🌬️', name:"Graham's Law Calculator",   meta:'r₁/r₂ = √(M₂/M₁)',          cat:'gas',           open: () => { setCategory('gas');          activateGasTab('gas-graham'); }},
      { type:'calc', icon:'🧫', name:'pH Calculator',              meta:'pH = -log[H⁺]',              cat:'acids',         open: () => { setCategory('acids');        activateAcidTab('acid-ph'); }},
      { type:'calc', icon:'💢', name:'pOH Calculator',             meta:'pOH = -log[OH⁻]',            cat:'acids',         open: () => { setCategory('acids');        activateAcidTab('acid-poh'); }},
      { type:'calc', icon:'⚛️', name:'[H⁺] Concentration Calc',   meta:'[H⁺] = Kw ÷ [OH⁻]',         cat:'acids',         open: () => { setCategory('acids');        activateAcidTab('acid-h'); }},
      { type:'calc', icon:'💧', name:'[OH⁻] Concentration Calc',  meta:'[OH⁻] = Kw ÷ [H⁺]',         cat:'acids',         open: () => { setCategory('acids');        activateAcidTab('acid-oh'); }},
      { type:'calc', icon:'⚖️', name:'pH + pOH Relation Calc',    meta:'pH + pOH = 14',              cat:'acids',         open: () => { setCategory('acids');        activateAcidTab('acid-phrel'); }},
      { type:'calc', icon:'📊', name:'Percent Yield Calculator',   meta:'% Yield = Actual/Theor × 100', cat:'stoichiometry', open: () => { setCategory('stoichiometry');activateStoichTab('stoich-yield'); }},
      { type:'calc', icon:'🧮', name:'Theoretical Yield Calc',     meta:'Theoretical = Actual ÷ (%/100)', cat:'stoichiometry', open: () => { setCategory('stoichiometry');activateStoichTab('stoich-theoretical'); }},
      { type:'calc', icon:'🔬', name:'Empirical Formula Calc',     meta:'Mass → Moles → Simplify ratio', cat:'stoichiometry', open: () => { setCategory('stoichiometry');activateStoichTab('stoich-empirical'); }},
      { type:'calc', icon:'⚗️', name:'Limiting Reagent Calculator',meta:'Ratio = Amount ÷ Coefficient', cat:'stoichiometry', open: () => { setCategory('stoichiometry');activateStoichTab('stoich-limiting'); }},
    ];

    // Build variable index from FORMULAS array
    function buildVarEntries() {
      const seen = new Set();
      const entries = [];
      FORMULAS.forEach(f => {
        const route = ROUTE[f.id];
        if (!route) return;
        f.vars.forEach(v => {
          const key = `${v}::${f.id}`;
          if (seen.has(key)) return;
          seen.add(key);
          entries.push({
            type: 'variable',
            icon: f.icon,
            name: v,
            meta: `${f.name} — ${f.expr}`,
            cat: f.category,
            open: route.open,
          });
        });
      });
      return entries;
    }

    const VAR_ENTRIES = buildVarEntries();

    // Build formula entries from FORMULAS with routes
    function buildFormulaEntries() {
      return FORMULAS
        .filter(f => ROUTE[f.id])
        .map(f => ({
          type: 'formula',
          icon: f.icon,
          name: f.name,
          meta: f.expr,
          cat:  f.category,
          open: ROUTE[f.id].open,
        }));
    }

    const FORMULA_ENTRIES = buildFormulaEntries();

    // All searchable entries in priority order
    const ALL_ENTRIES = [
      ...MODULE_ENTRIES,
      ...CALC_ENTRIES,
      ...FORMULA_ENTRIES,
      ...VAR_ENTRIES,
    ];

    const TAG_LABELS = {
      module:   ['sd-tag-module',   'Module'],
      calc:     ['sd-tag-calc',     'Calculator'],
      formula:  ['sd-tag-formula',  'Formula'],
      variable: ['sd-tag-variable', 'Variable'],
    };

    const CAT_COLORS = {
      mole:'#00d4ff', solutions:'#00ffcc', gas:'#a78bfa',
      acids:'#fb923c', stoichiometry:'#f472b6',
    };

    let activeIdx = -1;
    let visibleItems = [];

    const input    = document.getElementById('searchInput');
    const dropdown = document.getElementById('searchDropdown');
    const searchWrap = input.closest('.search-wrap');

    function score(entry, q) {
      const lq = q.toLowerCase();
      const name = entry.name.toLowerCase();
      const meta = (entry.meta || '').toLowerCase();
      if (name === lq) return 100;
      if (name.startsWith(lq)) return 80;
      if (name.includes(lq)) return 60;
      if (meta.includes(lq)) return 40;
      if (entry.cat && entry.cat.includes(lq)) return 20;
      return 0;
    }

    function search(q) {
      if (!q || q.length < 1) return [];
      return ALL_ENTRIES
        .map(e => ({ e, s: score(e, q) }))
        .filter(x => x.s > 0)
        .sort((a, b) => {
          if (b.s !== a.s) return b.s - a.s;
          // secondary: type priority
          const order = { module: 0, calc: 1, formula: 2, variable: 3 };
          return (order[a.e.type] || 9) - (order[b.e.type] || 9);
        })
        .map(x => x.e)
        .slice(0, 12);
    }

    function renderDropdown(results) {
      activeIdx = -1;
      visibleItems = results;

      if (!results.length) {
        dropdown.innerHTML = `<div class="sd-empty"><strong>No results</strong>Try a formula name, variable, or module</div>`;
        dropdown.classList.add('open');
        return;
      }

      // Group by type
      const groups = {};
      results.forEach(r => {
        if (!groups[r.type]) groups[r.type] = [];
        groups[r.type].push(r);
      });

      const typeOrder = ['module', 'calc', 'formula', 'variable'];
      const typeLabels = { module:'Modules', calc:'Calculators', formula:'Formulas', variable:'Variables' };

      let html = '';
      typeOrder.forEach(type => {
        if (!groups[type]) return;
        html += `<div class="sd-section-label">${typeLabels[type]}</div>`;
        groups[type].forEach((r, i) => {
          const [tagClass, tagText] = TAG_LABELS[r.type] || ['', ''];
          const accentColor = CAT_COLORS[r.cat] || 'var(--accent-cyan)';
          const globalIdx = results.indexOf(r);
          html += `
            <div class="sd-item" data-idx="${globalIdx}" role="option">
              <span class="sd-icon">${r.icon}</span>
              <div class="sd-text">
                <div class="sd-name">${r.name}</div>
                <div class="sd-meta">${r.meta || ''}</div>
              </div>
              <span class="sd-tag ${tagClass}">${tagText}</span>
            </div>`;
        });
      });

      dropdown.innerHTML = html;
      dropdown.classList.add('open');

      dropdown.querySelectorAll('.sd-item').forEach(el => {
        el.addEventListener('mousedown', e => {
          e.preventDefault(); // prevent blur before click
          const idx = parseInt(el.dataset.idx);
          selectResult(visibleItems[idx]);
        });
        el.addEventListener('mouseenter', () => {
          activeIdx = parseInt(el.dataset.idx);
          highlightItem(activeIdx);
        });
      });
    }

    function highlightItem(idx) {
      dropdown.querySelectorAll('.sd-item').forEach((el, i) => {
        el.classList.toggle('sd-active', parseInt(el.dataset.idx) === idx);
      });
    }

    function closeDropdown() {
      dropdown.classList.remove('open');
      activeIdx = -1;
    }

    function flashDestination(tabId) {
      if (!tabId) return;
      const panel = document.getElementById('panel-' + tabId);
      if (!panel) return;
      panel.classList.remove('calc-highlight');
      // force reflow
      void panel.offsetWidth;
      panel.classList.add('calc-highlight');
      // scroll panel into view gently
      setTimeout(() => panel.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
      panel.addEventListener('animationend', () => panel.classList.remove('calc-highlight'), { once: true });
    }

    function selectResult(entry) {
      if (!entry) return;
      // Clear search input and close dropdown
      input.value = '';
      searchWrap.classList.remove('has-query');
      searchQuery = '';
      closeDropdown();
      updatePageMeta();
      renderCards();
      // Navigate
      entry.open();
      // Get the tab id for flash — look up from CALC_ENTRIES or from ROUTE
      // by matching the entry's open fn to CALC_ENTRIES or MODULE_ENTRIES
      const calcMatch = CALC_ENTRIES.find(c => c.name === entry.name);
      const fMatch = FORMULA_ENTRIES.find(f => f.name === entry.name);
      const match = calcMatch || fMatch;
      if (match) {
        // Find panel id from ROUTE
        const routeEntry = Object.values(ROUTE).find(r => r.open === match.open || JSON.stringify(r.open) === JSON.stringify(match.open));
        // Instead, find via tab name embedded in meta — simpler: scan ROUTE for matching open fn
      }
      // Flash: scan ROUTE for any entry whose open === entry.open (by reference)
      // Since lambdas aren't equal by ref, flash by finding the active panel after navigation
      setTimeout(() => {
        const activePanel = document.querySelector('.mol-panel.active');
        if (activePanel) {
          activePanel.classList.remove('calc-highlight');
          void activePanel.offsetWidth;
          activePanel.classList.add('calc-highlight');
          activePanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
          activePanel.addEventListener('animationend', () => activePanel.classList.remove('calc-highlight'), { once: true });
        }
      }, 150);
      input.blur();
    }

    // Input handler
    input.addEventListener('input', e => {
      const q = e.target.value.trim();
      searchWrap.classList.toggle('has-query', q.length > 0);
      if (!q) { closeDropdown(); return; }
      const results = search(q);
      renderDropdown(results);
    });

    // Keyboard navigation
    input.addEventListener('keydown', e => {
      if (!dropdown.classList.contains('open')) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        activeIdx = Math.min(activeIdx + 1, visibleItems.length - 1);
        highlightItem(activeIdx);
        dropdown.querySelector(`.sd-item[data-idx="${activeIdx}"]`)?.scrollIntoView({ block:'nearest' });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        activeIdx = Math.max(activeIdx - 1, 0);
        highlightItem(activeIdx);
        dropdown.querySelector(`.sd-item[data-idx="${activeIdx}"]`)?.scrollIntoView({ block:'nearest' });
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (activeIdx >= 0 && visibleItems[activeIdx]) {
          selectResult(visibleItems[activeIdx]);
        } else if (visibleItems.length === 1) {
          selectResult(visibleItems[0]);
        }
      } else if (e.key === 'Escape') {
        closeDropdown();
        input.blur();
      }
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (!searchWrap.contains(e.target)) closeDropdown();
    });

    // Focus: re-show dropdown if query exists
    input.addEventListener('focus', () => {
      const q = input.value.trim();
      if (q) {
        const results = search(q);
        renderDropdown(results);
      }
    });

  })(); // end initEnhancedSearch

  // Mobile hamburger
  const hamburger = document.getElementById('hamburger');
  const sidebar   = document.getElementById('sidebar');
  const overlay   = document.getElementById('overlay');

  hamburger.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('show');
  });

  overlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
  });

  // Keyboard shortcut ⌘K / Ctrl+K
  document.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      document.getElementById('searchInput').focus();
    }
  });

  // ── INIT ──
  renderCards();

