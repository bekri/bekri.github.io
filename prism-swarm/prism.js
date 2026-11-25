(() => {
  const root = document.documentElement;
  const slides = [...document.querySelectorAll('.slide')];
  const bar = document.getElementById('bar');
  const small = matchMedia('(max-width:900px)');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const clamp = (v) => Math.max(0, Math.min(1, v));
  const ease = (t) => 1 - Math.pow(1 - t, 3);
  const store = (k, v) => { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) {} return null; };

  // ---- sound: off until the visitor turns it on (browsers block it anyway) ----
  const SFX = '../media/prism-swarm/sfx/';
  let ctx = null, gain = null, music = null, soundOn = false;
  const buffers = {};
  const load = (n) => buffers[n] || (buffers[n] = fetch(SFX + n).then((r) => r.arrayBuffer()).then((b) => ctx.decodeAudioData(b)).catch(() => null));
  const play = (n, vol = 0.5) => {
    if (!soundOn || !ctx) return;
    load(n + '.mp3').then((buf) => {
      if (!buf || !soundOn) return;
      const s = ctx.createBufferSource(), g = ctx.createGain();
      s.buffer = buf; g.gain.value = vol; s.connect(g).connect(gain); s.start();
    });
  };
  const ogg = new Audio().canPlayType('audio/ogg; codecs=vorbis') ? 'music.ogg' : 'music.mp3'; // ogg loops without a gap
  const startMusic = () => load(ogg).then((buf) => {
    if (!buf || !soundOn || music) return;
    music = ctx.createBufferSource(); const g = ctx.createGain();
    music.buffer = buf; music.loop = true; g.gain.value = 0.28;
    music.connect(g).connect(gain); music.start();
  });
  const soundBtn = document.getElementById('soundBtn'), soundLbl = document.getElementById('soundLbl');
  const setSound = (on) => {
    soundOn = on;
    soundBtn.setAttribute('aria-pressed', String(on));
    soundLbl.textContent = on ? 'Sound on' : 'Sound off';
    store('prism-sound', on ? '1' : '0');
    if (on) {
      if (!ctx) { ctx = new (window.AudioContext || window.webkitAudioContext)(); gain = ctx.createGain(); gain.connect(ctx.destination); }
      ctx.resume(); startMusic(); play('levelup', 0.4);
    } else if (music) { music.stop(); music = null; }
  };
  soundBtn.addEventListener('click', () => setSound(!soundOn));
  // a returning visitor who chose sound gets it back on their first tap
  if (store('prism-sound') === '1') addEventListener('pointerdown', () => soundOn || setSound(true), { once: true });

  // ---- your color ----
  let me = 0;
  const dots = [...document.querySelectorAll('.dot')];
  const setColor = (c, quiet) => {
    me = c; root.dataset.c = c;
    dots.forEach((d) => d.setAttribute('aria-pressed', String(+d.dataset.c === c)));
    if (!quiet) play('swap', 0.5);
  };
  dots.forEach((d) => d.addEventListener('click', () => setColor(+d.dataset.c)));
  addEventListener('keydown', (e) => { if (['1', '2', '3'].includes(e.key)) setColor(+e.key - 1); });

  // ---- pause motion ----
  const motionBtn = document.getElementById('motionBtn');
  const setPaused = (p) => {
    root.classList.toggle('paused', p);
    motionBtn.setAttribute('aria-pressed', String(p));
    motionBtn.textContent = p ? 'Animate' : 'Pause';
    store('prism-paused', p ? '1' : '0');
    document.querySelectorAll('video.clip').forEach((v) => p && v.pause());
    requestAnimationFrame(update);
  };
  motionBtn.addEventListener('click', () => setPaused(!root.classList.contains('paused')));

  // ---- the swarm: glowing shapes you can pop by matching their color ----
  const cv = document.getElementById('swarm'), g2 = cv.getContext('2d');
  const RGB = ['255,77,99', '77,255,136', '92,157,255'];
  let W = 0, H = 0, dpr = 1, mx = -1e4, my = -1e4, sparks = [], shapes = [], combo = 0, comboT = 0;
  const spawn = (s, edge) => {
    s.c = Math.floor(Math.random() * 3); s.k = Math.floor(Math.random() * 3);
    s.r = 5 + Math.random() * 7; s.a = Math.random() * 6.28; s.spin = (Math.random() - 0.5) * 0.02;
    s.vx = (Math.random() - 0.5) * 0.4; s.vy = (Math.random() - 0.5) * 0.4;
    if (edge) { const side = Math.random() < 0.5; s.x = side ? (Math.random() < 0.5 ? -20 : W + 20) : Math.random() * W; s.y = side ? Math.random() * H : (Math.random() < 0.5 ? -20 : H + 20); }
    else { s.x = Math.random() * W; s.y = Math.random() * H; }
    return s;
  };
  const resize = () => {
    dpr = Math.min(2, devicePixelRatio || 1); W = innerWidth; H = innerHeight;
    cv.width = W * dpr; cv.height = H * dpr; g2.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round(Math.min(90, W * H / 16000));
    while (shapes.length < n) shapes.push(spawn({}));
    shapes.length = n;
  };
  const shape = (s, alpha) => {
    g2.save(); g2.translate(s.x, s.y); g2.rotate(s.a);
    g2.strokeStyle = `rgba(${RGB[s.c]},${alpha})`; g2.lineWidth = 2; g2.beginPath();
    if (s.k === 0) { g2.moveTo(0, -s.r); g2.lineTo(s.r * 0.87, s.r * 0.5); g2.lineTo(-s.r * 0.87, s.r * 0.5); g2.closePath(); }
    else if (s.k === 1) g2.rect(-s.r * 0.8, -s.r * 0.8, s.r * 1.6, s.r * 1.6);
    else g2.arc(0, 0, s.r * 0.85, 0, 6.28);
    g2.stroke(); g2.restore();
  };
  const pop = (x, y) => {
    let hit = 0;
    shapes.forEach((s) => {
      if (s.c !== me || Math.hypot(s.x - x, s.y - y) > 110) return;
      hit++;
      for (let i = 0; i < 8; i++) {
        const a = Math.random() * 6.28, v = 1 + Math.random() * 3;
        sparks.push({ x: s.x, y: s.y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: 1, c: s.c });
      }
      spawn(s, true);
    });
    sparks.push({ ring: true, x, y, life: 1, c: me });
    if (hit) { combo += hit; comboT = 120; play(hit > 2 ? 'kill' : 'pickup', 0.45); } else play('pickup', 0.15);
  };
  cv.addEventListener('pointerdown', (e) => pop(e.clientX, e.clientY));
  addEventListener('pointermove', (e) => { mx = e.clientX; my = e.clientY; }, { passive: true });
  addEventListener('pointerleave', () => { mx = my = -1e4; });

  const comboEl = document.getElementById('combo');
  const frame = () => {
    const still = root.classList.contains('paused') || reduce.matches;
    g2.clearRect(0, 0, W, H);
    shapes.forEach((s) => {
      if (!still) {
        // a lazy swarm: drift, and lean toward the cursor like the game's monsters chase you
        const dx = mx - s.x, dy = my - s.y, d = Math.hypot(dx, dy);
        if (d < 380 && d > 30) { s.vx += dx / d * 0.012; s.vy += dy / d * 0.012; }
        s.vx *= 0.985; s.vy *= 0.985; s.x += s.vx + Math.sin(s.a) * 0.15; s.y += s.vy; s.a += s.spin;
        if (s.x < -40 || s.x > W + 40 || s.y < -40 || s.y > H + 40) spawn(s, true);
      }
      const mine = s.c === me;
      g2.shadowBlur = mine ? 14 : 0; g2.shadowColor = `rgba(${RGB[s.c]},1)`;
      shape(s, mine ? 0.85 : 0.2);
    });
    g2.shadowBlur = 0;
    sparks = sparks.filter((p) => {
      p.life -= p.ring ? 0.035 : 0.03;
      if (p.life <= 0) return false;
      if (p.ring) { g2.strokeStyle = `rgba(${RGB[p.c]},${p.life})`; g2.lineWidth = 2; g2.beginPath(); g2.arc(p.x, p.y, (1 - p.life) * 110, 0, 6.28); g2.stroke(); }
      else { p.x += p.vx; p.y += p.vy; p.vx *= 0.95; p.vy *= 0.95; g2.fillStyle = `rgba(${RGB[p.c]},${p.life})`; g2.fillRect(p.x - 1.5, p.y - 1.5, 3, 3); }
      return true;
    });
    if (comboT > 0 && --comboT === 0) combo = 0;
    requestAnimationFrame(frame);
  };

  // leader lines from pins on the screenshot to the callouts
  const drawLeaders = (s, b) => {
    const svg = s.querySelector('.leaders');
    if (!svg) return;
    const box = svg.getBoundingClientRect(), pins = [...s.querySelectorAll('.pin')];
    let html = '';
    pins.forEach((pin, i) => {
      const li = document.getElementById(pin.dataset.for);
      const t = clamp(b * pins.length * 1.25 - i);
      pin.classList.toggle('on', t > 0);
      li.classList.toggle('lit', t > 0);
      li.classList.toggle('on', t >= 1);
      if (t <= 0 || small.matches) return;
      const a = pin.getBoundingClientRect(), c = li.getBoundingClientRect();
      const x1 = a.left + a.width / 2 - box.left, y1 = a.top + a.height / 2 - box.top;
      const x2 = c.left - box.left - 4, y2 = c.top + c.height / 2 - box.top;
      // a HUD-style elbow: a 45 degree jog, then straight across, like a targeting line
      const dy = y2 - y1, jog = Math.min(Math.abs(dy), Math.max(0, x2 - x1 - 20)), ex = x1 + jog, ey = y1 + Math.sign(dy) * jog;
      html += `<path d="M${x1},${y1} L${ex},${ey} L${ex},${y2} L${x2},${y2}" pathLength="1" stroke-dasharray="1" stroke-dashoffset="${1 - ease(t)}"/>`;
      if (t >= 1) html += `<rect x="${x2 - 4}" y="${y2 - 4}" width="8" height="8" transform="rotate(45 ${x2} ${y2})"/>`;
    });
    svg.innerHTML = html;
  };

  // ---- pinned scenes (same engine as the NARSA presentation) ----
  const size = () => slides.forEach((s) => { s.style.height = small.matches ? '' : `${parseFloat(s.dataset.len || 2) * 100}vh`; });
  const lv = document.getElementById('lv'), lvName = document.getElementById('lvName');
  let level = -1, ticking = false;
  function update() {
    ticking = false;
    const vh = innerHeight, max = root.scrollHeight - vh;
    bar.style.setProperty('--prog', max > 0 ? scrollY / max : 0);
    const still = root.classList.contains('paused') || small.matches;
    slides.forEach((s, i) => {
      const r = s.getBoundingClientRect();
      if (r.top <= vh * 0.5 && r.bottom > vh * 0.5 && level !== i) {
        const up = i > level && level >= 0;
        level = i; lv.textContent = `LV ${i + 1}`; lvName.textContent = s.dataset.name;
        if (up) play(s.id === 's4' ? 'warn' : s.id === 's8' ? 'win' : 'levelup', 0.35);
      }
      if (r.bottom < -vh || r.top > vh * 2) return;
      let a = 1, b = 1;
      if (!still) {
        a = ease(clamp((vh * 0.75 - r.top) / (vh * 0.95)));
        b = clamp(-r.top / (Math.max(1, r.height - vh) * 0.85));
      }
      s.style.setProperty('--a', a.toFixed(4));
      s.style.setProperty('--b', b.toFixed(4));
      drawLeaders(s, b);
      if (s.id === 's5') comboEl.textContent = Math.round(ease(b) * 128) + combo;
      const v = s.querySelector('video.clip');
      if (v) {
        if (r.top < vh && r.bottom > 0 && !root.classList.contains('paused')) { v.preload = 'auto'; v.play().catch(() => {}); }
        else v.pause();
      }
    });
  }
  const req = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  addEventListener('scroll', req, { passive: true });
  addEventListener('resize', () => { resize(); size(); req(); });
  small.addEventListener('change', () => { size(); req(); });
  document.querySelectorAll('img').forEach((i) => i.complete || i.addEventListener('load', req, { once: true }));

  setColor(0, true);
  if (reduce.matches || store('prism-paused') === '1') setPaused(true);
  resize(); size(); update(); frame();
  requestAnimationFrame(() => root.classList.add('ready'));
})();
