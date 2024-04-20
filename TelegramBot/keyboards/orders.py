from aiogram.types import InlineKeyboardButton
from aiogram.utils.keyboard import InlineKeyboardBuilder


async def user_order(order):
    keyboard = InlineKeyboardBuilder()
    keyboard.add(InlineKeyboardButton(text="More information.", callback_data=f"order_{order['id']}"))
    return keyboard.adjust(1).as_markup()
