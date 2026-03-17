/* ════════════════════════════════════════════════════════
   VapeLiquid Mini App — app.js
   Vanilla JS, no frameworks
════════════════════════════════════════════════════════ */

// ── Telegram Web App init ──
const tg = window.Telegram?.WebApp || {
  ready:    () => {},
  expand:   () => {},
  close:    () => {},
  sendData: (d) => console.log('sendData:', d),
  BackButton: { show: () => {}, hide: () => {}, onClick: () => {} },
  HapticFeedback: { impactOccurred: () => {}, notificationOccurred: () => {} },
};

tg.ready();
tg.expand();

// ── App state ──
let currentScreen = 'home';

const order = {
  product:     null,   // catalog item
  flow:        null,   // 'procura' | 'precomanda'
  flavorIndex: null,
  flavor:      null,
  qty:         1,
  payMethod:   null,   // 'telegram_pay' | 'contact'
  contact:     '',
};

let orderStep  = 0;   // 0: flavor, 1: qty+pay, 2: contact
let totalSteps = 0;

// ── Card accent colors (cycle) ──
const ACCENTS = [
  'linear-gradient(90deg,#6c63ff,#764ba2)',
  'linear-gradient(90deg,#f093fb,#f5576c)',
  'linear-gradient(90deg,#4facfe,#00f2fe)',
  'linear-gradient(90deg,#43e97b,#38f9d7)',
  'linear-gradient(90deg,#fa709a,#fee140)',
  'linear-gradient(90deg,#a18cd1,#fbc2eb)',
  'linear-gradient(90deg,#f7971e,#ffd200)',
  'linear-gradient(90deg,#ee0979,#ff6a00)',
];

// ════════════════════════════════════════════════════════
//  SCREENS
// ════════════════════════════════════════════════════════
function showScreen(id) {
  if (currentScreen === id) return;

  const old  = document.querySelector('.screen.active');
  const next = document.getElementById(`screen-${id}`);
  if (!next) return;

  if (old) {
    old.classList.add('slide-out');
    setTimeout(() => old.classList.remove('active', 'slide-out'), 320);
  }

  next.classList.add('active');
  currentScreen = id;

  tg.BackButton[id === 'home' ? 'hide' : 'show']();
}

tg.BackButton.onClick(() => goHome());

function goHome()     { showScreen('home'); }
function showMenu()   { renderMenu(); showScreen('menu'); }
function showContacte() { showScreen('contacte'); }

// ════════════════════════════════════════════════════════
//  EMOJI BACKGROUND
// ════════════════════════════════════════════════════════
function buildEmojiBg() {
  const emojis = ['💨','⚡','💎','🔥','✨','🌿','💙','🌟','🫧','💫','☁️','🍃','🟣'];
  const bg     = document.getElementById('emoji-bg');

  for (let i = 0; i < 36; i++) {
    const s = document.createElement('span');
    s.textContent = emojis[i % emojis.length];
    const size  = 12 + Math.random() * 22;
    const delay = Math.random() * 5;
    const dur   = 3 + Math.random() * 4;
    s.style.cssText = `
      left:${Math.random()*100}%;
      top:${Math.random()*100}%;
      font-size:${size}px;
      animation-duration:${dur}s;
      animation-delay:${delay}s;
      transform:rotate(${Math.random()*360}deg);
    `;
    bg.appendChild(s);
  }
}

// ════════════════════════════════════════════════════════
//  MENU RENDER
// ════════════════════════════════════════════════════════
function renderMenu() {
  const container = document.getElementById('menu-content');
  if (container.innerHTML.trim() !== '') return; // already rendered

  CATALOG.forEach((prod, idx) => {
    container.appendChild(buildProductCard(prod, idx));
  });
}

