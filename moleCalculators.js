/* ═══════════════════════════════════════════════════════════
   FORMULA HUB — moleCalculators.js
   MOLE CONCEPT CALCULATORS
   Mole Calculator, Mass–Mole Converter, and Particle Calculator.
═══════════════════════════════════════════════════════════ */

  // ════════════════════════════════
  // CALCULATOR 1 — Mole Calculator
  // ════════════════════════════════
  function calcMC() {
    clearError('mc');
    const activeSolve = document.querySelector('.sf-btn.active[data-calc="mc"]')?.dataset.solve ?? 'n';
    const mVal = parseFloat(document.getElementById('mc-m').value);
    const MVal = parseFloat(document.getElementById('mc-M').value);
    const nVal = parseFloat(document.getElementById('mc-n').value);

    if (activeSolve === 'n') {
      if (isNaN(mVal) || isNaN(MVal)) return showError('mc', 'Please enter values for mass (m) and molar mass (M).');
      if (MVal <= 0) return showError('mc', 'Molar mass must be greater than 0.');
      const n = mVal / MVal;
      showResult('mc', 'Amount of Substance (n)', fmt(n), 'mol', [
        { title: 'Write the formula', expr: 'n = m ÷ M', note: 'n = moles, m = mass in grams, M = molar mass in g/mol' },
        { title: 'Substitute known values', expr: `n = ${mVal} g ÷ ${MVal} g/mol`, note: `Using the values you entered.` },
        { title: 'Divide mass by molar mass', expr: `n = ${fmt(n)} mol`, note: `Result rounded to 5 significant figures.` },
      ]);
    }
    if (activeSolve === 'm') {
      if (isNaN(nVal) || isNaN(MVal)) return showError('mc', 'Please enter values for moles (n) and molar mass (M).');
      if (MVal <= 0) return showError('mc', 'Molar mass must be greater than 0.');
      const m = nVal * MVal;
      showResult('mc', 'Mass (m)', fmt(m), 'g', [
        { title: 'Rearrange the formula for mass', expr: 'm = n × M', note: 'Multiply moles by molar mass.' },
        { title: 'Substitute known values', expr: `m = ${nVal} mol × ${MVal} g/mol` },
        { title: 'Multiply to find mass', expr: `m = ${fmt(m)} g`, note: 'Result in grams.' },
      ]);
    }
    if (activeSolve === 'M') {
      if (isNaN(mVal) || isNaN(nVal)) return showError('mc', 'Please enter values for mass (m) and moles (n).');
      if (nVal <= 0) return showError('mc', 'Moles must be greater than 0.');
      const M = mVal / nVal;
      showResult('mc', 'Molar Mass (M)', fmt(M), 'g/mol', [
        { title: 'Rearrange the formula for molar mass', expr: 'M = m ÷ n', note: 'Divide mass by amount in moles.' },
        { title: 'Substitute known values', expr: `M = ${mVal} g ÷ ${nVal} mol` },
        { title: 'Divide to find molar mass', expr: `M = ${fmt(M)} g/mol`, note: 'Compare to periodic table values to identify the substance.' },
      ]);
    }
  }

  // ═════════════════════════════════
  // CALCULATOR 2 — Mass–Mole Converter
  // ═════════════════════════════════
  function calcMM() {
    clearError('mm');
    const dir = document.querySelector('.sf-btn.active[data-calc="mm"]')?.dataset.solve ?? 'mass';
    const MVal = parseFloat(document.getElementById('mm-M').value);
    if (isNaN(MVal) || MVal <= 0) return showError('mm', 'Please enter a valid molar mass (M > 0).');

    if (dir === 'mass') {
      const n = parseFloat(document.getElementById('mm-n').value);
      if (isNaN(n)) return showError('mm', 'Please enter the number of moles (n).');
      const m = n * MVal;
      showResult('mm', 'Mass (m)', fmt(m), 'g', [
        { title: 'Identify the formula', expr: 'm = n × M', note: 'To convert moles to grams, multiply by molar mass.' },
        { title: 'Substitute values', expr: `m = ${n} mol × ${MVal} g/mol` },
        { title: 'Calculate', expr: `m = ${fmt(m)} g`, note: `${fmt(n)} mole(s) of the substance has a mass of ${fmt(m)} g.` },
      ]);
    } else {
      const m = parseFloat(document.getElementById('mm-m').value);
      if (isNaN(m)) return showError('mm', 'Please enter the mass (m).');
      if (m < 0) return showError('mm', 'Mass cannot be negative.');
      const n = m / MVal;
      showResult('mm', 'Moles (n)', fmt(n), 'mol', [
        { title: 'Rearrange formula for moles', expr: 'n = m ÷ M', note: 'Divide mass by molar mass to get moles.' },
        { title: 'Substitute values', expr: `n = ${m} g ÷ ${MVal} g/mol` },
        { title: 'Calculate', expr: `n = ${fmt(n)} mol`, note: `${fmt(m)} g of the substance contains ${fmt(n)} mol.` },
      ]);
    }
  }

  // ════════════════════════════════
  // CALCULATOR 3 — Particle Calculator
  // ════════════════════════════════
  function calcPC() {
    clearError('pc');
    const solve  = document.querySelector('.sf-btn.active[data-calc="pc"]')?.dataset.solve ?? 'N';
    const ptype  = document.getElementById('pc-ptype').value;
    const NA_fmt = '6.022 × 10²³';

    if (solve === 'N') {
      const n = parseFloat(document.getElementById('pc-n').value);
      if (isNaN(n)) return showError('pc', 'Please enter the number of moles (n).');
      if (n < 0)    return showError('pc', 'Moles cannot be negative.');
      const N = n * NA;
      showResult('pc', `Number of ${ptype} (N)`, fmt(N), ptype, [
        { title: 'Write the formula', expr: 'N = n × Nₐ', note: `Nₐ = ${NA_fmt} mol⁻¹ (Avogadro's number)` },
        { title: 'Substitute known values', expr: `N = ${n} mol × ${NA_fmt} mol⁻¹` },
        { title: 'Multiply', expr: `N = ${fmt(N)} ${ptype}`, note: `Every 1 mole contains exactly ${NA_fmt} particles by definition.` },
      ]);
    } else {
      const N = parseFloat(document.getElementById('pc-N').value);
      if (isNaN(N)) return showError('pc', 'Please enter the number of particles (N).');
      if (N < 0)    return showError('pc', 'Particle count cannot be negative.');
      const n = N / NA;
      showResult('pc', 'Moles (n)', fmt(n), 'mol', [
        { title: 'Rearrange formula for moles', expr: 'n = N ÷ Nₐ', note: `Divide particle count by ${NA_fmt} mol⁻¹` },
        { title: 'Substitute known values', expr: `n = ${fmt(N)} ÷ ${NA_fmt}` },
        { title: 'Calculate', expr: `n = ${fmt(n)} mol`, note: `${fmt(N)} ${ptype} corresponds to ${fmt(n)} mol of substance.` },
      ]);
    }
  }

  // ── Reset helpers (Mole module) ──
  function resetCalc(calc) {
    const panels = { mc: 'panel-mole-calc', mm: 'panel-mass-mole', pc: 'panel-particle-calc' };
    const panel = document.getElementById(panels[calc]);
    if (panel) panel.querySelectorAll('input[type="number"]').forEach(i => { i.value = ''; });
    hideResults(calc);
    clearError(calc);
    const firstSF = document.querySelector(`.sf-btn[data-calc="${calc}"]`);
    if (firstSF) { firstSF.click(); }
  }

