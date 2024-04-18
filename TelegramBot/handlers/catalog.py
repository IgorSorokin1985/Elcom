from aiogram import F, Router
from aiogram.types import Message, CallbackQuery
import keyboards.catalog as kb
from API.itemAPI import get_item
from API.orderAPI import create_position


catalog_router = Router()


@catalog_router.message(F.text == 'Catalog')
async def get_catalog(message: Message):
    await message.answer('Choose category', reply_markup=await kb.categories_keyboard())


@catalog_router.callback_query(F.data.startswith('category_'))
async def category_selected(callback: CallbackQuery):
    await callback.answer("")
    await callback.message.edit_text('Choose Item',
                                     reply_markup=await kb.items_keyboard(int(callback.data.split("_")[1])))


@catalog_router.callback_query(F.data.startswith('item_'))
async def item_selected(callback: CallbackQuery):
    await callback.answer("")
    item = await get_item(callback.data.split("_")[1], str(callback.from_user.id))
    print(item)

    await callback.message.answer_photo(
        photo="https://t0.gstatic.com/licensed-image?q=tbn:ANd9GcTZCSmCzmIPm0up8wmW566cK5w3sSTUChT5UnaU3VnFxrHwoRNSnks0xUBmj2r2oeJk",
        #photo=item["foto"],
        caption=f"""
Selected Item:
{item["name"]}
{item["stock"]} in stock
Weight {item["weight"]} kg
Price {item["price"]} USD
""", reply_markup=await kb.add_item(item["id"]))


@catalog_router.callback_query(F.data.startswith('additem_'))
async def item_added(callback: CallbackQuery):
    await callback.answer("")
    item = await get_item(callback.data.split("_")[1], str(callback.from_user.id))
    await create_position(item, str(callback.from_user.id))
    await callback.message.answer(f"""
Was added Item:
{item["name"]}
Quantaty 1
Weight - {item["weight"]} kg
Price - {item["price"]} USD
""")
