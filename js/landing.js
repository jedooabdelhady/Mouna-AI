/* Mouna AI · landing interactions */
(function () {
  'use strict';
  const K = window.K, A = K.A, OK = K.OK;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const MARK = '<svg class="mark-line" viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true"><path d="M4 17C70 8 160 5 296 11"/></svg>';

  const AR = {
    'skip': 'تخطَّ إلى المحتوى',
    'nav.how': 'إزاي بيشتغل', 'nav.ai': 'الذكاء الاصطناعي', 'nav.stores': 'للمتاجر', 'nav.faq': 'الأسئلة', 'nav.about': 'عن المشروع',
    'nav.login': 'تسجيل الدخول', 'nav.start': 'ابدأ الآن', 'nav.menu': 'القائمة', 'lang': 'English',
    'hero.chip': 'صُنع في الإسكندرية',
    'hero.title': 'اعرف إيه اللي هيخلص <span class="mark">قبل ما يخلص.' + MARK + '</span>',
    'hero.sub': 'مونة بتجمع كل حاجات بيتك في مخزن واحد مشترك. اطلب من المتاجر الشريكة، والذكاء الاصطناعي يقولك تشتري إيه وإمتى.',
    'hero.cta1': 'ابدأ مجانًا', 'hero.cta2': 'شوف إزاي بيشتغل',
    'hero.note': 'للي عايش لوحده وللسكن المشترك · بالعربي وEnglish',
    'ro.title': 'قرب يخلص', 'ro.milk': 'لبن', 'ro.milkq': 'فاضل 2 لتر', 'ro.oil': 'زيت طعام', 'ro.oilq': 'فاضل نص لتر', 'ro.rice': 'رز', 'ro.riceq': 'فاضل 3 كيلو',
    'u.days': 'أيام', 'u.days18': 'يوم',
    'ro.cta': 'اطلب اللبن والزيت من النور ماركت', 'ro.done': 'اتضاف صنفين للسلة',
    'ns.label': 'آخر التنبيهات', 'ns.1t': 'الزبادي صلاحيته انتهت امبارح', 'ns.1s': '2 كوب · ارميه أو سجّله',
    'ns.2t': 'البيض صلاحيته تنتهي خلال 4 أيام', 'ns.2s': 'استخدمه الأول الأسبوع ده',
    'ns.3t': 'خصم 15% على زيت الطعام في بحري', 'ns.3s': 'العرض لحد الأحد',
    'how.k': 'إزاي بيشتغل', 'how.t': 'ثلاث خطوات، وبعدها كل حاجة ماشية لوحدها',
    's1.t': 'اطلب الأساسيات', 's1.p': 'اشتري اللبن والعيش والرز والزيت وغيرهم من متاجر شريكة قريبة منك.',
    's2.t': 'المخزن بيتملى لوحده', 's2.p': 'كل منتج عليه كود QR من المتجر، فالطلبات بتوصل لمخزنك ومعاها تواريخ الصلاحية.',
    's3.t': 'الذكاء الاصطناعي يتوقع اللي هيخلص', 's3.p': 'بيبدأ من الاستهلاك المعتاد لبيت زي بيتك، وبعدين بيتعلم من تسجيلاتكم.',
    'vs.t': 'اتضاف اللبن', 'vs.s': 'ينتهي 9 نوفمبر', 'vf.tag': 'هيخلص الأحد 8 نوفمبر',
    'homes.t': 'معمول لكل أنواع البيوت',
    'h1.t': 'أنا بس', 'h1.p': 'عايش لوحدك وعايز تبطل تلاقي زبادي منتهي في التلاجة.',
    'h3.t': 'سكن مشترك', 'h3.p': 'عيلة أو أصحاب أو طلبة في بيت واحد. كله بيدخل بكود دعوة واحد وبيسجل اللي استخدمه.',
    'feat.t': 'كل اللي مخزنك محتاجه',
    'f1.t': 'مخزن رقمي مشترك', 'f1.p': 'الكميات وتواريخ الصلاحية وحالة كل صنف من الـ50 صنف الأساسيين.',
    'mp.milk': 'لبن', 'mp.milkq': '2 لتر · ينتهي 9 نوفمبر', 'mp.rice': 'رز', 'mp.riceq': '3 كيلو · ينتهي أغسطس 2027',
    'mp.yog': 'زبادي', 'mp.yogq': '2 كوب · انتهى امبارح', 'mp.egg': 'بيض', 'mp.eggq': 'فاضل 6 · 4 أيام', 'mp.oil': 'زيت طعام', 'mp.oilq': 'نص لتر · ينتهي مارس 2027', 'mp.beans': 'فول مدمس', 'mp.beansq': '2 علبة · ينتهي يناير 2028','mp.ess': 'صنف أساسي متتابع',
    'st.low': 'قرب يخلص', 'st.fresh': 'طازة', 'st.expired': 'منتهي', 'st.expiring': 'صلاحيته قربت', 'st.live': 'متاح', 'st.soon': 'قريبًا',
    'f2.t': 'امسح أي حاجة', 'f2.p': 'اشتريت من برّه؟ امسح الباركود أو ضيفه بإيدك.', 'scan.pop': 'علبة تونة · اتضافت',
    'f3.t': 'تنبيهات الصلاحية', 'f3.p': 'اعرف تستخدم إيه الأول قبل ما يتهدر.',
    'f4.t': 'إعادة الطلب بلمسة', 'f4.p': 'الأسعار بالجنيه، والتوصيل من متاجر في منطقتك.', 'f4.btn': 'اطلب آخر سلة تاني',
    'rc.store': 'النور ماركت', 'rc.tea': 'شاي', 'rc.sugar': 'سكر 1 كيلو', 'rc.tuna': 'تونة', 'rc.del': 'التوصيل', 'rc.total': 'الإجمالي',
    'pt.l': 'المتاجر الشريكة', 'pt.1': 'النور ماركت', 'pt.2': 'بحري سوبرماركت', 'pt.3': 'جرين باسكت',
    'ai.k': 'مزايا الذكاء الاصطناعي', 'ai.t': 'بيذكى كل أسبوع بتستخدمه', 'ai.s': 'توقع نفاد الأصناف شغال من أول يوم، ومزايا أكتر هتيجي كل ما الذكاء الاصطناعي يتعلم.',
    'a1.t': 'توقع النفاد', 'a1.p': '«اللبن هيخلص خلال 3 أيام.»',
    'a2.t': 'استهلاكك مقارنة بالمعتاد', 'a2.p': 'شوف بيتك بيستهلك إزاي مقارنة ببيوت شبهه.', 'a2.sim': 'بيوت شبهك', 'a2.you': 'بيتك',
    'a3.t': 'سلتك الجاية', 'a3.p': 'قائمة جاهزة باللي محتاج تشتريه بعد كده.',
    'a4.t': 'الميزانية لحد القبض', 'a4.p': 'توقعات وتنبيهات وسلة على قد الميزانية.',
    'st.k': 'للمتاجر', 'st.t': 'عندك سوبرماركت في الإسكندرية؟',
    'st.s': 'استقبل الطلبات، واطبع ملصقات QR، واعمل عروض، وشوف الطلب الجاي، كله من لوحة تحكم واحدة.',
    'st.cta': 'قدّم كمتجر شريك', 'st.demo': 'شوف لوحة المتجر',
    'md.o': 'طلبات النهارده', 'md.up': '+8 عن الخميس اللي فات', 'md.s': 'المبيعات', 'md.cap': 'الطلبات في الساعة · الذروة 3 العصر',
    'faq.t': 'أسئلة',
    'q1': 'إزاي الذكاء الاصطناعي يعرف إن اللبن هيخلص؟',
    'a1': 'بيبدأ من الاستهلاك المعتاد لبيت زي بيتك (عدد الأفراد وأعمارهم ونوعهم)، وبعدين بيتظبط كل ما حد يدوس «استخدمت 1−» أو «خلص».',
    'q2': 'ينفع زمايلي في السكن نشارك مخزن واحد؟',
    'a2': 'أيوه. واحد بس بيعمل البيت ويبعت كود دعوة، وكل اللي بيدخلوا بيشوفوا نفس المخزن وبيسجلوا استهلاكهم فيه.',
    'q3': 'لو اشتريت من متجر مش شريك؟',
    'a3': 'امسح الباركود أو ضيف الصنف بإيدك. هيدخل مخزنك ويتحسب في التوقعات زي أي صنف تاني.',
    'faq.all': 'كل الأسئلة ←',
    'ft.about': 'مشروع تخرج في علوم البيانات، جامعة الإسكندرية، 2026–27.',
    'ft.product': 'المنتج', 'ft.app': 'تطبيق البيت', 'ft.project': 'المشروع', 'ft.team': 'عن الفريق', 'ft.help': 'الأسئلة والمساعدة',
    'ft.ds': 'نظام التصميم', 'ft.admin': 'لوحة الإدارة', 'ft.legal': 'قانوني', 'ft.privacy': 'الخصوصية', 'ft.terms': 'الشروط', 'ft.made': 'صُنع في الإسكندرية'
  };
  const T = (k, en) => (document.documentElement.lang === 'ar' && AR[k]) || en;

  /* ---------- language ---------- */
  let lang = K.getLang();
  K.setLangAttr(lang);
  K.applyDict(lang === 'ar' ? AR : null);
  K.hydrateIcons();

  /* ---------- header ---------- */
  const head = $('.site-head');
  const onScroll = () => head.classList.toggle('is-stuck', scrollY > 8);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  const nav = $('.main-nav'), hover = $('.nav-hover');
  if (nav && OK) {
    $$('a', nav).forEach((a) => a.addEventListener('pointerenter', () => {
      const nr = nav.getBoundingClientRect(), r = a.getBoundingClientRect();
      const first = getComputedStyle(hover).opacity === '0';
      const p = { x: r.left - nr.left, width: r.width };
      if (first) A.utils.set(hover, p);
      A.animate(hover, Object.assign({ opacity: 1, duration: 450, ease: A.spring ? A.spring({ bounce: .15, duration: 420 }) : 'out(4)' }, first ? {} : p));
    }));
    nav.addEventListener('pointerleave', () => A.animate(hover, { opacity: 0, duration: 250 }));
  }

  const menuBtn = $('.menu-btn'), mnav = $('#mnav');
  menuBtn.addEventListener('click', () => {
    const open = mnav.hidden;
    mnav.hidden = !open; menuBtn.setAttribute('aria-expanded', String(open));
    if (open && OK) A.animate($$('a', mnav), { opacity: [0, 1], x: [lang === 'ar' ? 12 : -12, 0], delay: A.stagger(45), duration: 500, ease: 'out(3)' });
  });
  $$('a', mnav).forEach((a) => a.addEventListener('click', () => { mnav.hidden = true; menuBtn.setAttribute('aria-expanded', 'false'); }));

  $('[data-lang-toggle]').addEventListener('click', () => {
    lang = lang === 'ar' ? 'en' : 'ar';
    const main = $('main');
    const swap = () => {
      K.setLangAttr(lang);
      K.applyDict(lang === 'ar' ? AR : null);
      K.hydrateIcons();
      buildWeek();
      heroIntro(true);
      $$('[data-split]').forEach((h) => { if (h.dataset.revealed) A && A.utils.set(h, { opacity: 1 }); });
    };
    if (!OK) { swap(); return; }
    A.animate([main, $('.site-foot')], { opacity: [1, 0], duration: 180, ease: 'in(2)', onComplete: () => {
      swap(); A.animate([main, $('.site-foot')], { opacity: [0, 1], duration: 420, ease: 'out(3)' });
    } });
  });

  $$('.magnet').forEach((b) => K.magnet(b));

  /* ---------- hero ---------- */
  async function flap(el, target) {
    const start = target + 6;
    for (let v = start; v >= target; v--) {
      el.textContent = v;
      if (OK) A.animate(el, { rotateX: [-85, 0], duration: 160, ease: 'out(2)' });
      await sleep(55 + (start - v) * 18);
    }
  }
  let heroRan = false;
  function heroIntro(again) {
    const title = $('#heroTitle');
    const items = $$('.ro-item');
    items.forEach((it) => { const l = it.querySelector('.ro-level i'); l.style.setProperty('--lvl', it.dataset.level); });
    if (!OK) { $$('.flap').forEach((f, i) => { f.textContent = items[i].dataset.days; }); return; }
    const words = K.split(title);
    A.utils.set(title, { opacity: 1 });
    const tl = A.createTimeline({ defaults: { ease: 'out(4)' } });
    tl.add(words, { y: ['105%', '0%'], duration: 1000, delay: A.stagger(again ? 40 : 65) }, again ? 0 : 150);
    const path = title.querySelector('.mark-line path');
    if (path) tl.add(A.createDrawable(path), { draw: ['0 0', '0 1'], duration: 900, ease: 'inOut(3)' }, again ? 350 : 950);
    if (again && heroRan) return;
    heroRan = true;
    tl.add(items, { opacity: [0, 1], x: [lang === 'ar' ? -28 : 28, 0], duration: 900, delay: A.stagger(120) }, 650);
    items.forEach((it, i) => {
      tl.add(it.querySelector('.ro-level i'), { scaleX: [1, +it.dataset.level], duration: 1400, ease: 'out(3)' }, 800 + i * 120);
      setTimeout(() => flap(it.querySelector('.flap'), +it.dataset.days), 800 + i * 150);
    });
    $$('.nstack .note').forEach((n, i) => tl.add(n, { opacity: [0, [1, .9, .7][i]], duration: 700 }, 1300 + i * 80));
    setTimeout(stackLayout, 1250);
  }

  /* restock (kokonutui "Cart Button") */
  const restock = $('.restock');
  restock.addEventListener('click', () => {
    if (restock.classList.contains('is-done')) return;
    const label = $('.rs-label', restock), done = $('.rs-done', restock);
    if (!OK) { restock.classList.add('is-done'); done.style.opacity = 1; done.style.transform = 'none'; label.style.opacity = 0; setTimeout(reset, 2600); return; }
    const br = restock.getBoundingClientRect();
    $$('.ro-item').slice(0, 2).forEach((it, i) => {
      const th = it.querySelector('.thumb'), r = th.getBoundingClientRect();
      const c = th.cloneNode(true);
      Object.assign(c.style, { position: 'fixed', left: r.left + 'px', top: r.top + 'px', width: r.width + 'px', height: r.height + 'px', zIndex: 120, margin: 0, pointerEvents: 'none', boxShadow: 'var(--shadow-md)' });
      document.body.appendChild(c);
      A.animate(c, { x: br.left + br.width / 2 - r.left - r.width / 2, y: br.top + br.height / 2 - r.top - r.height / 2, scale: [1, .35], opacity: [1, .2], duration: 650, delay: i * 90, ease: 'in(2)', onComplete: () => c.remove() });
    });
    setTimeout(() => {
      restock.classList.add('is-done');
      A.animate(label, { y: ['0%', '-140%'], opacity: [1, 0], duration: 420, ease: 'in(2)' });
      A.animate(done, { y: ['100%', '0%'], opacity: [0, 1], duration: 520, delay: 120, ease: 'out(4)' });
      A.animate(restock, { scale: [.96, 1], duration: 600, ease: A.spring ? A.spring({ bounce: .4, duration: 500 }) : 'out(3)' });
    }, 600);
    setTimeout(reset, 3400);
    function reset() {
      if (OK) {
        A.animate(done, { y: ['0%', '100%'], opacity: [1, 0], duration: 380, ease: 'in(2)' });
        A.animate(label, { y: ['-140%', '0%'], opacity: [0, 1], duration: 520, delay: 160, ease: 'out(4)' });
        setTimeout(() => restock.classList.remove('is-done'), 200);
      } else { restock.classList.remove('is-done'); done.style.opacity = 0; label.style.opacity = 1; }
    }
  });

  /* notification stack: auto-cycles; hover/focus fans it out */
  const nstack = $('.nstack');
  const notes = $$('.note', nstack);
  let order = [0, 1, 2], fanned = false;
  function stackLayout(instant) {
    const h = notes[0].offsetHeight + 8;
    order.forEach((idx, pos) => {
      const n = notes[idx];
      const p = fanned ? { y: -pos * h, scale: 1, opacity: 1 } : { y: -pos * 9, scale: 1 - pos * .05, opacity: pos === 0 ? 1 : pos === 1 ? .9 : .7 };
      n.style.zIndex = 10 - pos;
      if (!OK || instant) { n.style.transform = 'translateY(' + p.y + 'px) scale(' + p.scale + ')'; n.style.opacity = p.opacity; }
      else A.animate(n, Object.assign({ duration: 650, ease: A.spring ? A.spring({ bounce: .2, duration: 600 }) : 'out(4)' }, p));
    });
  }
  function fan(v) { fanned = v; nstack.style.zIndex = v ? 3 : 1; stackLayout(); }
  nstack.addEventListener('pointerenter', () => fan(true));
  nstack.addEventListener('pointerleave', () => fan(false));
  nstack.addEventListener('focus', () => fan(true));
  nstack.addEventListener('blur', () => fan(false));
  nstack.addEventListener('click', () => fan(!fanned));
  if (OK) setInterval(() => { if (!fanned && !document.hidden) { order.push(order.shift()); stackLayout(); } }, 3600);
  if (!OK) stackLayout(true);

  /* dot field (kokonutui "Dot Field" background) */
  (function dotField() {
    const cv = $('.dotfield'); if (!cv) return;
    const ctx = cv.getContext('2d');
    let w, h, dpr, cols, rows, visible = true, mx = -999, my = -999, t = 0, raf;
    const GAP = 24;
    function size() {
      dpr = Math.min(devicePixelRatio || 1, 2);
      w = cv.clientWidth; h = cv.clientHeight;
      cv.width = w * dpr; cv.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / GAP) + 1; rows = Math.ceil(h / GAP) + 1;
    }
    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) {
        const x = i * GAP, y = j * GAP;
        const wave = (Math.sin(i * .35 + t) * Math.cos(j * .3 - t * .8) + 1) / 2;
        const d = Math.hypot(x - mx, y - my), near = Math.max(0, 1 - d / 140);
        const a = .12 + wave * .22 + near * .6;
        const r = 1.1 + near * 1.6;
        ctx.fillStyle = 'rgba(109,40,217,' + a.toFixed(3) + ')';
        ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fill();
      }
    }
    function loop() { t += .012; draw(); raf = visible ? requestAnimationFrame(loop) : 0; }
    size(); draw();
    addEventListener('resize', () => { size(); draw(); });
    if (!OK) return;
    const hero = $('.hero');
    hero.addEventListener('pointermove', (e) => { const r = cv.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; });
    hero.addEventListener('pointerleave', () => { mx = my = -999; });
    K.onView(hero, (v) => { visible = v; if (v && !raf) loop(); }, { once: false, threshold: 0 });
  })();

  /* ---------- How it works: looping mini-scenes ---------- */
  function scene(el, build) {
    if (!OK) return;
    let tl = null;
    K.onView(el, (v) => { if (v) { if (!tl) tl = build(); tl.play(); } else if (tl) tl.pause(); }, { once: false, threshold: .35 });
  }
  scene($('.vis-order'), () => {
    const its = $$('.vo-item'), badge = $('.vo-badge'), cart = $('.vo-cart');
    const tl = A.createTimeline({ loop: true, loopDelay: 600, autoplay: false, onLoop: () => { badge.textContent = '0'; } });
    tl.add(its, { opacity: [0, 1], y: [-14, 0], duration: 500, delay: A.stagger(90), ease: 'out(3)' }, 0);
    its.forEach((it, i) => {
      const dx = -parseFloat(it.style.getPropertyValue('--x'));
      tl.add(it, { x: [0, dx], y: [0, 78], scale: [1, .45], opacity: [1, 0], duration: 620, ease: 'in(2)',
        onComplete: () => { badge.textContent = String(i + 1); A.animate(cart, { scale: [1.12, 1], duration: 500, ease: 'out(3)' }); A.animate(badge, { scale: [1.4, 1], duration: 400 }); } }, 900 + i * 520);
      tl.add(it, { x: 0, y: 0, scale: 1, duration: 1 }, 3300);
    });
    return tl;
  });
  scene($('.vis-scan'), () => {
    const beam = $('.vs-beam'), row = $('.vs-row'), pack = $('.vs-pack');
    const tl = A.createTimeline({ loop: true, loopDelay: 400, autoplay: false });
    tl.add(beam, { opacity: [0, 1], duration: 200 }, 200)
      .add(beam, { y: [0, 90, 0, 90], duration: 1800, ease: 'inOut(2)' }, 200)
      .add(beam, { opacity: 0, duration: 200 }, 2050)
      .add(pack, { scale: [1, 1.06, 1], duration: 500, ease: 'out(3)' }, 2050)
      .add(row, { opacity: [0, 1], y: [14, 0], duration: 600, ease: 'out(4)' }, 2200)
      .add(row, { opacity: 0, y: 8, duration: 400, ease: 'in(2)' }, 4300);
    return tl;
  });
  scene($('.vis-forecast'), () => {
    const line = A.createDrawable('.vf-line'), fore = A.createDrawable('.vf-fore');
    const tl = A.createTimeline({ loop: true, loopDelay: 500, autoplay: false });
    tl.add(line, { draw: ['0 0', '0 1'], duration: 1300, ease: 'inOut(2)' }, 0)
      .add(fore, { draw: ['0 0', '0 1'], duration: 800, ease: 'out(2)' }, 1250)
      .add('.vf-dot', { scale: [0, 1.4, 1], opacity: [0, 1], duration: 600, ease: 'out(3)' }, 1900)
      .add('.vf-tag', { opacity: [0, 1], y: [8, 0], duration: 500, ease: 'out(4)' }, 2000)
      .add(['.vf-line', '.vf-fore', '.vf-dot', '.vf-tag'], { opacity: [1, 0], duration: 400 }, 4300)
      .add(['.vf-line', '.vf-fore'], { opacity: 1, duration: 1 }, 4750);
    return tl;
  });
  if (OK) {
    const sl = $('.steps-line path');
    K.onView($('.steps'), () => A.animate(A.createDrawable(sl), { draw: ['0 0', '0 1'], duration: 1600, ease: 'inOut(3)', delay: 300 }), { threshold: .2 });
  }

  /* homes: avatars pop + invite code types */
  if (OK) {
    K.onView($('.homes'), () => {
      A.animate($$('.homes .av'), { scale: [0, 1], duration: 700, delay: A.stagger(70, { start: 350 }), ease: A.spring ? A.spring({ bounce: .45, duration: 600 }) : 'out(3)' });
      const code = $('.homes .code'), full = code.textContent; code.textContent = '';
      let i = 0; setTimeout(function typ() { code.textContent = full.slice(0, ++i); if (i < full.length) setTimeout(typ, 70); }, 1000);
    }, { threshold: .3 });
    $$('.home-card').forEach((c) => c.addEventListener('pointerenter', () => A.animate(c.querySelectorAll('.av'), { y: [0, -6, 0], duration: 550, delay: A.stagger(50), ease: 'out(2)' })));
  }

  /* ---------- bento ---------- */
  function buildWeek() {
    const box = $('.week'); if (!box) return;
    const ar = document.documentElement.lang === 'ar';
    const base = new Date(2026, 10, 5); /* Thu 5 Nov 2026 */
    const marks = { 0: ['d-red'], 3: ['d-violet'], 4: ['d-amber', 'd-amber'] };
    let html = '';
    for (let i = 0; i < 7; i++) {
      const d = new Date(base); d.setDate(base.getDate() + i);
      const wd = d.toLocaleDateString(ar ? 'ar-EG' : 'en-GB', { weekday: 'short' });
      html += '<div class="day' + (i === 0 ? ' today' : '') + '"><span>' + wd + '</span><b class="num">' + d.getDate() + '</b><span class="dots">' + (marks[i] || []).map((c) => '<i class="' + c + '"></i>').join('') + '</span></div>';
    }
    box.innerHTML = html;
    let note = box.nextElementSibling;
    if (!note || !note.classList.contains('week-note')) { note = document.createElement('p'); note.className = 'week-note'; box.after(note); }
    note.innerHTML = K.icon('alert') + '<span>' + (ar ? 'استخدم البيض الأول · صلاحيته تنتهي الاثنين 9 نوفمبر' : 'Use the eggs first · they expire Mon 9 Nov') + '</span>';
  }
  buildWeek();
  const tileExp = $('.tile-expiry');
  tileExp.addEventListener('reveal', () => {
    if (!OK) return;
    A.animate($$('.day', tileExp), { opacity: [0, 1], y: [12, 0], duration: 600, delay: A.stagger(60, { start: 200 }), ease: 'out(4)' });
    A.animate($$('.dots i', tileExp), { scale: [0, 1], duration: 500, delay: A.stagger(120, { start: 800 }), ease: 'out(3)' });
    A.animate($('.week-note', tileExp), { opacity: [0, 1], y: [8, 0], duration: 600, delay: 1200, ease: 'out(4)' });
  });

  const tileP = $('.tile-pantry');
  tileP.addEventListener('reveal', () => {
    K.countUp($('.mp-count .num', tileP), { duration: 1800, delay: 300 });
    if (OK) A.animate($$('.mp-row', tileP), { opacity: [0, 1], x: [lang === 'ar' ? 16 : -16, 0], duration: 700, delay: A.stagger(90, { start: 150 }), ease: 'out(4)' });
  });

  scene($('.tile-scan'), () => {
    const laser = $('.tile-scan .laser'), pop = $('.scan-pop');
    const tl = A.createTimeline({ loop: true, loopDelay: 300, autoplay: false });
    tl.add(laser, { y: [-30, 30, -30, 30, 0], duration: 3400, ease: 'inOut(2)' }, 0)
      .add('.tile-scan .bars', { opacity: [.85, .35, .85], duration: 300 }, 3500)
      .add(pop, { opacity: [0, 1], y: [-8, 0], scale: [.9, 1], duration: 500, ease: 'out(4)' }, 3550)
      .add(pop, { opacity: 0, duration: 400 }, 5200);
    return tl;
  });

  function printReceipt() {
    const r = $('.receipt');
    if (!OK) { r.style.transform = 'none'; return; }
    A.animate(r, { y: ['-100%', '0%'], duration: 2000, ease: 'inOut(1.6)' });
    A.animate('.slot', { x: [0, -1.5, 1.5, -1, 1, 0], duration: 2000, ease: 'linear' });
  }
  $('.tile-reorder').addEventListener('reveal', () => setTimeout(printReceipt, 300));
  $('.reorder-btn').addEventListener('click', () => {
    const r = $('.receipt');
    if (OK) A.animate(r, { y: '-100%', duration: 350, ease: 'in(2)', onComplete: printReceipt }); else printReceipt();
    K.toast(T('toast.re', document.documentElement.lang === 'ar' ? 'السلة اتضافت · 147 جنيه' : 'Last basket added to cart · EGP 147'), { icon: 'cart', tone: 'violet' });
  });

  /* ---------- AI section: background paths + cards ---------- */
  (function paths() {
    const svg = $('.paths-bg'); if (!svg) return;
    const N = 22; let base = '', flow = '';
    for (let i = 0; i < N; i++) {
      const y = -30 + i * 17;
      const d = 'M-20 ' + (y + 70) + 'C' + (170 + i * 6) + ' ' + (y - 70 - i * 2) + ' ' + (390 - i * 5) + ' ' + (y + 130 + i * 3) + ' 720 ' + (y - 40 + i * 4);
      base += '<path d="' + d + '" stroke-opacity="' + (.07 + i * .005).toFixed(3) + '"/>';
      flow += '<path class="flow" d="' + d + '" stroke-opacity="' + (.3 + (i % 5) * .08).toFixed(2) + '"/>';
    }
    svg.innerHTML = base + flow;
    svg.querySelectorAll('path').forEach((p) => p.setAttribute('vector-effect', 'non-scaling-stroke'));
    if (!OK) { svg.querySelectorAll('.flow').forEach((p) => p.remove()); return; }
    let anims = [];
    K.onView($('#ai'), (v) => {
      if (v && !anims.length) {
        anims = $$('.flow', svg).map((p, i) => A.animate(A.createDrawable(p), { draw: ['0 0', '0 1', '1 1'], duration: 7000 + (i % 7) * 900, delay: i * 320, loop: true, ease: 'inOut(2)' }));
      } else anims.forEach((a) => (v ? a.play() : a.pause()));
    }, { once: false, threshold: 0 });
  })();
  const aiGrid = $('.ai-grid');
  aiGrid.addEventListener('reveal', () => {
    if (!OK) return;
    A.animate('.runbar i', { scaleX: [1, .3], duration: 2200, delay: 500, ease: 'out(3)' });
    $$('.cmp-bar i').forEach((b, i) => A.animate(b, { scaleX: [0, +b.style.getPropertyValue('--v')], duration: 1400, delay: 600 + i * 160, ease: 'out(4)' }));
    A.animate('.ghost-ring .arc', { rotate: [-90, 270], duration: 6000, loop: true, ease: 'linear' });
  });

  /* ---------- stores mini dashboard ---------- */
  K.onView($('.mini-dash'), () => {
    $$('.mini-dash [data-count]').forEach((n, i) => K.countUp(n, { duration: 1600, delay: i * 150 }));
    if (OK) $$('.md-bars i').forEach((b, i) => A.animate(b, { scaleY: [0, +b.style.getPropertyValue('--h')], duration: 1100, delay: 200 + i * 70, ease: 'out(4)' }));
  }, { threshold: .3 });

  /* ---------- FAQ ---------- */
  $$('.qa button').forEach((b) => b.addEventListener('click', () => {
    b.setAttribute('aria-expanded', String(b.getAttribute('aria-expanded') !== 'true'));
  }));

  /* ---------- boot ---------- */
  K.logoIntro();
  K.watchReveals();
  let booted = false;
  const boot = () => { if (!booted) { booted = true; heroIntro(false); } };
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(boot);
  setTimeout(boot, 1200);
})();
