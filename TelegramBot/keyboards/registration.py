from aiogram.types import ReplyKeyboardMarkup, KeyboardButton


start = ReplyKeyboardMarkup(keyboard=[
    [KeyboardButton(text='/start')]],
    resize_keyboard=True,
    input_field_placeholder='Start')
