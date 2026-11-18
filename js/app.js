/* Mouna AI · household app prototype */
(function () {
  'use strict';
  const K = window.K, A = K.A, OK = K.OK, ic = K.icon;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const TODAY = new Date(2026, 10, 5);
  const spring = (b, d) => (A && A.spring ? A.spring({ bounce: b, duration: d }) : 'out(4)');

  let lang = K.getLang();
  K.setLangAttr(lang);
  const AR = () => lang === 'ar';
  const t = (en, ar) => (AR() ? ar : en);
  const pick = (pair) => (Array.isArray(pair) ? (AR() ? pair[1] : pair[0]) : pair);

  const UI_AR = {
    'skip': 'اتخطى للمحتوى', 'side.lang': 'اللغة', 'side.site': 'رجوع للموقع',
    'tab.home': 'الرئيسية', 'tab.pantry': 'المخزن', 'tab.shop': 'تسوّق', 'tab.orders': 'الطلبات', 'tab.more': 'المزيد'
  };

  /* ---------------- data ---------------- */
  const ITEMS = [
    { id: 'yogurt', cat: 'dairy', ic: 'yogurt', n: ['Yogurt', 'زبادي'], qty: 2, step: 1, unit: 'cup', rate: 1, expDays: -1, exp: ['expired yesterday', 'صلاحيته انتهت امبارح'], prod: 'yogurt4' },
    { id: 'milk', cat: 'dairy', ic: 'milk', n: ['Milk', 'لبن'], qty: 2, step: .5, unit: 'L', rate: 2 / 3, expDays: 4, exp: ['exp. 9 Nov', 'ينتهي 9 نوفمبر'], prod: 'milk1l', showDate: true },
    { id: 'eggs', cat: 'dairy', ic: 'egg', n: ['Eggs', 'بيض'], qty: 6, step: 1, unit: 'pc', rate: 1, expDays: 4, exp: ['expire in 4 days', 'صلاحيته تنتهي خلال 4 أيام'], prod: 'eggs30', waste: true },
    { id: 'oil', cat: 'oils', ic: 'oil', n: ['Cooking oil', 'زيت طعام'], qty: .5, step: .25, unit: 'L', rate: .1, expDays: 120, exp: ['exp. Mar 2027', 'ينتهي مارس 2027'], prod: 'oil1l' },
    { id: 'rice', cat: 'grains', ic: 'rice', n: ['Rice', 'رز'], qty: 3, step: .5, unit: 'kg', rate: 1 / 6, expDays: 270, exp: ['exp. Aug 2027', 'ينتهي أغسطس 2027'], prod: 'rice1' },
    { id: 'bread', cat: 'grains', ic: 'bread', n: ['Baladi bread', 'عيش بلدي'], qty: 5, step: 1, unit: 'loaf', rate: 2.5, expDays: 3, exp: ['baked today', 'مخبوز النهارده'], prod: 'bread5' },
    { id: 'beans', cat: 'legumes', ic: 'beans', n: ['Fava beans', 'فول مدمس'], qty: 2, step: 1, unit: 'can', rate: .22, expDays: 400, exp: ['exp. Jan 2028', 'ينتهي يناير 2028'], prod: 'fava' },
    { id: 'sugar', cat: 'oils', ic: 'sugar', n: ['Sugar', 'سكر'], qty: 1, step: .25, unit: 'kg', rate: .07, expDays: 600, exp: ['no expiry date', 'مالوش تاريخ صلاحية'], prod: 'sugar1' }
  ];
  const PRODUCTS = [
    { id: 'milk1l', cat: 'dairy', ic: 'milk', n: ['Full-cream milk', 'لبن كامل الدسم'], sz: ['1 L', '1 لتر'], price: 34, was: 38, badge: ['−10%', 'خصم 10%'], pantry: 'milk' },
    { id: 'eggs30', cat: 'dairy', ic: 'egg', n: ['Eggs', 'بيض'], sz: ['Tray of 30', 'كرتونة 30'], price: 165, pantry: 'eggs', note: 'rise' },
    { id: 'cheese', cat: 'dairy', ic: 'cheese', n: ['White cheese', 'جبنة بيضا'], sz: ['500 g', '500 جرام'], price: 85, few: true, note: 'unavail' },
    { id: 'yogurt4', cat: 'dairy', ic: 'yogurt', n: ['Plain yogurt', 'زبادي سادة'], sz: ['Pack of 4', 'علبة 4'], price: 48, pantry: 'yogurt' },
    { id: 'ghee', cat: 'dairy', ic: 'ghee', n: ['Ghee', 'سمنة'], sz: ['800 g', '800 جرام'], price: 120, out: true },
    { id: 'butter', cat: 'dairy', ic: 'butter', n: ['Butter', 'زبدة'], sz: ['200 g', '200 جرام'], price: 70, badge: ['2 for 1', '1+1'] },
    { id: 'bread5', cat: 'grains', ic: 'bread', n: ['Baladi bread', 'عيش بلدي'], sz: ['5 loaves', '5 أرغفة'], price: 15, pantry: 'bread' },
    { id: 'rice1', cat: 'grains', ic: 'rice', n: ['Egyptian rice', 'رز مصري'], sz: ['1 kg', '1 كيلو'], price: 38, pantry: 'rice' },
    { id: 'oil1l', cat: 'oils', ic: 'oil', n: ['Sunflower oil', 'زيت عباد الشمس'], sz: ['1 L', '1 لتر'], price: 92, pantry: 'oil' },
    { id: 'sugar1', cat: 'oils', ic: 'sugar', n: ['Sugar', 'سكر'], sz: ['1 kg', '1 كيلو'], price: 32, pantry: 'sugar' },
    { id: 'tea', cat: 'oils', ic: 'tea', n: ['Tea', 'شاي'], sz: ['250 g', '250 جرام'], price: 45 },
    { id: 'tuna', cat: 'canned', ic: 'tuna', n: ['Tuna', 'تونة'], sz: ['185 g can', 'علبة 185 جرام'], price: 55 },
    { id: 'fava', cat: 'canned', ic: 'beans', n: ['Fava beans', 'فول مدمس'], sz: ['400 g can', 'علبة 400 جرام'], price: 22, pantry: 'beans' }
  ];
  const PCATS = [['all', 'All', 'الكل'], ['dairy', 'Dairy & eggs', 'ألبان وبيض'], ['grains', 'Bread & grains', 'خبز وحبوب'], ['oils', 'Oils & sweeteners', 'زيوت وسكريات'], ['legumes', 'Legumes', 'بقوليات']];
  const SCATS = [['dairy', 'Dairy & eggs', 'ألبان وبيض'], ['grains', 'Bread & grains', 'خبز وحبوب'], ['oils', 'Oils & sweeteners', 'زيوت وسكريات'], ['canned', 'Canned & frozen', 'معلبات ومجمدات']];
  const STEPS = [['Placed', 'اتطلب'], ['Preparing', 'بيتجهز'], ['Out for delivery', 'في الطريق'], ['Delivered', 'اتسلّم']];
  const HOMES = {
    individual: { ic: 'user', n: ['Just me', 'أنا بس'], d: ['One person, one pantry to keep track of', 'شخص واحد، مخزن واحد أتابعه'], title: ['Your pantry', 'مخزنك'] },
    shared: { ic: 'house', n: ['Shared home', 'سكن مشترك'], d: ['A family, friends or students under one roof', 'عيلة أو أصحاب أو طلبة في بيت واحد'], title: ['The Hassan home', 'بيت حسن'] }
  };
  /* household members: sex + age group feed the per-person consumption norms */
  const SEXES = [['male', 'Male', 'ذكر'], ['female', 'Female', 'أنثى']];
  const AGES = [['child', 'Child', 'طفل', 'children', 'أطفال'], ['teen', 'Teen', 'مراهق', 'teens', 'مراهقين'], ['adult', 'Adult', 'بالغ', 'adults', 'بالغين'], ['older_adult', 'Older adult', 'كبير في السن', 'older adults', 'كبار سن']];
  /* the account holder ("You") is always an adult or an older adult */
  const ADULT_AGES = AGES.filter((a) => a[0] === 'adult' || a[0] === 'older_adult');
  const isAdult = (m) => m.age === 'adult' || m.age === 'older_adult';
  const DEMO = [
    { name: ['Mona', 'منى'], sex: 'female', age: 'adult', owner: true, linked: true },
    { name: ['Hassan', 'حسن'], sex: 'male', age: 'adult' },
    { name: ['Youssef', 'يوسف'], sex: 'male', age: 'teen' },
    { name: ['Laila', 'ليلى'], sex: 'female', age: 'child' },
    { name: ['Fatma', 'فاطمة'], sex: 'female', age: 'older_adult' }
  ];
  const INVITE = 'MNA-48C2', MIN_P = 2, MAX_P = 15;
  const blank = () => ({ sex: '', age: '', name: '' });
  const clone = (a) => a.map((m) => Object.assign({}, m));
  const freshJoin = () => ({ code: '', err: false, found: false, pick: null, extra: blank() });

  const S = {
    screen: 'onboarding', household: 'shared', onbChoice: 'shared',
    onbStep: 'type', onbFrom: null, count: 3, draft: [],
    members: clone(DEMO).map((m, i) => Object.assign(m, { you: i === 0 })),
    join: freshJoin(),
    items: ITEMS.map((i) => Object.assign({}, i)),
    cart: { milk1l: 1, eggs30: 1, yogurt4: 1 },
    pcat: 'all', q: '', grid: false, scat: 'dairy',
    orders: [{ id: 1042, step: 2, store: ['El Nour Market', 'النور ماركت'], icons: ['milk', 'bread', 'egg', 'oil', 'rice', 'tea', 'sugar', 'tuna'], eta: ['8 items · arriving around 7:40 PM', '8 أصناف · هيوصل حوالي 7:40 م'] }],
    extra: 19
  };

  /* ---------------- formatting ---------------- */
  const num = (n) => String(Math.round(n * 100) / 100);
  const money = (n) => (AR() ? n.toLocaleString('en-US') + ' ج.م' : 'EGP ' + n.toLocaleString('en-US'));
  const prodOf = (id) => PRODUCTS.find((p) => p.id === id);
  const itemOf = (id) => S.items.find((i) => i.id === id);
  const days = (it) => Math.max(0, Math.round(it.qty / it.rate));
  function status(it) {
    if (it.expDays < 0) return 'expired';
    const d = days(it);
    if (d <= 5) return 'low';
    if (it.expDays <= 4) return 'expiring';
    return 'fresh';
  }
  const urgency = (it) => (it.expDays < 0 ? -1 : Math.min(days(it), it.expDays));
  const STATUS = { expired: ['Expired', 'منتهي', 'chip-expired'], low: ['Running low', 'قرب يخلص', 'chip-low'], expiring: ['Expiring soon', 'صلاحيته قربت', 'chip-expiring'], fresh: ['Fresh', 'طازة', 'chip-fresh'] };
  const UNITS = { L: ['L', 'لتر'], kg: ['kg', 'كيلو'], cup: ['cups', 'كوب'], pc: ['', ''], loaf: ['loaves', 'رغيف'], can: ['cans', 'علبة'] };
  function arQ(q) { return q === .5 ? 'نص' : q === .25 ? 'ربع' : q === .75 ? 'تلات تربع' : num(q); }
  function qtyShort(it) {
    const q = it.qty;
    if (AR()) return it.unit === 'pc' ? num(q) : arQ(q) + ' ' + UNITS[it.unit][1];
    if (it.unit === 'pc') return num(q);
    if (it.unit === 'cup') return num(q) + (q === 1 ? ' cup' : ' cups');
    if (it.unit === 'loaf') return num(q) + (q === 1 ? ' loaf' : ' loaves');
    if (it.unit === 'can') return num(q) + (q === 1 ? ' can' : ' cans');
    return num(q) + ' ' + UNITS[it.unit][0];
  }
  function qtyLine(it) {
    if (it.unit === 'cup' && it.expDays < 0) return qtyShort(it);
    return AR() ? 'فاضل ' + qtyShort(it) : qtyShort(it) + ' left';
  }
  function daysTxt(n) {
    if (!AR()) return n + (n === 1 ? ' day' : ' days');
    if (n === 1) return 'يوم'; if (n === 2) return 'يومين';
    return n + (n <= 10 ? ' أيام' : ' يوم');
  }
  const runsIn = (n) => (n === 0 ? t('today', 'النهارده') : t('in ', 'خلال ') + daysTxt(n));
  function dateTxt(off) {
    const d = new Date(TODAY); d.setDate(d.getDate() + off);
    return AR() ? d.toLocaleDateString('ar-EG-u-nu-latn', { weekday: 'long', day: 'numeric', month: 'long' }).replace('،', '')
      : d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
  }
  const cartCount = () => Object.values(S.cart).reduce((a, b) => a + b, 0);
  const cartTotal = () => Object.entries(S.cart).reduce((a, [id, q]) => a + prodOf(id).price * q, 0);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const labelOf = (list, v) => { const o = list.find((x) => x[0] === v); return o ? t(o[1], o[2]) : ''; };
  const nameOf = (m) => (m.name ? pick(m.name) : '');
  const rowOk = (m) => !!(m && m.sex && m.age);
  const rowsN = () => (S.onbChoice === 'individual' ? 1 : S.count);
  const peopleTxt = (n) => n + t(n === 1 ? ' person' : ' people', n === 1 ? ' فرد' : ' أفراد');
  function ensureDraft(n) { while (S.draft.length < n) S.draft.push(blank()); }
  function ageSummary(list) {
    return ['adult', 'older_adult', 'teen', 'child'].map((k) => AGES.find((a) => a[0] === k)).map((a) => [a, list.filter((m) => m.age === a[0]).length]).filter((x) => x[1])
      .map(([a, n]) => n + ' ' + (AR() ? (n === 1 ? a[2] : a[4]) : (n === 1 ? a[1].toLowerCase() : a[3]))).join(AR() ? '، ' : ', ');
  }

  /* ---------------- shell ---------------- */
  const screenEl = $('#screen'), view = $('#view'), tabbar = $('#tabbar'), host = $('#sheetHost');
  const Z = 1; /* the app fills the window; no scaled device frame */
  const wide = matchMedia('(min-width: 900px)');
  const TABS = ['home', 'pantry', 'shop', 'orders', 'more'];
  function placeInd(instant) {
    const cur = $('[aria-current="page"]', tabbar); const ind = $('.tab-ind', tabbar);
    if (!cur || wide.matches) { ind.style.opacity = 0; return; } /* the side nav highlights the current item itself */
    const p = { x: cur.offsetLeft + (cur.offsetWidth - 56) / 2, opacity: 1 };
    if (!OK || instant) { A ? A.utils.set(ind, p) : (ind.style.transform = 'translateX(' + p.x + 'px)'); ind.style.opacity = 1; }
    else A.animate(ind, Object.assign({ duration: 600, ease: spring(.25, 520) }, p));
  }
  function updateBadge(bump) {
    const b = $('.tab-badge', tabbar), n = cartCount();
    b.hidden = n === 0; b.textContent = n;
    if (bump && OK && n) A.animate(b, { scale: [1.5, 1], duration: 500, ease: spring(.5, 450) });
  }
  function applyUI() {
    K.applyDict(AR() ? UI_AR : null);
  }

  /* ---------------- navigation ---------------- */
  function go(screen, opts) {
    opts = opts || {};
    const prev = S.screen;
    S.screen = screen;
    try { history.replaceState(null, '', '#' + screen); } catch (e) {}
    const dir = opts.dir || (TABS.indexOf(screen) >= TABS.indexOf(prev) ? 1 : -1);
    document.body.classList.toggle('onb-full', screen === 'onboarding');
    screenEl.classList.toggle('no-tabs', screen === 'onboarding');
    screenEl.classList.toggle('on-deep', screen === 'shop');
    $$('button', tabbar).forEach((b) => b.toggleAttribute('aria-current', false));
    const tb = $('[data-go="' + screen + '"]', tabbar); if (tb) tb.setAttribute('aria-current', 'page');
    placeInd(!!opts.instant);
    render(screen);
    view.scrollTop = 0;
    if (OK && !opts.instant) {
      const pane = view.firstElementChild;
      const rtl = AR() ? -1 : 1;
      A.animate(pane, { opacity: [0, 1], x: [dir * rtl * 26, 0], duration: 520, ease: 'out(4)' });
      A.animate($$('[data-st]', pane), { opacity: [0, 1], y: [14, 0], duration: 600, delay: A.stagger(55, { start: 80 }), ease: 'out(4)' });
    }
    if (opts.focus !== false) { const h1 = screen === 'onboarding' && $('h1[tabindex]', view); (h1 || view).focus({ preventScroll: true }); }
  }
  function render(screen) {
    const fn = { onboarding: vOnb, home: vHome, pantry: vPantry, shop: vShop, orders: vOrders, more: vMore }[screen] || vHome;
    view.innerHTML = '<div class="' + (screen === 'onboarding' ? 'onb onb-' + S.onbStep : 'pane') + '" data-screen="' + screen + '">' + fn() + '</div>';
    K.hydrateIcons(view);
    const after = { pantry: afterPantry, shop: afterShop, home: afterHome, orders: afterOrders, onboarding: afterOnb }[screen];
    if (after) after();
  }

  /* ---------------- views ---------------- */
  const lockSvg = () => ic('lock');
  function lockedCard(title, desc, cls, ghost) {
    return '<div class="locked ' + (cls || '') + '" data-st><div class="ghost">' + (ghost || '<i style="left:12%;top:18%;width:58%;height:12px"></i><i style="left:12%;top:40%;width:22%;height:46px"></i><i style="left:40%;top:40%;width:22%;height:46px"></i><i style="left:68%;top:40%;width:22%;height:46px"></i>') +
      '</div><div class="lock-copy"><strong>' + lockSvg() + title + '</strong><span>' + desc + '</span><span class="chip chip-soon">' + t('Coming soon', 'قريبًا') + '</span></div></div>';
  }

  /* ---- onboarding: "Who are you?" -> members (or join by invite) ---- */
  const HELPER = () => t('Used only to estimate how fast your home uses staples. Never shared with stores.', 'بنستخدمها بس عشان نقدّر بيتك بيخلّص الأساسيات بسرعة قد إيه. عمرها ما بتتشارك مع المتاجر.');
  const LEAD = () => t('This sets how fast we expect your staples to run out. You can change it later.', 'ده بيحدد الأساسيات بتاعتك هتخلص بسرعة قد إيه. تقدر تغيّره بعدين.');
  function onbTop(n, back) {
    return '<div class="onb-top"><button class="icon-btn" type="button" data-act="' + back + '" aria-label="' + t('Back', 'رجوع') + '">' + ic('left') + '</button><p>' + t('Step ' + n + ' of 7', 'الخطوة ' + n + ' من 7') + '</p><span></span></div>' +
      '<div class="progress" aria-hidden="true"><i data-p="' + (n / 7) + '"></i></div>';
  }
  function optCard(act, k, on, first, anyOn, icon, title, sub) {
    return '<button type="button" class="opt" role="radio" aria-checked="' + on + '" tabindex="' + (on || (!anyOn && first) ? 0 : -1) + '" data-act="' + act + '" data-k="' + k + '" data-st><span class="o-ic">' + ic(icon) + '</span><span><b>' + title + '</b><small>' + sub + '</small></span><span class="o-check">' + ic('check') + '</span></button>';
  }
  function radios(g, list, val, label, cls, ro) {
    const anyOn = list.some((o) => o[0] === val);
    return '<div class="seg-r' + (cls ? ' ' + cls : '') + '" role="radiogroup" aria-label="' + esc(label) + '">' + list.map((o, i) => {
      const on = o[0] === val;
      return '<button type="button" role="radio" aria-checked="' + on + '" tabindex="' + (on || (!anyOn && i === 0) ? 0 : -1) + '" data-act="mset" data-g="' + g + '" data-v="' + o[0] + '"' + (ro ? ' disabled' : '') + '>' + t(o[1], o[2]) + '</button>';
    }).join('') + '</div>';
  }
  function memberRow(src, i, m, o) {
    const g = src + ':' + i, lab = o.label;
    return '<fieldset class="mrow' + (o.you ? ' is-you' : '') + (rowOk(m) ? ' is-ok' : '') + '"' + (o.st === false ? '' : ' data-st') + '><legend><span class="m-av" aria-hidden="true">' + (o.you ? ic('user') : i + 1) + '</span><span>' + lab + '</span><span class="m-ok" aria-hidden="true">' + ic('check') + '</span></legend>' +
      '<div class="m-f"><span class="m-l" aria-hidden="true">' + t('Sex', 'النوع') + '</span>' + radios(g + ':sex', SEXES, m.sex, lab + ', ' + t('sex', 'النوع'), '', o.ro) + '</div>' +
      '<div class="m-f"><span class="m-l" aria-hidden="true">' + t('Age group', 'الفئة العمرية') + '</span>' + radios(g + ':age', o.you ? ADULT_AGES : AGES, m.age, lab + ', ' + t('age group', 'الفئة العمرية'), o.you ? 'ages two' : 'ages', o.ro) + '</div>' +
      (o.name ? '<div class="m-f"><label class="m-l" for="nm-' + src + i + '">' + t('Name (optional)', 'الاسم (اختياري)') + '</label><input class="input" id="nm-' + src + i + '" data-g="' + g + ':name" autocomplete="off" maxlength="40" value="' + esc(nameOf(m)) + '"></div>' : '') +
      '</fieldset>';
  }
  const draftRow = (i) => memberRow('d', i, S.draft[i], { label: i === 0 ? t('You', 'إنت') : t('Person ', 'الشخص ') + (i + 1), you: i === 0, name: S.onbChoice !== 'individual' });
  function onbFoot(act, hint) {
    const ok = onbValid();
    return '<div class="onb-foot" data-st><p class="priv">' + ic('lock') + HELPER() + '</p>' +
      '<p class="onb-hint" id="onbHint"' + (ok ? ' hidden' : '') + '>' + hint + '</p>' +
      '<button class="btn btn-primary btn-block" type="button" id="onbGo" data-act="' + act + '"' + (ok ? '' : ' disabled') + '>' + t('Continue', 'كمّل') + '</button></div>';
  }
  function onbValid() {
    if (S.onbStep === 'members') return S.draft.slice(0, rowsN()).every(rowOk);
    if (S.onbStep === 'join') return S.join.pick != null && (S.join.pick !== 'new' || rowOk(S.join.extra));
    return true;
  }
  function refreshValid() {
    const ok = onbValid(), b = $('#onbGo', view), h = $('#onbHint', view);
    if (b) b.disabled = !ok; if (h) h.hidden = ok;
  }

  function vOnb() {
    if (S.onbStep === 'members') return vOnbMembers();
    if (S.onbStep === 'join') return vOnbJoin();
    const anyOn = !!HOMES[S.onbChoice];
    const opt = (k, i) => { const h = HOMES[k]; return optCard('pick', k, S.onbChoice === k, i === 0, anyOn, h.ic, pick(h.n), pick(h.d)); };
    return onbTop(1, 'onbExit') +
      '<h1 tabindex="-1" data-st>' + t('Who are you?', 'إنت مين؟') + '</h1>' +
      '<p class="lead" data-st>' + t('Pick the one that fits your home. You can change it later.', 'اختار اللي يناسب بيتك. تقدر تغيّره بعدين.') + '</p>' +
      '<div class="opts" role="radiogroup" aria-label="' + t('Who are you?', 'إنت مين؟') + '">' + ['individual', 'shared'].map(opt).join('') + '</div>' +
      '<button class="onb-alt" type="button" data-act="toJoin" data-st>' + t('Joining someone’s home? Use an invite code', 'هتنضم لبيت حد؟ استخدم كود الدعوة') + '</button>' +
      '<div class="onb-foot" data-st><p class="priv">' + ic('lock') + t('Your answers stay private to your household.', 'إجاباتك بتفضل خاصة ببيتك.') + '</p></div>';
  }
  function vOnbMembers() {
    const solo = S.onbChoice === 'individual', n = rowsN();
    ensureDraft(n);
    const rows = []; for (let i = 0; i < n; i++) rows.push(draftRow(i));
    return onbTop(2, 'onbBack') +
      '<h1 tabindex="-1" data-st>' + (solo ? t('About you', 'عنك') : t('Who lives in your home?', 'مين عايش في بيتك؟')) + '</h1>' +
      '<p class="lead" data-st>' + LEAD() + '</p>' +
      (solo ? '' : '<div class="count" data-st><p id="cntL">' + t('How many people live in your home, including you?', 'كام واحد عايش في بيتك، وإنت منهم؟') + '</p>' +
        '<div class="count-c" role="group" aria-labelledby="cntL"><button type="button" data-act="cnt" data-d="-1" aria-label="' + t('One person fewer', 'فرد أقل') + '"' + (n <= MIN_P ? ' disabled' : '') + '>' + ic('minus') + '</button>' +
        '<output class="num" id="cntV" aria-live="polite">' + n + '</output>' +
        '<button type="button" data-act="cnt" data-d="1" aria-label="' + t('One person more', 'فرد زيادة') + '"' + (n >= MAX_P ? ' disabled' : '') + '>' + ic('plus') + '</button></div></div>') +
      '<div class="mrows' + (solo ? ' single' : '') + '" id="mrows">' + rows.join('') + '</div>' +
      onbFoot('onbNext', solo ? t('Choose your sex and age group to continue.', 'اختار النوع والفئة العمرية عشان تكمّل.') : t('Choose a sex and an age group for everyone to continue.', 'اختار النوع والفئة العمرية لكل واحد عشان تكمّل.'));
  }
  function vOnbJoin() {
    const J = S.join;
    if (!J.found) {
      return onbTop(1, 'onbBack') +
        '<h1 tabindex="-1" data-st>' + t('Join a household', 'انضم لبيت') + '</h1>' +
        '<p class="lead" data-st>' + t('Enter the invite code someone in the home shared with you.', 'اكتب كود الدعوة اللي حد من البيت بعتهولك.') + '</p>' +
        '<form class="form join-form" data-form="join" novalidate data-st><div class="field"><label for="jCode">' + t('Invite code', 'كود الدعوة') + '</label>' +
        '<input class="input num" id="jCode" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="MNA-0000" value="' + esc(J.code) + '"' + (J.err ? ' aria-invalid="true" aria-describedby="jErr"' : '') + '></div>' +
        (J.err ? '<p class="field-err" id="jErr" role="alert">' + t('We couldn’t find a home with that code. In this prototype, try ' + INVITE + '.', 'ملقيناش بيت بالكود ده. في النموذج ده جرّب ' + INVITE + '.') + '</p>' : '') +
        '<button class="btn btn-primary btn-block" type="submit">' + t('Find the household', 'دوّر على البيت') + '</button></form>';
    }
    const free = DEMO.map((m, i) => [m, i]).filter((x) => !x[0].linked && isAdult(x[0]));
    const anyOn = J.pick != null;
    return onbTop(2, 'onbBack') +
      '<h1 tabindex="-1" data-st>' + t('Which one is you?', 'مين فيهم إنت؟') + '</h1>' +
      '<p class="lead" data-st>' + t('The Hassan home already added these adults. Pick yourself so nobody is counted twice.', 'بيت حسن ضافوا الكبار دول. اختار نفسك عشان محدش يتحسب مرتين.') + '</p>' +
      '<div class="opts" role="radiogroup" aria-label="' + t('Which one is you?', 'مين فيهم إنت؟') + '">' +
      free.map(([m, i], j) => optCard('jpick', String(i), J.pick === String(i), j === 0, anyOn, 'user', esc(nameOf(m)), labelOf(AGES, m.age) + ' · ' + labelOf(SEXES, m.sex))).join('') +
      optCard('jpick', 'new', J.pick === 'new', false, anyOn, 'plus', t('I’m not listed', 'أنا مش في القايمة'), t('Add me as a new member', 'ضيفني كفرد جديد')) + '</div>' +
      '<div id="jextra">' + (J.pick === 'new' ? memberRow('j', 0, J.extra, { label: t('You', 'إنت'), you: true, name: true, st: false }) : '') + '</div>' +
      onbFoot('joinGo', J.pick === 'new' ? t('Choose your sex and age group to continue.', 'اختار النوع والفئة العمرية عشان تكمّل.') : t('Pick yourself to continue.', 'اختار نفسك عشان تكمّل.'));
  }
  function afterOnb() {
    const i = $('.progress i', view); if (!i) return;
    const p = +i.dataset.p;
    i.style.transform = 'scaleX(' + p + ')';
    if (OK) A.animate(i, { scaleX: [Math.max(0, p - 1 / 7), p], duration: 900, delay: 200, ease: 'out(4)' });
  }
  /* radio helpers shared by type cards, segmented controls and the claim list */
  function checkIn(b) {
    $$('[role="radio"]', b.closest('[role="radiogroup"]')).forEach((o) => { o.setAttribute('aria-checked', String(o === b)); o.tabIndex = o === b ? 0 : -1; });
  }
  function rowRef(g) {
    const p = g.split(':'), arr = p[0] === 'd' ? S.draft : p[0] === 'm' ? S.members : [S.join.extra];
    return { m: arr[+p[1]], f: p[2] };
  }
  function setField(b) {
    const r = rowRef(b.dataset.g); if (!r.m) return;
    r.m[r.f] = b.dataset.v;
    checkIn(b);
    if (OK) A.animate(b, { scale: [.94, 1], duration: 350, ease: spring(.5, 350) });
    const row = b.closest('.mrow'); if (row) row.classList.toggle('is-ok', rowOk(r.m));
    refreshValid();
  }
  function setCount(n) {
    n = Math.max(MIN_P, Math.min(MAX_P, n)); if (n === S.count) return;
    const prev = S.count; S.count = n; ensureDraft(n);
    const box = $('#mrows', view); if (!box) return;
    if (n > prev) {
      const tmp = document.createElement('div'); let html = '';
      for (let i = prev; i < n; i++) html += draftRow(i);
      tmp.innerHTML = html; K.hydrateIcons(tmp);
      const added = Array.from(tmp.children); added.forEach((r) => box.appendChild(r));
      if (OK) A.animate(added, { opacity: [0, 1], y: [12, 0], duration: 450, ease: 'out(4)' });
    } else {
      Array.from(box.children).slice(n).forEach((r) => r.remove()); /* values stay in S.draft */
    }
    $('#cntV', view).textContent = n;
    const [dec, inc] = $$('.count-c button', view);
    dec.disabled = n <= MIN_P; inc.disabled = n >= MAX_P;
    refreshValid();
  }
  function pickType(b) {
    const box = b.closest('.opts'); if (box.dataset.busy) return; box.dataset.busy = '1';
    S.onbChoice = b.dataset.k;
    checkIn(b);
    if (OK) { A.animate($('.o-check', b), { scale: [.4, 1], duration: 500, ease: spring(.55, 450) }); A.animate(b, { scale: [.98, 1], duration: 400, ease: 'out(3)' }); }
    setTimeout(() => { S.onbStep = 'members'; go('onboarding'); }, OK ? 320 : 0);
  }
  function jpick(b) {
    S.join.pick = b.dataset.k;
    checkIn(b);
    const box = $('#jextra', view);
    box.innerHTML = S.join.pick === 'new' ? memberRow('j', 0, S.join.extra, { label: t('You', 'إنت'), you: true, name: true, st: false }) : '';
    K.hydrateIcons(box);
    if (OK && box.firstChild) A.animate(box.firstChild, { opacity: [0, 1], y: [10, 0], duration: 420, ease: 'out(4)' });
    const h = $('#onbHint', view); if (h) h.textContent = S.join.pick === 'new' ? t('Choose your sex and age group to continue.', 'اختار النوع والفئة العمرية عشان تكمّل.') : t('Pick yourself to continue.', 'اختار نفسك عشان تكمّل.');
    refreshValid();
  }
  function joinFind() {
    const J = S.join;
    if (J.code.trim().toUpperCase() === INVITE) { J.found = true; J.err = false; J.pick = null; go('onboarding'); return; }
    J.err = true; go('onboarding', { instant: true, focus: false });
    const inp = $('#jCode', view); if (inp) inp.focus();
  }
  function joinGo() {
    if (!onbValid()) return;
    const J = S.join, list = clone(DEMO).map((m) => Object.assign(m, { you: false }));
    let line;
    if (J.pick === 'new') { list.push(Object.assign({}, J.extra, { you: true, linked: true })); line = t('Added you as a new member', 'اتضفت كفرد جديد'); }
    else { const m = list[+J.pick]; m.linked = true; m.you = true; line = t('Linked you to ', 'ربطناك بـ ') + nameOf(m); }
    S.onbChoice = 'shared';
    setup(list, [t('Joined The Hassan home', 'انضميت لبيت حسن'), line]);
  }

  function vHome() {
    const h = HOMES[S.household];
    const low = S.items.filter((i) => status(i) === 'low').sort((a, b) => days(a) - days(b)).slice(0, 3);
    const exp = S.items.filter((i) => status(i) === 'expired' || status(i) === 'expiring').sort((a, b) => a.expDays - b.expDays).slice(0, 2);
    const o = S.orders.find((x) => x.step === 2);
    return '<div class="greet" data-st><div><small>' + t('Good evening', 'مساء الخير') + '</small><h1>' + pick(h.title) + '</h1></div>' +
      '<button class="icon-btn bell" type="button" data-act="alerts" aria-label="' + t('Alerts', 'التنبيهات') + '">' + ic('bell') + '<span class="bdot"></span></button></div>' +
      (o ? '<button class="deliv" type="button" data-act="go" data-to="orders" data-st><span class="d-ic">' + ic('truck', 'truck-ic') + '</span><span><b>' + t('Out for delivery · ', 'في الطريق · ') + pick(o.store) + '</b><small>' + pick(o.eta) + '</small></span>' + ic('right', 'chev') + '<span class="d-track"><i></i></span></button>' : '') +
      '<div class="row-head" data-st><h2>' + t('Running out soon', 'قرب يخلص') + ' <span class="ai-badge">' + ic('spark') + 'AI</span></h2><button class="link" type="button" data-act="go" data-to="pantry">' + t('See all', 'الكل') + '</button></div>' +
      '<div class="panel" data-st>' + (low.length ? low.map((i) => '<div class="line-item"><span class="thumb">' + ic(i.ic) + '</span><span class="li-meta"><b>' + pick(i.n) + '</b><small>' + qtyLine(i) + '</small></span><span class="li-days">' + runsIn(days(i)) + '</span><button class="add-btn" type="button" data-act="addProd" data-p="' + i.prod + '" aria-label="' + t('Add ', 'أضف ') + pick(i.n) + t(' to cart', ' للسلة') + '">' + ic('plus') + '</button></div>').join('') : '<p class="empty">' + t('Nothing is running low.', 'مفيش حاجة قربت تخلص.') + '</p>') + '</div>' +
      '<div class="row-head" data-st><h2>' + t('Expiring soon', 'صلاحيته قربت') + '</h2></div>' +
      '<div class="panel" data-st>' + exp.map((i) => '<div class="line-item" style="grid-template-columns:44px 1fr auto"><span class="thumb ' + (i.expDays < 0 ? 'is-red' : 'is-amber') + '">' + ic(i.ic) + '</span><span class="li-meta"><b>' + pick(i.n) + '</b><small>' + qtyShort(i) + '</small></span><span class="exp-chip ' + (i.expDays < 0 ? 'red' : 'amber') + '">' + (i.expDays < 0 ? t('Expired yesterday', 'انتهى امبارح') : t('Expires in ' + i.expDays + ' days', 'تنتهي خلال ' + i.expDays + ' أيام')) + '</span></div>').join('') + '</div>' +
      '<div class="row-head" data-st><h2>' + t('For you', 'ليك') + ' <span class="ai-badge">' + ic('spark') + 'AI</span></h2></div>' +
      '<div class="foryou">' + lockedCard(t('Your next basket', 'سلتك الجاية'), t('A ready-made list of what to buy next.', 'قائمة جاهزة باللي محتاج تشتريه بعد كده.'), 'wide') +
      lockedCard(t('Use soon', 'استخدمه قريب'), t('Items likely to expire before they\'re used.', 'أصناف ممكن تنتهي قبل ما تتستخدم.'), '', '<i style="left:12%;top:16%;width:60%;height:10px"></i><i style="left:12%;top:30%;width:40%;height:10px"></i>') +
      lockedCard(t('Budget this month', 'ميزانية الشهر'), t('Where spending lands by payday.', 'مصروفك هيوصل لفين لحد القبض.'), '', '<i style="left:45%;top:10%;width:46px;height:46px;border-radius:50%"></i>') + '</div>' +
      '<div class="row-head" data-st><h2>' + t('Quick reorder', 'اطلب تاني بسرعة') + '</h2></div>' +
      '<div class="quick" data-st>' + ['tea', 'sugar1', 'tuna'].map((id) => { const p = prodOf(id); return '<button class="qcard" type="button" data-act="addProd" data-p="' + id + '"><span class="q-img">' + ic(p.ic) + '</span><b>' + (id === 'sugar1' ? t('Sugar 1 kg', 'سكر 1 كيلو') : pick(p.n)) + '</b><small>' + money(p.price) + '</small></button>'; }).join('') + '</div>' +
      '<div class="row-head" data-st><h2>' + t('Latest offers', 'أحدث العروض') + '</h2></div>' +
      '<div class="offer" data-st><div><b>' + t('Cooking oil −15%', 'خصم 15% على زيت الطعام') + '</b><small>' + t('Bahary Supermarket · until Sunday', 'بحري سوبرماركت · لحد الأحد') + '</small></div><button class="btn btn-light btn-sm" type="button" data-act="go" data-to="shop">' + t('Shop', 'تسوّق') + '</button></div>';
  }
  function afterHome() {
    if (!OK) return;
    A.animate('.truck-ic', { x: [-2, 2], duration: 700, loop: true, alternate: true, ease: 'inOut(2)' });
    A.animate('.d-track i', { scaleX: [.55, .72], duration: 2600, ease: 'out(3)' });
  }

  function itemCard(it) {
    const st = status(it), s = STATUS[st];
    const d = days(it);
    const run = st === 'expired' ? '' : '<p class="it-run">' + ic('spark') + '<span>' + t('Runs out ', 'هيخلص ') + runsIn(d) + (it.showDate ? ' · ' + dateTxt(d) : '') + '</span>' + (it.waste ? '<span class="lock-chip">' + ic('lock') + t('Waste risk · coming soon', 'خطر الهدر · قريبًا') + '</span>' : '') + '</p>';
    const acts = st === 'expired'
      ? '<button class="btn btn-secondary" type="button" data-act="toss" data-id="' + it.id + '">' + t('Throw away', 'اترمى') + '</button><button class="btn btn-secondary" type="button" data-act="finish" data-id="' + it.id + '">' + t('Finished', 'خلص') + '</button>'
      : '<button class="btn btn-secondary" type="button" data-act="use" data-id="' + it.id + '">' + t('−1 used', 'استخدمت 1−') + '</button><button class="btn btn-secondary" type="button" data-act="finish" data-id="' + it.id + '">' + t('Finished', 'خلص') + '</button>' +
        (st === 'low' && it.prod ? '<button class="add-btn is-solid" type="button" data-act="addProd" data-p="' + it.prod + '" aria-label="' + t('Add to cart', 'أضف للسلة') + '">' + ic('cart') + '</button>' : '');
    return '<article class="item' + (st === 'expired' ? ' is-expired' : '') + '" data-id="' + it.id + '"><div class="it-top"><span class="thumb' + (st === 'expired' ? ' is-red' : st === 'expiring' ? ' is-amber' : '') + '">' + ic(it.ic) + '</span><div><p class="it-name">' + pick(it.n) + '</p><p class="it-qty">' + qtyLine(it) + ' · ' + pick(it.exp) + '</p></div><span class="chip ' + s[2] + '">' + pick(s) + '</span></div>' + run + '<div class="it-acts">' + acts + '</div></article>';
  }
  function visibleItems() {
    const q = S.q.trim().toLowerCase();
    return S.items.filter((i) => (S.pcat === 'all' || i.cat === S.pcat) && (!q || i.n[0].toLowerCase().includes(q) || i.n[1].includes(q))).sort((a, b) => urgency(a) - urgency(b));
  }
  function sumChips() {
    const c = { expired: 0, low: 0, expiring: 0 };
    S.items.forEach((i) => { const s = status(i); if (s in c) c[s]++; });
    return (c.expired ? '<span class="chip chip-expired">' + c.expired + t(' expired', ' منتهي') + '</span>' : '') +
      (c.low ? '<span class="chip chip-low">' + c.low + t(' running low', ' قربوا يخلصوا') + '</span>' : '') +
      (c.expiring ? '<span class="chip chip-expiring">' + c.expiring + t(' expiring', ' صلاحيتهم قربت') + '</span>' : '');
  }
  const countLine = () => (S.items.length + S.extra) + t(' items · shared by ', ' صنف · مشترك بين ') + S.members.length + t(S.members.length === 1 ? ' member' : ' members', ' أفراد');
  function vPantry() {
    return '<div class="top" data-st><div><h1>' + t('Pantry', 'المخزن') + '</h1><p class="sub p-count">' + countLine() + '</p></div><button class="btn btn-primary fab-add" type="button" data-act="addItem">' + ic('plus') + t('Add item', 'إضافة صنف') + '</button></div>' +
      '<div class="p-tools" data-st><label class="search"><span class="sr-only">' + t('Search your pantry', 'ابحث في المخزن') + '</span>' + ic('search') + '<input class="input" type="search" data-act="search" value="' + S.q.replace(/"/g, '&quot;') + '" placeholder="' + t('Search your pantry', 'ابحث في المخزن') + '"></label>' +
      '<div class="viewtog" role="group" aria-label="' + t('Layout', 'العرض') + '"><button type="button" data-act="grid" data-v="0" aria-pressed="' + !S.grid + '" aria-label="' + t('List', 'قائمة') + '">' + ic('list') + '</button><button type="button" data-act="grid" data-v="1" aria-pressed="' + S.grid + '" aria-label="' + t('Grid', 'شبكة') + '">' + ic('grid') + '</button></div></div>' +
      '<div class="seg cats" data-st role="group" aria-label="' + t('Categories', 'الأقسام') + '">' + PCATS.map((c) => '<button class="fchip" type="button" data-value="' + c[0] + '" aria-pressed="' + (S.pcat === c[0]) + '">' + (AR() ? c[2] : c[1]) + '</button>').join('') + '</div>' +
      '<div class="sumchips" data-st>' + sumChips() + '</div>' +
      '<div class="items' + (S.grid ? ' is-grid' : '') + '" id="items">' + listHTML() + '</div>';
  }
  function listHTML() {
    const v = visibleItems();
    return v.length ? v.map(itemCard).join('') : '<div class="empty" data-id="empty"><span class="thumb">' + ic('search') + '</span>' + t('Nothing here yet.', 'مفيش حاجة هنا.') + '</div>';
  }
  function afterPantry() {
    K.segmented($('.cats', view), (v) => { S.pcat = v; relist(); });
    if (OK) A.animate($$('.item', view), { opacity: [0, 1], y: [16, 0], duration: 600, delay: A.stagger(60, { start: 200 }), ease: 'out(4)' });
  }
  function flip(container, mutate) {
    const first = new Map($$('[data-id]', container).filter((e) => e.parentNode === container).map((k) => [k.dataset.id, k.getBoundingClientRect()]));
    mutate();
    K.hydrateIcons(container);
    if (!OK) return;
    $$(':scope > [data-id]', container).forEach((k) => {
      const f = first.get(k.dataset.id), l = k.getBoundingClientRect();
      if (f) { const dx = (f.left - l.left) / Z, dy = (f.top - l.top) / Z; if (Math.abs(dx) + Math.abs(dy) > .5) A.animate(k, { x: [dx, 0], y: [dy, 0], duration: 560, ease: 'out(4)' }); }
      else A.animate(k, { opacity: [0, 1], scale: [.95, 1], duration: 480, ease: 'out(3)' });
    });
  }
  function relist() { const box = $('#items'); if (box) flip(box, () => { box.innerHTML = listHTML(); }); }
  function refreshPantryMeta() {
    const c = $('.p-count', view); if (c) c.textContent = countLine();
    const s = $('.sumchips', view); if (s) s.innerHTML = sumChips();
  }

  function prodCard(p) {
    const inCart = S.cart[p.id] || 0;
    const pit = p.pantry ? itemOf(p.pantry) : null;
    const pan = p.out ? '<p class="p-out">' + t('Out of stock', 'خلصان') + '</p><p class="p-sz">' + t('Back tomorrow', 'راجع بكره') + '</p>'
      : '<p class="p-sz">' + pick(p.sz) + ' · ' + (p.few ? t('Few left', 'فاضل قليل') : t('In stock', 'متوفر')) + '</p>' +
        (pit ? '<p class="p-pan">' + t('In your pantry: ', 'في مخزنك: ') + qtyShort(pit) + '</p>' : (p.note ? '' : '<p class="p-sz">' + t('Not in your pantry', 'مش في مخزنك') + '</p>'));
    const note = p.note === 'rise' ? '<p class="p-note">' + ic('lock') + ' ' + t('Price expected to rise · soon', 'السعر متوقع يزيد · قريبًا') + '</p>'
      : p.note === 'unavail' ? '<p class="p-note">' + ic('lock') + ' ' + t('May be unavailable · soon', 'ممكن يخلص · قريبًا') + '<small>' + t('Substitute: Feta 500 g', 'البديل: جبنة فيتا 500 جرام') + '</small></p>' : '';
    const ctl = p.out ? '<button class="add-btn is-solid" type="button" disabled aria-label="' + t('Out of stock', 'خلصان') + '">' + ic('plus') + '</button>'
      : inCart ? stepper(p.id, inCart) : '<button class="add-btn is-solid" type="button" data-act="addProd" data-p="' + p.id + '" aria-label="' + t('Add ', 'أضف ') + pick(p.n) + '">' + ic('plus') + '</button>';
    return '<article class="prod' + (p.out ? ' is-out' : '') + '" data-id="' + p.id + '"><div class="p-img">' + ic(p.ic) + (p.badge ? '<span class="p-badge">' + pick(p.badge) + '</span>' : '') + '</div><b>' + pick(p.n) + '</b>' + pan + note +
      '<div class="p-foot"><span><span class="price num">' + money(p.price) + '</span>' + (p.was ? '<span class="was num">' + money(p.was) + '</span>' : '') + '</span><span class="ctl">' + ctl + '</span></div></article>';
  }
  const stepper = (id, q) => '<span class="stepper"><button type="button" data-act="dec" data-p="' + id + '" aria-label="' + t('Remove one', 'شيل واحد') + '">' + ic('minus') + '</button><span class="q num">' + q + '</span><button type="button" data-act="inc" data-p="' + id + '" aria-label="' + t('Add one', 'زوّد واحد') + '">' + ic('plus') + '</button></span>';
  function vShop() {
    return '<div class="shop-hero"><div class="sh-nav"><button class="icon-btn back" type="button" data-act="go" data-to="home" aria-label="' + t('Back', 'رجوع') + '">' + ic('left') + '</button><button class="icon-btn" type="button" data-act="soon" aria-label="' + t('Search', 'بحث') + '">' + ic('search') + '</button></div>' +
      '<div class="sh-store" data-st><span class="logo">EN</span><div><h1>' + t('El Nour Market', 'النور ماركت') + '</h1><small>' + t('Smouha · Open until 1 AM', 'سموحة · مفتوح لحد 1 بالليل') + '</small></div></div>' +
      '<div class="sh-tags" data-st><span>' + t('30–40 min', '30–40 دقيقة') + '</span><span>' + t('EGP 15 delivery', 'توصيل 15 ج.م') + '</span><span class="hl">' + t('3 offers', '3 عروض') + '</span></div></div>' +
      '<div class="seg shop-cats" data-st role="group" aria-label="' + t('Aisles', 'الأقسام') + '">' + SCATS.map((c) => '<button class="fchip" type="button" data-value="' + c[0] + '" aria-pressed="' + (S.scat === c[0]) + '">' + (AR() ? c[2] : c[1]) + '</button>').join('') + '</div>' +
      lockedCard(t('Your usual items', 'أصنافك المعتادة'), t('What your household buys here, in one row.', 'اللي بيتك بيشتريه من هنا، في صف واحد.'), 'usual', '<i style="left:6%;top:14%;width:20%;height:72%"></i><i style="left:29%;top:14%;width:20%;height:72%"></i><i style="left:52%;top:14%;width:20%;height:72%"></i><i style="left:75%;top:14%;width:20%;height:72%"></i>') +
      '<div class="prods" id="prods">' + prodsHTML() + '</div>' +
      cartBar();
  }
  const prodsHTML = () => PRODUCTS.filter((p) => p.cat === S.scat).map(prodCard).join('');
  const cartBar = () => '<button class="cartbar" type="button" data-act="cart"' + (cartCount() ? '' : ' hidden') + '><span class="cb-n num">' + cartCount() + '</span><span>' + t('View cart', 'عرض السلة') + '</span><span class="cb-t num">' + money(cartTotal()) + '</span></button>';
  function afterShop() {
    K.segmented($('.shop-cats', view), (v) => { S.scat = v; const box = $('#prods'); flip(box, () => { box.innerHTML = prodsHTML(); }); });
    if (OK) A.animate($$('.prod', view), { opacity: [0, 1], y: [16, 0], duration: 600, delay: A.stagger(60, { start: 200 }), ease: 'out(4)' });
  }
  let lastTotal = null;
  function refreshCart(pid) {
    updateBadge(true);
    const bar = $('.cartbar', view);
    if (bar) {
      const n = cartCount(); bar.hidden = n === 0;
      $('.cb-n', bar).textContent = n;
      const el = $('.cb-t', bar), to = cartTotal(), from = lastTotal == null ? to : lastTotal;
      if (OK && from !== to) { const o = { v: from }; A.animate(o, { v: to, duration: 600, ease: 'out(3)', onUpdate: () => { el.textContent = money(Math.round(o.v)); } }); A.animate(bar, { scale: [.97, 1], duration: 500, ease: spring(.45, 450) }); }
      else el.textContent = money(to);
    }
    lastTotal = cartTotal();
    if (pid) {
      const card = $('.prod[data-id="' + pid + '"] .ctl', view);
      if (card) { card.innerHTML = S.cart[pid] ? stepper(pid, S.cart[pid]) : '<button class="add-btn is-solid" type="button" data-act="addProd" data-p="' + pid + '" aria-label="' + t('Add ', 'أضف ') + pick(prodOf(pid).n) + '">' + ic('plus') + '</button>'; if (OK) A.animate(card.firstElementChild, { scale: [.85, 1], duration: 450, ease: spring(.5, 400) }); }
    }
  }

  function timeline(o) {
    return '<div class="tl" aria-label="' + t('Order status', 'حالة الطلب') + '"><span class="tl-line"><i data-p="' + (o.step / 3) + '"></i></span>' +
      STEPS.map((s, i) => '<div class="tl-step ' + (i < o.step ? 'done' : i === o.step ? 'now' : '') + '"><span class="dot"></span>' + pick(s) + '</div>').join('') + '</div>';
  }
  function orderCard(o) {
    const icons = o.icons.slice(0, 6).map((n) => '<span>' + ic(n) + '</span>').join('') + (o.icons.length > 6 ? '<em>+' + (o.icons.length - 6) + '</em>' : '');
    return '<article class="panel order" data-order="' + o.id + '" data-st><div class="ord-head"><div><b>#' + o.id + ' · ' + pick(o.store) + '</b><small>' + pick(o.eta) + '</small></div><span class="chip ' + (o.step === 3 ? 'chip-fresh' : '') + '">' + pick(STEPS[o.step]) + '</span></div>' + timeline(o) + '<div class="ord-items">' + icons + '</div></article>';
  }
  function vOrders() {
    return '<div class="top" data-st><div><h1>' + t('Orders', 'الطلبات') + '</h1><p class="sub">' + t('Track deliveries from partner stores', 'تابع طلباتك من المتاجر الشريكة') + '</p></div></div>' +
      '<div class="row-head" data-st><h2>' + t('Active', 'الحالية') + '</h2></div>' + S.orders.map(orderCard).join('') +
      '<div class="row-head" data-st><h2>' + t('Earlier', 'قبل كده') + '</h2></div>' +
      '<div class="panel" data-st>' + [[1031, ['Bahary Supermarket', 'بحري سوبرماركت'], ['3 Nov · 6 items · EGP 312', '3 نوفمبر · 6 أصناف · 312 ج.م'], 'store'], [1027, ['El Nour Market', 'النور ماركت'], ['29 Oct · 11 items · EGP 486', '29 أكتوبر · 11 صنف · 486 ج.م'], 'store']].map((r) => '<div class="line-item" style="grid-template-columns:44px 1fr auto"><span class="thumb">' + ic(r[3]) + '</span><span class="li-meta"><b>#' + r[0] + ' · ' + pick(r[1]) + '</b><small>' + pick(r[2]) + '</small></span><span class="chip chip-fresh">' + t('Delivered', 'اتسلّم') + '</span></div>').join('') + '</div>';
  }
  function afterOrders() {
    $$('.tl-line i', view).forEach((b, i) => { const p = +b.dataset.p; if (OK) A.animate(b, { scaleX: [0, p], duration: 1200, delay: 300 + i * 100, ease: 'out(4)' }); else b.style.transform = 'scaleX(' + p + ')'; });
    if (OK) A.animate($$('.tl-step.now .dot', view), { scale: [1, 1.18, 1], duration: 1400, loop: true, ease: 'inOut(2)' });
  }

  function vMore() {
    const h = HOMES[S.household];
    const n = S.members.length;
    const avs = S.members.slice(0, 4).map((m, i) => '<span class="av">' + (esc(nameOf(m).charAt(0)) || i + 1) + '</span>').join('');
    return '<div class="top" data-st><div><h1>' + t('More', 'المزيد') + '</h1></div></div>' +
      '<div class="panel hh" data-st style="margin-top:16px"><div style="display:flex;align-items:center;justify-content:space-between;gap:10px"><div><b style="font:700 17px/1.2 var(--font-ui);color:var(--deep)">' + pick(h.title) + '</b><p class="sub" style="font-size:13px;color:var(--ink-2)">' + pick(h.n) + ' · ' + n + t(n === 1 ? ' member' : ' members', ' أفراد') + '</p></div><span class="avs">' + avs + '</span></div>' +
      '<div class="invite"><div><small>' + t('Invite code', 'كود الدعوة') + '</small><b class="num">MNA-48C2</b></div><button class="btn btn-secondary btn-sm" type="button" data-act="copy">' + ic('copy') + t('Copy', 'انسخ') + '</button></div></div>' +
      '<div class="menu-list" data-st><button type="button" data-act="members">' + ic('users') + t('Household members', 'أفراد البيت') + '<span class="val num">' + n + '</span></button><button type="button" data-act="lang">' + ic('globe') + t('Language', 'اللغة') + '<span class="val">' + t('English', 'العربية') + '</span></button><button type="button" data-act="alerts">' + ic('bell') + t('Alerts', 'التنبيهات') + '<span class="val num">4</span></button><button type="button" data-act="restart">' + ic('undo') + t('Restart onboarding', 'ابدأ الإعداد من الأول') + '</button></div>' +
      '<div class="menu-list" data-st><a href="store.html">' + ic('store') + t('Store dashboard', 'لوحة المتجر') + ic('right', 'end') + '</a><a href="admin.html">' + ic('brain') + t('Admin · AI models', 'الإدارة · نماذج الذكاء الاصطناعي') + ic('right', 'end') + '</a><a href="design-system.html">' + ic('grid') + t('Design system', 'نظام التصميم') + ic('right', 'end') + '</a><a href="index.html">' + ic('home') + t('Mouna website', 'موقع مونة') + ic('right', 'end') + '</a></div>';
  }

  /* ---------------- sheets (kokonutui "Smooth Drawer") ---------------- */
  let sheetClose = null;
  function openSheet(title, body, onMount) {
    host.hidden = false;
    host.innerHTML = '<div class="sheet-bg" data-act="closeSheet"></div><div class="sheet" role="dialog" aria-modal="true" aria-label="' + title + '"><div class="grab" aria-hidden="true"></div><div class="sh-head"><h2>' + title + '</h2><button class="icon-btn" type="button" data-act="closeSheet" aria-label="' + t('Close', 'إغلاق') + '">' + ic('x') + '</button></div><div class="sh-body">' + body + '</div></div>';
    K.hydrateIcons(host);
    const sheet = $('.sheet', host), bg = $('.sheet-bg', host);
    if (OK) { A.animate(bg, { opacity: [0, 1], duration: 300 }); A.animate(sheet, { y: ['100%', '0%'], duration: 650, ease: spring(.18, 560) }); }
    const prevFocus = document.activeElement;
    setTimeout(() => { const f = $('.sh-body button, .sh-body input', host) || $('.icon-btn', sheet); f && f.focus(); }, 60);
    let startY = null, dy = 0;
    const grab = $('.grab', sheet);
    grab.addEventListener('pointerdown', (e) => { startY = e.clientY; grab.setPointerCapture(e.pointerId); });
    grab.addEventListener('pointermove', (e) => { if (startY == null) return; dy = Math.max(0, (e.clientY - startY) / Z); sheet.style.transform = 'translateY(' + dy + 'px)'; });
    grab.addEventListener('pointerup', () => { if (startY == null) return; startY = null; if (dy > 90) close(); else if (OK) A.animate(sheet, { y: [dy, 0], duration: 400, ease: spring(.3, 400) }); else sheet.style.transform = ''; dy = 0; });
    function close() {
      sheetClose = null;
      const done = () => { host.hidden = true; host.innerHTML = ''; prevFocus && prevFocus.focus && prevFocus.focus({ preventScroll: true }); };
      if (OK) { A.animate(bg, { opacity: 0, duration: 260 }); A.animate(sheet, { y: '100%', duration: 320, ease: 'in(2)', onComplete: done }); } else done();
    }
    sheetClose = close;
    if (onMount) onMount(sheet, close);
    return close;
  }
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && sheetClose) sheetClose(); });

  function cartSheet() {
    const body = () => {
      const lines = Object.entries(S.cart).filter(([, q]) => q > 0);
      if (!lines.length) return '<div class="empty"><span class="thumb">' + ic('cart') + '</span>' + t('Your cart is empty.', 'السلة فاضية.') + '</div>';
      const sub = cartTotal();
      return '<p style="font-size:14px;color:var(--ink-2);margin-bottom:6px">' + t('From El Nour Market · 30–40 min', 'من النور ماركت · 30–40 دقيقة') + '</p>' +
        lines.map(([id, q]) => { const p = prodOf(id); return '<div class="line-item" style="grid-template-columns:44px 1fr auto"><span class="thumb">' + ic(p.ic) + '</span><span class="li-meta"><b>' + pick(p.n) + '</b><small class="num">' + money(p.price * q) + '</small></span>' + stepper(id, q) + '</div>'; }).join('') +
        '<div class="sum"><div><span>' + t('Subtotal', 'المجموع') + '</span><span class="num">' + money(sub) + '</span></div><div><span>' + t('Delivery', 'التوصيل') + '</span><span class="num">' + money(15) + '</span></div><div class="tot"><span>' + t('Total', 'الإجمالي') + '</span><span class="num">' + money(sub + 15) + '</span></div></div>' +
        '<button class="btn btn-primary btn-block btn-lg" type="button" data-act="order" style="margin-top:18px">' + t('Place order · ', 'اطلب · ') + money(sub + 15) + '</button>';
    };
    openSheet(t('Your cart', 'سلتك'), body(), (sheet) => { sheet.dataset.cart = '1'; sheet._re = () => { $('.sh-body', sheet).innerHTML = body(); K.hydrateIcons(sheet); }; });
  }
  function alertsSheet() {
    const rows = [['yogurt', 'is-red', ['Yogurt expired yesterday', 'الزبادي صلاحيته انتهت امبارح'], ['2 cups · throw away or log it', '2 كوب · ارميه أو سجّله']],
      ['milk', '', ['Milk runs out in 3 days', 'اللبن هيخلص خلال 3 أيام'], ['Sun 8 Nov · add it to your next order', 'الأحد 8 نوفمبر · ضيفه لطلبك الجاي']],
      ['egg', 'is-amber', ['Eggs expire in 4 days', 'البيض صلاحيته تنتهي خلال 4 أيام'], ['Use them first this week', 'استخدمه الأول الأسبوع ده']],
      ['tag', '', ['Cooking oil −15% at Bahary', 'خصم 15% على زيت الطعام في بحري'], ['Offer ends Sunday', 'العرض لحد الأحد']]];
    openSheet(t('Alerts', 'التنبيهات'), rows.map((r) => '<div class="alert-row"><span class="thumb ' + r[1] + '">' + ic(r[0]) + '</span><span><b>' + pick(r[2]) + '</b><small>' + pick(r[3]) + '</small></span></div>').join(''), (sheet) => {
      if (OK) A.animate($$('.alert-row', sheet), { opacity: [0, 1], x: [AR() ? -14 : 14, 0], duration: 500, delay: A.stagger(70, { start: 180 }), ease: 'out(4)' });
    });
  }
  function membersSheet() {
    const me = S.members.find((m) => m.you) || {}, ro = !me.owner;
    const label = (m, i) => (m.you ? t('You', 'إنت') + (nameOf(m) ? ' · ' + esc(nameOf(m)) : '') : esc(nameOf(m)) || t('Person ', 'الشخص ') + (i + 1));
    const body = '<p class="sh-note">' + ic('lock') + (ro ? t('Only the person who set up this home can change these.', 'اللي عمل البيت بس يقدر يغيّر دول.') : HELPER()) + '</p>' +
      '<div class="mrows">' + S.members.map((m, i) => memberRow('m', i, m, { label: label(m, i), you: m.you, ro: ro, st: false })).join('') + '</div>' +
      '<button class="btn btn-primary btn-block" type="button" data-act="closeSheet" style="margin-top:16px">' + t('Done', 'تم') + '</button>';
    openSheet(t('Household members', 'أفراد البيت'), body);
  }
  function addItemSheet() {
    const body = '<div class="scanbox" aria-hidden="true"><div class="frame"></div><span class="bars" style="position:absolute"></span><span class="laser"></span></div>' +
      '<button class="btn btn-primary btn-block" type="button" data-act="scan" style="margin-top:12px">' + ic('scan') + t('Scan a barcode', 'امسح باركود') + '</button>' +
      '<div class="scan-res"><span class="thumb">' + ic('tuna') + '</span><span style="flex:1"><b>' + t('Tuna · 185 g can', 'تونة · علبة 185 جرام') + '</b><small>' + t('Expires Jun 2028', 'تنتهي يونيو 2028') + '</small></span><button class="btn btn-primary btn-sm" type="button" data-act="addScanned">' + t('Add', 'أضف') + '</button></div>' +
      '<p class="or">' + t('or add it by hand', 'أو ضيفه بإيدك') + '</p>' +
      '<form class="form" data-form="manual"><div class="field"><label for="fName">' + t('Item name', 'اسم الصنف') + '</label><input class="input" id="fName" required placeholder="' + t('e.g. Lentils', 'مثلًا: عدس') + '"></div>' +
      '<div class="two"><div class="field"><label for="fQty">' + t('Quantity', 'الكمية') + '</label><input class="input num" id="fQty" type="number" min="1" value="1" required></div><div class="field"><label for="fExp">' + t('Expiry date', 'تاريخ الصلاحية') + '</label><input class="input" id="fExp" type="date" value="2027-02-01"></div></div>' +
      '<button class="btn btn-secondary btn-block" type="submit">' + t('Add to pantry', 'أضف للمخزن') + '</button></form>';
    openSheet(t('Add an item', 'إضافة صنف'), body, (sheet, close) => {
      if (OK) A.animate($('.laser', sheet), { y: [-34, 34], duration: 1300, loop: true, alternate: true, ease: 'inOut(2)' });
      $('[data-form="manual"]', sheet).addEventListener('submit', (e) => {
        e.preventDefault();
        const name = $('#fName', sheet).value.trim(); if (!name) return;
        const qty = Math.max(1, +$('#fQty', sheet).value || 1);
        const ex = new Date($('#fExp', sheet).value || '2027-02-01');
        const expDays = Math.round((ex - TODAY) / 864e5);
        addPantryItem({ id: 'u' + Date.now(), cat: 'legumes', ic: 'box', n: [name, name], qty: qty, step: 1, unit: 'pc', rate: .15, expDays: expDays, exp: ['exp. ' + ex.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }), 'ينتهي ' + ex.toLocaleDateString('ar-EG-u-nu-latn', { day: 'numeric', month: 'long', year: 'numeric' })] });
        close();
      });
    });
  }
  function addPantryItem(it) {
    S.items.push(it);
    S.pcat = 'all'; S.q = '';
    if (S.screen === 'pantry') { render('pantry'); const card = $('.item[data-id="' + it.id + '"]', view); if (card) { card.scrollIntoView({ block: 'center' }); if (OK) A.animate(card, { scale: [.9, 1], opacity: [0, 1], duration: 600, ease: spring(.35, 550) }); card.classList.add('flash'); } }
    K.toast(t(pick(it.n) + ' added to your pantry', 'اتضاف ' + pick(it.n) + ' للمخزن'), { host: screenEl });
  }

  /* ---------------- fly-to-cart ---------------- */
  function fly(fromEl) {
    if (!OK || !fromEl) return;
    const target = $('[data-go="shop"]', tabbar);
    const sr = screenEl.getBoundingClientRect(), fr = fromEl.getBoundingClientRect(), tr = (S.screen === 'shop' && $('.cartbar', view) && !$('.cartbar', view).hidden ? $('.cartbar .cb-n', view) : target).getBoundingClientRect();
    const dot = document.createElement('span');
    dot.innerHTML = ic('cart');
    Object.assign(dot.style, { position: 'absolute', zIndex: 40, left: (fr.left - sr.left + fr.width / 2) / Z - 16 + 'px', top: (fr.top - sr.top + fr.height / 2) / Z - 16 + 'px', width: '32px', height: '32px', display: 'grid', placeItems: 'center', borderRadius: '50%', background: 'var(--violet)', color: '#fff', pointerEvents: 'none' });
    dot.firstChild.style.width = '16px'; dot.firstChild.style.height = '16px';
    screenEl.appendChild(dot);
    const dx = (tr.left + tr.width / 2 - fr.left - fr.width / 2) / Z, dy = (tr.top + tr.height / 2 - fr.top - fr.height / 2) / Z;
    A.animate(dot, { x: [0, dx], y: [{ to: dy * .2 - 60, ease: 'out(2)', duration: 300 }, { to: dy, ease: 'in(2)', duration: 420 }], scale: [1, .5], duration: 720, onComplete: () => dot.remove() });
  }

  /* ---------------- actions ---------------- */
  function addToCart(pid, el, quiet) {
    const p = prodOf(pid); if (!p || p.out) return;
    S.cart[pid] = (S.cart[pid] || 0) + 1;
    fly(el);
    setTimeout(() => refreshCart(pid), OK ? 650 : 0);
    if (!quiet) K.toast(t(pick(p.n) + ' added to cart', 'اتضاف ' + pick(p.n) + ' للسلة'), { host: screenEl, icon: 'cart', tone: 'violet', action: t('View', 'اعرض'), onAction: () => go('shop') });
  }
  function removeItem(id, kind) {
    const idx = S.items.findIndex((i) => i.id === id); if (idx < 0) return;
    const it = S.items[idx];
    const card = $('.item[data-id="' + id + '"]', view);
    const doIt = () => {
      S.items.splice(idx, 1);
      relist(); refreshPantryMeta();
      K.toast(kind === 'toss' ? t(pick(it.n) + ' thrown away', 'اترمى ' + pick(it.n)) : t(pick(it.n) + ' marked finished', pick(it.n) + ': خلص'), {
        host: screenEl, icon: kind === 'toss' ? 'trash' : 'check', tone: kind === 'toss' ? 'red' : '', action: t('Undo', 'تراجع'), duration: 5000,
        onAction: () => { S.items.splice(Math.min(idx, S.items.length), 0, it); if (S.screen === 'pantry') { relist(); refreshPantryMeta(); } }
      });
    };
    if (OK && card) A.animate(card, { opacity: 0, scale: .94, x: kind === 'toss' ? (AR() ? 40 : -40) : 0, duration: 320, ease: 'in(2)', onComplete: doIt });
    else doIt();
  }
  function useOne(id) {
    const it = itemOf(id); if (!it) return;
    const next = Math.round((it.qty - it.step) * 100) / 100;
    if (next <= 0) { removeItem(id, 'finish'); return; }
    it.qty = next;
    const card = $('.item[data-id="' + id + '"]', view);
    if (card) {
      const tmp = document.createElement('div'); tmp.innerHTML = itemCard(it); K.hydrateIcons(tmp);
      const fresh = tmp.firstElementChild; card.replaceWith(fresh);
      if (OK) { A.animate($('.it-qty', fresh), { opacity: [.2, 1], y: [-6, 0], duration: 500, ease: 'out(3)' }); A.animate($('.it-run', fresh), { opacity: [.2, 1], duration: 600 }); }
      fresh.classList.add('flash');
    }
    refreshPantryMeta();
  }
  function placeOrder() {
    const lines = Object.entries(S.cart).filter(([, q]) => q > 0); if (!lines.length) return;
    const icons = []; lines.forEach(([id, q]) => { for (let i = 0; i < q; i++) icons.push(prodOf(id).ic); });
    const n = icons.length;
    const o = { id: 1044 + S.orders.length - 1, step: 0, store: ['El Nour Market', 'النور ماركت'], icons: icons, eta: [n + ' items · placed just now · 30–40 min', n + ' أصناف · اتطلب دلوقتي · 30–40 دقيقة'] };
    S.orders.unshift(o);
    S.cart = {}; lastTotal = 0; updateBadge();
    if (sheetClose) sheetClose();
    setTimeout(() => {
      go('orders');
      K.toast(t('Order #' + o.id + ' sent to El Nour Market', 'الطلب #' + o.id + ' اتبعت للنور ماركت'), { host: screenEl, icon: 'check' });
    }, 340);
    setTimeout(() => advance(o), 6000);
  }
  function advance(o) {
    if (o.step >= 1) return;
    o.step = 1;
    if (S.screen === 'orders') {
      const card = $('[data-order="' + o.id + '"]', view);
      if (card) {
        const tmp = document.createElement('div'); tmp.innerHTML = orderCard(o); K.hydrateIcons(tmp);
        const fresh = tmp.firstElementChild; card.replaceWith(fresh);
        const b = $('.tl-line i', fresh); if (OK) A.animate(b, { scaleX: [0, 1 / 3], duration: 900, ease: 'out(4)' }); else b.style.transform = 'scaleX(.333)';
      }
    }
    K.toast(t('El Nour Market is preparing your order', 'النور ماركت بيجهز طلبك'), { host: screenEl, icon: 'box', tone: 'violet' });
  }
  function setLang(l) {
    lang = l; K.setLangAttr(l); applyUI();
    langSeg && langSeg.refresh();
    $$('.lang-seg [data-value]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.value === l)));
    langSeg && langSeg.select($('.lang-seg [data-value="' + l + '"]'), true);
    if (sheetClose) sheetClose();
    go(S.screen, { instant: false, focus: false });
    updateBadge();
  }

  screenEl.addEventListener('click', (e) => {
    const b = e.target.closest('[data-act]'); if (!b) return;
    const act = b.dataset.act;
    switch (act) {
      case 'go': go(b.dataset.to); break;
      case 'pick': pickType(b); break;
      case 'onbNext': if (onbValid()) setup(); break;
      case 'onbExit': if (S.onbFrom) go(S.onbFrom, { dir: -1 }); else location.href = 'index.html'; break;
      case 'onbBack':
        if (S.onbStep === 'join' && S.join.found) S.join.found = false; else S.onbStep = 'type';
        go('onboarding', { dir: -1 }); break;
      case 'toJoin': S.onbStep = 'join'; S.join.err = false; go('onboarding'); break;
      case 'cnt': setCount(S.count + +b.dataset.d); break;
      case 'mset': setField(b); break;
      case 'jpick': jpick(b); break;
      case 'joinGo': joinGo(); break;
      case 'members': membersSheet(); break;
      case 'alerts':
        if (OK) A.animate($('.bell svg', view) || b, { rotate: [0, 16, -14, 10, -6, 3, 0], duration: 800, ease: 'out(2)' });
        setTimeout(alertsSheet, OK ? 250 : 0); break;
      case 'addProd': addToCart(b.dataset.p, b); break;
      case 'inc': S.cart[b.dataset.p] = (S.cart[b.dataset.p] || 0) + 1; refreshCart(b.dataset.p); reCart(); break;
      case 'dec': S.cart[b.dataset.p] = Math.max(0, (S.cart[b.dataset.p] || 0) - 1); if (!S.cart[b.dataset.p]) delete S.cart[b.dataset.p]; refreshCart(b.dataset.p); reCart(); break;
      case 'use': useOne(b.dataset.id); break;
      case 'finish': removeItem(b.dataset.id, 'finish'); break;
      case 'toss': removeItem(b.dataset.id, 'toss'); break;
      case 'grid': {
        const g = b.dataset.v === '1'; if (g === S.grid) break; S.grid = g;
        $$('.viewtog button', view).forEach((x) => x.setAttribute('aria-pressed', String((x.dataset.v === '1') === g)));
        const box = $('#items'); flip(box, () => box.classList.toggle('is-grid', g)); break;
      }
      case 'addItem': addItemSheet(); break;
      case 'scan': {
        const res = $('.scan-res', host);
        b.disabled = true; b.textContent = t('Scanning…', 'بيمسح…');
        setTimeout(() => { res.classList.add('on'); if (OK) A.animate(res, { opacity: [0, 1], y: [10, 0], duration: 500, ease: 'out(4)' }); b.disabled = false; b.innerHTML = ic('scan') + t('Scan another', 'امسح تاني'); }, 1300);
        break;
      }
      case 'addScanned':
        addPantryItem({ id: 'tuna' + Date.now(), cat: 'legumes', ic: 'tuna', n: ['Tuna', 'تونة'], qty: 1, step: 1, unit: 'can', rate: .12, expDays: 580, exp: ['exp. Jun 2028', 'ينتهي يونيو 2028'] });
        if (sheetClose) sheetClose(); break;
      case 'cart': cartSheet(); break;
      case 'order': placeOrder(); break;
      case 'closeSheet': if (sheetClose) sheetClose(); break;
      case 'copy':
        try { navigator.clipboard && navigator.clipboard.writeText('MNA-48C2'); } catch (err) {}
        K.toast(t('Invite code copied', 'اتنسخ كود الدعوة'), { host: screenEl, icon: 'copy', tone: 'violet' }); break;
      case 'lang': setLang(AR() ? 'en' : 'ar'); break;
      case 'restart': startOnb('more'); break;
      case 'soon': K.toast(t('Store search is coming in the next build', 'البحث في المتجر جاي في النسخة الجاية'), { host: screenEl, icon: 'search', tone: 'violet' }); break;
    }
  });
  function reCart() { const sh = $('.sheet', host); if (sh && sh._re) sh._re(); }
  screenEl.addEventListener('input', (e) => {
    if (e.target.matches('[data-act="search"]')) { S.q = e.target.value; relist(); }
    else if (e.target.id === 'jCode') S.join.code = e.target.value;
    else if (e.target.matches('input[data-g]')) { const r = rowRef(e.target.dataset.g); if (r.m) r.m.name = e.target.value; }
  });
  screenEl.addEventListener('submit', (e) => {
    if (e.target.dataset.form !== 'join') return;
    e.preventDefault(); joinFind();
  });
  /* arrow keys / Home / End move through any radio group (mirrored in RTL) */
  screenEl.addEventListener('keydown', (e) => {
    const b = e.target.closest && e.target.closest('[role="radio"]'); if (!b) return;
    const keys = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1, Home: 'first', End: 'last' };
    if (!(e.key in keys)) return;
    const all = $$('[role="radio"]:not([disabled])', b.closest('[role="radiogroup"]')); if (!all.length) return;
    let k = keys[e.key], i = all.indexOf(b);
    if (AR() && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) k = -k;
    i = k === 'first' ? 0 : k === 'last' ? all.length - 1 : (i + k + all.length) % all.length;
    e.preventDefault();
    const nb = all[i]; nb.focus();
    if (nb.dataset.act === 'pick') { S.onbChoice = nb.dataset.k; checkIn(nb); } else nb.click();
  });
  tabbar.addEventListener('click', (e) => { const b = e.target.closest('[data-go]'); if (b && b.dataset.go !== S.screen) go(b.dataset.go); });

  function startOnb(from) {
    S.onbChoice = S.household; S.onbStep = 'type'; S.onbFrom = from; S.join = freshJoin();
    S.draft = S.members.filter((m) => m.you).concat(S.members.filter((m) => !m.you)).map((m) => ({ sex: m.sex, age: m.age, name: nameOf(m) }));
    if (S.draft[0] && !isAdult(S.draft[0])) S.draft[0].age = '';
    S.count = S.household === 'individual' ? 3 : Math.max(MIN_P, Math.min(MAX_P, S.members.length));
    go('onboarding');
  }

  /* onboarding -> AI setup (kokonutui "AI State Loading") */
  function setup(list, lead) {
    const go1 = $('#onbGo', view); if (go1) go1.disabled = true;
    if (!list) list = clone(S.draft.slice(0, rowsN())).map((m, i) => Object.assign(m, { you: i === 0, owner: i === 0, linked: i === 0 }));
    S.household = S.onbChoice; S.members = list;
    const h = HOMES[S.household];
    const steps = (lead || [t('Household: ', 'نوع البيت: ') + pick(h.n) + ' · ' + peopleTxt(list.length)])
      .concat([t('Typical use for ', 'الاستهلاك المعتاد لـ ') + ageSummary(list), t('50 essentials ready to track', '50 صنف أساسي جاهزين للمتابعة'), t('Partner stores near Smouha', 'متاجر شريكة قريبة من سموحة')]);
    const el = document.createElement('div'); el.className = 'setup'; el.setAttribute('role', 'status');
    el.innerHTML = '<div class="setup-in"><div class="setup-orb"><i></i><i></i><span>' + ic('spark') + '</span></div><h2>' + t('Setting up your pantry', 'بنجهز مخزنك') + '</h2><ul class="steps-list">' + steps.map((s) => '<li><span class="st-ic">' + ic('check') + '</span>' + s + '</li>').join('') + '</ul></div>';
    screenEl.appendChild(el);
    const lis = $$('li', el);
    if (OK) {
      A.animate(el, { opacity: [0, 1], duration: 350 });
      A.animate($$('.setup-orb i', el), { scale: [1, 2], opacity: [.7, 0], duration: 1600, delay: A.stagger(800), loop: true, ease: 'out(2)' });
      A.animate(lis, { opacity: [0, 1], y: [10, 0], duration: 450, delay: A.stagger(70, { start: 150 }), ease: 'out(3)' });
    }
    let i = 0;
    (function step() {
      if (i > 0) { lis[i - 1].classList.remove('is-run'); lis[i - 1].classList.add('is-done'); if (OK) A.animate($('.st-ic', lis[i - 1]), { scale: [.6, 1], duration: 400, ease: spring(.5, 380) }); }
      if (i < lis.length) { lis[i].classList.add('is-run'); i++; setTimeout(step, OK ? 620 : 120); }
      else setTimeout(() => { el.remove(); S.onbStep = 'type'; S.onbFrom = null; S.join = freshJoin(); go('home'); }, OK ? 1100 : 100);
    })();
  }

  /* ---------------- boot ---------------- */
  K.hydrateIcons();
  applyUI();
  const langSeg = K.segmented($('.lang-seg'), (v) => setLang(v));
  $$('.lang-seg [data-value]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.value === lang)));
  langSeg.select($('.lang-seg [data-value="' + lang + '"]'), true);
  const startHash = (location.hash || '').slice(1);
  addEventListener('resize', () => placeInd(true));
  updateBadge();
  lastTotal = cartTotal();
  go(['onboarding', 'home', 'pantry', 'shop', 'orders', 'more'].includes(startHash) ? startHash : 'onboarding', { instant: true, focus: false });
  if (OK) {
    A.animate($$('[data-st]', view), { opacity: [0, 1], y: [14, 0], duration: 600, delay: A.stagger(60, { start: 250 }), ease: 'out(4)' });
  }
  K.logoIntro();
  if (document.fonts) document.fonts.ready.then(() => { placeInd(true); langSeg.refresh(); });
})();
