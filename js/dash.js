/* Mouna AI · store dashboard + admin panel */
(function () {
  'use strict';
  const K = window.K, A = K.A, OK = K.OK, ic = K.icon;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const spring = (b, d) => (A && A.spring ? A.spring({ bounce: b, duration: d }) : 'out(4)');
  const page = document.body.dataset.page;
  K.setLangAttr('en');
  K.hydrateIcons();

  /* ---------- sidebar ---------- */
  const shell = $('.shell'), ind = $('.sb-ind');
  function placeInd() {
    const cur = $('.sb-nav [aria-current="page"]'); if (!cur || !ind) return;
    const p = { y: cur.offsetTop, height: cur.offsetHeight };
    if (OK) A.utils.set(ind, p); else ind.style.transform = 'translateY(' + p.y + 'px)';
  }
  placeInd(); addEventListener('resize', placeInd);
  if (OK && ind) A.animate(ind, { scaleX: [.6, 1], opacity: [0, 1], duration: 700, delay: 300, ease: spring(.3, 600) });
  $$('[data-sb-open]').forEach((b) => b.addEventListener('click', () => shell.classList.add('sb-open')));
  $$('[data-sb-close]').forEach((b) => b.addEventListener('click', () => shell.classList.remove('sb-open')));
  document.addEventListener('click', (e) => {
    const s = e.target.closest('[data-soon]');
    if (s) K.toast('Only this screen is part of the prototype for now', { icon: 'lock', tone: 'violet' });
  });

  /* ---------- overlay helpers ---------- */
  let closeCurrent = null;
  function overlay(inner, kind) {
    const o = document.createElement('div'); o.className = 'overlay';
    o.innerHTML = '<div class="ov-bg"></div>' + inner;
    document.body.appendChild(o);
    K.hydrateIcons(o);
    const panel = o.lastElementChild, bg = o.firstElementChild;
    const prev = document.activeElement;
    if (OK) {
      A.animate(bg, { opacity: [0, 1], duration: 300 });
      if (kind === 'drawer') A.animate(panel, { x: [document.documentElement.dir === 'rtl' ? '-100%' : '100%', '0%'], duration: 650, ease: spring(.12, 560) });
      else A.animate(panel, { opacity: [0, 1], scale: [.95, 1], duration: 450, ease: spring(.25, 420) });
    }
    function close() {
      closeCurrent = null;
      const done = () => { o.remove(); prev && prev.focus && prev.focus(); };
      if (!OK) return done();
      A.animate(bg, { opacity: 0, duration: 250 });
      if (kind === 'drawer') A.animate(panel, { x: document.documentElement.dir === 'rtl' ? '-100%' : '100%', duration: 320, ease: 'in(2)', onComplete: done });
      else A.animate(panel, { opacity: 0, scale: .97, duration: 220, ease: 'in(2)', onComplete: done });
    }
    bg.addEventListener('click', close);
    $$('[data-close]', o).forEach((b) => b.addEventListener('click', close));
    closeCurrent = close;
    setTimeout(() => { const f = $('button, a, input', panel); f && f.focus(); }, 50);
    return { el: panel, close: close };
  }
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && closeCurrent) closeCurrent(); });

  /* ======================= STORE ======================= */
  if (page === 'store') {
    const hours = ['10', '11', '12', '1', '2', '3', '4', '5'];
    const ampm = ['10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM'];
    const vals = [2, 4, 6, 5, 7, 9, 6, 3];
    const max = 9;
    $('#bars').innerHTML = vals.map((v, i) => '<div class="bar' + (v === max ? ' peak' : '') + '" style="--h:' + (v / max).toFixed(3) + '" tabindex="0" aria-label="' + ampm[i] + ': ' + v + ' orders"><i></i><span class="tip">' + ampm[i] + ' · ' + v + ' orders</span></div>').join('');
    $('#xlab').innerHTML = hours.map((h) => '<span>' + h + '</span>').join('');

    const stats = $('.stats');
    stats.addEventListener('reveal', () => $$('[data-count]', stats).forEach((n, i) => K.countUp(n, { duration: 1700, delay: 200 + i * 120 })));
    K.onView($('#bars'), () => {
      if (!OK) return;
      $$('#bars .bar i').forEach((b, i) => A.animate(b, { scaleY: [0, vals[i] / max], duration: 1100, delay: 150 + i * 70, ease: 'out(4)' }));
      A.animate($$('#tiles .tile-s'), { opacity: [0, 1], y: [10, 0], duration: 600, delay: A.stagger(60), ease: 'out(4)' });
    }, { threshold: .2 });
    K.onView($('.low-list'), () => {
      if (!OK) return;
      $$('.low-list .lv i').forEach((b, i) => A.animate(b, { scaleX: [0, +b.style.getPropertyValue('--v')], duration: 1000, delay: 200 + i * 80, ease: 'out(4)' }));
    }, { threshold: .2 });

    /* order queue */
    const counts = { new: 5, prep: 4 };
    const QUEUE = [
      [1048, 'The Hassan family', 'Smouha · 8 items', 412, '7:05 PM'],
      [1049, 'Flat 4B', 'Smouha · 3 items', 167, '7:08 PM'],
      [1050, 'Mostafa home', 'Sporting · 12 items', 655, '7:10 PM'],
      [1051, 'Nour & Salma', 'Gleem · 5 items', 238, '7:11 PM'],
      [1052, 'El-Sayed family', 'Smouha · 6 items', 301, '7:12 PM']
    ];
    const accepted = new Set();
    function bump(k, v) {
      const el = $('#tiles [data-k="' + k + '"]'); el.textContent = v;
      if (OK) A.animate(el, { scale: [1.25, 1], duration: 500, ease: spring(.5, 450) });
    }
    function setNew(v) {
      const n = $('#navNew'); n.textContent = v; n.hidden = v === 0;
      if (OK && v) A.animate(n, { scale: [1.3, 1], duration: 450, ease: spring(.5, 400) });
    }
    function queue() {
      const rows = QUEUE.map((q) => {
        const done = accepted.has(q[0]);
        return '<div class="q-order' + (done ? ' is-acc' : '') + '" data-o="' + q[0] + '"><b>#' + q[0] + ' · ' + q[1] + '</b>' +
          (done ? '<span class="chip chip-fresh">' + ic('check') + 'Preparing</span>' : '<button class="btn btn-primary btn-sm" type="button" data-accept="' + q[0] + '">Accept</button>') +
          '<small>' + q[2] + ' · EGP ' + q[3] + ' · ' + q[4] + '</small></div>';
      }).join('');
      const d = overlay('<aside class="drawer" role="dialog" aria-modal="true" aria-label="New orders"><div class="dr-head"><div><h2>New orders</h2><p id="qSub">' + counts.new + ' waiting · accept to start preparing</p></div><button class="icon-btn" type="button" data-close aria-label="Close">' + ic('x') + '</button></div><div class="dr-body">' + rows + '</div></aside>', 'drawer');
      if (OK) A.animate($$('.q-order', d.el), { opacity: [0, 1], x: [24, 0], duration: 500, delay: A.stagger(60, { start: 200 }), ease: 'out(4)' });
      d.el.addEventListener('click', (e) => {
        const b = e.target.closest('[data-accept]'); if (!b) return;
        const id = +b.dataset.accept; accepted.add(id);
        const chip = document.createElement('span'); chip.className = 'chip chip-fresh'; chip.innerHTML = ic('check') + 'Preparing';
        b.replaceWith(chip); chip.closest('.q-order').classList.add('is-acc');
        if (OK) A.animate(chip, { scale: [.6, 1], opacity: [0, 1], duration: 450, ease: spring(.5, 420) });
        counts.new--; counts.prep++; bump('new', counts.new); bump('prep', counts.prep); setNew(counts.new);
        $('#qSub', d.el).textContent = counts.new ? counts.new + ' waiting · accept to start preparing' : 'Queue clear · nice work';
        K.toast('Order #' + id + ' accepted', { icon: 'check' });
      });
    }
    $$('[data-queue]').forEach((b) => b.addEventListener('click', queue));

    /* QR labels */
    function qr(seed) {
      let s = seed; const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
      const N = 21; let r = '';
      const finder = (x, y) => '<rect x="' + x + '" y="' + y + '" width="7" height="7"/><rect x="' + (x + 1) + '" y="' + (y + 1) + '" width="5" height="5" fill="#fff"/><rect x="' + (x + 2) + '" y="' + (y + 2) + '" width="3" height="3"/>';
      for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
        const inF = (x < 8 && y < 8) || (x > 12 && y < 8) || (x < 8 && y > 12);
        if (!inF && rnd() > .52) r += '<rect x="' + x + '" y="' + y + '" width="1" height="1"/>';
      }
      return '<svg class="qr" viewBox="-1 -1 23 23" fill="currentColor" aria-hidden="true"><rect x="-1" y="-1" width="23" height="23" fill="#fff"/>' + r + finder(0, 0) + finder(14, 0) + finder(0, 14) + '</svg>';
    }
    const LABELS = [['Full-cream milk 1 L', 'EGP 34 · exp. 9 Nov'], ['Eggs, tray of 30', 'EGP 165 · exp. 19 Nov'], ['Plain yogurt ×4', 'EGP 48 · exp. 14 Nov'], ['White cheese 500 g', 'EGP 85 · exp. 2 Dec'], ['Egyptian rice 1 kg', 'EGP 38 · exp. Aug 2027'], ['Sugar 1 kg', 'EGP 32 · no expiry']];
    function qrModal() {
      const m = overlay('<div class="modal" role="dialog" aria-modal="true" aria-label="Print QR labels"><div class="card-h" style="margin:0"><h2>Print QR labels</h2><button class="icon-btn" type="button" data-close aria-label="Close">' + ic('x') + '</button></div>' +
        '<p style="color:var(--ink-2);font-size:14px;margin-top:4px">Each label carries the product and its expiry, so the order lands in the household\'s pantry when it is scanned.</p>' +
        '<div class="labels">' + LABELS.map((l, i) => '<div class="label">' + qr(1043 + i * 77) + '<b>' + l[0] + '</b><small>' + l[1] + '</small></div>').join('') + '</div>' +
        '<div class="modal-foot"><button class="btn btn-secondary" type="button" data-close>Cancel</button><button class="btn btn-primary" type="button" data-print>' + ic('printer') + 'Print 24 labels</button></div></div>', 'modal');
      if (OK) A.animate($$('.label', m.el), { opacity: [0, 1], y: [12, 0], duration: 500, delay: A.stagger(60, { start: 150 }), ease: 'out(4)' });
      $('[data-print]', m.el).addEventListener('click', () => { m.close(); K.toast('24 labels sent to the printer', { icon: 'printer', tone: 'violet' }); });
    }
    $$('[data-qr]').forEach((b) => b.addEventListener('click', qrModal));
  }

  /* ======================= ADMIN ======================= */
  if (page === 'admin') {
    const M = [
      ['Run-out prediction', 'Pantry, Home, alerts', 'live', 'Predicts how many days each pantry item has left, from household size and every "−1 used" or "Finished" tap.', 'Pantry logs, household profile'],
      ['Typical consumption baseline', 'Onboarding, item details, norms', 'live', 'The starting point for a new home: expected weekly use per item for a household of its size and ages.', 'Consumption norms, household profile'],
      ['Waste risk', 'Pantry, Home, alerts', 'soon', 'Flags items likely to expire before the household uses them, so they can be used first.', 'Expiry dates, run-out predictions'],
      ['Next basket', 'Home, Store, Cart, Checkout', 'soon', 'Builds the next order from run-out dates and what the household usually buys.', 'Order history, run-out predictions'],
      ['Budget forecast', 'Onboarding, Budget', 'soon', 'Projects grocery spending for the month up to payday.', 'Orders, prices, payday'],
      ['Overspending risk', 'Budget, alerts', 'soon', 'Warns when spending is on track to go over the budget the household set.', 'Budget forecast, orders'],
      ['Payday timing', 'Budget, alerts, store Offers', 'soon', 'Learns when the household is paid, to time reminders and offers.', 'Order timing, budget settings'],
      ['Price forecast', 'Store, product, item details', 'soon', 'Predicts short-term price changes per product across partner stores.', 'Store price history'],
      ['Smart basket within budget', 'Cart, Budget', 'soon', 'Picks the most useful basket that fits a set amount.', 'Next basket, prices, budget'],
      ['Recipe recommender', 'Recipes, AI Insights', 'soon', 'Suggests recipes from what is in the pantry, using what expires first.', 'Pantry, recipes, expiry dates'],
      ['Substitutes', 'Store page, Cart', 'soon', 'Finds the closest available product when an item is out of stock.', 'Catalogue, store stock'],
      ['Offer response', 'Offers, store Offers, Customer insights', 'soon', 'Predicts which households will act on a store offer.', 'Offers, order history'],
      ['Store demand with pantry signals', 'Demand forecasts, store Overview', 'soon', 'Forecasts demand per product for each store using run-out signals from nearby pantries.', 'Run-out predictions, store orders'],
      ['Seasonal demand', 'Demand forecasts', 'soon', 'Adjusts demand for Ramadan, Eid, school terms and summer.', 'Order history, calendar'],
      ['Churn and second order', 'Customer insights', 'soon', 'Predicts which new households may not place a second order.', 'Orders, app activity'],
      ['Customer segments and value', 'Customer insights', 'soon', 'Groups households by basket size, frequency and value.', 'Orders, household profile'],
      ['Item availability', 'Products & stock, Store page', 'soon', 'Predicts whether a product will be in stock at order time.', 'Store stock, deliveries'],
      ['Delivery time', 'Checkout, Order details, Order quality', 'soon', 'Estimates delivery minutes for each order.', 'Order timestamps, distance'],
      ['Preferred delivery window', 'Checkout', 'soon', 'Learns when each household prefers deliveries.', 'Delivery history'],
      ['Cart abandonment', 'Alerts', 'soon', 'Flags carts likely to be left and the best moment to nudge.', 'Cart events'],
      ['Bad rating risk', 'Order quality', 'soon', 'Predicts which orders may get a low rating, so stores can act first.', 'Ratings, delivery time, substitutions']
    ];
    let filter = 'all', q = '';
    const tbody = $('#mRows');
    function rows() {
      const list = M.map((m, i) => ({ i: i + 1, m: m })).filter((x) => (filter === 'all' || x.m[2] === filter) && (!q || (x.m[0] + ' ' + x.m[1]).toLowerCase().includes(q)));
      tbody.innerHTML = list.length ? list.map((x) => {
        const live = x.m[2] === 'live';
        return '<tr tabindex="0" data-m="' + (x.i - 1) + '"><td class="n num">' + x.i + '</td><td class="m">' + x.m[0] + '</td><td>' + x.m[1] + '</td><td>' +
          (live ? '<span class="chip chip-live"><span class="dot"></span>Live</span>' : '<span class="chip chip-soon">' + ic('lock') + 'Coming soon</span>') + '</td><td>' + (live ? 'v1.0' : '—') + '</td><td class="ph">' + (live ? '[MAE after testing]' : '—') + '</td><td class="ph">' + (live ? '[training date]' : '—') + '</td></tr>';
      }).join('') : '<tr class="empty-row"><td colspan="7">No models match "' + q.replace(/</g, '&lt;') + '"</td></tr>';
      if (OK) A.animate($$('tr', tbody), { opacity: [0, 1], x: [-10, 0], duration: 420, delay: A.stagger(22), ease: 'out(3)' });
    }
    rows();
    K.segmented($('#mFilter'), (v) => { filter = v; rows(); });
    let tm; $('#mSearch').addEventListener('input', (e) => { clearTimeout(tm); tm = setTimeout(() => { q = e.target.value.trim().toLowerCase(); rows(); }, 120); });
    function open(idx) {
      const m = M[idx], live = m[2] === 'live';
      const d = overlay('<aside class="drawer" role="dialog" aria-modal="true" aria-label="' + m[0] + '"><div class="dr-head"><div><h2>' + m[0] + '</h2><p>Model ' + (idx + 1) + ' of 21</p></div><button class="icon-btn" type="button" data-close aria-label="Close">' + ic('x') + '</button></div><div class="dr-body">' +
        (live ? '<span class="chip chip-live"><span class="dot"></span>Live</span>' : '<span class="chip chip-soon">' + ic('lock') + 'Coming soon</span>') +
        '<div class="dr-sec"><h3>What it does</h3><p>' + m[3] + '</p></div>' +
        '<div class="dr-sec"><h3>Used in</h3><div class="used">' + m[1].split(', ').map((u) => '<span>' + u + '</span>').join('') + '</div></div>' +
        '<div class="dr-sec"><h3>Data it needs</h3><p>' + m[4] + '</p>' + (live ? '' : '<div class="meter" aria-hidden="true"><i style="--v:' + (.12 + (idx % 5) * .07).toFixed(2) + '"></i></div><p style="font-size:13px;color:var(--ink-2);margin-top:6px">Collecting data before the first training run.</p>') + '</div>' +
        '<dl class="kv"><dt>Version</dt><dd>' + (live ? 'v1.0' : '—') + '</dd><dt>Accuracy</dt><dd>' + (live ? '[MAE after testing]' : '—') + '</dd><dt>Last trained</dt><dd>' + (live ? '[training date]' : '—') + '</dd></dl>' +
        '</div></aside>', 'drawer');
      if (OK) { A.animate($$('.dr-sec, .kv', d.el), { opacity: [0, 1], y: [10, 0], duration: 500, delay: A.stagger(70, { start: 200 }), ease: 'out(4)' }); const mi = $('.meter i', d.el); if (mi) A.animate(mi, { scaleX: [0, +mi.style.getPropertyValue('--v')], duration: 1200, delay: 400, ease: 'out(4)' }); }
    }
    tbody.addEventListener('click', (e) => { const tr = e.target.closest('tr[data-m]'); if (tr) open(+tr.dataset.m); });
    tbody.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { const tr = e.target.closest('tr[data-m]'); if (tr) { e.preventDefault(); open(+tr.dataset.m); } } });
  }

  K.logoIntro();
  K.watchReveals();
})();
