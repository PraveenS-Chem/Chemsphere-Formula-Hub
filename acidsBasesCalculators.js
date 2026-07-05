/* ═══════════════════════════════════════════════════════════
   FORMULA HUB — acidsBasesCalculators.js
   ACIDS & BASES CALCULATORS
   pH, pOH, [H⁺], [OH⁻], and pH + pOH relation calculators.
═══════════════════════════════════════════════════════════ */

  // ════════════════════════════════════════
  // CALCULATOR — pH Calculator (ph)
  //   pH = -log[H⁺]   ⇄   [H⁺] = 10^(-pH)
  // ════════════════════════════════════════
  function calcPH() {
    clearError('ph');
    const solve = document.querySelector('#acidsModule .sf-btn.active[data-calc="ph"]')?.dataset.solve ?? 'pH';

    if (solve === 'pH') {
      const H = gv('ph-H');
      if (isNaN(H)) return showError('ph', 'Please enter the hydrogen ion concentration [H⁺].');
      if (H <= 0) return showError('ph', '[H⁺] must be a positive number (it cannot be zero or negative).');
      if (H > 20) return showError('ph', '[H⁺] is unrealistically high. Enter a value in mol/L (e.g. 1e-7).');

      const logH = Math.log10(H);
      const pHVal = -logH;
      const nature = pHVal < 7 ? 'Acidic (pH < 7)' : pHVal > 7 ? 'Basic / Alkaline (pH > 7)' : 'Neutral (pH = 7)';
      showResult('ph', 'pH', fmt(pHVal), '(unitless)', [
        { title: 'Write the formula', expr: 'pH = -log[H⁺]', note: 'pH is the negative base-10 logarithm of the hydrogen ion concentration.' },
        { title: 'Substitute the known value', expr: `pH = -log(${fmt(H)})` },
        { title: 'Evaluate the logarithm', expr: `log(${fmt(H)}) = ${fmt(logH)}` },
        { title: 'Negate to get pH', expr: `pH = -(${fmt(logH)}) = ${fmt(pHVal)}`, note: `Solution is ${nature}.` },
      ]);
    } else {
      const pHVal = gv('ph-pH');
      if (isNaN(pHVal)) return showError('ph', 'Please enter a pH value.');
      if (pHVal < -2 || pHVal > 16) return showError('ph', 'pH should typically be between 0 and 14.');

      const H = Math.pow(10, -pHVal);
      const nature = pHVal < 7 ? 'Acidic (pH < 7)' : pHVal > 7 ? 'Basic / Alkaline (pH > 7)' : 'Neutral (pH = 7)';
      showResult('ph', 'Hydrogen Ion Concentration [H⁺]', fmt(H), 'mol/L', [
        { title: 'Rearrange the pH formula', expr: '[H⁺] = 10^(-pH)', note: 'Take the inverse log (antilog) of both sides of pH = -log[H⁺].' },
        { title: 'Substitute the known value', expr: `[H⁺] = 10^(-${fmt(pHVal)})` },
        { title: 'Evaluate the result', expr: `[H⁺] = ${fmt(H)} mol/L`, note: `Solution is ${nature}.` },
      ]);
    }
  }

  // ════════════════════════════════════════
  // CALCULATOR — pOH Calculator (poh)
  //   pOH = -log[OH⁻]   ⇄   [OH⁻] = 10^(-pOH)
  // ════════════════════════════════════════
  function calcPOH() {
    clearError('poh');
    const solve = document.querySelector('#acidsModule .sf-btn.active[data-calc="poh"]')?.dataset.solve ?? 'pOH';

    if (solve === 'pOH') {
      const OH = gv('poh-OH');
      if (isNaN(OH)) return showError('poh', 'Please enter the hydroxide ion concentration [OH⁻].');
      if (OH <= 0) return showError('poh', '[OH⁻] must be a positive number (it cannot be zero or negative).');
      if (OH > 20) return showError('poh', '[OH⁻] is unrealistically high. Enter a value in mol/L (e.g. 1e-7).');

      const logOH = Math.log10(OH);
      const pOHVal = -logOH;
      const nature = pOHVal < 7 ? 'Basic / Alkaline (pOH < 7)' : pOHVal > 7 ? 'Acidic (pOH > 7)' : 'Neutral (pOH = 7)';
      showResult('poh', 'pOH', fmt(pOHVal), '(unitless)', [
        { title: 'Write the formula', expr: 'pOH = -log[OH⁻]', note: 'pOH is the negative base-10 logarithm of the hydroxide ion concentration.' },
        { title: 'Substitute the known value', expr: `pOH = -log(${fmt(OH)})` },
        { title: 'Evaluate the logarithm', expr: `log(${fmt(OH)}) = ${fmt(logOH)}` },
        { title: 'Negate to get pOH', expr: `pOH = -(${fmt(logOH)}) = ${fmt(pOHVal)}`, note: `Solution is ${nature}.` },
      ]);
    } else {
      const pOHVal = gv('poh-pOH');
      if (isNaN(pOHVal)) return showError('poh', 'Please enter a pOH value.');
      if (pOHVal < -2 || pOHVal > 16) return showError('poh', 'pOH should typically be between 0 and 14.');

      const OH = Math.pow(10, -pOHVal);
      const nature = pOHVal < 7 ? 'Basic / Alkaline (pOH < 7)' : pOHVal > 7 ? 'Acidic (pOH > 7)' : 'Neutral (pOH = 7)';
      showResult('poh', 'Hydroxide Ion Concentration [OH⁻]', fmt(OH), 'mol/L', [
        { title: 'Rearrange the pOH formula', expr: '[OH⁻] = 10^(-pOH)', note: 'Take the inverse log (antilog) of both sides of pOH = -log[OH⁻].' },
        { title: 'Substitute the known value', expr: `[OH⁻] = 10^(-${fmt(pOHVal)})` },
        { title: 'Evaluate the result', expr: `[OH⁻] = ${fmt(OH)} mol/L`, note: `Solution is ${nature}.` },
      ]);
    }
  }

  // ════════════════════════════════════════
  // CALCULATOR — Hydrogen Ion Concentration (hc)
  //   [H⁺] × [OH⁻] = Kw = 1 × 10⁻¹⁴
  // ════════════════════════════════════════
  const KW = 1e-14;

  function calcHC() {
    clearError('hc');
    const solve = document.querySelector('#acidsModule .sf-btn.active[data-calc="hc"]')?.dataset.solve ?? 'H';

    if (solve === 'H') {
      const OH = gv('hc-OH');
      if (isNaN(OH)) return showError('hc', 'Please enter the hydroxide ion concentration [OH⁻].');
      if (OH <= 0) return showError('hc', '[OH⁻] must be a positive number (it cannot be zero or negative).');
      if (OH > 20) return showError('hc', '[OH⁻] is unrealistically high. Enter a value in mol/L (e.g. 1e-7).');

      const H = KW / OH;
      const nature = H > 1e-7 ? 'Acidic ([H⁺] > 1×10⁻⁷ M)' : H < 1e-7 ? 'Basic / Alkaline ([H⁺] < 1×10⁻⁷ M)' : 'Neutral ([H⁺] = 1×10⁻⁷ M)';
      showResult('hc', 'Hydrogen Ion Concentration [H⁺]', fmt(H), 'mol/L', [
        { title: 'Write the ion product of water', expr: '[H⁺] × [OH⁻] = Kw = 1 × 10⁻¹⁴', note: 'Valid for aqueous solutions at 25 °C.' },
        { title: 'Rearrange for [H⁺]', expr: '[H⁺] = Kw ÷ [OH⁻]' },
        { title: 'Substitute the known value', expr: `[H⁺] = (1 × 10⁻¹⁴) ÷ ${fmt(OH)}` },
        { title: 'Calculate the result', expr: `[H⁺] = ${fmt(H)} mol/L`, note: `Solution is ${nature}.` },
      ]);
    } else {
      const H = gv('hc-H');
      if (isNaN(H)) return showError('hc', 'Please enter the hydrogen ion concentration [H⁺].');
      if (H <= 0) return showError('hc', '[H⁺] must be a positive number (it cannot be zero or negative).');
      if (H > 20) return showError('hc', '[H⁺] is unrealistically high. Enter a value in mol/L (e.g. 1e-7).');

      const OH = KW / H;
      const nature = H > 1e-7 ? 'Acidic ([H⁺] > 1×10⁻⁷ M)' : H < 1e-7 ? 'Basic / Alkaline ([H⁺] < 1×10⁻⁷ M)' : 'Neutral ([H⁺] = 1×10⁻⁷ M)';
      showResult('hc', 'Hydroxide Ion Concentration [OH⁻]', fmt(OH), 'mol/L', [
        { title: 'Write the ion product of water', expr: '[H⁺] × [OH⁻] = Kw = 1 × 10⁻¹⁴', note: 'Valid for aqueous solutions at 25 °C.' },
        { title: 'Rearrange for [OH⁻]', expr: '[OH⁻] = Kw ÷ [H⁺]' },
        { title: 'Substitute the known value', expr: `[OH⁻] = (1 × 10⁻¹⁴) ÷ ${fmt(H)}` },
        { title: 'Calculate the result', expr: `[OH⁻] = ${fmt(OH)} mol/L`, note: `Solution is ${nature}.` },
      ]);
    }
  }

  // ════════════════════════════════════════
  // CALCULATOR — Hydroxide Ion Concentration (oc)
  //   [H⁺] × [OH⁻] = Kw = 1 × 10⁻¹⁴
  // ════════════════════════════════════════
  function calcOC() {
    clearError('oc');
    const solve = document.querySelector('#acidsModule .sf-btn.active[data-calc="oc"]')?.dataset.solve ?? 'OH';

    if (solve === 'OH') {
      const H = gv('oc-H');
      if (isNaN(H)) return showError('oc', 'Please enter the hydrogen ion concentration [H⁺].');
      if (H <= 0) return showError('oc', '[H⁺] must be a positive number (it cannot be zero or negative).');
      if (H > 20) return showError('oc', '[H⁺] is unrealistically high. Enter a value in mol/L (e.g. 1e-7).');

      const OH = KW / H;
      const nature = OH > 1e-7 ? 'Basic / Alkaline ([OH⁻] > 1×10⁻⁷ M)' : OH < 1e-7 ? 'Acidic ([OH⁻] < 1×10⁻⁷ M)' : 'Neutral ([OH⁻] = 1×10⁻⁷ M)';
      showResult('oc', 'Hydroxide Ion Concentration [OH⁻]', fmt(OH), 'mol/L', [
        { title: 'Write the ion product of water', expr: '[H⁺] × [OH⁻] = Kw = 1 × 10⁻¹⁴', note: 'Valid for aqueous solutions at 25 °C.' },
        { title: 'Rearrange for [OH⁻]', expr: '[OH⁻] = Kw ÷ [H⁺]' },
        { title: 'Substitute the known value', expr: `[OH⁻] = (1 × 10⁻¹⁴) ÷ ${fmt(H)}` },
        { title: 'Calculate the result', expr: `[OH⁻] = ${fmt(OH)} mol/L`, note: `Solution is ${nature}.` },
      ]);
    } else {
      const OH = gv('oc-OH');
      if (isNaN(OH)) return showError('oc', 'Please enter the hydroxide ion concentration [OH⁻].');
      if (OH <= 0) return showError('oc', '[OH⁻] must be a positive number (it cannot be zero or negative).');
      if (OH > 20) return showError('oc', '[OH⁻] is unrealistically high. Enter a value in mol/L (e.g. 1e-7).');

      const H = KW / OH;
      const nature = OH > 1e-7 ? 'Basic / Alkaline ([OH⁻] > 1×10⁻⁷ M)' : OH < 1e-7 ? 'Acidic ([OH⁻] < 1×10⁻⁷ M)' : 'Neutral ([OH⁻] = 1×10⁻⁷ M)';
      showResult('oc', 'Hydrogen Ion Concentration [H⁺]', fmt(H), 'mol/L', [
        { title: 'Write the ion product of water', expr: '[H⁺] × [OH⁻] = Kw = 1 × 10⁻¹⁴', note: 'Valid for aqueous solutions at 25 °C.' },
        { title: 'Rearrange for [H⁺]', expr: '[H⁺] = Kw ÷ [OH⁻]' },
        { title: 'Substitute the known value', expr: `[H⁺] = (1 × 10⁻¹⁴) ÷ ${fmt(OH)}` },
        { title: 'Calculate the result', expr: `[H⁺] = ${fmt(H)} mol/L`, note: `Solution is ${nature}.` },
      ]);
    }
  }

  // ════════════════════════════════════════
  // CALCULATOR — pH + pOH Relation (pr)
  //   pH + pOH = 14   (at 25 °C)
  // ════════════════════════════════════════
  function calcPR() {
    clearError('pr');
    const solve = document.querySelector('#acidsModule .sf-btn.active[data-calc="pr"]')?.dataset.solve ?? 'pH';

    if (solve === 'pH') {
      const pOHVal = gv('pr-pOH');
      if (isNaN(pOHVal)) return showError('pr', 'Please enter a pOH value.');
      if (pOHVal < -2 || pOHVal > 16) return showError('pr', 'pOH should be between 0 and 14 for typical aqueous solutions.');
      const pHVal = 14 - pOHVal;
      const nature = pHVal < 7 ? 'Acidic (pH < 7)' : pHVal > 7 ? 'Basic / Alkaline (pH > 7)' : 'Neutral (pH = 7)';
      showResult('pr', 'pH', fmt(pHVal), '(unitless)', [
        { title: 'Write the relation', expr: 'pH + pOH = 14', note: 'Valid for aqueous solutions at 25 °C, where Kw = 1 × 10⁻¹⁴.' },
        { title: 'Rearrange for pH', expr: 'pH = 14 − pOH' },
        { title: 'Substitute the known value', expr: `pH = 14 − ${fmt(pOHVal)}` },
        { title: 'Calculate the result', expr: `pH = ${fmt(pHVal)}`, note: `Solution is ${nature}.` },
      ]);
    } else {
      const pHVal = gv('pr-pH');
      if (isNaN(pHVal)) return showError('pr', 'Please enter a pH value.');
      if (pHVal < -2 || pHVal > 16) return showError('pr', 'pH should be between 0 and 14 for typical aqueous solutions.');
      const pOHVal = 14 - pHVal;
      const nature = pOHVal < 7 ? 'Basic / Alkaline (pOH < 7)' : pOHVal > 7 ? 'Acidic (pOH > 7)' : 'Neutral (pOH = 7)';
      showResult('pr', 'pOH', fmt(pOHVal), '(unitless)', [
        { title: 'Write the relation', expr: 'pH + pOH = 14', note: 'Valid for aqueous solutions at 25 °C, where Kw = 1 × 10⁻¹⁴.' },
        { title: 'Rearrange for pOH', expr: 'pOH = 14 − pH' },
        { title: 'Substitute the known value', expr: `pOH = 14 − ${fmt(pHVal)}` },
        { title: 'Calculate the result', expr: `pOH = ${fmt(pOHVal)}`, note: `Solution is ${nature}.` },
      ]);
    }
  }

  // ── Reset helper for the Acids & Bases module ──
  function resetAcid(calc) {
    const panelMap = {
      ph: 'panel-acid-ph', poh: 'panel-acid-poh',
      hc: 'panel-acid-h',  oc:  'panel-acid-oh',
      pr: 'panel-acid-phrel',
    };
    const panel = document.getElementById(panelMap[calc]);
    if (panel) panel.querySelectorAll('input[type="number"]').forEach(i => { i.value = ''; });
    hideResults(calc);
    clearError(calc);
    const firstSF = document.querySelector(`#acidsModule .sf-btn[data-calc="${calc}"]`);
    if (firstSF) firstSF.click();
  }

  // ── Wire solve-for buttons (gas calcs routed through global sf-btn handler) ──
  // The global .sf-btn listener already fires; we extend updateSolveFor to delegate gas calcs
  // by patching the tail:
  const _origUpdateSolveFor = updateSolveFor;
  // (No redeclaration needed — we hook gas calcs in updateGasSolveFor called below)

  // ── Gas shared helpers (mirror the sol helpers for gas calc IDs) ──
  function hideResultsGas(calc) {
    [`${calc}-result`, `${calc}-steps`, `${calc}-error`].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.remove('visible');
    });
    const ph = document.getElementById(`${calc}-placeholder`);
    if (ph) ph.style.display = '';
  }

  function showErrorGas(calc, msg) {
    hideResultsGas(calc);
    const el = document.getElementById(`${calc}-error`);
    if (!el) return;
    el.textContent = '⚠ ' + msg;
    el.classList.add('visible');
  }

  function clearErrorGas(calc) {
    const el = document.getElementById(`${calc}-error`);
    if (el) { el.textContent = ''; el.classList.remove('visible'); }
  }

  function showResultGas(calc, name, value, unit, steps) {
    clearErrorGas(calc);
    const ph = document.getElementById(`${calc}-placeholder`);
    if (ph) ph.style.display = 'none';
    const hero = document.getElementById(`${calc}-result`);
    document.getElementById(`${calc}-result-name`).textContent  = name;
    document.getElementById(`${calc}-result-value`).textContent = value;
    document.getElementById(`${calc}-result-unit`).textContent  = unit;
    hero.classList.add('visible');
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

  // ── Gas solve-for field toggling ──
  function updateGasSolveFor(calc, solve) {
    const gasVarSets = {
      bl: ['P1','V1','P2','V2'],
      cl: ['V1','T1','V2','T2'],
      gl: ['P1','T1','P2','T2'],
      cg: ['P1','V1','T1','P2','V2','T2'],
      ig: ['P','V','n','T'],
      gr: ['r1','r2','M1','M2'],
    };
    const gasFormulae = {
      bl: { P2:'P₂ = P₁V₁ ÷ V₂', V2:'V₂ = P₁V₁ ÷ P₂', P1:'P₁ = P₂V₂ ÷ V₁', V1:'V₁ = P₂V₂ ÷ P₁' },
      cl: { V2:'V₂ = V₁T₂ ÷ T₁', T2:'T₂ = T₁V₂ ÷ V₁', V1:'V₁ = V₂T₁ ÷ T₂', T1:'T₁ = T₂V₁ ÷ V₂' },
      gl: { P2:'P₂ = P₁T₂ ÷ T₁', T2:'T₂ = T₁P₂ ÷ P₁', P1:'P₁ = P₂T₁ ÷ T₂', T1:'T₁ = T₂P₁ ÷ P₂' },
      cg: {
        P2:'P₂ = P₁V₁T₂ ÷ (T₁V₂)', V2:'V₂ = P₁V₁T₂ ÷ (T₁P₂)', T2:'T₂ = T₁P₂V₂ ÷ (P₁V₁)',
        P1:'P₁ = P₂V₂T₁ ÷ (T₂V₁)', V1:'V₁ = P₂V₂T₁ ÷ (T₂P₁)', T1:'T₁ = T₂P₁V₁ ÷ (P₂V₂)',
      },
      ig: { P:'P = nRT ÷ V', V:'V = nRT ÷ P', n:'n = PV ÷ (RT)', T:'T = PV ÷ (nR)' },
      gr: {
        r1:'r₁ = r₂ × √(M₂/M₁)', r2:'r₂ = r₁ × √(M₁/M₂)',
        M1:'M₁ = M₂ × (r₂/r₁)²', M2:'M₂ = M₁ × (r₁/r₂)²',
      },
    };
    if (!gasVarSets[calc]) return;
    const fdEl = document.getElementById(`${calc}-formula-disp`);
    if (fdEl && gasFormulae[calc]) fdEl.textContent = gasFormulae[calc][solve] || fdEl.textContent;
    gasVarSets[calc].forEach(v => {
      const wrap = document.getElementById(`${calc}-${v}-wrap`);
      const inp  = document.getElementById(`${calc}-${v}`);
      if (!wrap || !inp) return;
      const isTarget = v === solve;
      wrap.classList.toggle('disabled', isTarget);
      inp.disabled = isTarget;
      inp.placeholder = isTarget ? 'calculated' : inp.getAttribute('data-default-ph') || 'enter value';
    });
    hideResultsGas(calc);
  }

  // Extend the global sf-btn handler to include gas calcs
  document.querySelectorAll('#gasModule .sf-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const calc  = btn.dataset.calc;
      const solve = btn.dataset.solve;
      document.querySelectorAll(`#gasModule .sf-btn[data-calc="${calc}"]`).forEach(b =>
        b.classList.toggle('active', b === btn));
      updateGasSolveFor(calc, solve);
    });
  });

  // Also capture R unit changes for ideal gas
  document.getElementById('ig-R-sel').addEventListener('change', () => {
    const unitMap = { '0.08206':'atm', '8.314':'kPa', '62.364':'mmHg' };
    const sel = document.getElementById('ig-R-sel').value;
    const puEl = document.getElementById('ig-P-unit');
    if (puEl) puEl.textContent = unitMap[sel] || 'atm';
    hideResultsGas('ig');
  });

  // ── Reset helper ──
  function resetGas(calc) {
    const panelMap = {
      bl:'panel-gas-boyle', cl:'panel-gas-charles',
      gl:'panel-gas-gaylussac', cg:'panel-gas-combined', ig:'panel-gas-ideal',
      gr:'panel-gas-graham'
    };
    const panel = document.getElementById(panelMap[calc]);
    if (panel) panel.querySelectorAll('input[type="number"]').forEach(i => { i.value = ''; });
    if (calc === 'ig') document.getElementById('ig-R-sel').selectedIndex = 0;
    hideResultsGas(calc);
    clearErrorGas(calc);
    const firstSF = document.querySelector(`#gasModule .sf-btn[data-calc="${calc}"]`);
    if (firstSF) firstSF.click();
  }

  /* ─────────────────────────────────────────────
     HELPER: get a numeric input value, validate > 0
     Returns the number or NaN.
  ───────────────────────────────────────────── */
  function gv(id) { return parseFloat(document.getElementById(id).value); }

  /* ─────────────────────────────────────────────
     EDUCATIONAL PANELS — collapsible accordion toggle
  ───────────────────────────────────────────── */
  function toggleEdu(header) {
    const item = header.closest('.edu-item');
    if (item) item.classList.toggle('open');
  }

  /* ─────────────────────────────────────────────
     EDUCATIONAL PANELS — reusable renderer
     sections: [{icon, title, html}]
  ───────────────────────────────────────────── */
  function renderEdu(panelId, sections) {
    const panel = document.getElementById(panelId);
    if (!panel) return;
    // Don't double-inject
    if (panel.querySelector('.edu-section')) return;

    const chevronSVG = `<svg class="edu-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg>`;

    const itemsHTML = sections.map(s => `
      <div class="edu-item">
        <button class="edu-header" onclick="toggleEdu(this)">
          <span class="edu-icon">${s.icon}</span>
          <span class="edu-title">${s.title}</span>
          ${chevronSVG}
        </button>
        <div class="edu-body">${s.html}</div>
      </div>`).join('');

    const section = document.createElement('div');
    section.className = 'edu-section';
    section.innerHTML = itemsHTML;
    panel.appendChild(section);
  }

