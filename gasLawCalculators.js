/* ═══════════════════════════════════════════════════════════
   FORMULA HUB — gasLawCalculators.js
   GAS LAW CALCULATORS
   Boyle's, Charles', Gay-Lussac's, Combined, Ideal, and Graham's Law calculators.
═══════════════════════════════════════════════════════════ */

  /* ══════════════════════════════════════════════════
     CALCULATOR 1 — Boyle's Law   P₁V₁ = P₂V₂
  ══════════════════════════════════════════════════ */
  function calcBL() {
    clearErrorGas('bl');
    const solve = document.querySelector('#gasModule .sf-btn.active[data-calc="bl"]')?.dataset.solve ?? 'P2';
    const inputs = { P1: gv('bl-P1'), V1: gv('bl-V1'), P2: gv('bl-P2'), V2: gv('bl-V2') };
    const needed = { P2:['P1','V1','V2'], V2:['P1','V1','P2'], P1:['P2','V2','V1'], V1:['P2','V2','P1'] };
    for (const v of needed[solve]) {
      if (isNaN(inputs[v]) || inputs[v] <= 0)
        return showErrorGas('bl', `${v} must be a positive number.`);
    }
    const { P1, V1, P2, V2 } = inputs;
    const results = {
      P2: () => {
        const r = (P1 * V1) / V2;
        showResultGas('bl', 'Final Pressure (P₂)', fmt(r), 'same unit as P₁', [
          { title: 'Write Boyle\'s Law', expr: 'P₁V₁ = P₂V₂', note: 'At constant temperature, pressure and volume are inversely proportional.' },
          { title: 'Rearrange for P₂', expr: 'P₂ = P₁V₁ ÷ V₂' },
          { title: 'Substitute known values', expr: `P₂ = (${fmt(P1)} × ${fmt(V1)}) ÷ ${fmt(V2)}` },
          { title: 'Calculate result', expr: `P₂ = ${fmt(P1 * V1)} ÷ ${fmt(V2)} = ${fmt(r)}`, note: `As volume ${V2 > V1 ? 'increased' : 'decreased'}, pressure ${V2 > V1 ? 'decreased' : 'increased'} — inverse relationship confirmed.` },
        ]);
      },
      V2: () => {
        const r = (P1 * V1) / P2;
        showResultGas('bl', 'Final Volume (V₂)', fmt(r), 'same unit as V₁', [
          { title: 'Write Boyle\'s Law', expr: 'P₁V₁ = P₂V₂', note: 'Volume and pressure are inversely proportional at constant T.' },
          { title: 'Rearrange for V₂', expr: 'V₂ = P₁V₁ ÷ P₂' },
          { title: 'Substitute known values', expr: `V₂ = (${fmt(P1)} × ${fmt(V1)}) ÷ ${fmt(P2)}` },
          { title: 'Calculate result', expr: `V₂ = ${fmt(P1 * V1)} ÷ ${fmt(P2)} = ${fmt(r)}`, note: `The gas ${r > V1 ? 'expanded' : 'compressed'} from ${fmt(V1)} to ${fmt(r)}.` },
        ]);
      },
      P1: () => {
        const r = (P2 * V2) / V1;
        showResultGas('bl', 'Initial Pressure (P₁)', fmt(r), 'same unit as P₂', [
          { title: 'Write Boyle\'s Law', expr: 'P₁V₁ = P₂V₂' },
          { title: 'Rearrange for P₁', expr: 'P₁ = P₂V₂ ÷ V₁' },
          { title: 'Substitute values', expr: `P₁ = (${fmt(P2)} × ${fmt(V2)}) ÷ ${fmt(V1)}` },
          { title: 'Calculate result', expr: `P₁ = ${fmt(r)}` },
        ]);
      },
      V1: () => {
        const r = (P2 * V2) / P1;
        showResultGas('bl', 'Initial Volume (V₁)', fmt(r), 'same unit as V₂', [
          { title: 'Write Boyle\'s Law', expr: 'P₁V₁ = P₂V₂' },
          { title: 'Rearrange for V₁', expr: 'V₁ = P₂V₂ ÷ P₁' },
          { title: 'Substitute values', expr: `V₁ = (${fmt(P2)} × ${fmt(V2)}) ÷ ${fmt(P1)}` },
          { title: 'Calculate result', expr: `V₁ = ${fmt(r)}` },
        ]);
      },
    };
    results[solve]();
  }

  /* ══════════════════════════════════════════════════
     CALCULATOR 2 — Charles' Law   V₁/T₁ = V₂/T₂
  ══════════════════════════════════════════════════ */
  function calcCL() {
    clearErrorGas('cl');
    const solve = document.querySelector('#gasModule .sf-btn.active[data-calc="cl"]')?.dataset.solve ?? 'V2';
    const inputs = { V1: gv('cl-V1'), T1: gv('cl-T1'), V2: gv('cl-V2'), T2: gv('cl-T2') };
    const needed = { V2:['V1','T1','T2'], T2:['V1','T1','V2'], V1:['V2','T1','T2'], T1:['V1','T2','V2'] };
    for (const v of needed[solve]) {
      if (isNaN(inputs[v]) || inputs[v] <= 0)
        return showErrorGas('cl', `${v} must be a positive number. Temperature must be in Kelvin (K > 0).`);
    }
    const { V1, T1, V2, T2 } = inputs;
    const results = {
      V2: () => {
        const r = (V1 * T2) / T1;
        const dT = T2 - T1;
        showResultGas('cl', 'Final Volume (V₂)', fmt(r), 'same unit as V₁', [
          { title: 'Write Charles\' Law', expr: 'V₁/T₁ = V₂/T₂', note: 'At constant pressure, volume is directly proportional to absolute temperature.' },
          { title: 'Rearrange for V₂', expr: 'V₂ = V₁ × T₂ ÷ T₁' },
          { title: 'Substitute values', expr: `V₂ = ${fmt(V1)} × ${fmt(T2)} ÷ ${fmt(T1)}` },
          { title: 'Calculate result', expr: `V₂ = ${fmt(r)}`, note: `Temperature ${dT > 0 ? 'rose' : 'dropped'} by ${fmt(Math.abs(dT))} K → volume ${r > V1 ? 'increased' : 'decreased'} from ${fmt(V1)} to ${fmt(r)}.` },
        ]);
      },
      T2: () => {
        const r = (T1 * V2) / V1;
        showResultGas('cl', 'Final Temperature (T₂)', fmt(r), 'K', [
          { title: 'Write Charles\' Law', expr: 'V₁/T₁ = V₂/T₂' },
          { title: 'Rearrange for T₂', expr: 'T₂ = T₁ × V₂ ÷ V₁' },
          { title: 'Substitute values', expr: `T₂ = ${fmt(T1)} × ${fmt(V2)} ÷ ${fmt(V1)}` },
          { title: 'Calculate result', expr: `T₂ = ${fmt(r)} K  (${fmt(r - 273.15)} °C)`, note: `To convert: °C = K − 273.15` },
        ]);
      },
      V1: () => {
        const r = (V2 * T1) / T2;
        showResultGas('cl', 'Initial Volume (V₁)', fmt(r), 'same unit as V₂', [
          { title: 'Write Charles\' Law', expr: 'V₁/T₁ = V₂/T₂' },
          { title: 'Rearrange for V₁', expr: 'V₁ = V₂ × T₁ ÷ T₂' },
          { title: 'Substitute values', expr: `V₁ = ${fmt(V2)} × ${fmt(T1)} ÷ ${fmt(T2)}` },
          { title: 'Calculate result', expr: `V₁ = ${fmt(r)}` },
        ]);
      },
      T1: () => {
        const r = (T2 * V1) / V2;
        showResultGas('cl', 'Initial Temperature (T₁)', fmt(r), 'K', [
          { title: 'Write Charles\' Law', expr: 'V₁/T₁ = V₂/T₂' },
          { title: 'Rearrange for T₁', expr: 'T₁ = T₂ × V₁ ÷ V₂' },
          { title: 'Substitute values', expr: `T₁ = ${fmt(T2)} × ${fmt(V1)} ÷ ${fmt(V2)}` },
          { title: 'Calculate result', expr: `T₁ = ${fmt(r)} K  (${fmt(r - 273.15)} °C)` },
        ]);
      },
    };
    results[solve]();
  }

  /* ══════════════════════════════════════════════════
     CALCULATOR 3 — Gay-Lussac's Law   P₁/T₁ = P₂/T₂
  ══════════════════════════════════════════════════ */
  function calcGL() {
    clearErrorGas('gl');
    const solve = document.querySelector('#gasModule .sf-btn.active[data-calc="gl"]')?.dataset.solve ?? 'P2';
    const inputs = { P1: gv('gl-P1'), T1: gv('gl-T1'), P2: gv('gl-P2'), T2: gv('gl-T2') };
    const needed = { P2:['P1','T1','T2'], T2:['P1','T1','P2'], P1:['P2','T1','T2'], T1:['P1','T2','P2'] };
    for (const v of needed[solve]) {
      if (isNaN(inputs[v]) || inputs[v] <= 0)
        return showErrorGas('gl', `${v} must be a positive number. Temperature must be in Kelvin.`);
    }
    const { P1, T1, P2, T2 } = inputs;
    const results = {
      P2: () => {
        const r = (P1 * T2) / T1;
        showResultGas('gl', 'Final Pressure (P₂)', fmt(r), 'same unit as P₁', [
          { title: 'Write Gay-Lussac\'s Law', expr: 'P₁/T₁ = P₂/T₂', note: 'At constant volume, pressure is directly proportional to absolute temperature.' },
          { title: 'Rearrange for P₂', expr: 'P₂ = P₁ × T₂ ÷ T₁' },
          { title: 'Substitute values', expr: `P₂ = ${fmt(P1)} × ${fmt(T2)} ÷ ${fmt(T1)}` },
          { title: 'Calculate result', expr: `P₂ = ${fmt(r)}`, note: `Temperature ${T2 > T1 ? 'increased' : 'decreased'} → pressure ${r > P1 ? 'increased' : 'decreased'}: direct proportionality confirmed.` },
        ]);
      },
      T2: () => {
        const r = (T1 * P2) / P1;
        showResultGas('gl', 'Final Temperature (T₂)', fmt(r), 'K', [
          { title: 'Write Gay-Lussac\'s Law', expr: 'P₁/T₁ = P₂/T₂' },
          { title: 'Rearrange for T₂', expr: 'T₂ = T₁ × P₂ ÷ P₁' },
          { title: 'Substitute values', expr: `T₂ = ${fmt(T1)} × ${fmt(P2)} ÷ ${fmt(P1)}` },
          { title: 'Calculate result', expr: `T₂ = ${fmt(r)} K  (${fmt(r - 273.15)} °C)` },
        ]);
      },
      P1: () => {
        const r = (P2 * T1) / T2;
        showResultGas('gl', 'Initial Pressure (P₁)', fmt(r), 'same unit as P₂', [
          { title: 'Write Gay-Lussac\'s Law', expr: 'P₁/T₁ = P₂/T₂' },
          { title: 'Rearrange for P₁', expr: 'P₁ = P₂ × T₁ ÷ T₂' },
          { title: 'Substitute values', expr: `P₁ = ${fmt(P2)} × ${fmt(T1)} ÷ ${fmt(T2)}` },
          { title: 'Calculate result', expr: `P₁ = ${fmt(r)}` },
        ]);
      },
      T1: () => {
        const r = (T2 * P1) / P2;
        showResultGas('gl', 'Initial Temperature (T₁)', fmt(r), 'K', [
          { title: 'Write Gay-Lussac\'s Law', expr: 'P₁/T₁ = P₂/T₂' },
          { title: 'Rearrange for T₁', expr: 'T₁ = T₂ × P₁ ÷ P₂' },
          { title: 'Substitute values', expr: `T₁ = ${fmt(T2)} × ${fmt(P1)} ÷ ${fmt(P2)}` },
          { title: 'Calculate result', expr: `T₁ = ${fmt(r)} K  (${fmt(r - 273.15)} °C)` },
        ]);
      },
    };
    results[solve]();
  }

  /* ══════════════════════════════════════════════════
     CALCULATOR 4 — Combined Gas Law   P₁V₁/T₁ = P₂V₂/T₂
  ══════════════════════════════════════════════════ */
  function calcCG() {
    clearErrorGas('cg');
    const solve = document.querySelector('#gasModule .sf-btn.active[data-calc="cg"]')?.dataset.solve ?? 'P2';
    const inputs = {
      P1: gv('cg-P1'), V1: gv('cg-V1'), T1: gv('cg-T1'),
      P2: gv('cg-P2'), V2: gv('cg-V2'), T2: gv('cg-T2'),
    };
    const needed = {
      P2:['P1','V1','T1','V2','T2'], V2:['P1','V1','T1','P2','T2'], T2:['P1','V1','T1','P2','V2'],
      P1:['P2','V2','T2','V1','T1'], V1:['P2','V2','T2','P1','T1'], T1:['P2','V2','T2','P1','V1'],
    };
    const TvarsNeeded = new Set(['T1','T2']);
    for (const v of needed[solve]) {
      if (isNaN(inputs[v]) || inputs[v] <= 0) {
        const hint = TvarsNeeded.has(v) ? ' Temperature must be in Kelvin (K > 0).' : '';
        return showErrorGas('cg', `${v} must be a positive number.${hint}`);
      }
    }
    const { P1, V1, T1, P2, V2, T2 } = inputs;
    const lhs = (P1 * V1) / T1;
    const results = {
      P2: () => {
        const r = (lhs * T2) / V2;
        showResultGas('cg', 'Final Pressure (P₂)', fmt(r), 'same unit as P₁', [
          { title: 'Write the Combined Gas Law', expr: 'P₁V₁/T₁ = P₂V₂/T₂', note: 'Unifies Boyle\'s, Charles\', and Gay-Lussac\'s laws. Amount of gas is constant.' },
          { title: 'Rearrange for P₂', expr: 'P₂ = P₁V₁T₂ ÷ (T₁V₂)' },
          { title: 'Calculate left-hand side', expr: `P₁V₁/T₁ = (${fmt(P1)} × ${fmt(V1)}) ÷ ${fmt(T1)} = ${fmt(lhs)}` },
          { title: 'Solve for P₂', expr: `P₂ = ${fmt(lhs)} × ${fmt(T2)} ÷ ${fmt(V2)} = ${fmt(r)}` },
        ]);
      },
      V2: () => {
        const r = (lhs * T2) / P2;
        showResultGas('cg', 'Final Volume (V₂)', fmt(r), 'same unit as V₁', [
          { title: 'Write the Combined Gas Law', expr: 'P₁V₁/T₁ = P₂V₂/T₂' },
          { title: 'Rearrange for V₂', expr: 'V₂ = P₁V₁T₂ ÷ (T₁P₂)' },
          { title: 'Calculate left-hand side', expr: `P₁V₁/T₁ = ${fmt(lhs)}` },
          { title: 'Solve for V₂', expr: `V₂ = ${fmt(lhs)} × ${fmt(T2)} ÷ ${fmt(P2)} = ${fmt(r)}` },
        ]);
      },
      T2: () => {
        const r = (P2 * V2) / lhs;
        showResultGas('cg', 'Final Temperature (T₂)', fmt(r), 'K', [
          { title: 'Write the Combined Gas Law', expr: 'P₁V₁/T₁ = P₂V₂/T₂' },
          { title: 'Rearrange for T₂', expr: 'T₂ = P₂V₂T₁ ÷ (P₁V₁)' },
          { title: 'Calculate left-hand side', expr: `P₁V₁/T₁ = ${fmt(lhs)}` },
          { title: 'Solve for T₂', expr: `T₂ = (${fmt(P2)} × ${fmt(V2)}) ÷ ${fmt(lhs)} = ${fmt(r)} K  (${fmt(r - 273.15)} °C)` },
        ]);
      },
      P1: () => {
        const rhs = (P2 * V2) / T2;
        const r   = (rhs * T1) / V1;
        showResultGas('cg', 'Initial Pressure (P₁)', fmt(r), 'same unit as P₂', [
          { title: 'Write the Combined Gas Law', expr: 'P₁V₁/T₁ = P₂V₂/T₂' },
          { title: 'Rearrange for P₁', expr: 'P₁ = P₂V₂T₁ ÷ (T₂V₁)' },
          { title: 'Calculate right-hand side', expr: `P₂V₂/T₂ = (${fmt(P2)} × ${fmt(V2)}) ÷ ${fmt(T2)} = ${fmt(rhs)}` },
          { title: 'Solve for P₁', expr: `P₁ = ${fmt(rhs)} × ${fmt(T1)} ÷ ${fmt(V1)} = ${fmt(r)}` },
        ]);
      },
      V1: () => {
        const rhs = (P2 * V2) / T2;
        const r   = (rhs * T1) / P1;
        showResultGas('cg', 'Initial Volume (V₁)', fmt(r), 'same unit as V₂', [
          { title: 'Write the Combined Gas Law', expr: 'P₁V₁/T₁ = P₂V₂/T₂' },
          { title: 'Rearrange for V₁', expr: 'V₁ = P₂V₂T₁ ÷ (T₂P₁)' },
          { title: 'Calculate right-hand side', expr: `P₂V₂/T₂ = ${fmt(rhs)}` },
          { title: 'Solve for V₁', expr: `V₁ = ${fmt(rhs)} × ${fmt(T1)} ÷ ${fmt(P1)} = ${fmt(r)}` },
        ]);
      },
      T1: () => {
        const rhs = (P2 * V2) / T2;
        const r   = (P1 * V1) / rhs;
        showResultGas('cg', 'Initial Temperature (T₁)', fmt(r), 'K', [
          { title: 'Write the Combined Gas Law', expr: 'P₁V₁/T₁ = P₂V₂/T₂' },
          { title: 'Rearrange for T₁', expr: 'T₁ = P₁V₁T₂ ÷ (P₂V₂)' },
          { title: 'Calculate right-hand side', expr: `P₂V₂/T₂ = ${fmt(rhs)}` },
          { title: 'Solve for T₁', expr: `T₁ = (${fmt(P1)} × ${fmt(V1)}) ÷ ${fmt(rhs)} = ${fmt(r)} K  (${fmt(r - 273.15)} °C)` },
        ]);
      },
    };
    results[solve]();
  }

  /* ══════════════════════════════════════════════════
     CALCULATOR 5 — Ideal Gas Law   PV = nRT
  ══════════════════════════════════════════════════ */
  function calcIG() {
    clearErrorGas('ig');
    const solve = document.querySelector('#gasModule .sf-btn.active[data-calc="ig"]')?.dataset.solve ?? 'P';
    const R     = parseFloat(document.getElementById('ig-R-sel').value);
    const Rstr  = document.getElementById('ig-R-sel').options[document.getElementById('ig-R-sel').selectedIndex].text.split(' — ')[0];
    const pUnit = document.getElementById('ig-P-unit').textContent;

    const inputs = { P: gv('ig-P'), V: gv('ig-V'), n: gv('ig-n'), T: gv('ig-T') };
    const needed = { P:['V','n','T'], V:['P','n','T'], n:['P','V','T'], T:['P','V','n'] };

    for (const v of needed[solve]) {
      if (isNaN(inputs[v]) || inputs[v] <= 0) {
        const hint = v === 'T' ? ' Temperature must be in Kelvin (K > 0).' : '';
        return showErrorGas('ig', `${v} must be a positive number.${hint}`);
      }
    }
    const { P, V, n, T } = inputs;

    const results = {
      P: () => {
        const r = (n * R * T) / V;
        showResultGas('ig', 'Pressure (P)', fmt(r), pUnit, [
          { title: 'Write the Ideal Gas Law', expr: 'PV = nRT', note: `Using R = ${Rstr}.` },
          { title: 'Rearrange for P', expr: 'P = nRT ÷ V' },
          { title: 'Substitute values', expr: `P = ${fmt(n)} mol × ${R} × ${fmt(T)} K ÷ ${fmt(V)} L` },
          { title: 'Calculate nRT', expr: `nRT = ${fmt(n * R * T)} ${pUnit}·L` },
          { title: 'Divide by V', expr: `P = ${fmt(n * R * T)} ÷ ${fmt(V)} = ${fmt(r)} ${pUnit}` },
        ]);
      },
      V: () => {
        const r = (n * R * T) / P;
        showResultGas('ig', 'Volume (V)', fmt(r), 'L', [
          { title: 'Write the Ideal Gas Law', expr: 'PV = nRT', note: `Using R = ${Rstr}.` },
          { title: 'Rearrange for V', expr: 'V = nRT ÷ P' },
          { title: 'Substitute values', expr: `V = ${fmt(n)} mol × ${R} × ${fmt(T)} K ÷ ${fmt(P)} ${pUnit}` },
          { title: 'Calculate nRT', expr: `nRT = ${fmt(n * R * T)} ${pUnit}·L` },
          { title: 'Divide by P', expr: `V = ${fmt(n * R * T)} ÷ ${fmt(P)} = ${fmt(r)} L` },
        ]);
      },
      n: () => {
        const r = (P * V) / (R * T);
        showResultGas('ig', 'Moles of Gas (n)', fmt(r), 'mol', [
          { title: 'Write the Ideal Gas Law', expr: 'PV = nRT', note: `Using R = ${Rstr}.` },
          { title: 'Rearrange for n', expr: 'n = PV ÷ (RT)' },
          { title: 'Substitute values', expr: `n = (${fmt(P)} ${pUnit} × ${fmt(V)} L) ÷ (${R} × ${fmt(T)} K)` },
          { title: 'Calculate PV', expr: `PV = ${fmt(P * V)} ${pUnit}·L` },
          { title: 'Calculate RT', expr: `RT = ${fmt(R * T)} ${pUnit}·L/mol` },
          { title: 'Divide PV by RT', expr: `n = ${fmt(P * V)} ÷ ${fmt(R * T)} = ${fmt(r)} mol`, note: `${fmt(r)} mol of gas at ${fmt(T)} K and ${fmt(P)} ${pUnit} in ${fmt(V)} L.` },
        ]);
      },
      T: () => {
        const r = (P * V) / (n * R);
        showResultGas('ig', 'Temperature (T)', fmt(r), 'K', [
          { title: 'Write the Ideal Gas Law', expr: 'PV = nRT', note: `Using R = ${Rstr}.` },
          { title: 'Rearrange for T', expr: 'T = PV ÷ (nR)' },
          { title: 'Substitute values', expr: `T = (${fmt(P)} ${pUnit} × ${fmt(V)} L) ÷ (${fmt(n)} mol × ${R})` },
          { title: 'Calculate PV', expr: `PV = ${fmt(P * V)} ${pUnit}·L` },
          { title: 'Calculate nR', expr: `nR = ${fmt(n * R)} ${pUnit}·L/K` },
          { title: 'Divide PV by nR', expr: `T = ${fmt(P * V)} ÷ ${fmt(n * R)} = ${fmt(r)} K  (${fmt(r - 273.15)} °C)` },
        ]);
      },
    };
    results[solve]();
  }

  /* ══════════════════════════════════════════════════
     CALCULATOR 6 — Graham's Law   r₁/r₂ = √(M₂/M₁)
  ══════════════════════════════════════════════════ */
  function calcGR() {
    clearErrorGas('gr');
    const solve = document.querySelector('#gasModule .sf-btn.active[data-calc="gr"]')?.dataset.solve ?? 'r1';
    const inputs = { r1: gv('gr-r1'), r2: gv('gr-r2'), M1: gv('gr-M1'), M2: gv('gr-M2') };
    const needed = { r1:['r2','M1','M2'], r2:['r1','M1','M2'], M1:['r1','r2','M2'], M2:['r1','r2','M1'] };
    for (const v of needed[solve]) {
      if (isNaN(inputs[v]) || inputs[v] <= 0)
        return showErrorGas('gr', `${v} must be a positive number.`);
    }
    const { r1, r2, M1, M2 } = inputs;
    const results = {
      r1: () => {
        const ratio = Math.sqrt(M2 / M1);
        const r = r2 * ratio;
        showResultGas('gr', 'Rate of Gas 1 (r₁)', fmt(r), 'same unit as r₂', [
          { title: "Write Graham's Law", expr: 'r₁/r₂ = √(M₂/M₁)', note: 'Lighter gases effuse faster than heavier gases.' },
          { title: 'Rearrange for r₁', expr: 'r₁ = r₂ × √(M₂/M₁)' },
          { title: 'Substitute values', expr: `r₁ = ${fmt(r2)} × √(${fmt(M2)} ÷ ${fmt(M1)})` },
          { title: 'Calculate result', expr: `r₁ = ${fmt(r2)} × ${fmt(ratio)} = ${fmt(r)}` },
        ]);
      },
      r2: () => {
        const ratio = Math.sqrt(M1 / M2);
        const r = r1 * ratio;
        showResultGas('gr', 'Rate of Gas 2 (r₂)', fmt(r), 'same unit as r₁', [
          { title: "Write Graham's Law", expr: 'r₁/r₂ = √(M₂/M₁)' },
          { title: 'Rearrange for r₂', expr: 'r₂ = r₁ × √(M₁/M₂)' },
          { title: 'Substitute values', expr: `r₂ = ${fmt(r1)} × √(${fmt(M1)} ÷ ${fmt(M2)})` },
          { title: 'Calculate result', expr: `r₂ = ${fmt(r1)} × ${fmt(ratio)} = ${fmt(r)}` },
        ]);
      },
      M1: () => {
        const ratio = Math.pow(r2 / r1, 2);
        const r = M2 * ratio;
        showResultGas('gr', 'Molar Mass of Gas 1 (M₁)', fmt(r), 'g/mol', [
          { title: "Write Graham's Law", expr: 'r₁/r₂ = √(M₂/M₁)' },
          { title: 'Square both sides', expr: '(r₁/r₂)² = M₂/M₁' },
          { title: 'Rearrange for M₁', expr: 'M₁ = M₂ × (r₂/r₁)²' },
          { title: 'Substitute values', expr: `M₁ = ${fmt(M2)} × (${fmt(r2)} ÷ ${fmt(r1)})²` },
          { title: 'Calculate result', expr: `M₁ = ${fmt(M2)} × ${fmt(ratio)} = ${fmt(r)} g/mol` },
        ]);
      },
      M2: () => {
        const ratio = Math.pow(r1 / r2, 2);
        const r = M1 * ratio;
        showResultGas('gr', 'Molar Mass of Gas 2 (M₂)', fmt(r), 'g/mol', [
          { title: "Write Graham's Law", expr: 'r₁/r₂ = √(M₂/M₁)' },
          { title: 'Square both sides', expr: '(r₁/r₂)² = M₂/M₁' },
          { title: 'Rearrange for M₂', expr: 'M₂ = M₁ × (r₁/r₂)²' },
          { title: 'Substitute values', expr: `M₂ = ${fmt(M1)} × (${fmt(r1)} ÷ ${fmt(r2)})²` },
          { title: 'Calculate result', expr: `M₂ = ${fmt(M1)} × ${fmt(ratio)} = ${fmt(r)} g/mol` },
        ]);
      },
    };
    results[solve]();
  }
