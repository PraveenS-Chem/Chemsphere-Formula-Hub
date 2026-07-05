/* ═══════════════════════════════════════════════════════════
   FORMULA HUB — formulaData.js
   FORMULA DATA & CATEGORY META
   The FORMULAS catalog, category metadata, 'coming soon' panel copy, and sub-tab label maps used for breadcrumbs.
═══════════════════════════════════════════════════════════ */

  // ── DATA ──
  const FORMULAS = [
    // Mole Concept
    { id: 1, category: 'mole', color: '#00d4ff', icon: '🔬', name: 'Moles from Mass',       expr: 'n = m / M',      desc: 'Calculate moles from mass and molar mass.',         vars: ['n','m','M'] },
    { id: 2, category: 'mole', color: '#00d4ff', icon: '⚛️',  name: "Avogadro's Number",    expr: 'N = n × Nₐ',     desc: 'Number of particles from moles.',                   vars: ['N','n','Nₐ'] },
    { id: 3, category: 'mole', color: '#00d4ff', icon: '📦', name: 'Molar Volume (STP)',    expr: 'V = n × 22.4',   desc: 'Volume of gas at standard temperature & pressure.', vars: ['V','n'] },
    { id: 4, category: 'mole', color: '#00d4ff', icon: '🔢', name: 'Empirical Formula',    expr: 'EF from %',      desc: 'Derive empirical formula from percentage composition.',vars: ['%mass'] },
    { id: 5, category: 'mole', color: '#00d4ff', icon: '⚗️',  name: 'Mole Fraction',        expr: 'χ = nᵢ / nₜₒₜ', desc: 'Fraction of component moles in a mixture.',         vars: ['χ','nᵢ','nₜₒₜ'] },
    { id: 6, category: 'mole', color: '#00d4ff', icon: '📊', name: 'Molar Mass from Density',expr: 'M = ρRT / P',   desc: 'Molar mass of gas using ideal gas density.',        vars: ['M','ρ','R','T','P'] },

    // Solutions
    { id: 7,  category: 'solutions', color: '#00ffcc', icon: '🧪', name: 'Molarity',           expr: 'M = n / V(L)',    desc: 'Moles of solute per litre of solution.',            vars: ['M','n','V'] },
    { id: 8,  category: 'solutions', color: '#00ffcc', icon: '💧', name: 'Molality',           expr: 'm = n / kg(solv)',desc: 'Moles of solute per kilogram of solvent.',          vars: ['m','n','kg'] },
    { id: 9,  category: 'solutions', color: '#00ffcc', icon: '🌊', name: 'Dilution Equation',  expr: 'C₁V₁ = C₂V₂',   desc: 'Concentration-volume relationship for dilutions.',  vars: ['C₁','V₁','C₂','V₂'] },
    { id: 10, category: 'solutions', color: '#00ffcc', icon: '🧬', name: 'Normality',          expr: 'N = n eq / V',   desc: 'Equivalents of solute per litre of solution.',      vars: ['N','neq','V'] },
    { id: 11, category: 'solutions', color: '#00ffcc', icon: '🫧', name: "Raoult's Law",       expr: 'Pₛ = χₛ·P°',    desc: 'Vapour pressure lowering by a non-volatile solute.',vars: ['Pₛ','χₛ','P°'] },

    // Gas Laws
    { id: 12, category: 'gas', color: '#a78bfa', icon: '💨', name: "Boyle's Law",          expr: 'P₁V₁ = P₂V₂',      desc: 'Pressure-volume relation at constant temperature.', vars: ['P₁','V₁','P₂','V₂'] },
    { id: 13, category: 'gas', color: '#a78bfa', icon: '🌡️', name: "Charles' Law",         expr: 'V₁/T₁ = V₂/T₂',    desc: 'Volume-temperature relation at constant pressure.', vars: ['V₁','T₁','V₂','T₂'] },
    { id: 14, category: 'gas', color: '#a78bfa', icon: '🔥', name: "Gay-Lussac's Law",     expr: 'P₁/T₁ = P₂/T₂',    desc: 'Pressure-temperature relation at constant volume.',  vars: ['P₁','T₁','P₂','T₂'] },
    { id: 25, category: 'gas', color: '#a78bfa', icon: '⚗️', name: 'Combined Gas Law',     expr: 'P₁V₁/T₁ = P₂V₂/T₂', desc: 'All three simple gas laws unified.',               vars: ['P','V','T'] },
    { id: 15, category: 'gas', color: '#a78bfa', icon: '📐', name: 'Ideal Gas Law',         expr: 'PV = nRT',          desc: 'Combines all three gas laws into one equation.',    vars: ['P','V','n','R','T'] },
    { id: 16, category: 'gas', color: '#a78bfa', icon: '🌬️', name: "Graham's Law",          expr: 'r ∝ 1/√M',         desc: 'Rate of effusion inversely proportional to √M.',    vars: ['r','M'] },

    // Acids & Bases
    { id: 17, category: 'acids', color: '#fb923c', icon: '🧫', name: 'pH Definition',       expr: 'pH = -log[H⁺]',  desc: 'Negative log of hydrogen ion concentration.',       vars: ['pH','[H⁺]'] },
    { id: 18, category: 'acids', color: '#fb923c', icon: '💢', name: 'pOH Definition',      expr: 'pOH = -log[OH⁻]',desc: 'Negative log of hydroxide ion concentration.',      vars: ['pOH','[OH⁻]'] },
    { id: 19, category: 'acids', color: '#fb923c', icon: '⚖️', name: 'pH + pOH Relation',   expr: 'pH + pOH = 14',  desc: 'Sum of pH and pOH at 25 °C in water.',             vars: ['pH','pOH'] },
    { id: 20, category: 'acids', color: '#fb923c', icon: '🔭', name: 'Henderson-Hasselbalch',expr: 'pH = pKₐ + log([A⁻]/[HA])', desc: 'Buffer pH from acid dissociation constant.', vars: ['pH','pKₐ','[A⁻]','[HA]'] },

    // Stoichiometry
    { id: 21, category: 'stoichiometry', color: '#f472b6', icon: '⚖️',  name: 'Mole Ratio',          expr: 'n₁/n₂ = coeff ratio', desc: 'Converts moles of one substance to another.',    vars: ['n₁','n₂','coeff'] },
    { id: 22, category: 'stoichiometry', color: '#f472b6', icon: '🧮', name: 'Percent Yield',        expr: '% = (actual/theor)×100', desc: 'Efficiency of a chemical reaction.',          vars: ['%','actual','theoretical'] },
    { id: 23, category: 'stoichiometry', color: '#f472b6', icon: '🔢', name: 'Limiting Reagent',     expr: 'n/coeff → min',  desc: 'Identify the reagent that runs out first.',       vars: ['n','coeff'] },
    { id: 24, category: 'stoichiometry', color: '#f472b6', icon: '📊', name: 'Percent Composition',  expr: '% = (mass el / M)×100', desc: 'Mass fraction of each element in a compound.', vars: ['%','mass','M'] },
  ];

  const CAT_META = {
    all:          { label: 'All Formulas',   subtitle: 'Browse and calculate with essential chemistry formulas across all topics.' },
    mole:         { label: 'Mole Concept',   subtitle: 'Formulas relating amount of substance, mass, and particles.' },
    solutions:    { label: 'Solutions',      subtitle: 'Concentration, dilution, and solution chemistry formulas.' },
    gas:          { label: 'Gas Laws',       subtitle: 'Pressure, volume, and temperature relationships for gases.' },
    acids:        { label: 'Acids & Bases',  subtitle: 'pH, pOH, and buffer equilibria formulas.' },
    stoichiometry:{ label: 'Stoichiometry',  subtitle: 'Mole ratios, yield, and limiting reagent calculations.' },
    recent:       { label: 'Recent',         subtitle: 'Your recently viewed formulas and calculators.' },
    bookmarks:    { label: 'Bookmarks',      subtitle: 'Formulas and calculators you\'ve saved for quick access.' },
    periodic:     { label: 'Periodic Table', subtitle: 'Interactive periodic table of elements.' },
    constants:    { label: 'Constants',      subtitle: 'Common physical and chemical constants reference.' },
  };

  const COMING_SOON_META = {
    bookmarks: { icon: '🔖', title: 'Bookmarks — Coming Soon',      text: 'Saving and revisiting your favorite formulas will be available in a future update.' },
    periodic:  { icon: '🧪', title: 'Periodic Table — Coming Soon', text: 'An interactive periodic table of elements is currently in development.' },
    constants: { icon: '🔢', title: 'Constants — Coming Soon',      text: 'A quick-reference table of common physical and chemical constants is currently in development.' },
  };

  // Sub-tab label maps for breadcrumb depth
  const MOLE_TAB_LABELS = {
    'mole-calc':     'Mole Calculator',
    'mass-mole':     'Mass–Mole Converter',
    'particle-calc': 'Particle Calculator',
  };
  const SOL_TAB_LABELS = {
    'sol-molarity':  'Molarity',
    'sol-molality':  'Molality',
    'sol-normality': 'Normality',
    'sol-dilution':  'Dilution',
    'sol-raoult':    "Raoult's Law",
  };
  const GAS_TAB_LABELS = {
    'gas-boyle':     "Boyle's Law",
    'gas-charles':   "Charles' Law",
    'gas-gaylussac': "Gay-Lussac's Law",
    'gas-combined':  'Combined Gas Law',
    'gas-ideal':     'Ideal Gas Law',
    'gas-graham':    "Graham's Law",
  };
  const ACID_TAB_LABELS = {
    'acid-ph':    'pH Calculator',
    'acid-poh':   'pOH Calculator',
    'acid-h':     'Hydrogen Ion Concentration',
    'acid-oh':    'Hydroxide Ion Concentration',
    'acid-phrel': 'pH + pOH Relation',
  };
  const STOICH_TAB_LABELS = {
    'stoich-yield':       'Percent Yield',
    'stoich-theoretical': 'Theoretical Yield',
    'stoich-empirical':   'Empirical Formula',
    'stoich-limiting':    'Limiting Reagent',
  };

  function setBreadcrumbSub(label) {
    const sep = document.getElementById('breadcrumbSepSub');
    const sub = document.getElementById('breadcrumbSub');
    if (!sep || !sub) return;
    if (label) {
      sub.textContent = label;
      sep.style.display = '';
      sub.style.display = '';
    } else {
      sep.style.display = 'none';
      sub.style.display = 'none';
      sub.textContent = '';
    }
  }

