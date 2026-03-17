#!/usr/bin/env python3
"""
VapeLiquid Bot — python-telegram-bot v20
Deschide Mini App + procesează comenzi + gestionare stoc
"""

import os
import json
import base64
import logging
import requests
from telegram import (
    Update,
    WebAppInfo,
    KeyboardButton,
    ReplyKeyboardMarkup,
)
from telegram.ext import (
    Application,
    CommandHandler,
    MessageHandler,
    filters,
    ContextTypes,
)

# ══════════════════════════════════════════════════════════════════════
#  CONFIGURARE  ←  SCHIMBĂ ACESTE VALORI!
# ══════════════════════════════════════════════════════════════════════
BOT_TOKEN      = "8794180319:AAH2JkZojAraZEobPX2hyfHMUaux11bDDt8"
OWNER_ID       = 6826677522
WEBAPP_URL     = "https://eqvrt.github.io/vape-bot"

# GitHub — pentru actualizarea stocului din Telegram
GITHUB_TOKEN   = os.environ.get("GITHUB_TOKEN", "")
GITHUB_USER    = "eqvrt"
GITHUB_REPO    = "vape-bot"
STOCK_FILE     = "stock.json"

# ══════════════════════════════════════════════════════════════════════

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s  %(levelname)s  %(message)s",
)
logger = logging.getLogger(__name__)

PRODUCT_NAMES = {
    "chaser_10ml":  "Chaser 10ML • 50MG",
    "monashka":     "ЗЛАЯ МОНАШКА 30ML",
    "elf_liq":      "Elf LIQ 30ML • 50MG",
    "xros_series":  "XROS Series 0.6",
    "xros5_mini":   "XROS 5 Mini",
    "xros4_mini":   "XROS 4 Mini",
    "chaser_lux":   "CHASER LUX 30ML",
    "chaser_ultra": "CHASER ULTRA 30ML",
    "elfbar_combo": "ELFBAR COMBO PRO",
    "xros_pro2":    "XROS PRO 2",
    "xros_mini":    "XROS MINI",
}


# ════════════════════════════════════════════════════════
#  FUNCȚII GITHUB — citire/scriere stock.json
# ════════════════════════════════════════════════════════
def github_headers():
    return {
        "Authorization": f"token {GITHUB_TOKEN}",
        "Accept": "application/vnd.github.v3+json",
    }

def get_stock():
    url  = f"https://api.github.com/repos/{GITHUB_USER}/{GITHUB_REPO}/contents/{STOCK_FILE}"
    resp = requests.get(url, headers=github_headers())
    if resp.status_code == 200:
        data    = resp.json()
        content = base64.b64decode(data["content"]).decode("utf-8")
        return json.loads(content), data["sha"]
    return {}, None

def save_stock(stock_data: dict, sha: str) -> bool:
    url     = f"https://api.github.com/repos/{GITHUB_USER}/{GITHUB_REPO}/contents/{STOCK_FILE}"
    content = base64.b64encode(
        json.dumps(stock_data, indent=2, ensure_ascii=False).encode()
    ).decode()
    payload = {
        "message": "Update stock via bot",
        "content": content,
        "sha":     sha,
    }
    resp = requests.put(url, headers=github_headers(), json=payload)
    return resp.status_code in (200, 201)


# ════════════════════════════════════════════════════════
#  /start
# ════════════════════════════════════════════════════════
async def cmd_start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    kb = ReplyKeyboardMarkup(
        [[KeyboardButton("🛒 Deschide VapeLiquid 💨", web_app=WebAppInfo(url=WEBAPP_URL))]],
        resize_keyboard=True,
    )
    await update.message.reply_text(
        "👋 Salut! Apasă butonul de mai jos pentru a deschide magazinul 👇\n"
        "👋 Привет! Нажми кнопку ниже, чтобы открыть магазин 👇",
        reply_markup=kb,
    )


