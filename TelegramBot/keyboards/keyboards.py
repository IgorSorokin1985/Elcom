from aiogram.types import ReplyKeyboardMarkup, KeyboardButton, InlineKeyboardMarkup, InlineKeyboardButton
from aiogram.utils.keyboard import ReplyKeyboardBuilder, InlineKeyboardBuilder

from API.requests import get_items, get_categories


main = ReplyKeyboardMarkup(keyboard=[
    [KeyboardButton(text='Catalog')],
    [KeyboardButton(text='Cart'), KeyboardButton(text='My Orders')],
], resize_keyboard=True,
input_field_placeholder='Choose somthing')


new_user = ReplyKeyboardMarkup(keyboard=[
    [KeyboardButton(text='Registration')],
], resize_keyboard=True,
input_field_placeholder='Choose somthing')


async def items_keyboard(category_id):
    keyboard = InlineKeyboardBuilder()
    items = await get_items()
    for item in items:
        if item["category"] == category_id:
            keyboard.add(InlineKeyboardButton(text=f"{item["name"]} - {item["price"]} USD", callback_data=f"item_{item["id"]}"))
    return keyboard.adjust(1).as_markup()


async def categories_keyboard():
    keyboard = InlineKeyboardBuilder()
    categories = await get_categories()
    for category in categories:
        keyboard.add(InlineKeyboardButton(text=f"{category["name"]}", callback_data=f"category_{category["id"]}"))
    return keyboard.adjust(1).as_markup()


async def add_item(item_id):
    keyboard = InlineKeyboardBuilder()
    keyboard.add(InlineKeyboardButton(text="Add Item to Cart", callback_data=f"additem_{item_id}"))
    return keyboard.adjust(1).as_markup()


async def finish_order(order_id):
    keyboard = InlineKeyboardBuilder()
    keyboard.add(InlineKeyboardButton(text="Finish this Order", callback_data=f"finishorder_{order_id}"))
    return keyboard.adjust(1).as_markup()


async def position_actions(position):
    keyboard = InlineKeyboardBuilder()
    keyboard.add(InlineKeyboardButton(text="Delete this position", callback_data=f"deleteposition_{position["id"]}"))
    return keyboard.adjust(1).as_markup()


async def user_order(order):
    keyboard = InlineKeyboardBuilder()
    keyboard.add(InlineKeyboardButton(text=f"More information.", callback_data=f"order_{order["id"]}"))
    return keyboard.adjust(1).as_markup()
