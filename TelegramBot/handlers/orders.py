from aiogram import F, Router
from aiogram.types import Message, CallbackQuery
import keyboards.orders as kb
from API.orderAPI import get_orders, get_order
from utils.utils import create_position_message, create_order_message
from aiogram.utils.markdown import link

orders_router = Router()


@orders_router.message(F.text == 'My Orders')
async def get_my_orders(message: Message):
    orders = await get_orders(str(message.from_user.id))
    await message.answer("Your last 10 Orders")
    for order in orders[-10:]:
        await message.answer(f"""{order['id']} from {order['data']}.
Total {order['summa']}
Status {order['status']}
Payment status - {order['payment_status']}""", reply_markup=await kb.user_order(order))


@orders_router.callback_query(F.data.startswith('order_'))
async def get_user_order(callback: CallbackQuery):
    await callback.answer("")
    order_id = callback.data.split("_")[1]
    order_info = await get_order(str(callback.from_user.id), order_id)
    positions = order_info["positions"]
    for index, position in enumerate(positions):
        await callback.message.answer(create_position_message(index, position))
    await callback.message.answer(create_order_message(order_info))
    if "invoice" in order_info:
        await callback.message.answer(f"""
Link for loading invoice:
{link('Invoice', order_info['invoice'])}
""")
    if "url_for_pay" in order_info:
        await callback.message.answer(f"""
Link for pay:
{link('Pay', order_info['url_for_pay'])}
""")
