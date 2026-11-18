/* Mouna AI · motion + UI core (anime.js v4) */
(function () {
  'use strict';
  const A = window.anime;
  const root = document.documentElement;
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const OK = !!A && !RM;
  if (!OK) { root.classList.remove('anim'); root.classList.add('no-anim'); }
  window.__khzReady = true;

  /* ---------------- Icons (24px, 1.75 stroke) ---------------- */
  const P = {
    home: '<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/>',
    pantry: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M4 9h16M4 15h16M10 6h4M10 12h4M10 18h4"/>',
    cart: '<circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2.5 3h2.6l2.3 11.2a1.6 1.6 0 0 0 1.6 1.3h8.3a1.6 1.6 0 0 0 1.6-1.2L21 7H6"/>',
    orders: '<path d="M6 2h12a1 1 0 0 1 1 1v18l-3-2-2 2-2-2-2 2-2-2-3 2V3a1 1 0 0 1 1-1z"/><path d="M9 7h6M9 11h6M9 15h3"/>',
    more: '<circle cx="5" cy="12" r="1.6" fill="currentColor"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/><circle cx="19" cy="12" r="1.6" fill="currentColor"/>',
    bell: '<path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.9 1.9 0 0 0 3.4 0"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.6-3.6"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    left: '<path d="m15 18-6-6 6-6"/>',
    right: '<path d="m9 18 6-6-6-6"/>',
    down: '<path d="m6 9 6 6 6-6"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    truck: '<path d="M2 6h11v10H2zM13 9h4.5L21 12.5V16h-8"/><circle cx="6.5" cy="17.5" r="1.8"/><circle cx="16.5" cy="17.5" r="1.8"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><circle cx="17" cy="9" r="2.6"/><path d="M16.5 14.2A5 5 0 0 1 21.5 19"/>',
    house: '<path d="M3 11 12 4l9 7"/><path d="M5 9.5V20h14V9.5"/><path d="M10 20v-5h4v5"/>',
    lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    spark: '<path d="M12 2l2.2 6.6L21 11l-6.8 2.3L12 20l-2.2-6.7L3 11l6.8-2.4z" fill="currentColor" stroke="none"/>',
    qr: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM20 14v.01M14 20h.01M17 17h4v4h-4"/>',
    scan: '<path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M7 8v8M10 8v8M13 8v8M17 8v8"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    alert: '<path d="M12 3 2 20h20z"/><path d="M12 10v4M12 17v.01"/>',
    trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13"/>',
    grid: '<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',
    list: '<path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    star: '<path d="m12 3 2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 16.8 6.6 19.7l1.1-6.1L3.2 9.4l6.1-.8z"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    tag: '<path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9z"/><circle cx="7.5" cy="7.5" r="1.4"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    printer: '<path d="M6 9V3h12v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M6 14h12v7H6z"/>',
    box: '<path d="M21 8 12 3 3 8v8l9 5 9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/>',
    store: '<path d="M3 9l1.5-5h15L21 9"/><path d="M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0"/><path d="M5 12v9h14v-9"/><path d="M10 21v-5h4v5"/>',
    brain: '<path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 3 3h0a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3z"/><path d="M15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-3 3h0a3 3 0 0 1-3-3"/>',
    upload: '<path d="M12 16V4M7 9l5-5 5 5"/><path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    undo: '<path d="M9 14 4 9l5-5"/><path d="M4 9h11a5 5 0 0 1 0 10h-3"/>',
    copy: '<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>',
    /* products */
    milk: '<path d="M8 2h8v3l2 3v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8l2-3z"/><path d="M6 8h12M8 5h8"/><path d="M9.5 13h5v4h-5z"/>',
    oil: '<path d="M10 2h4v3l1.8 2.6V20a2 2 0 0 1-2 2h-3.6a2 2 0 0 1-2-2V7.6L10 5z"/><path d="M8.2 12h7.6M8.2 17h7.6"/>',
    rice: '<path d="M7.5 6.5C7 5 9 3 12 3s5 2 4.5 3.5c1.9 1.6 3 4.2 3 7.5 0 4.8-3.2 7-7.5 7s-7.5-2.2-7.5-7c0-3.3 1.1-5.9 3-7.5z"/><path d="M8 7h8"/><path d="M10 12.5c.6.8 1.3.8 2 0s1.4-.8 2 0"/>',
    bread: '<path d="M6 10.5A3.5 3.5 0 0 1 4.5 4C6.3 3.3 9 3 12 3s5.7.3 7.5 1A3.5 3.5 0 0 1 18 10.5V19a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z"/><path d="M10 9l1.5 2M13 9l1.5 2"/>',
    yogurt: '<path d="M5.5 8h13l-1.4 12a2 2 0 0 1-2 1.8H8.9a2 2 0 0 1-2-1.8z"/><path d="M4 4.5h16V8H4z"/><path d="M7 13h10"/>',
    egg: '<path d="M12 3c3.6 0 6.3 5.2 6.3 9.6A6.3 6.3 0 0 1 5.7 12.6C5.7 8.2 8.4 3 12 3z"/>',
    tea: '<path d="M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"/><path d="M17 10.5h1.5a2.5 2.5 0 0 1 0 5H17"/><path d="M8 3v3M12 3v3"/>',
    sugar: '<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M12 12l8-4.5M12 12v9M12 12 4 7.5"/>',
    tuna: '<ellipse cx="12" cy="7" rx="8" ry="3"/><path d="M4 7v10c0 1.7 3.6 3 8 3s8-1.3 8-3V7"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
    cheese: '<path d="M3 15 15 6l6 4v8H3z"/><path d="M3 15h18"/><circle cx="9" cy="17.6" r=".9"/><circle cx="15" cy="12" r=".9"/>',
    butter: '<path d="M3 11.5 7 7.5h14v7.5l-4 4H3z"/><path d="M3 11.5h14V19M17 11.5l4-4"/>',
    ghee: '<path d="M7 3h10v3H7z"/><path d="M6 6h12v13a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z"/><path d="M6 11h12"/>',
    beans: '<path d="M8.5 4.5c2.5-1 5 .5 5 3s-2 3-2.5 5.5S12.5 18 10 19.5s-6-1-6-6 2-8 4.5-9z"/><path d="M17.5 8.5c1.8.4 3 2.2 2.4 4.4-.5 2.1-2.4 2.6-3.1 4.1s.1 3-1.5 3.4"/>'
  };
  function icon(name, cls) {
    return '<svg class="ic ' + (cls || '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (P[name] || '') + '</svg>';
  }
  function hydrateIcons(scope) {
    (scope || document).querySelectorAll('i[data-i]').forEach(function (el) {
      const t = document.createElement('template');
      t.innerHTML = icon(el.dataset.i, el.className);
      el.replaceWith(t.content.firstChild);
    });
  }

  /* ---------------- i18n ---------------- */
  const LKEY = 'khz-lang';
  function getLang() {
    const q = new URLSearchParams(location.search).get('lang');
    if (q === 'ar' || q === 'en') return q;
    try { return localStorage.getItem(LKEY) || 'en'; } catch (e) { return 'en'; }
  }
  function setLangAttr(lang) {
    root.lang = lang; root.dir = lang === 'ar' ? 'rtl' : 'ltr';
    try { localStorage.setItem(LKEY, lang); } catch (e) {}
  }
  /* Elements: data-t="key" (text/HTML), data-t-attr="placeholder:key,aria-label:key" */
  function applyDict(dict, scope) {
    (scope || document).querySelectorAll('[data-t]').forEach(function (el) {
      if (!el.dataset.en) el.dataset.en = el.innerHTML;
      const v = dict ? dict[el.dataset.t] : null;
      el.innerHTML = v != null ? v : el.dataset.en;
      delete el.dataset.splitDone; el.classList.remove('split');
    });
    (scope || document).querySelectorAll('[data-t-attr]').forEach(function (el) {
      el.dataset.tAttr.split(',').forEach(function (pair) {
        const kv = pair.split(':'); const attr = kv[0].trim(); const key = kv[1].trim();
        const store = 'en' + attr.replace(/[^a-z]/gi, '');
        if (!(store in el.dataset)) el.dataset[store] = el.getAttribute(attr) || '';
        const v = dict ? dict[key] : null;
        el.setAttribute(attr, v != null ? v : el.dataset[store]);
      });
    });
  }

  /* ---------------- Text split (words only: Arabic letters must stay joined) ---------------- */
  function split(el) {
    if (!el || el.dataset.splitDone === root.lang) return el ? el.querySelectorAll('.wi') : [];
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const nodes = []; let n;
    while ((n = walker.nextNode())) { if (!n.parentElement.closest('.w')) nodes.push(n); }
    nodes.forEach(function (node) {
      const parts = node.textContent.split(/(\s+)/);
      const frag = document.createDocumentFragment();
      parts.forEach(function (p) {
        if (!p) return;
        if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(' ')); return; }
        const w = document.createElement('span'); w.className = 'w';
        const wi = document.createElement('span'); wi.className = 'wi'; wi.textContent = p;
        w.appendChild(wi); frag.appendChild(w);
      });
      node.replaceWith(frag);
    });
    el.classList.add('split'); el.dataset.splitDone = root.lang;
    return el.querySelectorAll('.wi');
  }
  function splitIn(el, opts) {
    const words = split(el);
    if (!OK) return null;
    return A.animate(words, Object.assign({ y: ['105%', '0%'], duration: 900, delay: A.stagger(55), ease: 'out(4)' }, opts || {}));
  }

  /* ---------------- Scroll reveal ---------------- */
  function revealEl(el) {
    if (el.dataset.revealed) return; el.dataset.revealed = '1';
    if (!OK) return;
    const d = +(el.dataset.delay || 0);
    if (el.hasAttribute('data-reveal-group')) {
      A.animate(el.children, { opacity: [0, 1], y: [18, 0], duration: 800, delay: A.stagger(80, { start: d }), ease: 'out(4)' });
    } else if (el.hasAttribute('data-split')) {
      A.utils.set(el, { opacity: 1 });
      splitIn(el, { delay: A.stagger(45, { start: d }) });
    } else {
      const kind = el.dataset.reveal || 'up';
      const from = kind === 'scale' ? { scale: [.96, 1] } : kind === 'fade' ? {} : { y: [22, 0] };
      A.animate(el, Object.assign({ opacity: [0, 1], duration: 900, delay: d, ease: 'out(4)' }, from));
    }
    el.dispatchEvent(new CustomEvent('reveal'));
  }
  let io;
  function watchReveals(scope) {
    const els = (scope || document).querySelectorAll('[data-reveal],[data-reveal-group]');
    if (!OK || !('IntersectionObserver' in window)) { els.forEach(function (e) { e.dataset.revealed = '1'; e.dispatchEvent(new CustomEvent('reveal')); }); return; }
    if (!io) io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { io.unobserve(en.target); revealEl(en.target); } });
    }, { rootMargin: '0px 0px -12% 0px', threshold: .01 });
    els.forEach(function (e) {
      if (e.hasAttribute('data-split')) split(e);
      io.observe(e);
    });
  }
  /* Run cb when element enters viewport (once or every time) */
  function onView(el, cb, opts) {
    opts = opts || {};
    if (!('IntersectionObserver' in window)) { cb(true); return; }
    const o = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { cb(true); if (opts.once !== false) o.disconnect(); } else if (opts.once === false) cb(false); });
    }, { threshold: opts.threshold || .25 });
    o.observe(el);
    return o;
  }

  /* ---------------- Count up ---------------- */
  function fmt(v, dec, loc) {
    return Number(v).toLocaleString(loc || (root.lang === 'ar' ? 'ar-EG' : 'en-US'), { minimumFractionDigits: dec, maximumFractionDigits: dec });
  }
  function countUp(el, opts) {
    opts = opts || {};
    const to = opts.to != null ? opts.to : parseFloat(el.dataset.count);
    const dec = opts.decimals != null ? opts.decimals : +(el.dataset.decimals || 0);
    const pre = el.dataset.prefix || ''; const suf = el.dataset.suffix || '';
    const loc = el.dataset.locale;
    const from = opts.from != null ? opts.from : 0;
    if (!OK) { el.textContent = pre + fmt(to, dec, loc) + suf; return; }
    const o = { v: from };
    return A.animate(o, { v: to, duration: opts.duration || 1600, ease: 'out(4)', delay: opts.delay || 0, onUpdate: function () { el.textContent = pre + fmt(o.v, dec, loc) + suf; } });
  }

  /* ---------------- Magnetic hover (kokonutui "Magnet Button") ---------------- */
  function magnet(el, strength) {
    if (!OK || matchMedia('(hover: none)').matches) return;
    strength = strength || 0.28;
    el.addEventListener('pointermove', function (e) {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * strength;
      const y = (e.clientY - r.top - r.height / 2) * strength * 1.3;
      A.animate(el, { x: x, y: y, duration: 450, ease: 'out(3)' });
    });
    el.addEventListener('pointerleave', function () {
      A.animate(el, { x: 0, y: 0, duration: 900, ease: A.spring ? A.spring({ bounce: .35, duration: 700 }) : 'out(4)' });
    });
  }

  /* ---------------- Segmented / chip row with sliding pill ---------------- */
  function segmented(container, onChange) {
    let pill = container.querySelector('.pill-bg');
    if (!pill) { pill = document.createElement('span'); pill.className = 'pill-bg'; container.prepend(pill); }
    const btns = Array.from(container.querySelectorAll('[data-value]'));
    function move(btn, instant) {
      /* offset* are layout values, so this stays correct inside zoomed/scaled frames */
      const x = btn.offsetLeft;
      const props = { x: x, width: btn.offsetWidth, height: btn.offsetHeight, y: btn.offsetTop - 2 };
      if (!btn.offsetWidth) return;
      if (!OK || instant) A ? A.utils.set(pill, props) : Object.assign(pill.style, { transform: 'translate(' + x + 'px,' + props.y + 'px)', width: props.width + 'px', height: props.height + 'px' });
      else A.animate(pill, Object.assign({ duration: 600, ease: A.spring ? A.spring({ bounce: .18, duration: 500 }) : 'out(4)' }, props));
    }
    function select(btn, instant) {
      btns.forEach(function (b) { b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'); });
      move(btn, instant);
    }
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        if (b.getAttribute('aria-pressed') === 'true') return;
        select(b); if (onChange) onChange(b.dataset.value, b);
      });
    });
    const cur = btns.find(function (b) { return b.getAttribute('aria-pressed') === 'true'; }) || btns[0];
    requestAnimationFrame(function () { select(cur, true); });
    if (document.fonts) document.fonts.ready.then(function () { const c = btns.find(function (b) { return b.getAttribute('aria-pressed') === 'true'; }); if (c) move(c, true); });
    window.addEventListener('resize', function () { const c = btns.find(function (b) { return b.getAttribute('aria-pressed') === 'true'; }); if (c) move(c, true); });
    return { select: select, refresh: function () { const c = btns.find(function (b) { return b.getAttribute('aria-pressed') === 'true'; }); if (c) move(c, true); } };
  }

  /* ---------------- Toasts (kokonutui "Undo Button" behaviour) ---------------- */
  let toastBox;
  function toast(msg, opts) {
    opts = opts || {};
    if (!toastBox) { toastBox = document.createElement('div'); toastBox.className = 'toasts'; toastBox.setAttribute('role', 'status'); toastBox.setAttribute('aria-live', 'polite'); (opts.host || document.body).appendChild(toastBox); }
    if (opts.host && toastBox.parentNode !== opts.host) opts.host.appendChild(toastBox);
    const t = document.createElement('div'); t.className = 'toast';
    t.innerHTML = '<span class="t-ic ' + (opts.tone ? 'is-' + opts.tone : '') + '">' + icon(opts.icon || 'check') + '</span><span class="t-msg"></span>';
    t.querySelector('.t-msg').textContent = msg;
    if (opts.action) {
      const b = document.createElement('button'); b.className = 't-act'; b.type = 'button'; b.textContent = opts.action;
      b.addEventListener('click', function () { opts.onAction && opts.onAction(); close(); });
      t.appendChild(b);
    }
    toastBox.appendChild(t);
    if (OK) A.animate(t, { opacity: [0, 1], y: [24, 0], scale: [.94, 1], duration: 600, ease: A.spring ? A.spring({ bounce: .3, duration: 500 }) : 'out(4)' });
    const tm = setTimeout(close, opts.duration || 3600);
    function close() {
      clearTimeout(tm);
      if (!t.isConnected) return;
      if (OK) A.animate(t, { opacity: 0, y: 12, scale: .96, duration: 300, ease: 'in(2)', onComplete: function () { t.remove(); } });
      else t.remove();
    }
    return close;
  }

  /* ---------------- Logo: lid pop ---------------- */
  function logoIntro() {
    if (!OK) return;
    document.querySelectorAll('.brand-mark .lid').forEach(function (lid, i) {
      A.animate(lid, { y: [-7, 0], rotate: [-14, 0], duration: 1100, delay: 300 + i * 80, ease: A.spring ? A.spring({ bounce: .45, duration: 900 }) : 'out(4)' });
    });
  }

  function ready(fn) { if (document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }

  window.K = { A: A, OK: OK, RM: RM, icon: icon, hydrateIcons: hydrateIcons, getLang: getLang, setLangAttr: setLangAttr, applyDict: applyDict,
    split: split, splitIn: splitIn, watchReveals: watchReveals, revealEl: revealEl, onView: onView, countUp: countUp, fmt: fmt,
    magnet: magnet, segmented: segmented, toast: toast, logoIntro: logoIntro, ready: ready };
})();
