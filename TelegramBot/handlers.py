from aiogram import F, Router
from aiogram.filters import CommandStart, Command
from aiogram.types import Message, CallbackQuery
import keyboards.keyboards as kb
from API.requests import (get_items, login, get_item, create_position, get_cart, finish_cart, delete_position,
                          get_orders, get_order, checking_user)
from utils.utils import create_cart_message, create_position_message, create_order_message
from aiogram.utils.markdown import link

router = Router()


@router.message(CommandStart())
async def cmd_start(message: Message):
    answer = await checking_user(str(message.from_user.id))
    print("USER!!!!")
    if answer["answer"]:
        await message.answer('Hello, Can I help you?', reply_markup=kb.main)
    else:
        await message.answer('You need to register?', reply_markup=kb.new_user)


@router.message(F.text == 'Catalog')
async def get_catalog(message: Message):
    await message.answer('Choose category!', reply_markup=await kb.categories_keyboard())


@router.message(F.text == 'My Orders')
async def get_my_orders(message: Message):
    orders = await get_orders(str(message.from_user.id))
    print(orders)
    await message.answer("Your last 10 Orders")
    for order in orders[-10:]:
        await message.answer(f"""{order["id"]} from {order["data"]}.
Total - {order["summa"]} 
Status - {order["status"]}
Payment status - {order["payment_status"]}""", reply_markup=await kb.user_order(order))


@router.callback_query(F.data.startswith('order_'))
async def get_user_order(callback: CallbackQuery):
    await callback.answer("")
    order_id = callback.data.split("_")[1]
    order_info = await get_order(str(callback.from_user.id), order_id)
    positions = order_info["positions"]
    for index, position in enumerate(positions):
        await callback.message.answer(create_position_message(index, position))
    await callback.message.answer(create_order_message(order_info))
    await callback.message.answer(f'''
Link for loading invoice:
{order_info["invoice"]}
Link for pay:
{order_info["url_for_pay"]}''')


@router.message(F.text == 'Registration')
async def registration(message: Message):
    result = await login()
    await message.answer(f'Registration! {result}')


@router.message(F.text == 'Cart')
async def cart(message: Message):
    cart_info = await get_cart(str(message.from_user.id))
    positions = cart_info["positions"]
    for index, position in enumerate(positions):
        await message.answer(create_position_message(index, position), reply_markup=await kb.position_actions(position))
    await message.answer(create_cart_message(cart_info), reply_markup=await kb.finish_order(cart_info["id"]))


@router.callback_query(F.data.startswith('finishorder_'))
async def finish_order(callback: CallbackQuery):
    order_id = callback.data.split("_")[1]
    finished_order_info = await finish_cart(str(callback.from_user.id), order_id)
    print(finished_order_info)
    await callback.answer("")
    await callback.message.answer(f'''Congratulations! 
Link for loading invoice:
{link('link_for_invoice', finished_order_info["invoice"])}
Link for pay:
{link('link_for_pay', finished_order_info["url_for_pay"])}''')


@router.callback_query(F.data.startswith('category_'))
async def category_selected(callback: CallbackQuery):
    await callback.answer("")
    await callback.message.edit_text('Choose Item!', reply_markup=await kb.items_keyboard(int(callback.data.split("_")[1])))


@router.callback_query(F.data.startswith('item_'))
async def item_selected(callback: CallbackQuery):
    await callback.answer("")
    item = await get_item(callback.data.split("_")[1], str(callback.from_user.id))
    print(item)

    await callback.message.answer_photo(
        photo="https://t0.gstatic.com/licensed-image?q=tbn:ANd9GcTZCSmCzmIPm0up8wmW566cK5w3sSTUChT5UnaU3VnFxrHwoRNSnks0xUBmj2r2oeJk",
        #photo=item["foto"],
        caption=f"""
Selected Item:
{item["name"]}!
{item["stock"]} in stock.
Weight - {item["weight"]} kg.
Price - {item["price"]} USD.
""", reply_markup=await kb.add_item(item["id"]))


@router.callback_query(F.data.startswith('additem_'))
async def item_added(callback: CallbackQuery):
    await callback.answer("")
    item = await get_item(callback.data.split("_")[1], str(callback.from_user.id))
    await create_position(item, str(callback.from_user.id))
    await callback.message.answer(f"""
Was added Item:
{item["name"]}!
Quantaty - 1.
Weight - {item["weight"]} kg.
Price - {item["price"]} USD.
""")


@router.callback_query(F.data.startswith('deleteposition_'))
async def item_added(callback: CallbackQuery):
    await callback.answer("")
    position_id = callback.data.split("_")[1]
    result = await delete_position(str(callback.from_user.id), position_id)
    print(result)
