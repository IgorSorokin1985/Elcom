import aiohttp
from API.urls import (ITEMS_LIST_URL, CATEGORIES_LIST_URL, ITEM_URL, LOGIN_URL, LAST_ORDER_URL, ADD_POSITION_URL,
                        ORDER_URL, DELETE_POSITION_URL, ORDERS_URL, CHECKING_USER_URL)


async def checking_user(telegram_chart_id):
    async with aiohttp.ClientSession() as session:
        async with session.get(CHECKING_USER_URL, headers={"chartID": telegram_chart_id}) as response:
            return await response.json()

async def login():
    async with aiohttp.ClientSession() as session:
        async with session.post(LOGIN_URL, data={"email": "test@test.com", "password": 12345}) as response:
            return await response.json()


async def get_items():
    async with aiohttp.ClientSession() as session:
        async with session.get(ITEMS_LIST_URL) as response:
            return await response.json()


async def get_item(item_id, telegram_chart_id):
    async with aiohttp.ClientSession() as session:
        async with session.get(ITEM_URL + str(item_id), headers={"chartID": telegram_chart_id}) as response:
            return await response.json()


async def get_categories():
    async with aiohttp.ClientSession() as session:
        async with session.get(CATEGORIES_LIST_URL) as response:
            return await response.json()


async def get_cart(telegram_chart_id):
    async with aiohttp.ClientSession() as session:
        order = await get_last_order(telegram_chart_id)
        cart = await get_order(telegram_chart_id, order["order_id"])
        return cart


async def get_order(telegram_chart_id, order_id):
    async with aiohttp.ClientSession() as session:
        async with session.get(ORDER_URL + str(order_id), headers={"chartID": telegram_chart_id}) as response:
            return await response.json()


async def get_orders(telegram_chart_id):
    async with aiohttp.ClientSession() as session:
        async with session.get(ORDERS_URL, headers={"chartID": telegram_chart_id}) as response:
            return await response.json()

async def finish_cart(telegram_chart_id, order_id):
    async with (aiohttp.ClientSession() as session):
        data = {
            "status": "R"
        }
        async with session.put(ORDER_URL + str(order_id) + "/update/",
                               headers={"chartID": telegram_chart_id},
                               data=data) as response:
            return await response.json()


async def get_last_order(telegram_chart_id):
    async with aiohttp.ClientSession() as session:
        async with session.get(LAST_ORDER_URL, headers={"chartID": telegram_chart_id}) as response:
            return await response.json()


async def create_position(item, telegram_chart_id):
    async with aiohttp.ClientSession() as session:
        quantity = 1
        order = await get_last_order(telegram_chart_id)
        print(order)
        data = {
            "item": item["id"],
            "price": item["price"],
            "quantity": quantity,
            "order": order["order_id"]
        }
        async with session.post(ADD_POSITION_URL, headers={"chartID": telegram_chart_id}, data=data) as response:
            return await response.json()


async def delete_position(telegram_chart_id, position_id):
    async with aiohttp.ClientSession() as session:
        async with session.delete(DELETE_POSITION_URL + position_id + "/delete/",
                               headers={"chartID": telegram_chart_id}) as response:
            return await response.json(content_type=None)
