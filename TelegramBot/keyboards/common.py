from aiogram.types import ReplyKeyboardMarkup, KeyboardButton


main = ReplyKeyboardMarkup(keyboard=[
    [KeyboardButton(text='Catalog')],
    [KeyboardButton(text='Cart'), KeyboardButton(text='My Orders')],
], resize_keyboard=True, input_field_placeholder='Choose somthing')


new_user = ReplyKeyboardMarkup(keyboard=[
    [KeyboardButton(text='Registration')],
], resize_keyboard=True, input_field_placeholder='Choose somthing')