function buildProductCard(prod, idx) {
  const card    = document.createElement('div');
  card.className = 'product-card';

  const inStock = prod.stock > 0;
  const accent  = ACCENTS[idx % ACCENTS.length];

  const flavorHTML = prod.flavors.length
    ? `<div class="card-flavors">
         ${prod.flavors.map(f => `<span class="flavor-tag">${f}</span>`).join('')}
       </div>`
    : '';

  const actionBtn = inStock
    ? `<button class="btn-procura" onclick="openOrder('${prod.id}','procura')">🛒 Procura</button>`
    : `<button class="btn-precomanda" onclick="openOrder('${prod.id}','precomanda')">📦 Precomandă</button>`;

  const stockBadge = inStock
    ? `<span class="card-stock stock-in">✅ În stoc: ${prod.stock} buc.</span>`
    : `<span class="card-stock stock-out">⏳ Precomandă disponibilă</span>`;

  card.innerHTML = `
    <div class="card-strip" style="background:${accent}"></div>
    <div class="card-img-wrap">
      <img class="card-img"
           src="${prod.image}"
           alt="${prod.name}"
           onerror="this.style.display='none';this.parentElement.querySelector('.card-img-placeholder').style.display='flex'">
      <div class="card-img-placeholder" style="display:none">${prod.badge}</div>
    </div>
    <div class="card-body">
      <div class="card-row1">
        <span class="card-name">${prod.badge} ${prod.name}</span>
        <span class="card-price-badge">${prod.price} lei</span>
      </div>
      ${stockBadge}
      <p class="card-desc" id="desc-${prod.id}">${prod.description}</p>
      <button class="desc-toggle" onclick="toggleDesc('${prod.id}')">Citește mai mult ↓</button>
      ${flavorHTML}
      <div class="card-actions">${actionBtn}</div>
    </div>
  `;
  return card;
}

function toggleDesc(id) {
  const el  = document.getElementById(`desc-${id}`);
  const btn = el.nextElementSibling;
  const exp = el.classList.toggle('expanded');
  btn.textContent = exp ? 'Ascunde ↑' : 'Citește mai mult ↓';
}

// ════════════════════════════════════════════════════════
//  ORDER FLOW
// ════════════════════════════════════════════════════════
function openOrder(productId, flow) {
  const prod = CATALOG.find(p => p.id === productId);
  if (!prod) return;

  // Reset order state
  order.product     = prod;
  order.flow        = flow;
  order.flavorIndex = null;
  order.flavor      = null;
  order.qty         = 1;
  order.payMethod   = null;
  order.contact     = '';
  order.locality    = '';

  // Determine steps
  orderStep  = prod.flavors.length > 0 ? 0 : 1;
  totalSteps = prod.flavors.length > 0 ? 3 : 2;  // flavor + qty+pay + contact

  // Show overlay
  document.getElementById('order-overlay').classList.remove('hidden');
  renderStep();

  tg.HapticFeedback.impactOccurred('light');
}

function closeOrder() {
  document.getElementById('order-overlay').classList.add('hidden');
}

function renderStep() {
  const prod = order.product;

  // Header
  document.getElementById('sheet-title').textContent =
    order.flow === 'procura' ? '🛒 Procura / Купить' : '📦 Precomandă / Заказ';
  document.getElementById('sheet-prod-name').textContent = prod.name;

  // Step dots
  renderStepDots();

  // Navigation buttons
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');

  const firstStep = prod.flavors.length > 0 ? 0 : 1;
  btnPrev.style.display = (orderStep > firstStep) ? 'block' : 'none';

  // Render content
  const content = document.getElementById('order-content');
  content.innerHTML = '';

  if (orderStep === 0) {
    renderFlavorStep(content);
  } else if (orderStep === 1) {
    renderQtyPayStep(content);
  } else if (orderStep === 2) {
    renderContactStep(content);
  }
}

function renderStepDots() {
  const container = document.getElementById('sheet-steps');
  container.innerHTML = '';
  const firstStep = order.product.flavors.length > 0 ? 0 : 1;
  const steps     = order.product.flavors.length > 0
    ? ['Aromă', 'Cantitate', 'Contact']
    : ['Cantitate', 'Contact'];

  steps.forEach((_, i) => {
    const realStep = order.product.flavors.length > 0 ? i : i + 1;
    const dot = document.createElement('div');
    dot.className = 'step-dot' + (realStep === orderStep ? ' active' : '');
    container.appendChild(dot);
  });
}