# ════════════════════════════════════════════════════════
#  /stock — gestionare stoc (doar proprietarul)
# ════════════════════════════════════════════════════════
async def cmd_stock(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if update.effective_user.id != OWNER_ID:
        return

    args = context.args

    if not args:
        stock, _ = get_stock()
        if not stock:
            await update.message.reply_text("❌ Nu am putut citi stocul de pe GitHub.")
            return

        lines = ["📦 *Stoc curent:*\n"]
        for prod_id, qty in stock.items():
            nume   = PRODUCT_NAMES.get(prod_id, prod_id)
            status = "✅" if qty > 0 else "⏳"
            lines.append(f"{status} `{prod_id}` — *{qty} buc.*\n    _{nume}_")

        lines.append("\n📝 *Cum schimbi stocul:*")
        lines.append("`/stock produs_id cantitate`")
        lines.append("_Exemplu: /stock chaser\\_10ml 15_")

        await update.message.reply_text("\n".join(lines), parse_mode="Markdown")
        return

    if len(args) != 2:
        await update.message.reply_text(
            "❌ Format greșit!\n\n"
            "✅ Corect: `/stock produs_id cantitate`\n"
            "Exemplu: `/stock chaser_10ml 15`\n\n"
            "Scrie `/stock` pentru lista produselor.",
            parse_mode="Markdown",
        )
        return

    prod_id = args[0]
    try:
        qty = int(args[1])
        if qty < 0:
            raise ValueError
    except ValueError:
        await update.message.reply_text("❌ Cantitatea trebuie să fie un număr pozitiv!")
        return

    stock, sha = get_stock()
    if not sha:
        await update.message.reply_text("❌ Nu am putut citi stocul de pe GitHub.")
        return

    if prod_id not in stock:
        await update.message.reply_text(
            f"❌ Produsul `{prod_id}` nu există!\n\nScrie `/stock` pentru lista produselor.",
            parse_mode="Markdown",
        )
        return

    old_qty        = stock[prod_id]
    stock[prod_id] = qty

    if save_stock(stock, sha):
        nume   = PRODUCT_NAMES.get(prod_id, prod_id)
        status = "✅ În stoc" if qty > 0 else "⏳ Precomandă"
        await update.message.reply_text(
            f"✅ *Stoc actualizat!*\n\n"
            f"📦 *{nume}*\n"
            f"🔢 {old_qty} buc. → *{qty} buc.*\n"
            f"📊 Status: {status}\n\n"
            f"_Site-ul se actualizează în ~1 minut._",
            parse_mode="Markdown",
        )
        logger.info("Stoc actualizat: %s = %d", prod_id, qty)
    else:
        await update.message.reply_text(
            "❌ Eroare la salvarea stocului pe GitHub!\n"
            "Verifică că GITHUB_TOKEN este corect în bot.py"
        )


# ════════════════════════════════════════════════════════
#  Procesare date din Mini App
# ════════════════════════════════════════════════════════
async def handle_web_app_data(update: Update, context: ContextTypes.DEFAULT_TYPE):
    try:
        raw  = update.effective_message.web_app_data.data
        data = json.loads(raw)
    except Exception as e:
        logger.error("Eroare la parsarea datelor: %s", e)
        return

    user          = update.effective_user
    flow_ro       = "Procura"  if data["flow"] == "procura" else "Precomandă"
    flow_ru       = "Покупка"  if data["flow"] == "procura" else "Предзаказ"
    icon          = "🛒"       if data["flow"] == "procura" else "📦"
    flavor_line   = f"\n🍬 Aromă: *{data['flavor']}*"        if data.get("flavor")   else ""
    locality_line = f"\n📍 Localitate: *{data['locality']}*" if data.get("locality") else ""

    await context.bot.send_message(
        chat_id=OWNER_ID,
        text=(
            f"{icon} *Comandă nouă / Новый заказ!*\n\n"
            f"📌 Tip: *{flow_ro} / {flow_ru}*\n"
            f"👤 Client: [{user.first_name}](tg://user?id={user.id})\n"
            f"🆔 Telegram ID: `{user.id}`\n"
            f"📦 Produs: *{data['product_name']}*"
            f"{flavor_line}\n"
            f"🔢 Cantitate: *{data['qty']} buc.*\n"
            f"💰 Total: *{data['total']} lei*\n"
            f"📲 Contact: `{data.get('contact', '—')}`"
            f"{locality_line}"
        ),
        parse_mode="Markdown",
    )

    await update.message.reply_text(
        "✅ *Comanda ta a fost trimisă!*\n"
        "✅ *Твой заказ отправлен!*\n\n"
        f"📦 {data['product_name']}\n"
        f"🔢 {data['qty']} buc. — 💰 {data['total']} lei\n\n"
        "Te vom contacta în curând! 😊\n"
        "👉 @vape\\_liquid228",
        parse_mode="Markdown",
    )


# ════════════════════════════════════════════════════════
def main():
    app = Application.builder().token(BOT_TOKEN).build()

    app.add_handler(CommandHandler("start", cmd_start))
    app.add_handler(CommandHandler("stock", cmd_stock))
    app.add_handler(MessageHandler(filters.StatusUpdate.WEB_APP_DATA, handle_web_app_data))

    logger.info("Bot VapeLiquid pornit! ✅")
    app.run_polling(allowed_updates=Update.ALL_TYPES)


if __name__ == "__main__":
    main()
