import asyncio
from config.bot import telegram_bot

import logging


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    try:
        asyncio.run(telegram_bot())
    except KeyboardInterrupt:
        print('Telegram Bot is over.')