// ── Step 0: Flavor selection ──
function renderFlavorStep(container) {
  const section = document.createElement('div');
  section.className = 's-section';
  section.innerHTML = `<div class="s-label">Alege aroma / Выбери вкус</div>
    <div class="flavor-list" id="flavor-list"></div>`;
  container.appendChild(section);

  const list = section.querySelector('#flavor-list');
  order.product.flavors.forEach((fl, i) => {
    const btn = document.createElement('button');
    btn.className = 'flavor-opt' + (order.flavorIndex === i ? ' sel' : '');
    btn.innerHTML = `${fl}<span class="check">${order.flavorIndex === i ? '✓' : ''}</span>`;
    btn.onclick = () => selectFlavor(i, fl);
    list.appendChild(btn);
  });

  setNextBtn('Continuă →', false, order.flavorIndex !== null);
}

function selectFlavor(idx, fl) {
  order.flavorIndex = idx;
  order.flavor      = fl;

  document.querySelectorAll('.flavor-opt').forEach((el, i) => {
    const sel = i === idx;
    el.classList.toggle('sel', sel);
    el.querySelector('.check').textContent = sel ? '✓' : '';
  });

  document.getElementById('btn-next').disabled = false;
  tg.HapticFeedback.impactOccurred('light');
}

// ── Step 1: Quantity + Payment method ──
function renderQtyPayStep(container) {
  const prod   = order.product;
  const maxQty = order.flow === 'procura' ? prod.stock : 99;

  const sec1 = document.createElement('div');
  sec1.className = 's-section';
  sec1.innerHTML = `
    <div class="s-label">Cantitate / Количество</div>
    <div class="qty-wrap">
      <button class="qty-btn" id="qminus" onclick="changeQty(-1)">−</button>
      <span class="qty-val" id="qval">${order.qty}</span>
      <button class="qty-btn" id="qplus"  onclick="changeQty(1)">+</button>
      <span class="qty-info">${order.flow === 'procura' ? 'max ' + maxQty + ' buc.' : 'orice cantitate'}</span>
    </div>`;
  container.appendChild(sec1);

  order.payMethod = 'contact';

  renderSummary(container);

  updateQtyButtons(maxQty);
  setNextBtn('Continuă →', false, true);
}

function changeQty(delta) {
  const prod   = order.product;
  const maxQty = order.flow === 'procura' ? prod.stock : 99;
  order.qty    = Math.max(1, Math.min(maxQty, order.qty + delta));

  const qval = document.getElementById('qval');
  if (qval) qval.textContent = order.qty;

  updateQtyButtons(maxQty);
  updateSummaryQty();
  tg.HapticFeedback.impactOccurred('light');
}

function updateQtyButtons(maxQty) {
  const minus = document.getElementById('qminus');
  const plus  = document.getElementById('qplus');
  if (minus) minus.disabled = order.qty <= 1;
  if (plus)  plus.disabled  = order.qty >= maxQty;
}

function selectPay(method, el) {
  order.payMethod = method;
  document.querySelectorAll('.pay-opt').forEach(e => {
    e.classList.remove('sel');
    e.querySelector('.pay-check').textContent = '';
  });
  el.classList.add('sel');
  el.querySelector('.pay-check').textContent = '✓';
  document.getElementById('btn-next').disabled = false;
  tg.HapticFeedback.impactOccurred('light');
}

function renderSummary(container) {
  const prod  = order.product;
  const total = prod.price * order.qty;
  const div   = document.createElement('div');
  div.className = 'order-summary';
  div.id        = 'order-summary';

  div.innerHTML = `
    <div class="summary-row">
      <span class="sl">Produs</span>
      <span class="sv">${prod.name.length > 22 ? prod.name.substring(0,22)+'…' : prod.name}</span>
    </div>
    ${order.flavor ? `<div class="summary-row"><span class="sl">Aromă</span><span class="sv">${order.flavor}</span></div>` : ''}
    <div class="summary-row" id="sum-qty-row">
      <span class="sl">Cantitate</span><span class="sv" id="sum-qty">${order.qty} buc.</span>
    </div>
    <div class="summary-total">
      <span>Total</span>
      <span id="sum-total">${total} lei</span>
    </div>`;
  container.appendChild(div);
}

function updateSummaryQty() {
  const qEl = document.getElementById('sum-qty');
  const tEl = document.getElementById('sum-total');
  if (qEl) qEl.textContent = `${order.qty} buc.`;
  if (tEl) tEl.textContent = `${order.product.price * order.qty} lei`;
}

