/* ═══════════════════════════════════════════════════════════
   FORMULA HUB — bookmarksEngine.js
   BOOKMARKS ENGINE
   Save/toggle/render bookmarked formulas and calculators, persisted to localStorage.
═══════════════════════════════════════════════════════════ */

  /* ═══════════════════════════════════════════════════════════
     BOOKMARKS ENGINE
  ═══════════════════════════════════════════════════════════ */
  const BM_KEY = 'chemsphere_bookmarks_v1';

  // Bookmark data: { calc, name, formula, module, color, icon }
  // Keyed by CALC_META_MAP entries + formula from formula display
  const BM_FORMULA_MAP = {
    mr2:'n = m / M',       mm:'N = n × Nₐ',         pc:'n = N / Nₐ',
    mr: 'C = n / V',       ml:'b = n / kg',          nr:'N = n·eq / V',
    dl: 'C₁V₁ = C₂V₂',    rl:'Pₛ = χₛ · P°',
    bl: 'P₁V₁ = P₂V₂',    cl:'V₁/T₁ = V₂/T₂',      gl:'P₁/T₁ = P₂/T₂',
    cg: 'P₁V₁/T₁ = P₂V₂/T₂', ig:'PV = nRT',        gr:'r₁/r₂ = √(M₂/M₁)',
    ph: 'pH = -log[H⁺]',  poh:'pOH = -log[OH⁻]',   hc:'[H⁺] = Kw / [OH⁻]',
    oc: '[OH⁻] = Kw / [H⁺]', pr:'pH + pOH = 14',
    sy: '% Yield = Actual / Theor × 100', ty:'Theoretical = Actual / (%/100)',
    ef: 'Mass → Moles → Ratio', lr:'Ratio = Amount / Coefficient',
  };

  const BM_NAME_MAP = {
    mr2:'Mole Calculator',            mm:'Mass–Mole Converter',
    pc: 'Particle Calculator',        mr:'Molarity Calculator',
    ml: 'Molality Calculator',        nr:'Normality Calculator',
    dl: 'Dilution Calculator',        rl:"Raoult's Law Calculator",
    bl: "Boyle's Law Calculator",     cl:"Charles' Law Calculator",
    gl: "Gay-Lussac's Law Calculator",cg:'Combined Gas Law Calc',
    ig: 'Ideal Gas Law Calculator',   gr:"Graham's Law Calculator",
    ph: 'pH Calculator',              poh:'pOH Calculator',
    hc: '[H⁺] Concentration Calc',   oc:'[OH⁻] Concentration Calc',
    pr: 'pH + pOH Relation Calc',     sy:'Percent Yield Calculator',
    ty: 'Theoretical Yield Calc',     ef:'Empirical Formula Calc',
    lr: 'Limiting Reagent Calculator',
  };

  function bmLoad() {
    try { return JSON.parse(localStorage.getItem(BM_KEY)) || []; }
    catch { return []; }
  }
  function bmSave(list) {
    try { localStorage.setItem(BM_KEY, JSON.stringify(list)); } catch {}
  }
  function bmIsBookmarked(calc) {
    return bmLoad().some(b => b.calc === calc);
  }

  function bmUpdateNav() {
    const list = bmLoad();
    const badge = document.getElementById('bmCountBadge');
    const navBadge = document.getElementById('bmCountNav');
    if (badge) badge.textContent = list.length;
    if (navBadge) {
      navBadge.textContent = list.length || '';
      navBadge.classList.toggle('has-items', list.length > 0);
    }
  }

  function bmSyncButtons() {
    const list = bmLoad();
    const saved = new Set(list.map(b => b.calc));
    document.querySelectorAll('.bookmark-btn').forEach(btn => {
      const calc = btn.id.replace('bm-btn-', '');
      const on = saved.has(calc);
      btn.classList.toggle('bookmarked', on);
      btn.title = on ? 'Remove bookmark' : 'Bookmark this calculator';
      btn.querySelector('.bm-label').textContent = on ? 'Saved' : 'Save';
    });
  }

  function toggleBookmark(calc, e) {
    if (e) e.stopPropagation();
    let list = bmLoad();
    const idx = list.findIndex(b => b.calc === calc);
    if (idx >= 0) {
      list.splice(idx, 1);
    } else {
      const meta = CALC_META_MAP[calc] || {};
      list.push({
        calc,
        name:    BM_NAME_MAP[calc]    || meta.module + ' Calculator',
        formula: BM_FORMULA_MAP[calc] || '',
        module:  meta.module  || 'Calculator',
        color:   meta.color   || '#00d4ff',
        icon:    meta.icon    || '🧮',
        ts:      Date.now(),
      });
    }
    bmSave(list);
    bmSyncButtons();
    bmUpdateNav();
    // If bookmarks panel is open, refresh it
    if (document.getElementById('bookmarksModule')?.classList.contains('visible')) {
      renderBookmarks();
    }
    // Animate the button
    const btn = document.getElementById(`bm-btn-${calc}`);
    if (btn) {
      btn.style.transform = 'scale(1.25)';
      setTimeout(() => { btn.style.transform = ''; }, 200);
    }
  }

  function removeBookmark(calc, e) {
    if (e) e.stopPropagation();
    let list = bmLoad();
    bmSave(list.filter(b => b.calc !== calc));
    bmSyncButtons();
    bmUpdateNav();
    renderBookmarks();
  }

  function renderBookmarks() {
    const list = bmLoad();
    const grid  = document.getElementById('bmGrid');
    const badge = document.getElementById('bmCountBadge');
    if (!grid) return;
    if (badge) badge.textContent = list.length;

    if (!list.length) {
      grid.innerHTML = `
        <div class="bm-empty" style="grid-column:1/-1">
          <div class="bm-empty-icon">🔖</div>
          <h3>No bookmarks yet</h3>
          <p>Press the <strong>Save</strong> button inside any calculator to add it here.</p>
        </div>`;
      return;
    }

    grid.innerHTML = list.map((b, i) => `
      <div class="bm-card" style="animation-delay:${Math.min(i*0.05,0.4)}s"
           onclick="bmNavigate('${b.calc}')">
        <div class="bm-card-accent"
             style="background:linear-gradient(90deg,${b.color},${b.color}88)"></div>
        <div class="bm-card-body">
          <div class="bm-card-top">
            <div class="bm-card-name">${b.icon} ${b.name}</div>
            <button class="bm-remove-btn" onclick="removeBookmark('${b.calc}',event)"
                    title="Remove bookmark">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2.5">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <span class="bm-card-module"
                style="background:${b.color}18;color:${b.color};border:1px solid ${b.color}44">
            ${b.module}
          </span>
          <div class="bm-card-formula">${b.formula}</div>
          <div class="bm-card-open">
            Open calculator
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>
        </div>
      </div>`).join('');
  }

  function bmNavigate(calc) {
    const meta = CALC_META_MAP[calc];
    if (meta && meta.nav) meta.nav();
  }

  // Init on load
  bmSyncButtons();
  bmUpdateNav();

  // Make "Calc" button on mole/solutions cards open the module


  function renderCards() {
    const grid = document.getElementById('formulaGrid');
    const list = getFiltered();
    grid.innerHTML = '';
    if (!list.length) {
      grid.innerHTML = `<div class="empty-state"><div class="empty-icon">🔍</div><h3>No formulas found</h3><p>Try a different search term or category.</p></div>`;
      return;
    }
    // Tab routing maps
    const moleTabMap = { 1:'mole-calc', 2:'particle-calc', 3:'mole-calc', 5:'mole-calc', 6:'mole-calc' };
    const solTabMap  = { 7:'sol-molarity', 8:'sol-molality', 9:'sol-dilution', 10:'sol-normality', 11:'sol-raoult' };
    const gasTabMap  = { 12:'gas-boyle', 13:'gas-charles', 14:'gas-gaylussac', 25:'gas-combined', 15:'gas-ideal', 16:'gas-graham' };
    const acidTabMap   = { 17:'acid-ph', 18:'acid-poh', 19:'acid-phrel', 20:null };
    const stoichTabMap = { 22:'stoich-yield', 23:'stoich-limiting', 21:null, 24:null };

    list.forEach((f, i) => {
      const isMole   = f.category === 'mole';
      const isSol    = f.category === 'solutions';
      const isGas    = f.category === 'gas';
      const isAcid   = f.category === 'acids';
      const isStoich = f.category === 'stoichiometry';
      const hasCalc  = isMole
        || (isSol    && solTabMap[f.id]   !== null && solTabMap[f.id]   !== undefined)
        || (isGas    && gasTabMap[f.id]   !== undefined)
        || (isAcid   && acidTabMap[f.id]  !== null && acidTabMap[f.id]  !== undefined)
        || (isStoich && stoichTabMap[f.id] !== null && stoichTabMap[f.id] !== undefined);

      const card = document.createElement('div');
      card.className = 'formula-card';
      card.style.setProperty('--cat-color', f.color);
      card.style.animationDelay = (i * 0.05) + 's';

      let btnHtml = '';
      if (isMole) {
        const targetTab = moleTabMap[f.id] || 'mole-calc';
        btnHtml = `<button class="btn-calc" onclick="openMoleTab('${targetTab}')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>Open</button>`;
      } else if (isSol && solTabMap[f.id]) {
        const targetTab = solTabMap[f.id];
        btnHtml = `<button class="btn-calc" onclick="openSolTab('${targetTab}')" style="border-color:rgba(0,255,204,0.3);color:#00ffcc;background:rgba(0,255,204,0.08)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>Open</button>`;
      } else if (isGas && gasTabMap[f.id]) {
        const targetTab = gasTabMap[f.id];
        btnHtml = `<button class="btn-calc" onclick="openGasTab('${targetTab}')" style="border-color:rgba(167,139,250,0.3);color:#a78bfa;background:rgba(167,139,250,0.08)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>Open</button>`;
      } else if (isAcid && acidTabMap[f.id]) {
        const targetTab = acidTabMap[f.id];
        btnHtml = `<button class="btn-calc" onclick="openAcidTab('${targetTab}')" style="border-color:rgba(251,146,60,0.3);color:#fb923c;background:rgba(251,146,60,0.08)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>Open</button>`;
      } else if (isStoich && stoichTabMap[f.id]) {
        const targetTab = stoichTabMap[f.id];
        btnHtml = `<button class="btn-calc" onclick="openStoichTab('${targetTab}')" style="border-color:rgba(244,114,182,0.3);color:#f472b6;background:rgba(244,114,182,0.08)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>Open</button>`;
      } else {
        btnHtml = `<button class="btn-calc" disabled title="Calculator coming soon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>Calc</button>`;
      }

      card.innerHTML = `
        ${hasCalc ? '' : '<span class="coming-soon-badge">COMING SOON</span>'}
        <div class="card-top">
          <span class="card-category-tag" style="color:${f.color};border-color:${f.color}33;background:${f.color}10">
            ${CAT_META[f.category]?.label.split(' ')[0] ?? f.category}
          </span>
          <div class="card-icon-wrap">${f.icon}</div>
        </div>
        <div class="formula-name">${f.name}</div>
        <div class="formula-expr">${f.expr}</div>
        <div class="formula-desc">${f.desc}</div>
        <div class="card-footer">
          <div class="card-vars">${f.vars.map(v => `<span class="var-chip">${v}</span>`).join('')}</div>
          ${btnHtml}
        </div>`;
      grid.appendChild(card);
    });
  }

  function openMoleTab(tabId) {
    setCategory('mole');
    activateMoleTab(tabId);
  }

  function openSolTab(tabId) {
    setCategory('solutions');
    activateSolTab(tabId);
  }

  function openGasTab(tabId) {
    setCategory('gas');
    activateGasTab(tabId);
  }

  function openAcidTab(tabId) {
    setCategory('acids');
    activateAcidTab(tabId);
  }

  function openStoichTab(tabId) {
    setCategory('stoichiometry');
    activateStoichTab(tabId);
  }

  // ── Sub-tab switching ──
  function activateMoleTab(panelId) {
    if (activeCategory !== 'mole') syncActiveNav('mole');
    document.querySelectorAll('#moleModule .mol-tab').forEach(t =>
      t.classList.toggle('active', t.dataset.panel === panelId));
    document.querySelectorAll('#moleModule .mol-panel').forEach(p =>
      p.classList.toggle('active', p.id === 'panel-' + panelId));
    setBreadcrumbSub(MOLE_TAB_LABELS[panelId] || '');
  }

  document.querySelectorAll('#moleModule .mol-tab').forEach(tab => {
    tab.addEventListener('click', () => activateMoleTab(tab.dataset.panel));
  });

  // ── Solve-for selectors ──
  document.querySelectorAll('.sf-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const calc  = btn.dataset.calc;
      const solve = btn.dataset.solve;
      document.querySelectorAll(`.sf-btn[data-calc="${calc}"]`).forEach(b =>
        b.classList.toggle('active', b === btn));
      updateSolveFor(calc, solve);
    });
  });

  function updateSolveFor(calc, solve) {
    if (calc === 'mc') {
      const formulae = { n:'n = m ÷ M', m:'m = n × M', M:'M = m ÷ n' };
      document.getElementById('mc-formula-display').textContent = formulae[solve] || 'n = m ÷ M';
      setDisabled('mc-n-wrap', solve === 'n');
      setDisabled('mc-m-wrap', solve === 'm', 'mc-field-m');
      setDisabled('mc-M-wrap', solve === 'M', 'mc-field-M');
      // also toggle input disabled attr
      ['n','m','M'].forEach(v => {
        const inp = document.getElementById(`mc-${v}`);
        if (inp) { inp.disabled = (v === solve); inp.placeholder = v === solve ? 'calculated' : getPlaceholder('mc', v); }
      });
      document.getElementById(`mc-field-n`).querySelector('.field-input-wrap').classList.toggle('disabled', solve === 'n');
      document.getElementById(`mc-field-m`).querySelector('.field-input-wrap').classList.toggle('disabled', solve === 'm');
      document.getElementById(`mc-field-M`).querySelector('.field-input-wrap').classList.toggle('disabled', solve === 'M');
    }
    if (calc === 'mm') {
      const isMassDir = solve === 'mass';
      document.getElementById('mm-formula-display').textContent = isMassDir ? 'm = n × M' : 'n = m ÷ M';
      document.getElementById('mm-n-wrap').classList.toggle('disabled', !isMassDir);
      document.getElementById('mm-m-wrap').classList.toggle('disabled', isMassDir);
      document.getElementById('mm-n').disabled  = !isMassDir;
      document.getElementById('mm-m').disabled  = isMassDir;
      document.getElementById('mm-n').placeholder = isMassDir ? 'e.g. 2' : 'calculated';
      document.getElementById('mm-m').placeholder = isMassDir ? 'calculated' : 'e.g. 36.03';
    }
    if (calc === 'pc') {
      const formulae = { N:'N = n × Nₐ', n:'n = N ÷ Nₐ' };
      document.getElementById('pc-formula-display').textContent = formulae[solve] || 'N = n × Nₐ';
      document.getElementById('pc-n-wrap').classList.toggle('disabled', solve === 'n');
      document.getElementById('pc-N-wrap').classList.toggle('disabled', solve === 'N');
      document.getElementById('pc-n').disabled = (solve === 'n');
      document.getElementById('pc-N').disabled = (solve === 'N');
      document.getElementById('pc-n').placeholder = solve === 'n' ? 'calculated' : 'e.g. 0.5';
      document.getElementById('pc-N').placeholder = solve === 'N' ? 'calculated' : 'e.g. 3.01e23';
    }
    hideResults(calc);
    // Also delegate solutions-module calcs
    if (['mr','ml','nr','dl','rl'].includes(calc)) updateSolSolveFor(calc, solve);
    // Also delegate acids-module calcs
    if (['ph','poh','hc','oc','pr'].includes(calc)) updateAcidSolveFor(calc, solve);
    if (['sy','ty'].includes(calc)) updateStoichSolveFor(calc, solve);
  }

  function getPlaceholder(calc, v) {
    const map = { mc: { n:'e.g. 1', m:'e.g. 18', M:'e.g. 18.015' } };
    return map[calc]?.[v] ?? 'enter value';
  }

  function setDisabled(wrapId, isDisabled) {
    const el = document.getElementById(wrapId);
    if (el) el.classList.toggle('disabled', isDisabled);
  }

  function hideResults(calc) {
    [`${calc}-result`, `${calc}-steps`, `${calc}-error`].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.remove('visible');
    });
    const ph = document.getElementById(`${calc}-placeholder`);
    if (ph) ph.style.display = '';
  }

  function showError(calc, msg) {
    const el = document.getElementById(`${calc}-error`);
    if (!el) return;
    el.textContent = '⚠ ' + msg;
    el.classList.add('visible');
  }

  function clearError(calc) {
    const el = document.getElementById(`${calc}-error`);
    if (el) { el.textContent = ''; el.classList.remove('visible'); }
  }

  function showResult(calc, name, value, unit, steps) {
    clearError(calc);
    const ph = document.getElementById(`${calc}-placeholder`);
    if (ph) ph.style.display = 'none';

    // result hero
    const hero = document.getElementById(`${calc}-result`);
    document.getElementById(`${calc}-result-name`).textContent  = name;
    document.getElementById(`${calc}-result-value`).textContent = value;
    document.getElementById(`${calc}-result-unit`).textContent  = unit;
    hero.classList.add('visible');

    // steps
    const stepsCard = document.getElementById(`${calc}-steps`);
    const stepsList = document.getElementById(`${calc}-steps-list`);
    stepsList.innerHTML = '';
    steps.forEach((s, i) => {
      const div = document.createElement('div');
      div.className = 'step-item';
      div.style.animationDelay = (i * 0.07) + 's';
      div.innerHTML = `
        <div class="step-num">${i + 1}</div>
        <div class="step-content">
          <div class="step-title">${s.title}</div>
          ${s.expr ? `<div class="step-expr">${s.expr}</div>` : ''}
          ${s.note ? `<div class="step-note">${s.note}</div>` : ''}
        </div>`;
      stepsList.appendChild(div);
    });
    stepsCard.classList.add('visible');
  }

  // ── Pretty number formatting ──
  function fmt(n, sig = 5) {
    if (n === 0) return '0';
    const abs = Math.abs(n);
    if (abs >= 1e6 || abs < 1e-3) {
      const exp = Math.floor(Math.log10(abs));
      const coef = (n / Math.pow(10, exp)).toPrecision(sig);
      return `${coef} × 10${superscript(exp)}`;
    }
    return parseFloat(n.toPrecision(sig)).toString();
  }

  function superscript(n) {
    const sup = { '-':'⁻','0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹' };
    return String(n).split('').map(c => sup[c] ?? c).join('');
  }

