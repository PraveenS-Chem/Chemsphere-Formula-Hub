/* ═══════════════════════════════════════════════════════════
   FORMULA HUB — solutionsAndGasNav.js
   SOLUTIONS MODULE + GAS LAW NAV
   Full Solutions module (Molarity, Molality, Normality, Dilution, Raoult's Law) plus the Gas Laws sub-tab switching logic (the actual gas law calculators live in gasLawCalculators.js).
═══════════════════════════════════════════════════════════ */

  /* ═══════════════════════════════════════════════════════
     SOLUTIONS MODULE LOGIC
  ═══════════════════════════════════════════════════════ */

  // ── Sol sub-tab switching ──
  function activateSolTab(panelId) {
    if (activeCategory !== 'solutions') syncActiveNav('solutions');
    document.querySelectorAll('#solModule .mol-tab').forEach(t =>
      t.classList.toggle('active', t.dataset.solPanel === panelId));
    document.querySelectorAll('#solModule .mol-panel').forEach(p =>
      p.classList.toggle('active', p.id === 'panel-' + panelId));
    setBreadcrumbSub(SOL_TAB_LABELS[panelId] || '');
  }

  document.querySelectorAll('#solModule .mol-tab').forEach(tab => {
    tab.addEventListener('click', () => activateSolTab(tab.dataset.solPanel));
  });

  // ── Sol solve-for wiring ──
  function updateSolSolveFor(calc, solve) {
    // Molarity (mr): C = n / V
    if (calc === 'mr') {
      const formulae = { C:'C = n ÷ V(L)', n:'n = C × V(L)', V:'V = n ÷ C' };
      document.getElementById('mr-formula-disp').textContent = formulae[solve] || 'C = n ÷ V(L)';
      ['n','V','C'].forEach(v => {
        const wrap = document.getElementById(`mr-${v}-wrap`);
        const inp  = document.getElementById(`mr-${v}`);
        if (!wrap || !inp) return;
        const isTarget = v === solve;
        wrap.classList.toggle('disabled', isTarget);
        inp.disabled = isTarget;
        inp.placeholder = isTarget ? 'calculated' : (v === 'n' ? 'e.g. 0.5' : v === 'V' ? 'e.g. 250' : 'e.g. 2');
      });
    }
    // Molality (ml): b = n / m(kg)
    if (calc === 'ml') {
      const formulae = { b:'b = n ÷ m(kg)', n:'n = b × m(kg)', m:'m = n ÷ b' };
      document.getElementById('ml-formula-disp').textContent = formulae[solve] || 'b = n ÷ m(kg)';
      ['n','m','b'].forEach(v => {
        const wrap = document.getElementById(`ml-${v}-wrap`);
        const inp  = document.getElementById(`ml-${v}`);
        if (!wrap || !inp) return;
        const isTarget = v === solve;
        wrap.classList.toggle('disabled', isTarget);
        inp.disabled = isTarget;
        inp.placeholder = isTarget ? 'calculated' : (v === 'n' ? 'e.g. 1.5' : v === 'm' ? 'e.g. 500' : 'e.g. 3');
      });
    }
    // Normality (nr): N = n × f / V
    if (calc === 'nr') {
      const formulae = { N:'N = (n × f) ÷ V(L)', n:'n = N × V(L) ÷ f', V:'V = (n × f) ÷ N' };
      document.getElementById('nr-formula-disp').textContent = formulae[solve] || 'N = (n × f) ÷ V(L)';
      ['n','V','N'].forEach(v => {
        const wrap = document.getElementById(`nr-${v}-wrap`);
        const inp  = document.getElementById(`nr-${v}`);
        if (!wrap || !inp) return;
        const isTarget = v === solve;
        wrap.classList.toggle('disabled', isTarget);
        inp.disabled = isTarget;
        inp.placeholder = isTarget ? 'calculated' : (v === 'n' ? 'e.g. 0.4' : v === 'V' ? 'e.g. 500' : 'e.g. 0.8');
      });
    }
    // Dilution (dl): C1V1 = C2V2
    if (calc === 'dl') {
      const formulae = {
        C2:'C₂ = C₁V₁ ÷ V₂',
        V2:'V₂ = C₁V₁ ÷ C₂',
        C1:'C₁ = C₂V₂ ÷ V₁',
        V1:'V₁ = C₂V₂ ÷ C₁',
      };
      document.getElementById('dl-formula-disp').textContent = formulae[solve] || 'C₁V₁ = C₂V₂';
      ['C1','V1','C2','V2'].forEach(v => {
        const wrap = document.getElementById(`dl-${v}-wrap`);
        const inp  = document.getElementById(`dl-${v}`);
        if (!wrap || !inp) return;
        const isTarget = v === solve;
        wrap.classList.toggle('disabled', isTarget);
        inp.disabled = isTarget;
        inp.placeholder = isTarget ? 'calculated'
          : v === 'C1' ? 'e.g. 12' : v === 'V1' ? 'e.g. 25'
          : v === 'C2' ? 'e.g. 0.5' : 'e.g. 500';
      });
    }
    // Raoult's Law (rl): Ps = Xs * P0
    if (calc === 'rl') {
      const formulae = { Ps:'Pₛ = χₛ × P°', Xs:'χₛ = Pₛ ÷ P°', P0:'P° = Pₛ ÷ χₛ' };
      document.getElementById('rl-formula-disp').textContent = formulae[solve] || 'Pₛ = χₛ × P°';
      ['Xs','P0','Ps'].forEach(v => {
        const wrap = document.getElementById(`rl-${v}-wrap`);
        const inp  = document.getElementById(`rl-${v}`);
        if (!wrap || !inp) return;
        const isTarget = v === solve;
        wrap.classList.toggle('disabled', isTarget);
        inp.disabled = isTarget;
        inp.placeholder = isTarget ? 'calculated' : (v === 'Xs' ? 'e.g. 0.9' : v === 'P0' ? 'e.g. 760' : 'e.g. 684');
      });
    }
    hideResultsSol(calc);
  }

  // Wire solve-for buttons in solutions module — handled by global .sf-btn listener above

  // ── Shared sol result helpers ──
  function hideResultsSol(calc) {
    [`${calc}-result`,`${calc}-steps`,`${calc}-error`].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.remove('visible');
    });
    const ph = document.getElementById(`${calc}-placeholder`);
    if (ph) ph.style.display = '';
  }

  function showErrorSol(calc, msg) {
    const el = document.getElementById(`${calc}-error`);
    if (!el) return;
    el.textContent = '⚠ ' + msg;
    el.classList.add('visible');
  }

  function clearErrorSol(calc) {
    const el = document.getElementById(`${calc}-error`);
    if (el) { el.textContent = ''; el.classList.remove('visible'); }
  }

  function showResultSol(calc, name, value, unit, steps) {
    clearErrorSol(calc);
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

  // ── Reset helper (Solutions module) ──
  function resetSol(calc) {
    const panelMap = {
      mr: 'panel-sol-molarity', ml: 'panel-sol-molality',
      nr: 'panel-sol-normality', dl: 'panel-sol-dilution',
      rl: 'panel-sol-raoult'
    };
    const panel = document.getElementById(panelMap[calc]);
    if (panel) panel.querySelectorAll('input[type="number"]').forEach(i => {
      // Keep equivalence factor default of 1
      if (i.id === 'nr-f') { i.value = '1'; } else { i.value = ''; }
    });
    hideResultsSol(calc);
    clearErrorSol(calc);
    const firstSF = document.querySelector(`#solModule .sf-btn[data-calc="${calc}"]`);
    if (firstSF) firstSF.click();
  }

  // ══════════════════════════════════
  // CALCULATOR 1 — Molarity  (mr)
  //   C = n / V(L)
  // ══════════════════════════════════
  function calcMR() {
    clearErrorSol('mr');
    const solve = document.querySelector('#solModule .sf-btn.active[data-calc="mr"]')?.dataset.solve ?? 'C';

    if (solve === 'C') {
      const n = parseFloat(document.getElementById('mr-n').value);
      const V = parseFloat(document.getElementById('mr-V').value); // mL
      if (isNaN(n) || isNaN(V)) return showErrorSol('mr', 'Please enter values for moles (n) and volume (V).');
      if (n < 0)  return showErrorSol('mr', 'Moles cannot be negative.');
      if (V <= 0) return showErrorSol('mr', 'Volume must be greater than 0 mL.');
      const Vl = V / 1000;
      const C  = n / Vl;
      showResultSol('mr', 'Molarity (C)', fmt(C), 'mol/L', [
        { title: 'Write the formula', expr: 'C = n ÷ V', note: 'C = molarity (mol/L), n = moles of solute, V = volume of solution in litres.' },
        { title: 'Convert volume to litres', expr: `V = ${V} mL ÷ 1000 = ${fmt(Vl)} L`, note: 'Always convert mL → L before calculating molarity.' },
        { title: 'Substitute known values', expr: `C = ${fmt(n)} mol ÷ ${fmt(Vl)} L` },
        { title: 'Calculate molarity', expr: `C = ${fmt(C)} mol/L`, note: `The solution is ${fmt(C)} M.` },
      ]);
    }
    if (solve === 'n') {
      const C = parseFloat(document.getElementById('mr-C').value);
      const V = parseFloat(document.getElementById('mr-V').value);
      if (isNaN(C) || isNaN(V)) return showErrorSol('mr', 'Please enter molarity (C) and volume (V).');
      if (C < 0)  return showErrorSol('mr', 'Molarity cannot be negative.');
      if (V <= 0) return showErrorSol('mr', 'Volume must be greater than 0 mL.');
      const Vl = V / 1000;
      const n  = C * Vl;
      showResultSol('mr', 'Moles of Solute (n)', fmt(n), 'mol', [
        { title: 'Rearrange formula for moles', expr: 'n = C × V', note: 'Multiply molarity by volume in litres.' },
        { title: 'Convert volume to litres', expr: `V = ${V} mL ÷ 1000 = ${fmt(Vl)} L` },
        { title: 'Substitute values', expr: `n = ${fmt(C)} mol/L × ${fmt(Vl)} L` },
        { title: 'Calculate moles', expr: `n = ${fmt(n)} mol`, note: `${fmt(n)} mol of solute is dissolved in ${V} mL of solution.` },
      ]);
    }
    if (solve === 'V') {
      const n = parseFloat(document.getElementById('mr-n').value);
      const C = parseFloat(document.getElementById('mr-C').value);
      if (isNaN(n) || isNaN(C)) return showErrorSol('mr', 'Please enter moles (n) and molarity (C).');
      if (n < 0)  return showErrorSol('mr', 'Moles cannot be negative.');
      if (C <= 0) return showErrorSol('mr', 'Molarity must be greater than 0.');
      const Vl  = n / C;
      const VmL = Vl * 1000;
      showResultSol('mr', 'Volume of Solution (V)', fmt(VmL), 'mL', [
        { title: 'Rearrange formula for volume', expr: 'V = n ÷ C', note: 'Divide moles by molarity to get volume in litres.' },
        { title: 'Substitute values', expr: `V = ${fmt(n)} mol ÷ ${fmt(C)} mol/L = ${fmt(Vl)} L` },
        { title: 'Convert to millilitres', expr: `V = ${fmt(Vl)} L × 1000 = ${fmt(VmL)} mL`, note: `Dissolve ${fmt(n)} mol of solute and make up to ${fmt(VmL)} mL total volume.` },
      ]);
    }
  }

  // ══════════════════════════════════
  // CALCULATOR 2 — Molality  (ml)
  //   b = n / m_solvent(kg)
  // ══════════════════════════════════
  function calcML() {
    clearErrorSol('ml');
    const solve = document.querySelector('#solModule .sf-btn.active[data-calc="ml"]')?.dataset.solve ?? 'b';

    if (solve === 'b') {
      const n  = parseFloat(document.getElementById('ml-n').value);
      const mG = parseFloat(document.getElementById('ml-m').value); // grams
      if (isNaN(n) || isNaN(mG)) return showErrorSol('ml', 'Please enter moles (n) and mass of solvent (m).');
      if (n < 0)   return showErrorSol('ml', 'Moles cannot be negative.');
      if (mG <= 0) return showErrorSol('ml', 'Mass of solvent must be greater than 0 g.');
      const mKg = mG / 1000;
      const b   = n / mKg;
      showResultSol('ml', 'Molality (b)', fmt(b), 'mol/kg', [
        { title: 'Write the formula', expr: 'b = n ÷ m(kg)', note: 'b = molality (mol/kg), n = moles of solute, m = mass of solvent in kilograms.' },
        { title: 'Convert mass to kilograms', expr: `m = ${mG} g ÷ 1000 = ${fmt(mKg)} kg`, note: 'Molality uses mass of solvent, not volume of solution — it does not change with temperature.' },
        { title: 'Substitute values', expr: `b = ${fmt(n)} mol ÷ ${fmt(mKg)} kg` },
        { title: 'Calculate molality', expr: `b = ${fmt(b)} mol/kg`, note: `The solution is ${fmt(b)} molal.` },
      ]);
    }
    if (solve === 'n') {
      const b  = parseFloat(document.getElementById('ml-b').value);
      const mG = parseFloat(document.getElementById('ml-m').value);
      if (isNaN(b) || isNaN(mG)) return showErrorSol('ml', 'Please enter molality (b) and mass of solvent (m).');
      if (b < 0)   return showErrorSol('ml', 'Molality cannot be negative.');
      if (mG <= 0) return showErrorSol('ml', 'Mass of solvent must be greater than 0 g.');
      const mKg = mG / 1000;
      const n   = b * mKg;
      showResultSol('ml', 'Moles of Solute (n)', fmt(n), 'mol', [
        { title: 'Rearrange formula for moles', expr: 'n = b × m(kg)' },
        { title: 'Convert mass to kilograms', expr: `m = ${mG} g ÷ 1000 = ${fmt(mKg)} kg` },
        { title: 'Substitute values', expr: `n = ${fmt(b)} mol/kg × ${fmt(mKg)} kg` },
        { title: 'Calculate moles', expr: `n = ${fmt(n)} mol`, note: `${fmt(n)} mol of solute in ${mG} g of solvent gives a ${fmt(b)} m solution.` },
      ]);
    }
    if (solve === 'm') {
      const n = parseFloat(document.getElementById('ml-n').value);
      const b = parseFloat(document.getElementById('ml-b').value);
      if (isNaN(n) || isNaN(b)) return showErrorSol('ml', 'Please enter moles (n) and molality (b).');
      if (n < 0)  return showErrorSol('ml', 'Moles cannot be negative.');
      if (b <= 0) return showErrorSol('ml', 'Molality must be greater than 0.');
      const mKg = n / b;
      const mG  = mKg * 1000;
      showResultSol('ml', 'Mass of Solvent (m)', fmt(mG), 'g', [
        { title: 'Rearrange formula for mass', expr: 'm(kg) = n ÷ b', note: 'Divide moles by molality to get mass in kilograms.' },
        { title: 'Substitute values', expr: `m = ${fmt(n)} mol ÷ ${fmt(b)} mol/kg = ${fmt(mKg)} kg` },
        { title: 'Convert to grams', expr: `m = ${fmt(mKg)} kg × 1000 = ${fmt(mG)} g`, note: `Use ${fmt(mG)} g of solvent to prepare a ${fmt(b)} m solution with ${fmt(n)} mol of solute.` },
      ]);
    }
  }

  // ══════════════════════════════════
  // CALCULATOR 3 — Normality  (nr)
  //   N = (n × f) / V(L)
  // ══════════════════════════════════
  function calcNR() {
    clearErrorSol('nr');
    const solve = document.querySelector('#solModule .sf-btn.active[data-calc="nr"]')?.dataset.solve ?? 'N';
    const f = parseFloat(document.getElementById('nr-f').value);
    if (isNaN(f) || f < 1) return showErrorSol('nr', 'Equivalence factor (f) must be ≥ 1 (a positive integer).');

    if (solve === 'N') {
      const n = parseFloat(document.getElementById('nr-n').value);
      const V = parseFloat(document.getElementById('nr-V').value);
      if (isNaN(n) || isNaN(V)) return showErrorSol('nr', 'Please enter moles (n) and volume (V).');
      if (n < 0)  return showErrorSol('nr', 'Moles cannot be negative.');
      if (V <= 0) return showErrorSol('nr', 'Volume must be greater than 0 mL.');
      const Vl  = V / 1000;
      const neq = n * f;
      const N   = neq / Vl;
      showResultSol('nr', 'Normality (N)', fmt(N), 'eq/L', [
        { title: 'Write the formula', expr: 'N = (n × f) ÷ V(L)', note: 'N = normality, n = moles of solute, f = equivalence factor, V = volume in litres.' },
        { title: 'Calculate equivalents of solute', expr: `n_eq = ${fmt(n)} mol × ${f} eq/mol = ${fmt(neq)} eq`, note: `f = ${f} because each formula unit provides ${f} reactive unit(s).` },
        { title: 'Convert volume to litres', expr: `V = ${V} mL ÷ 1000 = ${fmt(Vl)} L` },
        { title: 'Substitute into formula', expr: `N = ${fmt(neq)} eq ÷ ${fmt(Vl)} L` },
        { title: 'Calculate normality', expr: `N = ${fmt(N)} eq/L`, note: `Normality = Molarity × f = ${fmt(neq/Vl/f)} × ${f} = ${fmt(N)} N.` },
      ]);
    }
    if (solve === 'n') {
      const Nval = parseFloat(document.getElementById('nr-N').value);
      const V    = parseFloat(document.getElementById('nr-V').value);
      if (isNaN(Nval) || isNaN(V)) return showErrorSol('nr', 'Please enter normality (N) and volume (V).');
      if (Nval < 0) return showErrorSol('nr', 'Normality cannot be negative.');
      if (V <= 0)   return showErrorSol('nr', 'Volume must be greater than 0 mL.');
      const Vl   = V / 1000;
      const neq  = Nval * Vl;
      const n    = neq / f;
      showResultSol('nr', 'Moles of Solute (n)', fmt(n), 'mol', [
        { title: 'Rearrange formula for moles', expr: 'n = N × V(L) ÷ f' },
        { title: 'Convert volume to litres', expr: `V = ${V} mL ÷ 1000 = ${fmt(Vl)} L` },
        { title: 'Find total equivalents', expr: `n_eq = ${fmt(Nval)} eq/L × ${fmt(Vl)} L = ${fmt(neq)} eq` },
        { title: 'Divide by equivalence factor', expr: `n = ${fmt(neq)} eq ÷ ${f} eq/mol = ${fmt(n)} mol`, note: `You need ${fmt(n)} mol of solute for a ${fmt(Nval)} N solution in ${V} mL.` },
      ]);
    }
    if (solve === 'V') {
      const n    = parseFloat(document.getElementById('nr-n').value);
      const Nval = parseFloat(document.getElementById('nr-N').value);
      if (isNaN(n) || isNaN(Nval)) return showErrorSol('nr', 'Please enter moles (n) and normality (N).');
      if (n < 0)    return showErrorSol('nr', 'Moles cannot be negative.');
      if (Nval <= 0) return showErrorSol('nr', 'Normality must be greater than 0.');
      const neq  = n * f;
      const Vl   = neq / Nval;
      const VmL  = Vl * 1000;
      showResultSol('nr', 'Volume of Solution (V)', fmt(VmL), 'mL', [
        { title: 'Rearrange formula for volume', expr: 'V = (n × f) ÷ N' },
        { title: 'Calculate total equivalents', expr: `n_eq = ${fmt(n)} mol × ${f} eq/mol = ${fmt(neq)} eq` },
        { title: 'Divide by normality', expr: `V = ${fmt(neq)} eq ÷ ${fmt(Nval)} eq/L = ${fmt(Vl)} L` },
        { title: 'Convert to millilitres', expr: `V = ${fmt(VmL)} mL`, note: `Dissolve ${fmt(n)} mol of solute and make up to ${fmt(VmL)} mL to get a ${fmt(Nval)} N solution.` },
      ]);
    }
  }

  // ══════════════════════════════════
  // CALCULATOR 4 — Dilution  (dl)
  //   C₁V₁ = C₂V₂
  // ══════════════════════════════════
  function calcDL() {
    clearErrorSol('dl');
    const solve = document.querySelector('#solModule .sf-btn.active[data-calc="dl"]')?.dataset.solve ?? 'C2';

    const get = id => parseFloat(document.getElementById(id).value);

    if (solve === 'C2') {
      const C1 = get('dl-C1'), V1 = get('dl-V1'), V2 = get('dl-V2');
      if ([C1,V1,V2].some(isNaN)) return showErrorSol('dl', 'Please enter C₁, V₁, and V₂.');
      if (C1 < 0)  return showErrorSol('dl', 'Concentration C₁ cannot be negative.');
      if (V1 <= 0) return showErrorSol('dl', 'Initial volume V₁ must be greater than 0.');
      if (V2 <= 0) return showErrorSol('dl', 'Final volume V₂ must be greater than 0.');
      if (V2 < V1) return showErrorSol('dl', 'Final volume V₂ should be ≥ initial volume V₁ for a dilution.');
      const C2 = (C1 * V1) / V2;
      const df = fmt(V2 / V1);
      showResultSol('dl', 'Final Concentration (C₂)', fmt(C2), 'mol/L', [
        { title: 'Write the dilution equation', expr: 'C₁V₁ = C₂V₂', note: 'Moles of solute are conserved — only the volume (and therefore concentration) changes.' },
        { title: 'Rearrange to solve for C₂', expr: 'C₂ = C₁V₁ ÷ V₂' },
        { title: 'Substitute known values', expr: `C₂ = ${fmt(C1)} mol/L × ${fmt(V1)} mL ÷ ${fmt(V2)} mL` },
        { title: 'Calculate final concentration', expr: `C₂ = ${fmt(C2)} mol/L`, note: `Dilution factor = ${df}× (V₂/V₁). Take ${fmt(V1)} mL of the ${fmt(C1)} M stock and dilute to ${fmt(V2)} mL total.` },
      ]);
    }
    if (solve === 'V2') {
      const C1 = get('dl-C1'), V1 = get('dl-V1'), C2 = get('dl-C2');
      if ([C1,V1,C2].some(isNaN)) return showErrorSol('dl', 'Please enter C₁, V₁, and C₂.');
      if (C1 <= 0) return showErrorSol('dl', 'C₁ must be greater than 0.');
      if (V1 <= 0) return showErrorSol('dl', 'V₁ must be greater than 0.');
      if (C2 <= 0) return showErrorSol('dl', 'C₂ must be greater than 0.');
      if (C2 > C1) return showErrorSol('dl', 'C₂ must be ≤ C₁ — dilution decreases concentration.');
      const V2 = (C1 * V1) / C2;
      const solventAdd = fmt(V2 - V1);
      showResultSol('dl', 'Final Volume (V₂)', fmt(V2), 'mL', [
        { title: 'Write the dilution equation', expr: 'C₁V₁ = C₂V₂', note: 'Total moles of solute remain constant.' },
        { title: 'Rearrange to solve for V₂', expr: 'V₂ = C₁V₁ ÷ C₂' },
        { title: 'Substitute known values', expr: `V₂ = ${fmt(C1)} mol/L × ${fmt(V1)} mL ÷ ${fmt(C2)} mol/L` },
        { title: 'Calculate final volume', expr: `V₂ = ${fmt(V2)} mL`, note: `Add ${solventAdd} mL of solvent to ${fmt(V1)} mL of ${fmt(C1)} M stock to reach a final volume of ${fmt(V2)} mL.` },
      ]);
    }
    if (solve === 'C1') {
      const V1 = get('dl-V1'), C2 = get('dl-C2'), V2 = get('dl-V2');
      if ([V1,C2,V2].some(isNaN)) return showErrorSol('dl', 'Please enter V₁, C₂, and V₂.');
      if (V1 <= 0) return showErrorSol('dl', 'V₁ must be greater than 0.');
      if (C2 < 0)  return showErrorSol('dl', 'C₂ cannot be negative.');
      if (V2 <= 0) return showErrorSol('dl', 'V₂ must be greater than 0.');
      if (V2 < V1) return showErrorSol('dl', 'V₂ should be ≥ V₁ for a standard dilution.');
      const C1 = (C2 * V2) / V1;
      showResultSol('dl', 'Initial Concentration (C₁)', fmt(C1), 'mol/L', [
        { title: 'Write the dilution equation', expr: 'C₁V₁ = C₂V₂' },
        { title: 'Rearrange for C₁', expr: 'C₁ = C₂V₂ ÷ V₁' },
        { title: 'Substitute values', expr: `C₁ = ${fmt(C2)} mol/L × ${fmt(V2)} mL ÷ ${fmt(V1)} mL` },
        { title: 'Calculate stock concentration', expr: `C₁ = ${fmt(C1)} mol/L`, note: `The original stock solution must have a concentration of ${fmt(C1)} M.` },
      ]);
    }
    if (solve === 'V1') {
      const C1 = get('dl-C1'), C2 = get('dl-C2'), V2 = get('dl-V2');
      if ([C1,C2,V2].some(isNaN)) return showErrorSol('dl', 'Please enter C₁, C₂, and V₂.');
      if (C1 <= 0) return showErrorSol('dl', 'C₁ must be greater than 0.');
      if (C2 < 0)  return showErrorSol('dl', 'C₂ cannot be negative.');
      if (V2 <= 0) return showErrorSol('dl', 'V₂ must be greater than 0.');
      if (C2 > C1) return showErrorSol('dl', 'C₂ must be ≤ C₁ for a dilution.');
      const V1 = (C2 * V2) / C1;
      showResultSol('dl', 'Volume of Stock to Take (V₁)', fmt(V1), 'mL', [
        { title: 'Write the dilution equation', expr: 'C₁V₁ = C₂V₂' },
        { title: 'Rearrange for V₁', expr: 'V₁ = C₂V₂ ÷ C₁' },
        { title: 'Substitute values', expr: `V₁ = ${fmt(C2)} mol/L × ${fmt(V2)} mL ÷ ${fmt(C1)} mol/L` },
        { title: 'Calculate aliquot volume', expr: `V₁ = ${fmt(V1)} mL`, note: `Pipette ${fmt(V1)} mL from the ${fmt(C1)} M stock and dilute to a final volume of ${fmt(V2)} mL.` },
      ]);
    }
  }

  // ══════════════════════════════════
  // CALCULATOR 5 — Raoult's Law  (rl)
  //   Pₛ = χₛ × P°
  // ══════════════════════════════════
  function calcRL() {
    clearErrorSol('rl');
    const solve = document.querySelector('#solModule .sf-btn.active[data-calc="rl"]')?.dataset.solve ?? 'Ps';
    const get = id => parseFloat(document.getElementById(id).value);

    if (solve === 'Ps') {
      const Xs = get('rl-Xs'), P0 = get('rl-P0');
      if ([Xs,P0].some(isNaN)) return showErrorSol('rl', 'Please enter χₛ and P°.');
      if (Xs < 0 || Xs > 1) return showErrorSol('rl', 'Mole fraction χₛ must be between 0 and 1.');
      if (P0 <= 0) return showErrorSol('rl', 'P° must be greater than 0.');
      const Ps = Xs * P0;
      showResultSol('rl', 'Vapour Pressure of Solution (Pₛ)', fmt(Ps), 'mmHg', [
        { title: "Write Raoult's Law", expr: 'Pₛ = χₛ × P°', note: 'Valid for ideal solutions with a non-volatile solute.' },
        { title: 'Substitute known values', expr: `Pₛ = ${fmt(Xs)} × ${fmt(P0)} mmHg` },
        { title: 'Calculate result', expr: `Pₛ = ${fmt(Ps)} mmHg`, note: `Vapour pressure lowering = ${fmt(P0 - Ps)} mmHg.` },
      ]);
    }
    if (solve === 'Xs') {
      const Ps = get('rl-Ps'), P0 = get('rl-P0');
      if ([Ps,P0].some(isNaN)) return showErrorSol('rl', 'Please enter Pₛ and P°.');
      if (Ps < 0) return showErrorSol('rl', 'Pₛ cannot be negative.');
      if (P0 <= 0) return showErrorSol('rl', 'P° must be greater than 0.');
      if (Ps > P0) return showErrorSol('rl', 'Pₛ cannot exceed P° for a non-volatile solute.');
      const Xs = Ps / P0;
      showResultSol('rl', 'Mole Fraction of Solvent (χₛ)', fmt(Xs), '(unitless)', [
        { title: "Write Raoult's Law", expr: 'Pₛ = χₛ × P°' },
        { title: 'Rearrange for χₛ', expr: 'χₛ = Pₛ ÷ P°' },
        { title: 'Substitute known values', expr: `χₛ = ${fmt(Ps)} mmHg ÷ ${fmt(P0)} mmHg` },
        { title: 'Calculate result', expr: `χₛ = ${fmt(Xs)}`, note: `Mole fraction of solute χ_solute = 1 − χₛ = ${fmt(1 - Xs)}.` },
      ]);
    }
    if (solve === 'P0') {
      const Ps = get('rl-Ps'), Xs = get('rl-Xs');
      if ([Ps,Xs].some(isNaN)) return showErrorSol('rl', 'Please enter Pₛ and χₛ.');
      if (Ps < 0) return showErrorSol('rl', 'Pₛ cannot be negative.');
      if (Xs <= 0 || Xs > 1) return showErrorSol('rl', 'Mole fraction χₛ must be greater than 0 and at most 1.');
      const P0 = Ps / Xs;
      showResultSol('rl', 'Vapour Pressure of Pure Solvent (P°)', fmt(P0), 'mmHg', [
        { title: "Write Raoult's Law", expr: 'Pₛ = χₛ × P°' },
        { title: 'Rearrange for P°', expr: 'P° = Pₛ ÷ χₛ' },
        { title: 'Substitute known values', expr: `P° = ${fmt(Ps)} mmHg ÷ ${fmt(Xs)}` },
        { title: 'Calculate result', expr: `P° = ${fmt(P0)} mmHg` },
      ]);
    }
  }

  // ── Gas sub-tab switching ──
  function activateGasTab(panelId) {
    if (activeCategory !== 'gas') syncActiveNav('gas');
    document.querySelectorAll('#gasModule .mol-tab').forEach(t =>
      t.classList.toggle('active', t.dataset.gasPanel === panelId));
    document.querySelectorAll('#gasModule .mol-panel').forEach(p =>
      p.classList.toggle('active', p.id === 'panel-' + panelId));
    setBreadcrumbSub(GAS_TAB_LABELS[panelId] || '');
  }

  document.querySelectorAll('#gasModule .mol-tab').forEach(tab => {
    tab.addEventListener('click', () => activateGasTab(tab.dataset.gasPanel));
  });

