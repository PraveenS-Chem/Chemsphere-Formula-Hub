/* ═══════════════════════════════════════════════════════════
   FORMULA HUB — stoichiometryModule.js
   STOICHIOMETRY MODULE
   Sub-tab wiring plus the Percent Yield, Theoretical Yield, Limiting Reagent, and Empirical Formula calculators.
═══════════════════════════════════════════════════════════ */

  /* ═══════════════════════════════════════════════════════════
     STOICHIOMETRY MODULE LOGIC
  ═══════════════════════════════════════════════════════════ */

  function activateStoichTab(panelId) {
    if (activeCategory !== 'stoichiometry') syncActiveNav('stoichiometry');
    document.querySelectorAll('#stoichModule .mol-tab').forEach(t =>
      t.classList.toggle('active', t.dataset.stoichPanel === panelId));
    document.querySelectorAll('#stoichModule .mol-panel').forEach(p =>
      p.classList.toggle('active', p.id === 'panel-' + panelId));
    setBreadcrumbSub(STOICH_TAB_LABELS[panelId] || '');
  }

  document.querySelectorAll('#stoichModule .mol-tab').forEach(tab => {
    tab.addEventListener('click', () => activateStoichTab(tab.dataset.stoichPanel));
  });

  // ── Stoichiometry solve-for field toggling ──
  function updateStoichSolveFor(calc, solve) {
    if (calc === 'sy') {
      const formulae = {
        pct:         '% Yield = (Actual ÷ Theoretical) × 100',
        actual:      'Actual Yield = (% Yield × Theoretical) ÷ 100',
        theoretical: 'Theoretical Yield = (Actual ÷ % Yield) × 100',
      };
      const fd = document.getElementById('sy-formula-disp');
      if (fd) fd.textContent = formulae[solve] || formulae.pct;
      [['actual','g'], ['theoretical','g'], ['pct','%']].forEach(([v, unit]) => {
        const wrap = document.getElementById(`sy-${v}-wrap`);
        const inp  = document.getElementById(`sy-${v}`);
        if (!wrap || !inp) return;
        const isTarget = v === solve;
        wrap.classList.toggle('disabled', isTarget);
        inp.disabled   = isTarget;
        inp.placeholder = isTarget ? 'calculated'
          : v === 'actual' ? 'e.g. 4.5'
          : v === 'theoretical' ? 'e.g. 6.0'
          : 'e.g. 75';
      });
    }
    if (calc === 'ty') {
      const formulae = {
        theoretical: 'Theoretical Yield = Actual Yield ÷ (% Yield ÷ 100)',
        actual:      'Actual Yield = Theoretical Yield × (% Yield ÷ 100)',
        pct:         '% Yield = (Actual Yield ÷ Theoretical Yield) × 100',
      };
      const fd = document.getElementById('ty-formula-disp');
      if (fd) fd.textContent = formulae[solve] || formulae.theoretical;
      [['actual','g'], ['pct','%'], ['theoretical','g']].forEach(([v]) => {
        const wrap = document.getElementById(`ty-${v}-wrap`);
        const inp  = document.getElementById(`ty-${v}`);
        if (!wrap || !inp) return;
        const isTarget = v === solve;
        wrap.classList.toggle('disabled', isTarget);
        inp.disabled   = isTarget;
        inp.placeholder = isTarget ? 'calculated'
          : v === 'actual' ? 'e.g. 4.5'
          : v === 'pct'    ? 'e.g. 75'
          : 'e.g. 6.0';
      });
    }
    hideResults(calc);
  }

  // ════════════════════════════════════════
  // CALCULATOR — Percent Yield  (sy)
  //   % Yield = (Actual / Theoretical) × 100
  // ════════════════════════════════════════
  function calcSY() {
    clearError('sy');
    const solve = document.querySelector('#stoichModule .sf-btn.active[data-calc="sy"]')?.dataset.solve ?? 'pct';

    const actual      = gv('sy-actual');
    const theoretical = gv('sy-theoretical');
    const pct         = gv('sy-pct');

    if (solve === 'pct') {
      if (isNaN(actual))      return showError('sy', 'Please enter the Actual Yield.');
      if (isNaN(theoretical)) return showError('sy', 'Please enter the Theoretical Yield.');
      if (actual < 0)         return showError('sy', 'Actual Yield cannot be negative.');
      if (theoretical <= 0)   return showError('sy', 'Theoretical Yield must be greater than zero.');
      if (actual > theoretical)
        return showError('sy', 'Actual Yield cannot exceed Theoretical Yield (percent yield would be >100%).');

      const result = (actual / theoretical) * 100;
      const efficiency = result >= 90 ? 'Excellent yield (≥90%)' : result >= 70 ? 'Good yield (70–90%)' : result >= 50 ? 'Moderate yield (50–70%)' : 'Low yield (<50%)';
      showResult('sy', 'Percent Yield', fmt(result), '%', [
        { title: 'Write the formula', expr: '% Yield = (Actual Yield ÷ Theoretical Yield) × 100', note: 'Percent yield measures reaction efficiency.' },
        { title: 'Substitute known values', expr: `% Yield = (${fmt(actual)} g ÷ ${fmt(theoretical)} g) × 100` },
        { title: 'Evaluate the ratio', expr: `Actual ÷ Theoretical = ${fmt(actual / theoretical)}` },
        { title: 'Multiply by 100', expr: `% Yield = ${fmt(actual / theoretical)} × 100 = ${fmt(result)}%`, note: efficiency },
      ]);

    } else if (solve === 'actual') {
      if (isNaN(pct))         return showError('sy', 'Please enter the Percent Yield.');
      if (isNaN(theoretical)) return showError('sy', 'Please enter the Theoretical Yield.');
      if (pct < 0)            return showError('sy', 'Percent Yield cannot be negative.');
      if (pct > 100)          return showError('sy', 'Percent Yield cannot exceed 100%.');
      if (theoretical <= 0)   return showError('sy', 'Theoretical Yield must be greater than zero.');

      const result = (pct / 100) * theoretical;
      showResult('sy', 'Actual Yield', fmt(result), 'g', [
        { title: 'Write the formula', expr: '% Yield = (Actual Yield ÷ Theoretical Yield) × 100' },
        { title: 'Rearrange for Actual Yield', expr: 'Actual Yield = (% Yield × Theoretical Yield) ÷ 100' },
        { title: 'Substitute known values', expr: `Actual Yield = (${fmt(pct)}% × ${fmt(theoretical)} g) ÷ 100` },
        { title: 'Calculate result', expr: `Actual Yield = ${fmt(pct * theoretical)} ÷ 100 = ${fmt(result)} g` },
      ]);

    } else {
      if (isNaN(actual)) return showError('sy', 'Please enter the Actual Yield.');
      if (isNaN(pct))    return showError('sy', 'Please enter the Percent Yield.');
      if (actual < 0)    return showError('sy', 'Actual Yield cannot be negative.');
      if (pct <= 0)      return showError('sy', 'Percent Yield must be greater than zero (cannot divide by zero).');
      if (pct > 100)     return showError('sy', 'Percent Yield cannot exceed 100%.');

      const result = (actual / pct) * 100;
      showResult('sy', 'Theoretical Yield', fmt(result), 'g', [
        { title: 'Write the formula', expr: '% Yield = (Actual Yield ÷ Theoretical Yield) × 100' },
        { title: 'Rearrange for Theoretical Yield', expr: 'Theoretical Yield = (Actual Yield ÷ % Yield) × 100' },
        { title: 'Substitute known values', expr: `Theoretical Yield = (${fmt(actual)} g ÷ ${fmt(pct)}%) × 100` },
        { title: 'Calculate result', expr: `Theoretical Yield = ${fmt(actual / pct)} × 100 = ${fmt(result)} g` },
      ]);
    }
  }

  // ════════════════════════════════════════
  // CALCULATOR — Theoretical Yield  (ty)
  //   Theoretical = Actual ÷ (% Yield ÷ 100)
  // ════════════════════════════════════════
  function calcTY() {
    clearError('ty');
    const solve = document.querySelector('#stoichModule .sf-btn.active[data-calc="ty"]')?.dataset.solve ?? 'theoretical';

    const actual      = gv('ty-actual');
    const pct         = gv('ty-pct');
    const theoretical = gv('ty-theoretical');

    if (solve === 'theoretical') {
      if (isNaN(actual))  return showError('ty', 'Please enter the Actual Yield.');
      if (isNaN(pct))     return showError('ty', 'Please enter the Percent Yield.');
      if (actual < 0)     return showError('ty', 'Actual Yield cannot be negative.');
      if (pct <= 0)       return showError('ty', 'Percent Yield must be greater than zero (cannot divide by zero).');
      if (pct > 100)      return showError('ty', 'Percent Yield cannot exceed 100%.');

      const decimal = pct / 100;
      const result  = actual / decimal;
      showResult('ty', 'Theoretical Yield', fmt(result), 'g', [
        { title: 'Write the formula', expr: 'Theoretical Yield = Actual Yield ÷ (% Yield ÷ 100)', note: 'Rearranged from % Yield = (Actual ÷ Theoretical) × 100.' },
        { title: 'Convert % Yield to decimal', expr: `% Yield ÷ 100 = ${fmt(pct)}% ÷ 100 = ${fmt(decimal)}` },
        { title: 'Substitute known values', expr: `Theoretical Yield = ${fmt(actual)} g ÷ ${fmt(decimal)}` },
        { title: 'Calculate result', expr: `Theoretical Yield = ${fmt(result)} g` },
      ]);

    } else if (solve === 'actual') {
      if (isNaN(theoretical)) return showError('ty', 'Please enter the Theoretical Yield.');
      if (isNaN(pct))         return showError('ty', 'Please enter the Percent Yield.');
      if (theoretical < 0)    return showError('ty', 'Theoretical Yield cannot be negative.');
      if (theoretical === 0)  return showError('ty', 'Theoretical Yield cannot be zero.');
      if (pct < 0)            return showError('ty', 'Percent Yield cannot be negative.');
      if (pct > 100)          return showError('ty', 'Percent Yield cannot exceed 100%.');

      const decimal = pct / 100;
      const result  = theoretical * decimal;
      showResult('ty', 'Actual Yield', fmt(result), 'g', [
        { title: 'Write the formula', expr: 'Actual Yield = Theoretical Yield × (% Yield ÷ 100)', note: 'Rearranged from % Yield = (Actual ÷ Theoretical) × 100.' },
        { title: 'Convert % Yield to decimal', expr: `% Yield ÷ 100 = ${fmt(pct)}% ÷ 100 = ${fmt(decimal)}` },
        { title: 'Substitute known values', expr: `Actual Yield = ${fmt(theoretical)} g × ${fmt(decimal)}` },
        { title: 'Calculate result', expr: `Actual Yield = ${fmt(result)} g` },
      ]);

    } else {
      if (isNaN(actual))      return showError('ty', 'Please enter the Actual Yield.');
      if (isNaN(theoretical)) return showError('ty', 'Please enter the Theoretical Yield.');
      if (actual < 0)         return showError('ty', 'Actual Yield cannot be negative.');
      if (theoretical <= 0)   return showError('ty', 'Theoretical Yield must be greater than zero (cannot divide by zero).');
      if (actual > theoretical)
        return showError('ty', 'Actual Yield cannot exceed Theoretical Yield.');

      const result = (actual / theoretical) * 100;
      showResult('ty', 'Percent Yield', fmt(result), '%', [
        { title: 'Write the formula', expr: '% Yield = (Actual Yield ÷ Theoretical Yield) × 100' },
        { title: 'Substitute known values', expr: `% Yield = (${fmt(actual)} g ÷ ${fmt(theoretical)} g) × 100` },
        { title: 'Evaluate the ratio', expr: `Actual ÷ Theoretical = ${fmt(actual / theoretical)}` },
        { title: 'Calculate result', expr: `% Yield = ${fmt(actual / theoretical)} × 100 = ${fmt(result)}%` },
      ]);
    }
  }

  // ════════════════════════════════════════
  // CALCULATOR — Limiting Reagent  (lr)
  //   Ratio A = Amount A ÷ Coefficient A
  //   Ratio B = Amount B ÷ Coefficient B
  //   Smaller ratio → Limiting Reagent
  // ════════════════════════════════════════
  function calcLR() {
    clearError('lr');

    const amtA   = gv('lr-amtA');
    const amtB   = gv('lr-amtB');
    const coeffA = gv('lr-coeffA');
    const coeffB = gv('lr-coeffB');

    // ── Validation ──
    if (isNaN(amtA))   return showError('lr', 'Please enter the amount of Reactant A (mol).');
    if (isNaN(amtB))   return showError('lr', 'Please enter the amount of Reactant B (mol).');
    if (isNaN(coeffA)) return showError('lr', 'Please enter the stoichiometric coefficient of A.');
    if (isNaN(coeffB)) return showError('lr', 'Please enter the stoichiometric coefficient of B.');
    if (amtA < 0)      return showError('lr', 'Amount of Reactant A cannot be negative.');
    if (amtB < 0)      return showError('lr', 'Amount of Reactant B cannot be negative.');
    if (coeffA <= 0)   return showError('lr', 'Coefficient of A must be greater than zero (no division by zero).');
    if (coeffB <= 0)   return showError('lr', 'Coefficient of B must be greater than zero (no division by zero).');

    // ── Core calculation ──
    const ratioA = amtA / coeffA;
    const ratioB = amtB / coeffB;

    let limiting, excess, limitingRatio, excessRatio;
    if (ratioA < ratioB) {
      limiting = 'Reactant A'; excess = 'Reactant B';
      limitingRatio = ratioA; excessRatio = ratioB;
    } else if (ratioB < ratioA) {
      limiting = 'Reactant B'; excess = 'Reactant A';
      limitingRatio = ratioB; excessRatio = ratioA;
    } else {
      limiting = 'Both (stoichiometric mixture)';
      excess   = 'Neither — exact ratio';
      limitingRatio = ratioA; excessRatio = ratioB;
    }

    // ── Populate extras panel ──
    document.getElementById('lr-ratioA-val').textContent  = fmt(ratioA);
    document.getElementById('lr-ratioB-val').textContent  = fmt(ratioB);
    document.getElementById('lr-limiting-val').textContent = limiting;
    document.getElementById('lr-excess-val').textContent   = excess;
    document.getElementById('lr-extras').classList.add('visible');

    // ── Result hero ──
    showResult('lr', 'Limiting Reagent', limiting, '', [
      {
        title: 'Write the stoichiometric coefficients',
        expr:  `Balanced ratio: ${fmt(coeffA)} mol A : ${fmt(coeffB)} mol B`,
        note:  'The coefficient tells us how many moles of each reactant are consumed per reaction cycle.',
      },
      {
        title: 'Calculate the molar ratio for Reactant A',
        expr:  `Ratio A = Amount A ÷ Coefficient A = ${fmt(amtA)} mol ÷ ${fmt(coeffA)} = ${fmt(ratioA)}`,
        note:  'This ratio shows how many "reaction cycles" Reactant A can sustain.',
      },
      {
        title: 'Calculate the molar ratio for Reactant B',
        expr:  `Ratio B = Amount B ÷ Coefficient B = ${fmt(amtB)} mol ÷ ${fmt(coeffB)} = ${fmt(ratioB)}`,
        note:  'This ratio shows how many "reaction cycles" Reactant B can sustain.',
      },
      {
        title: 'Compare the ratios',
        expr:  ratioA === ratioB
          ? `Ratio A (${fmt(ratioA)}) = Ratio B (${fmt(ratioB)}) → Stoichiometric mixture`
          : ratioA < ratioB
            ? `Ratio A (${fmt(ratioA)}) < Ratio B (${fmt(ratioB)}) → Reactant A runs out first`
            : `Ratio B (${fmt(ratioB)}) < Ratio A (${fmt(ratioA)}) → Reactant B runs out first`,
        note:  `The reactant with the smaller ratio is the limiting reagent: ${limiting}.`,
      },
    ]);
  }

  // ════════════════════════════════════════
  // CALCULATOR — Empirical Formula  (ef)
  // ════════════════════════════════════════

  // Atomic masses (g/mol) for common elements
  const ATOMIC_MASS = {
    H:1.008,He:4.003,Li:6.941,Be:9.012,B:10.81,C:12.011,N:14.007,O:15.999,
    F:19.00,Ne:20.18,Na:22.99,Mg:24.31,Al:26.98,Si:28.09,P:30.97,S:32.06,
    Cl:35.45,Ar:39.95,K:39.10,Ca:40.08,Sc:44.96,Ti:47.87,V:50.94,Cr:52.00,
    Mn:54.94,Fe:55.85,Co:58.93,Ni:58.69,Cu:63.55,Zn:65.38,Ga:69.72,Ge:72.63,
    As:74.92,Se:78.97,Br:79.90,Kr:83.80,Rb:85.47,Sr:87.62,Y:88.91,Zr:91.22,
    Nb:92.91,Mo:95.96,Tc:98,Ru:101.1,Rh:102.9,Pd:106.4,Ag:107.9,Cd:112.4,
    In:114.8,Sn:118.7,Sb:121.8,Te:127.6,I:126.9,Xe:131.3,Cs:132.9,Ba:137.3,
    La:138.9,Ce:140.1,Pr:140.9,Nd:144.2,Pm:145,Sm:150.4,Eu:152.0,Gd:157.3,
    Tb:158.9,Dy:162.5,Ho:164.9,Er:167.3,Tm:168.9,Yb:173.0,Lu:175.0,Hf:178.5,
    Ta:180.9,W:183.8,Re:186.2,Os:190.2,Ir:192.2,Pt:195.1,Au:197.0,Hg:200.6,
    Tl:204.4,Pb:207.2,Bi:209.0,Po:209,At:210,Rn:222,Fr:223,Ra:226,Ac:227,
    Th:232.0,Pa:231.0,U:238.0,
  };

  function gcd2(a, b) {
    a = Math.round(a); b = Math.round(b);
    while (b) { [a, b] = [b, a % b]; }
    return a;
  }
  function gcdArr(arr) { return arr.reduce(gcd2); }

  // Round a raw ratio to the nearest simple fraction (×1..6) or integer
  function roundRatio(r) {
    const tol = 0.08;
    // check halves, thirds, quarters, fifths, sixths
    const fracs = [1, 2, 3, 4, 5, 6, 0.5, 1.5, 2.5, 3.5, 4.5,
                   1/3, 2/3, 4/3, 5/3, 7/3, 8/3,
                   0.25, 0.75, 1.25, 1.75, 2.25, 2.75,
                   0.2, 0.4, 0.6, 0.8, 1.2, 1.4, 1.6, 1.8];
    let best = Math.round(r), bestDiff = Math.abs(r - Math.round(r));
    for (const f of fracs) {
      const diff = Math.abs(r - f);
      if (diff < bestDiff) { bestDiff = diff; best = f; }
    }
    return bestDiff <= tol ? best : Math.round(r);
  }

  // Convert fractional subscripts to whole numbers by multiplying through
  function rationaliseRatios(ratios) {
    // Try multipliers 1-8 until all values are within tol of integers
    const tol = 0.10;
    for (let m = 1; m <= 8; m++) {
      if (ratios.every(r => Math.abs(r * m - Math.round(r * m)) < tol)) {
        return ratios.map(r => Math.round(r * m));
      }
    }
    return ratios.map(r => Math.round(r));
  }

  function buildFormula(syms, ints) {
    // subscript-ify integers
    const sub = { 0:'₀',1:'₁',2:'₂',3:'₃',4:'₄',5:'₅',6:'₆',7:'₇',8:'₈',9:'₉' };
    const toSub = n => n === 1 ? '' : String(n).split('').map(c => sub[c] ?? c).join('');
    return syms.map((s, i) => s + toSub(ints[i])).join('');
  }

  function calcEF() {
    clearError('ef');

    // Gather filled rows
    const elements = [];
    for (let i = 0; i < 4; i++) {
      const symRaw = (document.getElementById(`ef-sym-${i}`)?.value || '').trim();
      const massEl = document.getElementById(`ef-mass-${i}`);
      const mass   = massEl ? parseFloat(massEl.value) : NaN;

      if (!symRaw && isNaN(mass)) continue; // empty row — skip
      if (!symRaw)  return showError('ef', `Row ${i+1}: Enter an element symbol.`);
      if (isNaN(mass)) return showError('ef', `Row ${i+1}: Enter a mass for element "${symRaw}".`);

      // Normalise capitalisation: first letter upper, rest lower
      const sym = symRaw.charAt(0).toUpperCase() + symRaw.slice(1).toLowerCase();
      if (!(sym in ATOMIC_MASS)) return showError('ef', `"${sym}" is not a recognised element symbol. Check spelling.`);
      if (mass <= 0) return showError('ef', `Mass of ${sym} must be greater than zero.`);

      elements.push({ sym, mass, am: ATOMIC_MASS[sym] });
    }

    if (elements.length < 2) return showError('ef', 'Enter at least 2 elements to determine an empirical formula.');

    // Step 1 — moles
    elements.forEach(el => { el.moles = el.mass / el.am; });

    // Step 2 — smallest mole value
    const minMoles = Math.min(...elements.map(e => e.moles));

    // Step 3 — raw ratios
    elements.forEach(el => { el.rawRatio = el.moles / minMoles; });

    // Step 4 — rationalise to whole numbers
    const wholes = rationaliseRatios(elements.map(e => e.rawRatio));
    elements.forEach((el, i) => { el.whole = wholes[i]; });

    // Simplify by GCD
    const g = gcdArr(wholes);
    elements.forEach(el => { el.subscript = el.whole / g; });

    // Step 5 — build formula
    const formula = buildFormula(elements.map(e => e.sym), elements.map(e => e.subscript));

    // ── Update result hero ──
    const placeholder = document.getElementById('ef-placeholder');
    if (placeholder) placeholder.style.display = 'none';

    document.getElementById('ef-result-name').textContent  = 'Empirical Formula';
    document.getElementById('ef-result-value').textContent = formula;
    document.getElementById('ef-result-unit').textContent  = '';
    document.getElementById('ef-result').classList.add('visible');

    // ── Build calculation table ──
    const tableCard = document.getElementById('ef-table-card');
    const tableBody = document.getElementById('ef-table-body');
    tableBody.innerHTML = `
      <table class="ef-table">
        <thead>
          <tr>
            <th>Element</th>
            <th>Mass (g)</th>
            <th>At. Mass</th>
            <th>Moles</th>
            <th>Raw Ratio</th>
            <th>Subscript</th>
          </tr>
        </thead>
        <tbody>
          ${elements.map(el => `
            <tr>
              <td class="ef-sym-cell">${el.sym}</td>
              <td>${fmt(el.mass)}</td>
              <td>${el.am}</td>
              <td>${fmt(el.moles)}</td>
              <td>${fmt(el.rawRatio)}</td>
              <td class="ef-ratio-final">${el.subscript}</td>
            </tr>`).join('')}
        </tbody>
      </table>`;
    tableCard.classList.add('visible');

    // ── Step-by-step ──
    const stepsList = document.getElementById('ef-steps-list');
    const stepsCard = document.getElementById('ef-steps');
    stepsList.innerHTML = '';

    const stepsData = [
      {
        title: 'Convert mass to moles using atomic mass',
        expr:  elements.map(el => `${el.sym}: ${fmt(el.mass)} g ÷ ${el.am} g/mol = ${fmt(el.moles)} mol`).join('  |  '),
        note:  'Moles = Mass (g) ÷ Atomic Mass (g/mol)',
      },
      {
        title: 'Identify the smallest mole value',
        expr:  `Smallest = ${fmt(minMoles)} mol  (${elements.find(e => Math.abs(e.moles - minMoles) < 1e-9)?.sym})`,
        note:  'All mole values will be divided by this number.',
      },
      {
        title: 'Divide each mole value by the smallest',
        expr:  elements.map(el => `${el.sym}: ${fmt(el.moles)} ÷ ${fmt(minMoles)} = ${fmt(el.rawRatio)}`).join('  |  '),
        note:  'This gives the raw molar ratios.',
      },
      {
        title: 'Round to the nearest whole-number ratio',
        expr:  elements.map(el => `${el.sym}: ${fmt(el.rawRatio)} → ${el.subscript}`).join('  |  '),
        note:  g > 1
          ? `GCD of ${wholes.join(', ')} = ${g}. Divide through to simplify: ${elements.map(e=>`${e.sym}→${e.subscript}`).join(', ')}.`
          : 'Ratios are already in simplest whole-number form.',
      },
      {
        title: 'Write the empirical formula',
        expr:  formula,
        note:  `Combine each element symbol with its subscript. Subscript of 1 is omitted by convention.`,
      },
    ];

    stepsData.forEach((s, i) => {
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

  // ── Reset helper for Stoichiometry module ──
  function resetStoich(calc) {
    const panelMap = {
      sy: 'panel-stoich-yield',
      ty: 'panel-stoich-theoretical',
      ef: 'panel-stoich-empirical',
      lr: 'panel-stoich-limiting',
    };
    const panel = document.getElementById(panelMap[calc]);
    if (panel) {
      panel.querySelectorAll('input[type="number"]').forEach(i => { i.value = ''; });
      panel.querySelectorAll('input[type="text"]').forEach(i => { i.value = ''; });
    }
    // hide lr-extras if resetting limiting reagent
    if (calc === 'lr') {
      const extras = document.getElementById('lr-extras');
      if (extras) extras.classList.remove('visible');
    }
    // hide ef table card
    if (calc === 'ef') {
      const tc = document.getElementById('ef-table-card');
      if (tc) tc.classList.remove('visible');
    }
    hideResults(calc);
    clearError(calc);
    const firstSF = document.querySelector(`#stoichModule .sf-btn[data-calc="${calc}"]`);
    if (firstSF) firstSF.click();
  }


  function updateAcidSolveFor(calc, solve) {
    if (calc === 'ph') {
      const formulae = { pH: 'pH = -log[H⁺]', H: '[H⁺] = 10^(-pH)' };
      const fdEl = document.getElementById('ph-formula-disp');
      if (fdEl) fdEl.textContent = formulae[solve] || formulae.pH;
      ['H','pH'].forEach(v => {
        const wrap = document.getElementById(`ph-${v}-wrap`);
        const inp  = document.getElementById(`ph-${v}`);
        if (!wrap || !inp) return;
        const isTarget = v === solve;
        wrap.classList.toggle('disabled', isTarget);
        inp.disabled = isTarget;
        inp.placeholder = isTarget ? 'calculated' : (v === 'H' ? 'e.g. 1e-7' : 'e.g. 7');
      });
    }
    if (calc === 'poh') {
      const formulae = { pOH: 'pOH = -log[OH⁻]', OH: '[OH⁻] = 10^(-pOH)' };
      const fdEl = document.getElementById('poh-formula-disp');
      if (fdEl) fdEl.textContent = formulae[solve] || formulae.pOH;
      ['OH','pOH'].forEach(v => {
        const wrap = document.getElementById(`poh-${v}-wrap`);
        const inp  = document.getElementById(`poh-${v}`);
        if (!wrap || !inp) return;
        const isTarget = v === solve;
        wrap.classList.toggle('disabled', isTarget);
        inp.disabled = isTarget;
        inp.placeholder = isTarget ? 'calculated' : (v === 'OH' ? 'e.g. 1e-7' : 'e.g. 7');
      });
    }
    if (calc === 'hc') {
      const formulae = { H: '[H⁺] = Kw ÷ [OH⁻]', OH: '[OH⁻] = Kw ÷ [H⁺]' };
      const fdEl = document.getElementById('hc-formula-disp');
      if (fdEl) fdEl.textContent = formulae[solve] || formulae.H;
      ['OH','H'].forEach(v => {
        const wrap = document.getElementById(`hc-${v}-wrap`);
        const inp  = document.getElementById(`hc-${v}`);
        if (!wrap || !inp) return;
        const isTarget = v === solve;
        wrap.classList.toggle('disabled', isTarget);
        inp.disabled = isTarget;
        inp.placeholder = isTarget ? 'calculated' : 'e.g. 1e-7';
      });
    }
    if (calc === 'oc') {
      const formulae = { OH: '[OH⁻] = Kw ÷ [H⁺]', H: '[H⁺] = Kw ÷ [OH⁻]' };
      const fdEl = document.getElementById('oc-formula-disp');
      if (fdEl) fdEl.textContent = formulae[solve] || formulae.OH;
      ['H','OH'].forEach(v => {
        const wrap = document.getElementById(`oc-${v}-wrap`);
        const inp  = document.getElementById(`oc-${v}`);
        if (!wrap || !inp) return;
        const isTarget = v === solve;
        wrap.classList.toggle('disabled', isTarget);
        inp.disabled = isTarget;
        inp.placeholder = isTarget ? 'calculated' : 'e.g. 1e-7';
      });
    }
    if (calc === 'pr') {
      const formulae = { pH: 'pH = 14 − pOH', pOH: 'pOH = 14 − pH' };
      const fdEl = document.getElementById('pr-formula-disp');
      if (fdEl) fdEl.textContent = formulae[solve] || 'pH + pOH = 14';
      ['pOH','pH'].forEach(v => {
        const wrap = document.getElementById(`pr-${v}-wrap`);
        const inp  = document.getElementById(`pr-${v}`);
        if (!wrap || !inp) return;
        const isTarget = v === solve;
        wrap.classList.toggle('disabled', isTarget);
        inp.disabled = isTarget;
        inp.placeholder = isTarget ? 'calculated' : 'e.g. 7';
      });
    }
    hideResults(calc);
  }

