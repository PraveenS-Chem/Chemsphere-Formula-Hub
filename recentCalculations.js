/* ═══════════════════════════════════════════════════════════
   FORMULA HUB — recentCalculations.js
   RECENT CALCULATIONS ENGINE
   Tracks and renders the user's recently viewed formulas/calculators (patches showResult-style functions to log every calculation).
═══════════════════════════════════════════════════════════ */

  /* ═══════════════════════════════════════════════════════════
     RECENT CALCULATIONS ENGINE
  ═══════════════════════════════════════════════════════════ */
  const RECENT_KEY    = 'chemsphere_recent_v1';
  const RECENT_MAX    = 20;

  // Module label + accent colour per calc prefix
  const CALC_META_MAP = {
    // Mole
    mr2: { module:'Mole Concept',   color:'#00d4ff', icon:'🔬', nav: () => { setCategory('mole'); activateMoleTab('mole-calc'); } },
    mm:  { module:'Mole Concept',   color:'#00d4ff', icon:'⚛️', nav: () => { setCategory('mole'); activateMoleTab('mass-mole'); } },
    pc:  { module:'Mole Concept',   color:'#00d4ff', icon:'📦', nav: () => { setCategory('mole'); activateMoleTab('particle-calc'); } },
    // Solutions
    mr:  { module:'Solutions',      color:'#00ffcc', icon:'🧪', nav: () => { setCategory('solutions'); activateSolTab('sol-molarity'); } },
    ml:  { module:'Solutions',      color:'#00ffcc', icon:'💧', nav: () => { setCategory('solutions'); activateSolTab('sol-molality'); } },
    nr:  { module:'Solutions',      color:'#00ffcc', icon:'🧬', nav: () => { setCategory('solutions'); activateSolTab('sol-normality'); } },
    dl:  { module:'Solutions',      color:'#00ffcc', icon:'🌊', nav: () => { setCategory('solutions'); activateSolTab('sol-dilution'); } },
    rl:  { module:'Solutions',      color:'#00ffcc', icon:'🫧', nav: () => { setCategory('solutions'); activateSolTab('sol-raoult'); } },
    // Gas
    bl:  { module:'Gas Laws',       color:'#a78bfa', icon:'💨', nav: () => { setCategory('gas'); activateGasTab('gas-boyle'); } },
    cl:  { module:'Gas Laws',       color:'#a78bfa', icon:'🌡️', nav: () => { setCategory('gas'); activateGasTab('gas-charles'); } },
    gl:  { module:'Gas Laws',       color:'#a78bfa', icon:'🔥', nav: () => { setCategory('gas'); activateGasTab('gas-gaylussac'); } },
    cg:  { module:'Gas Laws',       color:'#a78bfa', icon:'⚗️', nav: () => { setCategory('gas'); activateGasTab('gas-combined'); } },
    ig:  { module:'Gas Laws',       color:'#a78bfa', icon:'📐', nav: () => { setCategory('gas'); activateGasTab('gas-ideal'); } },
    gr:  { module:'Gas Laws',       color:'#a78bfa', icon:'🌬️', nav: () => { setCategory('gas'); activateGasTab('gas-graham'); } },
    // Acids
    ph:  { module:'Acids & Bases',  color:'#fb923c', icon:'🧫', nav: () => { setCategory('acids'); activateAcidTab('acid-ph'); } },
    poh: { module:'Acids & Bases',  color:'#fb923c', icon:'💢', nav: () => { setCategory('acids'); activateAcidTab('acid-poh'); } },
    hc:  { module:'Acids & Bases',  color:'#fb923c', icon:'⚛️', nav: () => { setCategory('acids'); activateAcidTab('acid-h'); } },
    oc:  { module:'Acids & Bases',  color:'#fb923c', icon:'💧', nav: () => { setCategory('acids'); activateAcidTab('acid-oh'); } },
    pr:  { module:'Acids & Bases',  color:'#fb923c', icon:'⚖️', nav: () => { setCategory('acids'); activateAcidTab('acid-phrel'); } },
    // Stoichiometry
    sy:  { module:'Stoichiometry',  color:'#f472b6', icon:'📊', nav: () => { setCategory('stoichiometry'); activateStoichTab('stoich-yield'); } },
    ty:  { module:'Stoichiometry',  color:'#f472b6', icon:'🧮', nav: () => { setCategory('stoichiometry'); activateStoichTab('stoich-theoretical'); } },
    ef:  { module:'Stoichiometry',  color:'#f472b6', icon:'🔬', nav: () => { setCategory('stoichiometry'); activateStoichTab('stoich-empirical'); } },
    lr:  { module:'Stoichiometry',  color:'#f472b6', icon:'⚗️', nav: () => { setCategory('stoichiometry'); activateStoichTab('stoich-limiting'); } },
  };

  function recentLoad() {
    try { return JSON.parse(localStorage.getItem(RECENT_KEY)) || []; }
    catch { return []; }
  }

  function recentSave(list) {
    try { localStorage.setItem(RECENT_KEY, JSON.stringify(list)); } catch {}
  }

  // Collect current input values for a given calc prefix
  function gatherInputs(calc) {
    const panel = document.querySelector(`[id^="panel-"][id*="${calc}"]`);
    if (!panel) return {};
    const inputs = {};
    panel.querySelectorAll('input[type="number"]:not(:disabled), input[type="text"]:not(:disabled)').forEach(inp => {
      if (inp.value.trim()) inputs[inp.id] = inp.value.trim();
    });
    return inputs;
  }

  // Build a human-readable input summary
  function formatInputs(inputs) {
    return Object.entries(inputs)
      .map(([k, v]) => {
        // strip calc prefix from id for readability
        const label = k.replace(/^[a-z]+-?[a-z]+-?/, '').replace(/-/g,' ');
        return `${label}: ${v}`;
      })
      .join(' · ') || '—';
  }

  function formatTimeAgo(ts) {
    const diff = Date.now() - ts;
    const m = Math.floor(diff / 60000);
    const h = Math.floor(diff / 3600000);
    const d = Math.floor(diff / 86400000);
    if (m < 1)  return 'just now';
    if (m < 60) return `${m}m ago`;
    if (h < 24) return `${h}h ago`;
    return `${d}d ago`;
  }

  // Called by all showResult variants to log a calculation
  function saveRecentCalc(calc, calcName, resultName, resultValue, resultUnit, inputs) {
    const list = recentLoad();
    const entry = {
      id:         Date.now(),
      calc,
      calcName,
      resultName,
      resultValue,
      resultUnit,
      inputs,
      ts:         Date.now(),
    };
    // Deduplicate by calc+resultValue (avoid duplicate consecutive saves)
    const filtered = list.filter(e => !(e.calc === calc && e.resultValue === resultValue));
    filtered.unshift(entry);
    recentSave(filtered.slice(0, RECENT_MAX));
    // Update badge if recent panel is open
    const badge = document.getElementById('recentCountBadge');
    if (badge) badge.textContent = Math.min(filtered.length, RECENT_MAX);
  }

  function renderRecentCalcs() {
    const list = recentLoad();
    const grid  = document.getElementById('recentGrid');
    const badge = document.getElementById('recentCountBadge');
    if (!grid) return;
    if (badge) badge.textContent = list.length;

    if (!list.length) {
      grid.innerHTML = `
        <div class="recent-empty" style="grid-column:1/-1">
          <div class="recent-empty-icon">🕓</div>
          <h3>No recent calculations yet</h3>
          <p>Run a calculation in any module and it will appear here automatically.</p>
        </div>`;
      return;
    }

    grid.innerHTML = list.map((entry, i) => {
      const meta  = CALC_META_MAP[entry.calc] || { module:'Calculator', color:'#00d4ff', icon:'🧮' };
      const delay = Math.min(i * 0.04, 0.4);
      const inputStr = entry.inputs ? formatInputs(entry.inputs) : '—';
      const timeStr  = formatTimeAgo(entry.ts);
      return `
        <div class="recent-card" style="animation-delay:${delay}s" onclick="recentNavigate('${entry.calc}')">
          <div class="recent-card-accent" style="background:linear-gradient(90deg,${meta.color},${meta.color}88)"></div>
          <div class="recent-card-body">
            <div class="recent-card-top">
              <div class="recent-card-name">${meta.icon} ${entry.calcName || entry.calc}</div>
              <span class="recent-card-module" style="background:${meta.color}18;color:${meta.color};border:1px solid ${meta.color}44">${meta.module}</span>
            </div>
            <div class="recent-card-result-row">
              <span class="recent-card-result-label">${entry.resultName || 'Result'}:</span>
              <span class="recent-card-result-value" style="color:${meta.color}">${entry.resultValue}</span>
              <span class="recent-card-result-unit">${entry.resultUnit || ''}</span>
            </div>
            <div class="recent-card-inputs">${inputStr}</div>
            <div class="recent-card-time">🕓 ${timeStr}</div>
            <div class="recent-card-goto">Open calculator <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div>
          </div>
        </div>`;
    }).join('');
  }

  function recentNavigate(calc) {
    const meta = CALC_META_MAP[calc];
    if (meta && meta.nav) meta.nav();
  }

  function clearRecentCalcs() {
    recentSave([]);
    renderRecentCalcs();
  }

  // ── Patch showResult to save every calculation ──
  const _origShowResult = showResult;
  window.showResult = function(calc, name, value, unit, steps) {
    _origShowResult(calc, name, value, unit, steps);
    const inputs = gatherInputs(calc);
    const calcLabel = document.querySelector(`#panel-${CALC_META_MAP[calc]?.nav?.toString().match(/activateMoleTab\('(.+?)'\)|activateSolTab\('(.+?)'\)|activateGasTab\('(.+?)'\)|activateAcidTab\('(.+?)'\)|activateStoichTab\('(.+?)'\)/)?.[1] || ''}`)?.querySelector('h3')?.textContent
      || document.querySelector(`[id^="panel-"][id$="${calc}"] h3`)?.textContent
      || (CALC_META_MAP[calc]?.module + ' Calculator');
    // Simpler: use the calc input card h3 from the active panel
    const h3 = document.querySelector(`#${calc}-steps`)?.closest('.calc-layout')?.querySelector('h3');
    saveRecentCalc(calc, h3?.textContent?.trim() || name, name, value, unit, inputs);
  };

  // ── Patch showResultSol ──
  const _origShowResultSol = showResultSol;
  window.showResultSol = function(calc, name, value, unit, steps) {
    _origShowResultSol(calc, name, value, unit, steps);
    const inputs = gatherInputs(calc);
    const h3 = document.querySelector(`#${calc}-steps`)?.closest('.calc-layout')?.querySelector('h3');
    saveRecentCalc(calc, h3?.textContent?.trim() || name, name, value, unit, inputs);
  };

  // ── Patch showResultGas ──
  const _origShowResultGas = showResultGas;
  window.showResultGas = function(calc, name, value, unit, steps) {
    _origShowResultGas(calc, name, value, unit, steps);
    const inputs = gatherInputs(calc);
    const h3 = document.querySelector(`#${calc}-steps`)?.closest('.calc-layout')?.querySelector('h3');
    saveRecentCalc(calc, h3?.textContent?.trim() || name, name, value, unit, inputs);
  };

  // Update recent badge on load
  (function() {
    const list = recentLoad();
    const badge = document.getElementById('recentCountBadge');
    if (badge && list.length) badge.textContent = list.length;
  })();

