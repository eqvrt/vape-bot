// ═══════════════════════════════════════════════════════════════════
//  CATALOG PRODUSE — VapeLiquid Mini App
//  ⚠️  OWNER: modifică câmpul 'stock' pentru a actualiza stocul!
//  ⚠️  IMAGES: înlocuiește URL-urile cu link-uri directe de pe ibb.co
//     (deschide link → click dreapta pe imagine → "Copiați adresa imaginii")
//     Link direct arată ca: https://i.ibb.co/XXXXX/filename.jpg
// ═══════════════════════════════════════════════════════════════════

const CATALOG = [
  {
    id: "chaser_10ml",
    name: "Chaser 10ML • 50MG",
    badge: "🔥",
    price: 99,
    stock: 10,       // ← SCHIMBĂ STOCUL AICI
    image: "https://ibb.co/qFFzXKnh",   // înlocuiește cu link direct i.ibb.co/...
    description: `Максимальная крепость. Максимальный вкус.
Компактный формат 10 мл — удобно брать с собой 💨

⚡️ 50MG — мощный удар и быстрое насыщение
💎 Отличная передача вкуса
👌 Подходит для POD-систем`,
    flavors: [
      "🍉 Сочный Арбуз",
      "🍌 Сочный Банан",
    ],
  },
  {
    id: "monashka",
    name: "ЗЛАЯ МОНАШКА • HOT SPOT 30ML • 70MG",
    badge: "😈",
    price: 230,
    stock: 8,        // ← SCHIMBĂ STOCUL AICI
    image: "https://ibb.co/3m2R0qXm",
    description: `Это не для слабых.
70MG — это мощь, которую ты почувствуешь с первой затяжки 💨⚡️

🔥 ВКУСЫ, КОТОРЫЕ БЬЮТ ЧЁТКО:
⚡️ 30ML — выгодный объём
⚡️ 70MG — максимум крепости
⚡️ Вкус держится стабильно`,
    flavors: [
      "🍇 Жвачка Виноград",
      "🥝 Киви • Питахайя • Алоэ",
      "🥤 Кола • Тамаринд • Лайм",
      "🏖 Манго • Вишня",
      "🍯 Малиновое Варенье",
      "🍑 Персик • Личи",
    ],
  },
  {
    id: "elf_liq",
    name: "Elf LIQ 30ML • 50MG",
    badge: "✨",
    price: 200,
    stock: 15,       // ← SCHIMBĂ STOCUL AICI
    image: "https://ibb.co/VbD6R6t",
    description: `💥 Вкусы, которые взорвут твою палитру!
Только для тех, кто любит яркий, насыщенный и мощный пар ⚡️

50MG — мощный удар, насыщенный вкус
30ML — выгодный объём на каждый день`,
    flavors: [
      "🍍 Pineapple Ice ❄️",
      "😑 Raspberry Lychee 🌸",
      "🍎 Double Apple 🍎",
      "🌹 Jasmine Raspberry 💐",
      "🖤 Blackberry Lemon 😖",
      "🍎 Apple Peach 🍑",
      "😑 Blueberry Raspberry 🥶",
      "🍎 Apple Pear 👍",
      "💙 Blue Razz Ice 🥶",
      "🍍 Pineapple Colada 🍍",
      "🍎 Sour Apple 🍎",
      "💞 Pink Grapefruit 💞",
      "💕 Pink Lemonade Soda 😖",
      "🍉 Watermelon 🍉",
      "🌹 Blueberry Rose Mint 🥶",
      "🥶 Blue Razz Lemonade 😖",
      "🥰 Raspberry Lychee 😑",
      "🥥 Kiwi Passion Fruit Guava 🥝",
      "😑 Blueberry Sour Raspberry 🥶",
      "😃 Cherry 😃",
      "😄 Watermelon Cherry 😃",
      "😖 Strawberry Cherry Lemon 😄",
      "😏 Strawberry Raspberry Cherry Ice 🧊",
      "🍋 Lemon Lime 😖",
    ],
  },
  {
    id: "xros_series",
    name: "Vaporesso XROS Series 0.6 • 2ML / 3ML",
    badge: "✨",
    price: 70,
    stock: 20,       // ← SCHIMBĂ STOCUL AICI
    image: "https://ibb.co/SX48jW8S",
    description: `💨 Компактно. Стильно. Максимум вкуса!
Идеально подходит для твоего POD — яркий пар, насыщенный вкус ⚡️

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
    stock: 5,        // ← SCHIMBĂ STOCUL AICI
    image: "https://ibb.co/39npbSTV",
    description: `Ищешь надежный POD на каждый день?
XROS 5 Mini — это максимум вкуса и удобства 🔥

▪️ Мощность до 30W
▪️ Зарядка за 30 минут ⚡️
▪️ Сопротивление 0.6 Ω
▪️ Аккумулятор 1500 mAh
▪️ 1 картридж в комплекте
▪️ Рычажок блокировки автозатяги
💎 Стильный дизайн`,
    flavors: [],
  },
  {
    id: "xros4_mini",
    name: "Vaporesso XROS 4 Mini",
    badge: "☄️",
    price: 400,
    stock: 7,        // ← SCHIMBĂ STOCUL AICI
    image: "https://ibb.co/d0Xzvy68",
    description: `Ищешь удобный POD с отличной автономностью?
XROS 4 Mini — стабильная работа, чистый вкус 🔥

🌟 Мощность до 30W
🌟 Быстрая зарядка Type-C ⚡️
🌟 Сопротивление 0.4 / 0.6 Ω
🌟 Аккумулятор 1000 mAh
🌟 1 картридж в комплекте
🌟 Airflow Control
💎 Технология COREX`,
    flavors: [],
  },
  {
    id: "chaser_lux",
    name: "CHASER LUX 30ML • 65MG",
    badge: "💎",
    price: 190,
    stock: 12,       // ← SCHIMBĂ STOCUL AICI
    image: "https://ibb.co/SXVGVcSG",
    description: `🔥 30 ml / 65 mg — крепко, ярко и насыщенно.
Идеально для POD-систем и любителей сочных вкусов.

Топ вкусы на выбор — удар по рецепторам!`,
    flavors: [
      "🍓 Blueberry Raspberry",
      "🥤 Berry Lemonade",
      "🍎 Sour Apple",
      "🍉🍬 Sour Watermelon Candy",
      "🍉 Watermelon Raspberry",
      "🫂 Energetic",
      "🥶 Berry Needles",
      "😃 Cherry Lemon",
      "🥳 Coconut Melon",
    ],
  },
  {
    id: "chaser_ultra",
    name: "CHASER ULTRA 30ML • 50MG",
    badge: "💨",
    price: 180,
    stock: 9,        // ← SCHIMBĂ STOCUL AICI
    image: "https://ibb.co/FbnKxZty",
    description: `🔥 30 ml / 50 mg — насыщенный вкус и отличный удар.
Идеально для POD-систем и на каждый день.

Сочные ягодные вкусы, которые не надоедают!`,
    flavors: [
      "🍓 Wild Strawberry",
      "🍉🍋 Watermelon Lemon",
      "🫐 Triple Raspberry",
      "🫐🍇 Blackberry Sour Raspberry",
      "🍓🍒 Triple Berry",
    ],
  },
  {
    id: "elfbar_combo",
    name: "ELFBAR COMBO PRO",
    badge: "🌀",
    price: 350,
    stock: 4,        // ← SCHIMBĂ STOCUL AICI
    image: "https://ibb.co/GQ2HmPy0",
    description: `3 вкуса в одном устройстве 💨
Стильная одноразка с возможностью переключать 3 разных вкуса!

✨ Rechargeable Disposable — перезаряжается
💨 Яркий вкус и плотный пар
🌀 3 вкуса в одном устройстве
⚡ Стильно • Вкусно • Удобно`,
    flavors: [],
  },
  {
    id: "xros_pro2",
    name: "VAPORESSO XROS PRO 2",
    badge: "🔥",
    price: 699,
    stock: 3,        // ← SCHIMBĂ STOCUL AICI
    image: "https://ibb.co/WN4DV6yv",
    description: `Хочешь мощный, стильный и удобный POD?
XROS PRO 2 — это именно то, что тебе нужно.

💨 До 30W мощности
🔋 Батарея 2000 mAh — держит долго
⚡ Быстрая зарядка
🔥 COREX — максимально насыщенный вкус
💎 Стильный дизайн и удобный дисплей
📦 В наличии несколько цветов`,
    flavors: [],
  },
  {
    id: "xros_mini",
    name: "VAPORESSO XROS MINI",
    badge: "🔥",
    price: 330,
    stock: 6,        // ← SCHIMBĂ STOCUL AICI
    image: "https://ibb.co/GvKzd2Ss",
    description: `Компактный, стильный и очень вкусный POD!
Идеальный вариант на каждый день 🔥

💨 Насыщенный вкус — 0.8Ω Mesh Pod
🔋 Батарея 1000 mAh — держит целый день
⚡ Type-C быстрая зарядка
👌 Удобный, лёгкий, в любой карман
🎨 Цвета: ❤️ Красный • 🤍 Белый • 💚 Бирюзовый`,
    flavors: [],
  },
];
