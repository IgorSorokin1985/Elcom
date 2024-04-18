from config.settings import TELEGRAM_TOKEN
from aiogram import Bot, Dispatcher, F
from handlers import router


bot = Bot(TELEGRAM_TOKEN, parse_mode="Markdown")
dp = Dispatcher()


async def telegram_bot():
    dp.include_router(router)
    await dp.start_polling(bot)
