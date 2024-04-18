import aiohttp
from API.urls import CHECKING_USER_URL


async def checking_user(telegram_chart_id):
    async with aiohttp.ClientSession() as session:
        async with session.get(CHECKING_USER_URL, headers={"chartID": telegram_chart_id}) as response:
            return await response.json()
