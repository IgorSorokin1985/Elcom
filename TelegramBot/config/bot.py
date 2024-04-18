from config.settings import TELEGRAM_TOKEN
from aiogram import Bot, Dispatcher
from handlers.common import common_router
from handlers.catalog import catalog_router
from handlers.cart import cart_router
from handlers.orders import orders_router


bot = Bot(TELEGRAM_TOKEN, parse_mode="Markdown")
dp = Dispatcher()


async def telegram_bot():
    dp.include_router(common_router)
    dp.include_router(catalog_router)
    dp.include_router(cart_router)
    dp.include_router(orders_router)
    await dp.start_polling(bot)