// ── Step 2: Contact input ──
function renderContactStep(container) {
  const prod  = order.product;
  const total = prod.price * order.qty;

  const sec = document.createElement('div');
  sec.className = 's-section';
  sec.innerHTML = `
    <div class="s-label">Contact</div>
    <input class="contact-input" id="contact-field" type="text"
           placeholder="@username sau +373..."
           value="${order.contact}"
           autocomplete="off" />
    <p class="field-hint">@username Telegram sau numărul de telefon</p>
    <input class="contact-input" id="locality-field" type="text"
           placeholder="Localitate (ex: Chișinău, Bălți...)"
           value="${order.locality}"
           autocomplete="off"
           style="margin-top:10px" />
    <p class="field-hint">Orașul / localitatea ta</p>`;
  container.appendChild(sec);

  const sum = document.createElement('div');
  sum.className = 'order-summary';
  sum.innerHTML = `
    <div class="summary-row"><span class="sl">Produs</span><span class="sv">${prod.name.length > 22 ? prod.name.substring(0,22)+'…' : prod.name}</span></div>
    ${order.flavor ? `<div class="summary-row"><span class="sl">Aromă</span><span class="sv">${order.flavor}</span></div>` : ''}
    <div class="summary-row"><span class="sl">Cantitate</span><span class="sv">${order.qty} buc.</span></div>
    <div class="summary-total"><span>Total</span><span>${total} lei</span></div>`;
  container.appendChild(sum);

  setNextBtn('✅ Confirmă comanda', true, false);

  function checkFields() {
    const c = document.getElementById('contact-field').value.trim();
    const l = document.getElementById('locality-field').value.trim();
    document.getElementById('btn-next').disabled = c.length < 3 || l.length < 2;
  }

  const field    = document.getElementById('contact-field');
  const locField = document.getElementById('locality-field');

  field.addEventListener('input', () => { order.contact  = field.value;    checkFields(); });
  locField.addEventListener('input', () => { order.locality = locField.value; checkFields(); });

  setTimeout(() => field.focus(), 300);
}

// ── Navigation helpers ──
function setNextBtn(text, isConfirm, enabled) {
  const btn = document.getElementById('btn-next');
  btn.textContent = text;
  btn.disabled    = !enabled;
  btn.className   = 'btn-next' + (isConfirm ? ' confirm' : '');
}

function nextStep() {
  const prod      = order.product;
  const firstStep = prod.flavors.length > 0 ? 0 : 1;

  if (orderStep === 0) {
    if (order.flavorIndex === null) return;
    orderStep = 1;
    renderStep();
  } else if (orderStep === 1) {
    if (!order.payMethod) return;
    if (order.payMethod === 'telegram_pay') {
      submitOrder();
    } else {
      orderStep = 2;
      renderStep();
    }
  } else if (orderStep === 2) {
    if (order.contact.trim().length < 3 || order.locality.trim().length < 2) return;
    submitOrder();
  }
}

function prevStep() {
  const prod      = order.product;
  const firstStep = prod.flavors.length > 0 ? 0 : 1;

  if (orderStep > firstStep) {
    orderStep--;
    renderStep();
  }
}

// ════════════════════════════════════════════════════════
//  SUBMIT ORDER
// ════════════════════════════════════════════════════════
function submitOrder() {
  const prod  = order.product;
  const total = prod.price * order.qty;

  const payload = {
    action:       order.payMethod === 'telegram_pay' ? 'pay' : 'contact',
    flow:         order.flow,
    product_id:   prod.id,
    product_name: prod.name,
    price:        prod.price,
    qty:          order.qty,
    total:        total,
    flavor:       order.flavor || null,
    contact:      order.contact  || null,
    locality:     order.locality || null,
  };

  tg.HapticFeedback.notificationOccurred('success');
  tg.sendData(JSON.stringify(payload));
}

// ════════════════════════════════════════════════════════
//  STOCK — citește din stock.json (actualizat de proprietar)
// ════════════════════════════════════════════════════════
async function loadStock() {
  try {
    const resp = await fetch('stock.json?t=' + Date.now());
    if (!resp.ok) return;
    const stock = await resp.json();
    CATALOG.forEach(p => {
      if (stock[p.id] !== undefined) p.stock = stock[p.id];
    });
  } catch (e) {
    // folosește stocul implicit din catalog.js
  }
}

// ════════════════════════════════════════════════════════
//  INIT
// ════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', async () => {
  buildEmojiBg();
  await loadStock();
});
