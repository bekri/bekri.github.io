(() => {
  const root = document.documentElement;
  const slides = [...document.querySelectorAll('.slide')];
  const bar = document.getElementById('bar');
  const small = matchMedia('(max-width:900px)');
  const clamp = (v) => Math.max(0, Math.min(1, v));
  const ease = (t) => 1 - Math.pow(1 - t, 3);

  // language
  const langBtn = document.getElementById('langBtn');
  const setLang = (l) => {
    root.dataset.lang = l; root.lang = l;
    langBtn.textContent = l === 'fr' ? 'EN' : 'FR';
    langBtn.setAttribute('aria-label', l === 'fr' ? 'Switch to English' : 'Passer en français');
    try { localStorage.setItem('narsa-lang', l); } catch (e) {}
    requestAnimationFrame(update);
  };
  let saved = null; try { saved = localStorage.getItem('narsa-lang'); } catch (e) {}
  setLang(saved === 'en' || saved === 'fr' ? saved : 'fr');
  langBtn.addEventListener('click', () => setLang(root.dataset.lang === 'fr' ? 'en' : 'fr'));

  // pause motion
  const motionBtn = document.getElementById('motionBtn');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const setPaused = (p) => {
    root.classList.toggle('paused', p);
    motionBtn.setAttribute('aria-pressed', String(p));
    motionBtn.querySelectorAll('span').forEach((s) => {
      s.textContent = p ? (s.lang === 'fr' ? 'Animer' : 'Animate') : 'Pause';
    });
    document.querySelectorAll('video.led').forEach((v) => (p ? v.pause() : null));
    requestAnimationFrame(update);
  };
  motionBtn.addEventListener('click', () => setPaused(!root.classList.contains('paused')));
  if (reduce.matches) setPaused(true);

  // scene lengths
  const size = () => slides.forEach((s) => {
    s.style.height = small.matches ? '' : `${parseFloat(s.dataset.len || 2) * 100}vh`;
  });

  // leader lines from pins on the shot to swatches
  const drawLeaders = (s, b) => {
    const svg = s.querySelector('.leaders');
    if (!svg) return;
    const box = svg.getBoundingClientRect();
    const pins = [...s.querySelectorAll('.pin')];
    let html = '';
    pins.forEach((pin, i) => {
      const li = document.getElementById(pin.dataset.for);
      const t = clamp(b * pins.length * 1.25 - i);
      pin.classList.toggle('on', t > 0);
      li.classList.toggle('on', t >= 1);
      if (t <= 0 || small.matches) return;
      const a = pin.getBoundingClientRect(), c = li.getBoundingClientRect();
      const x1 = a.left + a.width / 2 - box.left, y1 = a.top + a.height / 2 - box.top;
      const x2 = c.left - box.left - 4, y2 = c.top + c.height / 2 - box.top;
      const mx = x1 + (x2 - x1) * 0.55;
      const d = `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`;
      html += `<path d="${d}" pathLength="1" stroke-dasharray="1" stroke-dashoffset="${1 - ease(t)}"/>`;
      if (t >= 1) html += `<circle cx="${x2}" cy="${y2}" r="3"/>`;
    });
    svg.innerHTML = html;
  };

  let ticking = false;
  function update() {
    ticking = false;
    const vh = innerHeight;
    const max = document.documentElement.scrollHeight - vh;
    bar.style.setProperty('--prog', max > 0 ? scrollY / max : 0);
    const still = root.classList.contains('paused') || small.matches;
    slides.forEach((s) => {
      const r = s.getBoundingClientRect();
      if (r.bottom < -vh || r.top > vh * 2) return;
      let a = 1, b = 1;
      if (!still) {
        // a: entry, completes once the scene has pinned a little
        a = ease(clamp((vh * 0.75 - r.top) / (vh * 0.95)));
        // b: dwell progress while pinned
        const span = Math.max(1, r.height - vh);
        b = clamp(-r.top / (span * 0.85));
      }
      s.style.setProperty('--a', a.toFixed(4));
      s.style.setProperty('--b', b.toFixed(4));
      drawLeaders(s, b);
      const v = s.querySelector('video.led');
      if (v) {
        const vis = r.top < vh && r.bottom > 0;
        if (vis && !root.classList.contains('paused')) { v.preload = 'auto'; v.play().catch(() => {}); }
        else v.pause();
      }
    });
  }
  const req = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  addEventListener('scroll', req, { passive: true });
  addEventListener('resize', () => { size(); req(); });
  small.addEventListener('change', () => { size(); req(); });
  document.querySelectorAll('img').forEach((i) => i.complete || i.addEventListener('load', req, { once: true }));

  // catalogue
  const R = [
    ['22_cinematique','Vue cinématique','Cinematic view'],['21_vue_face','Vue de face','Front view'],
    ['23_vue_aerienne','Vue aérienne','Aerial view'],['20_plan','Plan','Floor plan'],
    ['01_accueil_desk','Comptoir d’accueil','Reception counter'],['02_accueil_borne_tactile','Borne tactile','Touch kiosk'],
    ['03_desk_serrure','Rangement verrouillable','Lockable storage'],['04_portrait_officiel','Portrait officiel','Official portrait'],
    ['05_drapeau','Drapeau','Flag'],['06_ecran_led_son','Écran LED et son','LED screen and sound'],
    ['07_salon','Salon marocain','Moroccan lounge'],['14_espace_the','Espace thé','Tea corner'],
    ['16_berrad','Berrad en argent','Silver teapot (berrad)'],['13_table_the','Table à thé','Tea table'],
    ['12_gateaux_beldi','Gâteaux marocains','Moroccan pastries'],['11_cafe_eau','Café et eau','Coffee and water'],
    ['08_visuels_retroeclaires','Visuels rétroéclairés','Backlit graphics'],['09_carte_relief','Carte en relief','Relief map'],
    ['10_reserve','Réserve','Storage room'],['15_enseigne','Enseigne suspendue','Hanging sign']
  ];
  const cat = document.getElementById('cat'), grid = document.getElementById('catGrid');
  const viewer = document.getElementById('viewer'), vImg = document.getElementById('vImg');
  const vCap = document.getElementById('vCap'), vCount = document.getElementById('vCount');
  const L = () => (root.dataset.lang === 'en' ? 2 : 1);
  let idx = 0, opener = null;
  const renderGrid = () => {
    grid.innerHTML = R.map((r, i) => `<li><button type="button" data-i="${i}"><img loading="lazy" src="../media/narsa/${r[0]}-960.webp" alt=""><span>${r[L()]}</span></button></li>`).join('');
  };
  const show = (i) => {
    idx = (i + R.length) % R.length;
    const r = R[idx];
    vImg.classList.remove('v-in'); void vImg.offsetWidth;
    vImg.src = `../media/narsa/${r[0]}-1920.webp`; vImg.alt = r[L()];
    vImg.classList.add('v-in');
    vCap.textContent = r[L()];
    vCount.textContent = `${idx + 1} / ${R.length}`;
    new Image().src = `../media/narsa/${R[(idx + 1) % R.length][0]}-1920.webp`;
  };
  const openViewer = (i, btn) => { opener = btn; viewer.hidden = false; show(i); document.getElementById('vNext').focus(); };
  const closeViewer = () => { viewer.hidden = true; if (opener) opener.focus(); };
  document.getElementById('catOpen').addEventListener('click', () => { renderGrid(); cat.showModal(); });
  cat.querySelector('[data-close]').addEventListener('click', () => cat.close());
  grid.addEventListener('click', (e) => { const b = e.target.closest('button[data-i]'); if (b) openViewer(+b.dataset.i, b); });
  document.getElementById('vPrev').addEventListener('click', () => show(idx - 1));
  document.getElementById('vNext').addEventListener('click', () => show(idx + 1));
  document.getElementById('vBack').addEventListener('click', closeViewer);
  cat.addEventListener('cancel', (e) => { if (!viewer.hidden) { e.preventDefault(); closeViewer(); } });
  cat.addEventListener('keydown', (e) => {
    if (viewer.hidden) return;
    if (e.key === 'ArrowRight') show(idx + 1);
    if (e.key === 'ArrowLeft') show(idx - 1);
  });
  let x0 = null;
  viewer.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
  viewer.addEventListener('touchend', (e) => {
    if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; x0 = null;
    if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1));
  });
  langBtn.addEventListener('click', () => { if (cat.open) { renderGrid(); if (!viewer.hidden) show(idx); } });

  size(); update();
  requestAnimationFrame(() => root.classList.add('ready'));
  document.body.classList.add('ready');
})();
