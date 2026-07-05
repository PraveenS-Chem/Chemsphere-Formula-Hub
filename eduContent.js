/* ═══════════════════════════════════════════════════════════
   FORMULA HUB — eduContent.js
   EDUCATIONAL CONTENT
   The EDU object: one educational description entry per formula panel.
═══════════════════════════════════════════════════════════ */

  /* ═══════════════════════════════════════════════
     EDU CONTENT — one object per panel
  ═══════════════════════════════════════════════ */
  const EDU = {

    /* ── MOLE CONCEPT ── */
    'panel-mole-calc': [
      { icon:'📘', title:'Concept Overview', html:'<p>The <strong>mole</strong> is the SI unit for amount of substance. One mole contains exactly 6.022 × 10²³ entities (Avogadro\'s number). The molar mass links grams to moles — it equals the atomic or molecular mass in g/mol.</p>' },
      { icon:'📐', title:'Formula Explanation', html:'<p><strong>n = m ÷ M</strong> — moles equal mass divided by molar mass. Rearranged: m = n × M (find mass) or M = m ÷ n (find molar mass).</p>' },
      { icon:'🔤', title:'Variable Definitions', html:'<div class="edu-var-list"><div class="edu-var-row"><span class="edu-var-sym">n</span><div>Amount of substance (mol)</div></div><div class="edu-var-row"><span class="edu-var-sym">m</span><div>Mass (g)</div></div><div class="edu-var-row"><span class="edu-var-sym">M</span><div>Molar mass (g/mol)</div></div></div>' },
      { icon:'📏', title:'Units Used', html:'<ul><li><strong>mol</strong> — amount of substance</li><li><strong>g</strong> — mass</li><li><strong>g/mol</strong> — molar mass</li></ul>' },
      { icon:'⚠️', title:'Common Mistakes', html:'<ul><li>Confusing mass (g) with moles (mol).</li><li>Using atomic mass in g instead of g/mol.</li><li>Forgetting to account for polyatomic molecules (e.g. H₂O = 18.015 g/mol, not 1.008).</li></ul>' },
      { icon:'✏️', title:'Exam Tips', html:'<ul><li>Memorise: <strong>n = m/M</strong>. All other forms follow by algebra.</li><li>Always write units — mol × g/mol = g is a useful check.</li><li>Look up molar mass from the periodic table; add atomic masses for compounds.</li></ul>' },
      { icon:'🌍', title:'Real-World Applications', html:'<ul><li><strong>Pharmacy:</strong> drug dosages are calculated in moles/mol ratios.</li><li><strong>Industry:</strong> chemical manufacturing scales reactions using molar quantities.</li><li><strong>Food science:</strong> nutritional chemistry uses molar masses to track nutrients.</li></ul>' },
    ],

    'panel-mass-mole': [
      { icon:'📘', title:'Concept Overview', html:'<p>Converting between number of particles and moles uses <strong>Avogadro\'s number</strong>: N<sub>A</sub> = 6.022 × 10²³ mol⁻¹. This tells you how many individual atoms, molecules, or ions are in one mole.</p>' },
      { icon:'📐', title:'Formula Explanation', html:'<p><strong>N = n × Nₐ</strong> — particles = moles × Avogadro\'s number. Rearranged: <strong>n = N ÷ Nₐ</strong>.</p>' },
      { icon:'🔤', title:'Variable Definitions', html:'<div class="edu-var-list"><div class="edu-var-row"><span class="edu-var-sym">N</span><div>Number of particles (atoms, molecules, ions)</div></div><div class="edu-var-row"><span class="edu-var-sym">n</span><div>Amount of substance (mol)</div></div><div class="edu-var-row"><span class="edu-var-sym">Nₐ</span><div>Avogadro\'s number = 6.022 × 10²³ mol⁻¹</div></div></div>' },
      { icon:'📏', title:'Units Used', html:'<ul><li><strong>mol</strong> — amount of substance</li><li><strong>mol⁻¹</strong> — unit of Avogadro\'s number</li><li>Particle count N is dimensionless.</li></ul>' },
      { icon:'⚠️', title:'Common Mistakes', html:'<ul><li>Multiplying instead of dividing (or vice versa) when converting.</li><li>Forgetting that Nₐ applies to <em>any</em> countable entity — atoms, molecules, ions, electrons.</li><li>Rounding Avogadro\'s number too aggressively (use 6.022 × 10²³).</li></ul>' },
      { icon:'✏️', title:'Exam Tips', html:'<ul><li>Memorise <strong>Nₐ = 6.022 × 10²³</strong>.</li><li>Chain conversions: grams → moles → particles uses both M and Nₐ.</li><li>Check your answer order of magnitude — one mole of anything contains ~10²³ particles.</li></ul>' },
      { icon:'🌍', title:'Real-World Applications', html:'<ul><li><strong>Materials science:</strong> counting lattice defects at the atomic level.</li><li><strong>Nuclear physics:</strong> calculating decay rates from particle counts.</li><li><strong>Nanotechnology:</strong> designing structures at the single-molecule scale.</li></ul>' },
    ],

    'panel-particle-calc': [
      { icon:'📘', title:'Concept Overview', html:'<p>Avogadro\'s number bridges the macroscopic (grams, litres) and microscopic (atoms, molecules) worlds. Knowing any one of mass, moles, or particle count lets you find the other two.</p>' },
      { icon:'📐', title:'Formula Explanation', html:'<p><strong>n = N ÷ Nₐ</strong>, <strong>m = n × M</strong>. The particle calculator combines both steps: particles → moles → mass.</p>' },
      { icon:'🔤', title:'Variable Definitions', html:'<div class="edu-var-list"><div class="edu-var-row"><span class="edu-var-sym">N</span><div>Number of particles</div></div><div class="edu-var-row"><span class="edu-var-sym">Nₐ</span><div>6.022 × 10²³ mol⁻¹</div></div><div class="edu-var-row"><span class="edu-var-sym">n</span><div>Moles (mol)</div></div><div class="edu-var-row"><span class="edu-var-sym">M</span><div>Molar mass (g/mol)</div></div></div>' },
      { icon:'📏', title:'Units Used', html:'<ul><li>Particles — dimensionless count</li><li><strong>mol</strong></li><li><strong>g/mol</strong></li><li><strong>g</strong></li></ul>' },
      { icon:'⚠️', title:'Common Mistakes', html:'<ul><li>Using the wrong entity — specifying atoms when molecules are meant (e.g. O₂ has 2 atoms per molecule).</li><li>Arithmetic errors with powers of 10²³.</li></ul>' },
      { icon:'✏️', title:'Exam Tips', html:'<ul><li>Always clarify: particles of <em>what</em> — atoms, molecules, or formula units?</li><li>Scientific notation is essential — write answers as X × 10ⁿ.</li></ul>' },
      { icon:'🌍', title:'Real-World Applications', html:'<ul><li><strong>Spectroscopy:</strong> intensity of spectral lines depends on particle count.</li><li><strong>Electrochemistry:</strong> Faraday\'s law links moles of electrons to charge.</li></ul>' },
    ],

    /* ── SOLUTIONS ── */
    'panel-sol-molarity': [
      { icon:'📘', title:'Concept Overview', html:'<p><strong>Molarity (M)</strong> is the most common concentration unit: moles of solute per litre of solution. It is temperature-dependent because volume changes with temperature.</p>' },
      { icon:'📐', title:'Formula Explanation', html:'<p><strong>C = n ÷ V</strong> where V is in litres. Rearranged: n = C × V (find moles) or V = n ÷ C (find volume).</p>' },
      { icon:'🔤', title:'Variable Definitions', html:'<div class="edu-var-list"><div class="edu-var-row"><span class="edu-var-sym">C</span><div>Molarity (mol/L = M)</div></div><div class="edu-var-row"><span class="edu-var-sym">n</span><div>Moles of solute (mol)</div></div><div class="edu-var-row"><span class="edu-var-sym">V</span><div>Volume of solution (L)</div></div></div>' },
      { icon:'📏', title:'Units Used', html:'<ul><li><strong>mol/L</strong> (M) — molarity</li><li><strong>mol</strong> — amount</li><li><strong>L</strong> (or mL ÷ 1000) — volume</li></ul>' },
      { icon:'⚠️', title:'Common Mistakes', html:'<ul><li>Using mL instead of L (divide mL by 1000 first).</li><li>Confusing volume of solute with volume of solution.</li><li>Using mass (g) directly instead of converting to moles first.</li></ul>' },
      { icon:'✏️', title:'Exam Tips', html:'<ul><li>Memorise <strong>C = n/V</strong> and its two rearrangements.</li><li>Always convert volume to litres before substituting.</li><li>Label your answer with units: mol/L or M.</li></ul>' },
      { icon:'🌍', title:'Real-World Applications', html:'<ul><li><strong>IV fluids:</strong> saline is 0.154 M NaCl.</li><li><strong>Lab reagents:</strong> stock solutions are prepared and diluted to working concentrations.</li><li><strong>Blood chemistry:</strong> electrolyte concentrations in mmol/L.</li></ul>' },
    ],

    'panel-sol-molality': [
      { icon:'📘', title:'Concept Overview', html:'<p><strong>Molality (m)</strong> expresses concentration as moles of solute per <em>kilogram of solvent</em> (not solution). Unlike molarity, it is <strong>temperature-independent</strong>, making it preferred for colligative properties.</p>' },
      { icon:'📐', title:'Formula Explanation', html:'<p><strong>b = n ÷ m_solvent</strong> where m_solvent is in kg. Rearranged: n = b × m_solvent or m_solvent = n ÷ b.</p>' },
      { icon:'🔤', title:'Variable Definitions', html:'<div class="edu-var-list"><div class="edu-var-row"><span class="edu-var-sym">b</span><div>Molality (mol/kg)</div></div><div class="edu-var-row"><span class="edu-var-sym">n</span><div>Moles of solute (mol)</div></div><div class="edu-var-row"><span class="edu-var-sym">m</span><div>Mass of solvent (kg)</div></div></div>' },
      { icon:'📏', title:'Units Used', html:'<ul><li><strong>mol/kg</strong> — molality (symbol: m or b)</li><li><strong>kg</strong> — solvent mass</li></ul>' },
      { icon:'⚠️', title:'Common Mistakes', html:'<ul><li>Dividing by solution mass instead of <em>solvent</em> mass.</li><li>Using grams instead of kilograms for solvent mass.</li><li>Confusing molality (m or b) with molarity (M or C).</li></ul>' },
      { icon:'✏️', title:'Exam Tips', html:'<ul><li>Molality is used in boiling-point elevation and freezing-point depression problems.</li><li>Key difference: molality uses <strong>solvent mass</strong>, molarity uses <strong>solution volume</strong>.</li></ul>' },
      { icon:'🌍', title:'Real-World Applications', html:'<ul><li><strong>Antifreeze:</strong> ethylene glycol concentration in coolant is expressed in molality for freezing-point calculations.</li><li><strong>Oceanography:</strong> salinity at varying temperatures and pressures.</li></ul>' },
    ],

    'panel-sol-normality': [
      { icon:'📘', title:'Concept Overview', html:'<p><strong>Normality (N)</strong> expresses reactive capacity: equivalents of solute per litre of solution. One <em>equivalent</em> is the amount that reacts with one mole of H⁺ (acids/bases) or transfers one mole of electrons (redox).</p>' },
      { icon:'📐', title:'Formula Explanation', html:'<p><strong>N = Molarity × n-factor</strong> where n-factor = number of equivalents per mole (valence/protons donated/electrons transferred).</p>' },
      { icon:'🔤', title:'Variable Definitions', html:'<div class="edu-var-list"><div class="edu-var-row"><span class="edu-var-sym">N</span><div>Normality (eq/L)</div></div><div class="edu-var-row"><span class="edu-var-sym">M</span><div>Molarity (mol/L)</div></div><div class="edu-var-row"><span class="edu-var-sym">n</span><div>n-factor (equivalents per mole)</div></div></div>' },
      { icon:'📏', title:'Units Used', html:'<ul><li><strong>eq/L</strong> or <strong>N</strong> — normality</li><li><strong>mol/L</strong> — molarity</li></ul>' },
      { icon:'⚠️', title:'Common Mistakes', html:'<ul><li>Using the wrong n-factor — H₂SO₄ has n=2 for complete neutralisation but n=1 for partial.</li><li>Confusing normality with molarity — they are equal only when n-factor = 1.</li></ul>' },
      { icon:'✏️', title:'Exam Tips', html:'<ul><li>N₁V₁ = N₂V₂ for titrations (equivalent to M₁V₁n₁ = M₂V₂n₂).</li><li>Always state the reaction context — n-factor depends on the specific reaction.</li></ul>' },
      { icon:'🌍', title:'Real-World Applications', html:'<ul><li><strong>Titrations:</strong> acid-base and redox standardisation.</li><li><strong>Clinical labs:</strong> expressing electrolyte reactivity in mEq/L.</li></ul>' },
    ],

    'panel-sol-dilution': [
      { icon:'📘', title:'Concept Overview', html:'<p><strong>Dilution</strong> adds solvent to a solution, reducing concentration while keeping the moles of solute constant. The key insight: <strong>moles before = moles after</strong>.</p>' },
      { icon:'📐', title:'Formula Explanation', html:'<p><strong>C₁V₁ = C₂V₂</strong> — initial concentration × initial volume = final concentration × final volume.</p>' },
      { icon:'🔤', title:'Variable Definitions', html:'<div class="edu-var-list"><div class="edu-var-row"><span class="edu-var-sym">C₁</span><div>Initial concentration (mol/L)</div></div><div class="edu-var-row"><span class="edu-var-sym">V₁</span><div>Initial volume (L or mL)</div></div><div class="edu-var-row"><span class="edu-var-sym">C₂</span><div>Final concentration (mol/L)</div></div><div class="edu-var-row"><span class="edu-var-sym">V₂</span><div>Final volume (L or mL)</div></div></div>' },
      { icon:'📏', title:'Units Used', html:'<ul><li><strong>mol/L</strong> (M) for concentration</li><li><strong>L</strong> or <strong>mL</strong> for volume — but both sides must use the same unit</li></ul>' },
      { icon:'⚠️', title:'Common Mistakes', html:'<ul><li>Mixing units — mL on one side and L on the other.</li><li>Confusing V₂ (total final volume) with the volume of solvent added.</li><li>Applying C₁V₁ = C₂V₂ to reactions that aren\'t simple dilutions.</li></ul>' },
      { icon:'✏️', title:'Exam Tips', html:'<ul><li>The formula works in any consistent volume unit — no need to convert if both sides match.</li><li>V_added = V₂ − V₁ (the amount of solvent added, not the total).</li></ul>' },
      { icon:'🌍', title:'Real-World Applications', html:'<ul><li><strong>Lab preparation:</strong> diluting stock HCl or NaOH to working concentrations.</li><li><strong>Medicine:</strong> IV bag dilutions and drug preparation.</li><li><strong>Beverages:</strong> concentrated squash diluted for consumption.</li></ul>' },
    ],

    'panel-sol-raoult': [
      { icon:'📘', title:'Concept Overview', html:'<p><strong>Raoult\'s Law</strong> states that the vapour pressure of an ideal solution is proportional to the mole fraction of the solvent. Adding a non-volatile solute always <em>lowers</em> the vapour pressure.</p>' },
      { icon:'📐', title:'Formula Explanation', html:'<p><strong>Pₛ = χₛ × P°</strong> — solution vapour pressure = mole fraction of solvent × vapour pressure of pure solvent.</p>' },
      { icon:'🔤', title:'Variable Definitions', html:'<div class="edu-var-list"><div class="edu-var-row"><span class="edu-var-sym">Pₛ</span><div>Vapour pressure of solution (mmHg)</div></div><div class="edu-var-row"><span class="edu-var-sym">χₛ</span><div>Mole fraction of solvent (0–1)</div></div><div class="edu-var-row"><span class="edu-var-sym">P°</span><div>Vapour pressure of pure solvent (mmHg)</div></div></div>' },
      { icon:'📏', title:'Units Used', html:'<ul><li><strong>mmHg</strong> or <strong>atm</strong> — vapour pressure (both sides must match)</li><li>Mole fraction χ — dimensionless</li></ul>' },
      { icon:'⚠️', title:'Common Mistakes', html:'<ul><li>Using the mole fraction of the <em>solute</em> instead of the solvent.</li><li>Applying Raoult\'s Law to non-ideal (real) solutions.</li><li>Forgetting that Pₛ &lt; P° — vapour pressure is always reduced by adding solute.</li></ul>' },
      { icon:'✏️', title:'Exam Tips', html:'<ul><li>Vapour pressure lowering ΔP = P° − Pₛ = χ_solute × P°.</li><li>Raoult\'s Law is valid only for <em>ideal dilute solutions</em> with a non-volatile solute.</li></ul>' },
      { icon:'🌍', title:'Real-World Applications', html:'<ul><li><strong>Distillation:</strong> separation of mixtures relies on differential vapour pressures.</li><li><strong>Antifreeze:</strong> glycol lowers vapour pressure and raises boiling point.</li><li><strong>Food preservation:</strong> high sugar/salt concentrations reduce water activity.</li></ul>' },
    ],

    /* ── GAS LAWS ── */
    'panel-gas-boyle': [
      { icon:'📘', title:'Concept Overview', html:'<p><strong>Boyle\'s Law</strong>: at constant temperature and amount, the pressure and volume of a gas are <em>inversely proportional</em>. Compress the gas (↓V) and pressure rises (↑P).</p>' },
      { icon:'📐', title:'Formula Explanation', html:'<p><strong>P₁V₁ = P₂V₂</strong> — the product of pressure and volume is constant. Rearranged for any missing variable by simple division.</p>' },
      { icon:'🔤', title:'Variable Definitions', html:'<div class="edu-var-list"><div class="edu-var-row"><span class="edu-var-sym">P₁, P₂</span><div>Initial and final pressure (any unit — must match)</div></div><div class="edu-var-row"><span class="edu-var-sym">V₁, V₂</span><div>Initial and final volume (any unit — must match)</div></div></div>' },
      { icon:'📏', title:'Units Used', html:'<ul><li>Pressure: <strong>atm</strong>, <strong>Pa</strong>, <strong>kPa</strong>, <strong>mmHg</strong> — both sides must use the same unit</li><li>Volume: <strong>L</strong>, <strong>mL</strong>, <strong>m³</strong> — same rule</li></ul>' },
      { icon:'⚠️', title:'Common Mistakes', html:'<ul><li>Mixing pressure units between P₁ and P₂.</li><li>Forgetting temperature must remain constant (isothermal process).</li><li>Assuming a linear relationship — P and V are inversely, not directly, proportional.</li></ul>' },
      { icon:'✏️', title:'Exam Tips', html:'<ul><li>If volume doubles, pressure halves — and vice versa.</li><li>No need to convert units as long as both sides use the same one.</li><li>Commonly combined with Charles\' and Gay-Lussac\'s laws into the Combined Gas Law.</li></ul>' },
      { icon:'🌍', title:'Real-World Applications', html:'<ul><li><strong>Syringe:</strong> pulling the plunger back increases volume and lowers pressure.</li><li><strong>Scuba diving:</strong> gas volume changes with depth/pressure.</li><li><strong>Bicycle pump:</strong> compressing air raises pressure.</li></ul>' },
    ],

    'panel-gas-charles': [
      { icon:'📘', title:'Concept Overview', html:'<p><strong>Charles\'s Law</strong>: at constant pressure, the volume of a fixed amount of gas is <em>directly proportional</em> to its absolute temperature (Kelvin). Hot gas expands; cold gas contracts.</p>' },
      { icon:'📐', title:'Formula Explanation', html:'<p><strong>V₁/T₁ = V₂/T₂</strong> — volume divided by temperature is constant. Always use Kelvin (K = °C + 273.15).</p>' },
      { icon:'🔤', title:'Variable Definitions', html:'<div class="edu-var-list"><div class="edu-var-row"><span class="edu-var-sym">V₁, V₂</span><div>Initial and final volume (any matching unit)</div></div><div class="edu-var-row"><span class="edu-var-sym">T₁, T₂</span><div>Initial and final absolute temperature (<strong>Kelvin</strong>)</div></div></div>' },
      { icon:'📏', title:'Units Used', html:'<ul><li>Volume: <strong>L</strong>, <strong>mL</strong>, <strong>m³</strong></li><li>Temperature: <strong>K</strong> (Kelvin only — never Celsius directly)</li></ul>' },
      { icon:'⚠️', title:'Common Mistakes', html:'<ul><li>Using °C instead of K — this is the most common error in gas law problems.</li><li>Assuming pressure is constant without checking the problem statement.</li></ul>' },
      { icon:'✏️', title:'Exam Tips', html:'<ul><li>Always convert: <strong>K = °C + 273.15</strong> (or 273 in approximations).</li><li>Direct proportionality: if T doubles (in Kelvin), V doubles.</li></ul>' },
      { icon:'🌍', title:'Real-World Applications', html:'<ul><li><strong>Hot-air balloon:</strong> heating air increases volume and buoyancy.</li><li><strong>Car tyres:</strong> tyre pressure and volume change with temperature.</li><li><strong>Bread baking:</strong> CO₂ bubbles expand when heated.</li></ul>' },
    ],

    'panel-gas-gaylussac': [
      { icon:'📘', title:'Concept Overview', html:'<p><strong>Gay-Lussac\'s Law</strong>: at constant volume, the pressure of a fixed amount of gas is <em>directly proportional</em> to its absolute temperature. Heating a rigid container raises pressure.</p>' },
      { icon:'📐', title:'Formula Explanation', html:'<p><strong>P₁/T₁ = P₂/T₂</strong> — pressure divided by temperature (in K) is constant at fixed volume.</p>' },
      { icon:'🔤', title:'Variable Definitions', html:'<div class="edu-var-list"><div class="edu-var-row"><span class="edu-var-sym">P₁, P₂</span><div>Initial and final pressure</div></div><div class="edu-var-row"><span class="edu-var-sym">T₁, T₂</span><div>Initial and final temperature (K)</div></div></div>' },
      { icon:'📏', title:'Units Used', html:'<ul><li>Pressure: <strong>atm</strong>, <strong>Pa</strong>, <strong>mmHg</strong> — both sides must match</li><li>Temperature: <strong>K</strong></li></ul>' },
      { icon:'⚠️', title:'Common Mistakes', html:'<ul><li>Using °C instead of Kelvin.</li><li>Applying this law when volume is not fixed.</li></ul>' },
      { icon:'✏️', title:'Exam Tips', html:'<ul><li>All three simple gas laws (Boyle, Charles, Gay-Lussac) combine into the Combined Gas Law.</li><li>P and T are directly proportional at constant V — if T (K) doubles, P doubles.</li></ul>' },
      { icon:'🌍', title:'Real-World Applications', html:'<ul><li><strong>Pressure cooker:</strong> sealed vessel — temperature rise increases steam pressure.</li><li><strong>Aerosol cans:</strong> warning not to incinerate — pressure builds dangerously when heated.</li><li><strong>Car airbags:</strong> rapid pressure build-up on ignition.</li></ul>' },
    ],

    'panel-gas-combined': [
      { icon:'📘', title:'Concept Overview', html:'<p>The <strong>Combined Gas Law</strong> merges Boyle\'s, Charles\'s, and Gay-Lussac\'s laws into one equation, valid when the amount of gas is fixed. Use it whenever two of pressure, volume, and temperature change simultaneously.</p>' },
      { icon:'📐', title:'Formula Explanation', html:'<p><strong>P₁V₁/T₁ = P₂V₂/T₂</strong>. To isolate any one variable, cross-multiply and divide.</p>' },
      { icon:'🔤', title:'Variable Definitions', html:'<div class="edu-var-list"><div class="edu-var-row"><span class="edu-var-sym">P</span><div>Pressure (matching units)</div></div><div class="edu-var-row"><span class="edu-var-sym">V</span><div>Volume (matching units)</div></div><div class="edu-var-row"><span class="edu-var-sym">T</span><div>Temperature (K)</div></div></div>' },
      { icon:'📏', title:'Units Used', html:'<ul><li>Pressure and volume units must match on both sides.</li><li>Temperature must be in <strong>Kelvin</strong>.</li></ul>' },
      { icon:'⚠️', title:'Common Mistakes', html:'<ul><li>Forgetting to convert temperature to Kelvin.</li><li>Mixing pressure or volume units between state 1 and state 2.</li><li>Using this law when the amount of gas also changes (use Ideal Gas Law instead).</li></ul>' },
      { icon:'✏️', title:'Exam Tips', html:'<ul><li>If one variable is constant, it cancels out, reducing to one of the three simple laws.</li><li>Write out the full equation first, then cancel constants.</li></ul>' },
      { icon:'🌍', title:'Real-World Applications', html:'<ul><li><strong>Weather balloons:</strong> as altitude increases, pressure drops and temperature falls — volume adjusts.</li><li><strong>Gas cylinders:</strong> filling conditions vs. usage conditions.</li></ul>' },
    ],

    'panel-gas-ideal': [
      { icon:'📘', title:'Concept Overview', html:'<p>The <strong>Ideal Gas Law</strong> relates pressure, volume, moles, and temperature for an ideal gas. It assumes no intermolecular forces and negligible particle volume — a good approximation at low pressures and high temperatures.</p>' },
      { icon:'📐', title:'Formula Explanation', html:'<p><strong>PV = nRT</strong>. Rearrange to find any variable: P = nRT/V, V = nRT/P, n = PV/RT, T = PV/nR.</p>' },
      { icon:'🔤', title:'Variable Definitions', html:'<div class="edu-var-list"><div class="edu-var-row"><span class="edu-var-sym">P</span><div>Pressure (atm or Pa)</div></div><div class="edu-var-row"><span class="edu-var-sym">V</span><div>Volume (L or m³)</div></div><div class="edu-var-row"><span class="edu-var-sym">n</span><div>Moles (mol)</div></div><div class="edu-var-row"><span class="edu-var-sym">R</span><div>Gas constant: 0.08206 L·atm/mol·K or 8.314 J/mol·K</div></div><div class="edu-var-row"><span class="edu-var-sym">T</span><div>Temperature (K)</div></div></div>' },
      { icon:'📏', title:'Units Used', html:'<ul><li>Use R = <strong>0.08206 L·atm/mol·K</strong> when P is in atm and V is in litres.</li><li>Use R = <strong>8.314 J/mol·K</strong> when P is in Pa and V is in m³.</li></ul>' },
      { icon:'⚠️', title:'Common Mistakes', html:'<ul><li>Mismatching R with pressure/volume units.</li><li>Using °C instead of K for temperature.</li><li>Applying the ideal gas law to real gases at high pressure or low temperature.</li></ul>' },
      { icon:'✏️', title:'Exam Tips', html:'<ul><li>At STP (0 °C, 1 atm), 1 mole of ideal gas occupies 22.4 L.</li><li>Always check which R value is consistent with your units.</li></ul>' },
      { icon:'🌍', title:'Real-World Applications', html:'<ul><li><strong>Engineering:</strong> HVAC systems model air as an ideal gas.</li><li><strong>Chemistry lab:</strong> measuring gas evolved from reactions.</li><li><strong>Meteorology:</strong> atmospheric modelling.</li></ul>' },
    ],

    'panel-gas-graham': [
      { icon:'📘', title:'Concept Overview', html:'<p><strong>Graham\'s Law</strong>: lighter gases effuse (escape through a pinhole) or diffuse faster than heavier gases. The rate is inversely proportional to the <em>square root</em> of molar mass.</p>' },
      { icon:'📐', title:'Formula Explanation', html:'<p><strong>r₁/r₂ = √(M₂/M₁)</strong>. The faster gas (r₁) has the smaller molar mass (M₁). Squaring both sides gives the rate-squared ratio.</p>' },
      { icon:'🔤', title:'Variable Definitions', html:'<div class="edu-var-list"><div class="edu-var-row"><span class="edu-var-sym">r₁, r₂</span><div>Rates of effusion (any consistent unit)</div></div><div class="edu-var-row"><span class="edu-var-sym">M₁, M₂</span><div>Molar masses (g/mol)</div></div></div>' },
      { icon:'📏', title:'Units Used', html:'<ul><li>Rate: any unit (mol/s, mL/min) — units cancel in the ratio.</li><li>Molar mass: <strong>g/mol</strong></li></ul>' },
      { icon:'⚠️', title:'Common Mistakes', html:'<ul><li>Inverting the ratio — the lighter gas (smaller M) always effuses faster.</li><li>Forgetting the square root — rate is proportional to 1/√M, not 1/M.</li><li>Comparing effusion rates at different temperatures or pressures.</li></ul>' },
      { icon:'✏️', title:'Exam Tips', html:'<ul><li>Double the molar mass → rate decreases by factor of √2 ≈ 1.41.</li><li>The ratio only requires molar masses — actual rates are optional inputs.</li></ul>' },
      { icon:'🌍', title:'Real-World Applications', html:'<ul><li><strong>Uranium enrichment:</strong> UF₆ isotopes separated by gaseous diffusion.</li><li><strong>Smell spreading:</strong> lighter odour molecules diffuse faster.</li><li><strong>Helium leaking:</strong> helium escapes balloons faster than air (lower M).</li></ul>' },
    ],

    /* ── STOICHIOMETRY ── */
    'panel-stoich-yield': [
      { icon:'📘', title:'Concept Overview', html:'<p><strong>Percent yield</strong> measures how efficient a chemical reaction is. A value of 100% means all theoretical product was obtained; real reactions always yield less due to side reactions, incomplete reactions, or product loss.</p>' },
      { icon:'📐', title:'Formula Explanation', html:'<p><strong>% Yield = (Actual Yield ÷ Theoretical Yield) × 100</strong>. Rearranged: Actual = (% Yield × Theoretical) ÷ 100 or Theoretical = Actual ÷ (% Yield ÷ 100).</p>' },
      { icon:'🔤', title:'Variable Definitions', html:'<div class="edu-var-list"><div class="edu-var-row"><span class="edu-var-sym">Actual</span><div>Mass of product actually obtained (g)</div></div><div class="edu-var-row"><span class="edu-var-sym">Theoretical</span><div>Maximum mass predicted by stoichiometry (g)</div></div><div class="edu-var-row"><span class="edu-var-sym">% Yield</span><div>Efficiency of the reaction (%)</div></div></div>' },
      { icon:'📏', title:'Units Used', html:'<ul><li><strong>g</strong> — mass of actual and theoretical yield (must use same unit)</li><li><strong>%</strong> — percent yield (dimensionless ratio × 100)</li></ul>' },
      { icon:'⚠️', title:'Common Mistakes', html:'<ul><li>Swapping actual and theoretical yield in the formula.</li><li>Getting a % yield > 100% — indicates an error or impure product.</li><li>Not using the same mass unit for both yields.</li></ul>' },
      { icon:'✏️', title:'Exam Tips', html:'<ul><li>Theoretical yield comes from stoichiometric calculation using the limiting reagent.</li><li>% yield between 70–90% is considered good in most lab reactions.</li><li>Show the formula, substitution, and final value with % unit.</li></ul>' },
      { icon:'🌍', title:'Real-World Applications', html:'<ul><li><strong>Pharmaceutical manufacturing:</strong> optimising drug synthesis yield reduces cost.</li><li><strong>Industrial chemistry:</strong> Haber process ammonia yield is monitored closely.</li><li><strong>Green chemistry:</strong> maximising yield minimises waste.</li></ul>' },
    ],

    'panel-stoich-theoretical': [
      { icon:'📘', title:'Concept Overview', html:'<p><strong>Theoretical yield</strong> is the maximum product obtainable from a reaction, calculated from stoichiometry (in V1 of this calculator, derived from the % yield relationship). Actual yield is always ≤ theoretical yield.</p>' },
      { icon:'📐', title:'Formula Explanation', html:'<p><strong>Theoretical = Actual ÷ (% Yield ÷ 100)</strong>. Equivalently: Actual = Theoretical × (% Yield ÷ 100) and % Yield = (Actual ÷ Theoretical) × 100.</p>' },
      { icon:'🔤', title:'Variable Definitions', html:'<div class="edu-var-list"><div class="edu-var-row"><span class="edu-var-sym">Theoretical</span><div>Maximum mass obtainable (g)</div></div><div class="edu-var-row"><span class="edu-var-sym">Actual</span><div>Mass obtained experimentally (g)</div></div><div class="edu-var-row"><span class="edu-var-sym">% Yield</span><div>Reaction efficiency (%)</div></div></div>' },
      { icon:'📏', title:'Units Used', html:'<ul><li><strong>g</strong> — yield masses</li><li><strong>%</strong> — percent yield</li></ul>' },
      { icon:'⚠️', title:'Common Mistakes', html:'<ul><li>Using % yield as a decimal (e.g. 0.75) instead of a percentage (75) — causes a 100× error.</li><li>Confusing theoretical yield (maximum) with actual yield (measured).</li></ul>' },
      { icon:'✏️', title:'Exam Tips', html:'<ul><li>In a full stoichiometry problem, find theoretical yield from mole ratios and molar masses first, then calculate % yield.</li><li>Always verify: actual ≤ theoretical (% yield ≤ 100%).</li></ul>' },
      { icon:'🌍', title:'Real-World Applications', html:'<ul><li><strong>Research chemistry:</strong> comparing theoretical vs. actual yield guides reaction optimisation.</li><li><strong>Quality control:</strong> batch-to-batch yield monitoring in manufacturing.</li></ul>' },
    ],

    'panel-stoich-empirical': [
      { icon:'📘', title:'Concept Overview', html:'<p>The <strong>empirical formula</strong> gives the simplest whole-number ratio of atoms in a compound. It may or may not be the same as the molecular formula (e.g. CH₂O is the empirical formula of glucose C₆H₁₂O₆).</p>' },
      { icon:'📐', title:'Formula Explanation', html:'<p>Process: (1) mass → moles using atomic mass, (2) divide all moles by smallest, (3) round ratios to integers (multiply through if fractional), (4) write formula.</p>' },
      { icon:'🔤', title:'Variable Definitions', html:'<div class="edu-var-list"><div class="edu-var-row"><span class="edu-var-sym">m</span><div>Mass of each element (g)</div></div><div class="edu-var-row"><span class="edu-var-sym">M</span><div>Atomic mass of element (g/mol)</div></div><div class="edu-var-row"><span class="edu-var-sym">n</span><div>Moles of each element = m ÷ M</div></div><div class="edu-var-row"><span class="edu-var-sym">ratio</span><div>n ÷ n_min — normalised mole ratio</div></div></div>' },
      { icon:'📏', title:'Units Used', html:'<ul><li><strong>g</strong> — mass input</li><li><strong>g/mol</strong> — atomic mass</li><li><strong>mol</strong> — calculated moles</li><li>Subscripts — dimensionless integers</li></ul>' },
      { icon:'⚠️', title:'Common Mistakes', html:'<ul><li>Rounding too aggressively — 1.5 should become 3:2, not 2:2.</li><li>Not multiplying through to clear fractions (e.g. ×2 when ratio has 0.5).</li><li>Using percentage composition directly as grams (valid only when percentages sum to 100 — then assume 100 g sample).</li></ul>' },
      { icon:'✏️', title:'Exam Tips', html:'<ul><li>If given percentage composition, assume <strong>100 g sample</strong> — % becomes grams directly.</li><li>Common multipliers: ×2 for ratios near 1.5, ×3 for ratios near 1.33/1.67.</li><li>Always simplify by GCD before writing the formula.</li></ul>' },
      { icon:'🌍', title:'Real-World Applications', html:'<ul><li><strong>Analytical chemistry:</strong> combustion analysis determines C, H, O composition.</li><li><strong>Pharmaceuticals:</strong> empirical formula is required for drug identification.</li><li><strong>Materials science:</strong> ceramic and alloy stoichiometry.</li></ul>' },
    ],

    'panel-stoich-limiting': [
      { icon:'📘', title:'Concept Overview', html:'<p>The <strong>limiting reagent</strong> is the reactant that runs out first, stopping the reaction. It limits the amount of product formed. The other reactant is in <em>excess</em> — some of it remains unused.</p>' },
      { icon:'📐', title:'Formula Explanation', html:'<p>Divide each reactant\'s amount (mol) by its stoichiometric coefficient: <strong>Ratio = Amount ÷ Coefficient</strong>. The reactant with the <em>smaller ratio</em> is the limiting reagent.</p>' },
      { icon:'🔤', title:'Variable Definitions', html:'<div class="edu-var-list"><div class="edu-var-row"><span class="edu-var-sym">nₐ, n_b</span><div>Moles of Reactant A and B</div></div><div class="edu-var-row"><span class="edu-var-sym">a, b</span><div>Stoichiometric coefficients from balanced equation</div></div><div class="edu-var-row"><span class="edu-var-sym">Ratio</span><div>n ÷ coefficient — number of "reaction cycles" each reactant can sustain</div></div></div>' },
      { icon:'📏', title:'Units Used', html:'<ul><li><strong>mol</strong> — reactant amounts</li><li>Coefficients — dimensionless integers</li><li>Ratios — mol (dimensionless in context)</li></ul>' },
      { icon:'⚠️', title:'Common Mistakes', html:'<ul><li>Comparing moles directly without dividing by the stoichiometric coefficient.</li><li>Using mass (g) instead of moles — always convert first.</li><li>Forgetting to balance the equation before reading coefficients.</li></ul>' },
      { icon:'✏️', title:'Exam Tips', html:'<ul><li>Always work in <strong>moles</strong> — convert masses using molar mass first.</li><li>The limiting reagent determines the theoretical yield: moles of LR × mole ratio × molar mass of product.</li><li>Once identified, use only the LR\'s amount for all further calculations.</li></ul>' },
      { icon:'🌍', title:'Real-World Applications', html:'<ul><li><strong>Industrial synthesis:</strong> the cheaper reagent is often kept in excess; the expensive one is the limiting reagent.</li><li><strong>Cooking:</strong> if a recipe needs 2 eggs per cup of flour, whichever runs out first limits how many batches you can make.</li><li><strong>Rocket propulsion:</strong> fuel-to-oxidiser ratio is optimised to avoid excess.</li></ul>' },
    ],
  };

  // Inject all edu panels on load
  Object.entries(EDU).forEach(([panelId, sections]) => renderEdu(panelId, sections));



