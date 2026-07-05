/* ═══════════════════════════════════════════════════════════
   FORMULA HUB — moleConceptLogic.js
   MOLE CONCEPT MODULE LOGIC
   Sub-tab switching and solve-for wiring for the Mole Concept module (calculators live in moleCalculators.js).
═══════════════════════════════════════════════════════════ */

  /* ═══════════════════════════════════════════════
     MOLE CONCEPT MODULE LOGIC
  ═══════════════════════════════════════════════ */

  const NA = 6.02214076e23;

  // ── View switching ──
  function showView(view) {
    const libraryEls = ['catGrid','formulaGrid','formulaGridLabel','hubHint'];
    const statsRow   = document.querySelector('.stats-row');
    const moleModule = document.getElementById('moleModule');
    const solModule  = document.getElementById('solModule');
    const gasModule  = document.getElementById('gasModule');
    const acidsModule  = document.getElementById('acidsModule');
    const stoichModule  = document.getElementById('stoichModule');
    const recentModule    = document.getElementById('recentModule');
    const bookmarksModule = document.getElementById('bookmarksModule');
    const csModule        = document.getElementById('comingSoonModule');

    libraryEls.forEach(id => { const el = document.getElementById(id); if (el) el.style.display = 'none'; });
    document.querySelectorAll('.section-head').forEach(el => el.style.display = 'none');
    if (statsRow) statsRow.style.display = 'none';
    moleModule.classList.remove('visible');
    solModule.classList.remove('visible');
    gasModule.classList.remove('visible');
    acidsModule.classList.remove('visible');
    stoichModule.classList.remove('visible');
    recentModule.classList.remove('visible');
    bookmarksModule.classList.remove('visible');
    csModule.classList.remove('visible');

    if (view === 'mole-module') {
      moleModule.classList.add('visible');
    } else if (view === 'sol-module') {
      solModule.classList.add('visible');
    } else if (view === 'gas-module') {
      gasModule.classList.add('visible');
    } else if (view === 'acids-module') {
      acidsModule.classList.add('visible');
    } else if (view === 'stoich-module') {
      stoichModule.classList.add('visible');
    } else if (view === 'recent-module') {
      recentModule.classList.add('visible');
    } else if (view === 'bookmarks-module') {
      bookmarksModule.classList.add('visible');
    } else if (view === 'coming-soon') {
      csModule.classList.add('visible');
    } else {
      // library
      libraryEls.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        if (id === 'hubHint' && el.dataset.dismissed === 'true') return;
        el.style.display = '';
      });
      document.querySelectorAll('.section-head').forEach(el => el.style.display = '');
      if (statsRow) statsRow.style.display = '';
    }
  }

  function updatePageMeta() {
    const meta = CAT_META[activeCategory] || CAT_META.all;
    const count = getFiltered().length;
    document.getElementById('breadcrumbActive').textContent = meta.label;
    document.getElementById('pageSubtitle').textContent     = meta.subtitle;
    document.getElementById('formulaGridLabel').textContent = meta.label + ' (' + count + ')';
    const [w1, ...rest] = meta.label.split(' ');
    document.getElementById('pageTitle').innerHTML =
      rest.length ? `${w1} <em>${rest.join(' ')}</em>` : `<em>${w1}</em>`;
  }

  // Ensures sidebar nav, category cards, breadcrumb and title are all in sync for the given category
  function syncActiveNav(cat) {
    activeCategory = cat;
    document.querySelectorAll('.nav-item[data-category]').forEach(el =>
      el.classList.toggle('active', el.dataset.category === cat));
    document.querySelectorAll('.cat-card[data-category]').forEach(el =>
      el.classList.toggle('active', el.dataset.category === cat));
    updatePageMeta();
  }

  // Override mole category to show module instead
  function setCategory(cat) {
    syncActiveNav(cat);
    if (cat === 'mole') {
      showView('mole-module');
      activateMoleTab(document.querySelector('#moleModule .mol-tab.active')?.dataset.panel || 'mole-calc');
    } else if (cat === 'solutions') {
      showView('sol-module');
      activateSolTab(document.querySelector('#solModule .mol-tab.active')?.dataset.solPanel || 'sol-molarity');
    } else if (cat === 'gas') {
      showView('gas-module');
      activateGasTab(document.querySelector('#gasModule .mol-tab.active')?.dataset.gasPanel || 'gas-boyle');
    } else if (cat === 'acids') {
      showView('acids-module');
      activateAcidTab(document.querySelector('#acidsModule .mol-tab.active')?.dataset.acidPanel || 'acid-ph');
    } else if (cat === 'stoichiometry') {
      showView('stoich-module');
      activateStoichTab(document.querySelector('#stoichModule .mol-tab.active')?.dataset.stoichPanel || 'stoich-yield');
    } else if (cat === 'recent') {
      showView('recent-module');
      setBreadcrumbSub(null);
      renderRecentCalcs();
    } else if (cat === 'bookmarks') {
      showView('bookmarks-module');
      setBreadcrumbSub(null);
      renderBookmarks();
    } else if (COMING_SOON_META[cat]) {
      const meta = COMING_SOON_META[cat];
      document.getElementById('csIcon').textContent  = meta.icon;
      document.getElementById('csTitle').textContent = meta.title;
      document.getElementById('csText').textContent  = meta.text;
      setBreadcrumbSub(null);
      showView('coming-soon');
    } else {
      setBreadcrumbSub(null);
      showView('library');
      renderCards();
    }
  }

