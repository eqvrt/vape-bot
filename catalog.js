// VapeLiquid Mini App - catalog.js
// OWNER: modifica campul 'stock' pentru stoc implicit
// Stocul real vine din stock.json (actualizat cu /stock din Telegram)

const CATALOG = [
  {
    id: "chaser_10ml",
    name: "Chaser 10ML - 50MG",
    badge: "🔥",
    price: 99,
    stock: 10,
    image: "https://i.ibb.co/jZZdBm5q/chaser1.jpg",
    description: `Putere maxima. Gust maxim.
Format compact de 10 ml - convenabil de luat cu tine 💨

⚡️ 50MG - lovitura puternica si saturatie rapida
💎 Transfer excelent al gustului
👌 Potrivit pentru sisteme POD

---

Максимальная крепость. Максимальный вкус.
Компактный формат 10 мл — удобно брать с собой 💨

⚡️ 50MG — мощный удар и быстрое насыщение
💎 Отличная передача вкуса
👌 Подходит для POD-систем`,
    flavors: [
      "🍉 Pepene rosu suculent / Сочный Арбуз",
      "🍌 Banana suculenta / Сочный Банан",
    ],
  },
  {
    id: "monashka",
    name: "MONASHKA HOT SPOT 30ML - 70MG",
    badge: "😈",
    price: 230,
    stock: 18,
    image: "https://i.ibb.co/v4pXJG54/monoshka.jpg",
    description: `Nu este pentru cei slabi.
70MG - putere pe care o vei simti din prima tragere 💨⚡️

🔥 GUSTURI CARE LOVESC PRECIS:
⚡️ 30ML - volum avantajos
⚡️ 70MG - putere maxima
⚡️ Gustul ramane stabil

---

Это не для слабых.
70MG — мощь с первой затяжки 💨⚡️

🔥 ВКУСЫ, КОТОРЫЕ БЬЮТ ЧЕТКО:
⚡️ 30ML — выгодный объём
⚡️ 70MG — максимум крепости
⚡️ Вкус держится стабильно`,
    flavors: [
      "🍇 Guma de mestecat Struguri / Жвачка Виноград",
      "🥝 Kiwi - Pitahaya - Aloe / Киви - Питахайя - Алоэ",
      "🥤 Cola - Tamarind - Lamaie / Кола - Тамаринд - Лайм",
      "🏖 Mango - Cirese / Манго - Вишня",
      "🍯 Dulceata de Zmeura / Малиновое Варенье",
      "🍑 Piersica - Litchi / Персик - Личи",
    ],
  },
  {
    id: "elf_liq",
    name: "Elf LIQ 30ML - 50MG",
    badge: "✨",
    price: 200,
    stock: 48,
    image: "https://i.ibb.co/ZvK959V/elf-liq.jpg",
    description: `💥 Gusturi care iti vor exploda paleta!
Doar pentru cei care iubesc aburul luminos, bogat si puternic ⚡️

50MG - lovitura puternica, gust bogat
30ML - volum avantajos pentru fiecare zi

---

💥 Вкусы, которые взорвут твою палитру!
Только для тех, кто любит яркий, насыщенный и мощный пар ⚡️

50MG — мощный удар, насыщенный вкус
30ML — выгодный объём на каждый день`,
    flavors: [
      "🍍 Pineapple Ice / Ananas cu Gheata ❄️",
      "😑 Raspberry Lychee / Zmeura si Litchi 🌸",
      "🍎 Double Apple / Mar Dublu 🍎",
      "🌹 Jasmine Raspberry / Iasomie si Zmeura 💐",
      "🖤 Blackberry Lemon / Mure si Lamaie 😖",
      "🍎 Apple Peach / Mar si Piersica 🍑",
      "😑 Blueberry Raspberry / Afine si Zmeura 🥶",
      "🍎 Apple Pear / Mar si Para 👍",
      "💙 Blue Razz Ice / Zmeura Albastra cu Gheata 🥶",
      "🍍 Pineapple Colada / Colada de Ananas 🍍",
      "🍎 Sour Apple / Mar Acru 🍎",
      "💞 Pink Grapefruit / Grapefruit Roz 💞",
      "💕 Pink Lemonade Soda / Limonada Roz 😖",
      "🍉 Watermelon / Pepene Rosu 🍉",
      "🌹 Blueberry Rose Mint / Afine Trandafir Menta 🥶",
      "🥶 Blue Razz Lemonade / Limonada Zmeura Albastra 😖",
      "🥰 Raspberry Lychee / Zmeura si Litchi 😑",
      "🥥 Kiwi Passion Fruit Guava / Kiwi Fructul Pasiunii Guava 🥝",
      "😑 Blueberry Sour Raspberry / Afine si Zmeura Acra 🥶",
      "😃 Cherry / Cirese 😃",
      "😄 Watermelon Cherry / Pepene si Cirese 😃",
      "😖 Strawberry Cherry Lemon / Capsuni Cirese Lamaie 😄",
      "😏 Strawberry Raspberry Cherry Ice / Capsuni Zmeura Cirese Gheata 🧊",
      "🍋 Lemon Lime / Lamaie si Lime 😖",
    ],
  },
  {
    id: "xros_series",
    name: "Vaporesso XROS Series 0.6 - 2ML / 3ML",
    badge: "✨",
    price: 70,
    stock: 20,
    image: "https://i.ibb.co/271Q9mQJ/kartridj.jpg",
    description: `💨 Compact. Stilat. Maximum de gust!
Perfect pentru POD-ul tau - abur luminos, gust bogat ⚡️

Compatibilitate: Vaporesso XROS Series
Rezistenta: 0.6 Ohm
Volum: 2ML / 3ML

---

💨 Компактно. Стильно. Максимум вкуса!
Идеально для твоего POD — яркий пар, насыщенный вкус ⚡️

Совместимость: Vaporesso XROS Series
Сопротивление: 0.6 Ω
Объём: 2ML / 3ML`,
    flavors: [],
  },
  {
    id: "xros5_mini",
    name: "Vaporesso XROS 5 Mini",
    badge: "☄️",
    price: 450,
    stock: 5,
    image: "https://i.ibb.co/1tkrNR0B/xros-5-mini.jpg",
    description: `Cauti un POD de incredere pentru fiecare zi?
XROS 5 Mini - maximum de gust si confort 🔥

Putere pana la 30W
Incarcare in 30 minute ⚡️
Rezistenta 0.6 Ohm
Acumulator 1500 mAh - tine toata ziua
1 cartus in set
Blocare automata
💎 Design stilat

---

Ищешь надежный POD на каждый день?
XROS 5 Mini — максимум вкуса и удобства 🔥

Мощность до 30W
Зарядка за 30 минут ⚡️
Сопротивление 0.6 Ω
Аккумулятор 1500 mAh
1 картридж в комплекте
💎 Стильный дизайн`,
    flavors: [
      "🖤 Mist Black",
      "🤍 Mist White",
      "🟠 Retro Orange",
    ],
  },
  {
    id: "xros5_nano",
    name: "Vaporesso XROS 5 Nano",
    badge: "☄️",
    price: 380,
    stock: 3,
    image: "https://i.ibb.co/1tkrNR0B/xros-5-mini.jpg",
    description: `POD ultra-compact, perfect pentru oricine este mereu in miscare!
XROS 5 Nano - mic, dar puternic 🔥

Putere pana la 16W
Incarcare rapida Type-C ⚡️
Rezistenta 0.6 Ohm
Design ultra-slim
1 cartus in set
💎 Confort maxim

---

Ультракомпактный POD — идеален для тех, кто всегда в движении!
XROS 5 Nano — маленький, но мощный 🔥

Мощность до 16W
Быстрая зарядка Type-C ⚡️
Сопротивление 0.6 Ω
Ультратонкий дизайн
1 картридж в комплекте
💎 Максимальный комфорт`,
    flavors: [
      "🤍 Nacre",
    ],
  },
  {
    id: "xros4_mini",
    name: "Vaporesso XROS 4 Mini",
    badge: "☄️",
    price: 400,
    stock: 7,
    image: "https://i.ibb.co/zhC0gwbq/xros-4-mini.jpg",
    description: `Cauti un POD convenabil cu autonomie excelenta?
XROS 4 Mini - functionare stabila, gust curat 🔥

Putere pana la 30W
Incarcare rapida Type-C ⚡️
Rezistenta 0.4 / 0.6 Ohm
Acumulator 1000 mAh
1 cartus in set
Control flux de aer
💎 Tehnologie COREX

---

Ищешь удобный POD с отличной автономностью?
XROS 4 Mini — стабильная работа, чистый вкус 🔥

Мощность до 30W
Быстрая зарядка Type-C ⚡️
Сопротивление 0.4 / 0.6 Ω
Аккумулятор 1000 mAh
1 картридж в комплекте
💎 Технология COREX`,
    flavors: [
      "🥂 Champagne Gold",
      "💛 Camo Yellow",
      "🩷 Ice Pink",
      "🖤 Black",
    ],
  },
  {
    id: "chaser_lux",
    name: "CHASER LUX 30ML - 65MG",
    badge: "💎",
    price: 190,
    stock: 27,
    image: "https://i.ibb.co/tMYFYzRF/chaser-ultra.jpg",
    description: `🔥 30 ml / 65 mg - puternic, luminos si bogat.
Perfect pentru sisteme POD si iubitorii de gusturi suculente.

Gusturi de top la alegere!

---

🔥 30 ml / 65 mg — крепко, ярко и насыщенно.
Идеально для POD-систем и любителей сочных вкусов.

Топ вкусы на выбор!`,
    flavors: [
      "🍓 Afine si Zmeura / Blueberry Raspberry",
      "🥤 Limonada de Fructe / Berry Lemonade",
      "🍎 Mar Acru / Sour Apple",
      "🍉🍬 Pepene Acru cu Bomboane / Sour Watermelon Candy",
      "🍉 Pepene si Zmeura / Watermelon Raspberry",
      "🫂 Energizant / Energetic",
      "🥶 Fructe de Padure cu Gheata / Berry Needles",
      "😃 Cirese si Lamaie / Cherry Lemon",
      "🥳 Cocos si Pepene / Coconut Melon",
    ],
  },
  {
    id: "chaser_ultra",
    name: "CHASER ULTRA 30ML - 50MG",
    badge: "💨",
    price: 180,
    stock: 15,
    image: "https://i.ibb.co/gM63jqCf/chaser-ultra-lux.jpg",
    description: `🔥 30 ml / 50 mg - gust bogat si lovitura excelenta.
Perfect pentru sisteme POD si pentru fiecare zi.

Gusturi fructate suculente care nu plictisesc!

---

🔥 30 ml / 50 mg — насыщенный вкус и отличный удар.
Идеально для POD-систем и на каждый день.

Сочные ягодные вкусы, которые не надоедают!`,
    flavors: [
      "🍓 Capsuni Salbatice / Wild Strawberry",
      "🍉🍋 Pepene cu Lamaie / Watermelon Lemon",
      "🫐 Tripla Zmeura / Triple Raspberry",
      "🫐🍇 Mure cu Zmeura Acra / Blackberry Sour Raspberry",
      "🍓🍒 Mix de Fructe de Padure / Triple Berry",
    ],
  },
  {
    id: "elfbar_combo",
    name: "ELFBAR COMBO PRO",
    badge: "🌀",
    price: 350,
    stock: 4,
    image: "https://i.ibb.co/SwnfSvbP/elfbar.jpg",
    description: `3 gusturi intr-un singur dispozitiv 💨
O tigara electronica stilata cu posibilitatea de a schimba 3 gusturi diferite!

✨ Reincarcabila
💨 Gust luminos si abur dens
🌀 3 gusturi intr-un singur dispozitiv
⚡ Stilat - Gustos - Convenabil

---

3 вкуса в одном устройстве 💨
Стильная одноразка с переключением 3 разных вкусов!

✨ Rechargeable Disposable
💨 Яркий вкус и плотный пар
🌀 3 вкуса в одном устройстве
⚡ Стильно - Вкусно - Удобно`,
    flavors: [],
  },
  {
    id: "xros_pro2",
    name: "VAPORESSO XROS PRO 2",
    badge: "🔥",
    price: 699,
    stock: 3,
    image: "https://i.ibb.co/wZFJcRWh/xros-pro-2.jpg",
    description: `Vrei un POD puternic, stilat si convenabil?
XROS PRO 2 - exact ce ai nevoie.

💨 Pana la 30W putere
🔋 Acumulator 2000 mAh - tine mult
⚡ Incarcare rapida
🔥 COREX - gust maxim de bogat
💎 Design stilat si display convenabil
📦 Disponibil in mai multe culori

---

Хочешь мощный, стильный и удобный POD?
XROS PRO 2 — это именно то, что тебе нужно.

💨 До 30W мощности
🔋 Батарея 2000 mAh
⚡ Быстрая зарядка
🔥 COREX — максимально насыщенный вкус
💎 Стильный дизайн и дисплей
📦 Несколько цветов в наличии`,
    flavors: [
      "💚 Gem Green",
      "✨ Glittering Gold",
    ],
  },
  {
    id: "xros_mini",
    name: "VAPORESSO XROS MINI",
    badge: "🔥",
    price: 330,
    stock: 6,
    image: "https://i.ibb.co/qMtTDsQ0/xros-mini.jpg",
    description: `POD compact, stilat si foarte gustos!
Varianta ideala pentru fiecare zi 🔥

💨 Gust bogat - 0.8 Ohm Mesh Pod
🔋 Acumulator 1000 mAh - tine toata ziua
⚡ Incarcare rapida Type-C
👌 Convenabil, usor, in orice buzunar

---

Компактный, стильный и очень вкусный POD!
Идеальный вариант на каждый день 🔥

💨 Насыщенный вкус — 0.8Ω Mesh Pod
🔋 Батарея 1000 mAh — держит целый день
⚡ Type-C быстрая зарядка
👌 Удобный, лёгкий, в любой карман`,
    flavors: [
      "❤️ Red",
      "🤍 White",
      "🩵 Light Blue",
    ],
  },
];
