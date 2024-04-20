from aiogram.types import InlineKeyboardButton
from aiogram.utils.keyboard import InlineKeyboardBuilder


async def finish_order(order_id):
    keyboard = InlineKeyboardBuilder()
    keyboard.add(InlineKeyboardButton(text="Finish this Order", callback_data=f"finishorder_{order_id}"))
    return keyboard.adjust(1).as_markup()


async def position_actions(position):
    keyboard = InlineKeyboardBuilder()
    keyboard.add(InlineKeyboardButton(text="Delete this position", callback_data=f"deleteposition_{position['id']}"))
    return keyboard.adjust(1).as_markup()
