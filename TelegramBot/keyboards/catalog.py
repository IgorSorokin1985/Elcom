from aiogram.types import InlineKeyboardButton
from aiogram.utils.keyboard import InlineKeyboardBuilder

from API.itemAPI import get_items, get_categories


async def items_keyboard(category_id):
    keyboard = InlineKeyboardBuilder()
    items = await get_items()
    for item in items:
        if item["category"] == category_id:
            keyboard.add(InlineKeyboardButton(text=f"{item['name']} - {item['price']} USD",
                                              callback_data=f"item_{item['id']}"))
    return keyboard.adjust(1).as_markup()


async def categories_keyboard():
    keyboard = InlineKeyboardBuilder()
    categories = await get_categories()
    for category in categories:
        keyboard.add(InlineKeyboardButton(text=f"{category['name']}", callback_data=f"category_{category['id']}"))
    return keyboard.adjust(1).as_markup()


async def add_item(item_id):
    keyboard = InlineKeyboardBuilder()
    keyboard.add(InlineKeyboardButton(text="Add Item to Cart", callback_data=f"additem_{item_id}"))
    return keyboard.adjust(1).as_markup()
