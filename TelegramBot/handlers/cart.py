from aiogram import F, Router
from aiogram.types import Message, CallbackQuery
import keyboards.cart as kb
from API.orderAPI import get_cart, finish_cart, delete_position
from utils.utils import create_cart_message, create_position_message
from aiogram.utils.markdown import link

cart_router = Router()


@cart_router.message(F.text == 'Cart')
async def cart(message: Message):
    cart_info = await get_cart(str(message.from_user.id))
    positions = cart_info["positions"]
    for index, position in enumerate(positions):
        await message.answer(create_position_message(index, position), reply_markup=await kb.position_actions(position))
    await message.answer(create_cart_message(cart_info), reply_markup=await kb.finish_order(cart_info["id"]))


@cart_router.callback_query(F.data.startswith('finishorder_'))
async def finish_order(callback: CallbackQuery):
    order_id = callback.data.split("_")[1]
    finished_order_info = await finish_cart(str(callback.from_user.id), order_id)
    print(finished_order_info)
    await callback.answer("")
    await callback.message.answer('''Congratulations!
You completed order''')
    if "invoice" in finished_order_info:
        await callback.message.answer(f'''
Link for loading invoice:
{link('Invoice', finished_order_info["invoice"])}
    ''')
    if "url_for_pay" in finished_order_info:
        await callback.message.answer(f'''
Link for pay:
{link('Pay', finished_order_info["url_for_pay"])}
    ''')


@cart_router.callback_query(F.data.startswith('deleteposition_'))
async def item_added(callback: CallbackQuery):
    await callback.answer("")
    position_id = callback.data.split("_")[1]
    result = await delete_position(str(callback.from_user.id), position_id)
    print(result)
