import aiohttp
from API.urls import ITEMS_LIST_URL, CATEGORIES_LIST_URL, ITEM_URL


async def get_categories():
    async with aiohttp.ClientSession() as session:
        async with session.get(CATEGORIES_LIST_URL) as response:
            return await response.json()


async def get_items():
    async with aiohttp.ClientSession() as session:
        async with session.get(ITEMS_LIST_URL) as response:
            return await response.json()


async def get_item(item_id, telegram_chart_id):
    async with aiohttp.ClientSession() as session:
        async with session.get(ITEM_URL + str(item_id), headers={"chartID": telegram_chart_id}) as response:
            return await response.json()
